---
title: "Anlegen neuer Datenbanken und Benutzer"
linkTitle: "Anlegen neuer Datenbanken und Benutzer"
weight: 2
date: 2023-03-13
---

In diesem Abschnitt erstellen wir eine neue Datenbank mit dem Namen **newdb** und einen Benutzer mit dem Namen **newuser** und gewähren dem entfernten System Zugriff auf die Datenbank newdb mit dem Benutzer newuser.

Melden Sie sich zunächst mit dem folgenden Befehl an der MariaDB-Shell an, ersetzen sie dabei node-abcd1234567890.mansvc.psmanaged.com und kd123456 mit den Anmeldedaten aus dem Kundenportal: 
```
$ mysql -u admin -h node-abcd1234567890.mansvc.psmanaged.com -u kd123456 -p
```
Geben Sie Ihr Admin Passwort ein, wie im Kundenportal angezeigt, und erstellen Sie nach der Aufforderung eine Datenbank und einen Benutzer mit dem folgenden Befehl: 
```
MariaDB [(none)]> CREATE DATABASE newdb; 
MariaDB [(none)]> CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

Wenn sie dem entfernten Ziel mit der (Beispiel-)IP 62.138.222.4 Zugriff auf diese DB erlauben wollen, müssen Sie dem entfernten System die Berechtigung erteilen, sich mit der Datenbank ***newdb*** als Benutzer ***newuser*** zu verbinden. Dies können Sie mit dem folgenden Befehl tun:
```
MariaDB [(none)]> GRANT ALL ON newdb.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```
Anschließend lesen Sie die Berechtigungen neu ein und verlassen die MariaDB-Shell mit dem folgenden Befehl: 
```
MariaDB [(none)]> FLUSH PRIVILEGES; MariaDB [(none)]> EXIT;
```

Im Folgenden werden die einzelnen Parameter kurz erläutert:

- **newdb**: Dies ist der Name der MariaDB-Datenbank, mit der sich der Benutzer verbinden möchte.
- **newuser**: Dies ist der Name des MariaDB-Datenbankbenutzers.
- **62.138.222.4**: Es handelt sich um die IP-Adresse des entfernten Systems, von dem aus der Benutzer eine Verbindung herstellen möchte.
- **password**: Dies ist das Passwort des Datenbankbenutzers.
Wenn Sie newuser Fernzugriff auf alle Datenbanken gewähren wollen, führen Sie den folgenden Befehl aus:
```
MariaDB [(none)]> GRANT ALL ON *.* to 'newuser'@'62.138.222.4' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Wenn Sie als ***newuser*** Zugriff auf alle entfernten IP-Adressen auf ***newdb*** gewähren wollen, verwenden Sie **%** anstelle der IP-Adresse (208.117.84.50) wie unten gezeigt: 
```
MariaDB [(none)]> GRANT ALL ON newdb.* to 'newuser'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Wenn Sie auf ***newdb*** als Benutzer ***newuser*** Zugriff auf alle IP-Adressen im Subnetz **62.138.222.0/24** gewähren wollen, führen Sie folgenden Befehl aus: 
```
MariaDB [(none)]> GRANT ALL ON newdb.* to 'newuser'@'62.138.222.%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```
