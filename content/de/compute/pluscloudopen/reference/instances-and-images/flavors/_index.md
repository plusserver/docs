
---
title: "Compute Flavor"
type: "docs"
weight: 60
date: 2024-09-06
description: >
 Liste der verfügbaren Compute Flavors
---


## Überblick

Compute Flavors sind vordefinierte Konfigurationen, die die Menge der CPU-, RAM- und Speicher-Ressourcen bestimmen,
die einer virtuellen Maschine zugewiesen werden. Jedes Flavor bietet eine andere Kombination dieser Ressourcen,
die es dem Benutzer ermöglicht, je nach den Leistungsanforderungen seiner Anwendungen die passende zu wählen.

pluscloud open verwendet den [SCS-Standard](https://github.com/SovereignCloudStack/standards) für die Benennung von Flavors.
Dieser Standard verwendet eine Kombination aus Buchstaben und Zahlen, um die Spezifikationen der einzelnen Flavors zu beschreiben.
Der erste Teil des Namens gibt die Anzahl der im Flavor verfügbaren virtuellen CPUs (vCPUs) an,
während der zweite Teil die Menge des verfügbaren Arbeitsspeichers (RAM) beschreibt.
Der dritte Teil, falls vorhanden, gibt die Menge des für die Instanz zugewiesenen Festplattenspeichers an.
Allen Flavors, die diesem Standard folgen, ist ein „SCS-“ vorangestellt.


{{% alert title="Hinweis" color="info" %}}
Reguläre Compute Flavors mit Festplatten werden nun zugunsten von Diskless Flavors ersetzt,
um Verwechslungen mit Local SSD Storage (gekennzeichnet durch ein „s“ nach der Festplattengröße) zu vermeiden.
{{% /alert %}}

## Verfügbare Flavors

Die folgende Tabelle zeigt die Liste aller öffentlichen Compute Flavors:

| Name           | RAM (MB) | vCPUs | Disk (GB) |
|----------------|----------|-------|-----------|
| SCS-1V-0.5 | 512 | 1 | 0 |
| SCS-1V-1 | 1024 | 1 | 0 |
| SCS-1L-1 | 1024 | 1 | 0 |
| SCS-1V-2 | 2048 | 1 | 0 |
| SCS-1V-4 | 4096 | 1 | 0 |
| SCS-1V-8 | 8192 | 1 | 0 |
| SCS-2V-2 | 2048 | 2 | 0 |
| SCS-2V-4 | 4096 | 2 | 0 |
| SCS-2V-8 | 8192 | 2 | 0 |
| SCS-2V-16 | 16384 | 2 | 0 |
| SCS-4V-8 | 8192 | 4 | 0 |
| SCS-4V-16 | 16384 | 4 | 0 |
| SCS-4V-32 | 32768 | 4 | 0 |
| SCS-8V-8 | 8192 | 8 | 0 |
| SCS-8V-16 | 16384 | 8 | 0 |
| SCS-8V-32 | 32768 | 8 | 0 |
| SCS-16V-32 | 32768 | 16 | 0 |
| SCS-16V-64 | 65536 | 16 | 0 |
| SCS-2V-4-20s | 4096 | 2 | 20 |
| SCS-4V-16-100s | 16384 | 4 | 100 |

## Veraltete Compute Flavors

Als zertifizierter Souvereing Cloud Stack implementieren wir die neuesten Compute Flavor Spezifikationen.
Teil des Lifecycle-Managements ist es auch, alte Compute Flavors zu verwerfen. Die Eigenschaft 'os:deprecation' wird verwendet, um anzuzeigen, wann ein
Compute Flavor als veraltet eingestuft wird. Dies signalisiert, dass er in der Zukunft entfernt wird oder eingestellt werden kann.
Sie können auch in der Beschreibung einen Hinweis finden.

Die folgende Tabelle zeigt die veralteten Compute Flavors und deren Abschaltdatum.


{{% alert title="Hinweis" color="warning" %}}
Bitte stellen Sie sicher, dass Sie Ihren Infrastrukturcode so ändern, dass Sie nur die aktuellen Compute Flavors verwenden. Ersetzen Sie ggf. bestehende Instanzen.
{{% /alert %}}

| Name           | RAM (MB) | vCPUs | Disk (GB) | Abschaltdatum    |
|----------------|----------|-------|-----------|------------------|
| SCS-1L-1-5 | 1024 | 1 | 5 | 2024-12-31 |
| SCS-1V-0.5-20 | 512 | 1 | 20 | 2024-12-31 |
| SCS-1V-1-10 | 1024 | 1 | 10 | 2024-12-31 |
| SCS-1V-1-20 | 1024 | 1 | 20 | 2024-12-31 |
| SCS-1V-2-5 | 2048 | 1 | 5 | 2024-12-31 |
| SCS-1V-4-10 | 4096 | 1 | 10 | 2024-12-31 |
| SCS-1V-8-20 | 8192 | 1 | 20 | 2024-12-31 |
| SCS-2V-2-20 | 2048 | 2 | 20 | 2024-12-31 |
| SCS-2V-4-10 | 4096 | 2 | 10 | 2024-12-31 |
| SCS-2V-4-20 | 4096 | 2 | 20 | 2024-12-31 |
| SCS-2V-4-50 | 4096 | 2 | 50 | 2024-12-31 |
| SCS-2V-4-100 | 4096 | 2 | 100 | 2024-12-31 |
| SCS-2V-8-20 | 8192 | 2 | 20 | 2024-12-31 |
| SCS-2V-8-100 | 8192 | 2 | 100 | 2024-12-31 |
| SCS-2V-16-50 | 16384 | 2 | 50 | 2024-12-31 |
| SCS-4V-8-20 | 8192 | 4 | 20 | 2024-12-31 |
| SCS-4V-8-50 | 8192 | 4 | 50 | 2024-12-31 |
| SCS-4V-8-100 | 8192 | 4 | 100 | 2024-12-31 |
| SCS-4V-16-50 | 16384 | 4 | 50 | 2024-12-31 |
| SCS-4V-16-100 | 16384 | 4 | 100 | 2024-12-31 |
| SCS-4V-32-100 | 32768 | 4 | 100 | 2024-12-31 |
| SCS-4V-32-50 | 32768 | 4 | 50 | 2024-12-31 |
| SCS-8V-8-100 | 8192 | 8 | 100 | 2024-12-31 |
| SCS-8V-16-50 | 16384 | 8 | 50 | 2024-12-31 |
| SCS-8V-16-100 | 16384 | 8 | 100 | 2024-12-31 |
| SCS-8V-32-50 | 32768 | 8 | 50 | 2024-12-31 |
| SCS-8V-32-100 | 32768 | 8 | 100 | 2024-12-31 |
| SCS-16V-32-100 | 32768 | 16 | 100 | 2024-12-31 |
| SCS-16V-64-100 | 65536 | 16 | 100 | 2024-12-31 |
| SCS-2V:4:100 | 4096 | 2 | 100 | 2024-12-31 |
| SCS-2V:8:100 | 8192 | 2 | 100 | 2024-12-31 |
| SCS-2V:16:50 | 16384 | 2 | 50 | 2024-12-31 |
| SCS-4V:8:100 | 8192 | 4 | 100 | 2024-12-31 |
| SCS-4V:16:100 | 16384 | 4 | 100 | 2024-12-31 |
| SCS-4V:32:100 | 32768 | 4 | 100 | 2024-12-31 |
| SCS-8V:8:100 | 8192 | 8 | 100 | 2024-12-31 |
| SCS-8V:16:100 | 16384 | 8 | 100 | 2024-12-31 |
| SCS-8V:32:100 | 32768 | 8 | 100 | 2024-12-31 |
| SCS-16V:32:100 | 32768 | 16 | 100 | 2024-12-31 |
| SCS-16V:64:100 | 65536 | 16 | 100 | 2024-12-31 |

