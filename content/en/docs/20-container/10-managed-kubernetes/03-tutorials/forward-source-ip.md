
---
title: "Forward Source IP"
linkTitle: "Forward Source IP"
weight: 4
date: 2023-02-21
---

With the default configuration of the Ingress Controller and OpenStack load balancer, all external web requests from the Kubernetes cluster come from the internal IP of the load balancer.

If the external IP is required within the Kubernetes cluster, the so-called proxy protocol must be activated.

{{% alert title="Warning" color="warning" %}}
If the proxy protocol is activated, the Ingress can no longer be accessed from within the cluster!
{{% /alert %}}

### Example NGINX Ingress Controller
The following lines must be added to the ConfigMap of the Ingress Controller:

```yaml
use-proxy-protocol: "true"
use-forwarded-headers: "true"
```

In addition, an annotation must be added to the associated load balancer service for the NGINX Ingress Controller:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    loadbalancer.openstack.org/proxy-protocol: "true"
```

Now applications within the Kubernetes cluster can view the external IP address of external web requests.