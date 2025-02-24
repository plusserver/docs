---
title: "S3 Regionen und Endpunkte"
linkTitle: "S3 Regionen und Endpunkte"
type: "docs"
weight: 10
date: "2024-02-06"
---

### Was ist eine plusserver S3 Region?

Die plusserver S3-Infrastruktur erlaubt die Erstellung von Buckets mit speziellen regionalen Eigenschaften.
Der Begriff "Region" bezieht sich auf den physischen Standort, an dem Ihre Daten gespeichert werden. Die entsprechenden Standorte finden Sie in der folgenden Tabelle.

### Verfügbare plusserver S3 Regionen

| Region     | Endpunkt                      | Standort   |
| ---------- | ----------------------------- | ---------- |
| de-west-1  | `s3.de-west-1.psmanaged.com`  | Köln       |
| de-north-2 | `s3.de-north-2.psmanaged.com` | Hamburg    |
| de-west-2  | In Planung                    | Düsseldorf |

Wenn der S3 Standard Endpunkt **us-east-1** verwendet wird, werden die Objekte in der Region **de-west-1** abgelegt.
{{% alert title="Hinweis" %}}
Um die optimale Leistung Ihres Buckets sicherzustellen, wählen Sie bitte beim Abrufen der Daten den entsprechenden Endpunkt aus der Tabelle aus.
{{% /alert %}}

### S3 Standorte und Rechenzentren

{{< img src="images/image-1.png" alt="plusserver Locations and data centers" >}}
