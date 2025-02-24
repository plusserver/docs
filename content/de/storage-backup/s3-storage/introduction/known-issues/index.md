---
title: "Bekannte Probleme"
linkTitle: "Bekannte Probleme"
type: "docs"
weight: 40
date: "2024-02-06"
---

### Löschen per S3 User Portal eingeschränkt möglich

Das Löschen von Objekten und Buckets im S3 User Portal oder Tenant-Api ist ein durch den Hersteller niedrig priorisierter Hintergrundprozess. Dies kann dazu führen, dass die Operationen auch bei geringen Datenmengen eine lange Laufzeit aufweisen. Es empfiehlt sich das löschen per S3-Client API durchzuführen. Ein Beispiel können sie in den Tutorials finden (<https://docs.plusserver.com/de/storage-backup/s3-storage/tutorials/>)
