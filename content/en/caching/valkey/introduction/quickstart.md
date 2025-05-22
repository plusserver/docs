---
title: "Quickstart guide"
linkTitle: "Quickstart guide"
type: "docs"
weight: 30
---

## Deployment

### Ordering

Do you need a caching service database quickly? Then we will guide you through the ordering process [here](../../tutorials/ordering/).

### Retrieve Login Credentials

The order process is done and your CaaS is up and running. The first thing you should do is getting your [Login Details](../../tutorials/retrieve_login_credentials/).


### Use the Caas in your application

Enjoy our Caching-as-a-Service. No admin worries—just connect and go. Focus on your app, we manage the rest.

## Customization

### Scaling

There are two ways you can scale our CaaS.

- Vertical Scaling: First and foremost you can modify the *Node Size* of your CaaS Instance. Every option available is discussed [here](../../documentation/nodesize/).

- Horizonal Scaling: Second, you can add [Read-Replicas](../../documentation/read_replicas/) to your CaaS. If your application is capable of distributing read/write operations, this feature can greatly improve overall system responsiveness.

### Configuration

Find out about database configuration [here](../../documentation/configuration/).

## General Information

### Security

#### Whitelisting Source IP Addresses

Make sure to only allow known Source IP Addresses that your applications use. This helps keep out unwanted bots or crawlers trying to harm your service.

#### Encryption

We require secure, encrypted communication from the client/application to our CaaS. This way, even if someone intercepts the network traffic, they can't see the data.

If you get a certification error, make sure that the required Let's Encrypt (intermediate) certificates are available on the accessing system. [Let's Encrypt certificates](https://letsencrypt.org/certificates/)

### Backup and Restore

Get all details about the backup and restore automations in our [Backup and Restore](../../documentation/backup/) document.

### Updates

Learn about the the patch routine for our CaaS in the [Updates](../../documentation/update/) document.

### Monitoring

We monitor our CaaS by keeping an eye on both the underlying compute and storage resources, as well as performing database-specific checks. Our 24x7 support team handles any incidents that arise, ensuring continuous and reliable service.

### Regions and AZ

For information on choosing regions and availability zones, check the [Regions and AZ's](../../../general/plusserver-region-az/) document.

### SLA

The infrastructure is fully redundant. We therefore guarantee an SLA of 99.95.
