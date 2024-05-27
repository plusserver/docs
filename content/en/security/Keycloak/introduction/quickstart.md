---
title: "Quick Start Guide"
linkTitle: "Quick Start Guide"
type: "docs"
weight: 30
---

## Deployment

### Ordering

Do you need a Keycloak as a Service instance quickly? Then we will guide you through the ordering process [here](../../tutorials/ordering/).

### Retrieve Login Credentials

The order process is done and your Keycloak as a Service instance is up and running. The first thing you should do is getting your [Login Details](../../tutorials/retrieve_login_credentials/).

### Working with Keycloak as a Service

Log in to the web interface to use the Keycloak as a Service. Please see [Getting Started](../../tutorials/first_steps/#log-in-to-the-web-interface-to-use-the-iam---keycloak-service).

## Customization

### Scaling

Vertical Scaling: planned

#### Compute Resourcen

Currently Keycloak as a Service is only available in one node size:

- kc4-8: 4 vCPU + 8 GB RAM

For individual requirements, please open a [support ticket](https://customerservice.plusserver.com/support/ticket-create).

#### Data storage

Start with 50 GB and expand up to 200 GB in 50 GB increments. A reduction in data storage size is not possible.

## Security

### Whitelisting Source IP Addresses

Make sure to only allow known Source IP Addresses that your applications use. This helps keep out unwanted bots or crawlers trying to harm your service.

#### Unlock your own firewall

You may need to unlock your own firewall to allow client applications access to the Keycloak as a Service instance. </br>
In your login details you will find the URL of your Keycloak as a Service instance, from whose FQDN you can determine the IP address required for activation.
For example, if your contract contains the following ![access data](/images/content/04-msl/en/iam_keycloak/get_credentials/3-credentials-view.png), you can query the IP address using standard tools such as *nslookup*, *host* or *dig*:
![IP-Adresse](/images/content/04-msl/de/iam_keycloak/ordering/11-get-instanz-ip.png)

### Encryption

We require secure, encrypted communication from the client/application to our Keycloak as a Service instance. This way, even if someone intercepts the network traffic, they can't see the data.

If you are getting a certification error make sure the required Let's Encrypt (intermediate) certificates are available on the accessing system. [Let's Encrypt certificates](https://letsencrypt.org/certificates/)

### Backup and Restore

Get all details about the backup and restore automations in our [Backup and Restore](../../documentation/backup/) document.

### Updates

Learn about the the patch schedule for your Keycloak as a Service instance in the [Updates](../../documentation/update/) document.

### Monitoring

We monitor our *Keycloak as a Service* instance by keeping an eye on both the underlying compute and storage resources, as well as performing service-specific checks. Our 24x7 support team handles any incidents that arise, ensuring continuous and reliable service.

### Regions and AZ

For information on choosing regions and availability zones, check the [Regions and AZ's](../../../general/plusserver-region-az/) document.

### SLA

The infrastructure is fully redundant. We therefore guarantee an SLA of 99.95 percent.
