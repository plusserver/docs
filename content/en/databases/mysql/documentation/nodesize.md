---
title: "Node Size"
linkTitle: "Node Size"
type: "docs"
---

## Compute Ressources

You can choose the node size that best fits your specific requirements and workload demands. For example, if you anticipate working with large datasets or performing complex queries, you may opt for a node size with higher RAM (such as "r" or "a" series). Conversely, for simpler workloads or cost-effective solutions, you may choose a basic configuration with fewer resources (such as "b" series).

### Basic (b)

Provides a balanced configuration suitable for standard database operations.

| node_size | vCPU | vRAM |
|-----------|------|------|
| b32-64    | 32   | 64   |
| b16-32    | 16   | 32   |
| b8-16     | 8    | 16   |
| b4-8      | 4    | 8    |
| b2-4      | 2    | 4    |

### All-purpose(a)

Offers a balanced configuration with a focus on versatility and moderate resource allocation.

| node_size | vCPU | vRAM |
|-----------|------|------|
| a32-128   | 32   | 128  |
| a16-64    | 16   | 64   |
| a8-32     | 8    | 32   |
| a4-16     | 4    | 16   |
| a2-8      | 2    | 8    |

### RAM-optimized (r)

Offers higher RAM allocation for memory-intensive workloads.

| node_size | vCPU | vRAM |
|-----------|------|------|
| r16-128   | 16   | 128  |
| r8-64     | 8    | 64   |
| r4-32     | 4    | 32   |
| r2-16     | 2    | 16   |

***vCPU:** The number of virtual Central Processing Units (CPUs) allocated to the database instance. More vCPUs generally allow for better performance when running multiple tasks simultaneously.*

***vRAM:** The amount of virtual Random Access Memory (RAM) allocated to the database instance. RAM is used by the database to store temporary data and perform operations. More RAM can improve the database's ability to handle large datasets and complex queries efficiently.*

> *Changing the Node Size will cause a short interruption of the service as the node is rolled out again with adjusted resources.*

## Storage Size

>*The data disk size can only be increased. To reduce the disk size, you must create a new DBaaS instance and transfer the data manually.*

The persistent disk size determines the capacity for storing your database data. Every Database-as-a-Service (DBaaS) instance requires a minimum disk size of 50GB. You can increase the disk size in increments of 50GB, up to a maximum of 500GB. Increasing the storage size doesn't cause an interruption of the DBaaS.

<br>

**To customize your DBaaS Node Size, please [open a ticket](https://customerservice.plusserver.com/support/ticket-create) with our support team.**

<br>

>*We're working on a feature to let you directly modify the Node Size in our customer portal. Until then we thank you for your patience as we improve our services.*
