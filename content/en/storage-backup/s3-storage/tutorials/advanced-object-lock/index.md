---
title: "Advanced Object Lock: Versioning & Retention"
linkTitle: "Advanced Object Lock"
type: "docs"
weight: 60
date: "2024-02-07"
---

# Table of Contents

1. [Object Lock with Versioning and Different Retention Policies](#object-lock-with-versioning-and-different-retention-policies)
2. [Automatically Apply Retention to All Objects in a Bucket](#automatically-apply-retention-to-all-objects-in-a-bucket)
3. [Extend Object Lock Retention](#extend-object-lock-retention)

## Object Lock with Versioning and Different Retention Policies

In this section, you will learn how to upload objects with different versions to S3, specifying various Object Lock and Retention policies. The Object Lock feature protects objects from accidental changes or deletions, while versioning allows storing different versions of the same object.

### Step 1: Upload Objects with Versioning

Use the `aws s3 cp` command to upload one or more versions of the same object to your bucket:

```bash
aws s3 cp <local-file-path> s3://<bucket-name>/<destination-file-path> --endpoint-url=https://<endpoint>
```

Explanation of variables:

- \<local-file-path>: The path to the file on your computer.
- \<bucket-name>: Your bucket's name.
- \<destination-file-path>: The desired location and name of the object in the bucket.
- \<endpoint>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3 cp mydocument.pdf s3://myversionedbucket/documents/mydocument.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Step 2: Set Object Lock and Retention Policies

Use the following command to set Object Lock and Retention policies for a specific version of the object:

```bash
aws s3api put-object-retention --bucket <bucket-name> --key <destination-file-path> --version-id <version-id> --retention '{"Mode": "<retention-mode>", "RetainUntilDate": "<timestamp>"}' --endpoint-url=https://<endpoint>
```

Explanation of variables:

- \<bucket-name>: The bucket's name.
- \<destination-file-path>: The path of the object in the bucket.
- \<version-id>: The version ID of the specific object version.
- \<retention-mode>: The desired Object Lock mode: Governance/Compliance.
- \<timestamp>: The date and time until which the object should be locked.

**Example:**

```bash
aws s3api put-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --version-id fe11c7b4-eeae-f76f-a6ff-1402ec8ef430 --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "2023-08-11T17:45:59Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Combining Object Lock and Versioning allows you to apply different protection measures to various versions of the same object. Please make sure to use the correct values for Object Lock, Versioning, and Retention according to your requirements and configuration.

{{% alert title="Info" %}}The example provided is a general guide. Exact options may vary depending on your configuration.
{{% /alert %}}

### Step 3: Check Object Lock and Retention Policies

To check if the object is secured with Object Lock and the specified Retention policies, use the following command:

```bash
aws s3api get-object-retention --bucket <bucket-name> --key <destination-file-path> --version-id <version-id> --endpoint-url=https://<endpoint>
```

{{% alert title="Info" %}}
The command output displays the current Object Lock and Retention policy for the specified object. This can help ensure that the desired protection measures have been applied correctly.

Please note that the exact values in the output may vary based on your settings. Ensure the output aligns with your expectations to confirm that your Object Lock and Retention policies are configured correctly.
{{% /alert %}}

Example output for an object version with Object Lock:

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-11T17:45:59+00:00"
    }
}
```

Example output for an object without Object Lock set:

```bash
An error occurred (NoSuchObjectLockConfiguration) when calling the GetObjectRetention operation: The specified object does not have an ObjectLock configuration
```

## Automatically Apply Retention to All Objects in a Bucket

In this section, you will learn how to automatically apply a default retention to all objects in a bucket. This ensures that all uploaded objects are automatically protected with a specified Object Lock retention.

### Step 1: Set Default Retention for the Bucket

Use the `aws s3api put-object-lock-configuration` command to set a default Object Lock retention for the entire bucket:

```bash
aws s3api put-object-lock-configuration --bucket <bucket-name> --object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "<retention-mode>", "Days": <days>}}}' --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The bucket's name for which you want to enable default Object Lock retention.
- \<retention-mode>: The desired retention mode (GOVERNANCE or COMPLIANCE) to be applied as a default to all uploaded objects.
- \<days>: The number of days for which the retention should be set by default.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api put-object-lock-configuration --bucket mylockedbucket --object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE", "Days": 1}}}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Executing this command sets a default Object Lock retention that will be applied to all newly uploaded objects in this bucket. Objects are automatically protected with the specified retention upon upload. In this example, objects would be protected with a Governance Object Lock for 1 day.

{{% alert title="Info" %}}
Please make sure to adjust the values for <bucket-name>, <days>, and <mode> according to your requirements. The default retention policy will be applied to all objects in the bucket that do not already have an individual retention.
{{% /alert %}}

### Step 2: Retrieve the Bucket Rule for Object Lock Retention

Use the `aws s3api get-object-lock-configuration` command to retrieve the current bucket rule for Object Lock retention:

```bash
aws s3api get-object-lock-configuration --bucket <bucket-name> --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The name of the bucket for which you want to retrieve the bucket rule.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api get-object-lock-configuration --bucket mylockedbucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Example Output:**

```json
{
    "ObjectLockConfiguration": {
        "ObjectLockEnabled": "Enabled",
        "Rule": {
            "DefaultRetention": {
                "Mode": "GOVERNANCE",
                "Days": 1
            }
        }
    }
}
```

### Step 3: Upload an Object and Check Default Object Lock Retention

Use the `aws s3api put-object` command to upload an object to the bucket.

```bash
aws s3api put-object --bucket <bucket-name> --key <destination-file-path> --body <local-file-path> --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The name of the bucket where you want to upload the object.
- \<destination-file-path>: The desired location and name of the object in the bucket.
- \<local-file-path>: The path and name of the local file to be uploaded.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /path/to/meinobjekt.pdf --endpoint-url=https://s3.de-west
```

### Step 4: Check Default Object Lock Retention for the Uploaded Object

To check if the object is secured with Object Lock and the default Retention policies, use the following command:

```bash
aws s3api get-object-retention --bucket <bucket-name> --key <destination-file-path> --endpoint-url=https://s3.de-west-1.psmanaged.com
```

Explanation of variables:

- \<bucket-name>: The name of the bucket.
- \<destination-file-path>: The path of the object in the bucket.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

By enabling default Object Lock retention, you can ensure that all objects uploaded to the bucket are automatically protected with the desired retention. Make sure to specify the correct values for retention modes and the number of days to meet your requirements.

## Extend Object Lock Retention

In this section, you will learn how to extend the retention time of an object with Object Lock enabled.

### Step 1: Upload an Object with Object Lock

Start by uploading an object with a sample 1-hour Object Lock Governance option.

```bash
aws s3api put-object --bucket <bucket-name> --key <object-key> --body <local-file-path> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"
```

Explanation of variables:

- \<bucket-name>: The name of the bucket where you want to upload the object.
- \<object-key>: The desired location and name of the object in the bucket.
- \<local-file-path>: The path and name of the local file to be uploaded.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /path/to/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"
```

### Step 2: Check Retention

Verify the current retention time of the uploaded object.

```bash
aws s3api get-object-retention --bucket <bucket-name> --key <object-key> --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The name of the bucket where the object is located.
- \<object-key>: The path and name of the object in the bucket.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Example Output:**

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T08:58:34+00:00"
    }
}
```

### Step 3: Extend Retention

Extend the retention time of the uploaded object by another hour.

```bash
aws s3api put-object-retention --bucket <bucket-name> --key <object-key> --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "<new-date>"}' --endpoint-url=<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The name of the bucket where the object is located.
- \<object-key>: The path and name of the object in the bucket.
- \<new-date>: The new date and time until which the retention should be extended.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api put-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "2023-08-14T09:58:34Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Step 4: Check the New Retention

Verify the updated retention time of the object to ensure it has been successfully extended.

```bash
aws s3api get-object-retention --bucket <bucket-name> --key <object-key> --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucket-name>: The name of the bucket where the object is located.
- \<object-key>: The path and name of the object in the bucket.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api get-object-retention --bucket mylockedbucket --key folder/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com
```

**Example Output:**

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T09:58:34+00:00"
    }
}
```

By enabling default Object Lock retention, you can ensure that all objects uploaded to the bucket are automatically protected with the desired retention. Make sure to specify the correct values for retention modes and the number of days to meet your requirements.
