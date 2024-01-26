---
title: Policies by version
description: >
    Applying different retention policies to specific versions of objects.
---

In this section, you will learn how to upload objects with different versions to S3 while setting different object lock policies and retention policies. The Object Lock feature allows you to protect objects from accidental changes or deletions, while versioning allows you to store different versions of the same object.

### Upload objects with versioning

Use the aws s3 cp command to upload one or more versions of the same object to your bucket:
`aws s3 cp <local-file-path> s3://<bucket-name>/<destination-file-path> --endpoint-url=https://<endpoint>`

Explanation of variables:

`<local-file-path>`: The path to the file on your computer.
`<bucketname>`: The name of your bucket.
`<destination file path>`: The desired location and name of the object in the bucket.
`<endpoint>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3 cp mydocument.pdf s3://myversionedbucket/documents/mydocument.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Set Object Lock and Retention Policies

Use the following command to set Object Lock and Retention policies for a specific version of the object:
`aws s3api put-object-retention --bucket <bucketname> --key <destination file path> --version-id <version-id> --retention '{"Mode": "<retention-mode>", " RetainUntilDate": "<timestamp>"}' --endpoint-url=https://<endpoint>`

Explanation of variables:

`<bucketname>`: The name of the bucket.
`<target file path>`: The path of the object in the bucket.
`<version-id>`: The version ID of the specific version of the object.
`<retention mode>`: The desired object lock mode: Governance/Compliant
`<timestamp>`: The date and time until which the object should be locked.

Example:

`aws s3api put-object-retention --bucket mylockedbucket --key folder/myobject.pdf --version-id fe11c7b4-eeae-f76f-a6ff-1402ec8ef430 --retention '{"Mode": "GOVERNANCE", "RetainUntilDate" : "2023-08-11T17:45:59Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com`

By combining Object Lock and Versioning, you can provide different protections to different versions of the same object. Make sure you use the correct Object Lock, Versioning, and Retention values ​​based on your needs and configuration.

Note: The example described above is a general guide. The exact options may vary depending on your configuration.

### Review Object Lock and Retention Policies

To verify that the object is secured with Object Lock and the retention policies set, use the following command:
`aws s3api get-object-retention --bucket <bucketname> --key <target file path> --version-id <version-id> --endpoint-url=https://<endpoint>`

Explanation of variables:

`<bucketname>`: The name of the bucket.
`<target file path>`: The path of the object in the bucket.
`<version-id>`: The version ID of the specific version of the object.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api get-object-retention --bucket mylockedbucket --key folder/myobject.pdf --version-id fe11c7b4-eeae-f76f-a6ff-1402ec8ef430 --endpoint-url=https://s3.de-west- 1.psmanaged.com`

info

The output of the command shows you the current Object Lock and Retention policy for the specified object. This can help you ensure that the desired protection measures have been applied correctly.

Please note that the exact values ​​in the output may vary depending on your settings. To ensure that your Object Lock and Retention policies are configured correctly, ensure that the output matches your expectations.

Example output for an object version that has an object lock.

```json
{
    "Retention": {
        "Fashion": "GOVERNANCE",
        "RetainUntilDate": "2023-08-11T17:45:59+00:00"
    }
}
```

Example output for an object for which no object lock is set.
An error occurred (NoSuchObjectLockConfiguration) when calling the GetObjectRetention operation: The specified object does not have an ObjectLock configuration.
