---
title: "Quickstartguide"
linkTitle: "Quickstartguide"
type: "docs"
weight: 30
---

## Deployment

### Ordering

We will guide you through the ordering process [here](../../tutorials/ordering/).

### Retrieve Login Credentials

The order process is done and your *Private Registry - Harbor* instance is up and running. The first thing you should do is getting your [Login Details](../../tutorials/retrieve_login_credentials/).

### Use your Private Registry

Enjoy your *Private Registry - Harbor*. No admin worries—just login to the Webinterface and go.

## Customizations

### Scaling

#### Compute

We offer two basic node sizes for the *Private Registry - Harbor*:

- b2-4: 2vCPU + 4GB RAM
- b4-8: 4vCPU + 8GB RAM

For most users, these compute resources are enough. If you start with the smaller b2-4 and find that you need more performance, you can easily upgrade to the larger b4-8 size. If you need a custom compute size, please [open a support ticket](https://customerservice.plusserver.com/support/ticket-create) and request additional options.

#### Data Storage

The persistent disk size determines the capacity for storing your data. Every *Private Registry - Harbor* instance requires a minimum disk size of 50GB. You can increase the disk size in increments of 50GB, up to a maximum of 200GB. Increasing the storage size doesn't cause an interruption of the *Private Registry - Harbor*.

>The data disk size can only be increased. To reduce the disk size, you must create a new DBaaS instance and transfer the data manually.

## General Information

### Security

#### Whitelisting Source IP Addresses

Make sure to only allow known Source IP Addresses that your applications use. This helps keep out unwanted bots or crawlers trying to harm your service.

#### Encryption

The web GUI is secured through HTTPS, ensuring that all data exchanged between the user's browser and the website is encrypted and protected from interception.

### Updates

Learn about the the Patchroutine for our *Private Registry - Harbor* in the [Updates](../../documentation/update/) document.

### Monitoring

We monitor your *Private Registry - Harbor* by keeping an eye on both the underlying compute and storage resources, as well as performing application-specific checks. Our 24x7 support team handles any incidents that arise, ensuring continuous and reliable service.

### Regions and AZ

For information on choosing regions and availability zones, check the [Regions and AZ's](../../documentation/az/) document.

### SLA

The infrastructure is fully redundant. We therefore guarantee an SLA of 99.95.
