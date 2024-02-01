---
title: Setting default policies
description: >
    Setting default policies for files uploaded to a bucket.
---

In this section you will learn how to provide all objects in a bucket with a retention by default. With this measure, all uploaded objects are automatically protected with a defined object lock retention.

### Define the standard retention for the bucket

Use the AWS S3api PUT-OBJECT-LOCK Configuration command to set a standard object lock retention for the entire bucket:
`AWS S3api Put-Object-Configuration --bucet <bucketName> --object-lock-Configuration '{" Objected ":" Enabled "," Rule ": {" Defaulting ": <" fashion ":" <retention -Modus> "," Days ": <tag>}} '--endpoint-URL = https: // <endpoint-url >`

Explanation of variables:

`<bucketName>`: The name of the bucket for which you want to activate the standard object lock retention.
`<Retention mode>`: The desired retention mode (governance or compliance), which is to be used by default for all uploaded objects.
`<tage>`: The number of days for which the retention is to be determined by default.
`<Endpoint-URL>`: The corresponding end point for your plus server S3 service.

Example:

```aws s3api put-object-lock-configuration --bucket mylockedbucket --object-lock-configuration '{"ObjectLockEnabled": "Enabled", "Rule": {"DefaultRetention": {"Mode": "GOVERNANCE" , "Days": 1}}}' --endpoint-url=https://s3.de-west-1.psmanaged.com```

Executing this command sets a default Object Lock retention that will be applied to all newly uploaded objects in this bucket. The objects are automatically protected with the set retention as soon as they are uploaded. In this example, the objects would be given a governance object lock for 1 day.

A notice:

Make sure to adjust the values ​​for `<bucketname>`, `<tage>` and `<mode>` according to your needs. The default retention policy is applied to all objects in the bucket that do not already have individual retention.

### Reading the bucket rule for Object Lock retention

Use the aws s3api get-object-lock-configuration command to read the current object lock retention bucket rule:
`aws s3api get-object-lock-configuration --bucket <bucketname> --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket for which you want to read the bucket rule.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api get-object-lock-configuration --bucket mylockedbucket --endpoint-url=https://s3.de-west-1.psmanaged.com`
Beispielausgabe

```json
{
    "ObjectLockConfiguration": {
        "ObjectLockEnabled": "Enabled",
        "Rule": {
            "DefaultRetention": {
                "Mode": "GOVERNANCE",
                "Days": 1
            }
        }
    }
}
```

### Upload an object and check the default Object Lock retention

Use the aws s3api put-object command to upload an object to the bucket.
`aws s3api put-object --bucket <bucketname> --key <destination file path> --body <local file path> --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket you want to upload the object to.
`<destination file path>`: The desired location and name of the object in the bucket.
`<local-file-path>`: The path and name of the local file to be uploaded.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /pfad/zu/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Verify the default Object Lock retention for the uploaded object

To verify that the object is secured with Object Lock and the retention policy set, use the following command:
`aws s3api get-object-retention --bucket <bucketname> --key <destination-filepath> --endpoint-url=https://s3.de-west-1.psmanaged.com`

Explanation of variables:

`<bucketname>`: The name of the bucket.
`<destination-file-path>`: The path of the object in the bucket.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

``aws s3api get-object-retention --bucket mylockedbucket --key folder/my-object.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com``.

By enabling the default object lock retention, you can ensure that all objects uploaded to the bucket are automatically assigned the desired retention. Make sure you specify the correct values for the retention modes and the number of days to meet your requirements.
