---
title: Georedundancy
description: >
    Details about our implementation of georedundant S3 storage.
---

{{% alert title="Important: S3 storage classes are determined by the bucket name." color="warning" %}}
Since the S3 standard does not support "bucket rename", a new bucket must be created for a storage class change and if necessary the object data of the old bucket must be migrated to the new bucket.
{{% /alert %}}

## Using the "-mirr" suffix

When you create a bucket with the "-mirr" suffix, all objects in that bucket are mirrored to a different GEO location. This means that each object in both regions has a 1:1 copy.
The objects are duplicated using either erasure coding or replication. For more information, see General storage of objects.
This option is suitable for data that must remain available in the event of a complete data center failure and requires additional redundancy. The prices for this option are included in your individual contract.
Plusserver S3 objects have a minimum billable object size of 128 KB. Smaller objects can be stored but will be billed at 128 KB.

## Using the "-repl" suffix

Alternatively, you can create a bucket with the "-repl" suffix to store all objects within that bucket as replication.
In this case, the replication of objects is distributed between two GEO locations rather than in a data center.
This option provides a lower cost geo-redundancy option compared to the "-mirr" option. Pricing for this option is included in your individual contract.
Plusserver S3 objects have a minimum billable object size of 128 KB. Smaller objects can be stored but will be billed at 128 KB.

{{% alert title="Please note" %}}

When creating buckets in our plusserver S3 service, you should note that your data is not only protected by site-wide erasure coding and replication, but is also protected per S3 storage node by an additional backup layer in the form of RAID technology.

**This also applies to buckets that are created without georedundance. (Buckets without -repl or -mirr).**

{{% /alert %}}

Differences between the options:

|Option|Storage|Redundancy|Example Site|Example Workloads|
|-|-|-|-|-|
|-mirr|Duplicate Storage with Erasure Coding and Duplicate Replication|Georedundant + Site Redundant|en-north-2 **and** de-west-1|Production Critical Applications or User Data|
|-repl|Replication of objects distributed to both data centers|georedundant only|en-north-2 **and** de-west-1|Double backup, cost-effective georedundancy|
|Standard|Regional Storage with Erasure Coding and Replication|Site Redundant only|de-north-2 **or** de-west-1|Production Data, Secure Data Storage within one Geolocation|
