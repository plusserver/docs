---
title: "Backup and Restore"
linkTitle: "Backup and Restore"
type: "docs"
---

Keycloak as a Service includes automated backup and restore functionality.

## Backup Procedure

Backups are conducted automatically every night. We utilize filesystem snapshots for the backups. By default, backups are retained for 7 days. All backups are encrypted to provide enhanced security and protect your data.

>*You cannot download the backups created by plusserver directly. If you need to perform a manual backup of your configuration settings you can use the built-in “export” feature in the WebUI.*

## Restore Procedure

A restore requires the creation of a new Keycloak-as-a-Service instance with the same [node and storage size](../nodesize/) as the original. Data can only be restored to this new instance, which requires configuration changes to all applications to point to the new Keycloak as a Service instance.

<br>

**If you need to request a restore you can [open a ticket](https://customerservice.plusserver.com/support/ticket-create) with our support team.**

<br>

>*We're working on a feature to let you directly restore backups in our customer portal. Until then we thank you for your patience as we improve our services.*
