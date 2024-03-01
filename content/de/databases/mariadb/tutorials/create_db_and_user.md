---
title: "Datenbank und Benutzer erstellen"
linkTitle: "Datenbank und Benutzer erstellen"
type: "docs"
weight: 10
---

### Mit der Datenbank verbinden

Eine Anleitung zum Abrufen der Anmeldedaten für Ihre MySQL/MariaDB DBaaS-Instanz finden Sie [hier](../../Einführung/abrufen_login_credentials/).

Verwenden Sie den folgenden Befehl, um eine Verbindung zu Ihrer MySQL/MariaDB Datenbank via mysql-cli herzustellen. Geben Sie Ihr Admin-Passwort ein, wie es im Kundenportal angezeigt wird, wenn Sie dazu aufgefordert werden.

```bash
:$ mysql -h node-64130e880850ca3b9a420bb9.ps-xaas.io -u kd123456 -p
```

Ersetzen Sie:

- *node-64130e880850ca3b9a420bb9.ps-xaas.io* mit dem Hostnamen Ihrer MySQL/MariaDB DBaaS Instanz.
- *kd123456* mit Ihrem MySQL/MariaDB DBaaS Benutzernamen.

>Wenn Sie einen älteren MySQL-Client verwenden und Verbindungsprobleme haben, sollten Sie <code>--ssl</code> oder <code>--ssl-mode=REQUIRED</code> zu Ihrem Verbindungsbefehl hinzufügen, um sichere Verbindungen herzustellen.

### Anlegen neuer Datenbanken und Benutzer

In diesem Abschnitt erstellen wir eine neue Datenbank mit dem Namen *newdb* und einen Benutzer mit dem Namen *newuser* und gewähren dem remote System Zugriff auf die Datenbank *newdb* mit dem Benutzer *newuser*.

Sobald die Verbindung hergestellt ist, führen Sie die folgenden SQL-Befehle aus:

```bash
CREATE DATABASE newdb; 
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

Wenn Sie dem remote System mit der (Beispiel) IP 62.138.222.4 den Zugriff auf diese DB ermöglichen wollen, müssen Sie dem remote System die Berechtigung erteilen, sich mit der Datenbank *newdb* als Benutzer *newuser* zu verbinden. Dies können Sie mit dem folgenden Befehl tun:

```bash
GRANT ALL ON newdb.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Lesen Sie dann die Berechtigungen erneut ein und beenden Sie die MySQL/MariaDB-Shell mit dem folgenden Befehl:

```bash
FLUSH PRIVILEGES; 
EXIT;
```

Die einzelnen Parameter werden im Folgenden kurz erläutert:

- newdb: Dies ist der Name der MySQL/MariaDB-Datenbank, mit der sich der Benutzer verbinden möchte.
- newuser: Dies ist der Name des Benutzers der MySQL/MariaDB-Datenbank.
- 62.138.222.4: Dies ist die IP-Adresse des entfernten Systems, von dem aus der Benutzer eine Verbindung herstellen möchte.
- password: Dies ist das Passwort des Datenbankbenutzers.

Wenn Sie *newuser* Fernzugriff auf alle Datenbanken gewähren wollen, führen Sie den folgenden Befehl aus:

```bash
GRANT ALL ON *.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Wenn Sie den Zugriff als *newuser* auf alle entfernten IP-Adressen auf *newdb* gewähren wollen, verwenden Sie % anstelle der IP-Adresse (62.138.222.4) wie unten gezeigt:

```bash
GRANT ALL ON newdb.* to 'newuser'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Wenn Sie *newdb* als Benutzer newuser Zugriff auf alle IP-Adressen im Subnetz 62.138.222.0/24 gewähren wollen, führen Sie den folgenden Befehl aus:

```bash
GRANT ALL ON newdb.* to 'newuser'@'62.138.222.%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Zusätzlich empfehlen wir aus Sicherheitsgründen, das Passwort des Standardbenutzers (z.B. kd123456) zu ändern!

```bash
ALTER USER 'kd123456'@'%' IDENTIFIED BY 'new_password';
```
