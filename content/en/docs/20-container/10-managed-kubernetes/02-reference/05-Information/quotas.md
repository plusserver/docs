---
title: "PSKE - Quotas"
linkTitle: "Quotas"
weight: 30
date: 2023-02-21
---
Quotas are operational limits that can be set on a per-project or per-user basis in OpenStack and in your PSKE Project. They are used to control the amount of resources that a project or user can consume. Quotas can be set for a variety of resources, including compute, storage, and networking.

The table below provides the standard quotas initially set for every Project:

| Item                      |      Size |
|---------------------------|----------:|
| Cores                     | 256 Cores |
| RAM                       |    512 GB |
| Instances                 |       500 |
| Floating IPs              |        10 |
| Networks                  |       500 |
| Router                    |       500 |
| Subnets                   |       500 |
| Max. Volumes              |      1000 |
| Max. Volume-Size          |   4000 GB |
| Max. Snapshots per Volume |        99 |
| Max. Backups              |        99 |
| Max. Backup-Size          |   2000 GB |
| Key Pairs (SSH)           |       500 |
| Metadata Items            |       100 |
| Security Groups           |       500 |
| Security Group Limits     |       500 |
| Server Groups             |        10 |
| Server Group Memebers     |        15 |


Quotas can be set using the OpenStack command-line interface or the OpenStack dashboard.

{{< alert color="warning" title="Warning">}} If you only have a contract for the PSKE, please contact our support to increase your quotas. {{< /alert >}}

To set quotas using the command-line interface, use the openstack quota set command. For example, to set the maximum number of instances to 100 for the project myproject, you would use the following command:

```bash
openstack quota set --instances=100 myproject
```

To set quotas using the OpenStack dashboard, go to the Project Overview page and click on the Quotas tab.

Quotas are an important part of OpenStack resource management. They can help to prevent users from consuming too many resources and causing performance problems for the cloud.



