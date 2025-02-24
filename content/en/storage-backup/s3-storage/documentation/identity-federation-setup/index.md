---
title: "Setting Up Identity Federation in plusserver S3"
linkTitle: "Identity Federation Setup"
type: "docs"
weight: 20
date: "2024-02-07"
---

You have the option to configure identity federation if you want to use groups and users from another system such as **Active Directory**, **OpenLDAP**, or **Oracle Directory Server**. This allows for seamless integration of your existing user and group management into the StorageGrid system, thus enabling your employees to use their familiar credentials to access plusserver S3 without having to manage separate credentials. Not only does this simplify administration, but it also enhances the security and user-friendliness of your plusserver S3 environment.

Our documentation will guide you through the process of setting up identity federation so you can quickly benefit from the advantages of this integration.

### Step 1: Log in to the plusserver S3 Customer Portal

{{< img src="images/image-1.png" alt="LoginScreen" >}}

1. Open your web browser and visit the following website: [plusserver S3 Portal](https://s3-portal.psmanaged.com:9443/).
2. Use the provided user credentials (you can find them in the [plusserver Customer Portal](https://customerservice.plusserver.com/) under "Contracts and Billing" → Select S3 contract → Access Data → "Show Credentials") to log in. The username is "root". Please use your personal password to proceed. The Account ID is also displayed here.

### Step 2: Set Up Identity Federation

1. Click on "Access Management" on the left side and choose "Identity Federation."
2. Here you have the choice between Active Directory, Azure, OpenLDAP, and Other.
3. You can then test the connection and save it.

Now you are able to use identity federation.
{{< img src="images/image-2.png" alt="IdendtityFederation" >}}

### Step 3: Create a Group

To grant appropriate permissions to your users, you need to create a group first. Follow these steps:

1. Click on "Groups" on the left side.
2. Select "Create Group."
3. In the group creation interface, choose the "Federated Group" tab.
4. Assign a unique name for the group. This name must be set according to the identity source. Please use the following guidelines:
    1. Active Directory: Use the "sAMAccountName" attribute.
    2. OpenLDAP: Use the "CN" (Common Name).
    3. Other LDAP servers: Determine the appropriate value for the unique name that corresponds to the LDAP server used.

By following these steps, you define an identity federation group derived from your identity federation. This group will serve as the central mechanism to assign users the appropriate access permissions to your resources.

{{< img src="images/image-2.png" alt="CreateGroup" >}}

{{% alert title="Info" %}}

If you want to create and manage users and groups via identity federation, it is important to consider this in bucket or group policies.

Here is an example of how you could create a policy for a bucket to grant access to only a specific user:
{{% /alert %}}

**Example:**

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

{{% alert title="Info" %}}
Please note that the prefix for users and groups from identity federation is "federated-user/" or "federated-group/" instead of "user/" or "group/."
This policy grants the specific user "USERNAME" (from identity federation) access to the specified bucket while denying access to all others.
It is advisable to carefully review and customize these policies according to the requirements of your identity federation and your access control strategy.
{{% /alert %}}
