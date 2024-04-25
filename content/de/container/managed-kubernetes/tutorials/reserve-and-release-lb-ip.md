---
title: "Reservierung und Freigabe von LoadBalancer IPs"
linkTitle: "Reservierung und Freigabe von LoadBalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---

Das Revervieren von FloatingIP Addressen der LoadBalancer ist sinnvoll, wenn sich diese nicht ändern soll.
Dies wird durch Annotationen im Service-Manifest realisiert und somit der Loadbalancer konfiguriert.

## Reservierung von FloatingIPs

Zur initialen Reservierung einer FloatingIP muss dem Service eine Annotation mitgegeben werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserviert die FloatingIP in OpenStack
```

## Weiterverwendung einer FloatingIP

Zur Benutzung einer bereits reservierten FloatingIP muss diese dem neuen Service ebenfalls mitgegeben werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserviert die FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> # Hier wird die entsprechende FloatingIP angegeben
spec:
    loadBalancerIP: <FloatingIP> # Hier wird die entsprechende FloatingIP angegeben
```

## Freigabe von FloatingIPs

Die Annotation loadbalancer.openstack.org/keep-floatingip: muss auf false gesetzt werden. Danach kann der Service gelöscht werden.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "false" # Gibt die FloatingIP in OpenStack frei
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> # Hier wird die entsprechende FloatingIP angegeben
spec:
    loadBalancerIP: <FloatingIP> # Hier wird die entsprechende FloatingIP angegeben
```

## Freigabe von FloatingIPs welche nicht mehr bekannt sind

Hierfür muss momentan ein Ticket eröffnet werden per Mail oder unsere Hotline.
Wir prüfen dann, welche IPs noch tatsächlich in Nutzung sind und welche nicht mehr verwendet werden.