---
title: "S3 Regions and Endpoints"
linkTitle: "S3 Regions and Endpoints"
type: "docs"
weight: 10
date: "2024-02-06"
---

### What is a plusserver S3 Region?

The PlusServer S3 infrastructure allows the creation of buckets with specific regional properties.
The term "Region" refers to the physical location where your data is stored. The corresponding locations can be found in the table below.

### Available plusserver S3 Regions

| Region    | Endpoint                               | Location      |
|-----------|----------------------------------------|---------------|
| de-west-1 | `s3.de-west-1.psmanaged.com`           | Cologne       |
| de-north-2 | `s3.de-north-2.psmanaged.com`         | Hamburg       |
| de-west-2 | Planned                                | Dusseldorf    |

When using the S3 standard endpoint **us-east-1**, the objects will be stored in the **de-west-1** region.
{{% alert title="Note" %}}
To ensure optimal performance for your bucket, please select the appropriate endpoint from the table when retrieving data.
{{% /alert %}}

### S3 Locations and Data Centers

{{< img src="images/image-1.png" alt="plusserver Locations and data centers" >}}
