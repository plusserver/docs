---
title: "vRAM "
type: "docs"
weight: 10
date: 2024-07-12
description: >
  Erläuterungen zu virtuellem Arbeitsspeicher in der pluscloud VMware
---

Virtuelle Maschinen (VMs) benötigen virtuellen Arbeitsspeicher ({{< abbr "vRAM" "virtual Random Access Memory" >}}) um ausgeführt werden zu können.
Der Arbeitsspeicher dient dazu Daten und Programme für die [{{< pagetitle "vcpu" >}}]({{< ref "vcpu" >}}) zu speichern.

Das {{< abbr "vRAM" "virtual Random Access Memory" >}} stellt dabei eine Abstraktion der hardwareseitigen {{< abbr "RAM" "Random Access Memory" >}}-Module dar.
Es handelt sich um einen flüchtigen Speicher.
Das heißt, dass dieser Speicher nicht zur dauerhaften Datenpersistierung geeignet ist, weil es keine Garantie gibt, dass die Daten nach einem Neustart der VM noch verfügbar sind.

## Angebotene Optionen

Sie können lediglich die Größe des virtuellen Arbeitsspeichers festlegen.
Die aktuell verfügbaren Werte können Sie der Leistungsbeschreibung des Produktes entnehmen.

| Option                 | Minimum          | Maximum              |
|------------------------|------------------|----------------------|
| vRAM                   | 1 GiB = 1024 MiB | 128 GiB = 131072 MiB |

Bitte beachten Sie hierbei:

* Unterstützt wird nur der angegebene vRAM-Bereich.
* Sie können auch Werte außerhalb des angegebenen Bereichs einstellen.  
  In diesem Fall kann es allerdings vorkommen das eine VM nicht startet oder nach einem Neustart nicht mehr korrekt startet.

## Einrichtung von vRAM bei VMs

Dies können Sie auf der Seite [{{< pagetitle "/compute/pluscloudvmware/introduction/quickstart" >}}]({{< ref "/compute/pluscloudvmware/introduction/quickstart" >}}) nachlesen.
