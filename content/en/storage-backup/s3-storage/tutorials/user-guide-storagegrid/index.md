---
title: "User Guide - StorageGRID SSE / SSE-C"
linkTitle: "User Guide - StorageGRID SSE / SSE-C"
type: "docs"
weight: 30
description:
---

These instructions describe how you as a plusserver customer can use and test SSE-C and SSE on our StorageGRID. SSE-C means: Server-side encryption with the keys provided by you (SSE-C).

SSE allows you to store an object and encrypt it with a unique key that you provide along with the object. When the object is requested, the same key must be provided to decrypt and return the object

{{% alert title="Note for SSE-C" %}}
Objects that were uploaded with SSE-C cannot be downloaded via the web interface. This is because the key cannot be specified there.
This is therefore returned with a 400 error. However, the file can be retrieved via the S3 client in combination with the encryption key.
{{% /alert %}}

{{% alert title="Note for SSE-C" %}}
Meta information is NEVER encrypted. One of the reasons for this is that the object information must be retrievable in terms of encryption etc.
This cannot be changed. The encryption of the file is not affected by this. (The meta information can be viewed in Step 3, for example.
{{% /alert %}}

## How to SSE-C

### Step 1: Creat a Encryption Key

Example:

```bash
openssl enc -aes-128-cbc -pass pass:secret -P

salt=E9DBB6603C7B3D2A
key=23832BAC16516152E560F933F261BF03
iv =71E87C0F6EC3C45921C2754BA131A315
```

### Step 2: Store an object with the generated key

Parameter `--bucket` is the bucket name to which the PUT action was initiated.

Parameter `--key` Object key for which the PUT action was initiated.

Parameter `--body` stands for the path to a file.

Example:

```bash
aws s3api put-object --bucket <bucket> --key <file> --body "file" --sse-customer-algorithm AES256 --sse-customer-key 23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>
```

### Step 3: Display metadata of the object

If the customer key is not supplied, a 404 error warning is returned instead of the object.

Example:

```bash
aws s3api head-object --bucket <bucket> --key <file> --sse-customer-algorithm AES256 --sse-customer-key 23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>


            {
                "AcceptRanges": "bytes",
                "LastModified": "2022-05-02T19:20:02+00:00",
                "ContentLength": 47,
                "ETag": "\"f92ef20ab87e0e13951d9bee862e9f9a\"",
                "ContentType": "binary/octet-stream",
                "Metadata": {},
                "SSECustomerAlgorithm": "AES256",
                "SSECustomerKeyMD5": "rjGuMdjLpPV1eRuotNaPMQ=="
            }
```

### Step 4: Download object again

Example:

```bash
aws s3api get-object --bucket <bucket> --key <file> <file> --sse-customer-algorithm AES256 --sse-customer-key 23832BAC16516152E560F933F261BF03 --endpoint-url https://s3.example.com --profile <profile>
```

## How to SSE

Of course, you can do the same without generating a key. StorageGrid can generate this key and import it after correct authentication.
Please follow these instructions.

### Step 1: Upload an object

Example:

```bash
aws s3api put-object --bucket testbucket --key testfile --body "testfile" --server-side-encryption AES256 --endpoint-url https://de-2.s3.psmanaged.com --profile plusserver
```

### Step 2: display the meta information

Example:

```bash
aws s3api head-object --bucket testbucket --key testfile --endpoint-url https://de-2.s3.psmanaged.com --profile plusserver
```

The following line should appear there:  
`"ServerSideEncryption": "AES256"`
