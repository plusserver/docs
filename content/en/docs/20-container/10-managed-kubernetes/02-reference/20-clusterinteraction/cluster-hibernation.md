---
title: "PSKE - Cluster hibernation"
linkTitle: "Cluster hibernation"
weight: 20
date: 2023-02-21
---

The "Hibernation" feature provides you with the option to automatically or with the push of a button, put one or more PSKE clusters into "hibernated" mode to save costs on cloud resources that are not needed 24/7.

Example: Test or Development PSKE clusters that are only operated during regular working hours.

## Hibernation

By using the "Hibernation" feature, the following PSKE cluster components are shut down:

- Workload
- Worker Nodes of the PSKE Cluster
- Control Plane (kube-apiserver, etcd, kube-scheduler, kube-controller-manager, cloud-controller-manager)

Exceptions to this are Floating IP addresses, Load Balancers, and Persistent Volumes, which continue to incur charges.

Since the Control Plane data is persistently stored, and we continue to reserve compute resources for the cluster, the cluster hour is still billed.

## Wake-Up

When "waking up," the PSKE cluster and its components, including Floating IP addresses, Load Balancers, and Persistent Volumes, are restored to their previous state and can be used as usual.

## Hibernation Configuration

### (1) In the PSKE Dashboard

### (1.1) Manually via YAML Cluster Manifest

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

### (1.2) Manually via Button Press

If you want to put your PSKE cluster into "hibernated" mode manually, you can select the corresponding PSKE cluster under Clusters (1) and choose the "Hibernate Cluster" (3) option via the three dots (2).

![1](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/1.png)

![2](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/2.png)

### (1.3) Automated via Hibernation Schedule

If you want to automate putting your PSKE cluster into "hibernated" mode, you can use the Hibernation Schedule and configure the start and end points as well as the day of the week separately for each PSKE cluster.

#### New PSKE Cluster

![3](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/3.png)

You can configure one or more Hibernation Schedule tasks. To do this, create a new PSKE cluster under (1) and scroll to the end of the page. Configure the days of the week, start and end points, and even without a start point (Wake up at) via (2). You can also create additional Hibernation Schedule tasks (3) and complete the PSKE cluster creation with (4).

#### Existing PSKE Cluster

Select the relevant PSKE cluster under (1) and click on the name (2) to access the Hibernation (3) section.

![4](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/4.png)

![5](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/5.png)

You can configure the days of the week, start and end points, and even without a start point (Wake up at) via (1). You can also create additional Hibernation Schedule tasks (2) and save the creation of Hibernation Schedule tasks for the selected PSKE cluster with (3).

![6](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/6.png)