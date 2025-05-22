---
title: "Read Replicas"
linkTitle: "Read Replicas"
type: "docs"
---

## Read Replica

Read Replicas steigern die Skalierbarkeit des Caching Services, indem sie Leseanfragen auf mehrere Read-Only Instanzen verteilen. Dies bietet eine effektivere Bewältigung hoher Leseanfragen, ohne die primäre Instanz zu belasten. Dadurch sind schnellere Antwortzeiten und eine erhebliche Leistungssteigerung Ihrer Anwendung möglich.

## Beschränkungen

- Sie können maximal drei zusätzliche Read Replicas pro CaaS erstellen.
- Die Compute-Ressourcen und der Datenspeicher müssen mit dem ursprünglichen CaaS übereinstimmen.
- Es ist nicht möglich, einen sekundären Server in einen primären Server umzuwandeln, um Schreibzugriff zu ermöglichen.
- Kaskadierende Konfigurationen, bei denen ein Sekundärserver als Quelle für einen anderen Sekundärserver dient, werden nicht unterstützt.

## Voraussetzungen

Um Ihre Anwendung korrekt für den Einsatz von Read Replicas zu konfigurieren, ist es essenziell, Lese- von Schreiboperationen zu trennen.

- Schreiboperationen: Verbindungen sollten ausschließlich an die primäre Instanz gerichtet sein.

- Leseoperationen: Verbindungen für Abfragen, die nur Daten abrufen, sollten zu den Lese-Replikaten geleitet werden.

- Nutzung eines Clients der automatisch Primary und Secondary Nodes erkennt und entsprechend einsetzt.
