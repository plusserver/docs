---
title: "Compute"
type: "docs"
weight: 30
date: 2024-09-05
description: >
  Compute flavors and OS Images in pluscloud open
---

To create a VM, you need to specify it's size and the operating system it will run. The former is specified by a [Compute Flavor](../../../reference/instances-and-images/flavors/) and the latter by the [Boot Image](#images).

## Compute Flavors

[Compute Flavors](../../../reference/instances-and-images/flavors/) are predefined configurations that determine the amount of CPU, RAM, and storage resources allocated to a virtual machine. Each Flavor offers a different combination of these resources, allowing users to select the appropriate one based on the performance needs of their applications.

pluscloud open uses the [SCS standard](https://github.com/SovereignCloudStack/standards) for Flavor naming. This standard uses a combination of letters and numbers to describe the specifications of each Flavor. The first part of the name identifies the number of virtual CPUs (vCPUs) available in the Flavor, while the second part describes the amount of random access memory (RAM) available. The third part, if present, indicates the amount of disk space allocated for the instance. Flavors with additional disk space also have the size of the disk specified in the name. All flavors following that standard are prefixed with "SCS-".

## Images

{{% alert title="Note" color="info" %}}
OS Images are regularly updated to provide the latest security patch level. Older images are still availabile in accordance with the metadata (see SCS Image Metadata).
{{% /alert %}}

pluscloud open offers a variety of unmodified upstream operating system images that can be used to boot VMs. Available images include:

| Name                 |
|----------------------|
| AlmaLinux 8          |
| AlmaLinux 9          |
| CirrOS 0.6.1         |
| Debian 11            |
| Debian 12            |
| Flatcar Container Linux 3815.2.0 |
| Flatcar Container Linux 3815.2.5 |
| Ubuntu 20.04         |
| Ubuntu 22.04         |
| Ubuntu 24.04         |
| Ubuntu Minimal 20.04 |
| Ubuntu Minimal 22.04 |
| Ubuntu Minimal 24.04 |

It's important to note that pluscloud open uses the [SCS standard](https://github.com/SovereignCloudStack/standards) for Image metadata to add metadata to the provided OS images. This allows for better integration with the OpenStack platform and provides additional information about the images, such as the operating system version and architecture.

To use these images, users can simply select the desired image from the pluscloud open image repository and use it to launch a virtual machine instance. The metadata associated with the image can also be accessed to gather information about the image and ensure that it meets the requirements.

### Cloud-init

All operating system images offered by pluscloud open come with [cloud-init](https://cloudinit.readthedocs.io/en/latest/) enabled by default, allowing for easy and efficient customization of virtual machine instances in an OpenStack environment. With cloud-init, users can automate various tasks during the boot process, such as configuring network settings, creating user accounts, and installing software packages. This can help streamline the deployment of virtual machines and ensure that they are configured correctly and consistently. To use cloud-init with a pluscloud open image, users can simply provide a cloud-config file or user-data script when launching the instance. The cloud-init tool will then read this data and execute the specified actions during the boot process.
