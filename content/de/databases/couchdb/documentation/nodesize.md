---
title: "Node Size"
linkTitle: "Node Size"
type: "docs"
---

Wählen Sie die Node Size, welche am besten zu Ihren spezifischen Anforderungen und Arbeitslasten passt. Wenn Sie beispielsweise mit großen Datensätzen arbeiten oder komplexe Abfragen durchführen möchten, können Sie sich für eine Knotengröße mit größerem Arbeitsspeicher entscheiden (z. B. "r"- oder "a"-Serie). Umgekehrt können Sie für einfachere Arbeitslasten oder kostengünstige Lösungen eine Basiskonfiguration mit weniger Ressourcen wählen (z. B. Serie "b").

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

***vCPU:** Die Anzahl der virtuellen CPUs (Central Processing Units), die der Datenbankinstanz zugeordnet sind. Mehr vCPUs ermöglichen im Allgemeinen eine bessere Leistung bei der gleichzeitigen Ausführung mehrerer Tasks.

***vRAM:** Die der Datenbankinstanz zugewiesene Menge an virtuellem Random Access Memory (RAM). RAM wird von der Datenbank verwendet, um temporäre Daten zu speichern und Operationen durchzuführen. Mehr RAM kann die Fähigkeit der Datenbank verbessern, große Datenmengen und komplexe Abfragen effizient zu verarbeiten.

> *Eine Änderung der Knotengröße führt zu einer kurzen Unterbrechung des Dienstes, da der Knoten mit angepassten Ressourcen neu ausgerollt wird.*

## Speichergröße

Die Größe der persistenten Festplatte bestimmt die Kapazität für die Speicherung Ihrer Datenbankdaten. Jede Database-as-a-Service (DBaaS)-Instanz benötigt eine Mindestfestplattengröße von 50 GB. Sie können die Festplattengröße in Schritten von 50 GB bis zu einem Maximum von 500 GB erhöhen. Die Vergrößerung der Speichergröße führt nicht zu einer Unterbrechung des DBaaS.

> *Die Größe des Datenträgers kann nur erhöht werden. Um die Plattengröße zu verringern, müssen Sie eine neue DBaaS-Instanz erstellen und die Daten manuell übertragen.*

**Um die Node Size Ihres DBaaS Instanz zu verändern, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) bei unserem Support-Team.**

> *Wir arbeiten an einer Funktion, mit der Sie die Node Size direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienstleistungen verbessern.*
