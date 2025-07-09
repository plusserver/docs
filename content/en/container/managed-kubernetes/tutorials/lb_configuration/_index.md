---
title: "Configuring the load balancer"
linkTitle: "Configuring the load balancer"
type: "docs"
weight: 5
date: 2025-07-09
---

## Configuring the load balancer

The load balancer can be deployed with the following configuration options:

Configuration options:

- keep-floatingip: true | false 
  - Reserves the floating IP address in OpenStack.

- proxy-protocol: true | false 
  - Enables or disables support for the proxy protocol.

- openstack-internal-load-balancer: true | false
  - Creates an internal load balancer in OpenStack without assigning a floating IP.

- loadBalancerIP: 10.250.0.2
  - Specifies the IP address of the load balancer.
  - If the annotation openstack-internal-load-balancer has been set, any free IP address from the node network (default 10.250.0.0/16) of the respective PSKE cluster can be used.

For an internal load balancer (openstack-internal-load-balancer: true), the private IPv4 address within the cluster network is defined here. Alternatively, a previously reserved floating IP can be used here if openstack-internal-load-balancer is set to false.


```yaml
  service:
    annotations:
      loadbalancer.openstack.org/proxy-protocol: "false"
      loadbalancer.openstack.org/keep-floatingip: "false"
      service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
      loadbalancer.openstack.org/loadBalancerIP: 10.250.0.2
```
