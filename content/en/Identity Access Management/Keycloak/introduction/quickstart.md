---
title: "Quickstartguide"
linkTitle: "Quickstartguide"
type: "docs"
weight: 30
---

## Deployment

### Ordering

Do you need an IAM - Keycloak instance quickly? Then we will guide you through the ordering process [here](../../tutorials/ordering/).

### Retrieve Login Credentials

The order process is done and your IAM - Keycloak instance is up and running. The first thing you should do is getting your [Login Details](../../tutorials/retrieve_login_credentials/).

### Working with IAM - Keycloak

Log in to the web interface to use the IAM - Keycloak service. Please see [Getting Started](../../tutorials/first_steps/#log-in-to-the-web-interface-to-use-the-iam---keycloak-service).

## Customization

### Scaling

* Vertical Scaling: planned

#### Compute Resourcen

* planned

#### Data storage

Start with 50GB and expand up to 200GB in 50GB increments. A reduction in data storage size is not possible.

## Security

### Whitelisting Source IP Addresses

Make sure to only allow known Source IP Addresses that your applications use. This helps keep out unwanted bots or crawlers trying to harm your service.

### Encryption

We require secure, encrypted communication from the client/application to our IAM - Keycloak instance. This way, even if someone intercepts the network traffic, they can't see the data.

If your are getting certification eror make sure the required Let's Encrypt (intermediate) certificates are available on the accessing system. [Let's Encrypt certificates](https://letsencrypt.org/certificates/)

### Backup and Restore

Get all details about the backup and restore automations in our [Backup and Restore](../../documentation/backup/) document.

### Updates

Learn about the the Patchroutine for our IAM - Keycloak instance in the [Updates](../../documentation/update/) document.

### Monitoring

We monitor our *IAM - Keycloak* instance by keeping an eye on both the underlying compute and storage resources, as well as performing service-specific checks. Our 24x7 support team handles any incidents that arise, ensuring continuous and reliable service.

### Regions and AZ

For information on choosing regions and availability zones, check the [Regions and AZ's](../../../general/plusserver-region-az/) document.

### SLA

The infrastructure is fully redundant. We therefore guarantee an SLA of 99.95.
