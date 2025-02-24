---
title: "Migrationsskript für plusserver S3 Service"
linkTitle: "Migrationsskript"
type: "docs"
weight: 140
date: "2024-02-07"
---

Diese kurze Anleitung führt Sie durch den Prozess der Verwendung des rclone-Tools zur Übertragung von Daten zwischen verschiedenen Speicherzielen. Rclone ist ein leistungsstarkes Kommandozeilen-Tool, das die nahtlose Übertragung von Dateien und Verzeichnissen zwischen verschiedenen Cloud-Speicherdiensten ermöglicht.

{{% alert title="Info" %}}
Vor der Durchführung dieser Dokumentation stellen Sie bitte sicher, dass die rclone-Konfiguration gemäß den Anweisungen in [Datenmigration mit rclone](../migration-with-rclone) Schritt 1 und Schritt 2 abgeschlossen wurde. Dies ist erforderlich, um reibungslos mit dem beschriebenen Vorgang fortzufahren.
{{% /alert %}}

### Automatisierte Datenübertragung mit dem Migrationsskript (mit Bash)

In diesem Schritt erfahren Sie, wie Sie das Migrationsskript auf einem Server verwenden, um die automatisierte Datenübertragung zwischen verschiedenen Cloud-Speicherdiensten durchzuführen.

### Vorbereitung:

**Skript herunterladen:** Laden Sie das Migrationsskript auf den Server herunter, auf dem Sie die Datenübertragung durchführen möchten.

**Ausführbar machen:** Verleihen Sie dem Skript Ausführungsrechte, damit es ausgeführt werden kann. Verwenden Sie dazu den Befehl chmod u+x plusserver_transfer_skript.sh.

**Nutzung des Skripts:**
Das Migrationsskript unterstützt verschiedene Parameter, die es Ihnen ermöglichen, die Datenübertragung nach Ihren Anforderungen anzupassen. Hier sind die Schritte, um das Skript zu verwenden:

1. **Hilfe anzeigen:** Führen Sie den Befehl ./plusserver_transfer_skript.sh -h oder ./plusserver_transfer_skript.sh --help aus, um eine Übersicht über die unterstützten Parameter und deren Bedeutung zu erhalten.

2. **CSV-Datei vorbereiten:** Erstellen Sie eine CSV-Datei mit den erforderlichen Informationen über Quell- und Ziel-Speicherprofile sowie die entsprechenden Bucket-Namen. Das Schema der CSV-Datei sollte wie folgt aussehen:

| source_profile | source_bucket | dest_profile | dest_bucket |
| -------------- | ------------- | ------------ | ----------- |
| old_s3         | bucket1       | new_s3       | bucketA     |
| old_s3         | bucket2       | new_s3       | bucketB     |

(Beispiel für eine CSV-Datei mit Quell- und Zielkombinationen)
Im Idealfall nennen Sie dieses buckets.csv. Sollten Sie einen anderen Namen wählen, so müssen Sie diesen via Parameter beim Skript angeben.

3. **Datenübertragung starten:** Führen Sie den Befehl ./plusserver_transfer_skript.sh -f CSV_DATEI aus, um die Datenübertragung zu starten. Ersetzen Sie CSV_DATEI durch den Pfad zur vorbereiteten CSV-Datei. Das Skript wird die Übertragung zwischen den angegebenen Speicherzielen durchführen. Führen Sie das Skript ohne den -f Parameter aus, so wird Default die buckets.csv verwendet.

4. **Optionale Parameter:**
   Das Skript unterstützt auch optionale Parameter zur Anpassung der Datenübertragung:
   _ -d oder \--delimiter: Legt das Trennzeichen für die CSV-Datei fest. Standardmäßig wird , verwendet.
   _ \--delete: Verwendet die rclone sync-Operation. Wird das Skript mit der --delete-Option verwendet, so werden im Destination Bucket Objekte, welche in der Source gelöscht wurden ebenfalls gelöscht.

**Beispiel:**

Angenommen, Sie haben das Skript auf Ihrem Server in `/home/user/plusserver_transfer_skript.sh` abgelegt und eine CSV-Datei namens `transfer_data.csv` im gleichen Verzeichnis vorbereitet. Sie möchten die Datenübertragung starten und dabei die `rclone sync` Operation mit der `--delete` Option verwenden. Führen Sie den folgenden Befehl aus:

```bash
./plusserver_transfer_skript.sh -f transfer_data.csv --delete
```

{{% alert title="Info" %}}
Bei erneuter Ausführung des Skripts werden nur neue hinzugekommene Objekte zwischen den Quell- und Ziel-Buckets übertragen.
Falls in den Quell-Buckets Dateien gelöscht wurden, bleiben diese im Ziel-Bucket erhalten, es sei denn, Sie verwenden die `--delete` Option.
{{% /alert %}}

5. **Migrationsskript**

```bash
#!/bin/bash

# Function to display the help
display_help() {
    echo "Usage: transfer_script.sh [OPTIONS]"
    echo "Transfer data from source to destination using rclone."
    echo ""
    echo "Options:"
    echo "  -h, --help              Display this help message and exit."
    echo "  -f, --file FILE         Use the specified CSV file as input."
    echo "  -d, --delimiter 'DELIM' Set the delimiter character for the CSV file."
    echo "      --delete            Use 'rclone sync' with '--delete' option."
    echo ""
    echo "By default, the script uses ',' as the delimiter and 'buckets.csv' as the CSV file."
}

# Default values for options
csv_file="buckets.csv"
delimiter=","
use_delete=false

# Processing command line options
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            display_help
            exit 0
            ;;
        -f|--file)
            csv_file="$2"
            shift 2
            ;;
        -d|--delimiter)
            delimiter="$2"
            shift 2
            ;;
        --delete)
            use_delete=true
            shift
            ;;
        *)
            echo "Error: Unknown option $1"
            display_help
            exit 1
            ;;
    esac
done

# Add timestamp to log file
log_file="sync_log_$(date -Iminutes).txt"

# Check if the CSV file exists
if [ -f "$csv_file" ]; then
    # Skip the header line in the CSV file
    read -r header < "$csv_file"

    # Initialize an array for unique profiles
    unique_profiles=()

    # Get output from rclone listremotes and store in a variable
    all_profiles=$(rclone listremotes)

    # Read CSV file and check profiles
    while IFS="$delimiter" read -r source_profile source_bucket dest_profile dest_bucket; do
        # Store unique profiles
        if [[ ! " ${unique_profiles[@]} " =~ " $source_profile " ]]; then
            unique_profiles+=("$source_profile")
        fi
        if [[ ! " ${unique_profiles[@]} " =~ " $dest_profile " ]]; then
            unique_profiles+=("$dest_profile")
        fi
    done < <(tail -n +2 "$csv_file") # Process all lines except the first (header)

    # Check if the unique profiles exist in the rclone configuration
    missing_profiles=()
    for profile in "${unique_profiles[@]}"; do
        if ! grep -q "$profile" <<< "$all_profiles"; then
            missing_profiles+=("$profile")
        fi
    done

    # Display error message if profiles are missing
    if [ ${#missing_profiles[@]} -gt 0 ]; then
        echo "Error: The following profiles are missing in rclone configuration:"
        for missing_profile in "${missing_profiles[@]}"; do
            echo "  - $missing_profile"
        done
        exit 1
    fi

    # Query buckets for each profile
    declare -A profile_buckets
    for profile in "${unique_profiles[@]}"; do
        buckets=$(rclone lsd "$profile:" | awk '{print $5}')
        profile_buckets["$profile"]=$buckets
    done

    # Check if the specified buckets in the CSV file are present
    missing_buckets=()
    while IFS="$delimiter" read -r source_profile source_bucket dest_profile dest_bucket; do
        if ! grep -q "$source_bucket" <<< "${profile_buckets["$source_profile"]}"; then
            missing_buckets+=("$source_profile:$source_bucket")
        fi
        if ! grep -q "$dest_bucket" <<< "${profile_buckets["$dest_profile"]}"; then
            missing_buckets+=("$dest_profile:$dest_bucket")
        fi
    done < <(tail -n +2 "$csv_file") # Process all lines except the first (header)

    # Display error message if buckets are missing
    if [ ${#missing_buckets[@]} -gt 0 ]; then
        echo "Error: The following buckets are missing or inaccessible:"
        echo "<Profile>:<Bucket>"
        for missing_bucket in "${missing_buckets[@]}"; do
            echo "  - $missing_bucket"
        done
        exit 1
    fi

    # Use rclone copy or rclone sync with --delete
    copy_command="rclone copy"
    if [ "$use_delete" = true ]; then
        copy_command="rclone sync"
    fi

    # Copy/synchronize objects from source bucket to destination bucket
    while IFS="$delimiter" read -r source_profile source_bucket dest_profile dest_bucket; do
        echo "Processing: $source_profile - $source_bucket -> $dest_profile - $dest_bucket"
        $copy_command "$source_profile":"$source_bucket" "$dest_profile":"$dest_bucket" --metadata --checksum --progress --copy-links --no-update-modtime --log-file="$log_file"
        echo "Processing completed:  $source_profile - $source_bucket -> $dest_profile - $dest_bucket"
    done < <(tail -n +2 "$csv_file") # Process all lines except the first (header)

    echo "All bucket transfers completed."
else
    echo "Error: CSV file \"$csv_file\" doesn't exist."
fi
```
