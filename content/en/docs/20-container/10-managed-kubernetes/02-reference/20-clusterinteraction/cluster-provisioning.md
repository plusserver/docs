---
title: "PSKE - Cluster provisioning"
linkTitle: "Cluster provisioning"
weight: 10
date: 2023-02-21
---
In the menu "Clusters" (1), select the plus sign (2) for "Kubernetes Clusters". The cluster creation form appears.

![1](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/1.png)

In "Infrastructure" (1), our pluscloud open is already selected for you. In the next step, you provide details about the cluster, such as the cluster name, Kubernetes version, and purpose of the cluster to be created. You have the option to choose the predefined cluster name (random), but you can also choose your own, more descriptive name:

![2](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/2.png)

Optional "YAML" (3): Here you can define the IP networks of the worker nodes, which must not overlap with the IP networks 10.20.0.0/16, 10.64.0.0/12, 10.80.0.0/12, 192.168.123.0/24. This selection can be important if you later want to connect your Kubernetes cluster to an existing environment via the HybridConnector.

```yaml
spec:
  provider:
    type: openstack
    infrastructureConfig:
      networks:
        workers: 10.250.0.0/16
  networking:
    nodes: 10.250.0.0/16
```

In the "Worker" section, you can select how your worker nodes should be sized and how many you want to create. The master/control plane nodes are not configurable for you. These are managed by Gardener.

The following example creates two worker nodes with the flavor "SCS-4V:8:100" (4 vCPUs, 8 GB RAM, 100 GB local storage). Ubuntu 20.04 is used as the operating system and containerd as the container runtime.

![3](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/3.png)

In the "Maintenance" section, you can select when your cluster should be checked for updates to the worker operating system and Kubernetes version, and if necessary updated. You can use the "Auto Update" option to control whether updates are applied automatically.

The last section, "Hibernation", defines when your cluster will be automatically shut down and worker node resources removed at certain times. This is to minimize costs with the respective cloud provider and is especially useful if you have a development cluster that does not need to be permanently active. Here you can specify one or more time windows.

The cluster is created with a final click on "Create".