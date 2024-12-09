---
title: "HC - Provisionierung"
linkTitle: "HC - Provisionierung"
type: "docs"
weight: 20
date: 2023-02-21
description: >
  
---

Mit dem HybridConnector können Sie Ihre bestehenden, bei plusserver gehosteten Umgebungen mit Ihrem Kubernetes-Cluster vernetzen.

## Provisionierung/Deprovisionierung des HybridConnectors

Eröffnen Sie dazu ein Ticket mit den folgenden Informationen:

1. Name des Kubernetes-Clusters
   - Sie finden diesen im Gardener Dashboard unter Clusters.

2. Name der existierenden Umgebung
   - Domain-Name
   - Diesen finden Sie im Gardener Dashboard unter Secrets.

3. Name des Pächters
   - Diesen finden Sie im Gardener Dashboard unter Secrets.

{{< img src="1.png" alt="" >}}

{{% alert title="Warning" color="warning" %}}
Bitte beachten Sie: Es muss sichergestellt werden, dass es keine Netzwerkkonflikte zwischen Ihrer bestehenden Umgebung und dem Kubernetes-Cluster gibt. Zudem kann der HC nicht in Clustern bereitgestellt werden, die die gleiche Node-Network-CIDR haben.

Weitere Informationen:
[Cluster Networking](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/clusterconfiguration/cluster-network/)
{{% /alert %}}
