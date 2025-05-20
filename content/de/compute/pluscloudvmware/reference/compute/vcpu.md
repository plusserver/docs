---
title: "vCPU "
type: "docs"
weight: 20
date: 2024-07-12
description: >
  Erläuterungen zu virtuellen CPUs in der pluscloud VMware
---

Virtuelle Maschinen (VMs) benötigen mindestens ein virtuelle {{< abbr "CPU" "Central Processing Unit" >}}  um ausgeführt werden zu können.

Eine {{< abbr "vCPU" "virtual Central Processing Unit" >}} umfasst dabei ein oder mehrere virtuelle CPU-Kerne, welche als vCore bezeichnet werden.
Jeder vCore entspricht einem Hardware-Thread auf einer physischen CPU.
Jede {{< abbr "vCPU" "virtual Central Processing Unit" >}} führt Befehlssequenzen für das Betriebssystem der {{< abbr "VM" "Virtuellen Maschine" >}} oder die dort ausgeführten Anwendungsprogramme durch.

## Angebotene Optionen

Grundsätzlich können Sie zwischen "Standard CPU" und "High Performance CPU" wählen. Diese Auswahl bezieht sich immer auf ein gesamtes virtuelles Rechenzentrum ({{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}, vgl. Abschnitt [Datacenter]({{< ref "/compute/pluscloudvmware/introduction/quickstart#datacenter" >}}) auf der Seite [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}})).

Je nach Auswahl unterscheidet sich die Taktgeschwindigkeit der vCores und die Anzahl der maximal konfigurierbaren vCores je VM.
Die aktuellen Werte können Sie der Leistungsbeschreibung des Produktes entnehmen.

Zum Zeitpunkt der Erstellung dieser Dokumentation gelten folgende Werte:

| Option                 | Taktrate           | Anzahl vCores       |
|------------------------|--------------------|---------------------|
| Standard vCore         | mindestens 2,0 GHz | ganzzahlig 1 bis 32 |
| High-Performance vCore | mindestens 3,1 GHz | ganzzahlig 1 bis 16 |

Bitte beachten Sie hierbei:

* Alle vCores einer VM haben die gleiche Taktrate.
* Alle VMs eines {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} nutzen die gleiche Art von vCPU.
* Die Anteilige konfiguration von vCPUs ist nicht möglich.
* Es besteht kein Anspruch auf ein bestimmtes CPU-Modell oder einen festgelegten Hersteller.

## Einrichtung von vCPUs bei VMs

Dies können Sie auf der Seite [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}}) nachlesen.
