---
title: "Kyverno im PSKE-Cluster mit hibernation verwenden"
linkTitle: "Kyverno im PSKE-Cluster mit hibernation verwenden"
type: "docs"
weight: 20
date: 2023-02-21
---


When a Gardener cluster is hibernated, all control plane components (API server, controller manager, etc.) and worker nodes are shut down. Upon wake-up, the control plane is reactivated, and nodes are recreated. Kubernetes then tries to restore workloads (pods, controllers, etc.) based on the persisted resources in etcd.

However, Kyverno, being a policy engine that mutates, validates, and generates resources, introduces webhooks that intercept all pod (and other resource) operations. If these webhooks are unavailable or misconfigured when the cluster wakes up, API requests to create/delete pods can hang or fail.


## Kyverno Webhooks Blocking API Requests
Kyverno installs ValidatingWebhookConfiguration and MutatingWebhookConfiguration resources.
When Kyverno pods are not ready yet (still Pending or CrashLooping after wake-up), the API server still tries to call these webhooks for every resource creation/deletion.
Since Kyverno isn’t responding, those operations get stuck or fail with timeouts, effectively blocking the control plane.

How to Verify It’s the Cause:

```
kubectl get validatingwebhookconfigurations
kubectl get pods -n kyverno
```

If pods in kyverno namespace are Pending or CrashLooping, and you see pod creations hanging in other namespaces, that’s your smoking gun.


## Namespace / Pod Scheduling Dependencies
After hibernation, some cluster nodes or namespaces may not exist yet.
If Kyverno runs with node selectors, taints, or affinity rules, it may fail to schedule when the cluster wakes up.
Without Kyverno pods ready, all webhooks fail and no pods can start.


## Webhook Configuration Missing Fail-Open
By default, Kyverno’s webhooks are usually set to fail-closed (i.e. if Kyverno can’t respond, the request is denied).
In hibernation scenarios, this causes a bootstrap deadlock and no Kyverno pod can start because Kyverno itself blocks pod creation.


## Gardener Reconciliation and Kyverno Generate Policies
If you have Kyverno generate policies that auto-create ConfigMaps, Roles, or other resources, those may fail during hibernation wake-up because of missing dependencies, further delaying recovery.



# How to Fix or Work Around It
## Set Kyverno Webhooks to Fail-Open

This is the most direct fix.
Edit your Kyverno webhook configurations:

```
kubectl patch validatingwebhookconfiguration kyverno-policy-validating-webhook-cfg \
  --type='json' -p='[{"op":"replace","path":"/webhooks/0/failurePolicy","value":"Ignore"}]'

kubectl patch mutatingwebhookconfiguration kyverno-policy-mutating-webhook-cfg \
  --type='json' -p='[{"op":"replace","path":"/webhooks/0/failurePolicy","value":"Ignore"}]'
```

This tells the API server to proceed even if Kyverno is unavailable, allowing the cluster to recover.


