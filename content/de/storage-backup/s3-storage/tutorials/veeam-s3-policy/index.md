---
title: "Erstellen einer sicheren Veeam-Policy für die S3-Verbindung"
linkTitle: "Veeam S3-Policy"
type: "docs"
weight: 140
date: "2024-02-07"
---

In diesem Abschnitt erfahren Sie, wie Sie eine sichere IAM-Richtlinie erstellen können, um eine Verbindung zu Ihrem S3-Bucket herzustellen, in dem Backup-Daten für das Veeam Backup Object Repository gespeichert werden. Bitte folgen Sie den nachstehenden Anweisungen entsprechend Ihrem gewählten Ansatz: Verwendung von nicht-veränderlichen (Non-Immutable) oder veränderlichen (Immutable) Buckets.

Sie können in ihrem S3-Account unter Groups → Gruppenname die Richtlinie einer Gruppe verändern.
Wählen Sie hierbei die gewünschte Gruppe aus und klicken Sie auf S3 group policy.
Wählen Sie nun "Custom" aus und kopieren Sie eine der beiden folgenden Policies.

### Non-Immutable Buckets

Für die Verwendung von Non-Immutable Buckets verwenden Sie bitte die folgende JSON-Richtlinie zur Erstellung einer Gruppen-Policy. Diese Berechtigungen ermöglichen dem Veeam Backup Service den Zugriff auf das S3-Repository, um Daten in ein Object Repository zu speichern oder daraus zu laden.

{{% alert title="Info" %}}
Ab Veeam Backup & Replication 11a ist die Berechtigung **"ListAllMyBuckets"** nicht mehr erforderlich, wenn Sie den Bucket-Namen manuell im Schritt **"Bucket"** des Wizards für das neue Object Repository eingeben.
{{% /alert %}}

```json
{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:GetBucketLocation",
                "s3:GetBucketVersioning",
                "s3:GetBucketObjectLockConfiguration"
            ],
            "Resource": [
                "arn:aws:s3:::yourbucketname/*",
                "arn:aws:s3:::yourbucketname"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets",
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
```

**Ersetzen Sie dabei "yourbucketname" durch den tatsächlichen Namen Ihres Buckets. Beachten Sie, dass die Berechtigung "ListAllMyBuckets" ab Veeam Backup & Replication 11a nicht mehr erforderlich ist, wenn Sie den Bucket-Namen manuell im Wizard angeben.**

### Immutable Buckets

Für die Verwendung von veränderlichen Buckets verwenden Sie bitte die folgende JSON-Richtlinie zur Erstellung einer IAM-Richtlinie. Diese Berechtigungen ermöglichen dem Veeam Backup Service den Zugriff auf das S3-Repository, um Daten in ein Objekt-Repository zu speichern oder daraus zu laden.

{{% alert title="Info" %}}
Ab Veeam Backup & Replication 11a ist die Berechtigung **"ListAllMyBuckets"** nicht mehr erforderlich, wenn Sie den Bucket-Namen manuell im Schritt **"Bucket"** des Wizards für das neue Objekt-Repository eingeben.
{{% /alert %}}

```json
{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetBucketVersioning",
                "s3:GetBucketObjectLockConfiguration",
                "s3:ListBucketVersions",
                "s3:GetObjectVersion",
                "s3:GetObjectRetention",
                "s3:GetObjectLegalHold",
                "s3:PutObjectRetention",
                "s3:PutObjectLegalHold",
                "s3:DeleteObjectVersion"
            ],
            "Resource": [
                "arn:aws:s3:::yourbucketname/*",
                "arn:aws:s3:::yourbucketname"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets",
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
```

**Ersetzen Sie dabei "yourbucketname" durch den tatsächlichen Namen Ihres Buckets. Beachten Sie, dass die Berechtigung "ListAllMyBuckets" ab Veeam Backup & Replication 11a nicht mehr erforderlich ist, wenn Sie den Bucket-Namen manuell im Wizard angeben.**
