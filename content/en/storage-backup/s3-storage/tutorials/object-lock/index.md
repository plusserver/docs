---
title: "Uploading Objects to S3 with Object Lock"
linkTitle: "Object Lock in S3"
type: "docs"
weight: 50
date: "2024-02-07"
---

Uploading objects to plusserver S3 with Object Lock enabled provides advanced security control. Here are the steps to upload objects with Object Lock to your buckets.

{{% alert title="Note" %}}
Ensure that the respective bucket has both versioning and Object Lock enabled to utilize this feature.
{{% /alert %}}

{{% alert title="Differences between Compliance and Governance Object Lock" color="warning" %}}

The plusserver S3 service offers two modes of the Object Lock feature: Compliance and Governance. Both modes aim to ensure the immutability of objects but with different levels of enforcement and user action possibilities.

#### Compliance Object Lock

- Objects in Compliance mode cannot be deleted or modified as long as the retention period is active.
- Once locked, objects cannot be deleted or modified during the specified retention period.
- Users cannot independently delete Compliance-locked objects, providing an additional layer of protection for critical data.

#### Governance Object Lock

- Objects in Governance mode cannot be deleted or modified as long as the retention period is active.
- In Governance mode, certain user actions can be performed, which are typically not allowed in Compliance mode.
- Users with the required permissions can delete locked objects in Governance mode, but an audit trail of such actions is retained.

#### The following rights are associated with Governance Object Lock

- `s3:BypassGovernanceRetention`: To bypass Governance retention for a locked object.
- `s3:DeleteObjectVersion`: To delete a locked object in Governance mode.
- `s3:DeleteObjectVersionTagging`: To delete tagging information of a version of a locked object.
- `s3:PutObjectLegalHold`: To apply a legal hold on a specific version of a locked object.
- `s3:PutObjectRetention`: To set the retention for a specific version of a locked object.

Please note that these permissions grant powerful actions that can impact the integrity and immutability of data. Assign these permissions with caution and ensure that only trusted users have access to them. Additionally, consult with your data protection officers and consider implementing additional safeguards such as "Multiadmin-Verification" to prevent a single person from obtaining deletion rights.

It is advisable to carefully plan your permission structure, ensuring that users only receive the permissions they truly need to perform security-related actions. Refer to the [AWS S3 documentation](https://docs.aws.amazon.com/s3/) for further guidance.

### Note 1

It is important to note that both Compliance and Governance Object Lock ensure the integrity and immutability of data. The choice between modes depends on the specific requirements and level of enforcement needed for your data. Before choosing a mode, consider the needs of your organization and the desired level of protection.

### Note 2

As long as at least one locked object is within a bucket, the bucket cannot be deleted.

**Additionally, termination of the plusserver S3 contract is not possible as long as locked objects still exist in the customer account. The contract must be continued until all retention locks have expired and/or the objects have been deleted by the customer in Governance mode.**
{{% /alert %}}

## Step 1: Uploading an Object with Governance Mode

Use the command `aws s3api put-object` to upload an object with Object Lock in Governance mode:

```bash
aws s3api put-object --bucket <bucketname> --key <destination-file-path> --body <local-file-path> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date <timestamp>
```

- Replace \<bucketname>: Enter the name of the bucket where you want to upload the object.
- Replace \<destination-file-path>: Specify the path and name under which the uploaded object will be stored in the bucket.
- Replace \<local-file-path>: Specify the path and name of the local file to be uploaded.
- Replace \<endpoint-url>: Provide the corresponding endpoint for your plusserver S3.
- Replace \<timestamp>: Specify the date and time until which the object should be locked in Governance mode. Format YYYY-MM-DDTHH:MM:SSZ (Y = year, M = month, D = day, H = hour, M = minute, S = second)

**Example**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/myobject.pdf --body /path/to/myobject.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"
```

## Step 2: Uploading an Object with Compliance Mode

Use the same command with "COMPLIANCE" to upload an object with Compliance mode:

```bash
aws s3api put-object --bucket <bucketname> --key <destination-file-path> --body <local-file-path> --endpoint-url=https://<endpoint-url> --object-lock-mode COMPLIANCE --object-lock-retain-until-date <timestamp>
```

- Replace \<bucketname>: Enter the name of the bucket where you want to upload the object.
- Replace \<destination-file-path>: Specify the path and name under which the uploaded object will be stored in the bucket.
- Replace \<local-file-path>: Specify the path and name of the local file to be uploaded.
- Replace \<endpoint-url>: Provide the corresponding endpoint for your plusserver S3.
- Replace \<timestamp>: Specify the date and time until which the object should be locked in Governance mode. Format YYYY-MM-DDTHH:MM:SSZ (Y = year, M = month, D = day, H = hour, M = minute, S = second)

**Example:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/myobject.pdf --body /path/to/myobject.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode COMPLIANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"
```

## Step 3: Viewing and Verifying Locked Objects

Use the command aws s3api get-object-retention to view information about the Object Lock retention of an object:

```bash
aws s3api get-object-retention --bucket <bucketname> --key <destination-file-path> --endpoint-url=https://<endpoint>
```

- Replace \<bucketname>: Enter the name of your bucket.
- Replace \<destination-file-path>: Specify the path and name of the locked object.
- Replace \<endpoint>: Provide the endpoint for your plusserver S3 service.

Example outputs for Compliance and Governance modes:

**Compliance Mode:**

```json
{
    "Retention":
    {
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2023-08-11T15:45:59+00:00"
    }
}
```

**Governance Mode:**

```json
{
    "Retention":
    {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023
    }
}
```
