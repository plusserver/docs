---
title: Read-only bucket
description: >
  Set a specific bucket to to read-only.
---

In this section, you will learn how to set an S3 bucket to read only. This means that no new objects can be created or edited in the bucket, but existing objects can still be retrieved.

### Creating the JSON policy file

First, create a JSON file that contains the bucket policy for "read only" access. For example, you can create the readonly-policy.json file with the following content:

```json
{
  "Version": "2012-10-17",
  "Id": "ReadOnlyPolicy",
  "Statement": [
    {
      "Sid": "AllowGet",
      "Effect": "Allow",
      "Principal": "*",
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
      "Principal": "*",
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

Explanation of the variables in the JSON policy:

`<bucketname>`: The name of the bucket for which you want to create the policy.

### Enable the bucket policy for read only

Use the aws s3api put-bucket-policy command to set the bucket to "Read Only":

`aws s3api put-bucket-policy --bucket <bucketname> --policy file://readonly-policy.json --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket you want to set to read only.
`<file://readonly-policy.json>`: The path to the JSON policy file on your local system.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api put-bucket-policy --bucket myreadonlybucket --policy file://readonly-policy.json --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Verify the "Read Only" status of the bucket

Use the command aws s3api get-bucket-policy that the bucket has been set to "Read Only":
`aws s3api get-bucket-policy --bucket <bucketname> --endpoint-url=https://<endpoint-url>`

Variable declaration:

`<bucketname>`: The name of the bucket whose policy you want to check.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com`

If you have the 'jq' tool installed on your server, you can still display the output formatted by appending '| jq '.Policy | fromjson'."

`aws s3api get-bucket-policy --bucket myreadonlybucket --endpoint-url=https://s3.de-west-1.psmanaged.com | jq '.Policy | fromjson`

By setting a bucket to Read Only, you can restrict the ability to create or edit objects in the bucket while allowing retrieval of existing objects. Be sure to customize the policy according to your requirements and ensure that the desired permissions are granted or denied.

{{% alert title="Note" %}}

The examples described above are general instructions. The exact options may vary depending on the configuration.

{{% /alert %}}

### Check if the bucket is set to Read-Only

To make sure that the bucket is actually in read-only mode and no more objects can be uploaded, you can use the following command:
aws s3api put-object --bucket `<bucketname>` --key testfile.txt --body /path/to/local/file.txt --endpoint-url=https://`<endpoint-url>`

You should now get an "Access Denied" message here.
