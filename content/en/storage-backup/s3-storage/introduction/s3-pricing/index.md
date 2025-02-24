---
title: "S3 Pricing and Storage Policies"
linkTitle: "S3 Pricing and Policies"
type: "docs"
weight: 20
date: "2024-02-06"
---

Here you will find the prices for the various service classes of our PlusServer S3 service.

## Prices per GB

| Service Class | Price per GB\* |
| ------------- | -------------- |
| Standard      | €0.022         |
| Replication   | €0.039         |
| Mirror        | €0.044         |

\*List Prices as of 08/02/2024

## Storage Policies

### S3 Service Class "Standard"

In this service class, the following storage policies apply:

- Objects are generally stored with Erasure Coding to ensure efficient and durable storage.
- For objects smaller than 1 MB, storage with replication is preferred over Erasure Coding.
- A minimum billing size of 128 KB is applied, meaning even smaller objects will be invoiced at this size.

### S3 Service Class "Mirror" (<bucketname>-mirr)

For this service class, the following guidelines apply:

- All objects in this bucket are mirrored to a different GEO location to provide additional redundancy. This means that a complete Erasure Coding object, for example, in Cologne, has a copy of the same object stored in Hamburg.
- Objects smaller than 1 MB are stored with replication and also mirrored.
- A minimum billing size of 128 KB is applied.

### S3 Service Class "Replication" (<bucketname>-repl)

For this service class, the following guidelines apply:

- All objects in this bucket are stored as replication between two GEO locations, such as between Cologne and Hamburg. A copy is kept in both Hamburg and Cologne.
- A minimum billing size of 128 KB is applied.

### Additional Information for Storage Policies

These storage policies ensure that your data is efficiently and securely stored based on the selected service class. While small objects with a size below 128 KB can be stored, they will be billed with a minimum size of 128 KB. This is because storing such small objects incurs higher storage overhead in our S3 system.

{{% alert title="Important Note" %}}
When creating buckets in our PlusServer S3 service, please note that your data is protected not only through cross-site Erasure Coding and replication but also on a per S3 storage node basis through an additional security layer in the form of RAID technology. This applies even to buckets created without georedundancy (buckets without -repl or -mirr).
{{% /alert %}}

### Differences between Storage Policies

| Option   | Description                                                   | Redundancy                    | Locations                | Use Case                                                  |
| -------- | ------------------------------------------------------------- | ----------------------------- | ------------------------ | --------------------------------------------------------- |
| -mirr    | Dual storage with Erasure Coding and replication in duplicate | Georedundant + Site Redundant | de-north-2 and de-west-1 | Production-critical applications or user data             |
| -repl    | Replication of objects distributed between both data centers  | Only Georedundant             | de-north-2 and de-west-1 | Double backup, Cost-effective georedundancy               |
| Standard | Regional storage with Erasure Coding and replication          | Only Site Redundant           | de-north-2 or de-west-1  | Production data, Secure data storage within a geolocation |

This table provides an overview of the main differences between the options for creating buckets in our new S3.

{{% alert title="Important" %}}
S3 storage classes are determined by the bucket name. Since the S3 standard does not support "Bucket Rename," creating a new bucket is required to change the storage class, and if necessary, object data from the old bucket must be migrated to the new bucket.
{{% /alert %}}
