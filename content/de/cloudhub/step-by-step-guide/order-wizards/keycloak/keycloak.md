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

![Keycloak Überblick 1](../img/keycloak-overview1.png)
![Keycloak Überblick 2](../img/keycloak-overview2.png)

## Schritt 1: Speichergröße

Wählen Sie die gewünschte Speichergröße über einen Schieberegler:

- Min.: 50 GB
- Max.: 200 GB
- Kosten: 14,30 €/Monat pro 50 GB

![Keycloak Speicher](../img/keycloak-storage.png)

## Schritt 2: Vertrauenswürdige Quellen

Geben Sie die erlaubten Netzwerkadressen im CIDR-Format an.

Beispiel:
`10.10.10.10/24`

![Keycloak Vertrauenswürdige Quellen](../img/keycloak-sources.png)

## Schritt 3: Region auswählen

Wählen Sie die gewünschte Region für die Bereitstellung Ihrer Datenbank:

- DE-WEST-1 CGN3 (Köln)
- DE-NORTH-2 HAM6 (Hamburg)

![Keycloak Region](../img/keycloak-regions.png)

## Schritt 4: Projektvertragskennung

Wählen Sie, ob bereits eine Projektvertragskennung besteht:

- Neue Projektvertragskennung
- Existierende Projektvertragskennung (Auswahl aus einer Liste)

![Keycloak Projektvertragskennung](../img/keycloak-existing-project.png)
