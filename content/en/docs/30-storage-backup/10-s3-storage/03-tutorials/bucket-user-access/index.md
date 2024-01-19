---
title: Bucket user access
description: >
    Granting access to buckets only for certain users.
---

In this section, you will learn how to configure an S3 bucket so that only a specific user has access to it. This allows you to refine access control at a granular level and restrict access to the bucket to a specific user.

### Preparing the information

In order to create a policy of this type, you need a set of information:

|Variable|Explanation|Example value|
|-|-|-|
|ACCOUNT_ID|The account ID you have already used to log in to the S3 User Portal. You can also view this on the dashboard (see below).|700001145864652591|
|USERNAME|The username of the particular user for whom a granular access policy should be created.|mmustermann|
|BUCKET_NAME|The name of the bucket whose access is regulated by this policy.|shop-thumbnails|

### Create the bucket policy

Policies can usually be defined by .json objects, in this case create a user-policy.json and replace the corresponding variables with the information collected in the last step.

If the respective user/group is an identity federation (e.g. from your LDAP/AD), the prefix federated-user/USERNAME or federated-group/GROUPNAME must be used.

```json
{
  "Version": "2012-10-17",
  "Id": "UserBucketPolicy",
  "Statement": [
    {
      "Sid": "AllowUserAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "DenyOtherAccess",
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    }
  ]
}
```

In this specific case the resulting policy looks like this:

```json
{
  "Version": "2012-10-17",
  "Id": "UserBucketPolicy",
  "Statement": [
    {
      "Sid": "AllowUserAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::700001145864652591:user/mmustermann"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::shop-thumbnails",
        "arn:aws:s3:::shop-thumbnails/*"
      ]
    },
    {
      "Sid": "DenyOtherAccess",
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": "arn:aws:iam::700001145864652591:user/mmustermann"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::shop-thumbnails",
        "arn:aws:s3:::shop-thumbnails/*"
      ]
    }
  ]
}
```

### Setting the bucket policy

`aws s3api put-bucket-policy --bucket <bucketname> --policy file://<policy-name>.json --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket whose policy you want to check.

`<policy-name>`: The name of the policy file you created.

`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

So for our example:

`aws s3api put-bucket-policy --bucket shop-thumbnails --policy file://user-policy.json --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Verify the bucket policy

Use the aws s3api get-bucket-policy command to verify that the desired policy has been set:

`aws s3api get-bucket-policy --bucket <bucketname> --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket whose policy you want to check.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

So for our example:

`aws s3api get-bucket-policy --bucket shop-thumbnails --endpoint-url=https://s3.de-west-1.psmanaged.com`

After running this command, the output should be matched against the policy you set and ideally should be identical.
