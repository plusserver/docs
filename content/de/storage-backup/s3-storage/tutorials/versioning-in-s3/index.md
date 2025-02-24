---
title: "Versionierung in S3"
linkTitle: "Versionierung in S3"
type: "docs"
weight: 40
date: "2024-02-07"
---

In S3 können Sie von Versioning profitieren, indem Sie verschiedene Versionen desselben Objekts in einem Bucket speichern. Dies gewährleistet zusätzliche Datensicherheit und Wiederherstellungsoptionen.

## Schritt 0: Erstellung eines Buckets mit aktivierter Versionierung (ohne Object Lock)

Sofern Sie über kein Bucket mit Versionierung verfügen, welchen Sie in diesem Beispiel nutzen können/wollen, so können Sie folgenden Command nutzen, um ein Bucket mit Versionierung zu erstellen.

```bash
aws s3api create-bucket --bucket <bucket-name> --region <region> --create-bucket-configuration LocationConstraint=<region> --endpoint-url=https://<endpoint>
```

Anschließend müssen Sie das Versioning mit folgendem Befehl aktivieren. Dies kann selbstverständlich bei bereits existierenden Buckets mit Objekten ebenfalls verwendet werden.

```bash
aws s3api put-bucket-versioning --bucket <bucket-name> --versioning-configuration Status=Enabled --endpoint-url=https://<endpoint>
```

Sofern Sie für ihr Bucket die Funktion Object-Lock verwenden, so ist die Funktion Versionierung automatisch aktiviert. Im folgenden Beispiel erfahren Sie, wie Sie Objekte hochladen, neue Versionen erstellen und auf frühere Versionen zugreifen können.

## Schritt 1: Hochladen eines Objekts

Verwenden Sie den Befehl aws s3 cp, um ein Objekt in Ihr Bucket hochzuladen:

```bash
aws s3 cp <lokaler-dateipfad> s3://<bucketname>/<ziel-dateipfad> --endpoint-url=https://<endpoint>
```

- \<lokaler-dateipfad>: Der Pfad zur Datei auf Ihrem Computer, die hochgeladen werden soll.
- \<bucketname>: Der Name Ihres Buckets.
- \<ziel-dateipfad>: Der gewünschte Speicherort und Name des hochgeladenen Objekts im Bucket.
- \<endpoint>: Der entsprechende Endpunkt für Ihren plusserver S3.

## Schritt 2: Überschreiben des Objekts

Laden Sie eine aktualisierte Version des gleichen Objekts mit folgendem Befehl hoch:

```bash
aws s3 cp <neue-lokaler-dateipfad> s3://<bucketname>/<ziel-dateipfad> --endpoint-url=https://<endpoint>
```

Dabei muss der Ziel-Dateipfad identisch mit dem Pfad aus Schritt 1 sein.

## Schritt 3: Zugriff auf frühere Versionen

Um auf frühere Versionen des Objekts zuzugreifen, verwenden Sie die Versions-ID, die von S3 generiert wurde. Nutzen Sie den folgenden Befehl, um die Versions-ID anzuzeigen:

```bash
aws s3api list-object-versions --bucket <bucketname> --prefix <ziel-dateipfad> --endpoint-url=https://<endpoint>
```

- \<bucketname>: Der Name Ihres Buckets.
- \<ziel-dateipfad>: Der Speicherort und Name des Objekts im Bucket.

Wählen Sie die gewünschte Versions-ID aus der angezeigten Liste.

**Beispielausgabe:**

```json
{
    "Versions": [
        {
            "ETag": "\"66b45f0d975835364c3ddba89be46516\"",
            "Size": 57,
            "StorageClass": "STANDARD",
            "Key": "testfile",
            "VersionId": "fe11c7b4-e63c-f2df-bd54-1402ec8ef4c8",
            "IsLatest": true,
            "LastModified": "2023-08-11T13:29:30.098000+00:00",
            "Owner": {
                "ID": "2bf748417f89cbbca94465e9121a2507"
            }
        },
        {
            "ETag": "\"40375ddc11cbe7f92789df9e8f73fb41\"",
            "Size": 40,
            "StorageClass": "STANDARD",
            "Key": "testfile",
            "VersionId": "fe11c7b4-eeae-f76f-a6ff-1402ec8ef430",
            "IsLatest": false,
            "LastModified": "2023-08-11T13:29:15.929000+00:00",
            "Owner": {
                "ID": "2bf748417f89cbbca94465e9121a2507"
            }
        }
    ]
}
```

## Schritt 4: Herunterladen einer früheren Version

Verwenden Sie die Versions-ID, um eine bestimmte Version des Objekts herunterzuladen:

```bash
aws s3 cp s3://<bucketname>/<ziel-dateipfad>?versionId=<versions-id> <lokaler-dateipfad> --endpoint-url=https://<endpoint>
```

- \<bucketname>: Der Name des Buckets.
- \<ziel-dateipfad>: Der Speicherort und Name des Objekts im Bucket.
- \<versions-id>: Die ausgewählte Versions-ID.
- \<lokaler-dateipfad>: Der Pfad auf Ihrem Computer, unter dem die heruntergeladene Datei gespeichert werden soll.

Durch die Kombination von Object Lock und automatischem Versionierung haben Sie die Möglichkeit, auf frühere Zustände von Objekten zuzugreifen und Ihre Daten vor versehentlichen Änderungen zu schützen.

## Schritt 5: Löschen von Objekten mit Versionierung

Beim plusserver S3-Service kann das Löschen von Objekten je nach Versionierungseinstellungen etwas komplexer sein. Hier erläutern wir Ihnen, wie Sie Objekte mit Versionierung korrekt löschen können.

### Verwendung von Variablen

Um Objekte in einem versionierten Bucket zu löschen, können Sie den folgenden Befehl verwenden:

```bash
aws s3api delete-objects --bucket "<bucketname>" --delete "$(aws s3api list-object-versions --bucket "<bucketname>" --output=json | jq '{Objects: [.Versions[] | {Key: .Key, VersionId: .VersionId}], Quiet: false}')"
```

Bitte beachten Sie, dass das korrekte Handling von Version IDs wichtig ist, um sicherzustellen, dass Sie die gewünschte Version eines Objekts löschen. Wir empfehlen, sorgfältig mit den Version IDs umzugehen, um unerwartetes Datenverhalten oder Datenverlust zu vermeiden. Das oben genannte Kommando löscht ohne Vorwarnung alle Objekte, inklusive aller Versionen eines Objekts innerhalb eines Buckets.
Erklärung der Variablen

- \<bucketname>: Der Name Ihres Buckets.

```bash
aws s3api delete-objects --bucket "test-versionierung" --delete "$(aws s3api list-object-versions --bucket "test-versionierung" --output=json | jq '{Objects: [.Versions[] | {Key: .Key, VersionId: .VersionId}], Quiet: false}')"
```
