---
title: Sharing Objects
description: >
    Sharing objects over the internet with a publicly accessible URL.
---

In this part, you will learn how to make an object publicly available in your S3 bucket so that it can be accessed over the Internet.

### Upload the object

Upload the object to your S3 bucket.

`aws s3api put-object --bucket <bucketname> --key <objekt-key> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url>`

Explanation of variables:

`<bucketname>`: The name of the bucket where you want to upload the object.
`<object-key>`: The desired location and name of the object in the bucket.
`<local-file-path>`: The path and name of the local file to upload.
`<endpoint-url>`: The appropriate endpoint for your plusserver S3 service.

Example:

`aws s3api put-object --bucket <bucketname> --key <objekt-key> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url>`

### Generate the public URL

Generate the public URL of the object so that you can download it over the Internet
aws s3 presign s3://`<bucketname>`/`<object-key>` --endpoint-url=https://`<endpoint-url>`

Variable declaration:

`<bucketname>`: The name of the bucket where the object is located.
`<object-key>`: The path and name of the object in the bucket.
`<endpoint-url>`: The corresponding endpoint for your plusserver S3 service.

`aws s3 presign s3://mybucket/public-folder/mypublic-object.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com`.

The command outputs the URL with which the object can be reached via the Internet.
