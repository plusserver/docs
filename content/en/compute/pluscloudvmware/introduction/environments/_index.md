---
title: "pluscloud VMware environments"
linkTitle: "Environments"
type: "docs"
weight: 30
date: 2024-06-27
description: >
  informationen on environments of pluscloud VMware
---

## What is a pluscloud VMware environment?

Each pluscloud VMware environment is a independent instance of the VMware vCloud Foundation ({{< abbr "VCF" "VMware vCloud Foundation" >}}) stack.
This means that each environment is a self-sufficient stack with its own management systems that support the workload on that environment.

Each pluscloud VMware Umgebung is associated with exactly one Availability Zone.

## Generally Available environments of pluscloud VMware

Please refer to [{{< pagetitle "/general/plusserver-region-az" >}}]({{< ref "/general/plusserver-region-az" >}}) for an introduction to plusserver regions and availabilty zone.

The following environments are generally available for customers.  
Environments dedicated to a single customer will not be listed publicly.

| Environment | Region | Availability Zone | vCloud Director endpoint              |
|-----------|----------|-------------------|---------------------------------------|
| de-1  (*) | DE-NORTH | DE-NORTH-1        | <https://de-1.vcd.get-cloud.io/>      |
| de-2  (*) | DE-NORTH | DE-NORTH-2        | <https://de-2.vcd.get-cloud.io/>      |
| de-3  (*) | DE-WEST  | DE-WEST-1         | <https://de-3.vcd.get-cloud.io/>      |
| de-31 (*) | DE-WEST  | DE-WEST-1         | <https://de-31.vcd.get-cloud.io/>     |
| de-4  (*) | DE-WEST  | DE-WEST-2         | <https://de-4.vcd.get-cloud.io/>      |
| de-5      | DE-NORTH | DE-NORTH-1        | <https://de-5.vcd.get-cloud.io/>      |
| de-6      | DE-NORTH | DE-NORTH-2        | <https://de-6.vcd.get-cloud.io/>      |
| de-7      | DE-WEST  | DE-WEST-1         | <https://de-7.vcd.get-cloud.io/>      |
| de-9      | DE-WEST  | DE-WEST-2         | <https://de-9.vcd.get-cloud.io/>      |
| de-11     | DE-WEST  | DE-WEST-1         | <https://de-11.vcd.get-cloud.io/>     |
| fr-1  (*) | FR       | FR-1              | <https://fr-1.vcd.get-cloud.io/>      |

{{% alert title="Note" color="info" %}}
**Legacy environments**  
Environments marked with an asterisk (*) are solely available to existing customers.
{{% /alert %}}
