---
title: Data migration
description: >
    Migrate your data with our custom migration script.
---

This extension of our documentation guides you through the use of plusserver's migration scripts for a seamless transition from an existing S3 service to our plusserver S3 service.
Our script takes into account important aspects such as versioning, tags, metadata and especially the essential object lock information.

Note

In order to successfully complete this process, you will need two essential tools: Minio and jq. These must be installed on your system to ensure that your data is migrated safely and efficiently.

In the following sections, you will learn step-by-step how to use our migration scripts to transfer your data.

## Install and set up the Minio client

You can use the following short guide to install and set up the Minio client and set an alias:
You can download the Minio client from the official website. Use the following link: Minio client download.

Installation: Run the following commands to download the Minio client, make it executable, and make it available in your path:

```bash
curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc
chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/
```

Verifying the installation: You can verify the successful installation by running the `mc --help` command. If the Minio client is installed correctly, you will see the help guide.

## Configuring aliases

To access your plusserver S3 service, you must create an alias. Replace ACCESS_KEY and SECRET_KEY with your actual credentials.

`mc alias set plusserver https://s3.de-west-1.psmanaged.com ACCESS_KEY SECRET_KEY`

With this alias you can now access your plusserver S3 storage and transfer files.

Repeat this with your previous S3 storage.

## Check if Object Lock data is outdated

To ensure that the migration script works smoothly, it is important to make sure that there is no expired object lock information for your objects. You can check this with the following command:

`mc retention info --recursive ALIAS/BUCKET --versions | grep "EXPIRED"`

Replace ALIAS with your alias and BUCKET with the bucket name you want to check.

If there are objects with expired object lock information, they look like this, for example:

```bash
[ GOVERNANCE EXPIRED ] fe11a6df-af76-c69f-b8d3-5cba2c687bf8 ALIAS/BUCKET/test-governance/file1.txt
```

In this case, you should either delete the expired object lock information or the affected object, or extend the object lock information into the future. Otherwise, the migration script will not succeed and will issue an error message because the retention cannot be set in the past. Make sure that all objects you want to migrate have valid object lock information.

Hinweis

The EXPIRED warning is displayed only for objects that have the GOVERNANCE status.
COMPLIANCE is unfortunately not displayed. These must be viewed independently or in the single view.

## (Optional) Deleting Object Lock information

If you want to clear the object lock information of a particular object using the Minio client, you can use the following command:
mc retention clear ALIAS/BUCKET/PATH --version-id VERSIONID

Here you replace:

ALIAS with your alias for the S3 service.
BUCKET with the name of the bucket where the object is located.
PATH by the path to the object in the bucket.
VERSIONID by the ID of the version of the object whose object lock information you want to delete.

Running this command deletes the object lock information for the specified object and version. Make sure that you have the appropriate permissions and authorizations for this action, because deleting object lock information may be restricted in your S3 service.

## Saving the migration script on your system

Download the migration script to your system. This script is used to migrate data from your source profile and source bucket to your target profile and target bucket.

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

Make sure that the downloaded script is executable. To do this, use the command `chmod +x SCRIPT_NAME`, where `SCRIPT_NAME` is the name of the script.

After you copy the script to your system and make it executable, you can run it with the correct parameters to start the data migration.

Execute the script like this:

`./SCRIPT_NAME sourcealias sourcebucket destinationalias destinationbucket`

Please replace `sourcealias`, `sourcebucket`, `destinationalias`, and `destinationbucket` with the appropriate profile and bucket names that you want to use for your migration.

{{% alert title="Important" color="notice" %}}
Note for the Object-Lock configuration during data migration within the same S3.

Different aliases are required for error-free transfer of the object-lock configuration. For example, if you use the "plusserver" alias as both the source and destination profile, but specify different source and destination buckets, the migration takes place within the same S3 storage system. However, in this case, the object lock information is not transferred.

To ensure that the S3 Object-Lock configurations are transferred correctly during migration, we recommend using the "plusserver" alias as the source profile and the "plusserver2" alias as the destination alias. Make sure that both aliases have the same information stored in the configuration file. This ensures that the migration is performed within the same cluster and that the S3 Object Lock settings are transferred successfully at the same time.
{{% /alert %}}

{{% alert %}}
Please note that when the script is run again, only unknown versions of objects are transferred. All details about the successfully transferred versions and objects can be found in the migration_log.txt.

If you want all data to be transferred again, you must delete the migration_log.txt file before running the script again. This ensures that the entire migration process starts from scratch, ignoring versions and objects that have already been transferred.
{{% /alert %}}
