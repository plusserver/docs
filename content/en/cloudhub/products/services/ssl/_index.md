---
title: "SSL"
linkTitle: "SSL"
type: "docs"
weight: 2
date: 2025-07-21
description: >
  Information on SSL in CloudHub
---

On the **SSL** page, you can manage your existing SSL certificates, add new certificates, or generate certificate signing requests (CSRs). The page is divided into two tabs: **Overview** and **CSR Generator**.

### Overview

In the **"Overview"** tab, you will see a tabular display of all SSL certificates and CSRs stored in your customer account.
![SSL overview table](img/ssl-overview-table.png)

#### Features

- **Search function:**
  You can use the search bar to search specifically for SSL certificates or CRSs (e.g. by searching for the domain).

- **Add SSL certificate:**
  The "Add SSL certificate" button takes you to a separate page where you can securely upload an existing SSL certificate to CloudHub.

- **Edit SSL certificate:**
  You can update an existing certificate by clicking on the "Edit" button in the respective table row. This will take you to the **"Edit SSL certificate"** page.

### Add SSL certificate

On this page, you can securely upload an existing SSL certificate to CloudHub.

#### Form fields

- **AccountID:** Select the account to which the certificate should be assigned
- **Certificate:** Enter the SSL certificate
- **Key:** Enter the corresponding private key
- **Certificate chain:** Enter the complete certificate chain

### Edit SSL certificate

If you edit an existing SSL certificate via the overview, you will be taken to the **"Edit SSL certificate"** page.
![Edit SSL certificate](img/ssl-edit-certificate.png)

### Editable fields

- **Certificate:** Replace the stored certificate
- **Certificate chain:** Update the associated certificate chain

Both fields also offer the option of uploading files.

### CSR Generator

In the **"CSR Generator"** tab, you can generate a certificate signing request (CSR) to apply for a new SSL certificate from a certification authority.
![CSR Generator](img/csr-generator.png)

#### Fields for creating a CSR

- **Select account:**
   Select the customer account for which the CSR is to be created.

- **Select contact:**
   Select an existing contact that is linked to the customer account.
   If there is no suitable contact, you can use the "Add contact" button to create a new contact.

- **Set key parameters:**
- **Key type:** Choose between ECC or RSA
- **Key size:**
  - For ECC: 256, 384, 521
- For RSA: 2048, 4096, 8192

- **Subject Alternate Name (SAN):**
- Enter the SAN in ASCII form (mandatory field)
  - For **multi-domain certificates**, enter the domains as a comma-separated list (e.g. `example.com,www.example.com,shop.example.com`)

Once created, the CSR will be displayed in the **Overview**. We will also provide you with instructions on how to use various tools to create a private key from the CSR.

### Add contact

When you click on "Add contact" in the CSR generator, you will be taken to a form for creating a new contact.
![Contact Creation](img/create-contact.png)

#### Required information

- **Customer account:** Select the account to which the contact will be assigned
- **Company:** Name of the organisation
- **Department:** e.g. IT, Technology, Security
- **Address:** Full address (street, postcode, city, country)
- **Email address:** for communication and validation
- **Phone number (optional):** for consultation or verification

After saving, the new contact is available for selection in the CSR generator.
