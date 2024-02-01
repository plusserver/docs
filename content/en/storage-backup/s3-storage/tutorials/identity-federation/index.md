---
title: Identity federation
description: >
  Set up identity federation to integrate AD/LDAP or similar.
---

You have the option to configure Identity federation if you want to use groups and users from another system such as Active Directory, OpenLDAP, or Oracle Directory Server. This enables seamless integration of your existing user and group management into the StorageGrid system. This allows your employees to use their usual credentials to access plusserver s3 without having to manage separate credentials. This not only makes administration easier, but also increases the security and usability of your plusserver-s3 environment.
Our documentation walks you step-by-step through the process of setting up identity federation so you can quickly start reaping the benefits of this integration.

### Log in to the plusserver S3 customer portal

Open your web browser and visit the following website: <https://s3-portal.psmanaged.com:9443/>

Use the user data provided to you (you can find this in the plusserver customer portal: <https://customerservice.plusserver.com/> under "Contracts and billing" → Select S3 contract → Access data → "Show login information") to log in. The username is "root" and use the password you know. You can also find the account ID here.

### Set up the Identity Federation

On the left, under "ACCESS MANAGEMENT", click Identity federation.
Here you can choose between Active Directory, Azure, OpenLDAP and Other.

You can then test the connection and then save it.

You are now able to use the Identity federation.

### Set up a group

To give your users the appropriate permissions, you must first create a group. To do this, follow the steps below:

On the left, click Groups.

Then select Create Group.

In the group creation interface, select the Federated Group tab.

Give the group a unique name. This name must be set according to the identity source. Please use the following guidelines:

- Active Directory: Use the "sAMAccountName" attribute.

- OpenLDAP: Use the "CN" (Common Name).

- Other LDAP servers: Determine the appropriate distinguished name value that corresponds to the LDAP server in use.

By following these steps, you will establish an Identity Federation group that is derived from your Identity Federation. This group will serve as a central mechanism for assigning users the appropriate access permissions to your resources.

{{% alert title="Notice" %}}

If you want to create and manage users and groups via identity federation, it is important to take this into account in the bucket or group policies.
Here is an example of how you might create a policy on a bucket to only grant access to a specific user:

Example:
You only want to allow one user for a bucket.
For example, the following policy would work for this:

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

Please note that the prefix for users and groups from the Identity federation is "**federated-user/**" and "**federated-group/**" respectively, instead of "**user/**" or "**group/**".

With this policy, the specific user "USERNAME" (from the Identy federation) will be granted access to the specified bucket while all others will be denied access.

It is advisable to review these policies carefully and adapt them according to the needs of your identity federation and access control strategy.

{{% /alert %}}
