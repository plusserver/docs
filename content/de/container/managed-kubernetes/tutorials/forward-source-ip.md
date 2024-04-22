---
title: "Proxy Protocol - Durchleiten der Source IP"
linkTitle: "Proxy Protocol - Durchleiten der Source IP"
type: "docs"
weight: 4
date: 2023-02-21
---

Bei der Standardkonfiguration von Ingress Controller und OpenStack Load Balancer kommen alle externen Webanfragen aus dem Kubernetes-Cluster von der internen IP des Load Balancers.

Wenn die externe IP innerhalb des Kubernetes-Clusters benötigt wird, muss das sogenannte Proxy-Protokoll aktiviert werden.

{{% alert title="Warning" color="warning" %}}
Wenn das Proxy-Protokoll aktiviert ist, kann der Ingress nicht mehr aus dem Cluster heraus erreicht werden!
{{% /alert %}}

### Beispiel NGINX Ingress Controller
Die folgenden Zeilen müssen in die ConfigMap des Ingress-Controllers eingefügt werden:

```yaml
use-proxy-protocol: "true"
use-forwarded-headers: "true"
```

Darüber hinaus muss dem zugehörigen Load Balancer Service für den NGINX Ingress Controller eine Annotation hinzugefügt werden:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    loadbalancer.openstack.org/proxy-protocol: "true"
```

Jetzt können Anwendungen innerhalb des Kubernetes-Clusters die externe IP-Adresse von externen Webanfragen anzeigen.
