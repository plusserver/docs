---
title: "Load Balancer Konfiguration"
linkTitle: "Load Balancer Konfiguration"
type: "docs"
weight: 5
date: 2025-07-09
---

## Load Balancer Konfiguration

Der Load Balancer lässt sich mit den folgenden Konfigurationsoptionen bereitstellen:

Konfigurationsoptionen:

- keep-floatingip: true | false 
  - Reserviert die Floating IP-Adresse in OpenStack.

- proxy-protocol: true | false 
  - Aktiviert oder deaktiviert die Unterstützung für das Proxy Protocol.

- openstack-internal-load-balancer: true | false
  - Erstellt einen internen Load Balancer in OpenStack ohne Zuweisung einer Floating IP.

- loadBalancerIP: 10.250.0.2
  - Gibt die IP-Adresse des Load Balancers an.
  - Wenn die anotation openstack-internal-load-balancer gestetzt wurde kann eine beliebige, freie IP-Adresse aus dem Node-Netzwerk (Default 10.250.0.0/16) des jeweiligen PSKE-Clusters verwendet werden.

Bei einem internen Load Balancer (openstack-internal-load-balancer: true) wird hier die private IPv4-Adresse innerhalb des Clusternetzes definiert. Alternativ kann hier eine bereits reservierte Floating IP verwendet werden, wenn openstack-internal-load-balancer auf false gesetzt ist.

```yaml
  service:
    annotations:
      loadbalancer.openstack.org/proxy-protocol: "false"
      loadbalancer.openstack.org/keep-floatingip: "false"
      service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
      loadbalancer.openstack.org/loadBalancerIP: 10.250.0.2
```

Weitere Konfigurationsmöglichkeiten sind in der offiziellen Dokumentation unter diesem [Link](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/openstack-cloud-controller-manager/expose-applications-using-loadbalancer-type-service.md#service-annotations) zu finden.
