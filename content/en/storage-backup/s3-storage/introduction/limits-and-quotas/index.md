---
title: "S3 Limits and Quotas"
linkTitle: "S3 Limits and Quotas"
type: "docs"
weight: 30
date: "2024-02-06"
---

## Number of Buckets

AWS S3 provides a default limit of 100 buckets per tenant. This limit can be increased to up to 1,000 buckets through a special activation by Amazon in AWS if needed.

In comparison, our PlusServer S3 service has a default limitation of 1,000 buckets per tenant. Please note that this limit cannot be further increased.

## General features and restrictions

- Maximum of 200 (GET/HEAD) RPOs and 200 (PUT/POST/DELETE) RPOs per tenant
- Up to 100 million objects per bucket
- Up to 5 TiB object size
- 1MB minimum object size recommended (1,000,000 bytes = 1MB)
- Maximum object size: 5 TB
- Minimum part size for multipart upload: 5 MiB
- Maximum part size for multipart upload: 5 GiB
- Maximum number of parts for multipart uploads: 10,000
- Bucket versioning per object version: 10,000
- Maximum number of S3 access keys per user: 100
- Maximum number of users or access keys in the entire cluster: unlimited
- AWS S3 API compatible
- Metadata can be stored for objects as key-value pairs (via S3 API)
- Object lock support
- Versioning support

### Bucket-Namen Features und Beschränkungen:

- A bucket name must be between 3 (min) and 63 (max) characters long. The suffix (-mirr / -repl) must be deducted from this
- a bucket name may only contain lowercase letters, numbers, dots (.) and hyphens
- A bucket name must not contain the format of an IP address (e.g. 192.168.1.42)
- If a bucket name ends with the suffix -mirr or -repl, a different class of service is used,
storage type and billing is used
- A bucket name must be unique across the entire plusserver S3 service
- A bucket name that is already in use by a customer cannot be used until
this bucket is deleted by the owner

These limitations are designed to ensure the performance and efficiency of our service while providing high flexibility for your use cases. Please consider these limitations when planning your configuration.

### Architecture & Design

Our S3 service allows not only logical separation at the bucket level but also enables the creation of folders within a bucket. This provides flexibility in organizing your data.

To ensure secure separation and control of data access, group policies can be applied at various levels—whether at the bucket level, folder level, or for individual objects. The "Group Policies" feature can also implement complex security structures to meet your requirements.

Please note that pure separation at the bucket level on a large scale may not be unrestrictedly feasible, as there is a fixed limit for buckets per tenant.

### Performance Basics

For optimal performance, an object should always be stored and retrieved using the appropriate endpoint. In the case of mirrored or replicated S3 objects, both sides can be used as endpoints.
Generally, the client or application region using S3 should be considered to determine the shortest path to the endpoint.

The S3 standard uses the HTTPS protocol, which can lead to architecture-related protocol latencies. This includes geographical location and network connection quality, which can affect access time.

It is essential to note that the S3 service is not suitable for latency-critical workloads or applications that require continuously updated data or demand continuous latency sensitivity of under 25 milliseconds. The actual latency from the S3 service can vary significantly depending on the network conditions of the client or application and may be lower or higher. It is essential to note that plusserver cannot guarantee latency due to various factors.
Workloads such as real-time databases, virtual machines, transaction-based applications, and applications with high I/O operations are generally not suitable for the service. Other storage services are available for such requirements, such as the plusstorage Fileservice NFS/SMB.

Access to the S3 endpoint is via the Internet. In this process, bottlenecks may occur that can affect performance. Some examples of possible causes are:

- Using multiple parallel threads can significantly improve performance, especially in backup software solutions that store backup data in S3 (e.g., Veeam).
- The bottleneck may be the client's internet uplink.
- The S3 client may not be optimally configured.
- The S3 client software may not be suitable for the workload.
- The wrong endpoint is being used.

Optimal configuration and selecting the right endpoint contribute to ensuring smooth and powerful use of our S3 service.

## Suitable and Unsuitable Workloads for S3 Standard

### Suitable Workloads for S3:

- Static Websites: Hosting static websites, such as HTML, CSS, and JavaScript, as S3 enables efficient content delivery for web content.
- Data Archiving: Storing archive data and backups, as S3 offers cost-effective and permanent storage.
- Big Data and Analytics: Storing large datasets used for big data analytics and data warehousing.
- Content Delivery Network (CDN): Using S3 as a storage location for content distributed via a CDN to provide content quickly and efficiently worldwide.
- Media and File Storage: Hosting multimedia files such as images, videos, and audio files for fast and reliable retrieval.

### Unsuitable Workloads for S3:

- Real-time Databases: S3 is object-based and not well-suited for applications that require real-time database access.
- Applications with High Latency Sensitivity: Applications requiring extremely low latency (<25ms) may be affected by the fundamental latency of S3.
- Virtual Machines: Storing virtual machines in S3 is not recommended.
- Transaction-based Applications: Applications requiring many transactions or write accesses per second could be inefficient due to the fundamental structure of S3.
- High IOPS Applications: Applications requiring a high number of input/output operations per second.
