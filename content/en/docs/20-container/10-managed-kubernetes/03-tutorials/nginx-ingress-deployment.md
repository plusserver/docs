---
title: "Deployment of an NGINX Ingress Controller"
linkTitle: "Deployment of an NGINX Ingress Controller"
weight: 20
date: 2023-10-21
---

# General
This guide is intended to install an nginx Ingress Controller on Kubernetes.

## Provisioning
### Load kubeconfig
The first step is to load the kubeconfig for the respective cluster.

```bash
export KUBECONFIG=$path_to_kubeconfig
```

### Install nginx Ingress Controller
Now, you need to add the Helm repository or update it if it's already added.

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && helm repo update
```

Next, you need to create a `values.yaml` file with the following key/value pairs:

```yaml
rbac:
  create: true

controller:
  publishService:
    enabled: true
  # Octavia config
  config:
    use-forwarded-headers: "true"
    compute-full-forwarded-for: "true"
    use-proxy-protocol: "true"
  service:
    annotations:
      loadbalancer.openstack.org/proxy-protocol: "true"
      #loadbalancer.openstack.org/keep-floatingip: "true" # Reserve the FloatingIP in OpenStack even after deleting the Helm chart
      #service.beta.kubernetes.io/openstack-internal-load-balancer: "true" # Create a LoadBalancer in OpenStack without FloatingIP
    #loadBalancerIP: <FloatingIP> # Here you can define an already reserved FloatingIP. When "openstack-internal-load-balancer" is true, this will define the private IPv4 address of the OpenStack LoadBalancer.
```

### Load Balancer with Private IP Address
You can use any available IP address from the node (1) network 10.250.0.0/16 of the respective PSKE cluster.

Now, install the nginx Ingress Controller using Helm and the key/value pairs from the `values.yaml`:

```bash
helm install ingress-nginx ingress-nginx/ingress-nginx \
-f values.yaml \
--version 3.34.0 \
--create-namespace \
--namespace ingress-nginx
```

Now, you can perform IP whitelisting in an Ingress Resource. To do that, add the following annotation to the Ingress Resource:

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  annotations:
    nginx.ingress.kubernetes.io/whitelist-source-range: "217.235.33.56/32,79.207.189.32/32"
```

### Release Reserved FloatingIP
The best way to release a reserved FloatingIP is to set "loadbalancer.openstack.org/keep-floatingip" to "false" in the Helm chart.

```bash
helm upgrade ingress-nginx ingress-nginx/ingress-nginx \
--reuse-values \
--version 3.34.0 \
--namespace ingress-nginx \
--set controller.service.annotations.'loadbalancer\.openstack\.org/keep-floatingip'=false
```

Afterwards, you can delete the Helm chart:

```bash
helm uninstall ingress-nginx \
--namespace ingress-nginx
```