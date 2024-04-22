---
title: "PSKE - Cluster DNS (CoreDNS)"
linkTitle: "Cluster DNS"
type: "docs"
weight: 20
date: 2023-07-12
---

Standardmäßig skaliert CoreDNS bis zu einem Maximum von 5 Replikaten. Dies kann bei größeren Clustern zu einem Problem werden, da sie möglicherweise nicht in der Lage sind, das hohe Volumen an Anfragen zu bewältigen.

In Gardener gibt es zwei Optionen, um das Skalierungsverhalten zu definieren:

1. Horizontal: Dieser Modus legt ein Minimum von 2 Replikaten und ein Maximum von 5 Replikaten für CoreDNS fest.
2. Cluster-proportional: Dieser Modus legt ein Minimum von 2 Replikaten fest und fügt ein zusätzliches Replikat für jeweils 16 Knoten im Cluster hinzu.

Die Standardeinstellung in den Clustern ist "horizontal".

Das Umschalten zwischen den Skalierungsmodi ist einfach zu bewerkstelligen:

1. Wählen Sie den gewünschten Cluster aus.
2. Wählen Sie statt "Übersicht" im oberen Reiter "YAML".
3. Passen Sie die YAML-Konfiguration entsprechend an.

Im Folgenden finden Sie Beispiele für die YAML-Konfigurationen der einzelnen Skalierungsmodi:

### Beispiel: Horizontal

```yaml
systemComponents:
  coreDNS:
    autoscaling:
      mode: horizontal
```

### Example: Cluster-proportional

```yaml
systemComponents:
  coreDNS:
    autoscaling:
      mode: cluster-proportional
```

Nehmen Sie einfach die entsprechenden Änderungen an der YAML-Konfiguration vor, speichern Sie sie und das Skalierungsverhalten von CoreDNS wird im Gardener-Cluster entsprechend aktualisiert.
