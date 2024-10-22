---
title: "Release Plan"
linkTitle: "Release Plan"
type: "docs"
weight: 30
date: 2024-03-12
---

With this release plan, we would like to offer you more transparency and planning security with regard to upcoming updates and changes to our products and services. The plan includes a table with the date, type of change and relevant information.

This allows you to prepare for important updates in good time and ensure that your systems and processes run smoothly. You will also find information on the behavior of AutoUpdates during enforced upgrades. This gives you full control and allows you to decide for yourself when and how updates are carried out.

## Release Plan 2024

| Month | Date | Change Type | Info |
| --- | --- | --- | --- |
| January | - | - | - |
| February | 05.02.2024 | Change | [Release PSKE Version 1.9.0](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-9-0/) |
| March | - | - | - |
| April | 02.04.2024 | Change | [Release PSKE Version 1.10.1](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-10-1/) |
| May | 21.05.2024 | Change | [Release PSKE Version 1.10.2](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-10-2/) |
| June | - | - | - |
| July | 29.07.2024 | Change | [Launch of PSKE Version 1.12.0](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-12-0/) |
| August| 13.08.2024 | Change | [Launch of PSKE Version 1.13.0](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-13-0/) |
| September | 03.09.2024 | Change | [Launch of PSKE Version 1.13.1](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-13-1/) |
| September | 30.09.2024 | Change | [Launch of PSKE Version 1.14.0](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-14-0/) |           
| October | - | - | - |
| November | - | - | - |
| December | 10.12.2024 | Standardchange | Standard Change - Kubernetes Patch Version |

## AutoUpdate behavior

**AutoUpdates:**

- Activated:
  - *Maintenance window:* Updates are carried out automatically within the defined maintenance window.
  - *Time:* The exact time of the update within the maintenance window can be determined by the customer.
- Deactivated:
  - *Update:* Updates are only carried out after the currently used version has expired.
  - *Time:* The update is usually performed at midnight.

**Enforced Upgrades:**

- *Independent of AutoUpdates:* Enforced upgrades are carried out regardless of whether AutoUpdates are activated or deactivated.
- *Timing:* Enforced upgrades are performed as soon as possible after the new version is available.

**Summarizing:**
| AutoUpdates | Enforced Upgrade | Time of Update |
| --- | --- | --- |
| Enabled | Yes | Within the next Maintenance Windows |
| Enabled | No | Automatically within the next Maintenance Windows |
| Disabled | Yes | As soon as the new version is available |
| Disabled | No | After the currently used version expires |
