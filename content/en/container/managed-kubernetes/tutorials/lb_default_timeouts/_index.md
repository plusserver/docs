---
title: "Loadbalancer Default Timeouts"
linkTitle: "Loadbalancer Default Timeouts"
type: "docs"
weight: 21
date: 2025-07-09
---

## Adjusting Loadbalancer Default Timeouts

The default timeout for OpenStack LoadBalancers is 30 seconds and can be adjusted using the following annotations:

```yaml
metadata:
    annotations:
        loadbalancer.openstack.org/timeout-client-data: "70000"
        loadbalancer.openstack.org/timeout-member-data: "70000"
```

Explanation of the parameters:
- timeout-client-data: Defines how long the LoadBalancer waits for data from the client (in milliseconds).
- timeout-member-data: Defines how long the LoadBalancer waits for data from the backend (member) (also in milliseconds).

Further configuration options can be found in the official documentation at this [link](https://github.com/kubernetes/cloud-provider-openstack/blob/master/docs/openstack-cloud-controller-manager/expose-applications-using-loadbalancer-type-service.md#service-annotations).
