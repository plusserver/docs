---
title: "Reservierung und Freigabe von Loadbalancer IPs"
linkTitle: "Reservierung und Freigabe von Loadbalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---

Das Reservieren von Floating-IP-Addressen der Loadbalancer ist sinnvoll, wenn sich diese nicht ändern sollen.
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

## Freigabe von FloatingIPs, welche nicht mehr bekannt sind

Wenn Sie nicht mehr wissen, welche Floating-IPs Sie aktuell nutzen, öffnen Sie bitte ein Support-Ticket in Ihrem Kundenportal.
