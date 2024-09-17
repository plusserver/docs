---
title: "Instances and images"
type: "docs"
weight: 50
date: 2023-02-24
description: >
  Creating instances from images, logging in and grouping them
---
## Overview
To work with images and instances (also known as virtual machines) in the Horizon Web GUI, choose "Compute" from the menu:

<img src="image2020-10-19_10-42-35.png" alt="screenshot of the compute overview" width="50%" height="50%" title="Compute Overview">

The overview shows your current consumption of cloud resources and the current limits.

## Instances
The menu "Instances" shows details about all your virtual machines and their current state. From here, you can manage you virtual machines and create new ones. There are several aspects to managing your instances, as described below.
### Menu "Instance Actions" 
In the menu "Actions", options that could make your instance unavailable or compromise its security are highlighted in red:

<img src="image2020-10-19_10-51-36.png" alt="screenshot of the instances action menu" width="60%" height="60%" title="Instances Action Menu">

#### Disassociate Floating IPs
Disconnect a floating IP address that is currently connected to your instance from the instance. Depending on how you access that instance, it may no longer be accessible over the network.

#### Attach interface
Add an additional network interface to your instance. This option opens a requester where you can select the network you wish to connect the interface to. If you don't choose a static IP address there, the interface will fetch one via DHCP (as long as that has been enabled for the network). Note that the new interface may need to be added to your instances network configuration (if it isn't added automatically).

#### Edit instance
Here you can change the name of your instance (and its description). Furthermore, you can add or remove security groups. If you have different security groups on different network interfaces of your instance, select "Edit Port Security Groups" to edit them seperately.

#### Attach volume
Volumes created in the "Volumes" menu can be attached to your instance here. Note that this only makes the volume available to your instance (e. g. as /dev/sdb in a Linux instance). You have to crate a filesystem on it, add it to /etc/fstab and mount it manually in order to use it.

#### Detach volume
Volumes that are no longer needed or that are to be mounted on another instance can be detached from an instance here. Volumes to be detached from an instance should be unmounted from the instance first and applications should no longer access them.

#### Update metadata
Here you can manage metadata for your instance. There is a set of example metadata from the Glance metadata catalog already available on the left. If you want to use one of the keys, just click the "+" to move it to the right. You can create your own metadata keys via the "custom" option.

#### Edit security groups
This is where you manage the security groups for your instance. If your instance has more than one network interface, changes will be applied to all of them. If you want to manage different security groups for different network interfaces, please use "Edit Port Security Groups" from the menu.

#### Edit port security groups
Security Groups can be configured seperately for different network interfaces (ports) here. Furthermore, you can edit port characteristics such as "Enable Admin State" to forward packets through this port, "Binding VNIC Type" for the port (you would most likely choose "Normal" for virtual machines) and "Port Security" to activate security features such as "Anti-spoofing" and allow the use of security groups for this port.

#### Console
Opens a virtual console with the login prompt of your instance.

#### View log
Allows you to view the console log messages of your instance

#### Rescue instance
Rescue mode is reserved for emergencies. This will shut down your instance and start a rescue instance (using the image you select) that mounts the root volume of your instance so you can recover data from it or repair the configuration. You can optionally set a password for the rescue instance.

#### Pause instance
Pausing your instance means "freezing" it with all its resources. It will no longer be available but can be resumed immediately.

#### Suspend instance
Suspending the instance will shut down your instance with all its resources. Resuming it will restart it.

#### Shelve instance
Shelving an instance is similar to suspending it. The memory is not saved, though. You could use shelving for instances you don't need over the weekend, but want to use again for the next work week.

#### Resize instance
This dialog allows you to change some "dimensions" of your instance (such as memory, CPUs and root disk size) by choosing a new flavor. Furthermore, you can choose wether you want an unpartitioned disk or if you want to partiton the disk yourself. Resizing might take some time.

#### Lock instance
You can prevent accidental change and/or deletion of your instance by "locking" it. A small lock symbol will be displayed for locked instances in Horizon. Administrators of the platform can unlock instances, though.

#### Soft reboot instance
This will try to shut down all applications before rebooting the instance.

#### Hard reboot instance
The instance will be rebooted without giving applications time to shut down.

#### Shut off instance
Instances will be turned off immediately. This may lead to filesystem checks or database recovery operations when the instance is turned on again.

#### Rebuild instance
Rebuilding allows you to recreate an instance by changing characteristics (for example, by using a different image). The UUID, volumes and ports of the instance remain the same. However, it will not work on instances with ceph volumes.

#### Delete instance
The instance will be deleted. All used resources will be given back to the pool.
