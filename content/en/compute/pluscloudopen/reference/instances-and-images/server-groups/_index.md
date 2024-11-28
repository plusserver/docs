---
title: "Server groups"
type: "docs"
weight: 60
date: 2024-02-09
description: >
  Using server groups to apply (anti-)affinity
---

## Overview

Server groups provide a mechanism for indicating the locality of servers relative to other servers. They allow you to indicate whether servers should run on the same host (affinity) or different hosts (anti-affinity). Affinity is advantageous if you wish to minimise network latency, while anti-affinity can improve fault-tolerance and load distribution.

### Available policies

* affinity

  Restricts instances belonging to the server group to the same host and fail if the instance cannot be placed on this host.
  {{% alert title="Restrictions" color="warning" %}}
  Please note that we restart each hypervisor (host on which your VM is running) once a month to install updates. Since we cannot guarantee that the entire affinity group can be migrated to another hypervisor, all VMs within the group will remain on the      hypervisor that is being updated. As a result, all VMs in this group will be switched off for the duration of the reboot. You can find more information about our regular maintenance work [here](../../../introduction/environments/#maintenance).
  {{% /alert %}}

* anti-affinity
  
  Restricts instances belonging to the server group to separate hosts.

* soft-affinity
  
  Attempts to restrict instances belonging to the server group to the same host. Where it is not possible to schedule all instances on one host, they will be scheduled together on as few hosts as possible.

* soft-anti-affinity

  Attempts to restrict instances belonging to the server group to separate hosts. Where it is not possible to schedule all instances to separate hosts, they will be scheduled on as many separate hosts as possible.

### Restrictions

* Server groups can only be assigned to the VM when the server is created.
* VMs can only be removed individually from server groups when you *delete* the VM.

### Use cases

* When using [Local SSD Storage](../../local-storage/), it is highly recommended that you use server groups with an **anti-affinity** policy to achieve fault tolerance against a hypervisor failure or hypervisor maintenance work.

### How to apply server groups on an instance

<img src="2023-03-31_13-54.png" alt="screenshot of the server group menu" width="50%" height="50%" title="Server Group Menu">
<br/><br/>
