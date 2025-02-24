---
title: "User Guide - StorageGRID SSE / SSE-C"
linkTitle: "User Guide - StorageGRID SSE / SSE-C"
type: "docs"
weight: 30
description:
---

Diese Anleitung beschreibt, wie Sie sich als plusserver Kunde auf unserem StorageGRID SSE-C und SSE nutzen und testen können. SSE-C bedeutet dabei: Serverseitige Verschlüsselung mit dem von Ihnen bereitgestellten Schlüsseln (SSE-C).

SSE ermöglicht es Ihnen, ein Objekt zu speichern und es mit einem eindeutigen Schlüssel zu verschlüsseln, der von Ihnen zusammen mit dem Objekt bereitgestellt wird. Wenn das Objekt angefordert wird, muss derselbe Schlüssel angegeben werden, um das Objekt zu entschlüsseln und zurückzugeben.

{{% alert title="Hinweis zu SSE-C" %}}
Objekte welche mit SSE-C hochgeladen wurden, können nicht via Web Oberfläche heruntergeladen werden. Dies liegt daran, dass der Key dort nicht mitgegeben werden kann.
Daher wird dies mit einem 400er Fehler zurückgegeben. Die Datei kann über den S3-Client in Kombination mit dem Encryption Key allerdings abgerufen werden.
{{% /alert %}}

{{% alert title="Hinweis zu SSE-C" %}}
Metainformationen werden NIEMALS verschlüsselt. Dies liegt unter anderem daran, dass die Objektinformationen abrufbar sein müssen im Bezug auf verschlüsselung usw.
Dies lässt sich auch nicht ändern. Die Verschlüsselung der Datei ist hiervon unberührt. (Die Metainformationen können bspw. in Step 3 angeschaut werden.
{{% /alert %}}

## How to SSE-C

### Schritt 1: Erstelle einen Encryption Key

Beispiel:

```
openssl enc -aes-128-cbc -pass pass:secret -P

salt=E9DBB6603C7B3D2A
key=23832BAC16516152E560F933F261BF03
iv =71E87C0F6EC3C45921C2754BA131A315
```

### Schritt 2: Legen Sie ein Objekt mit dem generierten Schlüssel ab

Der Parameter `--bucket` ist der Bucket-Name, für den die PUT-Aktion ausgelöst wurde.

Parameter `--key` Objektschlüssel, für den die PUT-Aktion ausgelöst wurde.

Der Parameter `--body` steht für den Pfad zu einer Datei.

Beispiel:

```
aws s3api put-object --bucket <bucket> --key <file> --body "file" --sse-customer-algorithm AES256 --sse-customer-key

23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>
```

### Schritt 3: Metadaten des Objektes anzeigen

Wenn der Customer Key nicht mitgeliefert wird, so kommt eine 404 Error Warnung zurück, statt des Objektes

```
aws s3api head-object --bucket <bucket> --key <file> --sse-customer-algorithm AES256 --sse-customer-key 23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>


            {
                "AcceptRanges": "bytes",
                "LastModified": "2022-05-02T19:20:02+00:00",
                "ContentLength": 47,
                "ETag": "\"f92ef20ab87e0e13951d9bee862e9f9a\"",
                "ContentType": "binary/octet-stream",
                "Metadata": {},
                "SSECustomerAlgorithm": "AES256",
                "SSECustomerKeyMD5": "rjGuMdjLpPV1eRuotNaPMQ=="
            }
```

### Schritt 4: Objekt wieder herunterladen

Beispiel:

```
aws s3api get-object --bucket <bucket> --key <file> <file> --sse-customer-algorithm AES256 --sse-customer-key 23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>
```

## How to SSE

Das gleiche gibt es natürlich auch ohne, das der Sie einen Key generieren müssen. StorageGrid kann diesen Key ebenfalls erzeugen und ihn nach korrekter Authentifizierung in sich selbst einspielen.
Hierfür ist folgende Anleitung.

### Schritt 1: Ein Objekt hochladen

Beispiel:

```
aws s3api put-object --bucket testbucket --key testfile --body "testfile" --server-side-encryption AES256 --endpoint-url https://de-2.s3.psmanaged.com --profile plusserver
```

### Schritt 2: Hiermit kann man sich die Metainformationen anzeigen lassen

Beispiel:

```
aws s3api head-object --bucket testbucket --key testfile --endpoint-url https://de-2.s3.psmanaged.com --profile plusserver


The following line should appear there:
    "ServerSideEncryption": "AES256",
```
