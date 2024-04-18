---
title: "Limits"
linkTitle: "Limits"
type: "docs"
weight: 20
date: 2024-01-19
---
These tables provide important information about limits in Kubernetes and compute quotas, the latter of which can be increased via a support ticket.

Resources marked with * are theoretical limits in Kubernetes. We recommend that you do not exceed the limits in a single deployment, and instead deploy across multiple clusters.

### Cluster

| Resource | Limit |
| --- | --- |
| Nodes* | 5.000 |
| Pods* | 110.000 |
| Containers* | 300.000 |

### Node
| Resource | Limit |
| --- | --- |
| Pods*	| 110 |
| Max. Volumes | 128 |

### Cilium (CNI)

| Resource | Limit |
| --- | --- |
| Identities | 64.000 |

An identity is assigned to all endpoints (Pods, Services, etc.) managed by Cilium.

### Compute Quotas
| Resource | Limit |
| --- | --- |
| Cores | 256 |
| RAM | 512 GB |
| Floating IPs | 10 |
| Instances | 500 |
| Max. Volumes | 1000 |
| Max. Volume Size | 4000 GB |
| Max. Volume Snapshots | 99 | 