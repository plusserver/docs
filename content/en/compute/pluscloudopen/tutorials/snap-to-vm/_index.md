---
#https://gohugo.io/content-management/page-bundles/
title: "Rebuild an Instance from a Snapshot"
type: "docs"
date: 2023-07-26
description: >
  Create a Snapshot from your VM, delete it, and rebuild it again
---

## Overview

The scope of this document is to enable users to create a snapshot from an existing vm, delete the vm to remove it from pluscloud open and rebuild the vm again from the snapshot taken earlier. Pre- and post-checks should be done by the user before and after this procedure where needed. 

Note: VM tends to pickup different IPs if not assigned statically. The floating IPs will be detached from VM but they will remained assigned to port in the project.  The floating IPs are billed as long as they are part of the project they need to be removed from the project if not desired.


## Pre-Checks from the User

Please do check below items (you need to know them to rebuild the VM afterwards) before executing the procedure. The pre-checks may extend beyond below items depending on the vm type.

* Attached Networks 
* Network Reachability
* Mounted storages
* Application status

![screenshot of the console instance pre](screenshot-console-1.png)

## Snapshot creation and verification

Login to your project and check the vm you want to snapshot. Under the actions tab use "Create Snapshot" to open the snapshot menu. 

![screenshot of the instances menu](create-snapshot.png)

In the opening dialogue enter a name for the snapshot and afterwards click "Create Snapshot":

![screenshot of the create snapshot menue](snapshot-menu.png)

After the snapshot has been created, it should show up under the **Snapshots** tab:

![screenshot of the snapshots list](snapshots-list.png)

---
**In the CLI**

``openstack server image create <instance name> --name <snapshot name>``
---

## VM deletion

As you have now successfully taken a snapshot of your vm, you can power off your vm 

![screenshot of the instance being shut off](shut-off-instance.png)

and delete it:

![screenshot of the instance being deleted](delete-instance.png)

## VM rebuild from Snapshot

To rebuild the VM from the snapshot, select "Launch as Instance" from **Actions" menue under the snapshots tab:

![screenshot of the snapshots actions](launch-as-instance.png)

You have to go through the "Launch Instance" menu again and provide the neccessary details to create a new instance from your snapshot:

![screenshot of the launch instance menu](launch-instance-menu.png)

Use the snapshot you previously created as source for the new instance.

---
**In the CLI**

``openstack server create --image <snapshot-image-id> --flavor <flavor-id> --network <network-id> <new instance name>``
---

## Post-Checks from the User

Please check, whether all properties of your VM have been rebuild regarding the items below:

* Attached Networks 
* Network Reachability
* Mounted storages
* Application status

![screenshot of the instance console](screenshot-console-2.png)

