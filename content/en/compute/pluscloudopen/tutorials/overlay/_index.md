---
#https://gohugo.io/content-management/page-bundles/
title: "Connect VMs over AZ borders via overlay VPNs"
type: "docs"
weight: 1
date: 2025-09-18
description: >
  Connect your VMs spanning AZ borders using an overlay VPN
---

## Overview

It can make sense to connect VMs, which live in different availability zones (AZs), via an overlay VPN. Good use cases might be database replication, failover cluster or the integration of other plusserver products like VMs from [pluscloud VMware](https://www.plusserver.com/en/product/pluscloud-vmware/) or [Dedicated Servers](https://www.plusserver.com/en/product/dedicated-servers/). 

The tutorial presents a way to accomplish this with [nebula](https://github.com/slackhq/nebula/). Please have a look at the [nebula documentation](https://nebula.defined.net/docs/), as well.

## Requirements

This tutorial assumes, that you already have two OpenStack VMs in different AZs of the pluscloud open, which you want to connect with each other. Furthermore you'll need a third VM, either in one of the existing environments or in a third one.

## Create a Certificate Authority (CA) 

In order to create certificates for our VMs, we need a Certificate Authority (CA). To create one, first fetch the nebula binaries from https://github.com/slackhq/nebula/releases for your operating system and unpack them as user "root" into the directory `/usr/local/bin`.


    laptop $ ~ → sudo tar -xvzf Downloads/nebula-linux-amd64.tar.gz -C /usr/local/bin 
    nebula
    nebula-cert
    laptop $ ~ → sudo chmod +x /usr/local/bin/nebula*

Create a directory `nebula-ca`, change into it and create the CA:

    laptop $ ~ → mkdir nebula-ca
    mkdir: directory 'nebula-ca' created
    laptop $ ~ → cd nebula-ca/
    /data/nebula-ca
    laptop $ nebula-ca → nebula-cert ca -name "My New CA"
    laptop $ nebula-ca → ls
    ca.crt  ca.key

The file `ca.key` contains the key, which is used to sign all new certificates in your network. Therefore it is one of the most valuable assets in your setup. You should keep it safe and maybe use additional encryption (e. g. gpg) on it. The file should _never_ end up on your lighthouse VM or any other of your VMs. The CA we just created is valid for one year. Thus after one year the certificate has to be renewed. Using the parameter `-duration` allows to create CAs with longer lifetimes. 

Now we can start setting up our first lighthouse VM.

## Create a Lighthouse VM

The first step to set up an overlay VPN is the installation of a so called "lighthouse" VM. It is neccessary for the various VMs to find each other over the network. The VM does only consume small CPU- and memory-resources - thus you can choose a small flavor. It is important, that the VM is reachable via UDP port 4242 from the internet. 
First let's create a certificate for the lighthouse VM with our new CA:

    laptop $ nebula-ca → nebula-cert sign -name "leuchtturm1" -ip "10.10.10.1/24"
    laptop $ nebula-ca → ls leucht*
    leuchtturm1.crt  leuchtturm1.key

As above you could extend the lifetime of the certificate by using `-duration` with more than a year in the command.

Second we have to create a configuration file for the lighthouse VM. Nebula offers an [example configuration file](https://github.com/slackhq/nebula/blob/master/examples/config.yml) on github to download. For our case the `config.yaml` could look like this:

    pki:
      ca: /etc/nebula/ca.crt
      cert: /etc/nebula/leuchtturm1.crt
      key: /etc/nebula/leuchtturm1.key

    static_host_map:

    lighthouse:
      am_lighthouse: true
      interval: 60
      hosts:

    listen:
      host: 0.0.0.0
      port: 4242

    firewall:
      outbound_action: drop
      inbound_action: drop

      conntrack:
        tcp_timeout: 12m
        udp_timeout: 3m
        default_timeout: 10m

      outbound:
        - port: any
          proto: any
          host: any

      inbound:
        - port: any
          proto: icmp
          host: any

On the VM, which should get the lighthouse service, create the directory `/etc/nebula` and copy the above config file `config.yaml`, the two certificate files, which were created during certificate creation (`leuchtturm1.crt` and `leuchtturm1.key`) as well as the certificate of our CA - `ca.crt` - into it.

Next we need a unit file for the service, in order to let systemd manage it:

    [Unit]
    Description=Nebula overlay networking tool
    Wants=basic.target network-online.target nss-lookup.target time-sync.target
    After=basic.target network.target network-online.target
    Before=sshd.service

    [Service]
    Type=notify
    NotifyAccess=main
    SyslogIdentifier=nebula
    ExecReload=/bin/kill -HUP $MAINPID
    ExecStart=/usr/local/bin/nebula -config /etc/nebula/config.yaml
    Restart=always
 
    [Install]
    WantedBy=multi-user.target

Save it as `/etc/systemd/system/nebula.service` and reload the systemd configuration with `sudo systemctl daemon-reload`. After that you can activate the new service with `sudo systemctl enable nebula.service`. With `sudo systemctl start nebula` you can start it.

The command `ip addr show nebula1` shoud now give you some output like this:

    nl $ ~ → ip addr show nebula1
    4: nebula1: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1300 qdisc fq_codel state UNKNOWN group default qlen 500
        link/none 
        inet 10.10.10.1/24 scope global nebula1
           valid_lft forever preferred_lft forever
        inet6 fe80::2002:e730:cd87:a72f/64 scope link stable-privacy 
           valid_lft forever preferred_lft forever

The `nebula1` interface should show the ip address, that you assigned to it during the creation of the certificate. In OpenStack you should associate a floating ip to the VM to make it reachable from the internet. Additionally you should create a security group which makes sure, that the VM can only be reached on UDP port 4242 from outside. The floating ip needs to be inserted in the configuration files of all other VMs.

As the first lighthouse is now up and running, we can now deal with the other VMs. 

## Configure Nebula VMs

For all the "normal" VMs, which should run nebula, we need certificates from our CA, too. We create the like before:

    laptop $ nebula-ca → nebula-cert sign -name "prod1-postgresql-0" -ip "10.10.10.2/24"
    laptop $ nebula-ca → nebula-cert sign -name "prod4-postgresql-0" -ip "10.10.10.3/24"

And naturally we need the Nebula binaries on any VM, that should run nebula, installed in `/usr/local/bin` (see above).

For the "normal" VMs the configuration files are a little bigger that for the lighthouse:

    pki:
      ca: /etc/nebula/ca.crt
      cert: /etc/nebula/prod1-postgres-0.crt
      key: /etc/nebula/prod1-postgres-0.key

    static_host_map:
      "10.10.10.1": ["<public ip of your lighthouse VM>:4242"]

    lighthouse:
      am_lighthouse: false
      interval: 60
      hosts:
        - "10.10.10.1"

    listen:
      host: 0.0.0.0
      port: 4242

    punchy:
      punch: true

    relay:
      am_relay: false
      use_relays: true

    tun:
      disabled: false
      dev: nebula1
      drop_local_broadcast: false
      drop_multicast: false
      tx_queue: 500
      mtu: 1300

      routes:

      unsafe_routes:

    logging:
      level: info
      format: text

    firewall:
      outbound_action: drop
      inbound_action: drop

      conntrack:
        tcp_timeout: 12m
        udp_timeout: 3m
        default_timeout: 10m

      outbound:
        - port: any
          proto: any
          host: any

      inbound:
        - port: any
          proto: icmp
          host: any

        - port: 5432
          proto: tcp
          host: any

        - port: 8008
          proto: tcp
          host: any

Save - like with the lighthouse VM - the customized configuration file for the respective VM (`config.yaml`), the matching certificates (`prod1-postgresql-0.crt` and `prod1-postgresql-0.key` resp. `prod4-postgresql-0.crt` and `prod4-postgresql-0.key`) and the CA certificate - `ca.crt` - in `/etc/nebula` on the respective VM (customize the name of the certificate files under "pki" before and add the public IP of your lighthouse VM at the "`static_host_map`"). Like with the lighthouse VM we create the nebula unit file for systemd, enable the service and start it. After that you should be able to ping the lighthouse VM from both "normal" VMs:

    root@prod1-postgresql-0:~# ping 10.10.10.1
    PING 10.10.10.1 (10.10.10.1) 56(84) bytes of data.
    64 bytes from 10.10.10.1: icmp_seq=1 ttl=64 time=1.73 ms
    64 bytes from 10.10.10.1: icmp_seq=2 ttl=64 time=1.73 ms 
    ^C
    --- 10.10.10.1 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1002ms
    rtt min/avg/max/mdev = 1.729/1.730/1.731/0.001 ms

Furthermore the VMs should be able to ping eachother:

    root@prod1-postgresql-0:/etc/nebula# ping 10.10.10.3
    PING 10.10.10.3 (10.10.10.3) 56(84) bytes of data.
    64 bytes from 10.10.10.3: icmp_seq=1 ttl=64 time=1.69 ms
    64 bytes from 10.10.10.3: icmp_seq=2 ttl=64 time=1.91 ms
    64 bytes from 10.10.10.3: icmp_seq=3 ttl=64 time=1.84 ms
    ^C
    --- 10.10.10.3 ping statistics ---
    3 packets transmitted, 3 received, 0% packet loss, time 2004ms
    rtt min/avg/max/mdev = 1.687/1.813/1.914/0.094 ms

For all further instances it is the same procedure:

1. Download the nebula binaries and install them to `/usr/local/bin`
2. Create the certificate for the new VM and copy the certificate files to `/etc/nebula` on the new VM
3. Copy the `ca.crt` of your CA to `/etc/nebula` on the new VM
4. Create a configuration file `config.yaml` for the new VM and copy it to `/etc/nebula` on it
5. Create the unit file for systemd on the new VM, activate the service and start it 

## Hint
If you plan to use this in a production environment, you should create more than one lighthouse VM in different cloud environments.
Additionally you can get a "managed" version of nebula from [Defined Networking](https://www.defined.net/) which allows to automate the above setup using an [API](https://docs.defined.net/guides/automating-host-creation/). 

There is even a [collection of systemd units](https://github.com/quickvm/defined-systemd-units), which allows to enroll (e. g. during start) VMs to the overlay VPN from Defined Networking resp. to unenroll them (e. g. during deletion) from it. 




