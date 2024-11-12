---
title: "Hubble UI (Cilium)"
linkTitle: "Hubble UI (Cilium)"
type: "docs"
weight: 20
date: 2023-02-21
---

Wenn Sie ein Tool zur Fehlersuche oder Visualisierung der Konnektivität zwischen Pods, Diensten, Paketflüssen und deren Abhängigkeiten benötigen, kann das Tool Hubble UI zur Fehlersuche lokal im Browser über Portweiterleitung verwendet werden, sofern Cilium bereits bei der Clustererstellung als Container Network Interface (CNI) ausgewählt wurde.

## Hubble UI im Cluster aktivieren


Das bestehende Cluster-YAML-Manifest muss unter dem Abschnitt "networking:" um die Aktivierung von Hubble und die folgenden Punkte erweitert und anschließend gespeichert werden.

```Yaml
Vernetzung:
  typ: cilium
  providerConfig:
    apiVersion: cilium.networking.extensions.gardener.cloud/v1alpha1
    Art: NetworkConfig
    Hubble:
      enabled: true
    store: kubernetes
```

## Hubble UI in Ihrem Browser ausführen

Wenn Sie mit kubectl lokal mit Ihrem Cluster verbunden sind, können Sie später über Ihren Browser mittels Port-Forwarding unter der URL http://localhost:12000/ auf das Hubble UI Tool zugreifen.

```bash
$ export KUBECONFIG=./my-pske-cluster.yaml
$ kubectl port-forward -n kube-system svc/hubble-ui --Adresse 0.0.0.0 --Adresse :: 12000:80
Weiterleitung von 0.0.0.0:12000 -> 8081
Weiterleitung von [::]:12000 -> 8081
```

Sobald das Hubble UI-Tool in Ihrem Browser erscheint, können Sie Ihren bevorzugten Namensraum (1) direkt im Browser auswählen.

{{< img src="1.png" alt="" >}}

Nach der Auswahl eines Namensraums ist das Hubble UI Tool in drei verschiedene Abschnitte unterteilt:

1. Zusätzliche Filteroptionen, z. B. basierend auf IP, DNS oder Pods.
2. Visualisierung der Konnektivität zwischen Pods, Diensten, Paketflüssen und deren Abhängigkeiten.
3. Flussdetails zwischen dem Quelldienst und dem Zieldienst.

{{< img src="2.png" alt="" >}}
