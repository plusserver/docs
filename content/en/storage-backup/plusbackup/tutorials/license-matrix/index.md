---
title: "Workstation vs Server License Features"
linkTitle: "Workstation vs Server License Features"
type: "docs"
description: ""
weight: 30
---

Veeam has two different purchase license versions, Workstation and Server, which include the following features.

See this [Link](https://www.veeam.com/veeam_agents_feature_comparison_ds.pdf)

| Feature | Workstation | Server | Description |
| -------- | -------- | -------- | --------| 
| **Backup** |  |  |  
| Entire computer   | ✅ | ✅    |  Image-based backup of entire computers for bare-metal recovery       |
| Volume-level   | ✅   | ✅   |    Image-based backup of defined volumes, system partitions, hard disks     |
| File-level   | ✅   | ✅   |    Backup of defined files and folders. Simple user selection and filtering for the backup configuration.   |
| **Recovery** |  |  |  
| Bare-metal recovery  | ✅ | ✅    |  Restore the entire system to the same hardware or another hardware with a bootable recovery image containing the recovery tools. |
| Volume-level recovery  | ✅   | ✅   |    	Restore a volume, system partition, hard disk    |
| File-level recovery  | ✅   | ✅   |    	Restore individual files and folders   |
| **Application-Aware Processing**|  |  |  
| Application-aware processing  | ✅   | ✅   |  Application-consistent backups with advanced application-aware processing (including transaction log truncation).  |
|File indexing and search| ✅   | ✅   |   A file catalog with index with which you can perform individual searches to find and restore files for which you do not know all the details (file path, deletion date, exact file name, ...)   |
| Transaction log backup | ✅   | ✅   |  Transaction logs for Microsoft SQL and Oracle databases |
| **Backup Targets** |  |  |  
| Object Storage| ✅ | ✅  | Back up to on-prem or cloud object storage. |
| Local storage| ✅ | ✅  |  Backup to local attached media     |
| Rotated USB media| ✅ | ✅  |  Backup up to USB Hard Drives  |
| Shared folder| ✅ | ✅  | Backup up SMB file shares |
| Veeam backup repository| ✅ | ✅  | Configuration of a backup repository as a backup target. This includes object storage (S3).      |
|Veeam Cloud Connect Repository| ✅ | ✅  |  Off-site cloud copy of the backup data    |
| **Backup Options** |  |  |  
| External USB drive backup | ✅ | ✅  |  |
| Parallel disk processing | N/A | ✅  |  |
| Parallel disk processing | partially | ✅  |  |
| Endpoint protection for mobile users | ✅ | ✅  |  |
| Network management | ✅ | ✅  |  |
| Synthetic full | ✅ | ✅  |  |
| Source-side encryption | ✅ | ✅  |  |
| Changed block tracking (CBT) driver | ✅ | ✅  |  |
| **Retention and Scheduling** |  |  |  
| Retention based on days when computer was used | ✅ | ✅  |  |
| Retention based on restore points | | ✅  |  |
| Daily schedule and backup events| ✅ | ✅  |  |
| Continuous, daily, weekly and monthly schedule | | ✅  |  |
| GFS | | ✅  |  |
| Adjustable backup window | | ✅  |  |
| **Deployment and Configuration** |  |  | 
| Silent installation and upgrade | | ✅  |  |
| Configuration API| | ✅  |  |
| **Integration with Veeam Backup & Replication** |  |  | 
| SureBackup® | ✅ | ✅  |  |
| Agent management| ✅ | ✅  |  |
| Integration with software deployment tools | ✅ | ✅  |  |
| Managed jobs | | ✅ |  |
| Managed policies | ✅ | ✅  |  |
| Secure Bare Metal Recovery with Recovery Tokens | ✅ | ✅  |  |
| Instant VM Recovery ® | ✅ | ✅  |  |
| Direct Restore to AWS/Microsoft Azure/Azure Stack | ✅ | ✅  |  |
| Volume-level recovery | ✅ | ✅  |  |
| Export as virtual disk | ✅ | ✅  |  |
| Veeam Explorer™ for Microsoft Exchange | partially | ✅  |  |
| Veeam Explorer for Microsoft SQL Server | partially | ✅  |  |
| Veeam Explorer for Microsoft SharePoint  | partially | ✅  |  |
| Veeam Explorer for Oracle | partially | ✅  |  |
| Veeam Explorer for Microsoft Active Directory | partially | ✅  |  |
| Search and 1- click restore | partially | ✅  |  |
| **Security & Compliance** |  |  | 
| Deployment in IPv6 environments | ✅ | ✅  |  |
| Deployment in Kerberos-only environments | ✅ | ✅  |  |
| FIPS compliance| ✅ | ✅  |  |
| Mordern email reporting | ✅ | ✅  |  |
| Veeam Agent for Linux on IBM Power | | ✅ |  |
| Veeam Agent for Linux nosnap (x86_64) | ✅ | ✅  |  |
| Veeam Agent for Unix management  | | ✅ |  |
| Linux Deployer Package | ✅ | ✅  |  |
| Entire computer | ✅ | ✅  |  |
| Volume-level | ✅ | ✅  |  |
| File-level | ✅ | ✅  |  |
| Built-in volume snapshot and changed block tracking | ✅ | ✅  |  |
