---
title: "PSKE - Quotas"
linkTitle: "Quotas"
type: "docs"
weight: 30
date: 2023-02-21
---
Quotas sind Betriebsgrenzen, die pro Projekt oder pro Benutzer in OpenStack und in Ihrem PSKE-Projekt festgelegt werden können. Sie werden verwendet, um die Menge an Ressourcen zu kontrollieren, die ein Projekt oder ein Benutzer verbrauchen kann. Quotas können für eine Vielzahl von Ressourcen festgelegt werden, einschließlich Rechenleistung, Speicher und Netzwerk.

Die folgende Tabelle enthält die Standardquoten, die anfänglich für jedes Projekt festgelegt werden:

| Item                      |      Size |
|---------------------------|----------:|
| Cores                     | 256 Cores |
| RAM                       |    512 GB |
| Instances                 |       500 |
| Floating IPs              |        10 |
| Networks                  |       500 |
| Router                    |       500 |
| Subnets                   |       500 |
| Max. Volumes              |      1000 |
| Max. Volume-Size          |   4000 GB |
| Max. Snapshots per Volume |        99 |
| Max. Backups              |        99 |
| Max. Backup-Size          |   2000 GB |
| Key Pairs (SSH)           |       500 |
| Metadata Items            |       100 |
| Security Groups           |       500 |
| Security Group Limits     |       500 |
| Server Groups             |        10 |
| Server Group Memebers     |        15 |

Quotas können über die OpenStack-CLI oder das OpenStack-Dashboard festgelegt werden.

{{< alert color="warning" title="Warning">}} Wenn Sie nur einen Vertrag für den PSKE haben, kontaktieren Sie bitte unseren Support, um Ihre Quoten zu erhöhen. {{< /alert >}}

Um Quotas über die CLI zu setzen, verwenden Sie den Befehl `openstack quota set`. Um zum Beispiel die maximale Anzahl der Instanzen auf 100 für das Projekt myproject zu setzen, würden Sie den folgenden Befehl verwenden:

```bash
openstack quota set --instances=100 myproject
```

Um Quotas über das OpenStack-Dashboard zu setzen, gehen Sie auf die Seite Projektübersicht und klicken Sie auf den Reiter Quotas.

Quotas sind ein wichtiger Bestandteil der OpenStack-Ressourcenverwaltung. Sie können verhindern, dass Benutzer zu viele Ressourcen verbrauchen und Leistungsprobleme in der Cloud verursachen.
