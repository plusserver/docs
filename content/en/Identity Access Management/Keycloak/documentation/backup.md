---
title: "Backup and Restore"
linkTitle: "Backup and Restore"
type: "docs"
---

IAM - Keycloak-as-a-Service includes automated backup and restore functionality.

## Backup Procedure

Backups are conducted automatically every night. We utilize filesystem snapshots for the backups. By default, backups are retained for 7 days. All backups are encrypted to provide enhanced security and protect your data.

> *You cannot download the backups created by Plusserver directly. If you need to perform a manual backup of your configuration settings you can use builtin "export" feature in WebUI.

## Restore Procedure

In the event of a restore, the process requires creating a new IAM - Keycloak instance with the same [Node and Storage Size](../nodesize/) as the original. Data can only be restored to this new instance, necessitating configuration changes to any applications to point to the new  IAM - Keycloak instance.

<br>

**If you need to request a restore you can [open a ticket](https://customerservice.plusserver.com/support/ticket-create) with our support team.**

<br>

>*We're working on a feature to let you directly restore backups in our customer portal. Until then we thank you for your patience as we improve our services.*
