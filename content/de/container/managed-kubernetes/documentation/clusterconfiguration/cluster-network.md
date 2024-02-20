---
title: "PSKE - Cluster Netzwerk"
linkTitle: "Cluster Netzwerk"
type: "docs"
weight: 20
date: 2023-02-21
---

# Cluster-Vernetzung

Dieses Dokument enthält netzwerkbezogene Informationen für Shoot-Cluster.

## Standardeinstellungen

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  networking:
    pods: 10.96.0.0/12
    nodes: 10.250.0.0/16
    services: 10.112.0.0/12
```

## Pod / Service Network

Ein Pod-/Service-Netzwerk ist für jede Art von Cluster-Kommunikation mit Pods, die nicht innerhalb des Host-Netzwerks des Knotens gestartet wurden, zwingend erforderlich.
Weitere Informationen über das Kubernetes-Netzwerkmodell finden Sie im Thema [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

Gardener erlaubt es Benutzern, die CIDR des Pod-Netzwerks während der Shoot-Erstellung zu konfigurieren:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  networking:
    type: <some-network-extension-name> # {calico,cilium}
    pods: 100.96.0.0/16
    nodes: ...
    services: ...
```

> :warning: Die `networking.pods` IP-Konfiguration ist unveränderbar und kann nicht nachträglich geändert werden. 
> Bitte beachten Sie den folgenden Abschnitt, um eine Konfiguration zu wählen, die Ihren Anforderungen entspricht.

Eine der Aufgaben des Netzwerk-Plugins (CNI) ist es, den im Pod-Netzwerk gestarteten Pods IP-Adressen zuzuweisen.
Verschiedene Netzwerk-Plugins verfügen über unterschiedliche Funktionen zur Verwaltung von IP-Adressen (IPAM), so dass wir keine definitiven Empfehlungen geben können, wie IP-Bereiche konfiguriert werden sollten.
Dennoch wollen wir die Standardkonfiguration skizzieren.

Die Informationen in `.spec.networking.pods` entsprechen dem [--cluster-cidr flag](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) des Kube-Controller-Managers Ihres Shoot-Clusters.
Dieser IP-Bereich wird in kleinere Subnetze, auch `podCIDRs` genannt, unterteilt (Standardmaske `/24`) und den Node-Objekten `.spec.podCIDR` zugeordnet.
Pods erhalten ihre IP-Adresse aus diesem kleineren Knoten-Subnetz in einer Standard-IPAM-Einrichtung.
Es muss also sichergestellt werden, dass genügend dieser Subnetze für die maximale Anzahl von Knoten, die Sie im Cluster erwarten, erstellt werden können.

_**Example 1**_
```
Pod network: 100.96.0.0/16
nodeCIDRMaskSize: /24
-------------------------

Number of podCIDRs: 256 --> max. Node count 
Number of IPs per podCIDRs: 256
```

Mit der obigen Konfiguration kann ein Shoot-Cluster höchstens **256 Knoten** haben, die bereit sind, Arbeitslasten im Pod-Netzwerk auszuführen.

_**Example 2**_
```
Pod network: 100.96.0.0/20
nodeCIDRMaskSize: /24
-------------------------

Number of podCIDRs: 16 --> max. Node count 
Number of IPs per podCIDRs: 256
```

Mit der obigen Konfiguration kann ein Shoot-Cluster maximal **16 Knoten** haben, die bereit sind, die Arbeitslast im Pod-Netzwerk auszuführen.

Neben der Konfiguration in `.spec.networking.pods` können Benutzer die `nodeCIDRMaskSize` einstellen, die vom Kube-Controller-Manager bei der Shoot-Erstellung verwendet wird.
Ein kleinerer IP-Bereich pro Knoten bedeutet mehr `podCIDRs` und damit die Möglichkeit, mehr Knoten im Cluster bereitzustellen, aber weniger verfügbare IPs für Pods, die auf jedem der Knoten laufen.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  kubeControllerManager:
    nodeCIDRMaskSize: 24 (default)
```

> :warning: Die Konfiguration "nodeCIDRMaskSize" ist unveränderlich und kann nicht nachträglich geändert werden.

_**Example 3**_
```
Pod network: 100.96.0.0/20
nodeCIDRMaskSize: /25
-------------------------

Number of podCIDRs: 32 --> max. Node count 
Number of IPs per podCIDRs: 128
```

Mit der obigen Konfiguration kann ein Shoot-Cluster höchstens **32 Knoten** haben, die bereit sind, Arbeitslasten im Pod-Netzwerk auszuführen.
