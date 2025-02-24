---
title: "S3 Preise und Speicherrichtlinien"
linkTitle: "S3 Preise und Richtlinien"
type: "docs"
weight: 20
date: "2024-02-06"
---

Hier finden Sie die Preise für die verschiedenen Serviceklassen unseres plusserver S3 Service.

## Preise pro GB

| Serviceklasse | Preis pro GB\* |
| ------------- | -------------- |
| Standard      | 0,022€         |
| Replikation   | 0,039€         |
| Mirror        | 0,044€         |

\*Listenpreise Stand 2024-02-08

## Speicherrichtlinien

### S3 Serviceklasse "Standard"

In dieser Serviceklasse gelten folgende Speicherrichtlinien:

- Objekte werden generell mit Erasure Coding gespeichert, um eine effiziente und langlebige Speicherung zu gewährleisten.
- Für Objekte kleiner als 1 MB wird die Speicherung mit Replikation bevorzugt statt Erasure Coding.
- Es wird eine minimale Abrechnungsgröße von 128 KB angewendet, was bedeutet, dass selbst kleinere Objekte mit dieser Größe in Rechnung gestellt werden.
- Es wird eine minimale Abrechnungsgröße von 128 KB angewendet, was bedeutet, dass selbst kleinere Objekte mit dieser Größe in Rechnung gestellt werden.

### S3 Serviceklasse "Mirror" (<bucketname>-mirr)

Für diese Serviceklasse gelten die folgenden Richtlinien:

- Alle Objekte in diesem Bucket werden in eine andere GEO-Location gespiegelt, um zusätzliche Redundanz zu gewährleisten. Das bedeutet, dass sowohl ein vollständiges Erasure-Coding-Objekt beispielsweise in Köln als auch eine Kopie desselben Objekts in Hamburg gespeichert wird.
- Objekte kleiner als 1 MB werden mit Replikation gespeichert und ebenfalls gespiegelt.
- Es wird eine minimale Abrechnungsgröße von 128 KB angewendet.

### S3 Serviceklasse "Replication" (<bucketname>-repl)

Für diese Serviceklasse gelten folgende Richtlinien:

- Alle Objekte in diesem Bucket werden als Replikation zwischen zwei GEO-Locationen gespeichert, beispielsweise zwischen Köln und Hamburg. Es wird jeweils eine Kopie in Hamburg und eine Kopie in Köln aufbewahrt.
- Es wird eine minimale Abrechnungsgröße von 128 KB angewendet.

### Zusätzliche Info für die Speicherrichtlinien

Diese Speicherrichtlinien gewährleisten, dass Ihre Daten je nach gewählter Serviceklasse effizient und sicher gespeichert werden.
Kleine Objekte mit einer Größe unter 128 KB können zwar gespeichert werden, werden jedoch mit einer Mindestgröße von 128 KB berechnet. Dies liegt daran, dass das Speichern solcher kleiner Objekte einen höheren Speicheraufwand in unserem S3-System mit sich bringt.

{{% alert title="Wichtiger Hinweis" %}}
Bei der Anlage von Buckets in unserem plusserver S3 Service sollten Sie beachten, dass Ihre Daten nicht nur durch Site übergreifendes Erasure Coding und Replikation geschützt werden, sondern auch pro S3-Storage-Node durch eine zusätzliche Sicherungsschicht in Form von RAID-Technologie geschützt sind. Dies betrifft auch Buckets, welche ohne Georenundanz angelegt werden (Buckets ohne -repl bzw. -mirr).
{{% /alert %}}

### Unterschiede zwischen den Speicherrichtlinien

| Option   | Beschreibung                                                                 | Redundanz                     | Standorte                 | Verwendungszweck                                                    |
| -------- | ---------------------------------------------------------------------------- | ----------------------------- | ------------------------- | ------------------------------------------------------------------- |
| -mirr    | Doppelspeicherung mit Erasure Coding und Replikation in doppelter Ausführung | Georedundant + Site Redundant | de-north-2 und de-west-1  | Produktionskritische Anwendungen oder User-Daten                    |
| -repl    | Replikation der Objekte, welche auf beide Rechenzentrum verteilt werden      | Nur Georedundant              | de-north-2 und de-west-1  | Doppeltes Backup, Kostengünstige Georedundanz                       |
| Standard | Regionale Speicherung mit Erasure Coding und Replikation                     | Nur Site Redundant            | de-north-2 oder de-west-1 | Produktions-Daten, Sichere Datenhaltung innerhalb einer Geolokation |

Diese Tabelle gibt Ihnen einen Überblick über die Hauptunterschiede zwischen den Optionen für die Erstellung von Buckets in unserem neuen S3.

{{% alert title="Wichtig" %}}
Die S3 Speicherklassen werden durch den Bucketnamen bestimmt. Da der S3 Standard kein “Bucket Rename” unterstützt, muss für eine Änderung der Speicherklasse ein neues Bucket angelegt werden und – falls notwendig – die Objektdaten des alten Buckets in das neue Bucket migriert werden.
{{% /alert %}}
