---
title: "Set S3 Bucket to Read-Only Mode"
linkTitle: "Read-Only Bucket"
type: "docs"
weight: 70
date: "2024-02-07"
---

In this section, you will learn how to set an S3 bucket to **"Read Only"**, allowing for the retrieval of existing objects while preventing the creation or modification of new objects within the bucket.

### Step 1: Create the JSON Policy File

Start by creating a JSON file containing the bucket policy for **"Read Only"** access. For example, create the file `readonly-policy.json` with the following content:

```json
{
  "Version": "2012-10-17",
  "Id": "ReadOnlyPolicy",
  "Statement": [
    {
      "Sid": "AllowGet",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<account-id>:*"
      },
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::<bucketname>",
        "arn:aws:s3:::<bucketname>/*"
      ]
    },
    {
      "Sid": "DenyPut",
      "Effect": "Deny",
      "Principal": {
        "AWS": "arn:aws:iam::<account-id>:*"
      },
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:PutBucketPolicy"
      ],
      "Resource": [
        "arn:aws:s3:::<bucketname>",
        "arn:aws:s3:::<bucketname>/*"
      ]
    }
  ]
}
```

Explanation of variables in the JSON Policy:

- \<bucketname>: The name of the bucket for which you are creating the policy.

### Step 2: Enable "Bucket Policy" for "Read Only"

Use the `aws s3api put-bucket-policy` command to set the bucket to **"Read Only"**:

```bash
aws s3api put-bucket-policy --bucket <bucketname> --policy file://readonly-policy.json --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucketname>: The name of the bucket you want to set to "Read Only."
- file://readonly-policy.json: The path to the JSON Policy file on your local system.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api put-bucket-policy --bucket myreadonlybucket --policy file://readonly-policy.json --endpoint-url=https://s3.de-west-1.psmanaged.com
```

### Step 3: Verify the "Read Only" Status of the Bucket

Use the `aws s3api get-bucket-policy` command to ensure that the bucket is set to "Read Only":

```bash
aws s3api get-bucket-policy --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

Explanation of variables:

- \<bucketname>: The name of the bucket whose policy you want to check.
- \<endpoint-url>: The corresponding endpoint for your plusserver S3 service.

**Example:**

```bash
aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com
```

If you have the **'jq'** tool installed on your server, you can continue to display the output in a formatted way by appending **'| jq '.Policy | fromjson''**:

```bash
aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com | jq '.Policy | fromjson'
```

By setting a bucket to **"Read Only,"** you can restrict the ability to create or edit objects in the bucket while still allowing the retrieval of existing objects. Ensure that you customize the policy according to your requirements and verify that the desired permissions are granted or denied.

{{% alert title="Info" %}}
The examples provided above are general guidelines. Exact options may vary depending on the configuration.
{{% /alert %}}

### Step 4: Check if the Bucket is Set to Read-Only

To confirm that the bucket is indeed in **Read-Only** mode and no more objects can be uploaded, you can use the following command:

```bash
aws s3api put-object --bucket <bucketname> --key testfile.txt --body /path/to/local/file.txt --endpoint-url=https://<endpoint-url>
```

Here, you should receive a message with **"Access Denied."**
