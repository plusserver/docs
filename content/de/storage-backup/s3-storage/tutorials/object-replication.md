---
title: "Replizierung von Objekten zwischen Buckets"
linkTitle: "Objekt-Replikation"
type: "docs"
weight: 100
date: "2024-02-07"
---

Manchmal ist es notwendig, den gesamten Inhalt eines Buckets auf ein neues Bucket zu übertragen und sicherzustellen, dass diese Übertragung auch aktuell gehalten wird. AWS bietet das Befehlszeilen-Tool `aws s3 sync` an, das Ihnen dabei hilft, diese Art der Replizierung zwischen S3-Buckets durchzuführen.

### Schritt 1: Objekte zwischen Buckets synchronisieren

```bash
aws s3 sync s3://<quelle-bucket> s3://<ziel-bucket> --endpoint-url=https://<endpoint-url>
```

Erklärung der Variablen:

* \<quelle-bucket>: Der Name des Quell-Buckets.
* \<ziel-bucket>: Der Name des Ziel-Buckets.
* \<endpoint-url>: Der entsprechende Endpunkt für Ihren plusserver S3 Service.

**Beispiel:**

```bash
aws s3 sync s3://mein-quell-bucket s3://mein-ziel-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Schritt 2: Automatische Aktualisierung

Damit die Replizierung zwischen den Buckets aktuell bleibt, können Sie den `aws s3 sync` Befehl in regelmäßigen Abständen ausführen. Dies kann beispielsweise durch Planen eines Cron-Jobs oder das Verwenden von Tools erreicht werden.

### Schritt 3: Beispiel für die automatische Aktualisierung

Sie können einen Cron-Job einrichten, um den aws s3 sync-Befehl in regelmäßigen Abständen auszuführen. 
Hier ist eine Beispiel-Crontab, wie Sie den Befehl stündlich ausführen können:

```bash
0 * * * * aws s3 sync s3://mein-quell-bucket s3://mein-ziel-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Dieses Beispiel führt den Befehl jede Stunde aus, um sicherzustellen, dass die Replizierung zwischen den Buckets aktuell bleibt.

### Schritt 4: Syncen mit Übernahme der Objekt-Lock Retention (Optional)

Um eine Option zum Synchronisieren von Objekten zwischen Buckets mit Übernahme der Object Lock Retention zu implementieren, können Sie das folgende **Beispiel-Skript** verwenden. Beachten Sie, dass dies ein einfaches **Beispiel** ist und es auch andere Möglichkeiten gibt, dies zu erreichen. In diesem Skript werden die AWS CLI-Befehle verwendet, um Dateien vom Quell-Bucket zum Ziel-Bucket zu synchronisieren. Wenn ein Objekt Object Lock hat, wird die Object Lock Retention-Konfiguration ebenfalls auf das synchronisierte Objekt im Ziel-Bucket übertragen.

**Beispiel:**

Angenommen, Sie haben ein Quell-Bucket mit dem Namen "sourcebucket" und ein Ziel-Bucket mit dem Namen "destbucket". Sie können das Skript wie folgt ausführen:

```bash
#!/bin/bash

source_bucket="sourcebucket"
dest_bucket="destbucket"

# Dateien vom source_bucket zum dest_bucket synchronisieren
aws s3 sync s3://$source_bucket/ s3://$dest_bucket/

# Liste der Dateien im source_bucket
files=$(aws s3 ls s3://$source_bucket/ --recursive | awk '{print $4}')

for file in $files; do
  # Prüfen, ob das aktuelle Objekt Object Lock hat
  object_lock_config=$(aws s3api get-object-retention --bucket $source_bucket --key $file 2>/dev/null)
   
  if [ -n "$object_lock_config" ]; then
    # Object Lock-Konfiguration auf das synchronisierte Objekt im dest_bucket setzen
    retention_config=$(echo "$object_lock_config" | jq -r '.Retention')
    aws s3api put-object-retention --bucket $dest_bucket --key $file --retention "$retention_config"
    echo "Objekt $file synchronisiert und Object Lock-Konfiguration übertragen"
  else
    echo "Objekt $file synchronisiert"
  fi
done
```

Das Skript könnten Sie dann beispielsweise so ausführen:

```bash
./sync_with_object_lock.sh
```

Dieses Skript wird die Dateien vom Quell-Bucket zum Ziel-Bucket synchronisieren und dabei die Object Lock Retention-Konfiguration für synchronisierte Objekte im Ziel-Bucket übernehmen, sofern vorhanden. Beachten Sie, dass Sie das Skript an Ihre spezifischen Anforderungen anpassen müssen und nur als **Beispiel** dienen soll.