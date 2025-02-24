---
title: "Migration Script for Migrating an S3 Service to plusserver S3 Service with Versioning and Object-Lock"
linkTitle: "Migration Script with Object Lock"
type: "docs"
weight: 140
date: "2024-02-07"
---

This extension of our documentation guides you through the use of migration scripts provided by plusserver for seamlessly transitioning from an existing S3 service to our plusserver S3 service. Our script takes into account important aspects such as versioning, tags, metadata, and, most importantly, essential Object-Lock information.

{{% alert title="Note" %}}
To successfully perform this process, you need two essential tools: Minio and jq. These must be installed on your system to ensure the safe and efficient migration of your data.
{{% /alert %}}

## Step 1: Install and Set Up Minio Client

For the installation and setup of the Minio client and setting up an alias, you can use the following short guide:

1. You can download the Minio client from the [official website](https://dl.min.io/client/mc/release/linux-amd64/mc).

2. Execute the following commands to download the Minio client, make it executable, and make it available in your path:

```bash
   curl https://dl.min.io/client/mc/release/linux-amd64/mc \
     --create-dirs \
     -o $HOME/minio-binaries/mc

   chmod +x $HOME/minio-binaries/mc
   export PATH=$PATH:$HOME/minio-binaries/
```

Verify the installation by running the command mc --help. If the Minio client is installed correctly, you will see the help guide.

### Step 2: Set Up an Alias

To access your plusserver S3 service, you need to create an alias. Replace **ACCESS_KEY** and **SECRET_KEY** with your actual access credentials.

```bash
mc alias set plusserver https://s3.de-west-1.psmanaged.com ACCESS_KEY SECRET_KEY
```

With this alias, you can now access your plusserver S3 storage and transfer files. Repeat this process with your existing S3 storage.

### Step 3: Check for Outdated Object-Lock Data

To ensure the migration script works smoothly, it is important to confirm that there are no expired Object-Lock information for your objects. You can check this with the following command:

```bash
mc retention info --recursive ALIAS/BUCKET --versions | grep "EXPIRED"
```

Replace `ALIAS` with your **Alias** and `BUCKET` with the **Bucket Name** you want to check. If objects with expired Object-Lock information are present, they will look like this:

```bash
[ GOVERNANCE EXPIRED ] fe11a6df-af76-c69f-b8d3-5cba2c687bf8 ALIAS/BUCKET/test-governance/file1.txt
```

In this case, you should either delete the expired Object-Lock information or the affected object, or extend the Object-Lock information into the future. Otherwise, the migration script will not be successful, and an error message will be displayed, as retention cannot be set in the past. Ensure that all objects you want to migrate have valid Object-Lock information.

{{% alert title="Note" %}}
The EXPIRED warning is only displayed for objects with the GOVERNANCE status. COMPLIANCE will not be displayed. These need to be reviewed individually or in the single view.
{{% /alert %}}

### Step 3a: (Optional) Delete Object-Lock Information

If you want to delete the Object-Lock information of a specific object using the Minio client, you can use the following command:

```bash
mc retention clear ALIAS/BUCKET/PATH --version-id VERSIONID
```

Replace:

- **ALIAS** with your alias for the S3 service.
- **BUCKET** with the name of the bucket where the object is located.
- **PATH** with the path to the object in the bucket.
- **VERSIONID** with the ID of the version of the object whose Object-Lock information you want to delete.

By executing this command, the Object-Lock information for the specified object and version will be deleted. Ensure you have the appropriate permissions and authorizations for this action, as deleting Object-Lock information in your S3 service may be restricted.

### Step 4: Save the Script to Your System

Download the migration script to your system. This script is used to migrate data from your source profile and source bucket to your destination profile and destination bucket.

**migration_script.sh**

```bash
#!/bin/bash

# Check if the required arguments have been provided
if [ $# -ne 4 ]; then
  echo "Usage: $0 sourceprofile sourcebucket destinationprofil destinationbucket"
  exit 1
fi

SOURCE_PROFILE="$1"
SOURCE_BUCKET="$2"
DESTINATION_PROFILE="$3"
DESTINATION_BUCKET="$4"
LOG_FILE="migration_log.txt"

# Helper function to check application availability
check_application_availablility() {
  # Check if MinIO (mc) is installed
  if ! command -v mc &>/dev/null; then
    echo "Error: MinIO (mc) is not installed."
    exit 1
  fi

  # Check if jq is installed
  if ! command -v jq &>/dev/null; then
    echo "Error: jq is not installed."
    exit 1
  fi
}

copy_tags() {
  local version_id="$1"
  local filename="$2"

  local tags_json=$(mc tag list "$SOURCE_PROFILE/$SOURCE_BUCKET/$filename" --version-id "$version_id" --json)

  # Check if tags are present
  if [[ $tags_json == *"\"tagset\":{"* ]]; then
    # Extract and format tags from JSON
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

# Function to copy a single object
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
  # Call copy_tags
  copy_tags "$version_id" "$filename"
}

# Main function for migrating buckets
migrate_bucket() {
  local output_file="object_list.txt"
  mc ls --recursive "$SOURCE_PROFILE/$SOURCE_BUCKET" --versions | grep PUT | sort -t "v" -k 2,2n | awk '{print $6 " " $9}'  > "$output_file"

  # Read the file and process the objects
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

# Call the helper function to check configurations
check_application_availablility
# Start the migration
migrate_bucket
```

Make the script executable: Ensure that the downloaded script is executable. Use the command `chmod +x SCRIPT_NAME`, where **SCRIPT_NAME** is the name of the script.

Run the script as follows:

```bash
./SCRIPT_NAME sourceprofile sourcebucket destinationprofile destinationbucket
```

Please replace **sourceprofile, sourcebucket, destinationprofile, and destinationbucket** with the corresponding profile and bucket names you want to use for your migration.

After copying the script to your system and making it executable, you can execute it with the correct parameters to start the data migration.

{{% alert title="Note for Object-Lock Configuration during Data Migration within the Same S3" %}}

For a successful transfer of Object-Lock configuration, different profiles are required. For example, if you use the profile **"plusserver"** both as a source and destination profile, but specify different source and destination buckets, the migration will take place within the same S3 storage system. However, the Object-Lock information will not be transferred in this case.

To ensure that S3-Object-Lock configurations are correctly adopted during migration, we recommend using the profile **"plusserver"** as the **source profile** and the profile **"plusserver2"** as the **destination profile**. Make sure that both profiles have the same information in the configuration file. This will perform the migration within the same cluster while successfully transferring S3-Object-Lock settings.
{{% /alert %}}
{{% alert title="Note" %}}
Please be aware that if the script is rerun, only unknown versions of objects will be transferred. All details about successfully transferred versions and objects can be found in `migration_log.txt`.

If you wish to transfer all data again, you must delete the `migration_log.txt` file before rerunning the script. This ensures that the entire migration process starts from the beginning without considering already transferred versions and objects.
{{% /alert %}}
