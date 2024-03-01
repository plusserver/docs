---
title: "Database Import"
linkTitle: "Database Import"
type: "docs"
---

Importing a PostgreSQL database dump involves a few key steps to ensure the data is accurately and safely restored.

### Prerequisites

- Installed PostgreSQL client (CLI).
- Remote access to the DBaaS Instance.
- Existing [User and Database](create_db_and_user/).  
- The PostgreSQL dump file you wish to import.

### Prepate the PostgreSQL Dump File

If you haven't created a dump of your database, use pg_dump. Connect to the host of the source database and run:

```bash
pg_dump -U username -W -F c database_name > dump_file.dump
```

- U: username: Your database username.
- W: Prompts for the password of the database user.
- F c: Creates a custom-format archive suitable for input into pg_restore.

### Import the Dump

This method streams the dump file contents to the remote DBaaS instance.

```bash
psql -U remote_username -h remote_host -W -d remote_database_name -f dump_file.sql
```

### Verify the Import

Connect to the Remote Database.

```bash
psql -U remote_username -h remote_host -W -d remote_database_name
```

Check for the Presence of Tables.

```bash
\dt
```

If you encounter errors during the import or need configuration adjustments (e.g. while importing a large dump), please [open a ticket](https://customerservice.plusserver.com/support/ticket-create).
