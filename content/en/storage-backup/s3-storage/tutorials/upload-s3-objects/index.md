---
title: "Uploading Objects to S3"
linkTitle: "Uploading Objects"
type: "docs"
weight: 30
date: "2024-02-07"
---

Uploading objects to plusserver S3 is straightforward using the AWS CLI. The following steps guide you on how to upload objects to your created buckets.

### Step 1: Upload an Object

Use the `aws s3 cp` command to upload an object to a bucket:

```bash
aws s3 cp <local-file-path> s3://<bucket-name>/<destination-file-path> --endpoint-url=https://<endpoint-url>
```

- \<local-file-path>: Specify the path to the local file you want to upload.
- \<bucket-name>: Provide the name of the target bucket.
- \<destination-file-path>: Optional, sets the path in the bucket under which the file will be stored.
- \<endpoint-url>: The corresponding endpoint, depending on your configuration.

**Example:**

```bash
aws s3 cp /path/to/file.txt s3://mynewbucket/file.txt --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Step 2: View Bucket Contents

Use the aws s3 ls command to view the contents of a bucket:

```bash
aws s3 ls s3://<bucket-name> --endpoint-url=https://<endpoint-url>
```

**Example:**

```bash
aws s3 ls s3://mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

For more information, refer to: [Using S3 commands managing objects copy](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html#using-s3-commands-managing-objects-copy)
