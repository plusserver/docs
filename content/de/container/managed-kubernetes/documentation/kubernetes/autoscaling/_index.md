---
title: "Autoscaling"
linkTitle: "Autoscaling"
type: "docs"
weight: 20
date: 2023-02-21
description: >
  
---

## Formen der Kubernetes-Autoskalierung

Autoscaling ist eine Methode zur automatischen Skalierung von Kubernetes (K8s)-Arbeitslasten auf der Grundlage der Ressourcennutzung/Erwartungen. Autoscaling in Kubernetes hat drei Dimensionen:

{{< alert >}}
***Horizontal Pod Autoscaling
***Horizontal Pod Autoscaler (HPA)***: Passt die Anzahl der Replikate eines Pods an.

***Cluster Autoscaler***: Passt die Anzahl der Knoten in einem Cluster an.

***Vertikaler Pod-Autoscaler (VPA)***: Passt die Ressourcenanforderungen und -grenzen eines Containers an.
{{< /alert >}}

Die verschiedenen Autoscaler arbeiten auf einer von zwei Kubernetes-Ebenen

**Pod-Ebene**: Die HPA- und VPA-Methoden finden auf der Pod-Ebene statt. Sowohl HPA als auch VPA skalieren die verfügbaren Ressourcen oder Instanzen des Pods sowohl nach oben als auch nach unten.

**Cluster-Ebene**: Der Cluster-Autoscaler arbeitet auf Clusterebene und skaliert die Anzahl der Nodes innerhalb Ihres Clusters nach oben oder unten.

{{< alert color="warning" title="Warning">}}
Gleichzeitige Verwendung von VPA und HPA
HPA und VPA können miteinander in Konflikt geraten, wenn beispielsweise in beiden Fällen der Arbeitsspeicher als Basismessgröße für die Skalierung verwendet wird. Dies kann dazu führen, dass beide versuchen, Workloads gleichzeitig vertikal und horizontal zu skalieren, was zu unvorhersehbaren Konsequenzen führt. Um solche Konflikte zu vermeiden, sollten sich HPA und VPA auf unterschiedliche Metriken konzentrieren.

In der Regel wird VPA so konfiguriert, dass die Skalierung auf der Basis von CPU oder RAM erfolgt, und für HPA werden benutzerdefinierte Metriken verwendet.
{{< /alert >}}