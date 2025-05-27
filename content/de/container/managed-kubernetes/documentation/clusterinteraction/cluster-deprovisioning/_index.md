---
title: "PSKE - Cluster-Deprovisionierung"
linkTitle: "Cluster-Deprovisionierung"
type: "docs"
weight: 30
date: 2023-02-21
---

## Deprovisionierung eines Kubernetes-Clusters

{{< img src="1.png" alt="" >}}

Um einen Kubernetes-Cluster zu löschen, navigieren Sie zu der Option "CLUSTERS" in der linken Menüleiste (1). Anschließend können Sie die Löschung des Kubernetes-Clusters durch Klicken auf die drei Punkte (2) (3) einleiten.

{{< img src="2.png" alt="" >}}

Bestätigen Sie das Löschen des Kubernetes-Clusters mit der Eingabe (2) seines Namens (1), und wählen Sie dann "Löschen" (3).

Der Kubernetes-Cluster wird nun gelöscht. Sie können den Löschstatus (1) überprüfen, um weitere Informationen zu erhalten (2). Alle Ressourcen werden entfernt, einschließlich der Controlplane Nodes, Worker Nodes, PersistentVolumes, Load Balancer und Floating IPs.

{{< img src="3.png" alt="" >}}

## Deprovisionierung des HybridConnectors und Löschen des Kubernetes-Clusters

Bevor der Cluster über “Delete Cluster” (2) gelöscht werden kann, muss zunächst der HybridConnector deprovisioniert werden. Dazu eröffnen Sie einfach ein Ticket mit folgenden Informationen:

- Vertragsnummer für pluscloud open
- Name des Kubernetes-Clusters
- Name der bestehenden Umgebung

{{< img src="4.png" alt="" >}}

Das Löschen des Clusters ohne vorherige Deprovisionierung des HybridConnectors führt zu folgender Fehlermeldung, und der Kubernetes-Cluster kann nicht gelöscht werden.

`{{< alert color="warning" title="Warning">}}
task "Waiting until shoot infrastructure has been destroyed" failed: Failed to delete Infrastructure shoot--sknop--demo-cluster/demo-cluster: Error deleting infrastructure: Terraform execution for command 'destroy' could not be completed:

- Error deleting openstack_networking_router_v2 <omitted>: Expected HTTP response code [] when accessing [DELETE https://intern1.api.pco.get-cloud.io:9696/v2.0/routers/<omitted>], but got 409 instead
{"NeutronError": {"type": "RouterInUse", "message": "Router <omitted> still has ports", "detail": ""}}
{{< /alert >}}`