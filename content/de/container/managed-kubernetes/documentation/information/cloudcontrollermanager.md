---
title: "PSKE - Cloud Controller Manager (CCM)"
linkTitle: "Cloud Controller Manager (CCM)"
type: "docs"
weight: 100
date: 2023-02-21
---

# Cloud Controller Manager und Service-Annotations

In jedem mit PSKE erstellten Kubernetes-Cluster wird automatisch der entsprechende Cloud Controller Manager (CCM) bereitgestellt, der der Kubernetes-Version entspricht. In einem Kubernetes-Cluster der Version 1.24.0 wird zum Beispiel der Cloud Controller Manager v1.24.0 bereitgestellt. Wenn Sie einen Kubernetes-Cluster aktualisieren, wird auch der Cloud Controller Manager auf eine unterstützte Version aktualisiert.Die Hauptaufgabe des Cloud Controller Managers ist die Konfiguration des OpenStack LoadBalancers. Diese Konfiguration wird mithilfe von Annotationen im Service durchgeführt.

Die folgenden Annotationen werden von Kunden häufig verwendet:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    loadbalancer.openstack.org/proxy-protocol: "true" # Enables the Proxy Protocol in the OpenStack LoadBalancer
    #loadbalancer.openstack.org/keep-floatingip: "true" # Reserves the FloatingIP in OpenStack, even after deleting the Helm chart
    #service.beta.kubernetes.io/openstack-internal-load-balancer: "true" # Creates a LoadBalancer in OpenStack without FloatingIP
  #loadBalancerIP: <FloatingIP> # Here you can define an already reserved FloatingIP. When "openstack-internal-load-balancer" is true, this will define the private IPv4 address of the OpenStack LoadBalancer.
```

Weitere unterstützte Service-Annotationen finden Sie im offiziellen GitHub-Projekt [kubernetes/cloud-provider-openstack](https://github.com/kubernetes/cloud-provider-openstack). 

Bitte wählen Sie die entsprechende Version des Cloud Controller Managers entsprechend der von Ihnen eingesetzten Kubernetes-Version.