---
title: "Server Groups"
type: "docs"
weight: 60
date: 2024-02-09
description: >
  Using Server Groups to apply (Anti-)Affinity
---

## Overview

Server Groups allow you to specify a set of VMs that must run on the same hypervisor (affinity) or on different hypervisors (anti-affinity). In general, anti-affinity is good for fault tolerance and load balancing, while affinity is useful if you want to minimise network effects between your VMs.

When using [Local SSD Storage](../../local-storage/), it is highly recommended that you use of Server Groups to achieve fault tolerance against a hypervisor failure.

With "**Server Groups**" you can assign your new instance to an existing server group in order to let your new instance be created either next to other instances in that server group or explicitly not next to other instances in that group (affinity - anti-affinity).

<img src="2023-03-31_13-54.png" alt="screenshot of the server group menu" width="50%" height="50%" title="Server Group Menu">
<br/><br/>

Server groups can have affinity, anti-affinity, soft-affinity and soft-anti-affinity policies. While the affinity policy will fail (and not create the instance), when it cannot place the new instance next to an existing instance of that server group, the soft-affinity policy will place the new instance not next to an existing instance of that server group, if it is not possible (but create the new instance anyway).