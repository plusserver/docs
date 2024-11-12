---
title: "PSKE - Cluster-Provisionierung"
linkTitle: "Cluster-Provisionierung"
type: "docs"
weight: 10
date: 2023-02-21
---

### Via WebUI

Wählen Sie im Menü "Cluster" (1) das Pluszeichen (2) für "Kubernetes-Cluster". Das Formular zur Erstellung eines Clusters wird angezeigt.

{{< img src="1.png" alt="" >}}

Unter "Infrastruktur" ist unsere pluscloud open bereits für Sie ausgewählt. Im nächsten Schritt (1) geben Sie Details zum Cluster an, wie den Clusternamen, die Kubernetes-Version und den Zweck des zu erstellenden Clusters. Sie haben die Möglichkeit, den vordefinierten Clusternamen (zufällig) zu wählen, Sie können aber auch einen eigenen, aussagekräftigeren Namen wählen:

{{< img src="2.png" alt="" >}}

Im Abschnitt "Worker" können Sie auswählen, wie groß Ihre Worker-Knoten sein sollen und wie viele Sie erstellen möchten. Die Master-/Control-Plane-Knoten sind nicht für Sie konfigurierbar. Diese werden von Gardener verwaltet.

Das folgende Beispiel erstellt zwei Worker Nodes mit dem Flavor "SCS-4V:8:100" (4 vCPUs, 8 GB RAM, 100 GB lokaler Speicher). Als Betriebssystem wird Ubuntu 20.04 und als Container-Laufzeitsystem containerd verwendet.

{{< img src="3.png" alt="" >}}

Im Abschnitt "Wartung" können Sie auswählen, wann Ihr Cluster auf Aktualisierungen des Worker-Betriebssystems und der Kubernetes-Version geprüft und gegebenenfalls aktualisiert werden soll. Mit der Option "Auto Update" können Sie steuern, ob die Aktualisierungen automatisch durchgeführt werden sollen.

Der letzte Abschnitt, "Hibernation", legt fest, wann Ihr Cluster automatisch heruntergefahren wird und die Ressourcen der Worker-Knoten zu bestimmten Zeiten entfernt werden. Dies dient dazu, die Kosten mit dem jeweiligen Cloud-Anbieter zu minimieren und ist besonders nützlich, wenn Sie einen Entwicklungscluster haben, der nicht ständig aktiv sein muss. Hier können Sie ein oder mehrere Zeitfenster festlegen.

Mit einem abschließenden Klick auf "Erstellen" wird der Cluster erstellt.


## Via YAML

Cluster können über den YAML-Bereich in der Weboberfläche modifiziert und erstellt werden, als allgemeines Kubernetes-CRD oder von Terraform verwendet.

Hier können Sie z.B. die IP-Netze der Worker-Nodes definieren, die sich nicht mit den IP-Netzen überschneiden dürfen.

```yaml
spec:
  provider:
    type: openstack
    infrastructureConfig:
      networks:
        workers: 10.250.0.0/16
  networking:
    nodes: 10.250.0.0/16
```

**Weiterlesen:** [Shoot Spec (via Cluster YAML)](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/clusterconfiguration/cluster-yaml/)

{{% alert title=„Warning“ color=„warning“ %}}
Die folgenden Überschneidungen müssen vermieden werden:
10.20.0.0/16, 10.64.0.0/12, 10.80.0.0/12, 192.168.123.0/24

Lesen Sie mehr:
[Cluster-Vernetzung](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/clusterconfiguration/cluster-network/)

{{% /alert %}}

Diese Auswahl kann wichtig sein, wenn Sie später Ihren Kubernetes-Cluster über den HybridConnector oder einer Virtual Cloud Firewall mit einer bestehenden Umgebung verbinden wollen.

{{% alert title=„Warnung“ color=„warning“ %}}
Es ist wichtig sicherzustellen, dass es keine Netzwerkkonflikte zwischen Ihrer bestehenden Umgebung und dem Kubernetes-Cluster selbst gibt.

Lesen Sie mehr:
[HC - Provisioning](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/hybridconnector/hc-provisioning/) & 
[Cluster Networking](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/clusterconfiguration/cluster-network/)
{{% /alert %}}