---
title: S3 workloads
description: >
    Overview of suitable workloads for S3 storage.
---

### Suitable workloads for S3

- Static Web Pages: Hosting static web pages, such as HTML, CSS, and JavaScript, as S3 enables efficient delivery of web content.
- Data archiving: storing archival data and backups, as S3 provides cost-effective and durable storage.
- Big Data and Analytics: Store large data sets used for Big Data analytics and data warehousing.
- Content Delivery Network (CDN): Using S3 as a storage location for content distributed through a CDN to deliver content quickly and efficiently around the world.
- Media and file storage: Hosting multimedia files such as images, videos, and audio files for fast and reliable retrieval.

### Unsuitable workloads for S3

- Real-time databases: S3 is object-based and is not well suited for applications that require real-time database access.
- Applications with high latency sensitivity: Applications that require extremely low latency (<10ms) may be affected by S3's fundamental latency.
- Virtual machines: Storage of virtual machines in S3 is not recommended.
- Transaction-based applications: Applications that require many transactions or writes per second may be inefficient due to the basic structure of S3.
High IOPS applications: Applications that require a high number of input/output operations per second.
