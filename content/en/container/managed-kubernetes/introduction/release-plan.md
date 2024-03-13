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
| February | 05.02.2024 | Change | [Release Note 1.9.0](https://docs.plusserver.com/container/managed-kubernetes/releasenotes/notes/1-9-0/) |
| March | - | - | - |
| April | tbd | Change | - |
| May | - | - | - |
| June | 11.06.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| July | - | - | - |
| August| 13.08.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| September | - | - | - |
| October | 08.10.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| November | - | - | - |
| December | 10.12.2024 | Standardchange | Standard Change - Kubernetes Patch Version |

## AutoUpdate behavior

**AutoUpdates:**

- Activated:
  - *Maintenance window:* Updates are carried out automatically within the defined maintenance window.
  - *Time:* The exact time of the update within the maintenance window can be determined by the customer.
- Deactivated:
  - *Update:* Updates are only carried out after the currently used version has expired.
  - *Time:* The time of the update is usually 0 o'clock.

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