---
title: "Patch Schedule"
linkTitle: "Patch Schedule"
type: "docs"
weight: 4
description: >
    Information on patch schedules in CloudHub
---

## Patch overview

The ["Patch Schedule"](https://cloudhub.plusserver.com/support/patch-schedule) page provides a complete overview of all automatic patch jobs for your systems. The information is displayed in a table containing all relevant information about the individual patch processes.

![Patch overview table](../img/patch-schedule/table-patch-schedule.png)

### Table overview

The table contains the following columns:

- **Status** – current status of the patch job (‘active’ or ‘inactive’)
- **Patch job** – name of the patch job
- **Next patch** – scheduled date of the next patch run
- **Interval** – Frequency with which the patch job is executed
- **Restart** – Indicates whether a restart is permitted after the patch
- **Guidelines** – Patch guidelines applied

### Detailed view of patch jobs

Each table row can be expanded to display further details about the affected servers.
The following information is displayed in the expanded view:

- **Server** – Host name of the affected system
- **Project ID** – Unique identifier of the associated project
- **Project alias** – Identifier assigned to the project by the customer

This feature allows you to quickly identify which systems are affected by a particular patch job.
