---
title: "Datenbank-Import"
linkTitle: "Datenbank-Import"
type: "docs"
---

Das Importieren eines PostgreSQL-Datenbank-Dumps umfasst einige Schritte, um sicherzustellen, dass die Daten korrekt und sicher wiederhergestellt werden.

### Voraussetzungen

- Installierter PostgreSQL-Client (CLI).
- Remote Zugriff auf die DBaaS-Instanz.
- Bestehender [Benutzer und Datenbank](../create_db_and_user/).  
- Den PostgreSQL Dump, den Sie importieren möchten.

### Vorbereiten des PostgreSQL Dumps

Wenn Sie noch keinen Dump Ihrer Datenbank erstellt haben, können Sie folgendem Befehl einen erstellen:

```bash
pg_dump -U Benutzername -W -F c datenbank_name > dump_file.dump
```

- U: username: Ihr Datenbank-Benutzername.
- W: Fragt nach dem Passwort des Datenbankbenutzers.
- F c: Erzeugt ein Archiv in einem benutzerdefinierten Format, das für die Eingabe in pg_restore geeignet ist.

### Importieren des Dump

Mit dieser Methode wird der Inhalt der Dump-Datei in die DBaaS Instanz gestreamt.

```bash
psql -U remote_username -h remote_host -W -d remote_database_name -f dump_file.sql
```

### Überprüfen Sie den Import

Verbinden Sie sich mit der DBaaS Instanz.

````bash
psql -U remote_username -h remote_host -W -d remote_database_name
```

Überprüfen Sie das Vorhandensein von Tabellen.

```bash
\dt
```

Wenn Sie während des Imports auf Fehler stoßen oder Konfigurationsanpassungen benötigen (z.B. beim Importieren eines großen Dumps), öffnen Sie bitte ein Ticket (https://customerservice.plusserver.com/support/ticket-create).