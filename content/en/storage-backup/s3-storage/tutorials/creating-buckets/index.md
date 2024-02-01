---
title: Creating buckets
description: >
  Create buckets using the AWS CLI.
---

The AWS CLI allows you to conveniently interact with your plusserver S3 resources via the command line. Follow the steps below to create buckets and enable Object Lock if necessary.

{{% alert %}}

Attention only during initial bucket creation you can enable Object Lock. It is technologically not possible to activate or deactivate Object Lock on an already existing bucket.

IMPORTANT: If you want to activate or deactivate Object Lock for an already created bucket, you have to create a new bucket with your Object Lock setting and then copy all object data from the old bucket to this new bucket.

{{% /alert %}}

### Creating a bucket

To create a bucket, use the following command:

```bash
aws s3api create-bucket --bucket <bucketname> --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

Replace `<bucketname>` with the desired name for your bucket and `<endpoint-url>` with the appropriate endpoint. For example, using de-west-1 it would be:

```bash
aws s3api create-bucket --bucket mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```

{{% alert title="Note" %}}

Each S3 bucket name must be unique and may only exist once globally in the plusserver S3 service - not only per customer, but within the entire plusserver S3 environment.

If the selected name is already in use by any customer, you will see the following error message:

```text
An error occurred (BucketAlreadyOwnedByYou) when calling the CreateBucket operation: Your previous request to create the named bucket succeeded and you already own it.
```

or

```text
An error occurred (BucketAlreadyExists) when calling the CreateBucket operation: The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.
```

{{% /alert %}}

{{% alert title="Note" %}}

Note that when using de-west-1 the objects are stored in the data center in Cologne and when using de-north-2 the objects end up in Hamburg.
The endpoint for Cologne is s3.de-west-1.psmanaged.com.
The endpoint for Hamburg is s3.de-north-2.psmanaged.com

IMPORTANT: For optimal performance, an object should always be stored and accessed via the appropriate endpoint.

{{% /alert %}}

### Creating a bucket when enabling Object Lock and Versioning

If you want to use Object Lock, you must enable both Versioning and Object Lock. To do this, use the following command:

The `--object-lock-enabled-for-bucket` parameter automatically enables versioning as well as Object Lock.

```bash
aws s3api create-bucket --bucket <bucketname> --object-lock-enabled-for-bucket --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

Replace `<bucketname>` and `<endpoint-url>` accordingly. For example:

```bash
aws s3api create-bucket --bucket mylockedbucket --object-lock-enabled-for-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```

### Checking the settings of a bucket

Use the `aws s3api get-bucket-versioning` command to view the versioning settings of a bucket:

```bash
aws s3api get-bucket-versioning --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

This command indicates whether versioning is enabled for the specified bucket.
Sample output:

```json
{
    "Status": "Enabled"
}
```

{{% alert title="Note" %}}

If versioning is disabled, you will not get any output!
If you only want the bucket feature "versioning", you can activate it afterwards. See part 6 step 0

{{% /alert %}}

To check the object lock settings, use the command `aws s3api get-object-lock-configuration`:

```bash
aws s3api get-object-lock-configuration --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

This command tells whether Object Lock is enabled for the specified bucket.

Sample output when object lock is enabled

```json
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": { "Enabled".
  }
}
```

Example output when object lock is not enabled

```text
An error occurred (ObjectLockConfigurationNotFoundError) when calling the GetObjectLockConfiguration operation: Object Lock configuration does not exist for this bucket
```
