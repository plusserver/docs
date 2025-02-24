---
title: "Creating a Secure Veeam Policy for S3 Connection"
linkTitle: "Veeam S3 Policy"
type: "docs"
weight: 140
date: "2024-02-07"
---

In this section, you will learn how to create a secure IAM policy to establish a connection to your S3 bucket where backup data for the Veeam Backup Object Repository is stored. Please follow the instructions below based on your chosen approach: using non-immutable or immutable buckets.

You can modify the policy of a group in your S3 account under Groups → Group Name. Select the desired group and click on S3 group policy. Here, choose Custom and copy one of the following policies.

### Non-Immutable Buckets

For the use of non-immutable buckets, please use the following JSON policy to create a group policy. These permissions allow the Veeam Backup Service to access the S3 repository to store or retrieve data from an object repository.

{{% alert title="Info" %}}
Starting from Veeam Backup & Replication 11a, the **"ListAllMyBuckets"** permission is no longer required if you manually enter the bucket name in the **"Bucket" step** of the new object repository wizard.
{{% /alert %}}

```json
{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:GetBucketLocation",
                "s3:GetBucketVersioning",
                "s3:GetBucketObjectLockConfiguration"
            ],
            "Resource": [
                "arn:aws:s3:::yourbucketname/*",
                "arn:aws:s3:::yourbucketname"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets",
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
```

**Replace "yourbucketname" with the actual name of your bucket. Note that the "ListAllMyBuckets" permission is not required from Veeam Backup & Replication 11a onward if you manually specify the bucket name in the wizard.**

### Immutable Buckets

For the use of immutable buckets, please use the following JSON policy to create an IAM policy. These permissions allow the Veeam Backup Service to access the S3 repository to store or retrieve data from an object repository.

{{% alert title="Info" %}}
Starting from Veeam Backup & Replication 11a, the **"ListAllMyBuckets"** permission is no longer required if you manually enter the bucket name in the **"Bucket" step** of the new object repository wizard.
{{% /alert %}}

```json
{
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetBucketLocation",
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:GetBucketVersioning",
                "s3:GetBucketObjectLockConfiguration",
                "s3:ListBucketVersions",
                "s3:GetObjectVersion",
                "s3:GetObjectRetention",
                "s3:GetObjectLegalHold",
                "s3:PutObjectRetention",
                "s3:PutObjectLegalHold",
                "s3:DeleteObjectVersion"
            ],
            "Resource": [
                "arn:aws:s3:::yourbucketname/*",
                "arn:aws:s3:::yourbucketname"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListAllMyBuckets",
                "s3:ListBucket"
            ],
            "Resource": "arn:aws:s3:::*"
        }
    ]
}
```

**Replace "yourbucketname" with the actual name of your bucket. Note that the "ListAllMyBuckets" permission is not required from Veeam Backup & Replication 11a onward if you manually specify the bucket name in the wizard.**
