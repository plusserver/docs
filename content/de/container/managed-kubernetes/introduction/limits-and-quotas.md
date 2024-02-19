---
title: "Limits"
linkTitle: "Limits"
type: "docs"
weight: 20
date: 2024-01-19
---
In dieser tabellarischen Auflistung finden Sie wichtige Informationen zu Limits in Kubernetes und Compute Quotas, letztere können über ein Support-Ticket erhöht werden.

Ressourcen, die mit einem * gekennzeichnet sind, sind theoretische Limits in Kubernetes. Wir empfehlen, die Limits nicht mit einem Deployment zu überschreiten und stattdessen das Deployment über mehrere Cluster zu implementieren.

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

Allen Endpunkten (Pods, Services usw.), die von Cilium verwaltet werden, wird eine Identität zugewiesen.

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