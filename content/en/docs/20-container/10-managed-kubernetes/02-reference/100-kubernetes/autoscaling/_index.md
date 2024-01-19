---
title: "Autoscaling"
linkTitle: "Autoscaling"
weight: 20
date: 2023-02-21
description: >
  
---

## Forms of Kubernetes Autoscaling

Autoscaling is a method for automatically scaling Kubernetes (K8s) workloads up or down based on resource usage/expectations. Autoscaling in Kubernetes has three dimensions:

{{< alert >}}
***Horizontal Pod Autoscaler (HPA)***: Adjusts the number of replicas of a pod.

***Cluster Autoscaler***: Adjusts the number of nodes in a cluster.

***Vertical Pod Autoscaler (VPA)***: Adjusts the resource requests and limits of a container.
{{< /alert >}}

The different autoscalers operate at one of two Kubernetes levels

**Pod Level**: The HPA and VPA methods occur at the pod level. Both HPA and VPA scale the available resources or instances of the pod, both up and down.

**Cluster Level**: The Cluster Autoscaler operates at the cluster level and scales the number of nodes within your cluster up or down.

{{< alert color="warning" title="Warning">}}
Simultaneous Use of VPA and HPA
HPA and VPA can conflict with each other, for instance, when using RAM as the base metric for scaling in both cases. This can lead to both attempting to scale workloads vertically and horizontally simultaneously, resulting in unpredictable consequences. To avoid such conflicts, it is best practice for HPA and VPA to focus on different metrics.


Typically, VPA is configured to scale based on CPU or RAM, and custom metrics are used for HPA.
{{< /alert >}}