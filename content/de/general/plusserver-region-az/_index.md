---
title: "plusserver Regions and Availability Zones"
type: "docs"
weight: 10
date: 2023-03-10
---

# Einführung

plusserver bietet mehrere Regionen und Availability Zones (AZs) an, um Kunden Hochverfügbarkeits- und Disaster-Recovery-Optionen zu bieten. Jede AZ besteht aus einem oder mehreren Rechenzentren, die so konzipiert sind, dass sie unabhängig voneinander sind und im Falle von Ausfällen oder Katastrophen Redundanz bieten. Kunden können ihre Ressourcen in einer oder mehreren AZs für Hochverfügbarkeits- und Disaster-Recovery-Zwecke bereitstellen.

## Was ist eine Region?

Eine Region ist ein geografisches Gebiet, das aus mehreren isolierten und physisch getrennten, also redundanten AZs besteht.

### Anforderungen

* Besteht aus mehreren isolierten und physisch getrennten AZs innerhalb eines geografischen Gebietes.
* Die Entfernung zwischen den Regionen ist >=300km.

### Beispiele

* DE-WEST

## Was ist eine Availability Zone (AZ)?

Eine Availability Zone (AZ) ist ein Standort innerhalb einer Region, der aus einem oder mehreren Rechenzentren besteht, die so konzipiert sind, dass sie voneinander unabhängig sind und im Falle von Ausfällen oder Katastrophen Redundanz bieten. Kunden können wählen, ob sie ihre Ressourcen in einer oder mehreren AZs für Hochverfügbarkeit und Disaster Recovery einsetzen wollen.

### Anforderungen

* Eine AZ befindet sich innerhalb einer Region und besteht aus einem oder mehreren Rechenzentren mit mindestens einer gemeinsamen Strom-, Netzwerk- und Kühlungsversorgung.
* Ein AZ ist immer unabhängig von einem anderen (insbesondere in den Bereichen Strom [Einspeisung, Verteilung, USV, Notstrom], Netzwerk [Einspeisung, Router, Switches], Kühlung und Gebäude).
* Die Latenzzeit zwischen den AZs innerhalb derselben Region beträgt <=2ms.

### Beispiele

* DE-NORTH-1
* DE-WEST-2

## plusserver Region und Availability Zone Liste

Die folgende Tabelle listet die von plusserver angebotenen Regionen und AZs auf:

| Region | Availability Zone | Standort |
|----------|-------------------|---------------------|
| DE-NORTH | DE-NORTH-1 | Hamburg, Deutschland |
| DE-NORTH-2 | Hamburg, Deutschland |
| DE-WEST | DE-WEST-1 | Köln, Deutschland |
| | DE-WEST-2 | Düsseldorf, Deutschland |

### Standorte und Rechenzentren

![plusserver Standorte und Rechenzentren](PCO-2023_de.png)
