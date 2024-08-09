---
title: "VM Hot Add"
type: "docs"
weight: 40
date: 2024-08-07
description: >
  Information on using VMware VM Hot Add
---

By default, when you want to add new hardware to your VMs, only a very few types of hardware can be added while the VM is powered on. These include virtual network adapter(s) (NIC), USB adapter(s), and hard disk(s).
If you want to add some other type of hardware, or more RAM or CPU, you usually have to power off the VM. You can enable hot-add memory or hot-add CPU on your VMs.

## Advantages of Hot Add

**No downtime for your VMs** – Whenever you need to provide your VMs with more RAM or vCPUs without shutting them down, you can do it via Hot Add CPU or Hot Add RAM.

**CPU and RAM are ready to be used** – If you need more CPU or RAM, you can simply go to the configuration page while your VM is running and change the number of CPUs or increase the RAM.

## Disadvantages and limitations of Hot Add

**Overhead** – Some overhead (in percent) is added when you enable Hot Add, but when you consider the advantages, it might be worth it.

**No vNUMA** – Another disadvantage is the fact that the VM will lose the ability to use virtual non-uniform memory access (vNUMA). This memory-access optimization method is automatically enabled for VMs with more than eight vCPUs.

**OS Licensing** – Your current guest OS license may prevent you from adding extra vCPUs or memory. You see, you may run beyond the vCPU or memory limit with that hot-plug/hot-add.

## How to turn on Hot Add vCPU and Memory

This features can only be enabled in a Powered off VM. You can enable this features by editing Compute configuration for the machine, and enabling **Virtual CPU hot add** and/or **Memory hot add**
