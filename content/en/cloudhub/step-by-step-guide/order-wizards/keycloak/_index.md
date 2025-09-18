---
title: "Keycloak"
linkTitle: "Keycloak"
type: "docs"
weight: 7
description: >
    Step by Step Guide for Keycloak
---

## Introduction

Welcome to the [Keycloak order wizard](https://cloudhub.plusserver.com/cloud-services/keycloak/order). Here it is described which configuration options are available and how a new Keycloak can be ordered.

In the following we guide you step by step through the ordering process and explain the individual selection options and input fields.

The Keycloak is currently offered on **version 26** and uses an instance size (node) with 4 VCPU (s) and 8 GB RAM.

![Keycloak overview 1](img/keycloak-overview1.png)
![Keycloak overview 2](img/keycloak-overview2.png)

## Schritt 1: Storage size

Select the desired storage size via a slider:

- Min.: 50 GB
- Max.: 200 GB
- Cost: 14,30 €/Month per 50 GB

![Keycloak memory](img/keycloak-storage.png)

## Schritt 2: Trusted Sources

Enter the permitted network addresses in CIDR format.

Example:
`10.10.10.10/24`

![Keycloak Trusted Sources](img/keycloak-sources.png)

## Schritt 3: Choose region

Select the desired region for providing your database:

- DE-WEST-1 CGN3 (Cologne)
- DE-NORTH-2 HAM6 (Hamburg)

![Keycloak Region](img/keycloak-regions.png)

## Schritt 4: Project Contract ID

Choose whether there is already a project contract id:

- New project contract id
- Existing project contract id (selection from a list)

![Keycloak project contract id](img/keycloak-existing-project.png)

## Step 5: Order Overview

The order overview displays a table with all configurations you have selected.
Below the table, there is a checkbox that allows you to accept the following attachments and terms.
The attachments include various downloadable PDF documents, such as the **General Terms and Conditions** and **other relevant contractual documents**.
To the right of the table, the total price and the Order button are displayed.
This button is disabled by default and will only be activated once the attachments and terms have been accepted.

![Keycloak Order Overview](img/keycloak-order-overview.png)
