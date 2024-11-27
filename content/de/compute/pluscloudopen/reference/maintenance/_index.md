---
title: "Details zu Wartungsarbeiten"
type: "docs"
weight: 50
date: 2024-11-21
description: >
  Benutzung der Maintenance-Metadaten an der VM
---
## Wartungsarbeiten

### Platform Wartungsarbeiten

Eine Aktualisierung/Wartung der Plattform wird immer im Voraus angekündigt und umfasst alle Openstack-Komponenten. Dies hat normalerweise keine Auswirkungen auf Ihre Workload (VMs, Kubernetes-Cluster, ...). Es sind „nur“ die APIs betroffen, da die zugrundeliegenden Dienste neu gestartet werden müssen. Diese Wartungsarbeiten finden in der Regel einmal alle sechs Monate statt.

### Hypervisor Wartungsarbeiten

Jeder Hypervisor muss in regelmäßigen Abständen aktualisiert und neu gestartet werden. Dies ist in der Regel einmal im Monat der Fall.

Geplante Wartungsfenster finden in der Regel jeden Tag nach 22:00 Uhr MESZ statt.
Ein gewöhnlicher Neustart des Hypervisors dauert ca. 15 Minuten, kann in Ausnahmefällen aber auch länger dauern.

Bevor ein Hypervisor neu gestartet wird, versuchen wir, alle VMs live auf einen anderen zu migrieren, damit es keine Auswirkungen auf die VMs gibt. Es gibt jedoch einen Metadatenschlüssel namens **ps_automatic_maintenance**, der Sie darüber informiert, wann die Migration stattfinden wird, und Sie können entscheiden, ob Sie vor der Migration Maßnahmen ergreifen wollen oder nicht. Die meisten Anwendungen haben jedoch keine Probleme mit der Live-Migration.

{{% alert title="Es gibt jedoch Ausnahmen!" color="warning" %}}{{% /alert %}}

## Ausnahmen

Alle VMs, auf die diese Ausnahmen zutreffen, erhalten vor der Wartung ein ACPI-Shutdown-Signal. Die VMs haben **eine Minute Zeit, um ordnungsgemäß herunterzufahren**.

Nach Ablauf dieser Zeit werden sie einfach heruntergefahren.

Sie sollten davon ausgehen, dass Ihre VMs nach dem Neustart des Hypervisors ausgeschaltet bleiben. Sie können dieses Verhalten jedoch ändern, indem Sie den Metadatenschlüssel **ps_restart_after_maint=true** setzen. In diesem Fall wird Ihre VM neu gestartet, nachdem der zugrunde liegende Hypervisor neu gebootet wurde.

### Flavor basiert

Man erkennt die Ausnahmen daran das im Flavor, welches sie beim erstellen ihrer VM wählen, in dem Feld **_Properties_** bestimmte Key-Value Paare gesetzt sind.

Beispiel für [Local Disk Flavor](../local-storage)
```bash
openstack flavor list --long --column Name --column Properties | grep "aggregate_instance_extra_specs:localdisk='true'"
| SCS-2V-4-20s    | aggregate_instance_extra_specs:localdisk='true', hw_rng:allowed='True', quota:disk_read_bytes_sec='1024000000', quota:disk_read_iops_sec='100000', quota:disk_write_bytes_sec='1024000000', quota:disk_write_iops_sec='100000', scs:cpu-type='shared-core', scs:disk0-type='ssd', scs:name-v1='SCS-2V:4:20s', scs:name-v2='SCS-2V-4-20s'                            |
| SCS-4V-16-100s  | aggregate_instance_extra_specs:localdisk='true', hw_rng:allowed='True', quota:disk_read_bytes_sec='1024000000', quota:disk_read_iops_sec='100000', quota:disk_write_bytes_sec='1024000000', quota:disk_write_iops_sec='100000', scs:cpu-type='shared-core', scs:disk0-type='ssd', scs:name-v1='SCS-4V:16:100s', scs:name-v2='SCS-4V-16-100s'
```

Flavors mit den folgenden Properties werden während einer Wartungsarbeit **gestoppt**:

* 'ops.maintenance_action': 'stop'
* 'aggregate_instance_extra_specs:localdisk': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen1': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen2': 'true'
* 'aggregate_instance_extra_specs:nvidia_gen3': 'true'
* 'pci_passthrough:alias': 'l40:1'

Flavors mit den folgenden Properties werden während einer Wartungsarbeit **live migriert**:

* aggregate_instance_extra_specs:ceph='true'
* ops.maintenance_action = 'migrate'

### Server Gruppen

Für die [Server Gruppen](../instances-and-images/server-groups/) gibt es nur eine Ausnahme und das ist die 'harte' Affinität. Wir müssen die VMs hier herunterfahren da es keinen sicheren Weg gibt diese Live zu migrieren.

Um die Migration solcher Affinitäts Gruppen durchzuführen müsste der Verteilungs Mechanismus von Openstack (nova-scheduler) temporär für die VM abgeschalten werden. Wenn dieser Scheduler abgeschaltet ist, kann nicht mehr garantiert werden das die VM aus dieser Gruppe überhaupt auf den Ziel Hypervisor lauffähig ist. So fehlen Überprüfungen für CPU und Ram Ressourcen, Verfügbarer Storage, Netzwerk und vieles mehr, es wäre also eine Aktion auf gut Glück.

Alle anderen [Server Gruppen Policies](../instances-and-images/server-groups/#Verfügbare%20Policies) können Live migriert werden.

## Metadata Übersicht

| Metadaten-Feld            | Type                | Default | Wer setzt es | Info                                                                                                           |
| ------------------------- | ------------------- | ------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| ps_automatic_maintenance  | datetime (ISO8601)  | none    | Plusserver   | Zeigt wann eine generelle Wartungsarbeit an den zugrundeliegende Hypervisor stattfindet.                       |
| ps_scheduled_shutdown     | datetime (ISO8601)  | none    | Plusserver   | Informiert zu wlechem Zeitpunkt eine VM für die Wartungsarbeiten gestoppt wird.                                |
| ps_restart_after_maint    | boolean             | false   | Kunde        | Damit informiert der Kunde die plusserver das die VM nach der Wartungsarbeit wieder gestartet werden soll.     |

## Setzen der Restart Option

Openstack Cli Beispiel um eine VM nach den Wartungsarbeiten wieder starten zu lassen:

```bash
 openstack server set --property "ps_restart_after_maint=true" 01234567-0123-0123-0123-0123456789ab
```

## Auslesen der Zeitstempel

Curl Beispiel wie man in der laufenden VM die Metadaten auslesen kann:

```bash
curl -s http://169.254.169.254/openstack/latest/meta_data.json | jq -r '.meta.ps_scheduled_downtime'
2024-06-29T09:02:51Z
```

Openstack Cli Beispiel wie man die Metadaten von außerhalb der VM auslesen kann:

```bash
openstack server show b08cad3c-3c21-4201-9520-7d7fe20e1d98 --column properties
+------------+-----------------------------------------------------------------------------------------------+
| Field      | Value                                                                                         |
+------------+-----------------------------------------------------------------------------------------------+
| properties | ps_automatic_maintenance='2024-06-29T09:02:51Z', ps_scheduled_downtime='2024-06-29T09:02:51Z' |
+------------+-----------------------------------------------------------------------------------------------+
```

## Beispiel Use Case

Wir stellen ihnen die Metadaten zur Verfügung damit sie die Möglichkeit haben vor der Wartungsarbeit am Hypervisor reagieren zu können.

Stellen sie sich vor sie haben einen Cluster aus 3 VMs und sie wissen das der Cluster eine Downtime eines Mitglieds von ca. 15 Minuten (kann bei Hardware Fehlern länger dauern) nicht überstehen würde. In diesem Fall bräuchten sie für ihren Cluster ein watchdog oder health monitor der diese Metadaten alle 5 Minuten überprüft und handelt wenn er mitbekommt das **ps_scheduled_downtime** eine Zeitstempel in der Zukunft hat. In dem Fall könnte dieser Agent die VM kontrolliert aus dem Cluster entfernen, die VM löschen, danach die VM wieder ausrollen und dem Cluster erneut hinzufügen. Dieser Mechanismus ist wesentlich schneller als auf den Restart der VM nach einer Wartungsarbeit des Hypervisors zu warten.
