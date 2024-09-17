---
title: "Netzwerktypen"
linkTitle: "Netzwerktypen"
type: "docs"
weight: 10
date: 2024-07-01
description: >
  Verfügbare Netzwerktypen innerhalb der pluscloud VMware
---

Es gibt mehrere Typen von Netzwerken, zwischen denen mittels Gateway eine Verbindung geschaffen werden kann:

```mermaid
flowchart LR
  ext[Externe Netzwerke] <--> org[Org Netzwerke] <--> app[vApp Netzwerke]
```

## Hierarchien von Netzwerken

Es gibt drei hierarchische Ebenen von Netzwerken:

* Externe Netzwerke
* Org Netzwerke
* vApp Netzwerke

### Externe Netzwerke

Ein Externes Netzwerk stellt eine Verbindung von der Cloudumgebung in die Außenwelt dar.
Dies kann beispielsweise eine Internetanbindung, ein externes Netzwerksegment, welches eingebunden werden soll, oder eine VPN-Verbindung sein.

Die Anbindung eines Externen Netzwerk an die Cloudumgebung wird über ESXi Portgruppen umgesetzt und kann nur von einem Cloud Provider umgesetzt werden.
Eine Einrichtung im Self-Service ist hier nicht möglich.

### Org Netzwerke

Org Netzwerke dienen der Herstellung von Verbindungen innerhalb der Cloudumgebung und sind entsprechend für Cloudinternen Traffic vorgesehen.
Wie der Name bereits andeutet, sind Org Netzwerke mit eine Organisation verbunden.

Die Verbindung zwischen einem Org Netzwerk und einem Externen Netzwerk wird mit einem sogenannten Edge Gateway umgesetzt

### vApp Netzwerke

vApp Netzwerke begrenzen sich auf den Kontext einer vApp. Dabei verhalten sich vApp Netzwerke zu Org Netzwerken ähnlich wie Org Netzwerke zu Externen Netzwerken.

Mit vApp Netzwerken ist es möglich innerhalb einer vApp Verbindungen herzustellen, welche auf die vApp begrenzt sind.

Die Verbindung zwischen einem Org Netzwerk und einem Externen Netzwerk wird mit einem sogenannten vApp Gateway umgesetzt.

## Arten von Netzwerkverbindungen

Es gibt drei Möglichkeiten für die Verbindung zwischen Netzwerksegementen unterschiedlicher Ebenen:

| Connection Type | Explanation                                                                                                     |
|-----------------|-----------------------------------------------------------------------------------------------------------------|
| Direct          | Das Netzwerksegment ist auf Ebene des Data Link layer verbunden, also wie bei einem Layer-2-Switch.             |
| Routed          | Das Netzwerksegment ist auf Ebene des Network Layer, also mit einem Gateway, welches NAT oder routing vornimmt. |
| Isolated        | Das Netzwerksegment ist nicht mit anderen Netzwerken verbunden.                                                 |
