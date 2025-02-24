---
title: "S3 Limits und Quotas"
linkTitle: "S3 Limits und Quotas"
type: "docs"
weight: 30
date: "2024-02-06"
---

## Anzahl der Buckets

AWS S3 bietet standardmäßig eine Begrenzung von 100 Buckets pro Mandant. Bei Bedarf kann diese Begrenzung durch eine spezielle Freischaltung von Amazon in AWS auf bis zu 1.000 Buckets erhöht werden.

Im Vergleich dazu bietet unser plusserver S3-Service standardmäßig eine Limitierung von 1.000 Buckets pro Mandant.
Beachten Sie bitte, dass diese Grenze nicht weiter erhöht werden kann.

## Generelle Features und Beschränkungen

- Maximal 200 (GET/HEAD) RPOs und 200 (PUT/POST/DELETE) RPOs pro Tenant
- Bis zu 100 Millionen Objekte pro Bucket
- Bis zu 5 TiB Objektgröße
- 1MB Mindestobjektgröße empfohlen (1.000.000 Bytes = 1MB)
- Maximale Objektgröße: 5 TB
- Minimale Part-Größe für Multipart Upload: 5 MiB
- Maximale Part-Größe für Multipart Upload: 5 GiB
- Maximale Anzahl an Parts für Multipart Uploads: 10.000
- Bucket-Versionierung pro Object Version: 10.000
- Maximale Anzahl von S3 Access Keys pro User: 100
- Maximale Anzahl von Users oder Access Keys im gesamten Cluster: unbegrenzt
- AWS S3 API kompatibel
- Zu Objekten können Metadaten als Key-Value Paare gespeichert werden (via S3 API)
- Object Lock Support
- Versionierung Support

## Bucket-Namen Features und Beschränkungen

- Ein Bucketname muss zwischen 3 (min) bis 63 (max) Zeichen lang sein. Der Suffix (-mirr / -repl) ist
  davon abzuziehen
- in Bucketname darf nur Kleinbuchstaben, Nummern, Punkte (.) und Bindestriche enthalten
- Ein Bucketname darf nicht das Format einer IP Adresse enthalten (z.B. 192.168.1.42)
- Sollte ein Bucketname mit dem suffix -mirr oder -repl enden, wird eine andere Serviceklasse,
  Ablegungsart und Abrechnung verwendet
- Ein Bucketname muss über den gesamten plusserver S3 Service eindeutig sein
- Ein Bucketname der schon von einem Kunden verwendet wird kann nicht verwendet werden, bis
  dieser Bucket vom Besitzer gelöscht wird

Diese Limitierungen sind so konzipiert, um die Leistung und Effizienz unseres Services zu gewährleisten und gleichzeitig eine hohe Flexibilität für Ihre Anwendungsfälle zu bieten. Bitte beachten Sie diese Limitierungen, wenn Sie Ihre Konfiguration planen.

### Architektur & Design

Unser S3-Dienst ermöglicht nicht nur eine logische Trennung auf Ebene der Buckets, sondern Sie können auch innerhalb eines Buckets Ordner erstellen. Dadurch haben Sie die Flexibilität, Ihre Daten weiter zu organisieren.

Um eine sichere Trennung und Kontrolle der Datenzugriffe zu gewährleisten, können Gruppenrichtlinien auf verschiedenen Ebenen angewendet werden – sei es auf Bucket-Ebene, Ordnerebene oder für einzelne Objekte. Mit dem Feature "Gruppenrichtlinien" können auch komplexe Sicherheitsstrukturen implementiert werden, um Ihren Anforderungen gerecht zu werden.

Bitte beachten Sie jedoch, dass eine reine Trennung auf Bucket-Ebene in großem Umfang nicht uneingeschränkt umsetzbar ist, da pro Mandant ein festes Limit für Buckets besteht.

### Performance-Grundlagen

Für eine optimale Performance sollte ein Objekt immer über den passenden Endpunkt abgelegt und aufgerufen werden. Bei gespiegelten oder replizierten S3-Objekten können beide Seiten als Endpunkt verwendet werden.
Generell sollte der Client- bzw. die Applikationsregion, die S3 verwendet, beachtet werden, um den kürzesten Weg zum Endpunkt zu bestimmen.

Der S3-Standard nutzt das HTTPS-Protokoll, was zu architekturbedingten Protokoll-Latenzen führen kann. Dazu gehören auch die geografische Lage und die Qualität der Netzwerkverbindung, welche die Zugriffszeit beeinflussen kann.

Es ist zu beachten, dass der S3 Service nicht für latenzkritische Workloads oder Anwendungen geeignet ist, die kontinuierlich angepasste Daten erfordern oder beispielsweise eine kontinuierliche Latenzempfindlichkeit von unter 25 Millisekunden benötigen. Die tatsächliche Latenz des S3-Services kann je nach Netzwerkbedingung des Clients bzw. der Applikation stark variieren und sowohl niedriger als auch höher ausfallen. Es ist zu beachten, dass die plusserver aufgrund von verschiedenen Faktoren keine Latenz garantieren kann.
Workloads wie Echtzeit-Datenbanken, virtuelle Maschinen, transaktionsbasierte Anwendungen und Anwendungen mit hohen I/O-Operationen sind für den Service generell nicht geeignet. Für solche Anforderungen stehen andere Storage Services zur Verfügung, wie beispielsweise der plusstorage Fileservice NFS/SMB.

Der Zugriff auf den S3-Endpoint erfolgt über das Internet. In diesem Prozess können Engpässe auftreten, die die Performance beeinträchtigen können. Einige Beispiele für mögliche Ursachen sind:

- Die Verwendung mehrerer paralleler Threads kann die Performance erheblich steigern, insbesondere bei Backup-Softwarelösungen, die Backup-Daten in S3 ablegen (wie z.B. Veeam)
- Die Engstelle kann der Internet-Uplink des Clients sein.
- Der S3-Client ist möglicherweise nicht optimal konfiguriert
- Die S3-Client Software ist nicht für den Workload optimal geeignet
- Es wird der falsche Endpunkt verwendet.

Eine optimale Konfiguration und die Auswahl des richtigen Endpunkts tragen dazu bei, eine reibungslose und leistungsstarke Nutzung unseres S3-Dienstes zu gewährleisten.

## Geeignete und ungeeignete Workloads für den S3 Standard

### Geeignete Workloads für S3

- Statische Webseiten: Hosting von statischen Webseiten, wie HTML, CSS und JavaScript, da S3 eine effiziente Bereitstellung von Webinhalten ermöglicht.
- Datenarchivierung: Speichern von Archivdaten und Backups, da S3 eine kostengünstige und dauerhafte Speicherung bietet.
- Big Data und Analysen: Speichern von großen Datensätzen, die für Big Data-Analysen und Data Warehousing verwendet werden.
- Content-Delivery-Network (CDN): Verwendung von S3 als Speicherort für Content, der über ein CDN verteilt wird, um Inhalte schnell und effizient weltweit bereitzustellen.
- Media- und Dateispeicher: Hosting von Multimedia-Dateien wie Bilder, Videos und Audiodateien für den schnellen und zuverlässigen Abruf.

### Ungeeignete Workloads für S3

- Echtzeit-Datenbanken: S3 ist objektbasiert und eignet sich nicht gut für Anwendungen, die Echtzeit-Datenbankzugriffe erfordern.
- Anwendungen mit hoher Latenzempfindlichkeit: Anwendungen, die extrem niedrige Latenzzeiten (<25ms) erfordern, können von der grundlegenden Latenz von S3 beeinträchtigt werden.
- Virtuelle Maschinen: Die Speicherung von virtuellen Maschinen in S3 ist nicht empfohlen.
- Transaktionsbasierte Anwendungen: Anwendungen, die viele Transaktionen oder Schreibzugriffe pro Sekunde erfordern, könnten aufgrund der grundlegenden Struktur von S3 ineffizient sein.
- Hohe IOPS-Anwendungen: Anwendungen, die eine hohe Anzahl von Input/Output-Operationen pro Sekunde erfordern.
