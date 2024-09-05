
---
title: "Compute Flavors"
type: "docs"
weight: 60
date: 2024-09-05
description: >
  List of available Compute Flavors
---

## Overview

Compute Flavors are predefined configurations that determine the amount of CPU, RAM, and storage
resources allocated to a virtual machine. Each Flavor offers a different combination of these resources,
allowing users to select the appropriate one based on the performance needs of their applications.

pluscloud open uses the [SCS standard](https://github.com/SovereignCloudStack/standards) for Flavor naming.
This standard uses a combination of letters and numbers to describe the specifications of each Flavor.
The first part of the name identifies the number of virtual CPUs (vCPUs) available in the Flavor, while the second part describes the amount of random access memory (RAM) available.
The third part, if present, indicates the amount of disk space allocated for the instance.
All Flavors following that standard are prefixed with "SCS-".


{{% alert title="Note" color="info" %}}
Regular Compute Flavors with disks are now deprecated in favor to diskless Flavors to avoid confusion with Local SSD Storage (indicated by an 's' after the disk size).
{{% /alert %}}

## Available Flavors

The following table shows the list of all public Compute Flavors:

| Name           | RAM (MB) | vCPUs | Disk (GB) |
|----------------|----------|-------|-----------|
| SCS-1V-0.5 | 512 | 1 | 0 |
| SCS-1V-1 | 1024 | 1 | 0 |
| SCS-1L-1 | 1024 | 1 | 0 |
| SCS-1V-2 | 2048 | 1 | 0 |
| SCS-1V-4 | 4096 | 1 | 0 |
| SCS-1V-8 | 8192 | 1 | 0 |
| SCS-2V-2 | 2048 | 2 | 0 |
| SCS-2V-4 | 4096 | 2 | 0 |
| SCS-2V-8 | 8192 | 2 | 0 |
| SCS-2V-16 | 16384 | 2 | 0 |
| SCS-4V-8 | 8192 | 4 | 0 |
| SCS-4V-16 | 16384 | 4 | 0 |
| SCS-4V-32 | 32768 | 4 | 0 |
| SCS-8V-8 | 8192 | 8 | 0 |
| SCS-8V-16 | 16384 | 8 | 0 |
| SCS-8V-32 | 32768 | 8 | 0 |
| SCS-16V-32 | 32768 | 16 | 0 |
| SCS-16V-64 | 65536 | 16 | 0 |
| SCS-2V-4-20s | 4096 | 2 | 20 |
| SCS-4V-16-100s | 16384 | 4 | 100 |


## Deprecated Compute Flavors

As a certified Souvereing Cloud Stack, we implement the latest Compute Flavor specifications.
Part of the lifecycle management is also to deprecate old Compute Flavors. The 'os:deprecation' property is used to indicate when a
particular Compute Flavor is set for deprecation, signalling that it may be removed or phased out in the future.
You can also find a note in the description field.

The following table shows deprecated Compute Flavors and their deprecation date.


{{% alert title="Note" color="warning" %}}
Please ensure that you change your infrastruction code to only use the current Compute Flavors and replace all existing instances.
{{% /alert %}}

| Name           | RAM (MB) | vCPUs | Disk (GB) | Deprecation Date |
|----------------|----------|-------|-----------|------------------|
| SCS-1L-1-5 | 1024 | 1 | 5 | 2024-12-31 |
| SCS-1V-0.5-20 | 512 | 1 | 20 | 2024-12-31 |
| SCS-1V-1-10 | 1024 | 1 | 10 | 2024-12-31 |
| SCS-1V-1-20 | 1024 | 1 | 20 | 2024-12-31 |
| SCS-1V-2-5 | 2048 | 1 | 5 | 2024-12-31 |
| SCS-1V-4-10 | 4096 | 1 | 10 | 2024-12-31 |
| SCS-1V-8-20 | 8192 | 1 | 20 | 2024-12-31 |
| SCS-2V-2-20 | 2048 | 2 | 20 | 2024-12-31 |
| SCS-2V-4-10 | 4096 | 2 | 10 | 2024-12-31 |
| SCS-2V-4-20 | 4096 | 2 | 20 | 2024-12-31 |
| SCS-2V-4-50 | 4096 | 2 | 50 | 2024-12-31 |
| SCS-2V-4-100 | 4096 | 2 | 100 | 2024-12-31 |
| SCS-2V-8-20 | 8192 | 2 | 20 | 2024-12-31 |
| SCS-2V-8-100 | 8192 | 2 | 100 | 2024-12-31 |
| SCS-2V-16-50 | 16384 | 2 | 50 | 2024-12-31 |
| SCS-4V-8-20 | 8192 | 4 | 20 | 2024-12-31 |
| SCS-4V-8-50 | 8192 | 4 | 50 | 2024-12-31 |
| SCS-4V-8-100 | 8192 | 4 | 100 | 2024-12-31 |
| SCS-4V-16-50 | 16384 | 4 | 50 | 2024-12-31 |
| SCS-4V-16-100 | 16384 | 4 | 100 | 2024-12-31 |
| SCS-4V-32-100 | 32768 | 4 | 100 | 2024-12-31 |
| SCS-4V-32-50 | 32768 | 4 | 50 | 2024-12-31 |
| SCS-8V-8-100 | 8192 | 8 | 100 | 2024-12-31 |
| SCS-8V-16-50 | 16384 | 8 | 50 | 2024-12-31 |
| SCS-8V-16-100 | 16384 | 8 | 100 | 2024-12-31 |
| SCS-8V-32-50 | 32768 | 8 | 50 | 2024-12-31 |
| SCS-8V-32-100 | 32768 | 8 | 100 | 2024-12-31 |
| SCS-16V-32-100 | 32768 | 16 | 100 | 2024-12-31 |
| SCS-16V-64-100 | 65536 | 16 | 100 | 2024-12-31 |
| SCS-2V:4:100 | 4096 | 2 | 100 | 2024-12-31 |
| SCS-2V:8:100 | 8192 | 2 | 100 | 2024-12-31 |
| SCS-2V:16:50 | 16384 | 2 | 50 | 2024-12-31 |
| SCS-4V:8:100 | 8192 | 4 | 100 | 2024-12-31 |
| SCS-4V:16:100 | 16384 | 4 | 100 | 2024-12-31 |
| SCS-4V:32:100 | 32768 | 4 | 100 | 2024-12-31 |
| SCS-8V:8:100 | 8192 | 8 | 100 | 2024-12-31 |
| SCS-8V:16:100 | 16384 | 8 | 100 | 2024-12-31 |
| SCS-8V:32:100 | 32768 | 8 | 100 | 2024-12-31 |
| SCS-16V:32:100 | 32768 | 16 | 100 | 2024-12-31 |
| SCS-16V:64:100 | 65536 | 16 | 100 | 2024-12-31 |
