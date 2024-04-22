---
title: "Horizontal Pod Autoscaler (HPA)"
linkTitle: "Horizontal Pod Autoscaler (HPA)"
type: "docs"
weight: 20
date: 2023-02-21
---

HPA (Horizontal Pod Autoscaler) is a form of automatic scaling where the number of pods in a Replication Controller, Deployment, Replica Set, or Stateful Set is adjusted based on various metrics such as RAM and CPU usage, time of day, or traffic on a load balancer. The scaling is horizontal, meaning it affects the number of instances rather than the resources assigned to an individual pod.

HPA can make scaling decisions based on custom or externally provided metrics (e.g., via Prometheus) and operates automatically after initial configuration. You only need to set the minimum and maximum number of replicas.

After configuration, the Horizontal Pod Autoscaler Controller periodically checks the metrics and scales the pods up or down accordingly. By default, HPA checks the metrics every 15 seconds.

To monitor metrics, HPA relies on another Kubernetes resource called the Metrics Server. The Metrics Server provides standard resource usage metrics by collecting data from "kubernetes.summary_api," such as CPU and memory usage for nodes and pods. It can also access custom metrics (collected from an external source), such as the number of active sessions on a load balancer or backend load.

This ensures that an application remains available and can perform its function even under load. It also ensures that an application doesn't run more replicas than currently needed, optimizing resource usage and "costs in both directions." However, scaling is limited by the cluster's available computing power, as costs in most setups (worker nodes) tend to be static and only automatically scale in rare cases.

## How Does HPA Work?

HPA regularly queries the Kubernetes API for a pod's resource usage and adjusts the number of replicas as needed to achieve a target level of resource utilization.

In detail, the process works as follows:

1. HPA monitors the specified metrics in the configuration (typically every 15 seconds).
2. Based on the collected metrics, HPA calculates the desired number of replicas required.
3. HPA scales the pod up or down to the desired number of replicas if necessary.
4. Since the HPA is constantly monitoring, the process is repeated from step 1.

For more details on the algorithm, you can refer to this link: [Details of the used algorithm](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

## Limitations of the Horizontal Pod Autoscaler

While HPA is a powerful tool, it's not ideal for every use case and may not solve every problem related to cluster resources. Here are some considerations:

- HPA works only with stateless applications capable of replication or Stateful Sets that allow for persistence.
- HPA doesn't work with Daemon Sets.
- If the limits for pod metrics are not set efficiently, pods may be terminated frequently or resources may be wasted.
- HPA cannot be used in conjunction with VPA (Vertical Pod Autoscaler) based on the same metrics.
- HPA cannot scale if the total cluster capacity is exhausted until new nodes are added to the cluster.

## How to Use HPA?

To use HPA, you need to create a Kubernetes resource of the type HorizontalPodAutoscaler. In this resource, you specify the deployment or Replica Controller to scale, the minimum and maximum number of replicas, and the target resource utilization or custom metrics.

Here's an example configuration for HPA scaling based on Kubernetes metrics:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: my-deployment-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 80
```

In this configuration, the minimum number of replicas is set to 1, the maximum is set to 10, and it aims for a CPU utilization of 80%. HPA automatically scales the number of replicas of the "my-deployment" based on the CPU utilization of the pods.

If you want HPA to operate based on custom metrics, it needs to access metrics from a Prometheus endpoint. You can configure Prometheus to scrape metrics from the pods or use a Kubernetes service that exports metrics in Prometheus format. Once the metrics are available in Prometheus, you can use a Prometheus Adapter to configure HPA to use those metrics.

Here's an example configuration for HPA scaling based on a custom metric:

```yaml
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: my-deployment-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Pods
    pods:
      metricName: custom_metric
      targetAverageValue: 100
```

## Testing
There are several ways to test the Kubernetes Horizontal Pod Autoscaler (HPA), including using Prometheus metrics as a basis.

1. Using a load testing tool:
   One way to test the HPA is to use a load testing tool like Apache JMeter or Gatling to generate load on an application. You can observe how the HPA responds by increasing or decreasing the number of replicas based on pod resource usage.

2. Using the Kubernetes "kubectl" Command:
   You can use "kubectl" to manually increase or decrease the number of pod replicas and observe how the HPA reacts. For example, you can use "kubectl scale" to increase the number of replicas of a deployment or Replica Controller.

3. Simulating High Load Using Prometheus:
   If you use HPA with Prometheus metrics, you can artificially increase this metric. By using Prometheus itself to simulate high load, you can create or modify a metric that rapidly increases or decreases. Then, you can observe how the HPA responds to the change.

## Simultaneous Use of HPA and VPA
HPA and VPA can conflict with each other, for example, if you use RAM as the base metric for scaling in both. This can lead to both attempting to scale workloads vertically and horizontally at the same time, with unpredictable results. To avoid such conflicts, it is best practice for HPA and VPA to focus on different metrics.

Typically, VPA is configured to scale based on CPU or RAM, and custom metrics are used for HPA.

## Monitoring
Once the HPA is set up, you can monitor it through the Kubernetes API or using monitoring tools like Prometheus, Grafana, or Kubernetes Dashboard. You should observe how the HPA responds to changes in the number of replicas under load, adjusting pods, and ensure that the number of replicas is within the desired range.

It's essential to note that the HPA uses a control loop to ensure that the replicas reach the desired count. Therefore, it may take some time for the HPA to respond to load changes.

Additionally, it's recommended to test the HPA in a staging environment rather than a production environment, as it can lead to unexpected behavior that may impact application availability.