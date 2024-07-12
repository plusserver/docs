---
title: "Netzwerktypen"
linkTitle: "Netzwerktypen"
type: "docs"
weight: 10
date: 2024-07-01
description: >
  Verfügbare Netzwerktypen innerhalb der pluscloud VMware
---

Es gibt drei Typen von Netzwerken:

* Externe Netzwerke
* Org Netzwerke
* vApp Netzwerke

Zwischen diesen Netzwerken kann mittels Gateway eine Verbindung geschaffen werden:

```mermaid
flowchart LR
  ext[Externe Netzwerke] <--> org[Org Netzwerke] <--> app[vApp Netzwerke]
```

## Externe Netzwerke

Ein Externes Netzwerk stellt eine Verbindung von der Cloudumgebung in die Außenwelt dar.
Dies kann beispielsweise eine Internetanbindung, ein externes Netzwerksegment, welches eingebunden werden soll, oder eine VPN-Verbindung sein.

Die Anbindung eines Externen Netzwerk an die Cloudumgebung wird über ESXi Portgruppen umgesetzt und kann nur von einem Cloud Provider umgesetzt werden.
Eine Einrichtung im Self-Service ist hier nicht möglich.

## Org Netzwerke

Org Netzwerke dienen der Herstellung von Verbindungen innerhalb der Cloudumgebung und sind entsprechend für Cloudinternen Traffic vorgesehen.
Wie der Name bereits andeutet, sind Org Netzwerke mit eine Organisation verbunden.

Es gibt drei Arten, ein Org Netzwerk an ein Externes Netzwerk anzubinden:

* Direkt verbunden mit einem Externen Netzwerk
* Indirekt mit einem Externen Netzwerk Verbunden, was mit Hilfe von NAT oder Routing umgesetzt wird.
* Isoliert, das heißt nicht mit einem Externen Netzwerk verbunden

Die Verbindung zwischen einem Org Netzwerk und einem Externen Netzwerk wird mit einem sogenannten Edge Gateway umgesetzt

## vApp Netzwerke

vApp Netzwerke begrenzen sich auf den Kontext einer vApp. Dabei verhalten sich vApp Netzwerke zu Org Netzwerken ähnlich wie Org Netzwerke zu Externen Netzwerken.

Mit vApp Netzwerken ist es möglich innerhalb einer vApp Verbindungen herzustellen, welche auf die vApp begrenzt sind.

Auch hier gibt es drei Arten, ein vApp Netzwerk an ein Org Netzwerk anzubinden:

* Direkt verbunden mit einem Org Netzwerk
* Indirekt mit einem Org Netzwerk Verbunden, was mit Hilfe von NAT oder Routing umgesetzt wird.
* Isoliert, das heißt nicht mit einem Org Netzwerk verbunden

Die Verbindung zwischen einem Org Netzwerk und einem Externen Netzwerk wird mit einem sogenannten vApp Gateway umgesetzt.
