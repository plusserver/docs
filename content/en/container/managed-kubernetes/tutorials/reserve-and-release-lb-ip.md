
---
title: "Reservation and release of LoadBalancer IPs"
linkTitle: "Reservation and release of LoadBalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---
Reverting floating IP addresses of LoadBalancers is useful if they should not change.
This is realised by annotations in the service manifest and thus the load balancer is configured.

## Reservation of FloatingIPs

An annotation must be added to the service for the initial reservation of a FloatingIP.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserves the FloatingIP in OpenStack
```

## Further use of a FloatingIP

To use an already reserved floating IP, this must also be given to the new service.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "true" # Reserves the FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> #  The corresponding FloatingIP is specified here
spec:
    loadBalancerIP: <FloatingIP> #  The corresponding floating IP is specified here
```

## Release of FloatingIPs

The annotation loadbalancer.openstack.org/keep-floatingip: must be set to false. The service can then be deleted.

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/keep-floatingip: "false" # Releases the FloatingIP in OpenStack
        loadbalancer.openstack.org/load-balancer-address: <FloatingIP> #  The corresponding FloatingIP is specified here
spec:
    loadBalancerIP: <FloatingIP> #  The corresponding floating IP is specified here
```

## Release of FloatingIPs which are no longer known

A ticket must currently be opened for this by e-mail or our hotline.
We will then check which IPs are actually still in use and which are no longer in use.