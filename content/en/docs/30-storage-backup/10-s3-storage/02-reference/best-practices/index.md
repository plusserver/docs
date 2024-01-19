---
title: Best practices
description: >
    Ensure optimal performance by adhering to best practices.
---

### Architecture & Design

Our S3 service not only allows logical separation at the bucket level, but you can also create folders within a bucket. This gives you the flexibility to further organize your data.

To ensure secure separation and control of data access, group policies can be applied at different levels - be it bucket level, folder level or for individual objects. The Group Policies feature can also be used to implement complex security structures to meet your requirements.

Please note, however, that pure separation at bucket level cannot be implemented on a large scale without restrictions, as there is a fixed limit for buckets per client.

### Performance Basics

To ensure optimal performance when storing objects and retrieving data, we recommend that you use the appropriate S3 endpoint. With mirrored or replicated S3 objects, both sides can be used as the endpoint without performance limitations.

The S3 standard uses the HTTP protocol, which can result in architecture-related protocol latencies. This includes geographic location and network connection quality, which can affect access time.
For highly critical and performance-intensive data with very low access latency (>= 10ms), we recommend using a different storage service, such as the plusstorage file service.

The S3 endpoint is normally accessed via the Internet. Bottlenecks can occur in this process that can affect performance. Some examples of possible causes are:

- Using multiple parallel threads can significantly increase performance, especially for backup software solutions that store backup data in S3.
- The bottleneck may be the client's Internet uplink.
- The S3 client may not be configured optimally.
- The wrong endpoint is being used.

Optimal configuration and selection of the right endpoint help ensure smooth and high-performance use of our S3 service.
