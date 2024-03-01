---
title: "Preisgestaltung"
type: "docs"
weightt: 20
Datum: 2023-06-26
description: >
  Preise für pluscloud open Ressourcen
---

# Einführung

Diese Preistabelle bietet einen Überblick über die verfügbaren Instanztypen, Load Balancer und Speicheroptionen sowie deren jeweilige Kosten. Um die stündlichen und monatlichen Preise für jeden Instanz zu berechnen, multiplizieren Sie die Anzahl der vCPUs und die Menge des Arbeitsspeichers (in GB) mit den jeweiligen Einheitspreisen. Ab April 2023 sind die Einheitspreise wie folgt:

* vCPU: 0,0205 € pro Stunde
* vRAM: 0,007 € pro GB pro Stunde
* Speicher: 0,09 € pro GB pro Monat
* Load Balancer: 0,068 € pro Stunde

Um die monatlichen Kosten für eine Instanz zu berechnen, multiplizieren Sie die stündlichen Kosten mit der Anzahl der Stunden im Monat (unter der Annahme von 720 Stunden pro Monat). Für eine Instanz vom Typ SCS-1V:0.5 mit 1 vCPU und 0,5 GB RAM betragen die stündlichen Kosten beispielsweise ```(1*€0,0205) + (0,5*€0,007) = €0,024``, und die monatlichen Kosten betragen ```€0,024 * 720 = €17,28``.

Die Preisinformationen wurden zuletzt im April 2023 aktualisiert und können sich jederzeit ändern.

## Compute

| Name       | vCPUs | RAM (GB) | stündlich | monatlich |
|------------|-------|----------|-----------|-----------|
| SCS-1V:0,5 | 1     | 0,5      | 0,0240 €  | 17,28 €   |
| SCS-1L:1   | 1     | 1        | 0,0275 €  | 19,80 €   |
| SCS-1V:1   | 1     | 1        | 0,0275 €  | 19,80 €   |
| SCS-1V:2   | 1     | 2        | 0,0345 €  | 24,84 €   |
| SCS-1V:4   | 1     | 4        | 0,0485 €  | 34,92 €   |
| SCS-1V:8   | 1     | 8        | 0,0765 €  | 55,08 €   |
| SCS-2V:2   | 2     | 2        | 0,0550 €  | 39,60 €   |
| SCS-2V:4   | 2     | 4        | 0,0690 €  | 49,68 €   |
| SCS-2V:8   | 2     | 8        | 0,0970 €  | 69,84 €   |
| SCS-2V:16  | 2     | 16       | 0,1530 €  | 110,16 €  |
| SCS-4V:8   | 4     | 8        | 0,1380 €  | 99,36 €   |
| SCS-4V:16  | 4     | 16       | 0,1940 €  | 139,68 €  |
| SCS-4V:32  | 4     | 32       | 0,3060 €  | 220,32 €  |
| SCS-8V:8   | 8     | 8        | 0,2200 €  | 158,40 €  |
| SCS-8V:16  | 8     | 16       | 0,2760 €  | 198,72 €  |
| SCS-8V:32  | 8     | 32       | 0,3880 €  | 279,36 €  |
| SCS-16V:32 | 16    | 32       | 0,5520 €  | 397,44 €  |
| SCS-16V:64 | 16    | 64       | 0,7760 €  | 558,72 €  |

{{% alert title="Info" %}}
Bitte beachten Sie, dass sich die in der Tabelle angegebenen Preise auf Tarife mit 0 Festplattenplatz beziehen.
{{% /alert %}}

## Speicher

| Name          | Einheiten | monatlich |
|---------------|-----------|-----------|
| Block Storage | 1 GB      | 0,09 €    |

{{% alert title="Objektstorage auf pluscloud open Fair Use Policy" %}}
Object Storage on pluscloud open basiert auf Ceph RadosGW und ist nicht kostenpflichtig. Das Kontingent ist auf 20 GB / 20.000 Objekte begrenzt.
{{% /alert %}}

## Netzwerk

| Name                    | stündlich  | monatlich |
| ------------------------| -----------| ----------|
| Cloud Load Balancer     | 0,068 €    | 48,96 €   |
| Öffentliche Floating IP | 1,00 €     | 1,00 €    |

{{% alert title="Traffic Fair Use Policy" %}}
Für die eingehenden und ausgehenden Standardtraffic werden keine zusätzlichen Gebühren erhoben.
{{% /alert %}}
