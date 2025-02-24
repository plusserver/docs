---
title: "Objekt öffentlich zugänglich machen"
linkTitle: "Öffentlicher Zugriff"
type: "docs"
weight: 90
date: "2024-02-07"
---

In diesem Abschnitt erfahren Sie, wie Sie ein Objekt in Ihrem S3-Bucket öffentlich zugänglich machen können, sodass es über das Internet abrufbar ist.

### Schritt 1: Hochladen des Objekts

Laden Sie das Objekt in Ihren S3-Bucket hoch.

```bash
aws s3api put-object --bucket <bucketname> --key <objekt-key> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in den Sie das Objekt hochladen möchten.
- \<objekt-key>: Der gewünschte Speicherort und Name des Objekts im Bucket.
- \<lokaler-dateipfad>: Der Pfad und Name der lokalen Datei, die hochgeladen werden soll.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-object --bucket mybucket --key public-folder/meinoeffentlichesobjekt.pdf --body /pfad/zu/meinoeffentlichesobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 2: Generieren der öffentlichen URL

Generieren Sie die öffentliche URL des Objekts, sodass Sie es über das Internet herunterladen können.

```bash
aws s3 presign s3://<bucketname>/<objekt-key> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in dem sich das Objekt befindet.
- \<objekt-key>: Der Pfad und Name des Objekts im Bucket.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3 presign s3://mybucket/public-folder/meinoeffentlichesobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Der Befehl gibt die URL aus, über die das Objekt über das Internet erreichbar ist.

Die Gültigkeitsdauer des Links im presign-Befehl beträgt standardmäßig 7 Tage.
Um die Gültigkeitsdauer eines presign-Links zu ändern, können Sie die **\--expires-in** Option verwenden. Hier ist ein Beispiel, wie Sie die Gültigkeitsdauer auf 3 Tage ändern können:

```bash
aws s3 presign s3://<bucketname>/<objekt-key> --expires-in 259200 --endpoint-url=https://<endpoint-url>
```

Erklärung:

- \--expires-in 259200: Setzt die Gültigkeitsdauer auf 3 Tage (3 Tage _24 Stunden/Tag_ 60 Minuten/Stunde \* 60 Sekunden/Minute).

Der Standardwert beträgt 3600 Sekunden, und das Maximum beträgt 604800 Sekunden.
