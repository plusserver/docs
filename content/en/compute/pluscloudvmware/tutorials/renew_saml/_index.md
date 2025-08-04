---
title: "Renew expired SAML certificates"
linkTitle: "SAML certificates"
type: "docs"
weight: 20
date: 2025-07-10
description: >
    Renew expired SAML certificates from the tenant portal
---

{{% alert color=info %}}
**Note:** For this process your user must be an `Organization Administrator`.
{{% /alert %}}

{{% alert title="Warning!" color=warning %}}
If you have already set up federation with an Identity Provider, generating new certificates will disable the current connection.

This will cause users who use your Identity Provider to no longer be able to authenticate, until the federation is reconfigured with the new certificates!
{{% /alert %}}

Each organization is provided a set of SAML certificates, enabling you to use an identity provider of your choice for SSO.
Typically these remain valid for an entire year.

In case you are recieving e-mail about expired SAML certificates, it only takes a few steps to generate a new set.

### Generating new certificates

To create a fresh set:

1. Navigate to `Administration` -> `Identity Provider` -> `SAML`
1. Click `REGENERATE CERTIFICATE`

{{< img src="img/screen-renew.png" alt="Generating new certificates">}}

### Deleting expired certificates

For the sake of completeness, it is advisable to remove the expired certificates:

1. Navigate to `Administration` -> `Certificate Management` -> `Certificates Library`
1. Select expired certificates and click `DELETE`

{{< img src="img/screen-delete.png" alt="Deleting expired certificates">}}
