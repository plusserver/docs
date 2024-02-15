---
title: "Create Database and User"
linkTitle: "Create Database and User"
type: "docs"
weight: 10
---


## Connect to PostgreSQL Database

You can find instructions on how to retrieve the login credentials for your PostgreSQL DBaaS instance [here](../../introduction/retrieve_login_credentials/).
<br>Use the following command to connect to your PostgreSQL database using the postgresql cli client. Enter your admin password as shown in the customer portal and when prompted.


```bash
$ psql -h node-65c20f25e94a0407f5f07bdf.ps-xaas.io -U kd123456 -d kd123456
```

Replace:

 - *node-65c20f25e94a0407f5f07bdf.ps-xaas.io* with the hostname your PostgreSQL DBaaS instance.
 - *kd123456* with your PostgreSQL DBaaS username.


## Create a Database

Once connected, you can create a new database using the following SQL command:

```bash
CREATE DATABASE new_database_name;
```

Replace new_database_name with the desired name for your new database.

## Create a User

To create a new user, use the following SQL command:

```bash
CREATE USER new_username WITH PASSWORD 'password';
```

Replace new_username with the desired username for the new user and 'password' with the desired password for that user.


## Grant Permissions

Finally, grant permissions to the newly created user for the database:

```bash
GRANT ALL PRIVILEGES ON DATABASE new_database_name TO new_username;
```

This command grants all privileges on the newly created database to the specified user.