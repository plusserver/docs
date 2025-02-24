---
title: "Known Issues"
linkTitle: "Known Issues"
type: "docs"
weight: 40
date: "2024-02-06"
---

### Limited deletion possible via S3 user portal

The deletion of objects and buckets in the S3 user portal or Tenant Api is a background process with a low priority set by the manufacturer. This can result in the operations taking a long time, even with small amounts of data. It is recommended to perform the deletion via the S3 client API. You can find an example in the tutorials (<https://docs.plusserver.com/en/storage-backup/s3-storage/tutorials/>)
