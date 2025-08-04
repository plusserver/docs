---
title: "DNS Administration"
linkTitle: "DNS Administration"
type: "docs"
weight: 5
date: 2025-07-21
description: >
  Information on DNS Administration in CloudHub
---

The **‘DNS Management’** page provides you with a central interface for managing your DNS settings. It is divided into two tabs: **Nameserver** and **Reverse DNS**. Both areas allow you to independently configure your DNS zones and PTR entries.

### Nameservers

In the **‘Nameserver’** tab, you can manage the DNS zones of your domains.\
![Nameserver table](../img/dns-administration/nameserver-table.png)

#### Summary table

- All existing domains are listed in a table.
- You can search for specific domains using the search field above the table.
- The following actions are available for each domain:
  - **Edit**: Manage the domain's DNS entries\
  ![Nameserver table - Edit entry](../img/dns-administration/nameserver-table-edit.png)
  - **Delete**: Remove domain from DNS management\
  ![Nameserver table - Delete entry](../img/dns-administration/nameserver-table-delete.png)
  - **Download as CSV**: Export settings in CSV format\
  ![Nameserver table - Download CSV](../img/dns-administration/nameserver-table-download-csv.png)
  - **Download as zone file**: Export in classic zone file format\
  ![Nameserver table - Download Zonefile](../img/dns-administration/nameserver-table-download-zonefile.png)

#### Add domain

The ‘Add domain’ button takes you to the ‘Add DNS domain’ page.\
![Nameserver table - Add domain](../img/dns-administration/nameserver-table-add-domain.png)

### Add DNS domain

On this page, you can transfer an existing domain to DNS management – provided you already have a corresponding contract. If the desired domain does not yet exist, it can be set up via our support team by submitting a ticket.\
![Adding a DNS domain](../img/dns-administration/add-dns-domain.png)

#### Manage DNS entries (edit a domain)

When editing a domain, you will see a table with all associated DNS entries.
![Table DNS entries](../img/dns-administration/table-dns-entries.png)

##### Features

- **Search field** for quickly finding individual entries
- For each DNS entry:
- **Edit** (editable fields: value and TTL)
  ![Table DNS entries - Edit entries 1](../img/dns-administration/table-dns-entries-edit-entry-1.png)\
  ![Table DNS entries - Edit entries 2](../img/dns-administration/table-dns-entries-edit-entry-2.png)
  - **Delete** the entry\
  ![Table DNS entries - Delete entries](../img/dns-administration/table-dns-entries-delete-entry.png)

##### Add DNS entry

Clicking on the **‘Add DNS entry’** button will display a new entry line at the top of the table. Enter the following values there:\
![Table DNS entries - Add entry](../img/dns-administration/table-dns-entries-add-entry.png)

- **Name**
- **Type** (e. g. A, AAAA, CNAME, MX, TXT etc.)
- **Value**
- **TTL**

Rechts in der Zeile können Sie den neuen Eintrag speichern oder das Hinzufügen abbrechen.

### Reverse DNS

In the **‘Reverse DNS’** tab, you can manage PTR entries for your IP addresses.
![Reverse DNS table](../img/dns-administration/reverse-dns-table.png)

#### Summary table

- All existing reverse DNS entries are displayed in a table.
- A **search field** allows you to search for specific IP addresses or host names.
- The following actions are available for each entry:
- **Edit** (takes you to the ‘Edit DNS reverse entry’ page)\
  ![Reverse DNS table - Edit entry](../img/dns-administration/reverse-dns-table-edit-entry.png)
  - **Delete** the entry\
  ![Reverse DNS table - Delete entry](../img/dns-administration/reverse-dns-table-delete-entry.png)

Click on the ‘Add entry’ button to go to the ‘Add DNS reverse entry’ page.\
![Reverse DNS table - Add entry](../img/dns-administration/reverse-dns-table-add-entry.png)

##### Edit DNS reverse entry

On this page, you can change the settings of an existing PTR entry. The following can be edited:

- **Host name**
- **TTL**

The associated IP address cannot be changed.

### Add DNS reverse entry

![AddReverse DNS entry](../img/dns-administration/add-reverse-dns-entry.png)

#### Form fields

- **Network**: Selection of the associated network range
- **IP address**: The address for which the PTR entry is to be created
- **Host name**: Target name to which the IP address should point
- **TTL**: Validity period of the entry (in seconds)
