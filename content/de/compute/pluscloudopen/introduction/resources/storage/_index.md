---
title: "Storage"
type: "docs"
weight: 30
Datum: 2023-03-10
description: >
  Storage-Optionen in der pluscloud open
---

## Welche Optionen bietet die pluscloud open für Storage?

{{% alert title="Hinweis" color="info" %}}
Wenn nicht anders angegeben, ist Speicherplatz in einer pluscloud-open-Umgebung hoch verfügbar.
{{% /alert %}}

### Block Storage

Die pluscloud open bietet Shared Block Storage auf Basis von Ceph. Er bietet eine kostengünstige Allzweck-Speicherlösung für Anwendungen, die persistenten Speicher benötigen. Der Ceph Block Storage wird außerdem synchron auf drei Knoten repliziert, was ihn sehr zuverlässig macht. Für latenzempfindliche Anwendungen ist dieser Speichertyp jedoch möglicherweise nicht ideal geeignet.

Zusätzlich zu den grundlegenden Block-Storage-Funktionen bietet pluscloud open auch die Möglichkeit, Snapshots und Backups von Volumes zu erstellen, was die Verwaltung und Wiederherstellung von Daten erleichtert. Snapshots ermöglichen Point-in-Time-Backups von Volumes, während Backups vollständige Kopien der Volumes liefern, die für Disaster Recovery oder andere Zwecke verwendet werden können.

### Local SSD Storage

{{% alert title="Hinweis" color="info" %}}
Die pluscloud open wird bald die Option Local SSD Storage anbieten.
{{% /alert %}}

Standardmäßiger Shared Storage auf Basis von Ceph hat ein ausgewogenes Leistungsprofil, das nicht für alle Anwendungsfälle geeignet ist. Insbesondere Etcd und transaktionale Datenbanken wie Postgres sind dafür bekannt, dass es mit Ceph-Speicher zu Performance-Problemen kommt.

Die pluscloud open bietet Local SSD Storage als Option für die Speicherung von Daten auf Instanzen an. Local SSD Storage ist ein nicht gemeinsam genutzter Speicher, der physisch mit der Instanz verbunden ist und hohe Input/Output-Operationen pro Sekunde (IOPS) und geringe Latenzzeiten bietet. Er ist ideal für Anwendungen, die eine hohe Leistung und eine geringe Latenzzeit erfordern.

Local SSD Storage ist ideal für flüchtige oder temporäre Arbeitslasten wie Caches. Ebenfalls gute Kandidaten für Local SSD Storage sind hochautomatisierte replizierte Datenbanken oder Key-Value-Stores wie Patroni oder Etcd, bei denen automatische Replikation und Failover in den Software-Stack integriert sind.

{{% alert title="Hinweis" color="warning" %}}
Local SSD Storage hat die gleiche Lebensdauer wie die VM-Instanz. Wenn die VM gelöscht wird oder abstürzt, gehen auch die Daten des lokalen SSD-Speichers verloren. Darüber hinaus können Ihre VMs im Falle einer Hypervisor-Wartung weder in der Größe verändert noch live auf einen anderen Hypervisor migriert werden. Im Falle eines Hardwareausfalls können Ihre lokalen SSD-Daten vollständig verloren gehen. Selbst wenn es keinen Festplattenausfall gibt, kommt es zu regelmäßigen Ausfallzeiten.
{{% /alert %}}

Unter [Dokumentation](../../../reference/local-storage/) erfahren Sie mehr darüber, wie man Local SSD Storage verwendet.

### Object Storage

Der Object Storage der pluscloud open ist eine vielseitige Speicherlösung, die für moderate Daten- und Dateispeicheranforderungen entwickelt wurde. Sie basiert auf Ceph RADOS Gateway und ist für die nahtlose Integration in Cloud-native Workflows und IaC-Prozesse (Infrastructure as Code) innerhalb der pluscloud-open-Umgebung konzipiert.

Die wichtigsten Merkmale von Object Storage in der pluscloud open sind:

- Kompatibilität mit OpenStack Swift und Amazon S3 für verbesserte Interoperabilität
- Einfacher Zugriff sowohl über GUI (Horizon) als auch über CLI
- Integriert in das Rechtemanagement-System von OpenStack für sichere Zugriffskontrolle
- Quota von 20 GB und 20.000 Objekten, um moderate Speicheranforderungen zu erfüllen

{{% alert title="Hinweis" color="info" %}}
Der Object Storage der pluscloud open ist für moderate Datenmengen und Dateispeicheranforderungen konzipiert. Für größere Datenmengen bietet plusserver jedoch eine spezielle Lösung [S3 Storage](https://www.plusserver.com/produkt/s3-storage/). Diese Lösung bietet hoch skalierbaren, kosteneffizienten Object Storage mit maximaler Verfügbarkeit und optionaler Georedundanz. Mit S3 Storage können User große Datenmengen einfach speichern und abrufen, wobei die Datenverfügbarkeit und -zugänglichkeit im Falle eines Infrastrukturausfalls oder anderer Störungen gewährleistet ist.
{{% /alert %}}

Unter [Dokumentation](../../../reference/object-storage/) erfahren Sie mehr darüber, wie man Object Storage verwendet.
