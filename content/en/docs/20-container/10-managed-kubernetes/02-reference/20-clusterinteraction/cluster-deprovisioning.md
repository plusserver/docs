---
title: "PSKE - Cluster deprovisioning"
linkTitle: "Cluster deprovisioning"
weight: 30
date: 2023-02-21
---

## Deprovisioning a Kubernetes Cluster

To delete a Kubernetes cluster, navigate to the "CLUSTERS" option in the left menu bar (1). Then, you can initiate the deletion of the Kubernetes cluster by clicking the three dots (2) (3).

![11](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/11.png)

Confirm the deletion of the Kubernetes cluster by its name (1), and then select "Delete" (2).

![12](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/12.png)

The Kubernetes cluster will now be deleted. You can check the deletion status (1) to get more information (2). All resources will be removed, including the Controlplane Nodes, Worker Nodes, PersistentVolumes, Load balancers, and Floating IPs.

![13](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/13.png)

## Deprovisioning HybridConnector and Deleting the Kubernetes Cluster**

Before the cluster can be deleted using "Delete Cluster" (2), you need to open a ticket with the following information:

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