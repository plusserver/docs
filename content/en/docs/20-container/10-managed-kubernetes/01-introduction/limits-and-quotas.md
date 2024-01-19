---
title: "Limits"
linkTitle: "Limits"
weight: 20
date: 2024-01-19
---
In this tabular list you will find important information about limits in Kubernetes and Compute Quotas, the latter can be increased via a support ticket.

Resources marked with an * are theoretical limits in Kubernetes. We recommend not exceeding the limits with one deployment and instead implement the deployment across multiple clusters.

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
| Max. Volumes	| 128 |

### Cilium (CNI)

| Resource | Limit |
| --- | --- |
| Identities | 64.000 |

All endpoints (Pods, Services, etc.) which are managed by Cilium will be assigned an identity.

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