---
title: "vCPU "
type: "docs"
weight: 20
date: 2024-07-12
description: >
  Information on virtual CPUs in pluscloud VMware
---

Virtual Machines (VMs) require at least one virtual {{< abbr "CPU" "Central Processing Unit" >}} to be able to run.

A {{< abbr "vCPU" "virtual Central Processing Unit" >}} comprises one or more virtual CPU cores, which are referred to as vCores.
Each vCore corresponds to a hardware thread on a physical CPU.
Each {{< abbr "vCPU" "virtual Central Processing Unit" >}} executes command sequences for the operating system of the {{< abbr "VM" "virtual machine" >}} or the application programs executed there.

## Options offered

You can choose between "Standard CPU" and "High Performance CPU". This selection always refers to an entire virtual data center ({{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}, see section [Datacenter]({{< ref "/compute/pluscloudvmware/introduction/quickstart#datacenter" >}}) on the [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}})) page.

Depending on the selection, the clock speed of the vCores and the maximum number of configurable vCores per VM will differ.
The current values can be found in the product description.

At the time of writing, the following values apply:

| Option                 | Clock speed      | Number of vCores          |
|------------------------|------------------|---------------------------|
| Standard vCore         | at least 2.0 GHz | whole number from 1 to 32 |
| High-Performance vCore | at least 3.1 GHz | whole number from 1 to 16 |

Please note:

* All vCores of a VM have the same clock speed.
* All VMs of a {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} use the same type of vCPU.
* Proportional configuration of vCPUs is not possible.
* There is no entitlement to a specific CPU model or a specific manufacturer.

## Setting up vCPUs for VMs

You can read about this on the [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}}) page.
