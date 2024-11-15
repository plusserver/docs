
---
title: "Reservation and release of Loadbalancer IPs"
linkTitle: "Reservation and release of Loadbalancer IPs"
type: "docs"
weight: 20
date: 2023-04-17
---

Reserve floating IP addresses for the Loadbalancer is useful if you do not want them to change.
This is realized through annotations in the service manifest, which is used to configure the load balancer.

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

If you don't know which floating IPs you are currently using, you may open a support ticket in your customer panel.
