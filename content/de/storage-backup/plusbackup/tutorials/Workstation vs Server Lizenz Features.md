---
title: "Workstation vs Server Lizenz Features"
linkTitle: "Workstation vs Server Lizenz Features"
type: "docs"
description: ""
weight: 30
---

Veeam besitzt zwei verschiedene Kauf-Lizenzversionen Workstation und Server, die folgende Features enthalten.

Siehe diesen [Link](https://www.veeam.com/veeam_agents_feature_comparison_ds.pdf)

| Feature | Workstation | Server | Beschreibung |
| -------- | -------- | -------- | --------| 
| **Backup** |  |  |  
| Entire computer   | ✅ | ✅    |  Image-basiertes Backup von ganzen Computern für "Bare-Metal"-Wiederherstellung        |
| Volume-level   | ✅   | ✅   |    Image-basiertes Backup von definierten Volumes, System-Partitionen, Festplatten      |
| File-level   | ✅   | ✅   |    Backup von definierten Dateien und Ordnern. Einfache Benutzerauswahl und Filterung für die Backupkonfiguration.      |
| **Recovery** |  |  |  
| Bare-metal recovery  | ✅ | ✅    |  Wiederherstellung des gesamt System auf die gleiche Hardware oder eine andere Hardware mit Bootable Recovery Image, welches die Recovery Tools enthält. |
| Volume-level recovery  | ✅   | ✅   |    	Wiederherstellung eines Volumes, System-Partition, Festplatte    |
| File-level recovery  | ✅   | ✅   |    	Wiederherstellung von einzelnen Datein und Ordner   |
| **Application-Aware Processing**|  |  |  
| Application-aware processing  | ✅   | ✅   |  Applikation-Konsistente Backups mit advanced application-aware processing (inklusive transaction log truncation).  |
|File indexing and search| ✅   | ✅   |   Ein File Katalog mit Index mit dem man individuelle Suchen Durchführen kann um Dateien zu finden und Wiederherzustellen bei denen man nicht alle Details kennt (Dateipfad, Löschdatum, Genauer Dateiname, ...)   |
| Transaction log backup | ✅   | ✅   |  Transaction Logs für Microsoft SQL und Oracle Datenbanken  |
| **Backup Targets** |  |  |  
| Object Storage| ✅ | ✅  |Back up auf on-prem oder Cloud Objekt Speicher.      |
| Local storage| ✅ | ✅  |  Backup auf local attached Media        |
| Rotated USB media| ✅ | ✅  |  Backup up auf USB Hard Drives  |
| Shared folder| ✅ | ✅  | Backup up von SMB File Shares |
| Veeam backup repository| ✅ | ✅  | Konfiguration eines Backup Repository als Backup Ziel. Dazu zählt Objekt Speicher (S3).      |
|Veeam Cloud Connect Repository| ✅ | ✅  |  Off-Site Cloud Kopie der Backupdaten     |
| **Backup Options** |  |  |  
| External USB drive backup | ✅ | ✅  |  |
| Parallel disk processing | N/A | ✅  |  |
| Parallel disk processing | teilweise | ✅  |  |
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
| Veeam Explorer™ for Microsoft Exchange | teilweise | ✅  |  |
| Veeam Explorer for Microsoft SQL Server | teilweise | ✅  |  |
| Veeam Explorer for Microsoft SharePoint  | teilweise | ✅  |  |
| Veeam Explorer for Oracle | teilweise | ✅  |  |
| Veeam Explorer for Microsoft Active Directory | teilweise | ✅  |  |
| Search and 1- click restore | teilweise | ✅  |  |
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
