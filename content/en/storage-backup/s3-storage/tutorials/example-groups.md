---
title: "Example Standard Groups for S3 User Management"
linkTitle: "Standard Groups Example"
type: "docs"
weight: 110
date: "2024-02-07"
---

In this section, we provide you with some **example standard groups** that you can create for S3 user management. These groups are designed to define various levels of access for users in your S3 environment. Please note that the actual names of groups, permissions, and users may vary depending on your specific requirements and organizational structure.

{{% alert title="Info" %}}
These example standard groups serve as a starting point and can be adapted to the needs of your organization. They provide a basic template for common scenarios in S3 user management using the plusserver S3 service. For detailed information on AWS S3 permission policies and their configuration, we strongly recommend reading the official [AWS documentation on S3 Access Control](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html). Additionally, you can find specific information and recommendations for access management in StorageGrid in the [Usage of Bucket and Group Access Policies](https://docs.netapp.com/us-en/storagegrid-117/s3/bucket-and-group-access-policies.html). These resources offer detailed insights into the available actions, resources, and configuration options, allowing you to tailor access controls to the specific needs of your business. You can also use the [AWS Policy Generator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html) to create custom permission policies precisely tailored to your requirements.
{{% /alert %}}

### Group with access to specific Buckets
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::bucket1/*",
        "arn:aws:s3:::bucket2/*"
      ]
    }
  ]
}
```
### Group with read-only access to specific Buckets

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::bucket3/*",
        "arn:aws:s3:::bucket4/*"
      ]
    }
  ]
}
```

### Group with access to specific folders in Buckets

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::bucket5/folder1/*",
        "arn:aws:s3:::bucket6/folder2/*"
      ]
    }
  ]
}
```

### Example administrative group with access to all Buckets with selected actions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy"
      ],
      "Resource": "*"
    }
  ]
}
```
