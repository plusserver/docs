---
title: "PSKE - Cluster hibernation"
linkTitle: "Cluster hibernation"
type: "docs"
weight: 20
date: 2023-02-21
---

The hibernation feature allows you to put one or more PSKE clusters into hibernation mode automatically or with the push of a button to save money on cloud resources that are not needed 24/7.

Example: Test or Development PSKE clusters that are only operated during regular working hours.

## Hibernation

By using the "Hibernation" feature, the following PSKE cluster components are shut down:

- Workload
- Worker Nodes of the PSKE Cluster
- Control Plane (kube-apiserver, etcd, kube-scheduler, kube-controller-manager, cloud-controller-manager)

Exceptions are floating IP addresses, load balancers, and persistent volumes, which are still charged.

Because the control plane data is stored persistently and we continue to reserve compute resources for the cluster, the cluster hour is still billed.

## Wake-up

When waking up, the PSKE cluster and its components, including floating IP addresses, load balancers, and persistent volumes, are restored to their previous state and can be used as usual.

## Hibernation configuration

### 1. In the PSKE Dashboard

### 1.1 Manually via YAML Cluster Manifest

If you want to manually put your PSKE cluster into "hibernated" mode using the YAML Cluster Manifest, you can configure it under the "spec" section.

```yaml
spec:
  hibernation:
    enabled: true
    schedules:
      - start: "00 20 * * *"     # Start hibernation every day at 8 PM
        end: "0 6 * * *"         # Stop hibernation every day at 6 AM
        location: "Europe/Berlin"  # Specify a location for the cron to run in
```

The start and end points follow the familiar Cron syntax from the Crontab in the Unix/Linux world.

### 1.2 Manually at the touch of a button

If you want to put your PSKE cluster into hibernation mode manually, you can select the corresponding PSKE cluster under Clusters (1) and select the option "Hibernate Cluster" (3) via the three dots (2).

![1](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/1.png)

![2](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/2.png)

### 1.3 Automated via Hibernation Schedule

If you want to automate the process of putting your PSKE cluster into hibernation mode, you can use the Hibernation Schedule and configure the start and end points and the day of the week separately for each PSKE cluster.

#### New PSKE Cluster

![3](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/3.png)

You can configure one or more Hibernation Schedule tasks. To do this, create a new PSKE cluster under (1) and scroll to the end of the page. Configure the days of the week, start and end points (2). You can also leave the end point (Wake up at) empty. Then you can create additional Hibernation Schedule Tasks (3) and finish creating the PSKE cluster by clicking Create (4).

#### Existing PSKE Cluster

Select the relevant PSKE cluster under (1) and click on the name (2) to access the Hibernation (3) section.

![4](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/4.png)

![5](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/5.png)

Configure the days of the week, start and end points (1). You can also leave the end point (Wake up at) empty. Then you can create additional Hibernation Schedule Tasks (2) and finish creating the hibernation schedule for your selected PSKE cluster by clicking Save (3).

![6](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/6.png)