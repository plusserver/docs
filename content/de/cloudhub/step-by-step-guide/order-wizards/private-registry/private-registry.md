---
title: "Private Registry"
linkTitle: "Private Registry"
type: "docs"
weight: 4
description: >
    Schritt für Schritt Anleitung für Private Registry
---

## Einleitung

Willkommen zum Bestellformular der Private Registry. Hier wird beschrieben, welche Konfigurationsmöglichkeiten es gibt und wie eine neue Private Registry bestellt werden kann.

Im Folgenden führen wir Sie Schritt für Schritt durch den Bestellprozess und erläutern die einzelnen Auswahlmöglichkeiten und Eingabefelder.

Die Private Registry basiert auf Harbor, einer cloudnativen Open-Source-Registry für Container-Images.


![Private Registry Überblick 1](../img/private-registry-overview1.png)
![Private Registry Überblick 2](../img/private-registry-overview2.png)

## Schritt 1: Instanztyp

Aktuell steht nur ein Instanztyp zur Verfügung:

- Basic Usage
  - Nodes mit einem vCPU/vRAM-Verhältnis von 1:2

![Private Registry Instanztyp](../img/private-registry-instanz-type.png)

## Schritt 2: Instanzgröße

Wählen Sie eine der folgenden Instanzgrößen:

#### b2-4
  - 2 vCPU(s) und 4 GB RAM
  - 0,11 €/Stunde

#### b4-8
  - 4 vCPU(s) und 8 GB RAM
  - 0,22 €/Stunde

![Private Registry Instanzgröße](../img/private-registry-instanz-size.png)

## Schritt 3: Speichergröße

Wählen Sie die gewünschte Speichergröße über einen Schieberegler:

- Min.: 50 GB
- Max.: 1000 GB
- Kosten: 7,15 €/Monat pro 50 GB

![Private Registry Speichergröße](../img/private-registry-storage.png)

## Schritt 4: Vertrauenswürdige Quellen

Geben Sie die erlaubten Netzwerkadressen im CIDR-Format an.

Beispiel:
`10.10.10.10/24`

![Private Registry Vertrauenswürdige Quellen](../img/private-registry-sources.png)

## Schritt 5: Region auswählen

Wählen Sie die gewünschte Region für die Bereitstellung der Registry:

- DE-WEST-1 CGN3 (Köln)
- DE-NORTH-2 HAM6 (Hamburg)

![Private Registry Region](../img/private-registry-region.png)

## Schritt 6: Projektvertragskennung

Wählen Sie, ob bereits eine Projektvertragskennung besteht:

- Neue Projektvertragskennung
- Existierende Projektvertragskennung (Auswahl aus einer Liste)

![Private Registry Projektvertragskennung](../img/private-registry-existing-project.png)
