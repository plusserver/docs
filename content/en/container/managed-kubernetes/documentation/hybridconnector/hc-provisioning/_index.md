---
title: "HC - Provisioning"
linkTitle: "HC - Provisioning"
type: "docs"
weight: 20
date: 2023-02-21
description: >
  
---

With the HybridConnector, you can network-connect your existing environments hosted at plusserver with your Kubernetes cluster.

## Provisioning/Deprovisioning the HybridConnector

Open a support ticket in your CloudHub providing the following details:

1. Name of the Kubernetes Cluster
   - You can find this in the Gardener Dashboard under Clusters.

2. Name of the existing environment
   - Domain name
   - You can find this in the Gardener Dashboard under Secrets.

3. Tenant Name
   - You can find this in the Gardener Dashboard under Secrets.

{{< img src="1.png" alt="" >}}

{{% alert title="Warning" color="warning" %}}
It's essential to ensure there are no network conflicts between your existing environment and the Kubernetes cluster(s). The HC cant be provided in clusters that have the same Node-Network-CIDR.

Read more:
[Cluster Networking](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/clusterconfiguration/cluster-network/)
{{% /alert %}}
