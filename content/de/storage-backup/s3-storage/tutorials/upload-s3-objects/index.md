---
title: "Hochladen von Objekten auf S3"
linkTitle: "Hochladen von Objekten"
type: "docs"
weight: 30
date: "2024-02-07"
---

Das Hochladen von Objekten auf plusserver S3 erfolgt einfach über die AWS CLI. Die folgenden Schritte zeigen Ihnen, wie Sie Objekte auf Ihre erstellten Buckets hochladen können.

### Schritt 1: Hochladen eines Objekts

Verwenden Sie den Befehl `aws s3 cp`, um ein Objekt auf einen Bucket hochzuladen:

```bash
aws s3 cp <lokaler-dateipfad> s3://<bucketname>/<ziel-dateipfad> --endpoint-url=https://<endpoint-url>
```

- \<lokaler-dateipfad>: Geben Sie den Pfad zur lokalen Datei an, die Sie hochladen möchten.
- \<bucketname>: Geben Sie den Namen des Ziel-Buckets an.
- \<ziel-dateipfad>: Optional, legt den Pfad im Bucket fest, unter dem die Datei gespeichert wird.
- \<endpoint-url>: Der entsprechende Endpunkt, abhängig von Ihrer Konfiguration.

Beispiel:

```bash
aws s3 cp /pfad/zur/datei.txt s3://mynewbucket/file.txt --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 2: Anzeigen der Bucket-Inhalte

Verwenden Sie den Befehl aws s3 ls, um die Inhalte eines Buckets anzuzeigen:

```bash
aws s3 ls s3://<bucketname> --endpoint-url=https://<endpoint-url>
```

**Beispiel:**

```bash
aws s3 ls s3://mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Weitere Informationen finden Sie unter: [Using S3 commands managing objects copy](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html#using-s3-commands-managing-objects-copy)
