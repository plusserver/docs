---
title: "Anlegen von Buckets mit der AWS CLI - Optional mit Aktivierung von Object Lock"
linkTitle: "Anlegen von Buckets"
type: "docs"
weight: 20
date: "2024-02-07"
---

Die AWS CLI ermöglicht es Ihnen, komfortabel über die Kommandozeile mit Ihren plusserver S3-Ressourcen zu interagieren. Folgen Sie den Schritten unten, um Buckets anzulegen und gegebenenfalls Object Lock zu aktivieren.

{{% alert title="Info" %}}
Achtung: Nur bei der initialen Bucket-Erstellung kann man Object Lock aktivierung. Ein nachträgliches Aktivieren oder Ausschalten von Object Lock in einem bereits bestehenden Bucket ist technologisch nicht möglich.

**WICHTIG:** Sollten Sie doch einmal nachträglich Object Lock fpr ein bereits erstelltes Bucket ein oder ausschalten wollen, müssen Sie ein neues Bucket mit Ihrer Object-Lock-Einstellung erstellen und dann alle Object-Daten vom alten Bucket in dieses neue Bucket kopieren.
{{% /alert %}}

### Schritt 1: Anlegen eines Buckets

Um ein Bucket anzulegen, verwenden Sie folgenden Befehl:
```bash
aws s3api create-bucket --bucket <bucketname> --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```
Ersetzen Sie `<bucketname>` durch den gewünschten Namen für Ihr Bucket und `<endpoint-url>` durch den entsprechenden Endpunkt. Bei Verwendung von de-west-1 wäre es beispielsweise:
```bash
aws s3api create-bucket --bucket mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```

{{% alert title="Info" %}}
Jeder S3-Bucket-Name muss eindeutig sein und darf nur einmal global im plusserver S3 Service existieren – nicht nur pro Kunde, sondern innerhalb der gesamten plusserver S3-Umgebung.
Wenn der gewählte Name bereits von irgendeinem Kunden in Verwendung ist, wird Ihnen die folgende Fehlermeldung angezeigt:
```bash
An error occurred (BucketAlreadyOwnedByYou) when calling the CreateBucket operation: Your previous request to create the named bucket succeeded and you already own it.
```
bzw
```bash
An error occurred (BucketAlreadyExists) when calling the CreateBucket operation: The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.
```
{{% /alert %}}
{{% alert title="Info" %}}
Beachten Sie, dass bei Verwendung von de-west-1 die Objekte im Rechenzentrum in Köln gespeichert werden und bei Verwendung von de-north-2 die Objekte in Hamburg landen.
Der Endpunkt für Köln ist dabei s3.de-west-1.psmanaged.com.
Der Endpunkt für Hamburg ist dabei s3.de-north-2.psmanaged.com.

**WICHTIG:** Für eine optimale Performance sollte ein Objekt immer über den passenden Endpunkt abgelegt und aufgerufen werden.
{{% /alert %}}

### Schritt 2: Anlegen eines Buckets bei Aktivierung von Object Lock und Versioning

Wenn Sie Object Lock verwenden möchten, müssen Sie sowohl Versioning als auch Object Lock aktivieren. Verwenden Sie dazu den folgenden Befehl:

Der Parameter "--object-lock-enabled-for-bucket" aktiviert automatisch Versionierung sowie Object-Lock.
```bash
aws s3api create-bucket --bucket <bucketname> --object-lock-enabled-for-bucket --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```
Ersetzen Sie `<bucketname>` und `<endpoint-url>` entsprechend. Zum Beispiel:
```bash
aws s3api create-bucket --bucket mylockedbucket --object-lock-enabled-for-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```
### Schritt 3: Überprüfen der Einstellungen eines Buckets

Verwenden Sie den Befehl aws s3api get-bucket-versioning, um die Versionierungseinstellungen eines Buckets anzuzeigen:
```bash
aws s3api get-bucket-versioning --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```
Dieser Befehl zeigt an, ob die Versionierung für das angegebene Bucket aktiviert ist.

Beispielausgabe:
```bash
{
    "Status": "Enabled"
}
```
{{% alert title="Info" %}}
Bei deaktivierter Versionierung erhalten Sie keine Ausgabe!

Sollten Sie ausschließlich das Bucket Feature "Versionierung" wünschen, so können Sie diese nachträglich aktivieren. Siehe hierzu [Versionierung in S3](../versioning-in-s3).
{{% /alert %}}
Um die Object Lock-Einstellungen zu überprüfen, verwenden Sie den Befehl aws s3api get-object-lock-configuration:
```bash
aws s3api get-object-lock-configuration --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```
Dieser Befehl gibt Auskunft darüber, ob Object Lock für das angegebene Bucket aktiviert ist.

Beispielausgabe bei aktiviertem Objekt Lock:
```bash
{
    "ObjectLockConfiguration": 
    {
        "ObjectLockEnabled": "Enabled"
    }
}
```
Beispielausgabe bei nicht aktiviertem Objekt Lock:
```bash
An error occurred (ObjectLockConfigurationNotFoundError) when calling the GetObjectLockConfiguration operation: Object Lock configuration does not exist for this bucket
```