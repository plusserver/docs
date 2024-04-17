---
title: "Reservierung und Freigabe von LoadBalancer IPs"
linkTitle: "Reservierung und Freigabe von LoadBalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---

Das Revervieren von Floating-IP Addressen der LoadBalancer ist sinnvoll, wenn sich diese nicht ändern soll.
Dies wird durch Annotationen im Service-Manifest realisiert und somit der Loadbalancer konfiguriert.

## Reservierung von Floating-IPs

Zur initialen Reservierung einer Floating-IP muss dem Service eine Annotation mitgegeben werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserviert die FloatingIP in OpenStack
```

## Weiterverwendung einer Floating-IP

Zur Benutzung einer bereits reservierten Floating-IP muss diese dem neuen Service ebenfalls mitgegeben werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserviert die FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> # Hier wird die entsprechende Floating IP angegeben
spec:
    loadBalancerIP: <FloatingIP> # Hier wird die entsprechende Floating IP angegeben
```

## Freigabe von Floating-IPs

Die Annotation loadbalancer.openstack.org/keep-floatingip: muss auf false gesetzet werden. Danach kann der Service gelöscht werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "false" # Reserviert die FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> # Hier wird die entsprechende Floating IP angegeben
spec:
    loadBalancerIP: <FloatingIP> # Hier wird die entsprechende Floating IP angegeben
```

## Freigabe von Floating-IPs welche nicht mehr bekannt sind

Hierfür muss momentan ein Ticket eröffnet werden per Mail oder unsere Hotline.
Wir prüfen dann, welche IPs noch tatsächlich in Nutzung sind und welche nicht mehr verwendet werden.