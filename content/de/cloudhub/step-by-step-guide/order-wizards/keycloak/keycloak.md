---
title: "Keycloak"
linkTitle: "Keycloak"
type: "docs"
weight: 7
description: >
    Schritt für Schritt Anleitung für Keycloak
---

## Einleitung

Willkommen zum Bestellformular der Keycloak. Hier wird beschrieben, welche Konfigurationsmöglichkeiten es gibt und wie eine neue Keycloak bestellt werden kann.

Im Folgenden führen wir Sie Schritt für Schritt durch den Bestellprozess und erläutern die einzelnen Auswahlmöglichkeiten und Eingabefelder.

Die Keycloak wird aktuell auf der Version 26 angeboten und nutzt eine Instanzgröße (Node) mit 4 vCPU(s) und 8 GB RAM.

![alt text](../img/keycloak-overview1.png)
![alt text](../img/keycloak-overview2.png)

## Schritt 1: Speichergröße

Wählen Sie die gewünschte Speichergröße über einen Schieberegler:

- Min.: 50 GB
- Max.: 200 GB
- Kosten: 14,30 €/Monat pro 50 GB

![alt text](../img/keycloak-storage.png)

## Schritt 2: Vertrauenswürdige Quellen

Geben Sie die erlaubten Netzwerkadressen im CIDR-Format an.
Dies ist ein Pflichtfeld.

Beispiel:
`10.10.10.10/24`

![alt text](../img/keycloak-sources.png)

## Schritt 3: Region auswählen

Wählen Sie die gewünschte Region für die Bereitstellung Ihrer Datenbank:

- DE-WEST-1 CGN3 (Köln)
- DE-NORTH-2 HAM6 (Hamburg)

![alt text](../img/keycloak-regions.png)

## Schritt 4: Projektvertragskennung

Wählen Sie, ob bereits eine Projektvertragskennung besteht:

- Neue Projektvertragskennung
- Existierende Projektvertragskennung (Auswahl aus einer Liste)

![alt text](../img/keycloak-existing-project.png)
