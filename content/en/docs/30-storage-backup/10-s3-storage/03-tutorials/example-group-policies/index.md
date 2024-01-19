---
title: Example group policies
description: >
  Some default policies for you to adapt to your use case.
---

In this part, we will show you some sample standard groups that you can create for S3 User Management. These groups are used to define different levels of access for users in your S3 environment. Please note that the actual names of the groups, permissions and users may vary depending on your specific requirements and organizational structure.

### Access to specific buckets

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

### Read-only access to specific buckets

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

### Access to certain folders inside a bucket

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

### Administration group with access to all buckets with specified actions

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
