---
title: "Database Import"
linkTitle: "Database Import"
type: "docs"
---

Importing a MySQL dump involves a few key steps to ensure the data is accurately and safely restored.

### Prerequisites

- Access to a MySQL client (CLI).
- Remote access to the DBaaS Instance.
- Existing [User and Database](../create_db_and_user/) on the DBaaS instance.  
- The MySQL dump file you wish to import.

### Locate Your MySQL Dump File

Ensure the MySQL dump file is ready. This file typically has a `.sql` extension and contains SQL statements needed to recreate the database.

### Import the Dump FIle

Execute the following command to import the SQL dump. You will be prompted to enter the password for *db_username* after executing the command.

```bash
mysql -u db_username -p -h remote_database_host remote_database_name < /path/to/local/dumpfile.sql
```

### Verify the Import

To ensure your data was imported successfully, you can connect to your remote database using the MySQL client and perform some basic checks:

```bash
mysql -u db_username -p -h remote_database_host  remote_database_name
SHOW TABLES;
```

<br>

>*If you encounter errors during the import or need configuration adjustments (e.g. while importing a large dump), please [open a ticket](https://customerservice.plusserver.com/support/ticket-create).*
