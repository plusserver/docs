---
title: "Backup and Restore"
linkTitle: "Backup and Restore"
type: "docs"
---

Our Database-as-a-Service (DBaaS) includes automated backup and restore functionality.

## Backup Procedure

Backups are conducted automatically every night. We utilize filesystem snapshots for the backups. By default, backups are retained for 7 days. All backups are encrypted to provide enhanced security and protect your data.

> *You cannot directly download the backups created by plusserver. If you need to perform a manual backup you need to rely on native DBMS tools like ```pg_dump``` or ```mysqldump```.*

## Restore Procedure

In the event of a restore, the process requires creating a new DBaaS instance with the same [Node and Storage Size](../nodesize/) as the original. Data can only be restored to this new instance, necessitating configuration changes to any applications to point to the new DBaaS.
