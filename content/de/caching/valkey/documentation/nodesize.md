---
title: "Node Size"
linkTitle: "Node Size"
type: "docs"
---

Wählen Sie die Node Size, welche am besten zu Ihren spezifischen Anforderungen und Arbeitslasten passt. Wenn Sie beispielsweise mit großen Datenmengen arbeiten, können Sie sich für eine Knotengröße mit größerem Arbeitsspeicher entscheiden (z. B. "r"- oder "a"-Serie). Umgekehrt können Sie für einfachere Arbeitslasten oder kostengünstige Lösungen eine Basiskonfiguration mit weniger Ressourcen wählen (z. B. Serie "b").

### Basic (b)

Bietet eine ausgewogene Konfiguration, die für Standard-Datenbankoperationen geeignet ist.

| node_size | vCPU | vRAM |
|-----------|------|------|
| b32-64 | 32 | 64 |
| b16-32 | 16 | 32 |
| b8-16 | 8 | 16 |
| b4-8 | 4 | 8 |
| b2-4 | 2 | 4 |

### All-purpose(a)

Bietet eine ausgewogene Konfiguration mit dem Schwerpunkt auf Vielseitigkeit und moderater Ressourcenzuweisung.

| node_size | vCPU | vRAM |
|-----------|------|------|
| a32-128 | 32 | 128 |
| a16-64 | 16 | 64 |
| a8-32 | 8 | 32 |
| a4-16 | 4 | 16 |
| a2-8 | 2 | 8 |

### RAM-optimiert (r)

Bietet eine höhere RAM-Zuweisung für speicherintensive Workloads.

| node_size | vCPU | vRAM |
|-----------|------|------|
| r16-128 | 16 | 128 |
| r8-64 | 8 | 64 |
| r4-32 | 4 | 32 |
| r2-16 | 2 | 16 |

***vCPU:** Die Anzahl der virtuellen CPUs (Central Processing Units), die der Instanz zugeordnet sind.

***vRAM:** Die der Cachinginstanz zugewiesene Menge an virtuellem Random Access Memory (RAM). RAM wird vom Service verwendet, um die Daten zu speichern und Operationen durchzuführen. Mehr RAM kann die Fähigkeit der Instanz  verbessern, große Datenmengen und komplexe Abfragen effizient zu verarbeiten.

> *Eine Änderung der Knotengröße führt zu einer kurzen Unterbrechung des Dienstes, da der Knoten mit angepassten Ressourcen neu ausgerollt wird.*

## Speichergröße

Die Größe der persistenten Festplatte bestimmt die Kapazität für die Zwischenspeicherung Ihrer Cachingdaten. Hier werden in regelmäßigen Abständen die Caching Daten als Snapshots abgelegt. Jede Caching-as-a-Service (CaaS)-Instanz benötigt eine Mindestfestplattengröße von 50 GB. Sie können die Festplattengröße in Schritten von 50 GB bis zu einem Maximum von 500 GB erhöhen. Die Vergrößerung der Speichergröße führt nicht zu einer Unterbrechung des CaaS.

>*Die Größe des Datenträgers kann nur erhöht werden. Um die Plattengröße zu verringern, müssen Sie eine neue DBaaS-Instanz erstellen und die Daten manuell übertragen.*
