---
title: "AutoUpdates"
linkTitle: "AutoUpdates"
type: "docs"
weight: 50
date: 2025-06-13
---

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
