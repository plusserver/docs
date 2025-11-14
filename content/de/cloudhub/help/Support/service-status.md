---
title: "Service-Status"
linkTitle: "Service-Status"
type: "docs"
weight: 3
description: >
    Informationen zum Service-Status im CloudHub
---

## Service-Status

Auf der Seite [„Service-Status“](https://cloudhub.plusserver.com/support/server-status) erhalten Sie einen aktuellen Überblick über den Zustand Ihrer überwachten Systeme und Dienste. Die Darstellung erfolgt in zwei Kreisdiagrammen – eines für Hosts und eines für Services.
![Kreisdiagramme Störungen](../img/service-status/diagrams-malfunctions.png)

### Statusanzeige

Die Diagramme zeigen die aktuelle Verteilung der folgenden Zustände:

- **OK** – Das System oder der Service arbeitet fehlerfrei.
- **Warnung** – Es liegt ein Hinweis auf einen möglichen Engpass oder eine Abweichung vor.
- **Kritisch** – Es besteht eine Störung, die unmittelbare Aufmerksamkeit erfordert.
- **Unbekannt** – Der Status konnte nicht ermittelt werden.

**Wichtig:**
Es werden ausschließlich Systeme angezeigt, die nach unserem aktuellen Standard **Icinga2** überwacht werden.

### Detailanzeige der Störungen

Wenn Störungen vorhanden sind, können Sie im entsprechenden Kreisdiagramm auf den betroffenen Bereich klicken.
Sie gelangen dann zu einer detaillierteren Übersicht, in der die Störungen in Tabellenform dargestellt werden.
![Detailansicht der Störungen](../img/service-status/detailed-view-malfunctions.png)

#### Störungstabelle

Die Tabelle zeigt folgende Informationen:

- **Status** des Hosts oder Services
- **Hostname** des betroffenen Systems
- **Service** – Bezeichnung des betroffenen Services (wird nur in der Tabelle zu Services angezeigt)

Diese Ansicht erleichtert es Ihnen, betroffene Systeme schnell zu identifizieren und gezielt Maßnahmen einzuleiten.
