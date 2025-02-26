---
title: "Creating Buckets with AWS CLI & Optional Object Lock Activation"
linkTitle: "Creating Buckets"
type: "docs"
weight: 20
date: "2024-02-07"
---

The AWS CLI allows you to interact comfortably with your plusserver S3 resources via the command line. Follow the steps below to create buckets and optionally activate Object Lock.

{{% alert title="Info" %}}
Note: Object Lock can only be activated during the initial bucket creation. Due to technical limitations, it is not possible to enable or disable Object Lock on an existing bucket afterwards.

**IMPORTANT:** If you need to enable or disable Object Lock for an already created bucket, you must create a new bucket with your Object Lock settings and then copy all object data from the old bucket to this new bucket.
{{% /alert %}}

### Step 1: Create a Bucket

To create a bucket, use the following command:

```bash
aws s3api create-bucket --bucket <bucketname> --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

Replace `<bucketname>` with the desired name for your bucket and `<endpoint-url>` with the corresponding endpoint. For example:

```bash
aws s3api create-bucket --bucket mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```

{{% alert title="Info" %}}
Every S3 bucket name must be unique and can exist only once globally in the plusserver S3 service – not only per customer but throughout the entire plusserver S3 environment.
If the chosen name is already in use by any customer, you will receive the following error messages:

```bash
An error occurred (BucketAlreadyOwnedByYou) when calling the CreateBucket operation: Your previous request to create the named bucket succeeded and you already own it.
```

or

```bash
An error occurred (BucketAlreadyExists) when calling the CreateBucket operation: The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.
```

{{% /alert %}}
{{% alert title="Info" %}}
Note that when using de-west-1, objects are stored in the data center in Cologne, and when using de-north-2, objects are stored in Hamburg.
The endpoint for Cologne is s3.de-west-1.psmanaged.com.
The endpoint for Hamburg is s3.de-north-2.psmanaged.com.

IMPORTANT: For optimal performance, an object should always be stored and accessed via the appropriate endpoint.
{{% /alert %}}

### Step 2: Create a Bucket with Object Lock and Versioning Activation

If you want to use Object Lock, you need to activate both Versioning and Object Lock. Use the following command:

The "--object-lock-enabled-for-bucket" parameter automatically enables both Versioning and Object Lock.

```bash
aws s3api create-bucket --bucket <bucketname> --object-lock-enabled-for-bucket --endpoint-url=https://<endpoint-url> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

Replace `<bucketname>` and `<endpoint-url>` accordingly. For example:

```bash
aws s3api create-bucket --bucket mylockedbucket --object-lock-enabled-for-bucket --endpoint-url=https://s3.de-west-1.psmanaged.com --region de-west-1 --create-bucket-configuration LocationConstraint=de-west-1
```

### Step 3: Check Bucket Settings

Use the command aws s3api get-bucket-versioning to display the versioning settings of a bucket:

```bash
aws s3api get-bucket-versioning --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

This command indicates whether versioning is enabled for the specified bucket.

Example output:

```bash
{
    "Status": "Enabled"
}
```

{{% alert title="Info" %}}
When versioning is disabled, you will not receive any output!

If you only wish to enable "Versioning" for the bucket, you can do so later. See [Versioning in S3](../versioning-in-s3) for details.
{{% /alert %}}
To check the Object Lock settings, use the command aws s3api get-object-lock-configuration:

```bash
aws s3api get-object-lock-configuration --bucket <bucketname> --endpoint-url=https://<endpoint-url>
```

This command provides information about whether Object Lock is enabled for the specified bucket.

Example output for an enabled Object Lock:

```bash
{
    "ObjectLockConfiguration":
    {
        "ObjectLockEnabled": "Enabled"
    }
}
```

Example output for a disabled Object Lock:

```bash
An error occurred (ObjectLockConfigurationNotFoundError) when calling the GetObjectLockConfiguration operation: Object Lock configuration does not exist for this bucket
```
