---
title: "Create Database and User"
linkTitle: "Create Database and User"
type: "docs"
weight: 10
---

## Connect to Database

You can find instructions on how to retrieve the login credentials for your MySQL/MariaDB DBaaS instance [here](../retrieve_login_credentials/).

Use the following command to connect to your MySQL/MariaDB database using the mysql-cli client. Enter your admin password as shown in the customer portal when prompted.

```bash
:$ mysql -h node-64130e880850ca3b9a420bb9.ps-xaas.io -u kd123456 -p
```

Replace:

- *node-64130e880850ca3b9a420bb9.ps-xaas.io* with the hostname of your MySQL/MariaDB DBaaS instance.
- *kd123456* with your MySQL/MariaDB DBaaS username.

>If using an older MySQL client and facing connection issues, consider adding <code>--ssl</code> or <code>--ssl-mode=REQUIRED</code> to your connection command for secure connections.

### Creating new databases and users

In this section, we will create a new database named *newdb* and a user named *newuser* and grant the remote system access to the database *newdb* with the user *newuser*.

Once connected, execute the following SQL commands:

```bash
CREATE DATABASE newdb; 
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

If you want to allow the remote target with the (example) IP 62.138.222.4 access to this DB, you must grant the remote system authorization to connect to the database *newdb* as user *newuser*. You can do this with the following command:

```bash
GRANT ALL ON newdb.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Then read in the authorizations again and exit the MySQL/MariaDB shell with the following command:

```bash
FLUSH PRIVILEGES; 
EXIT;
```

The individual parameters are briefly explained below:

- newdb: This is the name of the MySQL/MariaDB database to which the user wants to connect.
- newuser: This is the name of the MySQL/MariaDB database user.
- 62.138.222.4: This is the IP address of the remote system from which the user wants to connect.
- password: This is the password of the database user.

If you want to grant *newuser* remote access to all databases, execute the following command:

```bash
GRANT ALL ON *.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

If you want to grant access as *newuser* to all remote IP addresses on *newdb*, use % instead of the IP address (62.138.222.4) as shown below:

```bash
GRANT ALL ON newdb.* to 'newuser'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

If you want to grant *newdb* access to all IP addresses in the subnet 62.138.222.0/24 as user newuser, execute the following command:

```bash
GRANT ALL ON newdb.* to 'newuser'@'62.138.222.%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Additionaly we recommend to change the default user's (e.g. kd123456) password for security reasons!

```bash
ALTER USER 'kd123456'@'%' IDENTIFIED BY 'new_password';
```
