---
title: "PSKE - Cluster provisioning"
linkTitle: "Cluster provisioning"
type: "docs"
weight: 10
date: 2023-02-21
---
Wählen Sie im Menü "Cluster" (1) das Pluszeichen (2) für "Kubernetes-Cluster". Das Formular zur Erstellung eines Clusters wird angezeigt.

![1](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/1.png)

Unter "Infrastruktur" (1) ist unsere pluscloud open bereits für Sie ausgewählt. Im nächsten Schritt geben Sie Details zum Cluster an, wie den Clusternamen, die Kubernetes-Version und den Zweck des zu erstellenden Clusters. Sie haben die Möglichkeit, den vordefinierten Clusternamen (zufällig) zu wählen, Sie können aber auch einen eigenen, aussagekräftigeren Namen wählen:

![2](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/2.png)

Optionales "YAML" (3): Hier können Sie die IP-Netze der Worker-Nodes festlegen, die sich nicht mit den IP-Netzen 10.20.0.0/16, 10.64.0.0/12, 10.80.0.0/12, 192.168.123.0/24 überschneiden dürfen. Diese Auswahl kann wichtig sein, wenn Sie später Ihren Kubernetes-Cluster über den HybridConnector mit einer bestehenden Umgebung verbinden möchten.

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

Im Abschnitt "Worker" können Sie auswählen, wie groß Ihre Worker-Knoten sein sollen und wie viele Sie erstellen möchten. Die Master-/Control-Plane-Knoten sind nicht für Sie konfigurierbar. Diese werden von Gardener verwaltet.

Das folgende Beispiel erstellt zwei Worker Nodes mit dem Flavor "SCS-4V:8:100" (4 vCPUs, 8 GB RAM, 100 GB lokaler Speicher). Als Betriebssystem wird Ubuntu 20.04 und als Container-Laufzeitsystem containerd verwendet.

![3](/images/content/02-pske/10-clusterinteraction/cluster-provisioning/3.png)

Im Abschnitt "Wartung" können Sie auswählen, wann Ihr Cluster auf Aktualisierungen des Worker-Betriebssystems und der Kubernetes-Version geprüft und gegebenenfalls aktualisiert werden soll. Mit der Option "Auto Update" können Sie steuern, ob die Aktualisierungen automatisch durchgeführt werden sollen.

Der letzte Abschnitt, "Hibernation", legt fest, wann Ihr Cluster automatisch heruntergefahren wird und die Ressourcen der Worker-Knoten zu bestimmten Zeiten entfernt werden. Dies dient dazu, die Kosten mit dem jeweiligen Cloud-Anbieter zu minimieren und ist besonders nützlich, wenn Sie einen Entwicklungscluster haben, der nicht ständig aktiv sein muss. Hier können Sie ein oder mehrere Zeitfenster festlegen.

Mit einem abschließenden Klick auf "Erstellen" wird der Cluster erstellt.