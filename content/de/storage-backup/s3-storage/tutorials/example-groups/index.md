---
title: "Beispiel-Standardgruppen für das S3 User Management"
linkTitle: "Beispiel-Standardgruppen"
type: "docs"
weight: 110
date: "2024-02-07"
---

In diesem Abschnitt zeigen wir Ihnen einige **Beispiel-Standardgruppen**, die Sie für das S3 User Management erstellen können. Diese Gruppen dienen dazu, verschiedene Zugriffsebenen für Benutzer in Ihrer S3-Umgebung zu definieren. Bitte beachten Sie, dass die tatsächlichen Namen der Gruppen, Berechtigungen und Benutzer je nach Ihren spezifischen Anforderungen und Organisationsstruktur variieren können.

{{% alert title="Info" %}}
Diese Beispiel-Standardgruppen dienen als Ausgangspunkt und können an die Anforderungen Ihrer Organisation angepasst werden. Sie bieten eine grundlegende Vorlage für gängige Szenarien im S3-User-Management unter Verwendung vom plusserver S3 Service. Für detaillierte Informationen über die AWS-S3-Berechtigungsrichtlinien und deren Konfiguration empfehlen wir Ihnen dringend, die offizielle [AWS-Dokumentation zur S3-Zugriffsverwaltung](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html) zu lesen. Zusätzlich finden Sie spezifische Informationen und Empfehlungen zur Zugriffsverwaltung in StorageGrid in der [Verwendung von Bucket- und Gruppenzugriffsrichtlinien](https://docs.netapp.com/de-de/storagegrid-117/s3/bucket-and-group-access-policies.html). Diese Ressourcen bieten detaillierte Einblicke in die verfügbaren Aktionen, Ressourcen und Konfigurationsmöglichkeiten, die Ihnen ermöglichen, Zugriffskontrollen gemäß den individuellen Bedürfnissen Ihres Unternehmens zu gestalten. Sie können auch die [AWS-Richtlinienerstellung](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) verwenden, um benutzerdefinierte Berechtigungsrichtlinien zu erstellen, die präzise auf Ihre Anforderungen zugeschnitten sind.
{{% /alert %}}

### Gruppe mit Zugriff auf bestimmte Buckets

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::bucket1/*",
        "arn:aws:s3:::bucket2/*"
      ]
    }
  ]
}
```

### Gruppe mit Leserechten für bestimmte Buckets

```json

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::bucket3/*",
        "arn:aws:s3:::bucket4/*"
      ]
    }
  ]
}
```

### Gruppe mit Zugriff auf bestimmte Ordner in Buckets

```json

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::bucket5/folder1/*",
        "arn:aws:s3:::bucket6/folder2/*"
      ]
    }
  ]
}
```

### Beispieladministrationsgruppe mit Zugriff auf alle Buckets mit ausgewählten Aktionen

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy"
      ],
      "Resource": "*"
    }
  ]
}
```
