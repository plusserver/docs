---
title: "Object Replication between Buckets"
linkTitle: "Object Replication"
type: "docs"
weight: 100
date: "2024-02-07"
---

Sometimes it is necessary to transfer the entire content of a bucket to a new bucket and ensure that this transfer is also kept up to date. AWS provides the command-line tool `aws s3 sync`, which helps you perform this type of replication between S3 buckets.

### Step 1: Synchronize Objects between Buckets

```bash
aws s3 sync s3://<source-bucket> s3://<destination-bucket> --endpoint-url=https://<endpoint-url>

Explanation of variables:

    <source-bucket>: The name of the source bucket.
    <destination-bucket>: The name of the destination bucket.
    <endpoint-url>: The corresponding endpoint for your plusserver S3 service.
```

**Example:**

```bash
aws s3 sync s3://my-source-bucket s3://my-destination-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Step 2: Automatic Update

To keep the replication between the buckets up to date, you can execute the aws s3 sync command at regular intervals. This can be achieved, for example, by scheduling a cron job or using tools.

### Step 3: Example of Automatic Update

You can set up a cron job to run the aws s3 sync command at regular intervals.
Here is an example crontab on how to run the command hourly:

```bash
0 * * * * aws s3 sync s3://my-source-bucket s3://my-destination-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

This example runs the command every hour to ensure that the replication between the buckets stays current.

### Step 4: Syncing with Object Lock Retention Transfer (Optional)

To implement an option to synchronize objects between buckets with the transfer of Object Lock Retention, you can use the following **example** script. Note that this is a simple **example**, and there are other ways to achieve this. In this script, AWS CLI commands are used to synchronize files from the source bucket to the destination bucket. If an object has Object Lock, the Object Lock Retention configuration is also transferred to the synchronized object in the destination bucket.

**Example:**

Assuming you have a source bucket named "sourcebucket" and a destination bucket named "destbucket," you can run the script as follows:

```bash
#!/bin/bash

source_bucket="sourcebucket"
dest_bucket="destbucket"

# Synchronize files from source_bucket to dest_bucket
aws s3 sync s3://$source_bucket/ s3://$dest_bucket/

# List of files in source_bucket
files=$(aws s3 ls s3://$source_bucket/ --recursive | awk '{print $4}')

for file in $files; do
  # Check if the current object has Object Lock
  object_lock_config=$(aws s3api get-object-retention --bucket $source_bucket --key $file 2>/dev/null)
   
  if [ -n "$object_lock_config" ]; then
    # Set Object Lock configuration on the synchronized object in dest_bucket
    retention_config=$(echo "$object_lock_config" | jq -r '.Retention')
    aws s3api put-object-retention --bucket $dest_bucket --key $file --retention "$retention_config"
    echo "Object $file synchronized, and Object Lock configuration transferred"
  else
    echo "Object $file synchronized"
  fi
done
````

You can then execute the script, for example:

```bash
./sync_with_object_lock.sh
```

This script will synchronize files from the source bucket to the destination bucket, including transferring the Object Lock Retention configuration for synchronized objects in the destination bucket, if available. Note that you need to customize the script to your specific requirements and is provided as an **example**.