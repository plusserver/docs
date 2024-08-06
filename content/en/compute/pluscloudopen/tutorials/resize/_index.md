---
#https://gohugo.io/content-management/page-bundles/
title: "Instance Resize"
type: "docs"
weight: 1
date: 2024-07-30
description: >
  Resize your instances
---

## Overview

Changing cpu-, memory- or storage-capacity of instances can be neccessary. Maybe you have misjuged the initial setup of the VM or you want to increase cpu- or memory-resources in order to test an application with different setups.
Instead of re-deploying the VM from scratch, you can just change the flavor. The VM will be stopped and started again with the new flavor. Additional info on that topic can be found in the official [Openstack-Documentation](https://docs.openstack.org/nova/latest//user/resize.html).

## Resize 

In order to change the instance size choose the option "**Resize Instance**" from the "**Actions**" menu in the instance tab:

![screenshot of the instances tab](resize-instance.png)

In the following menu just choose a new flavor for your instance:

![screenshot of the resize menu](resize-instance-menu.png)

After choosing a new flavor, you see a display of details and the impact on the current quota of the project:

![screenshot of the resize menu 2](resize-instance-menu-2.png)

Clicking on "**Resize**" will apply the new flavor to your instance. It will be stopped and re-started if you confirm the resize. Otherwise you'd have to revert the resize.

![screenshot acknowledge](acknowledge-resize.png)

A click on "**Confirm Resize/Migration**" will confirm the change.  "**Revert Resize/Migration**" would allow to revert the change.

After the re-start the instance is available to you with the new flavor applied.

---
**Note**

It is not possible to change storage classes by resizing an instance. Thus you cannot change from ceph storage to local-ssd storage by changing the flavor from SCS-2V-4-20 to SCS-2V-4-20s.

---