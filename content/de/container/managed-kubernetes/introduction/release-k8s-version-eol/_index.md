---
title: "Kubernetes Versionen EOL"
linkTitle: "Kubernetes Versionen EOL"
type: "docs"
weight: 40
date: 2024-01-19
---

Bei der PSKE übernehmen wir die Day-1 und Day-2-Operations für Sie, darunter fällt unter anderem das Lifecycle-Management der Kubernetes-Versionen.

Durch unsere kontinuierliche Aktualisierung stellen wir sicher, dass Sie stets die aktuellen Kubernetes-Versionen nutzen können, um von den neuesten Features zu profitieren und das Sicherheitsrisiko durch veraltete Versionen zu reduzieren.

Dazu gehört auch, dass in regelmäßigen Abständen ältere Versionen von Kubernetes rausrotiert werden, um diesen Anforderungen gerecht zu werden. In der PSKE sind immer die 3 aktuellsten Kubernetes Versionen - welche auch von SAP Gardener unterstützt werden - verfügbar.

## Kubernetes EOL - 2024

| Kubernetes-Version | End of Life (EOL) | To Do |
|---|---|---|
| 1.23.17 | 01.03.2024 | **Ab dem 01.03.2024 nicht mehr in der PSKE verfügbar** |
| 1.24.16 | 26.04.2024 | **Planen Sie die Migration Ihrer Anwendungen auf 1.25.15 oder 1.26.14 bis zum 26.04.2024** |
| 1.25.15 | 28.11.2024 | **Planen Sie die Migration Ihrer Anwendungen auf 1.26.15 oder 1.27.16 bis zum 28.11.2024** |
| 1.26.15 | 05.01.2025 | **Planen Sie die Migration Ihrer Anwendungen auf 1.27.16 oder 1.28.13 bis zum 05.01.2025** |

Bitte stellen Sie sicher, dass Sie Ihre Cluster bis zum angegebenen EOL-Datum auf die von uns unterstützten Kubernetes-Versionen aktualisieren.

Sofern Sie Ihre Cluster bis zum genannten Zeitpunkt nicht aktualisieren, wird die Kubernetes-Version automatisch auf die nächste Version angehoben.
