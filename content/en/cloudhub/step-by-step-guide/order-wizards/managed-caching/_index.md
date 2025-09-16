---
title: "Managed Caching"
linkTitle: "Managed Caching"
type: "docs"
weight: 6
description: >
    Step by Step Guide for Managed Caching
---

## Introduction

Welcome to the [Managed Caching order wizard](https://cloudhub.plusserver.com/cloud-services/managed-caching/order). Here it is described which configuration options are available and how a new Managed Caching can be ordered.

In the following we guide you step by step through the ordering process and explain the individual selection options and input fields.

The Managed Caching is based on Valkey, a scalable and powerful in-memory database that is optimized for fast data processing and caching solutions.

![Managed Caching overview 1](img/managed-caching-overview1.png)
![Managed Caching overview 2](img/managed-caching-overview2.png)

## Step 1: Select instance type

Select the desired ratio of vCPU to vRAM:

### Basic Usage

- Nodes with a vCPU/vRAM ratio of 1:2

### All Purpose

- Nodes with a vCPU/vRAM ratio of 1:4

### RAM Optimised

- Nodes with a vCPU/vRAM ratio of 1:8

## Step 2: Select instance size

Depending on the selected instance type, there are different sizes to choose from:

### Basic Usage:

Instance sizes:

- b2-4 – 2 vCPU, 4 GB RAM – 0,11 €/Hour
- b4-8 – 4 vCPU, 8 GB RAM – 0,22 €/Hour
- b8-16 – 8 vCPU, 16 GB RAM – 0,44 €/Hour
- b16-32 – 16 vCPU, 32 GB RAM – 0,88 €/Hour
- b32-64 – 32 vCPU, 64 GB RAM – 1,76 €/Hour

### All Purpose:

Instance sizes:

- a2-8 – 2 vCPU, 8 GB RAM – 0,15 €/Hour
- a4-16 – 4 vCPU, 16 GB RAM – 0,31 €/Hour
- a8-32 – 8 vCPU, 32 GB RAM – 0,62 €/Hour
- a16-64 – 16 vCPU, 64 GB RAM – 1,23 €/Hour
- a32-128 – 32 vCPU, 128 GB RAM – 2,46 €/Hour

### RAM Optimised:

Instance sizes:

- r2-16 – 2 vCPU, 16 GB RAM – 0,24 €/Hour
- r4-32 – 4 vCPU, 32 GB RAM – 0,48 €/Hour
- r8-64 – 8 vCPU, 64 GB RAM – 0,97 €/Hour
- r16-128 – 16 vCPU, 128 GB RAM – 1,94 €/Hour

![Managed Caching Basic Usage](img/managed-caching-basic-usage.png)
![Managed Caching All Purpose](img/managed-caching-all-purpose.png)
![Managed Caching RAM Optimised](img/managed-caching-ram.png)

## Step 3: Storage size

Select the desired storage size via a slider:

- Min.: 50 GB
- Max.: 1000 GB
- Costs: 14,30 €/Month per 50 GB

![Managed Caching Memory size](img/managed-caching-storage.png)

## Step 4: Trusted Sources

Enter the permitted network addresses in CIDR format.

Example:
`10.10.10.10/24`

![Managed Caching Trusted Sources](img/managed-caching-sources.png)

## Step 5: Select region

Select the desired region for providing your database:

- DE-WEST-1 CGN3 (Cologne)
- DE-NORTH-2 HAM6 (Hamburg)

![Managed Caching Region](img/managed-caching-regions.png)

## Step 6: Project Contract ID

Choose whether there is already a project contract id:

- New project contract id
- Existing project contract id (selection from a list)

![Managed Caching Project Contract ID](img/managed-caching-existing-project.png)

## Step 7: Order Overview

The order overview displays a table with all configurations you have selected.
Below the table, there is a checkbox that allows you to accept the following attachments and terms.
The attachments include various downloadable PDF documents, such as the **General Terms and Conditions** and **other relevant contractual documents**.
To the right of the table, the total price and the Order button are displayed.
This button is disabled by default and will only be activated once the attachments and terms have been accepted.

![Managed Caching Order Overview](img/managed-caching-order-overview.png)
