---
title: "Storage"
type: "docs"
weight: 30
Datum: 2023-03-10
description: >
  Storage Optionen in der pluscloud open
---

# Welche Optionen bietet die pluscloud open für Storage?

{{% alert title="Note" color="info" %}}
Wenn nicht anders angegeben, ist Speicherplatz in einer pluscloud open Umgebung hoch verfügbar.
{{% /alert %}}

## Blockspeicher

pluscloud open bietet shared blockstorage auf Basis von Ceph. Er bietet eine kostengünstige Allzweck-Speicherlösung für Anwendungen, die persistenten Speicher benötigen. Der Ceph-Blockspeicher wird außerdem synchron auf drei Knoten repliziert, was ihn sehr zuverlässig macht. Für latenzempfindliche Anwendungen ist dieser Speichertyp jedoch möglicherweise nicht ideal geeignet.

Zusätzlich zu den grundlegenden Blockspeicherfunktionen bietet pluscloud open auch die Möglichkeit, Snapshots und Backups von Volumes zu erstellen, was die Verwaltung und Wiederherstellung von Daten erleichtert. Snapshots ermöglichen Point-in-Time-Backups von Volumes, während Backups vollständige Kopien der Volumes liefern, die für Disaster Recovery oder andere Zwecke verwendet werden können.

## Lokaler SSD-Speicher

{{% alert title="Hinweis" color="info" %}}
pluscloud open wird bald die Option Local SSD Storage anbieten.
{{% /alert %}}

Standard Shared Storage auf Basis von Ceph hat ein ausgewogenes Leistungsprofil, das nicht für alle Anwendungsfälle geeignet ist. Insbesondere Etcd und transaktionale Datenbanken wie Postgres sind dafür bekannt, dass es mit Ceph-Speicher zu Performance-Problemen kommt.

pluscloud open bietet Local SSD Storage als Option für die Speicherung von Daten auf Instanzen an. Local SSD Storage ist ein nicht gemeinsam genutzter Speicher, der physisch mit der Instanz verbunden ist und hohe Input/Output-Operationen pro Sekunde (IOPS) und geringe Latenzzeiten bietet. Er ist ideal für Anwendungen, die eine hohe Leistung und eine geringe Latenzzeit erfordern.

Lokaler SSD-Speicher ist ideal für flüchtige oder temporäre Arbeitslasten wie Caches. Ebenfalls gute Kandidaten für Local SSD Storage sind hochautomatisierte replizierte Datenbanken oder Key-Value-Stores wie Patroni oder Etcd, bei denen automatische Replikation und Failover in den Software-Stack integriert sind.

{{% alert title="Hinweis" color="warning" %}}
Der lokale SSD-Speicher hat die gleiche Lebensdauer wie die VM-Instanz. Wenn die VM gelöscht wird oder abstürzt, gehen auch die Daten des lokalen SSD-Speichers verloren. Darüber hinaus können Ihre VMs im Falle einer Hypervisor-Wartung weder in der Größe verändert noch live auf einen anderen Hypervisor migriert werden. Im Falle eines Hardwareausfalls können Ihre lokalen SSD-Daten vollständig verloren gehen. Selbst wenn es keinen Festplattenausfall gibt, kommt es zu regelmäßigen Ausfallzeiten.
{{% /alert %}}

Siehe [reference](../../../reference/local-storage/), um zu erfahren, wie man Local SSD Storage verwendet.

## Objektspeicher

Object Storage auf pluscloud open ist eine vielseitige Speicherlösung, die für moderate Daten- und Dateispeicheranforderungen entwickelt wurde. Sie basiert auf der Ceph RadosGW Technologie und ist für die nahtlose Integration in Cloud-native Workflows und Infrastructure as Code (IaC) Prozesse innerhalb der pluscloud open Umgebung konzipiert.

Die wichtigsten Merkmale von Object Storage auf pluscloud open sind:

- OpenStack Swift und Amazon S3 Kompatibilität für verbesserte Interoperabilität
- Einfacher Zugriff sowohl über das GUI (Horizon) als auch über CLI
- Integriert in das OpenStack Rechtemanagement-System für sichere Zugriffskontrolle
- Quota von 20 GB und 20.000 Objekten, um moderate Speicheranforderungen zu erfüllen

{{% alert title="Hinweis" color="info" %}}
Object Storage auf pluscloud open ist für moderate Datenmengen und Dateispeicheranforderungen konzipiert. Für größere Datenmengen bietet plusserver jedoch eine spezielle Lösung namens "S3 Storage". Diese Lösung bietet hoch skalierbaren, kosteneffizienten Objektspeicher mit maximaler Verfügbarkeit und optionalen Georedundanzfunktionen. Mit S3 Storage können Nutzer große Datenmengen einfach speichern und abrufen, wobei die Datenverfügbarkeit und -zugänglichkeit im Falle eines Infrastrukturausfalls oder anderer Störungen gewährleistet ist.
{{% /alert %}}

Siehe [reference](../../../reference/object-storage/), um zu erfahren, wie man Object Storage verwendet.
