---
title: "Backup Copy Job Setup"
linkTitle: "Backup Copy Job Setup"
type: "docs"
description: ""
weight: 40
---

## Backup Copy Job

PlusCloud as source:

-   Under Home → Backup copy → Virtual machine → VMware vCloud Director backup ...

    {{< img src="images/image-1.png" alt="Screenshot: new vCloud backup Copy Job" >}}

## Job

-   Name: Assign a job name. For example→ "kd(customer number)\_copy”

-   Copy mode → select "immediate copy (mirroring)”.

    {{< img src="images/image-2.png" alt="Screenshot: New Backup Copy Job" >}}

## Objects

-   You can choose between "From jobs...” and "From repositories...”:

-   From jobs…: if you want to select one or more predefined backup jobs to be copied.

-   From repositories...: if entire repositories are to be copied.

    {{< img src="images/image-3.png" alt="Screenshot: Objects" >}}

-   Then click on "Next”.

    {{< img src="images/image-4.png" alt="Screenshot: Objects - Next" >}}

## Target

-   Backup repository: Select your cloud repository.

-   Retention policy: Set the retention as high as the backup jobs are set. The backup jobs must be checked here.

-   GFS: The same applies here as for the retention policy.

    {{< img src="images/image-5.png" alt="Screenshot: Target" >}}

## Data Transfer

-   Select "Direct” → "Next”

    {{< img src="images/image-6.png" alt="Screenshot: Data Transfer" >}}

## Schedule

-   Select "Any time” → "Apply”

-   Then click "Finish”

    {{< img src="images/image-7.png" alt="Screenshot: Schedule" >}}
