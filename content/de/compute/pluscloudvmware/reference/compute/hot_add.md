---
title: "VM Hot Add"
type: "docs"
weight: 40
date: 2024-08-07
description: >
  Informationen zur Verwendung von VMware VM Hot Add
---

Wenn Sie Ihren VMs neue Hardware hinzufügen möchten, können standardmäßig nur sehr wenige Hardwaretypen hinzugefügt werden, während die VM eingeschaltet ist. Dazu gehören virtuelle Netzwerkadapter (NIC), USB-Adapter und Festplatten.

Wenn Sie einen anderen Hardwaretyp oder mehr RAM oder CPU hinzufügen möchten, müssen Sie die VM normalerweise ausschalten. Sie können Hot-Add-Speicher oder Hot-Add-CPU auf Ihren VMs aktivieren.

## Vorteile von Hot Add

**Keine Ausfallzeit für Ihre VMs** – Wann immer Sie Ihren VMs mehr RAM oder vCPUs bereitstellen müssen, ohne sie herunterzufahren, können Sie dies über Hot Add CPU oder Hot Add RAM tun.

**CPU und RAM sind einsatzbereit** – Wenn Sie mehr CPU oder RAM benötigen, können Sie einfach während der Ausführung Ihrer VM auf die Konfigurationsseite gehen und die Anzahl der CPUs ändern oder den RAM erhöhen.

## Nachteile und Einschränkungen von Hot Add

**Overhead** – Wenn Sie Hot Add aktivieren, wird ein gewisser Overhead (in Prozent) hinzugefügt, aber wenn Sie die Vorteile bedenken, kann es sich lohnen.

**Kein vNUMA** – Ein weiterer Nachteil ist die Tatsache, dass die VM die Fähigkeit verliert, virtuellen nicht einheitlichen Speicherzugriff (vNUMA) zu verwenden. Diese Speicherzugriffsoptimierungsmethode wird automatisch für VMs mit mehr als acht vCPUs aktiviert.

**Betriebssystemlizenzierung** – Ihre aktuelle Gastbetriebssystemlizenz kann Sie daran hindern, zusätzliche vCPUs oder Speicher hinzuzufügen. Sie sehen, Sie könnten mit diesem Hot-Plug/Hot-Add das vCPU- oder Speicherlimit überschreiten.

## So aktivieren Sie Hot Add vCPU und Speicher

Diese Funktionen können nur in einer ausgeschalteten VM aktiviert werden. Sie können diese Funktionen aktivieren, indem Sie die Compute-Konfiguration für die Maschine bearbeiten und **Virtual CPU Hot Add** und/oder **Memory Hot Add** aktivieren.
