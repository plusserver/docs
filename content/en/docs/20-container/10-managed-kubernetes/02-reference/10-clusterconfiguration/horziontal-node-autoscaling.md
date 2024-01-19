---
title: "PSKE - Cluster Autoscaling"
linkTitle: "Cluster Autoscaling"
weight: 20
date: 2023-02-21
---

# Cluster Autoscaler (Horizontal Node Autoscaler - HNA)

The Cluster Autoscaler, also known as the Horizontal Node Autoscaler (HNA), is a tool that automatically adjusts the number of worker nodes in a Kubernetes cluster under the following conditions:

- There are pods that cannot start due to insufficient resources.
- There are worker nodes that have been underutilized for a specific period (default: 30 minutes), and pods can be distributed to other worker nodes.

## Prerequisites

To install the Horizontal Node Autoscaler in a Shoot Cluster, the "Autoscaler Min." and "Autoscaler Max." values must be defined in at least one worker group.

- "Autoscaler Min." defines the minimum number of worker nodes within the worker group.
- "Autoscaler Max." defines the maximum number of worker nodes that the Horizontal Node Autoscaler will provide in the event of resource shortages within a worker group.

![HNA](/images/content/02-pske/30-clusterconfiguration/hna.png)

## Simulation

Currently, the Shoot Cluster has one worker node:

```bash
kubectl describe node shoot--ldtivqit95-worker-jh07p-z1-7d897-cgrw6
Capacity:
  cpu:                2
  ephemeral-storage:  50633164Ki
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             4030532Ki
  pods:               110
Allocatable:
  cpu:                1920m
  ephemeral-storage:  49255941901
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             2879556Ki
  pods:               110
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests      Limits
  --------           --------      ------
  cpu                1047m (54%)   0 (0%)
  memory             1120Mi (39%)  18788Mi (668%)
  ephemeral-storage  0 (0%)        0 (0%)
  hugepages-1Gi      0 (0%)        0 (0%)
  hugepages-2Mi      0 (0%)        0 (0%)
```

An NGINX Deployment is created:

```yaml
kubectl apply -f deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "2048Mi"
          #   cpu: "500m"
          limits:
            memory: "2048Mi"
            # cpu: "500m"
```

The existing worker node's resources are insufficient, triggering the cluster-autoscaler (Horizontal Node Autoscaler):

```bash
k describe pod nginx-54c7fd947f-b2k67
Events:
  Type     Reason            Age   From                Message
  ----     ------            ----  ----                -------
  Warning  FailedScheduling  37s   default-scheduler   0/1 nodes are available: 1 Insufficient memory. preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod.
  Normal   TriggeredScaleUp  26s   cluster-autoscaler  pod triggered scale-up: [{shoot--ldtivqit95-worker-jh07p-z1 1->2 (max: 3)}]
```

After the deletion of the deployment, the additional worker node is deprovisioned by the Cluster Autoscaler (Horizontal Node Autoscaler) after 30 minutes.

## Best Practices

- Do not manually modify nodes that are part of an autoscaling group. All nodes in the same node group should have the same capacity and labels.
- Use requests for containers/pods.
- Use PodDisruptionBudgets to prevent pods from being deleted too abruptly (if needed).
- Ensure that your cloud provider's quota is sufficient before setting the min/max values for the Horizontal Node Autoscaler.
- Avoid using additional Node Group Autoscalers (even from your cloud provider).

## Conclusion

The Horizontal Node Autoscaler functions as described above. It's essential to adhere to best practices for the Cluster Autoscaler to work as intended. The HNA is enabled by default in PSKE and is available for your use.