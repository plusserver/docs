---
title: "SCS R6"
linkTitle: "SCS R6"
type: "docs"
date: 2024-03-25
weight: 999
description: >
  Hinweise zu Veränderungen und Verbesserungen im SCS R6 Release 
---

## Allgemeine Hinweise

- OpenStack 2023.2 (Bobcat) ist das verwendete OpenStack Release.
- Ceph Quincy ist die verwendete Ceph-Version (mit einem minor Update auf 17.2.7).

## Wichtige Information

Mit diesem Update müssen wir den RabbitMQ Messaging Service neu aufsetzen, um Quorum Queues verwenden zu können, die den Dienst stabiler und robuster machen. Daher ist es notwendig, die API und die GUI für ca. drei Stunden herunterzufahren. Während dieser Zeit wird es nicht möglich sein, laufende Workloads zu verwalten oder neue Workloads zu erstellen. Laufende Workloads sind nicht betroffen.

## Übersicht: Neue Funktionen und Anforderungen

### Horizon

Wir sind zu einem neuen Branding Mechanismus gewechselt und haben das Design der Login Seite etwas angepaßt. 

### Nova

Die letzte für 2023.2 unterstützte Micro-Version der Compute API ist v2.95.

### Neutron

Ein Fehler im OVN driver wurde behoben, der dazu führen konnte, dass Netzwerk Metadaten nicht mehr verfügbar waren, wenn der Metadata Port (zufällig) gelöscht wurde. User können den Port jetzt neu anlegen, in dem sie DHCP einem der Subnetze per Neutron API dis- und dann wieder enablen - so ähnlich wie auch beim DHCP agent für ML2/OVS. 

### Heat

Folgende Ressourcen sind jetzt versteckt. Neutron LBaaS v2 war schon länger abgekündigt worden, deshalb können diese Ressourcen jetzt nicht mehr verwendet werden:

- OS::Neutron::LBaaS::LoadBalancer
- OS::Neutron::LBaaS::Listener
- OS::Neutron::LBaaS::Pool
- OS::Neutron::LBaaS::PoolMember
- OS::Neutron::LBaaS::HealthMonitor
- OS::Neutron::LBaaS::L7Policy
- OS::Neutron::LBaaS::L7Rule
 
### Detaillierte Release Notes für jede Komponente (inklusive Bugfixes)

- Pressemitteilung zum Release von OpenStack 2023.22(EN): https://www.openstack.org/software/openstack-bobcat/

Release Notes zu OpenStack 2023.2:
- Overview: : https://releases.openstack.org/bobcat/index.html
- Barbican: https://docs.openstack.org/releasenotes/barbican/2023.2.html
- Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2023.2.html
- Cinder: https://docs.openstack.org/releasenotes/cinder/2023.2.html
- Designate: https://docs.openstack.org/releasenotes/designate/2023.2.html
- Glance: https://docs.openstack.org/releasenotes/glance/2023.2.html
- Heat: https://docs.openstack.org/releasenotes/heat/2023.2.html
- Horizon: https://docs.openstack.org/releasenotes/horizon/2023.2.html
- Ironic: https://docs.openstack.org/releasenotes/ironic/2023.2.html
- Keystone: https://docs.openstack.org/releasenotes/keystone/2023.2.html
- Manila: https://docs.openstack.org/releasenotes/manila/2023.2.html
- Neutron: https://docs.openstack.org/releasenotes/neutron/2023.2.html
- Nova: https://docs.openstack.org/releasenotes/nova/2023.2.html
- Octavia: https://docs.openstack.org/releasenotes/octavia/2023.2.html
- Placement: https://docs.openstack.org/releasenotes/placement/2023.2.html

 
