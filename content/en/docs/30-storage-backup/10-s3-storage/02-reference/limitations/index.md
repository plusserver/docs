---
title: Limitations
description: >
    Technical limitations and other things you should know.
---

### Number of buckets

AWS S3 provides a limit of 100 buckets per tenant by default. If required, this limit can be increased up to 1,000 buckets by a special activation from Amazon in AWS.

In comparison, our plusserver S3 service offers a limit of 1,000 buckets per client by default. Please note that this limit cannot be increased further.

### Storage of objects by size

The objects you store in these buckets are subject to certain storage rules.
Generally, objects are stored with Erasure Coding to ensure efficient and long-lasting storage.
However, if an object is smaller than 1 MB, it is stored with replication instead of Erasure Coding.
Plusserver S3 objects have a minimum billable object size of 128 KB. Smaller objects can be stored, but will be billed at 128 KB.

### Further limitations

Maximum object size: 5 TB
Minimum part size for multipart upload: 5 MiB
Maximum part size for multipart upload: 5 GiB
Maximum number of parts for multipart upload: 10,000
Bucket versioning per object version: 10,000
Maximum number of S3 access keys per user: 100
Maximum number of users or access keys in the entire cluster: unlimited

These limitations are designed to ensure the performance and efficiency of our service while providing flexibility for your use cases. Please keep these limitations in mind when planning your configuration.
