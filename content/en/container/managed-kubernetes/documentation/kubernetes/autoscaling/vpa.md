---
title: "Vertical Pod Autoscaler (VPA)"
linkTitle: "Vertical Pod Autoscaler (VPA)"
type: "docs"
weight: 20
date: 2023-02-21
---

The Vertical Pod Autoscaler (VPA) is an extension of the Kubernetes API that provides vertical scaling for Kubernetes controllers such as Deployments and their Pods. Its operation is more complex than that of the Horizontal Pod Autoscaler (HPA) as it optimizes the resource request parameters of Pods based on metrics collected from workloads. "Requests" are declarative statements of the minimum required resources for one or more containers within a Pod. Higher values grant the planned Pod more access to CPU or RAM. If a workload is found to be consuming more resources than its specifications indicate, the VPA calculates a new set of appropriate values within its given limits.

The VPA allows two types of resources to be specified for each container within a Pod: Requests and Limits.

**Requests / Limits:**
- Requests define the minimum resources required by containers. For example, an application might require more than 256 MB of memory, but Kubernetes guarantees a minimum of 256 MB if the container's request is 256 MB.
- Limits define the maximum amount of resources that can be allocated to a specific container. The application may require a minimum of 256 MB of memory, but it is also ensured that it will not use more than 512 MB of RAM under heavy load.

### How Does VPA Work?

The VPA periodically queries the Kubernetes API for a Pod's resource utilization, and adjusts the number of replicas as needed to achieve a target resource utilization. In detail:

1. The VPA Recommender reads the VPA configuration and resource utilization metrics from the metrics server.
2. VPA Recommender provides recommendations for Pod resources to the VPA.
3. VPA Updater receives the recommendations for Pod resources.
4. VPA Updater initiates the termination of the Pod.
5. The Deployment detects that the Pod has been terminated and creates a new Pod to match its desired state.
6. While the Pod is in the recovery process, the VPA Admission Controller receives the Pod resource recommendations. As Kubernetes doesn't support dynamically changing resource limits of a running Pod, VPA cannot update existing Pods with new limits. It terminates Pods using outdated limits. When the Pod controller requests replacement from the Kubernetes API service, the VPA Admission Controller injects the updated resource requests and limits into the specification of the new Pod.
7. Finally, the VPA Admission Controller overrides the recommendations for the Pod.

**UpdateMode:**
Depending on how the VPA is configured, it can have the following modes:
- Apply recommendations directly by updating/recreating Pods (updateMode = auto).
- Store recommended values as a reference (updateMode = off).
- Apply recommended values only to newly created Pods (updateMode = initial).

### How to Use VPA?

Here is an example of how to use VPA in a YAML configuration:

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-deployment-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: my-deployment
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
        controlledResources:
          - cpu
          - memory
        maxAllowed:
          cpu: 1
          memory: 500Mi
        minAllowed:
          cpu: 100m
          memory: 50Mi
  updatePolicy:
    updateMode: "Auto"
```

### Limitations of VPA

Like HPA, VPA is a powerful tool but has some limitations and may not be ideal for every use case. It cannot solve every problem with cluster resources, and some considerations include:

- If resource limits for Pod metrics are not set efficiently, VPA may frequently terminate Pods or waste resources.
- VPA cannot be used alongside HPA based on the same metrics.
- VPA cannot scale if the cluster's total capacity is exhausted until new nodes are added.
- VPA can recommend more resources than are available in the cluster, resulting in Pods not being assigned to nodes due to insufficient resources. To work around this limitation, it's a good idea to set the LimitRange to the maximum available resources to ensure Pods don't request more resources than the LimitRange defines.

### Testing

There are several ways to test the Kubernetes Vertical Pod Autoscaler (VPA):

1. Using a Load-Testing Tool: One way to test VPA is to use a load-testing tool like Apache JMeter or Gatling to generate load on an application. You can observe how VPA responds by increasing or decreasing the number of replicas based on pod resource consumption.

2. Using the "kubectl" Command: You can manually increase or decrease the number of Pod replicas using "kubectl" and observe how VPA responds. For example, "kubectl scale" can be used to adjust the number of replicas of a Deployment or RC.

### Concurrent Use of VPA and HPA

VPA and HPA can conflict, especially when both are configured to scale based on the same resource, such as RAM. This can lead to both trying to scale workloads vertically and horizontally simultaneously, resulting in unpredictable outcomes. To avoid such conflicts, it is best practice to have HPA focus on different metrics than VPA, such as using custom metrics for HPA while VPA scales based on CPU or RAM.

### Monitoring

Once VPA is set up, you can monitor it through the Kubernetes API or using monitoring tools like Prometheus, Grafana, or Kubernetes Dashboard.