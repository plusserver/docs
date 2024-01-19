---
title: S3 User Portal
description: >
    Basic configuration to get started with your plusstorage S3 user portal.
---

In this section we will show you how to create a default group and assign permissions for the plusserver S3 web interface. This will allow users in this group to access all buckets.

{{% alert color="warning" %}}

Note that the security recommendation is that you create a new user to replace the root user. The root user should only be used in case of emergency.

{{% /alert %}}

### Login to the plusserver S3 web interface

1. open your web browser and visit the following web page: <https://s3-portal.psmanaged.com:9443/>

2. use the user credentials provided to you (you can find them in plusserver customer portal: <https://customerservice.plusserver.com/> under "Contracts and Billing" → Select S3 Contract → Access Credentials → "View Credentials") to log in. The username is "root", and use the password you know. You can also find the account ID here.

### Create a default group

1. after successful login, click "Groups" on the left side under "Access Management".

2. select "Create Group" option to create a new group.

3. enter a display name and a unique name for the group.

Here should be a picture

### Set rights for the group

1. In the group settings you can set the permissions for the users in this group. Please note that these permissions apply specifically to the plusserver S3 web interface.

2. Assign the group the necessary permissions to access the desired actions and resources. Here you can adjust the permissions based on your requirements.

{{% alert %}}

Please be careful when setting permissions and ensure that users are only given the necessary rights to ensure the security of their data.

{{% /alert %}}

There should be a picture here

### Apply group permissions for the S3 interface

1. We recommend that you select “Ransomware Mitigation” on the left to get started. This section provides a sample ransomware defense policy that can be used as a baseline. It is important to emphasize that this policy is intended as an example only and grants users broad permissions.

2. In the next step you can add users to this group. However, since we only create the user in step 5, click on “Create group” here.

{{% alert %}}

The example policy gives users broad access rights to S3 resources. Before applying this policy, please ensure that you limit your users' rights to the minimum necessary to ensure the security and privacy of your data.

{{% /alert %}}

For more information about each AWS permission, see the official AWS documentation: AWS User and role policy examples.

The sample ransomware defense policy can serve as a starting point to strengthen your security strategy. Remember to assign permissions specifically and check them regularly to ensure the integrity of your data.

There should be a picture here

### Create another user

1. On the left side, under "Access Management", select "Users". Here click on “Create user”.

2. Enter the user's full name in the appropriate field.

3. Assign a desired user name that will later be used to log in.

4. Set a strong password for the user.

5. Leave the “Deny access” option set to “No”. (This option allows a user's access to be denied later if necessary.)

6. Click "Continue" to continue.

7. On the next input mask you can select the group that you created previously.

8. Assigning this group automatically grants the user the previously defined permissions you set for this group. To finish, click “Create user”.

There should be a picture here

### User login

1. Either log in with the newly created user's credentials or use the root user to edit the user.

### Generation of an access key

1. After you have successfully logged in, you have the option to generate an access key.

2. An Access Key is a combination of an Access Key ID and a Secret Access Key. You need these credentials to access your resources using the AWS S3 Command Line Interface (CLI) or other compatible tools.

3. On the left side, under "Storage (S3)", select "My access keys".
4. Now click on the “Create Key” button to create a new access key.
5. On the first screen you have the option of specifying an end point (expiry time) for the access key. This means that the access key becomes invalid after this time has expired. Alternatively, you can set it to "unlimited" to not limit the validity.
6. After configuration, the access key and the secret access key will be displayed. The Secret Access Key is only displayed once. We strongly recommend that you save the secret key carefully and protect it from unauthorized access.
7. Alternatively, you can also use the option to download the access data in CSV format. This allows you to save and manage the access data.

{{% alert color="warning" %}}

Attention: Please be extremely careful when handling the access data, especially the Secret Access Key. These keys are critical to accessing your resources and should be handled with the utmost care. With this new access key you can now access your S3 resources smoothly.

{{% /alert %}}
