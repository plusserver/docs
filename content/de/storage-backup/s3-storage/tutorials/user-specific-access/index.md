---
title: "S3-Bucket nur für speziellen Benutzer freigeben"
linkTitle: "Benutzerspezifischer Zugriff"
type: "docs"
weight: 80
date: "2024-02-07"
---

In diesem Abschnitt erfahren Sie, wie Sie einen S3-Bucket so konfigurieren können, dass nur ein spezieller Benutzer Zugriff auf ihn hat. Dies ermöglicht es, die Zugriffssteuerung auf granularer Ebene zu verfeinern und den Zugriff auf den Bucket auf einen bestimmten Benutzer zu beschränken.

### Schritt 1: Vorbereitung der Informationen

Um eine Policy dieser Art anlegen zu können, benötigen Sie eine Reihe an Informationen:

| Variable    | Erklärung                                                                                                                                                  | Beispielwert       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| ACCOUNT_ID  | Die Account ID, die Sie bereits verwendet haben, um sich auf dem S3 User Portal anzumelden. Diese können Sie auch auf dem Dashboard einsehen (siehe Bild). | 700001145864652591 |
| BUCKET_NAME | Der Name der Buckets, dessen Zugriff durch diese Policy reguliert wird.                                                                                    | beispielbucket     |
| USERNAME    | Der Nutzername des jeweiligen Nutzers, für den eine granulare Zugriffsrichtlinie angelegt werden soll.                                                     | mmustermann        |

{{< img src="images/image-1.png" alt="ACCOUNTID" >}}

### Schritt 2: Erstellen der Bucket Policy

Policies lassen sich in der Regel durch .json Objekte definieren. In diesem Fall legen Sie eine `user-policy.json` an und ersetzen Sie die entsprechenden Variablen durch die im letzten Schritt gesammelten Informationen.

**user-policy.json:**

```json
{
  "Version": "2012-10-17",
  "Id": "UserBucketPolicy",
  "Statement": [
    {
      "Sid": "AllowUserAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "DenyOtherAccess",
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    }
  ]
}
```

Daraus ergibt sich in diesem Beispiel folgende Policy:
user-policy.json:

```json
{
  "Version": "2012-10-17",
  "Id": "UserBucketPolicy",
  "Statement": [
    {
      "Sid": "AllowUserAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::700001145864652591:user/mmustermann"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::shop-thumbnails",
        "arn:aws:s3:::shop-thumbnails/*"
      ]
    },
    {
      "Sid": "DenyOtherAccess",
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": "arn:aws:iam::700001145864652591:user/mmustermann"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::shop-thumbnails",
        "arn:aws:s3:::shop-thumbnails/*"
      ]
    }
  ]
}
```

### Schritt 3: Setzen der Bucket-Policy

```bash
aws s3api put-bucket-policy --bucket <bucketname> --policy file://user-policy.json --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, dessen Policy Sie überprüfen \* \möchten.
- \<policy-name>: Der Name der von Ihnen angelegten Policy-Datei.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-bucket-policy --bucket shop-thumbnails --policy file://user-policy.json --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 4: Überprüfen der Bucket-Policy

Verwenden Sie den Befehl aws s3api get-bucket-policy, um zu überprüfen, dass die gewünschte Policy gesetzt wurde:

```bash
aws s3api get-bucket-policy --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, dessen Policy Sie überprüfen möchten.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-bucket-policy --bucket shop-thumbnails --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Nach dem Ausführen dieses Befehls sollte die Ausgabe mit der von Ihnen festgelegten Policy abgeglichen werden und im Idealfall identisch sein.
