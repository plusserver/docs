---
title: "Umgebungen"
linkTitle: "Umgebungen"
type: "docs"
weight: 20
date: 2024-06-27
description: >
  Informationen zu Umgebungen der pluscloud VMware
---

## Was ist eine pluscloud VMware Umgebung?

Jede pluscloud VMware Umgebung ist eine eigenständige Instanz einer VMware vCloud Foundation (VCF).
Somit ist jede Umgebung unabhängig von anderen Umgebungen und bildet eine eigenständige Verwaltungsdomäne, welche jeweils mit den benötigten Verwaltungssystemen ausgestattet ist.

Jede pluscloud VMware Umgebung ist exakt einer Availability Zone zugeordnet.

## Allgemein verfügbare Umgebungen der pluscloud VMware

Näheres zu Regionen und Availability Zones ist auf der Seite 
[{{< pagetitle "/general/plusserver-region-az" >}}]({{< ref "/general/plusserver-region-az" >}}) zu finden.

Die nachfolgenden Umgebungen stehen allgemein Kunden zur Verfügung.
Kundendedizierte Umgebungen werden hier nicht aufgelistet.


| Umgebung  | Region   | Availability Zone | vCloud Director Endpunkt              |
|-----------|----------|-------------------|---------------------------------------|
| de-1  (*) | DE-NORTH | DE-NORTH-1        | <https://de-1.vcd.get-cloud.io/>      |
| de-2  (*) | DE-NORTH | DE-NORTH-2        | <https://de-2.vcd.get-cloud.io/>      |
| de-3  (*) | DE-WEST  | DE-WEST-1         | <https://de-3.vcd.get-cloud.io/>      |
| de-31 (*) | DE-WEST  | DE-WEST-1         | <https://de-31.vcd.get-cloud.io/>     |
| de-4  (*) | DE-WEST  | DE-WEST-2         | <https://de-4.vcd.get-cloud.io/>      |
| de-5      | DE-NORTH | DE-NORTH-1        | <https://de-5.vcd.get-cloud.io/>      |
| de-6      | DE-NORTH | DE-NORTH-2        | <https://de-6.vcd.get-cloud.io/>      |
| de-7      | DE-WEST  | DE-WEST-1         | <https://de-7.vcd.get-cloud.io/>      |
| de-9      | DE-WEST  | DE-WEST-2         | <https://de-9.vcd.get-cloud.io/>      |
| de-11     | DE-WEST  | DE-WEST-1         | <https://de-11.vcd.get-cloud.io/>     |
| fr-1  (*) | FR       | FR-1              | <https://fr-1.vcd.get-cloud.io/>      |

{{% alert title="Hinweis" color="info" %}}
**Altumgebungen**  
Die mit einem Stern (*) gekennzeichneten Umgebungen stehen ausschließlich Bestandskunden zur Verfügung.
{{% /alert %}}
