---
title: Uploading Objects
description: >
    Upload objects to plusstorage S3 with the AWS CLI tool.
---

Uploading objects to plusserver S3 is easily done using the AWS CLI. The following steps show you how to upload objects to your created buckets.

### Upload an object

Use the aws s3 cp command to upload an object to a bucket:
`aws s3 cp <local-file-path> s3://<bucketname>/<destination-file-path> --endpoint-url=https://<endpoint-url>`

`<local-file-path>`: specify the path to the local file you want to upload.
`<bucketname>`: Specify the name of the destination bucket.
`<destination-file-path>`: Optional, specify the path in the bucket where the file will be saved.
`<endpoint-url>`: The appropriate endpoint, depending on your configuration.

Example:

`aws s3 cp /path/to/file.txt s3://mynewbucket/file.txt --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Viewing the bucket contents

Use the aws s3 ls command to display the contents of a bucket:

`aws s3 ls s3://<bucketname> --endpoint-url=https://<endpoint-url>`

Example:

`aws s3 ls s3://mynewbucket --endpoint-url=https://s3.de-west-1.psmanaged.com`

For more information, see: Using S3 commands managing objects copy.

### Uploading Objects to S3 with Object Lock

Uploading objects to plusserver S3 with Object Lock enabled enables advanced security control. Here are the steps to upload objects to your buckets using Object Lock.

Notice

To use this feature, ensure that the corresponding bucket has both versioning and object lock enabled. See Part 3 Step 2.

Difference between Compliance and Governance Object Lock

The plusserver S3 Service offers two modes of the Object Lock feature: Compliance and Governance. Both modes serve to ensure the immutability of objects, but with different levels of enforcement and opportunities for user actions.

Compliance Object Lock:

Objects in compliance mode cannot be deleted or changed as long as the retention period is active.
This mode provides the highest level of immutability. Once objects have been locked, they cannot be deleted or changed during the specified retention period.
Users cannot delete compliance-locked objects on their own, providing an additional layer of protection for critical data.

Governance Object Lock:

Objects in governance mode cannot be deleted or modified while the retention period is active.
Governance mode allows certain user actions to be performed that are not normally allowed in compliance mode. This includes deleting objects and removing the Object Lock feature if users have the required permissions.
Users with the necessary permissions can delete locked objects in governance mode, but an audit trail of such actions remains.

The following rights are related to the Governance Object Lock:

s3:BypassGovernanceRetention: To bypass governance retention on a locked object, the user needs the s3:BypassGovernanceRetention permission.
This permission allows the user to temporarily bypass governance retention and perform actions on the object.

s3:DeleteObjectVersion: To delete a locked object in governance mode, the user needs the s3:DeleteObjectVersion permission.
This permission allows the user to delete a specific version of the object.

s3:DeleteObjectVersionTagging: If a user wants to delete the tagging information of a version of a locked object, they need the s3:DeleteObjectVersionTagging permission.

s3:PutObjectLegalHold: To apply a legal hold lock to a specific version of a locked object, the user needs the s3:PutObjectLegalHold permission.

s3:PutObjectRetention: To set retention for a specific version of a locked object, the user needs the s3:PutObjectRetention permission.

Please note that the above permissions enable powerful actions that can affect the integrity and immutability of data. You should grant these permissions with caution and ensure that only trusted users have access to them. You should also speak to your data protection officer and, if necessary, to use further security, such as "multiadmin verification" (the logical distribution of access keys among several people) to avoid that a single person receives deletion rights.

It's a good idea to carefully plan your permissions structure and ensure that users are given only the permissions they really need to perform security-related actions. Please refer to the AWS S3 documentation here.

Notice

It is important to note that both compliance and governance object lock ensure the integrity and immutability of data. Die Wahl zwischen den Modi hängt von den spezifischen Anforderungen und dem Grad der Durchsetzung ab, den Sie für Ihre Daten benötigen. Bevor Sie sich für einen Modus entscheiden, ist es ratsam, die Bedürfnisse Ihrer Organisation und die gewünschte Schutzebene zu berücksichtigen.

Notice

Solange mindestens ein gelocktes Objekt sich innerhalb eines Buckets befindet, kann das Bucket nicht gelöscht werden.

Auch eine Kündigung des plusserver S3 Vertrages ist nicht möglich, solange sich noch gelockte Objekte in dem Kundenaccount befinden. Dieser muss solange weitergeführt werden, bis sämtliche Retention-Locks ausgelaufen sind und/oder die Objekte vom Kunden im Governance Mode gelöscht wurden.

### Upload an object with governance mode

Use the `aws s3api put-object` command to upload an object with Object Lock in governance mode:
`aws s3api put-object --bucket <bucketname> --key <destination file path> --body <local file path> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date <timestamp>`

Replace `<bucketname>`: Enter the name of the bucket you want to upload the object to.
Replace `<destination file path>`: Specify the path and name under which the uploaded object should be saved in the bucket.
Replace `<local-file-path>`: Specify the path and name of the local file to be uploaded.
Replace `<endpoint-url>`: Specify the appropriate endpoint for your plusserver S3.
Replace `<timestamp>`: Specify the date and time until which the object should be locked in governance mode. Format YYYY-MM-DDTHH:MM:SSZ (Y = Year, M = Month, D = Day, H = Hour, M = Minute, S = Second)

Example:

`aws s3api put-object --bucket mylockedbucket --key folder/myobject.pdf --body /path/to/myobject.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"`

### Upload an object with compliance mode

Use the same command with "COMPLIANCE" to upload an object with compliance mode:
`aws s3api put-object --bucket <bucketname> --key <destination file path> --body <local file path> --endpoint-url=https://<endpoint-url> --object-lock-mode COMPLIANCE --object-lock-retain-until-date <timestamp>`

Replace `<bucketname>`: Enter the name of the bucket you want to upload the object to.
Replace `<destination file path>`: Specify the path and name under which the uploaded object should be saved in the bucket.
Replace `<local-file-path>`: Specify the path and name of the local file to be uploaded.
Replace `<endpoint-url>`: Specify the appropriate endpoint for your plusserver S3.
Replace `<timestamp>`: Specify the date and time until which the object should be locked in governance mode. Format YYYY-MM-DDTHH:MM:SSZ (Y = Year, M = Month, D = Day, H = Hour, M = Minute, S = Second)

Example:

`aws s3api put-object --bucket mylockedbucket --key folder/myobject.pdf --body /path/to/myobject.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode COMPLIANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"`

### View and review the locked objects

Use the aws s3api get-object-retention command to view information about an object's Object Lock retention:
`aws s3api get-object-retention --bucket <bucketname> --key <destination file path> --endpoint-url=https://<endpoint>`

Replace `<bucketname>`: Specify the name of your bucket
Replace `<target file path>`: Specify the path and name of the locked object.
Replace `<endpoint>`: Specify the endpoint for your plusserver S3 service.

Example outputs for compliance and governance mode:

```json
{
    "Retention": {
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2023-08-11T15:45:59+00:00"
    }
}
```

```json
{
    "Retention": {
        "Fashion": "GOVERNANCE",
        "RetainUntilDate": "2023-08-11T15:45:59+00:00"
    }
}
```
