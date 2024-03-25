---
title: "PSKE - Cluster deprovisioning"
linkTitle: "Cluster deprovisioning"
type: "docs"
weight: 30
date: 2023-02-21
---

## Deprovisioning a Kubernetes Cluster

To delete a Kubernetes cluster, navigate to the "Clusters" option in the left menu bar (1). Then you can initiate the deletion of the Kubernetes cluster by clicking on the three dots (2) (3).

![11](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/11.png)

Confirm the deletion of the Kubernetes cluster by typing its name (1) and then selecting "Delete" (2).

![12](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/12.png)

The Kubernetes cluster will now be deleted. You can check the deletion status (1) to get more information (2). All resources are removed, including control plane nodes, worker nodes, persistent volumes, load balancers, and floating IPs.

![13](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/13.png)

## Deprovisioning HybridConnector and Deleting the Kubernetes Cluster**

Before a cluster can be deleted as described above, an existing HybridConnector must be deprovisioned. To do this, you must open a support ticket in your CloudHub with the following information:

- Contract number for pluscloud open
- Name of the Kubernetes cluster
- Name of the existing environment

![14](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/14.png)

Deleting the cluster without first deprovisioning the HybridConnector will result in the following error message, and the Kubernetes cluster cannot be deleted.

`{{< alert color="warning" title="Warning">}}
task "Waiting until shoot infrastructure has been destroyed" failed: Failed to delete Infrastructure shoot--sknop--demo-cluster/demo-cluster: Error deleting infrastructure: Terraform execution for command 'destroy' could not be completed:

- Error deleting openstack_networking_router_v2 <omitted>: Expected HTTP response code [] when accessing [DELETE https://intern1.api.pco.get-cloud.io:9696/v2.0/routers/<omitted>], but got 409 instead
{"NeutronError": {"type": "RouterInUse", "message": "Router <omitted> still has ports", "detail": ""}}
{{< /alert >}}`