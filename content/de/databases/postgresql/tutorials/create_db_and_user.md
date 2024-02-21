---
title: "Datenbank und Benutzer erstellen"
linkTitle: "Datenbank und Benutzer erstellen"
type: "docs"
Gewicht: 10
---


## Verbindung zur PostgreSQL DBaaS

Eine Anleitung, wie Sie die Anmeldedaten für Ihre PostgreSQL DBaaS Instanz abrufen können, finden Sie [hier](../../Einführung/retrieve_login_credentials/).

<br>

Benutzen Sie den folgenden Befehl, um sich über den postgresql cli Client mit Ihrer Datenbank zu verbinden. Verwenden Sie die Login Daten, welche im Kundenportal angezeigt werden, wenn Sie dazu aufgefordert werden.

```bash
:$ psql -h node-65c20f25e94a0407f5f07bdf.ps-xaas.io -U kd123456 -d kd123456
```

Ersetzen Sie:

- *node-65c20f25e94a0407f5f07bdf.ps-xaas.io* mit dem Hostnamen Ihrer PostgreSQL DBaaS Instanz.
- *kd123456* mit Ihrem PostgreSQL DBaaS Benutzernamen.

## Erstellen Sie eine Datenbank

Sobald Sie verbunden sind, können Sie mit dem folgenden SQL-Befehl eine neue Datenbank erstellen:

```bash
CREATE DATABASE new_database_name;
```

Ersetzen Sie new_database_name durch den gewünschten Namen für Ihre neue Datenbank.

## Erstellen eines Benutzers

Um einen neuen Benutzer anzulegen, verwenden Sie den folgenden SQL-Befehl:

```bash
CREATE USER new_username WITH PASSWORD 'password';
```

Ersetzen Sie new_username durch den gewünschten Benutzernamen für den neuen Benutzer und 'password' durch das gewünschte Passwort für diesen Benutzer.

## Erteilen von Berechtigungen

Zum Schluss erteilen Sie dem neu angelegten Benutzer die Rechte für die Datenbank:

```bash
GRANT ALL PRIVILEGES ON DATABASE new_database_name TO new_username;
```

Dieser Befehl gewährt dem angegebenen Benutzer alle Rechte für die neu erstellte Datenbank.

>Zusätzlich empfehlen wir aus Sicherheitsgründen, das Passwort des Standardbenutzers (z.B. kd123456) zu ändern!

```bash
ALTER USER kd123456 WITH PASSWORD 'newpassword';
```

