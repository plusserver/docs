---
title: "PSKE - Cluster DNS (CoreDNS)"
linkTitle: "Cluster DNS"
weight: 20
date: 2023-07-12
---

By default, CoreDNS scales up to a maximum of 5 replicas. This can become a problem in larger clusters as they may not be able to handle the high volume of requests.

In Gardener, there are two options to define the scaling behavior:

1. Horizontal: This mode sets a minimum of 2 replicas and a maximum of 5 replicas for CoreDNS.

2. Cluster-proportional: This mode sets a minimum of 2 replicas and adds an additional replica for every 16 nodes in the cluster.

The default setting in the clusters is "horizontal."

Switching between the scaling modes is straightforward:

1. Select the desired cluster.
2. Instead of choosing "Overview" in the top tab, select "YAML."
3. Adjust the YAML configuration accordingly.

Here are examples of the YAML configurations for each scaling mode:

### Example: Horizontal

```yaml
systemComponents:
  coreDNS:
    autoscaling:
      mode: horizontal
```

### Example: Cluster-proportional

```yaml
systemComponents:
  coreDNS:
    autoscaling:
      mode: cluster-proportional
```

Simply make the appropriate changes to the YAML configuration, save it, and the scaling behavior of CoreDNS will be updated accordingly in the Gardener cluster.