---
title: Bucket replication
description: >
  Sync data between S3 buckets.
---

Sometimes it is necessary to transfer the entire contents of a bucket to a new bucket and ensure that this transfer is kept up-to-date. AWS provides the aws s3 sync command line tool to help you perform this type of replication between S3 buckets.

aws s3 sync is only possible within the same endpoint. For copying buckets in different endpoints, you need to use a different technology / See Rclone (part 17).

### Synchronize objects between buckets

`aws s3 sync s3://<quelle-bucket> s3://<ziel-bucket> --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<source-bucket>`: The name of the source bucket.
`<destination-bucket>`: The name of the destination bucket.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3 sync s3://mein-quell-bucket s3://mein-ziel-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Automatic update

To keep replication between buckets up to date, you can run the aws s3 sync command at regular intervals. This can be achieved, for example, by scheduling a cron job or using tools.

### Example of automatic updating

You can set up a cron job to run the aws s3 sync command at regular intervals. Here is an example of how you can run the command every hour:

`0 * * * * aws s3 sync s3://mein-quell-bucket s3://mein-ziel-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com`

This example runs the command every hour to ensure that replication between buckets remains up-to-date.

With this step, you can replicate the entire contents of an S3 bucket to a new bucket and ensure that this replication is automatic and up-to-date.

Important: the s3 sync command cannot copy object lock retentions.

(Optional: Step 4: Sync with object lock retention takeover).

To implement an option to sync objects between buckets with object lock retention takeover, you can use the following script. Note that this is a simple example and there are other ways to accomplish this. In this script, the AWS CLI commands are used to synchronize files from the source bucket to the target bucket. If an object has object lock, the object lock retention configuration is also applied to the synchronized object in the target bucket.

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

Example:

Suppose you have a source bucket named "sourcebucket" and a destination bucket named "destbucket". You can run the script as follows:
`./sync_with_object_lock.sh`.

This script will synchronize the files from the source bucket to the destination bucket, taking over the object lock retention configuration for synchronized objects in the destination bucket, if any. Note that you will need to customize the script to meet your specific requirements and is intended only as an example.
