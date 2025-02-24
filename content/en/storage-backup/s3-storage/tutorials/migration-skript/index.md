---
title: "Migration Script for plusserver S3 Service"
linkTitle: "Migration Script"
type: "docs"
weight: 140
date: "2024-02-07"
---

This short guide will walk you through the process of using the rclone tool for transferring data between different storage destinations. Rclone is a powerful command-line tool that enables seamless file and directory transfers between various cloud storage services.

{{% alert title="Info" %}}
Before proceeding with this documentation, please ensure that the rclone configuration has been completed as per the instructions in [Data Migration with rclone](../migration-with-rclone) Step 1 and Step 2. This is necessary to smoothly proceed with the described process.
{{% /alert %}}

### Automated Data Transfer with the Migration Script (using Bash)

In this step, you will learn how to use the migration script on a server to perform automated data transfers between different cloud storage services.

### Preparation:

**Download the Script:** Download the migration script to the server where you intend to perform the data transfer.

**Make it Executable:** Grant executable rights to the script so that it can be executed. Use the command `chmod u+x plusserver_transfer_script.sh` for this purpose.

Using the Script:

The migration script supports various parameters that allow you to customize the data transfer according to your requirements. Here are the steps to use the script:

1. **Display Help:** Execute the command `./plusserver_transfer_script.sh -h` or `./plusserver_transfer_script.sh --help` to get an overview of the supported parameters and their meanings.

2. **Prepare CSV File:** Create a CSV file with the necessary information about source and destination storage profiles and their corresponding bucket names. The schema of the CSV file should look like this:

|source_profile|source_bucket|dest_profile|dest_bucket|
|--------------|-------------|------------|-----------|
|old_s3|bucket1|new_s3|bucketA|
|old_s3|bucket2|new_s3|bucketB|

(Example of a CSV file with source and destination combinations)

Ideally, name this file buckets.csv. If you choose a different name, you need to specify it using a parameter when running the script.

3. **Start Data Transfer:** Execute the command ./plusserver_transfer_script.sh -f CSV_FILE to start the data transfer. Replace CSV_FILE with the path to the prepared CSV file. The script will perform the transfer between the specified storage targets. If you run the script without the -f parameter, it will default to using buckets.csv.

4. **Optional Parameters:**
    * -d or \--delimiter: Sets the delimiter character for the CSV file. By default, , is used.
    * \--delete: Uses the rclone sync operation. When the script is used with the --delete option, objects that were deleted in the source will also be deleted in the destination bucket.

**Example:**

Assuming you have placed the script on your server at `/home/user/plusserver_transfer_script.sh` and prepared a CSV file named `transfer_data.csv` in the same directory. You want to start the data transfer using the rclone sync operation with the `--delete` option. 

**Execute the following command:**

```bash
./plusserver_transfer_script.sh -f transfer_data.csv --delete
```
{{% alert title="Info" %}}
Upon re-execution of the script, only newly added objects between the source and destination buckets will be transferred. If files were deleted in the source buckets, they will remain in the destination bucket unless you use the --delete option.
{{% /alert %}}

5. **Migration Script**

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