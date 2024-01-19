---
title: "PCO Compute"
weight: 30
date: 2023-03-10
---

# compute flavors

pluscloud open uses the [SCS standard](https://github.com/SovereignCloudStack/standards) for Flavor Naming. This standard uses a combination of letters and numbers to describe the specifications of each flavor. The first part of the name identifies the number of virtual CPUs (VCPUs) available in the flavor, while the second part describes the amount of random access memory (RAM) available. The third part, if present, indicates the amount of disk space allocated for the instance. Flavors with additional disk space also have the size of the disk specified in the name. All flavors following that standard are prefixed with "SCS-".

| Name           | VCPUs | RAM   | Disk |
|----------------|-------|-------|------|
| SCS-1V:0.5     | 1     |   512 |    0 |
| SCS-1V:0.5:20  | 1     |   512 |   20 |
| SCS-1L:1       | 1     |  1024 |    0 |
| SCS-1V:1       | 1     |  1024 |    0 |
| SCS-1L:1:5     | 1     |  1024 |    5 |
| SCS-1V:1:10    | 1     |  1024 |   10 |
| SCS-1V:1:20    | 1     |  1024 |   20 |
| SCS-1V:2       | 1     |  2048 |    0 |
| SCS-1V:2:5     | 1     |  2048 |    5 |
| SCS-1V:4       | 1     |  4096 |    0 |
| SCS-1V:4:10    | 1     |  4096 |   10 |
| SCS-1V:8       | 1     |  8192 |    0 |
| SCS-1V:8:20    | 1     |  8192 |   20 |
| SCS-2V:2       | 2     |  2048 |    0 |
| SCS-2V:2:20    | 2     |  2048 |   20 |
| SCS-2V:4       | 2     |  4096 |    0 |
| SCS-2V:4:10    | 2     |  4096 |   10 |
| SCS-2V:4:20    | 2     |  4096 |   20 |
| SCS-2V:4:50    | 2     |  4096 |   50 |
| SCS-2V:4:100   | 2     |  4096 |  100 |
| SCS-2V:8       | 2     |  8192 |    0 |
| SCS-2V:8:20    | 2     |  8192 |   20 |
| SCS-2V:8:100   | 2     |  8192 |  100 |
| SCS-2V:16      | 2     | 16384 |    0 |
| SCS-2V:16:50   | 2     | 16384 |   50 |
| SCS-4V:8       | 4     |  8192 |    0 |
| SCS-4V:8:20    | 4     |  8192 |   20 |
| SCS-4V:8:50    | 4     |  8192 |   50 |
| SCS-4V:8:100   | 4     |  8192 |  100 |
| SCS-4V:16      | 4     | 16384 |    0 |
| SCS-4V:16:50   | 4     | 16384 |   50 |
| SCS-4V:16:100  | 4     | 16384 |  100 |
| SCS-4V:32      | 4     | 32768 |    0 |
| SCS-4V:32:50   | 4     | 32768 |   50 |
| SCS-4V:32:100  | 4     | 32768 |  100 |
| SCS-8V:8       | 8     |  8192 |    0 |
| SCS-8V:8:100   | 8     |  8192 |  100 |
| SCS-8V:16      | 8     | 16384 |    0 |
| SCS-8V:16:50   | 8     | 16384 |   50 |
| SCS-8V:16:100  | 8     | 16384 |  100 |
| SCS-8V:32      | 8     | 32768 |    0 |
| SCS-8V:32:50   | 8     | 32768 |   50 |
| SCS-8V:32:100  | 8     | 32768 |  100 |
| SCS-16V:32     | 16    | 32768 |    0 |
| SCS-16V:32:100 | 16    | 32768 |  100 |
| SCS-16V:64     | 16    | 65536 |    0 |
| SCS-16V:64:100 | 16    | 65536 |  100 |

# image list

{{% alert title="Note" color="info" %}}
OS Images are regularly refreshed to provide the latest security patch level. Older images are still availabile in accordance with the metadata (see SCS Image Metadata).
{{% /alert %}}

pluscloud open offers a variety of unmodified upstream operating system images that can be used to boot VMs. The available images include:

| Name                 |
|----------------------|
| AlmaLinux 8          |
| AlmaLinux 9          |
| Debian 10            |
| Debian 11            |
| Ubuntu 18.04         |
| Ubuntu 20.04         |
| Ubuntu 22.04         |
| Ubuntu Minimal 20.04 |
| Ubuntu Minimal 22.04 |

It's important to note that pluscloud open uses the [SCS standard](https://github.com/SovereignCloudStack/standards) for Image Metadata to add metadata to the provided OS images. This allows for better integration with the OpenStack platform and provides additional information about the images, such as the operating system version and architecture.

To use these images, users can simply select the desired image from the pluscloud open image repository and use it to launch a virtual machine instance. The metadata associated with the image can also be accessed to gather information about the image and ensure that it meets the requirements.

## cloud-init

All of the operating system images offered by pluscloud open are [cloud-init](https://cloudinit.readthedocs.io/en/latest/) enabled by default, which allows for easy and efficient customization of virtual machine instances in an OpenStack environment. With cloud-init, users can automate various tasks during the boot process, such as configuring network settings, creating user accounts, and installing software packages. This can help streamline the deployment of virtual machines and ensure that they are configured correctly and consistently. To use cloud-init with a pluscloud open image, users can simply provide a cloud-config file or user-data script when launching the instance. The cloud-init tool will then read this data and execute the specified actions during the boot process.