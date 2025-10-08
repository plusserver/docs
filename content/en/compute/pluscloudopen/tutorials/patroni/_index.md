---
#https://gohugo.io/content-management/page-bundles/
title: "Set up a AZ-agnostic PostgreSQL Cluster with Patroni"
type: "docs"
weight: 1
date: 2025-10-07
description: >
  Create a PostgreSQL Cluster spanning two AZs using an Overlay-VPNs and Patroni
---

## Overview

Many customers want to set up infrastructure, that is resilient to crashes and outages. This includes the operation of database clusters which span two different, independent datacenters. This tutorial shows how to set up a PostgreSQL cluster in two different availability zones (AZs) using the overlay VPN ([nebula](https://github.com/slackhq/nebula/)) and the clustermanager [patroni](https://patroni.readthedocs.io/en/latest/).

## Requirements

This tutorial assumes that you already have a functional Consul cluster which is part of your overlay VPN (the setup of a Consul cluster spanning multiple AZs will be subject of a coming tutorial). Furthermore you need two separate OpenStack environments in two pluscloud open AZs with at least one instance each (for the PostgreSQL database) located in the same region. The two instances, that will be part of the database cluster should already be part of the overlay VPN based on nebula (connecting VMs with an overlay VPN is subject of another [tutorial](https://docs.plusserver.com/de/compute/pluscloudopen/tutorials/overlay/)).

## Install Consul Client

Patroni uses a "Distributed Configuration Store" (DCS) in order to coordinate and manage the PostgreSQL cluster. One of the DCS supported by patroni is Consul. The Consul client is the connection to the Consul cluster and therefore needs to be installed on the VMs, that get PostgreSQL installed later.

The installation is simple: We fetch the current Consul version from [Hashicorp](https://releases.hashicorp.com/consul/) for our operating system and install it under `/usr/local/bin`. For Linux like this:

    root@postgresql-0 ~ → wget -c -q https://releases.hashicorp.com/consul/1.21.5/consul_1.21.5_linux_amd64.zip
    root@postgresql-0 ~ → unzip consul_1.21.5_linux_amd64.zip
    Archive:  consul_1.21.5_linux_amd64.zip
      inflating: LICENSE.txt             
      inflating: consul            
    root@postgresql-0 ~ → mv consul /usr/local/bin
    root@postgresql-0 ~ → chmod +x /usr/local/bin/consul

Now we need a unit file in order to start and stop Consul via systemd. Use an editor tor create the file `/etc/systemd/system/consul.service` as user "root", copy the following content into it and save it afterwards. 

    [Unit]
    Description="HashiCorp Consul - A service mesh solution"
    Documentation=https://www.consul.io/
    Requires=network-online.target
    After=network-online.target
    ConditionFileNotEmpty=/etc/consul/consul.hcl

    [Service]
    EnvironmentFile=-/etc/consul.d/consul.env
    User=consul
    Group=consul
    ExecStart=/usr/local/bin/consul agent -config-dir=/etc/consul/
    ExecReload=/bin/kill --signal HUP $MAINPID
    KillMode=process
    KillSignal=SIGTERM
    Restart=on-failure
    LimitNOFILE=65536

    [Install]
    WantedBy=multi-user.target

Afterwards you should reload the systemd configuration with the command `systemctl daemon-reload`. 

As you see in the systemd unit file Consul expects its configuration to be located in the directory `/etc/consul`. Additionally the service should be executed by the user "consul" and the group "consul" and its home directory should be `/opt/consul`. Create the new user and the new group with `useradd -d /opt/consul consul`, create the home directory with `mkdir -p /opt/consul` and assign access to it for consul with `chown -R consul:consul /opt/consul`.

Now you can create the consul configuration file by opening `/etc/consul/consul.hcl` in an editor as the user "root". Copy the following content into it. 

You should adapt the paramters `datacenter`, `node_name`, `retry_join` and `encrypt` to your current situation. The name of the datacenter has to match that of your consul cluster and the node name could be adapted to your database name. Otherwise you can leave it out an consul will use the hostname of your VM instead. Behind `retry_join` you should set the ip addresses of your three consul servers and behind `encrypt` you need to add the gossip encryption key of your consul cluster. The parameters `ca_file`, `cert_file` and `key_file` contain path and name of the certificate files that have been created for your consul clients, in order to be able to join the cluster.

    datacenter = "de-west"
    data_dir   =  "/opt/consul"
    log_level  =  "INFO"
    node_name  =  "prod4-postgresql-0"
    server     =  false
    leave_on_terminate = true

    retry_join = [ "100.102.1.30", "100.102.1.31", "100.102.1.32" ]

    encrypt    = "myencryptionkey"

    tls {
      defaults {
        ca_file    = "/etc/consul/certificates/ca.pem"
        cert_file  = "/etc/consul/certificates/cert.pem"
        key_file   = "/etc/consul/certificates/private_key.pem"
      }
    }

    auto_encrypt = {
      tls = true
    }

    bind_addr      = "{{ GetInterfaceIP \"nebula1\" }}"
    advertise_addr = "{{ GetInterfaceIP \"nebula1\" }}"
    client_addr    = "{{ GetInterfaceIP \"nebula1\" }}"

    addresses {
       http     = "{{ GetInterfaceIP \"nebula1\" }}"
       https    = "{{ GetInterfaceIP \"nebula1\" }}"
       grpc     = "{{ GetInterfaceIP \"nebula1\" }}"
    }

With the configuration file ready, you should be able start Consul with `systemctl start consul` and see it join the Consul cluster.

## Install PostgreSQL

To set up the PostgreSQL cluster the database software has to be installed on both cluster nodes. We use the software packages that come with our Linux distribution for that. For Ubuntu/Debian like this:

    sudo apt-get -y install postgresql-14
    sudo apt-get -y install postgresql-contrib

After the installation we should ensure, that the database service is not automatically started. We want, that only patroni can start and stop the database:

    sudo systemctl disable postgresql.service

Furthermore you should create a directory that patroni will use to create the database in. It should not collide with being used by your Linux distribution or its package management. The directory has to be owned by the user "postgres" and needs the proper rights assigned to it like this: 

    mkdir -p /var/lib/postgresql/data
    chown postgres:postgres /var/lib/postgresql/data
    chmod 0700 /var/lib/postgresql/data

Additionally we need the software packages `python-psycopg2` and `pgbackrest` installed:

     sudo apt-get -y install python3-psycopg2
     sudo apt-get -y install pgbackrest


## Set up Patroni

Next we install Patroni. Patroni is written in Python and can be easily installed by the Python package installer (`pip`). Depending on your Linux distribution `pip` itself must be installed first:

    sudo apt-get -y install python3-pip

With `pip` installed you can now install patroni. As we use Consul as DCS we choose this version:

    sudo pip3 install patroni[consul]

As Patroni does not install a unit file for systemd we have to provide one ourselves. Open the file `/etc/systemd/system/patroni.service` in an editor and copy the following content into it:

    [Unit]
    Description=Runners to orchestrate a high-availability PostgreSQL
    After=network.target
    ConditionPathExists=/var/lib/postgresql/patroni.yml

    [Service]
    Type=simple

    User=postgres
    Group=postgres

    # Read in configuration file if it exists, otherwise proceed
    EnvironmentFile=-/etc/patroni_env.conf

    # the default is the user's home directory, and if you want to change it, you must provide an absolute path.
    # WorkingDirectory=/home/sameuser

    # Pre-commands to start watchdog device
    # Uncomment if watchdog is part of your patroni setup
    #ExecStartPre=-/usr/bin/sudo /sbin/modprobe softdog
    #ExecStartPre=-/usr/bin/sudo /bin/chown postgres /dev/watchdog

    # Start the patroni process
    ExecStart=/usr/local/bin/patroni /var/lib/postgresql/patroni.yml

    # Send HUP to reload from patroni.yml
    ExecReload=/bin/kill -s HUP $MAINPID

    # only kill the patroni process, not it's children, so it will gracefully stop postgres
    KillMode=process

    # Give a reasonable amount of time for the server to start up/shut down
    TimeoutSec=30

    # Do not restart the service if it crashes, we want to manually inspect database on failure
    Restart=no

    [Install]
    WantedBy=multi-user.target

Save the file and reload the systemd configuration with the command `systemctl daemon-reload`.

As we can see from the file patroni will be run as user "postgres". Please create a file `/etc/patroni_env.conf` with an editor and copy the following line into it:

    PATH=$PATH:/usr/lib/postgresql/14/bin

And then save the file. This is the path where the package management of your Linux distribution has installed the PostgreSQL binaries - and where Patroni should be able to find them.

Furthermore Patroni needs a configuration file (`patroni.yml`) in order to even start. The configuration of Patroni knows many parameters, which are explained in the [documentation](https://patroni.readthedocs.io/en/latest/yaml_configuration.html). Open the file as user "postgres" in `/var/lib/postgresql/patroni.yml` and copy the following content into it:

    scope: patroni42
    namespace: terra42
    name: prod1-postgresql-0

    restapi:
      listen: <instance-nebula-ip>:8008
      connect_address: <instance-nebula-ip>:8008

    consul:
      host: <instance-nebula-ip>:8500
      register_service: true
      cacert: /etc/consul/certificates/ca.pem
      cert: /etc/consul/certificates/cert.pem
      key: /etc/consul/certificates/private_key.pem
      dc: de-west

    bootstrap:
      dcs:
        ttl: 30
        loop_wait: 10
        retry_timeout: 10
        maximum_lag_on_failover: 1048576
        postgresql:
          use_pg_rewind: true
          use_slots: true
          parameters:

      # some desired options for 'initdb'
      initdb:  # Note: It needs to be a list (some options need values, others are switches)
      - encoding: UTF8
      - data-checksums

      pg_hba:  # Add following lines to pg_hba.conf after running 'initdb'
      - host replication replicator 127.0.0.1/32 md5
      - host replication replicator <instance-nebula-network> md5
      - host all all 0.0.0.0/0 md5
      - local all pmm md5

    # Additional script to be launched after initial cluster creation (will be passed the connection URL as parameter)
    # post_init: /usr/local/bin/setup_cluster.sh

      # Some additional users users which needs to be created after initializing new cluster
      users:
        admin:
          password: supergeheim
          options:
            - createrole
            - createdb

    postgresql:
      listen: "*:5432"
      connect_address: <instance-nebula-ip>:5432
      data_dir: /var/lib/postgresql/data
      pgpass: /tmp/pgpass0
      authentication:
        replication:
          username: replicator
          password: rep-pass
        superuser:
          username: postgres
          password: supergeheim
        rewind:  # Has no effect on postgres 10 and lower
          username: rewind_user
          password: rewind_password
      parameters:
        unix_socket_directories: '/var/run/postgresql'

    tags:
        nofailover: false
        noloadbalance: false
        clonefrom: false
        nosync: false

You have to change several lines in this configuration file in order to reflect your current setup. Behind `name` you should add the name of your VM or a name for your cluster node. Where you see `<instance-nebula-ip>` you have to insert the ip address of your respective VM in the overlay vpn. The same behind `listen`, `connect_address` (two times) and `host`. At `<instance-nebula-network>` you should insert the network address of your overlay VPN in CIDR notation (like this, e. g. `100.102.1.0/22`). 

As soon as you have finalised the configuration files for both PostgreSQL servers you can start Patroni - on one VM after the other - with the command `systemctl start patroni`. Patroni should start PostgreSQL and establish a replication. You can check the success with `patronictl`:

    postgres@postgresql-0:~$ patronictl -c patroni.yml list
    + Cluster: patroni42 (7550645978936616804) ---+-----------+----+-----------+
    | Member             | Host         | Role    | State     | TL | Lag in MB |
    +--------------------+--------------+---------+-----------+----+-----------+
    | prod1-postgresql-0 | 100.102.1.37 | Replica | streaming |  7 |         0 |
    | prod4-postgresql-0 | 100.102.1.36 | Leader  | running   |  7 |           |
    +--------------------+--------------+---------+-----------+----+-----------+

## Hints

Obviously there are many things to discover and configure around the subjects Consul and patroni. It can be helpful to install dnsmasq and to [configure](https://developer.hashicorp.com/consul/docs/manage/dns/forwarding/enable?page=services&page=discovery&page=dns-forwarding&page=enable) it to be able to use Consul DNS for all services on your VMs (especially on VMs, that want to access the database). This can allow you to go without a loadbalancer between database clients and servers (just use `primary.patroni42.service.consul` in your database access configuration):

    debian@nom-b544a874-fe78:~$ dig +short primary.patroni42.service.consul
    100.102.0.36
    debian@nom-b544a874-fe78:~$ dig +short replica.patroni42.service.consul
    100.102.0.37

Another interesting component is [Percona Monitoring and Management](https://docs.percona.com/percona-monitoring-and-management/3/index.html) which can be used for monitoring, alerting and inspection of the Patroni cluster and brings its own [dashboard](https://docs.percona.com/percona-monitoring-and-management/3/reference/dashboards/dashboard-postgresql-patroni-details.html?h=patroni) for it.

And patroni itself has a lot more to offer. Using [wal-g](https://wal-g.readthedocs.io/) patroni can save backup directly to S3, for example. Or be used to set up [multi-node citus clusters](https://patroni.readthedocs.io/en/latest/citus.html)  using the [citus extension](https://docs.citusdata.com/en/stable/installation/multi_node.html). It is worth in any case to go through the [patroni documentation](https://patroni.readthedocs.io/en/latest/index.html) to see all its features. 



