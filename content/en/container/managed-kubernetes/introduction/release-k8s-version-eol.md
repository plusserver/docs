---
title: "Kubernetes Versions EOL"
linkTitle: "Kubernetes Versions EOL"
type: "docs"
weight: 40
date: 2024-01-19
---

The PSKE always offers the last 3 Kubernetes versions (supported by SAP Gardener). As soon as a new version is supported, an older version expires.

At PSKE, we take care of Day 1 and Day 2 operations for you, including the lifecycle management of Kubernetes versions.

By continuously updating them, we ensure that you can always use the latest versions of Kubernetes to take advantage of the latest features and reduce the security risk of outdated versions. 

PSKE always supports the latest 3 versions of Kubernetes (supported by SAP Gardener). This also means that older versions of Kubernetes are periodically retired to meet these requirements.

## Kubernetes EOL - 2024

| Kubernetes version | End of Life (EOL) | To Do |
|---|---|---|
| 1.23.17 | 01.03.2024 | **No longer available in the PSKE from 01.03.2024** |
| 1.24.16 | 26.04.2024 | **Plan to migrate your applications to 1.25.15 or 1.26.14 by 28.09.2024** |
| 1.25.15 | 28.11.2024 | **Plan to migrate your applications  to 1.26.14 or 1.27.11 by 28.11.2024** |

Please ensure you update your clusters to the Kubernetes versions we support by this date.

If you do not update your clusters by this date, the Kubernetes version will automatically be upgraded to the next higher version.