---
title: "Read Replicas"
linkTitle: "Read Replicas"
type: "docs"
---

## Read Replica

Read Replicas steigern die Skalierbarkeit von Datenbanken, indem sie Leseanfragen auf mehrere Read-Only-Datenbank-Instanzen verteilen. Dies bietet eine effektivere Bewältigung hoher Leseanfragen, ohne die primäre Datenbank zu belasten. Dadurch sind schnellere Antwortzeiten und eine erhebliche Leistungssteigerung Ihrer Anwendung möglich.

Um eine DBaaS-Read einzurichten, verwendet das System einen Dateisystem-Snapshot der primären Datenbankinstanz, um die sekundäre Instanz zu initialisieren. Anschließend wird die systemeigene asynchrone Replikation der Datenbank-Engine verwendet, um sicherzustellen, dass die Read Replica bei allen Änderungen in der Quelldatenbankinstanz stets auf dem neuesten Stand bleibt.

## Beschränkungen

- Read Replicas sind für die DBaaS MariaDB, MySQL und PostgreSQL verfügbar.  
- Sie können maximal drei zusätzliche Read Replicas pro DBaaS erstellen.
- Die Compute-Ressourcen und der Datenspeicher müssen mit dem ursprünglichen DBaaS übereinstimmen.
- Es ist nicht möglich, einen sekundären Server in einen primären Server umzuwandeln, um Schreibzugriff zu ermöglichen.
- Kaskadierende Konfigurationen, bei denen ein Sekundärserver als Quelle für einen anderen Sekundärserver dient, werden nicht unterstützt.

## Voraussetzungen

Um Ihre Anwendung korrekt für den Einsatz von Read Replicas zu konfigurieren, ist es essenziell, Lese- von Schreiboperationen zu trennen.

- Schreiboperationen: Verbindungen sollten ausschließlich an die primäre Instanz gerichtet sein, auf der Datenänderungen (INSERT, UPDATE, DELETE) erlaubt sind.

- Leseoperationen: Verbindungen für Abfragen, die nur Daten abrufen (SELECT), sollten zu den Lese-Replikaten geleitet werden.

<br>

**Wenn Sie an der Nutzung unserer Read Replicas interessiert sind, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) in unserem Kundenportal.**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie direkt in unserem Kundenportal Read-Replicas erstellen können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unseren Service verbessern.*
