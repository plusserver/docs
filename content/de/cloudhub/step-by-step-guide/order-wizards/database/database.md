---
title: "Datenbanken"
linkTitle: "Datenbanken"
type: "docs"
weight: 5
description: >
    Schritt für Schritt Anleitung für Datenbanken
---

## Einleitung

Willkommen zum Bestellformular der Datenbanken. Hier wird beschrieben, welche Konfigurationsmöglichkeiten es gibt und wie eine neue Datenbank bestellt werden kann.

Im Folgenden führen wir Sie Schritt für Schritt durch den Bestellprozess und erläutern die einzelnen Auswahlmöglichkeiten und Eingabefelder.

![Datenbanken Überblick 1](../img/database-overview1.png)
![Datenbanken Überblick 2](../img/database-overview2.png)

## Schritt 1: Datenbank-Auswahl

Wählen Sie das gewünschte Datenbanksystem und die passende Version:

#### Verfügbare Datenbanken und Versionen:

- MySQL: 8.4, 8.0
- PostgreSQL: 17, 16, 15, 14
- MariaDB: 11.4, 10.11, 10.6
- CouchDB: 3.3

![Datenbanken MySQL](../img/database-mysql.png)
![Datenbanken PostgreSQL](../img/database-postgres.png)
![Datenbanken MariaDB](../img/database-mariadb.png)

## Schritt 2: Instanztyp auswählen

Wählen Sie das gewünschte Verhältnis von vCPU zu vRAM:

#### Basic Usage
- Nodes mit einem vCPU/vRAM-Verhältnis von 1:2

#### All Purpose
- Nodes mit einem vCPU/vRAM-Verhältnis von 1:4

#### RAM Optimised
- Nodes mit einem vCPU/vRAM-Verhältnis von 1:8

## Schritt 3: Instanzgröße auswählen

Je nach gewähltem Instanztyp stehen verschiedene Größen zur Auswahl:

#### Basic Usage:

Instanzgrößen:
- b2-4 – 2 vCPU, 4 GB RAM – 0,11 €/Stunde
- b4-8 – 4 vCPU, 8 GB RAM – 0,22 €/Stunde
- b8-16 – 8 vCPU, 16 GB RAM – 0,44 €/Stunde
- b16-32 – 16 vCPU, 32 GB RAM – 0,88 €/Stunde
- b32-64 – 32 vCPU, 64 GB RAM – 1,76 €/Stunde

#### All Purpose:

Instanzgrößen:
- a2-8 – 2 vCPU, 8 GB RAM – 0,15 €/Stunde
- a4-16 – 4 vCPU, 16 GB RAM – 0,31 €/Stunde
- a8-32 – 8 vCPU, 32 GB RAM – 0,62 €/Stunde
- a16-64 – 16 vCPU, 64 GB RAM – 1,23 €/Stunde
- a32-128 – 32 vCPU, 128 GB RAM – 2,46 €/Stunde

#### RAM Optimised:

Instanzgrößen:
- r2-16 – 2 vCPU, 16 GB RAM – 0,24 €/Stunde
- r4-32 – 4 vCPU, 32 GB RAM – 0,48 €/Stunde
- r8-64 – 8 vCPU, 64 GB RAM – 0,97 €/Stunde
- r16-128 – 16 vCPU, 128 GB RAM – 1,94 €/Stunde

![Datenbanken Instanztyp Basic Usage](../img/database-basic-usage.png)
![Datenbanken Instanztyp All Purpose](../img/database-all-purpose.png)
![Datenbanken Instanztyp RAM Optimised](../img/database-ram.png)

## Schritt 4: Speichergröße

Wählen Sie die gewünschte Speichergröße über einen Schieberegler:

- Min.: 50 GB
- Max.: 1000 GB
- Kosten: 14,30 €/Monat pro 50 GB

![Datenbanken Speichergröße](../img/database-storage-size.png)

## Schritt 5: Vertrauenswürdige Quellen

Geben Sie die erlaubten Netzwerkadressen im CIDR-Format an.
Dies ist ein Pflichtfeld.

Beispiel:
`10.10.10.10/24`

![Datenbanken vertrauenswürdige Quellen](../img/database-sources.png)

## Schritt 6: Region auswählen

Wählen Sie die gewünschte Region für die Bereitstellung Ihrer Datenbank:

- DE-WEST-1 CGN3 (Köln)
- DE-NORTH-2 HAM6 (Hamburg)

![Datenbanken Region](../img/database-region.png)

## Schritt 7: Projektvertragskennung

Wählen Sie, ob bereits eine Projektvertragskennung besteht:

- Neue Projektvertragskennung
- Existierende Projektvertragskennung (Auswahl aus einer Liste)

![Datenbanken Projektvertragskennung](../img/database-existing-project.png)
