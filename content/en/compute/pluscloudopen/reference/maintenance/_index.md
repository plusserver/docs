---
title: "Maintenance"
type: "docs"
weight: 50
date: 2024-11-21
description: >
  Working maintenance metadata on instances
---

## Maintenance

### Platform maintenance

An update/maintenance of the platform is always announced in advance and includes all Openstack components. This usually has no impact on your workload (VMs, Kubernetes clusters, ...). “Only” the APIs are affected, as the underlying services have to be restarted. This maintenance work usually takes place once every six months.

### Hypervisor maintenance

Each hypervisor must be updated and restarted at regular intervals. This is usually the case once a month.

Scheduled maintenance windows usually take place every day after 22:00 CEST.
A normal restart of the hypervisor takes about 15 minutes, but can take longer in exceptional cases.

Before a hypervisor is restarted, we try to migrate all VMs live to another one so that there is no impact on the VMs. However, there is a metadata key called **ps_automatic_maintenance** that informs you when the migration will take place and you can decide whether or not to take action before the migration. However, most applications have no problems with live migration.

{{% alert title="However, there are exceptions!" color="warning" %}}{{% /alert %}}

## Exceptions

All VMs to which these exceptions apply receive an ACPI shutdown signal before maintenance. The VMs have **approximately a minute to shut down properly**.

After this time has elapsed, they are simply shut down.

You should assume that your VMs will remain powered off after the hypervisor restarts. However, you can change this behavior by setting the metadata key **ps_restart_after_maint=true**. In this case, your VM will be restarted after the underlying hypervisor has been rebooted.

### Flavor based

You can recognize the exceptions by the fact that certain key-value pairs are set in the **_Properties_** field in the flavor that you select when creating your VM.

```bash
openstack flavor list --long --column Name --column Properties | grep "aggregate_instance_extra_specs:localdisk='true'"
| SCS-2V-4-20s    | aggregate_instance_extra_specs:localdisk='true', hw_rng:allowed='True', quota:disk_read_bytes_sec='1024000000', quota:disk_read_iops_sec='100000', quota:disk_write_bytes_sec='1024000000', quota:disk_write_iops_sec='100000', scs:cpu-type='shared-core', scs:disk0-type='ssd', scs:name-v1='SCS-2V:4:20s', scs:name-v2='SCS-2V-4-20s'                            |
| SCS-4V-16-100s  | aggregate_instance_extra_specs:localdisk='true', hw_rng:allowed='True', quota:disk_read_bytes_sec='1024000000', quota:disk_read_iops_sec='100000', quota:disk_write_bytes_sec='1024000000', quota:disk_write_iops_sec='100000', scs:cpu-type='shared-core', scs:disk0-type='ssd', scs:name-v1='SCS-4V:16:100s', scs:name-v2='SCS-4V-16-100s'
```

Flavors with the following properties are **stopped** during maintenance work:

* 'ops.maintenance_action': 'stop'
* 'aggregate_instance_extra_specs:localdisk': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen1': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen2': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen3': 'true'
* 'pci_passthrough:alias': 'l40:1'

Flavors with the following properties are migrated **live** during maintenance work:

* aggregate_instance_extra_specs:ceph='true'
* ops.maintenance_action = 'migrate'

### Server groups

For the [server groups](../instances-and-images/server-groups/) there is only one exception and that is the 'hard' affinity. We have to shut down the VMs because there is no safe way to migrate them live.

To perform the migration of such affinity groups, the Openstack distribution mechanism (nova-scheduler) would have to be temporarily disabled for the VM. If this scheduler is switched off, it can no longer be guaranteed that the VM from this group can run on the target hypervisor at all. Checks for CPU and Ram resources, available storage, network and much more are missing, so it would be an action on good luck.

All other [Server Group Policies](../instances-and-images/server-groups/#Available%20Policies) can be migrated live.

## Metadata Overview

| Metadaten-Feld            | Type                | Default | Who set this | Info                                                                                             |
| ------------------------- | ------------------- | ------- | ------------ | ------------------------------------------------------------------------------------------------ |
| ps_automatic_maintenance  | datetime (ISO8601)  | none    | Plusserver   | Shows when general maintenance work is being carried out on the underlying hypervisor.           |
| ps_scheduled_shutdown     | datetime (ISO8601)  | none    | Plusserver   | Informs at what time a VM is stopped for maintenance work.                                       |
| ps_restart_after_maint    | boolean             | false   | Kunde        | The customer then informs plusserver that the VM should be restarted after the maintenance work. |

## Set the restart option

Openstack Cli example to restart a VM after maintenance work:

```bash
 openstack server set --property "ps_restart_after_maint=true" 01234567-0123-0123-0123-0123456789ab
```

## Reading out the time stamps

Curl example of how to read the metadata in the running VM:

```bash
curl -s http://169.254.169.254/openstack/latest/meta_data.json | jq -r '.meta.ps_scheduled_downtime'
2024-06-29T09:02:51Z
```

Openstack Cli Example of how to read the metadata from outside the VM:

```bash
openstack server show b08cad3c-3c21-4201-9520-7d7fe20e1d98 --column properties
+------------+-----------------------------------------------------------------------------------------------+
| Field      | Value                                                                                         |
+------------+-----------------------------------------------------------------------------------------------+
| properties | ps_automatic_maintenance='2024-06-29T09:02:51Z', ps_scheduled_downtime='2024-06-29T09:02:51Z' |
+------------+-----------------------------------------------------------------------------------------------+
```

## Example use case

We provide you with the metadata so that you can react before maintenance work is carried out on the hypervisor.

Imagine you have a cluster of 3 VMs and you know that the cluster would not survive a downtime of a member of about 15 minutes (can take longer in case of hardware errors). In this case you would need a watchdog or health monitor for your cluster that checks this metadata every 5 minutes and acts if it notices that **ps_scheduled_downtime** has a timestamp in the future. In this case, this agent could remove the VM from the cluster in a controlled manner, delete the VM, then roll out the VM again and add it to the cluster again. This mechanism is much faster than waiting for the VM to restart after maintenance work on the hypervisor.
