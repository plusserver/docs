---
title: "PCO Prices"
weight: 20
date: 2023-06-26
---

# Introduction

This pricing table provides an overview of the server plans, load balancers, and storage options available, along with their respective costs. To calculate the hourly and monthly prices for each server plan, multiply the number of VCPUs and the amount of RAM (in GB) by their respective unit prices. As of April 2023, the unit prices are as follows:

* vCPU: €0.0205 per hour
* RAM: €0.007 per GB per hour
* Storage: €0.09 per GB per month
* Load balancer: €0.068 per hour

To calculate the monthly cost for a server plan, multiply the hourly cost by the number of hours in a month (assuming 720 hours per month). For example, for the SCS-1V:0.5 plan with 1 VCPU and 0.5 GB RAM, the hourly cost would be ```(1*€0.0205) + (0.5*€0.007) = €0.024```, and the monthly cost would be ```€0.024 * 720 = €17.28```.

The pricing information was last updated in April 2023 and is subject to change.

## Compute

| Name       | VCPUs | RAM (GB) | hourly  | monthly |
|------------|-------|----------|---------|---------|
| SCS-1V:0.5 | 1     | 0.5      | €0.0240 | €17.28  |
| SCS-1L:1   | 1     | 1        | €0.0275 | €19.80  |
| SCS-1V:1   | 1     | 1        | €0.0275 | €19.80  |
| SCS-1V:2   | 1     | 2        | €0.0345 | €24.84  |
| SCS-1V:4   | 1     | 4        | €0.0485 | €34.92  |
| SCS-1V:8   | 1     | 8        | €0.0765 | €55.08  |
| SCS-2V:2   | 2     | 2        | €0.0550 | €39.60  |
| SCS-2V:4   | 2     | 4        | €0.0690 | €49.68  |
| SCS-2V:8   | 2     | 8        | €0.0970 | €69.84  |
| SCS-2V:16  | 2     | 16       | €0.1530 | €110.16 |
| SCS-4V:8   | 4     | 8        | €0.1380 | €99.36  |
| SCS-4V:16  | 4     | 16       | €0.1940 | €139.68 |
| SCS-4V:32  | 4     | 32       | €0.3060 | €220.32 |
| SCS-8V:8   | 8     | 8        | €0.2200 | €158.40 |
| SCS-8V:16  | 8     | 16       | €0.2760 | €198.72 |
| SCS-8V:32  | 8     | 32       | €0.3880 | €279.36 |
| SCS-16V:32 | 16    | 32       | €0.5520 | €397.44 |
| SCS-16V:64 | 16    | 64       | €0.7760 | €558.72 |

{{% alert title="Info" %}}
Please note that the prices shown in the table are for plans with 0 Disk storage.
{{% /alert %}}

## Storage

| Name          | units | monthly |
|---------------|-------|---------|
| Block Storage | 1 GB  | €0.09   |

{{% alert title="Object Storage on PCO Fair Use Policy" %}}
Object Storage on PCO is based on Ceph RadosGW and is not subject to additional charges. The quota is limited to 20 GB / 20,000 objects.
{{% /alert %}}

## Network

| Name                | hourly     | monthly    |
| --------------------| -----------| -----------|
| Cloud Load Balancer | €0.068     | €48.96     |
| Public Floating IP  | €1.00      | €1.00      |

{{% alert title="Traffic Fair Use Policy" %}}
Incoming and Outgoing Standard network usage is not subject to additional charges.
{{% /alert %}}
