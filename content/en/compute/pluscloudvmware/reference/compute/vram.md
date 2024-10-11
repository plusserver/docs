---
title: "vRAM "
type: "docs"
weight: 10
date: 2024-07-12
description: >
  Information on virtual Memory in pluscloud VMware
---

Virtual machines (VMs) require virtual random access memory ({{< abbr "vRAM" "virtual Random Access Memory" >}}) to be able to run.
The memory is used to store data and programs for the [{{< pagetitle "vcpu" >}}]({{< ref "vcpu" >}}).

The {{< abbr "vRAM" "virtual Random Access Memory" >}} is an abstraction of the hardware-based {{< abbr "RAM" "Random Access Memory" >}} modules.
It is a volatile memory.
This means that this memory is not suitable for permanent data persistence, because there is no guarantee that the data will still be available after the VM is restarted.

## Options offered

You can only specify the size of the virtual memory.
The currently available values can be found in the product description.

| Option | Minimum          | Maximum              |
|--------|------------------|----------------------|
| vRAM   | 1 GiB = 1024 MiB | 128 GiB = 131072 MiB |

Please note:

* Only the specified vRAM range is supported.
* You can also set values outside the specified range.  
  In this case, however, it may happen that a VM does not start or no longer starts correctly after a restart.
* The allocated vRAM of a VM also consumes corresponding storage space.

## Setting up vRAM for VMs

You can read about this on the [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}}) page.
