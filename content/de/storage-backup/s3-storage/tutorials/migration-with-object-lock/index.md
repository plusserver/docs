---
title: "Migrationsskript für die Migration von eines S3 Services zum plusserver S3 Service inklusive Versioning und Object-Lock"
linkTitle: "Migrationsskript mit Object Lock"
type: "docs"
weight: 140
date: "2024-02-07"
---

Diese Erweiterung unserer Dokumentation führt Sie durch die Verwendung der Migrationsskripte von plusserver für den nahtlosen Übergang von einem bestehenden S3 Service zu unserem plusserver S3 Service. Unser Skript berücksichtigt dabei wichtige Aspekte wie Versioning, Tags, Metadaten und insbesondere die essentiellen Object-Lock-Informationen.

{{% alert title="Hinweis" %}}
Damit Sie diesen Prozess erfolgreich durchführen können, benötigen Sie zwei unverzichtbare Werkzeuge: Minio und jq. Diese müssen auf Ihrem System installiert sein, um sicherzustellen, dass Ihre Daten sicher und effizient migriert werden.
{{% /alert %}}

### Schritt 1: Minio-Client installieren und einrichten

Für die Installation und Einrichtung des Minio-Clients sowie das Setzen eines Aliases können Sie die folgende kurze Anleitung verwenden:

1. Sie können den Minio-Client von der [offiziellen Website](https://dl.min.io/client/mc/release/linux-amd64/mc) herunterladen.

2. Führen Sie die folgenden Befehle aus, um den Minio-Client herunterzuladen, ausführbar zu machen und in Ihrem Pfad verfügbar zu machen:

```bash
curl https://dl.min.io/client/mc/release/linux-amd64/mc \
   --create-dirs \
   -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/
```

Überprüfen Sie die Installation, indem Sie den Befehl mc --help ausführen. Wenn der Minio-Client korrekt installiert ist, werden Sie die Hilfeanleitung sehen.

### Schritt 2: Alias setzen

Um auf Ihren plusserver S3-Dienst zuzugreifen, müssen Sie einen Alias erstellen. Ersetzen Sie ACCESS_KEY und SECRET_KEY durch Ihre tatsächlichen Zugangsdaten.

```bash
mc alias set plusserver https://s3.de-west-1.psmanaged.com ACCESS_KEY SECRET_KEY
```

Mit diesem Alias können Sie nun auf Ihren plusserver S3-Speicher zugreifen und Dateien übertragen. Wiederholen Sie dies mit Ihrem bisherigen S3 Speicher.

### Schritt 3: Überprüfen, ob Object-Lock-Daten veraltet sind

Um sicherzustellen, dass das Migrationsskript reibungslos funktioniert, ist es wichtig, sicherzustellen, dass keine abgelaufenen Object-Lock-Informationen für Ihre Objekte vorliegen. Sie können dies mit dem folgenden Befehl überprüfen:

```bash
mc retention info --recursive ALIAS/BUCKET --versions | grep "EXPIRED"
````

Ersetzen Sie `ALIAS` durch Ihren **Alias** und `BUCKET` durch den **Bucket-Namen**, den Sie überprüfen möchten.

Wenn Objekte mit abgelaufenen Object-Lock-Informationen vorhanden sind, sehen sie beispielsweise so aus:

```bash
[ GOVERNANCE EXPIRED ] fe11a6df-af76-c69f-b8d3-5cba2c687bf8 ALIAS/BUCKET/test-governance/file1.txt
```

In diesem Fall sollten Sie entweder die abgelaufenen Object-Lock-Informationen oder das betroffene Objekt löschen oder die Object-Lock-Informationen in die Zukunft verlängern. Andernfalls wird das Migrationsskript nicht erfolgreich sein und eine Fehlermeldung ausgeben, da die Retention nicht in der Vergangenheit gesetzt werden kann. Stellen Sie sicher, dass alle Objekte, die Sie migrieren möchten, gültige Object-Lock-Informationen haben.

{{% alert title="Hinweis" %}}
Die EXPIRED Warnung wird nur für Objekte angezeigt, welche den GOVERNANCE Status haben. COMPLIANCE wird leider nicht angezeigt. Diese müssen selbstständig oder in der Einzelview betrachtet werden.
{{% /alert %}}
### Schritt 3a: (Optional) Löschen von Object-Lock-Informationen

Wenn Sie die Object-Lock-Informationen eines bestimmten Objekts mit dem Minio-Client löschen möchten, können Sie das folgende Kommando verwenden:

```bash
mc retention clear ALIAS/BUCKET/PATH --version-id VERSIONID
```
Hierbei ersetzen Sie:

* **ALIAS** durch Ihren Alias für den S3-Service.
* **BUCKET** durch den Namen des Buckets, in dem sich das Objekt befindet.
* **PATH** durch den Pfad zum Objekt im Bucket.
* **VERSIONID** durch die ID der Version des Objekts, dessen Object-Lock-Informationen Sie löschen möchten.

Durch die Ausführung dieses Befehls werden die Object-Lock-Informationen für das angegebene Objekt und die angegebene Version gelöscht. Stellen Sie sicher, dass Sie die entsprechenden Berechtigungen und Autorisierungen für diese Aktion haben, da das Löschen von Object-Lock-Informationen in Ihrem S3-Service möglicherweise eingeschränkt ist.

### Schritt 4: Skript auf Ihr System speichern

Laden Sie das Migrationsskript auf Ihr System herunter. Dieses Skript wird verwendet, um Daten von Ihrem Quellprofil und Quellbucket zu Ihrem Zielprofil und Zielbucket zu migrieren.

**migration_skript.sh**
```bash

#!/bin/bash

# Prüfen, ob die erforderlichen Argumente übergeben wurden
if [ $# -ne 4 ]; then
  echo "Verwendung: $0 sourceprofil sourcebucket destinationprofil destinationbucket"
  exit 1
fi

SOURCE_PROFILE="$1"
SOURCE_BUCKET="$2"
DESTINATION_PROFILE="$3"
DESTINATION_BUCKET="$4"
LOG_FILE="migration_log.txt"

# Hilfsfunktion zur Überprüfung der Applikationen
check_application_availablility() {
  # Prüfen, ob MinIO (mc) installiert ist
  if ! command -v mc &>/dev/null; then
    echo "Fehler: MinIO (mc) ist nicht installiert."
    exit 1
  fi

  # Prüfen, ob jq installiert ist
  if ! command -v jq &>/dev/null; then
    echo "Fehler: jq ist nicht installiert."
    exit 1
  fi
}

copy_tags() {
  local version_id="$1"
  local filename="$2"

  local tags_json=$(mc tag list "$SOURCE_PROFILE/$SOURCE_BUCKET/$filename" --version-id "$version_id" --json)

  # Überprüfen, ob Tags vorhanden sind
  if [[ $tags_json == *"\"tagset\":{"* ]]; then
    # Tags aus JSON extrahieren und formatieren
    local formatted_tags=$(echo "$tags_json" | jq -r '.tagset | to_entries | map("\(.key)=\(.value)") | join("&")')
    if [ -n "$formatted_tags" ]; then
      mc tag set "$DESTINATION_PROFILE/$DESTINATION_BUCKET/$filename" "$formatted_tags"
      if [ $? -eq 0 ]; then
        echo "Tags for $filename (Version ID: $version_id) transferred successfully."
      else
        echo "Error setting tags for $filename (Version ID: $version_id). The script will abort."
        exit 1
      fi
    else
      echo "No tags found."
    fi
  else
    echo "No tags found."
  fi
}

# Funktion zum Kopieren eines einzelnen Objekts
copy_object() {
  local version_id=$1
  local filename="$2"
  local destination_path=$(dirname "$2")/

  if [ "$destination_path" = "./" ]; then
    destination_path=""
  fi

  mc cp --recursive "$SOURCE_PROFILE/$SOURCE_BUCKET/$filename" "$DESTINATION_PROFILE/$DESTINATION_BUCKET/$destination_path" --version-id "$version_id"
  if [ $? -eq 0 ]; then
    echo "Object $filename with Version ID $version_id transferred successfully."
  else
    echo "Error copying $filename (Version ID: $version_id). The script will abort."
    exit 1
  fi
  # Übergabe an copy_tags
  copy_tags "$version_id" "$filename"
}

# Hauptfunktion zur Migration von Buckets
migrate_bucket() {
  local output_file="object_list.txt"
  mc ls --recursive "$SOURCE_PROFILE/$SOURCE_BUCKET" --versions | grep PUT | sort -t "v" -k 2,2n | awk '{print $6 " " $9}'  > "$output_file"

  # Lese die Datei und verarbeite die Objekte
  while IFS= read -r object; do
    local version_id filename
    read -r version_id filename <<< "$object"

    local log_entry="$version_id $filename"
    if [ ! -f "$LOG_FILE" ] || ! grep -q "$log_entry" "$LOG_FILE"; then
      echo "Copy $filename with Version ID $version_id"
      if copy_object "$version_id" "$filename"; then
        echo "$log_entry" >> "$LOG_FILE"
      fi
    fi
  done < "$output_file"
  rm "$output_file"
}

# Aufruf der Hilfsfunktion zur Überprüfung der Konfigurationen
check_application_availablility
# Starte die Migration
migrate_bucket
```
**Skript ausführbar machen:** Stellen Sie sicher, dass das heruntergeladene Skript ausführbar ist. Verwenden Sie dazu den Befehl `chmod +x SCRIPT_NAME`, wobei `SCRIPT_NAME` der Name des Skripts ist.

Führen Sie das Skript wie folgt aus:
```bash
./SCRIPT_NAME sourceprofil sourcebucket destinationprofil destinationbucket
```
Bitte ersetzen Sie sourceprofil, sourcebucket, destinationprofil und destinationbucket durch die entsprechenden Profil- und Bucket-Namen, die Sie für Ihre Migration verwenden möchten.


Nachdem Sie das Skript auf Ihr System kopiert und ausführbar gemacht haben, können Sie es mit den richtigen Parametern ausführen, um die Datenmigration zu starten.

{{% alert title="Hinweis für die Object-Lock-Konfiguration bei der Datenmigration innerhalb des gleichen S3s" %}} 
Für eine fehlerfreie Übertragung der Object-Lock-Konfiguration sind unterschiedliche Profile erforderlich. Wenn Sie beispielsweise das Profil **"plusserver"** sowohl als **Source- als auch als Destination-Profil** verwenden, jedoch unterschiedliche Source- und Destination-Buckets angeben, findet die Migration innerhalb desselben S3-Speichersystems statt. In diesem Fall werden jedoch die Object-Lock-Informationen **nicht übertragen**.

Um sicherzustellen, dass die S3-Object-Lock-Konfigurationen während der Migration korrekt übernommen werden, empfehlen wir die Verwendung des Profils **"plusserver"** als **Source-Profil** und des Profils **"plusserver2"** als **Destination-Profil**. Stellen Sie sicher, dass in beiden Profilen dieselben Informationen in der Konfigurationsdatei hinterlegt sind. Dadurch wird die Migration innerhalb desselben Clusters durchgeführt und gleichzeitig werden die S3-Object-Lock-Einstellungen erfolgreich übertragen.
{{% /alert %}}
{{% alert title="Hinweis" %}}
Bitte beachten Sie, dass wenn das Skript erneut ausgeführt wird, nur unbekannte Versionen von Objekten übertragen werden. Alle Details zu den erfolgreich übertragenen Versionen und Objekten finden Sie im `migration_log.txt`.

Falls Sie wünschen, dass alle Daten erneut übertragen werden, müssen Sie die Datei `migration_log.txt` löschen, bevor Sie das Skript erneut ausführen. Dies stellt sicher, dass der gesamte Migrationsprozess von vorne beginnt, ohne Berücksichtigung bereits übertragener Versionen und Objekte.
{{% /alert %}}