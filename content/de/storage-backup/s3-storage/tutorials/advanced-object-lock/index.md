---
title: "Erweitertes Object-Lock: Versioning & Retention"
linkTitle: "Erweiterte Object-Lock Funktionen"
type: "docs"
weight: 60
date: "2024-02-07"
---

# Inhaltsverzeichnis

1. [Object-Lock mit Versioning und unterschiedlichen Retention-Richtlinien](#object-lock-mit-versioning-und-unterschiedlichen-retention-richtlinien)
2. [Standardmäßig alle Objekte in einem Bucket mit einer Retention versehen](#standardmäßig-alle-objekte-in-einem-bucket-mit-einer-retention-versehen)
3. [Object Lock Retention verlängern](#object-lock-retention-verlängern)

## Object-Lock mit Versioning und unterschiedlichen Retention-Richtlinien

In diesem Abschnitt erfahren Sie, wie Sie in S3 Objekte mit verschiedenen Versionen hochladen und dabei unterschiedliche Object Lock-Richtlinien und Retention-Richtlinien festlegen können. Das Object Lock-Feature ermöglicht es Ihnen, Objekte vor versehentlichen Änderungen oder Löschungen zu schützen, während das Versioning die Speicherung verschiedener Versionen desselben Objekts ermöglicht.

### Schritt 1: Objekte mit Versioning hochladen

Verwenden Sie den Befehl `aws s3 cp`, um eine oder mehrere Versionen desselben Objekts in Ihr Bucket hochzuladen:

```bash
aws s3 cp <lokaler-dateipfad> s3://<bucketname>/<ziel-dateipfad> --endpoint-url=https://<endpoint>
```

Erklärung der Variablen:

- \<lokaler-dateipfad>: Der Pfad zur Datei auf Ihrem Computer.
- \<bucketname>: Der Name Ihres Buckets.
- \<ziel-dateipfad>: Der gewünschte Speicherort und Name des Objekts im Bucket.
- \<endpoint>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3 cp mydocument.pdf s3://myversionedbucket/documents/mydocument.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 2: Festlegen der Object Lock- und Retention-Richtlinien

Verwenden Sie den folgenden Befehl, um Object Lock und Retention-Richtlinien für eine bestimmte Version des Objekts festzulegen:

```bash
aws s3api put-object-retention --bucket <bucketname> --key <ziel-dateipfad> --version-id <versions-id> --retention '{"Mode": "<retention-Modus>", "RetainUntilDate": "<zeitstempel>"}' --endpoint-url=https://<endpoint>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets.
- \<ziel-dateipfad>: Der Pfad des Objekts im Bucket.
- \<versions-id>: Die Versions-ID der spezifischen Version des Objekts.
- \<retention-Modus>: Der gewünschte Object-Lock Mode: Governance/Compliant
- \<zeitstempel>: Das Datum und die Uhrzeit, bis zu der das Objekt gesperrt sein soll.

**Beispiel:**

```bash
aws s3api put-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --version-id fe11c7b4-eeae-f76f-a6ff-1402ec8ef430 --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "2023-08-11T17:45:59Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Durch die Kombination von Object Lock und Versioning können Sie unterschiedliche Versionen desselben Objekts mit verschiedenen Schutzmaßnahmen versehen. Stellen Sie sicher, dass Sie die richtigen Werte für Object Lock, Versioning und Retention entsprechend Ihrer Anforderungen und Ihrer Konfiguration verwenden.

{{% alert title="Info" %}} Das oben beschriebene Beispiel ist eine allgemeine Anleitung. Die genauen Optionen können je nach Ihrer Konfiguration variieren.
{{% /alert %}}

### Schritt 3: Überprüfen der Object Lock- und Retention-Richtlinien

Um zu überprüfen, ob das Objekt mit Object Lock und den festgelegten Retention-Richtlinien gesichert ist, verwenden Sie den folgenden Befehl:

```bash
aws s3api get-object-retention --bucket <bucketname> --key <ziel-dateipfad> --version-id <versions-id> --endpoint-url=https://<endpoint>
```

{{% alert title="Info" %}}
Die Ausgabe des Befehls zeigt Ihnen die aktuelle Object Lock- und Retention-Richtlinie für das angegebene Objekt an. Dies kann Ihnen helfen, sicherzustellen, dass die gewünschten Schutzmaßnahmen korrekt angewendet wurden.

Bitte beachten Sie, dass die genauen Werte in der Ausgabe je nach Ihren Einstellungen variieren können. Stellen Sie sicher, dass die Ausgabe Ihren Erwartungen entspricht, um sicherzustellen, dass Ihre Object Lock- und Retention-Richtlinien korrekt konfiguriert sind.
{{% /alert %}}
**Beispielausgabe bei einer Objekt-Version, welche mit Object-Lock versehen ist:**

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-11T17:45:59+00:00"
    }
}
```

**Beispielausgabe bei einem Objekt, bei welcher kein Object-Lock gesetzt ist:**

```bash
An error occurred (NoSuchObjectLockConfiguration) when calling the GetObjectRetention operation: The specified object does not have an ObjectLock configuration
```

## Standardmäßig alle Objekte in einem Bucket mit einer Retention versehen

In diesem Abschnitt erfahren Sie, wie Sie alle Objekte in einem Bucket standardmäßig mit einer Retention versehen können. Durch diese Maßnahme werden alle hochgeladenen Objekte automatisch mit einer festgelegten Object Lock-Retention geschützt.

### Schritt 1: Standard-Retention für den Bucket festlegen

Verwenden Sie den Befehl `aws s3api put-object-lock-configuration`, um eine standardmäßige Object Lock-Retention für den gesamten Bucket festzulegen:

```bash
aws s3api put-object-lock-configuration --bucket <bucketname> --object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "<retention-modus>", "Days": <tage> }}}' --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, für den Sie die standardmäßige Object Lock-Retention aktivieren möchten.
- \<retention-modus>: Der gewünschte Retention-Modus (GOVERNANCE oder COMPLIANCE), der für alle hochgeladenen Objekte standardmäßig angewendet werden soll.
- \<tage>: Die Anzahl der Tage, für die die Retention standardmäßig festgelegt werden soll.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-object-lock-configuration --bucket mylockedbucket --object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE", "Days": 1}}}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Durch die Ausführung dieses Befehls wird eine standardmäßige Object Lock-Retention festgelegt, die für alle neu hochgeladenen Objekte in diesem Bucket angewendet wird. Die Objekte werden automatisch mit der festgelegten Retention geschützt, sobald sie hochgeladen werden. In diesem Beispiel würden die Objekte 1 Tag lang mit einem Governance Object-Lock versehen werden.

{{% alert title="Info" %}}
Stellen Sie sicher, dass Sie die Werte für \<bucketname>, \<tage> und \<mode> entsprechend Ihren Anforderungen anpassen. Die standardmäßige Retention-Richtlinie wird auf alle Objekte im Bucket angewendet, die nicht bereits eine individuelle Retention haben.
{{% /alert %}}

### Schritt 2: Auslesen der Bucket-Regel für Object Lock-Retention

Verwenden Sie den Befehl aws s3api get-object-lock-configuration, um die aktuelle Bucket-Regel für die Object Lock-Retention auszulesen:

```bash
aws s3api get-object-lock-configuration --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, für den Sie die Bucket-Regel auslesen möchten.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-object-lock-configuration --bucket mylockedbucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Beispielausgabe:**

```json
{
    "ObjectLockConfiguration": {
        "ObjectLockEnabled": "Enabled",
        "Rule": {
            "DefaultRetention": {
                "Mode": "GOVERNANCE",
                "Days": 1
            }
        }
    }
}
```

### Schritt 3: Hochladen eines Objekts und Überprüfen der standardmäßigen Object Lock-Retention

Verwenden Sie den Befehl aws s3api put-object, um ein Objekt in das Bucket hochzuladen.

```bash
aws s3api put-object --bucket <bucketname> --key <ziel-dateipfad> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in den Sie das Objekt hochladen möchten.
- \<ziel-dateipfad>: Der gewünschte Speicherort und Name des Objekts im Bucket.
- \<lokaler-dateipfad>: Der Pfad und Name der lokalen Datei, die hochgeladen werden soll.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /pfad/zu/meinobjekt.pdf --endpoint-url=https://s3.de-west
```

### Schritt 4: Überprüfen der standardmäßigen Object Lock-Retention für das hochgeladene Objekt

Um zu überprüfen, ob das Objekt mit Object Lock und den festgelegten Retention-Richtlinien gesichert ist, verwenden Sie den folgenden Befehl:

```bash
aws s3api get-object-retention --bucket <bucketname> --key <ziel-dateipfad> --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets.
- \<ziel-dateipfad>: Der Pfad des Objekts im Bucket.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Durch das Aktivieren der standardmäßigen Object Lock-Retention können Sie sicherstellen, dass alle in das Bucket hochgeladenen Objekte automatisch mit der gewünschten Retention versehen werden. Stellen Sie sicher, dass Sie die korrekten Werte für die Retention-Modi und die Anzahl der Tage angeben, um Ihre Anforderungen zu erfüllen.

## Object Lock Retention verlängern

In diesem Abschnitt erfahren Sie, wie Sie die Retention Time eines Objekts mit aktiviertem Object Lock verlängern können.

### Schritt 1: Hochladen eines Objekts mit Object Lock

Beginnen Sie damit, ein Objekt mit einer Beispielweise 1-stündigen Object-Lock-Governance Option hochzuladen.

```bash
aws s3api put-object --bucket <bucketname> --key <objekt-key> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in den Sie das Objekt hochladen möchten.
- \<objekt-key>: Der gewünschte Speicherort und Name des Objekts im Bucket.
- \<lokaler-dateipfad>: Der Pfad und Name der lokalen Datei, die hochgeladen werden soll.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /pfad/zu/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"
```

### Schritt 2: Anzeige der Retention

Überprüfen Sie die aktuelle Retention des hochgeladenen Objekts.

```bash
aws s3api get-object-retention --bucket <bucketname> --key <objekt-key> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in dem sich das Objekt befindet.
- \<objekt-key>: Der Pfad und Name des Objekts im Bucket.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Beispielausgabe:**

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T08:58:34+00:00"
    }
}
```

### Schritt 3: Retention verlängern

Verlängern Sie die Retention des hochgeladenen Objekts um eine weitere Stunde.

```bash
aws s3api put-object-retention --bucket <bucketname> --key <objekt-key> --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "<neues-datum>"}' --endpoint-url=<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in dem sich das Objekt befindet.
- \<objekt-key>: Der Pfad und Name des Objekts im Bucket.
- \<neues-datum>: Das neue Datum und die Uhrzeit, bis zu der die Retention verlängert werden soll.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api put-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "2023-08-14T09:58:34Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 4: Anzeige der neuen Retention

Überprüfen Sie die aktualisierte Retention des Objekts, um sicherzustellen, dass sie erfolgreich verlängert wurde.

```bash
aws s3api get-object-retention --bucket <bucketname> --key <objekt-key> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

- \<bucketname>: Der Name des Buckets, in dem sich das Objekt befindet.
- \<objekt-key>: Der Pfad und Name des Objekts im Bucket.
- \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Beispielausgabe:**

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T09:58:34+00:00"
    }
}
```

Durch das Aktivieren der standardmäßigen Object Lock-Retention können Sie sicherstellen, dass alle in das Bucket hochgeladenen Objekte automatisch mit der gewünschten Retention versehen werden. Stellen Sie sicher, dass Sie die korrekten Werte für die Retention-Modi und die Anzahl der Tage angeben, um Ihre Anforderungen zu erfüllen.
