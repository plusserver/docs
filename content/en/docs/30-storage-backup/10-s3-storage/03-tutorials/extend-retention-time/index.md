---
title: Extend retention
description: >
    Extend the retention time of an object with enabled object lock.
---

In this section, you will learn how to extend the retention time of an object with Object Lock enabled.

### Upload an object with Object Lock

Start by uploading an object with an object lock governance option of 1 hour, for example.

`aws s3api put-object --bucket <bucketname> --key <object-key> --body <local-file-path> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"`

Explanation of variables:

`<bucketname>`: The name of the bucket you want to upload the object to.
`<object-key>`: The desired location and name of the object in the bucket.
`<local-file-path>`: The path and name of the local file to upload.
`<endpoint-url>`: The appropriate endpoint for your plusserver S3 service.

Example:

`aws s3api put-object --bucket mylockedbucket --key folder/myobject.pdf --body /path/to/myobject.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "$(date -u +"%Y-%m-%dT%H:%M:%SZ" -d "+1 hour")"`

### Retention display

Check the current retention time of the uploaded object.

`aws s3api get-object-lock-retention --bucket <bucketname> --key <object-key> --endpoint-url=https://<endpoint-url>`

Variable declaration:

`<bucketname>`: The name of the bucket where the object is located.
`<object-key>`: The path and name of the object in the bucket.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api get-object-retention --bucket mylockedbucket --key folder/my-object.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com`

Sample output:

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T08:58:34+00:00"
    }
}
```

### Extend retention

Extend the retention time of the uploaded object by another hour.

`aws s3api put-object-retention --bucket <bucketname> --key <object-key> --retention '{"Mode": "GOVERNANCE", "RetainUntilDate":"<new-date>"}' --endpoint-url=<endpoint-url>`

Variable declaration:

`<bucketname>`: The name of the bucket where the object is located.
`<object-key>`: The path and name of the object in the bucket.
`<new-date>`: The new date and time until which the retention should be extended.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api put-object-retention --bucket mylockedbucket --key folder/myobject.pdf --retention '{"Mode": "GOVERNANCE", "RetainUntilDate": "2023-08-14T09:58:34Z"}' --endpoint-url=https://s3.de-west-1.psmanaged.com`

### Display the new retention

Check the updated retention time of the object to make sure it has been successfully extended.

`aws s3api get-object-lock-retention --bucket <bucketname> --key <object-key> --endpoint-url=https://<endpoint-url>`

Variable declaration:

`<bucketname>`: The name of the bucket where the object is located.
`<object-key>`: The path and name of the object in the bucket.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

Example:

`aws s3api get-object-retention --bucket mylockedbucket --key folder/my-object.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com`

Sample output:

```json
{
    "Retention": {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-14T09:58:34+00:00"
    }
}
```
