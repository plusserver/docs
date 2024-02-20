---
title: "PSKE - Cluster deprovisionierung"
linkTitle: "Cluster deprovisionierung
type: "docs"
weight: 30
date: 2023-02-21
---

## Deprovisionierung eines Kubernetes-Clusters

Um einen Kubernetes-Cluster zu löschen, navigieren Sie zu der Option "CLUSTERS" in der linken Menüleiste (1). Anschließend können Sie die Löschung des Kubernetes-Clusters durch Klicken auf die drei Punkte (2) (3) einleiten.

![11](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/11.png)

Bestätigen Sie das Löschen des Kubernetes-Clusters anhand seines Namens (1), und wählen Sie dann "Löschen" (2).

![12](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/12.png)

Der Kubernetes-Cluster wird nun gelöscht. Sie können den Löschstatus (1) überprüfen, um weitere Informationen zu erhalten (2). Alle Ressourcen werden entfernt, einschließlich der Controlplane Nodes, Worker Nodes, PersistentVolumes, Load Balancer und Floating IPs.

![13](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/13.png)

## Deprovisionierung von HybridConnector und Löschen des Kubernetes-Clusters**

Bevor der Cluster über "Delete Cluster" (2) gelöscht werden kann, müssen Sie ein Ticket mit folgenden Informationen eröffnen:

- Vertragsnummer für pluscloud open
- Name des Kubernetes-Clusters
- Name der bestehenden Umgebung

![14](/images/content/02-pske/10-clusterinteraction/cluster-deprovisioning/14.png)

Das Löschen des Clusters ohne vorherige Deprovisionierung des HybridConnectors führt zu folgender Fehlermeldung, und der Kubernetes-Cluster kann nicht gelöscht werden.

`{{< alert color="warning" title="Warning">}}
task "Waiting until shoot infrastructure has been destroyed" failed: Failed to delete Infrastructure shoot--sknop--demo-cluster/demo-cluster: Error deleting infrastructure: Terraform execution for command 'destroy' could not be completed:

- Error deleting openstack_networking_router_v2 <omitted>: Expected HTTP response code [] when accessing [DELETE https://intern1.api.pco.get-cloud.io:9696/v2.0/routers/<omitted>], but got 409 instead
{"NeutronError": {"type": "RouterInUse", "message": "Router <omitted> still has ports", "detail": ""}}
{{< /alert >}}`