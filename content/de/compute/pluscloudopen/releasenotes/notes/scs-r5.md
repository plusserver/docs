---
title: "SCS R5"
linkTitle: "SCS R5"
type: "docs"
date: 2023-10-31
weight: 999
description: >
  Hinweise zu Veränderungen und Verbesserungen im SCS R5 Release 
---

## Allgemeine Hinweise

- OpenStack 2023.1 (Antelope) ist das verwendete OpenStack Release.
- Ceph Quincy ist die verwendete Ceph-Version (keine Änderung gegenüber SCS R4).
- OVN und OVS werden aus dem Quellcode erstellt und nicht mehr über Pakete installiert.

## Wichtige Information

Mit diesem Update müssen wir den RabbitMQ Messaging Service neu aufsetzen. Daher ist es notwendig, die API und die GUI für ca. drei Stunden herunterzufahren. Während dieser Zeit wird es nicht möglich sein, laufende Workloads zu verwalten oder neue Workloads zu erstellen. Laufende Workloads sind nicht betroffen!

## Übersicht: Neue Funktionen und Anforderungen

### Horizon

Grafische Unterstützung für Portweiterleitung im Dashboard "Netzwerk - Floating IPs". Im Dropdown-Menü der nicht zugewiesenen Floating IPs -> "Floating IP-Portweiterleitungsregeln konfigurieren".

### Nova

Die letzte für 2023.1 unterstützte Micro-Version der Compute API ist v2.95.

### Keystone

Mit dieser Version von Keystone wird die alte "_member_"-Rolle entfernt und es kann nur noch die neue "member"-Rolle innerhalb der Projekte verwendet werden.

Da es viele User gibt, denen die alte Rolle zugewiesen ist, werden wir alle User auf die neue Rolle umstellen, sodass sich niemand auf der Plattform darum kümmern muss. Gleichzeitig werden wir auch die pco-expansion-api auf die Version 0.2.1 umstellen, die ebenfalls die neue "member"-Rolle verwendet.

### Flavors

Mit der Veröffentlichung des neuen SCS Flavor Naming Standards (https://docs.scs.community/standards/scs-0100-v2-flavor-naming/) müssen alle SCS Provider diesem folgen und die Compute Flavors mit dem neuen Namen versehen - die Bindestriche anstelle von Doppelpunkten enthalten. Um die Auswirkungen so gering wie möglich zu halten, werden wir die neuen Flavors für alle hinzufügen und die alten Flavors nur in den Projekten, die sie derzeit verwenden, auf private Sichtbarkeit setzen.

Wir bitten Sie, ab dem Zeitpunkt des Updates nur noch die neuen Flavors (mit Bindestrichen) zu verwenden. Bestehende Workloads werden weiterhin mit den alten Flavors laufen. Zur besseren Übersicht in den Projekten ist es sinnvoll, laufende Workloads mit den neuen Flavors neu zu erstellen, sodass die alten Flavors aus der Flavor-Liste des Projekts gelöscht werden können.

### Detaillierte Release Notes für jede Komponente (inklusive Bugfixes)

- Pressemitteilung zum Release von OpenStack 2023.1 (EN): https://www.openstack.org/software/antelope/

Release Notes zu OpenStack 2023.1:
- Barbican: https://docs.openstack.org/releasenotes/barbican/2023.1.html
- Cinder: https://docs.openstack.org/releasenotes/cinder/2023.1.html
- Designate: https://docs.openstack.org/releasenotes/designate/2023.1.html
- Glance: https://docs.openstack.org/releasenotes/glance/2023.1.html
- Heat: https://docs.openstack.org/releasenotes/heat/2023.1.html
- Horizon: https://docs.openstack.org/releasenotes/horizon/2023.1.html
- Keystone: https://docs.openstack.org/releasenotes/keystone/2023.1.html
- Neutron: https://docs.openstack.org/releasenotes/neutron/2023.1.html
- Nova: https://docs.openstack.org/releasenotes/nova/2023.1.html
- Octavia: https://docs.openstack.org/releasenotes/octavia/2023.1.html
- Placement: https://docs.openstack.org/releasenotes/placement/2023.1.html
- Overview: https://releases.openstack.org/antelope/index.html
 
