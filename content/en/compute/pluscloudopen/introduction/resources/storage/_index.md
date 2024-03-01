---
title: "Storage"
type: "docs"
weight: 30
date: 2023-03-10
description: >
  Storage options in pluscloud open
---

# What are the pluscloud open storage options?

{{% alert title="Note" color="info" %}}
Unless stated otherwise storage within a pluscloud open environment is high availabile
{{% /alert %}}

## Block Storage

pluscloud open provides shared block storage based on Ceph. It provides a cost-effective general-purpose storage solution for applications that require persistent storage. Ceph Block storage is also replicated synchronously on three nodes which makes it highly reliable. However, latency sensitive applications might not be the perfect match for this storage type.

In addition to the basic block storage functionality, pluscloud open also offers the ability to create snapshots and backups of the volumes, making it easier to manage and restore data. Snapshots allow for point-in-time backups of volumes, while backups provide full copies of the volumes that can be used for disaster recovery or other purposes.

## Local SSD Storage

{{% alert title="Note" color="info" %}}
pluscloud open will soon offer the Local SSD Storage option.
{{% /alert %}}

Standard shared storage based on Ceph has a balanced performance profile that is not suitable for all use cases. In particular, Etcd and transactional databases such as Postgres are known to have performance issues here.

pluscloud open offers Local SSD Storage as an option for storing data on instances. Local SSD Storage is non-shared storage that is physically attached to the instance and provides high input/output operations per second (IOPS) and low latency. It is ideal for applications that require high performance and low latency.

Local SSD Storage is ideal for volatile or temporary workloads such as caches. Also good candidates for Local SSD Storage are highly automated replicated databases or key-value stores such as Patroni or Etcd, which have automatic replication and failover built into the software stack.

{{% alert title="Note" color="warning" %}}
Local SSD Storage shares the same lifecylce as the VM instance. If the VM is deleted or crashes the Local SSD storage data will be lost as well. What's more, your VMs cannot be resized or live-migrated to another hypervisor in case of a hypervisor maintenance. In the event of a hardware failure your Local SSD data could be completely lost. Even if there is no disk failure, there will be regular disk downtime.
{{% /alert %}}

See [reference](../../../reference/local-storage/) to learn how to use Local SSD Storage.

## Object Storage

Object Storage on pluscloud open is a versatile storage solution built to accommodate moderate data and file storage needs. Based on the Ceph RadosGW technology, it is designed for seamless integration with cloud-native workflows and Infrastructure as Code (IaC) processes within the pluscloud open environment.

Key features of Object Storage on pluscloud open include:

- OpenStack Swift and Amazon S3 compatibility for enhanced interoperability
- Accessible via both the GUI (Horizon) and CLI for ease of use
- Integrated into the OpenStack rights management system for secure access control
- Quota of 20 GB and 20,000 objects to cater to moderate storage requirements

With Object Storage on pluscloud open, customers can enjoy a hassle-free storage experience while benefiting from the platform's robust capabilities and seamless integration.

{{% alert title="Note" color="info" %}}
Object Storage on pluscloud open is designed for moderate amounts of data and file storage needs. However, for larger-scale data storage requirements, plusserver provides a dedicated solution called "S3 Storage". This solution offers highly scalable, cost-effective object storage with maximum availability, as well as optional georedundancy features. With S3 Storage, users can easily store and retrieve large amounts of data, ensuring data availability and accessibility in case of any infrastructure failure or other disruptions.
{{% /alert %}}

See [reference](../../../reference/object-storage/) to learn how to use Object Storage.
