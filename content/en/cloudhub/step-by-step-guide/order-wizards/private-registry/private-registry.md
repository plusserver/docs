---
title: "Private Registry"
linkTitle: "Private Registry"
type: "docs"
weight: 4
description: >
    Step by Step Guide for Private Registry
---

## Introduction

Welcome to the private registry order wizard. Here it is described which configuration options are available and how a new private registry can be ordered.

In the following we guide you step by step through the ordering process and explain the individual selection options and input fields.

The private registry is based on Harbor, a cloudnative open source registry for container images.


![Private Registry Overview 1](../img/private-registry-overview1.png)
![Private Registry Overview 2](../img/private-registry-overview2.png)

## Step 1: Instance type

Only one instance type is currently available:

- Basic usage
- Nodes with a vCPU/vRAM ratio of 1:2

![Private Registry Instance type](../img/private-registry-instanz-type.png)

## Step 2: Instance size

Select one of the following instance sizes:

- B2-4
- 2 vCPU(s) and 4 GB RAM
- 0.11 €/hour

- B4-8
- 4 vCPU(s) and 8 GB RAM
- 0.22 €/hour

![Private Registry Instance size](../img/private-registry-instanz-size.png)

## Step 3: Storage Size


Select the desired storage size via a slider:

- Min.: 50 GB
- Max.: 1000 GB
- Costs: 7,15 €/month per 50 GB

![Private Registry Storage Size](../img/private-registry-storage.png)

## Schritt 4: Trusted Sources

Enter the permitted network addresses in CIDR format.
This is a required field.

Example:
`10.10.10.10/24`

![Private Registry Trusted Sources](../img/private-registry-sources.png)

## Schritt 5: Region selection

Select the desired region for providing the registry:

- DE-WEST-1 CGN3 (Cologne)
- DE-NORTH-2 HAM6 (Hamburg)

![Private Registry Region](../img/private-registry-region.png)

## Schritt 6: Project Contract ID

Select whether a project contract ID already exists:

- New project contract ID
- Existing project contract ID (select from a list)

![Private Registry Project Contract ID](../img/private-registry-existing-project.png)
