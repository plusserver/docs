---
title: "Datenbank Import"
linkTitle: "Datenbank Import"
type: "docs"
---

Beim Importieren eines MySQL-Dumps sind einige wichtige Schritte erforderlich, damit die Daten korrekt und sicher eingespielt werden können.

### Voraussetzungen

- Zugriff auf einen MySQL-Client (CLI).
- Remote-Zugriff auf die DBaaS-Instanz.
- Bestehender [Benutzer und Datenbank](../create_db_and_user/) auf der DBaaS-Instanz.  
- Die MySQL-Dump-Datei, die Sie importieren möchten.

### Bereiten Sie Ihre MySQL Dump vor

Stellen Sie sicher, dass die MySQL-Dumpdatei bereit ist. Diese Datei hat in der Regel die Erweiterung `.sql` und enthält SQL-Anweisungen, die zur Wiederherstellung der Datenbank benötigt werden.

### Importieren Sie die Dump-Datei

Führen Sie den folgenden Befehl aus, um den SQL-Dump zu importieren. Sie werden nach der Ausführung des Befehls aufgefordert, das Passwort für *db_username* einzugeben.

```bash
mysql -u db_username -p -h remote_database_host remote_database_name < /pfad/zum/lokalen/dumpfile.sql
```

### Überprüfen Sie den Import

Um sicherzustellen, dass Ihre Daten erfolgreich importiert wurden, können Sie sich mit dem MySQL-Client mit Ihrer entfernten Datenbank verbinden und einige grundlegende Prüfungen durchführen:

```bash
mysql -u db_username -p -h remote_database_host remote_database_name
SHOW TABLES;
```

>*Wenn Sie während des Imports auf Fehler stoßen oder Konfigurationsanpassungen benötigen (z.B. beim Importieren eines großen Dumps), öffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).*
