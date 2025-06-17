---
title: "Management"
linkTitle: "Management"
type: "docs"
weight: 10
description: >
    Management of dedicated servers
---

## Firewall

### Restrictions

The firewall included with your dedicated server is a basic packet filter that only processes incoming packets. The following additional restrictions apply:

* Removing (not deactivating) ALL firewall rules results in the firewall itself being deactivated - no more filtering takes place (Any-Any Accept)!
* This also means: Adding a single rule always activates the firewall - only packets that have been explicitly enabled are allowed.
* A maximum of 20 rules can be created.
* We do not have any logs of rejected or accepted packets, so these cannot be used to assist with troubleshooting.

### How to edit

To edit the firewall rules of your server, log in to CloudHub and open the dashboard of your server (Cloud Services -> Dedicated Server -> Select Server). At the bottom of the page you will find "Firewall configurations".

The firewall rules are divided into IPv4/IPv6 rules (1). To edit the rules, switch to edit mode (2).

![Firewall Regeln im Cloudhub](../bmc-firewall-1.png)

#### Editing and adding rules

If you want to add new firewall rules (1), please note the following:

* "Order" (2) affects the sorting of the firewall rules according to the numerical value. It is also possible to sort the existing rules using drag & drop.
* Source and destination ports (3, 4) are optional fields. If these are left empty, this corresponds to "any" or all ports.

![Firewall Regeln editieren](../bmc-firewall-2.png)

The changes are then saved via "Save" & "Confirm changes". It may take a few minutes for the changes to become active.

## Hard disks

In the default configuration, your server has two hard disks, configured as RAID 1, on which the operating system is installed. Any additional hard disks are not configured automatically - this must be done using configuration tools:

### Installation RAID management tool

To configure the RAID, you will need to use a proprietary HPE tool, which is available on our mirror.

```bash
wget https://mirror.plusserver.com/hp-mcp/debian/pool/non-free/ssacli-6.45-8.0_amd64.deb -O ssacli.deb
dpkg -i ssacli.deb
```

for Ubuntu

```bash
wget https://mirror.plusserver.com/hp-mcp/ubuntu/pool/non-free/ssacli-6.45-8.0_amd64.deb -O ssacli.deb
dpkg -i ssacli.deb
```

### Configure RAID

To configure the RAID, the identifier of the unassigned SSDs must be determined. This is done using the command `ssacli ctrl slot=0 pd all show`, ant the output looks like this, for example:

```bash
ssacli ctrl slot=0 pd all show

(...)

   Unassigned

      physicaldrive 1I:2:1 (port 1I:box 2:bay 1, SATA SSD, 480 GB, OK)
      physicaldrive 1I:2:2 (port 1I:box 2:bay 2, SATA SSD, 480 GB, OK)
```

To proceed, we need the ID that is shown after "physicaldrive" - in this case `1I:2:1` and `1I:2:2`. These IDs can be used to create a new RAID1:

```bash
ssacli ctrl slot=0 create type=ld drives=1I:2:1,1I:2:2 raid=1
```

If you have booked 4 or more additional disks and want to create a RAID10, all drives must be specified accordingly, the RAID level is called "1+0" instead of "10" - e.g. like this:

```bash
ssacli ctrl slot=0 create type=ld drives=1I:2:1,1I:2:2,1I:2:3,1I:2:4 raid=1+0
```

{{% alert title="Warning" color="warning" %}}
Always choose a RAID level with redundancies, as we proactively replace defective hard drives.
{{% /alert %}}

You can then use `ssacli ctrl slot=0 ld all show detail` to view the information on the configured logical drives - the path to the block device is also displayed there, which can then be partitioned and formatted as usual.
