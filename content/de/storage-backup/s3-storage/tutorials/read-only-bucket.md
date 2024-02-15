---
title: "Bucket im Read-Only-Modus setzen"
linkTitle: "Read Only Bucket"
type: "docs"
weight: 70
date: "2024-02-07"
---

In diesem Abschnitt erfahren Sie, wie Sie einen S3-Bucket auf "Read Only" (nur lesbar) setzen können. Dies bedeutet, dass keine neuen Objekte im Bucket erstellt oder bearbeitet werden können, bestehende Objekte jedoch weiterhin abgerufen werden können.

### Schritt 1: Anlegen der JSON-Policy-Datei

Erstellen Sie zunächst eine JSON-Datei, die die Bucket-Policy für den "Read Only"-Zugriff enthält. Zum Beispiel können Sie die Datei `readonly-policy.json` mit dem folgenden Inhalt erstellen:

```json
{
  "Version": "2012-10-17",
  "Id": "ReadOnlyPolicy",
  "Statement": [
    {
      "Sid": "AllowGet",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<account-id>:*"
      },
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::<bucketname>",
        "arn:aws:s3:::<bucketname>/*"
      ]
    },
    {
      "Sid": "DenyPut",
      "Effect": "Deny",
      "Principal": {
        "AWS": "arn:aws:iam::<account-id>:*"
      },
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:PutBucketPolicy"
      ],
      "Resource": [
        "arn:aws:s3:::<bucketname>",
        "arn:aws:s3:::<bucketname>/*"
      ]
    }
  ]
}
```
Erklärung der Variablen in der JSON-Policy:

* \<bucketname>: Der Name des Buckets, für den Sie die Policy erstellen möchten.

### Schritt 2: Aktivieren des "Bucket Policy" für "Read Only"

Verwenden Sie den Befehl aws s3api put-bucket-policy, um den Bucket auf "Read Only" zu setzen:

```bash
aws s3api put-bucket-policy --bucket <bucketname> --policy file://readonly-policy.json --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

* \<bucketname>: Der Name des Buckets, den Sie auf "Read Only" setzen möchten.
* file://readonly-policy.json: Der Pfad zur JSON-Policy-Datei auf Ihrem lokalen System.
* \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-bucket-policy --bucket myreadonlybucket --policy file://readonly-policy.json --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 3: Überprüfen des "Read Only"-Status des Buckets

Verwenden Sie den Befehl `aws s3api get-bucket-policy`, um sicherzustellen, dass der Bucket auf "Read Only" gesetzt wurde:

```bash
aws s3api get-bucket-policy --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

* \<bucketname>: Der Name des Buckets, dessen Policy Sie überprüfen * \möchten.
* \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```
Wenn Sie das Tool **'jq'** auf Ihrem Server installiert haben, können Sie die Ausgabe weiterhin formatiert anzeigen lassen, indem Sie **'| jq '.Policy | fromjson''** anhängen:

```bash
aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com | jq '.Policy | fromjson'
```

Durch das Setzen eines Buckets auf **"Read Only"** können Sie die Möglichkeit zur Erstellung oder Bearbeitung von Objekten im Bucket einschränken und gleichzeitig den Abruf von bestehenden Objekten ermöglichen. Stellen Sie sicher, dass Sie die Policy entsprechend Ihren Anforderungen anpassen und sicherstellen, dass die gewünschten Berechtigungen gewährt oder verweigert werden.

{{% alert title="Info" %}}
Die oben beschriebenen Beispiele sind allgemeine Anleitungen. Die genauen Optionen können je nach Konfiguration variieren.
{{% /alert %}}

### Schritt 4: Prüfen, ob das Bucket auf Read-Only gesetzt ist

Um sicherzustellen, dass das Bucket tatsächlich im Read-Only-Modus ist und keine Objekte mehr hochgeladen werden können, können Sie den folgenden Befehl verwenden:

```bash
aws s3api put-object --bucket <bucketname> --key testfile.txt --body /path/to/local/file.txt --endpoint-url=https://<endpoint-url>
```
Hier sollten Sie nun eine Meldung mit **"Access Denied"** bekommen.