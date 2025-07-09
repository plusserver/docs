---
title: "LoadBalancer Default-Timeouts"
linkTitle: "LoadBalancer Default-Timeouts"
type: "docs"
weight: 21
date: 2025-07-09
---

## Anpassung der LoadBalancer Default-Timeouts

Der Default-Timeout für OpenStack LoadBalancer liegt bei 30 Sekunden und kann über folgende Annotationen angepasst werden:

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/timeout-client-data: "70000"
        loadbalancer.openstack.org/timeout-member-data: "70000"
```

Erklärung der Parameter:
- timeout-client-data: Legt fest, wie lange der Loadbalancer auf Daten vom Client wartet (in Millisekunden).
- timeout-member-data: Legt fest, wie lange der Loadbalancer auf Daten vom Backend (Member) wartet (ebenfalls in Millisekunden).

Weitere Konfigurationsmöglichkeiten sind in der offiziellen Dokumentation unter diesem [Link](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/openstack-cloud-controller-manager/expose-applications-using-loadbalancer-type-service.md#service-annotations) zu finden.
