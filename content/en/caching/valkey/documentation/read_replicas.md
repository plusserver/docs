---
title: "Read Replicas"
linkTitle: "Read Replicas"
type: "docs"
---


## Read Replica

Read Replicas enhance database scalability by distributing read operations across multiple CaaS instances, effectively managing high read traffic without impacting the performance of the primary database. This approach is ideal for applications requiring fast read access, as it improves response times while preserving the primary database's ability to handle write operations efficiently.

To establish a CaaS Read Replica, the system utilizes a filesystem snapshot from the primary database instance to initialize the secondary instance. It then employs the database engine's native asynchronous replication to ensure the read replica remains consistently updated with any alterations occurring in the source database instance.

## Limitations

- You can create a maximum of three additional read replicas per CaaS.
- Compute ressources and data storage size needs to be equal to the origin CaaS.
- It is not possible to convert a secondary server into a primary server to enable write access.
- Cascading configurations, where a secondary server acts as a source for another secondary server, are not supported.

## Prerequisites

Your application must be configured to distinguish between read and write operations. This involves setting up separate database connections for each type of operation:

- Write Operations: Connections should be directed exclusively to the primary server where data modifications (INSERT, UPDATE, DELETE) are allowed.
- Read Operations: Connections for queries that only fetch data should be routed to the read replicas.
- Use of a client that automatically recognizes primary and secondary nodes and uses them accordingly.
