---
title: "Einrichtung Backup Copy Job"
linkTitle: "Einrichtung Backup Copy Job"
type: "docs"
description: ""
weight: 40
---

1. Backup Copy Job

    pluscloud als source:

    -   Unter Home → Backup copy → Virtual machine → VMware vCloud Director backup ...

    {{< img src="images/image-1.png" alt="Screenshot: new vCloud backup Copy Job" >}}

2. Job

    -   Name: Einen Job Namen vergeben. Zum Beispiel→ „kd(kundennummer)\_copy“

    -   Copy mode → „immediate copy (mirroring)“ auswählen.

    {{< img src="images/image-2.png" alt="Screenshot: New Backup Copy Job" >}}

3. Objects

    Hier kann zwischen „From jobs…“ und „From repositories…“ unterschieden werden:

    -   From jobs…: wenn Sie einzelne/mehrere vordefinierte Backup jobs auswählen die kopiert werden sollen.

    -   From repositories...: wenn ganze repositories kopiert werden sollen.

    {{< img src="images/image-3.png" alt="Screenshot: Objects" >}}

    -   Danach auf „Next“ klicken

    {{< img src="images/image-4.png" alt="Screenshot: Objects - Next" >}}

4. Target

    -   Backup repository: Ihre Cloud repository auswählen.

    -   Retention policy: den Retention so hoch setzen wie die Backup Jobs eingestellt sind. Hier müssen die Backup Jobs überprüft werden.

    -   GFS: Hier gilt das gleich wie bei der retention policy.

    {{< img src="images/image-5.png" alt="Screenshot: Target" >}}

5. Data Transfer

    -   „Direct“ auswählen → „Next“

    {{< img src="images/image-6.png" alt="Screenshot: Data Transfer" >}}

6. Schedule

    -   „Any time“ auswählen → „Apply“

    -   Dann „Finish“ klicken

    {{< img src="images/image-7.png" alt="Screenshot: Schedule" >}}
