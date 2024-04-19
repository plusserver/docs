
---
title: "Reservation and release of LoadBalancer IPs"
linkTitle: "Reservation and release of LoadBalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---
Reverting floating IP addresses of LoadBalancers is useful if they should not change.
This is realised by annotations in the service manifest and thus the load balancer is configured.

## Reservation of floating IPs

An annotation must be added to the service for the initial reservation of a floating IP.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserves the floating IP in OpenStack
```

## Further use of a floating IP

To use an already reserved floating IP, this must also be given to the new service.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserves the floating IP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> #  The corresponding floating IP is specified here
spec:
    loadBalancerIP: <FloatingIP> #  The corresponding floating IP is specified here
```

## Release of floating IPs

The annotation loadbalancer.openstack.org/keep-floatingip: must be set to false. The service can then be deleted.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "false" # Reserves the FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> #  The corresponding floating IP is specified here
spec:
    loadBalancerIP: <FloatingIP> #  The corresponding floating IP is specified here
```

## Release of floating IPs which are no longer known

A ticket must currently be opened for this by e-mail or our hotline.
We will then check which IPs are actually still in use and which are no longer in use.