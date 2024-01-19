---
title: "PSKE - Cloud Controller Manager (CCM)"
linkTitle: "Cloud Controller Manager (CCM)"
weight: 100
date: 2023-02-21
---

# Cloud Controller Manager and Service Annotations

In every Kubernetes cluster created with PSKE, the corresponding Cloud Controller Manager (CCM) is automatically deployed, matching the Kubernetes version. For instance, in a Kubernetes cluster version 1.24.0, Cloud Controller Manager v1.24.0 is deployed. When you update a Kubernetes cluster, the Cloud Controller Manager is also updated to a supported version.

The primary responsibility of the Cloud Controller Manager is the configuration of the OpenStack LoadBalancer. This configuration is accomplished using annotations in the Service.

The following annotations are frequently used by customers:

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

You can find additional supported Service annotations in the official GitHub project [kubernetes/cloud-provider-openstack](https://github.com/kubernetes/cloud-provider-openstack). 

Please select the appropriate release of the Cloud Controller Manager according to your deployed Kubernetes version.
