---
title: "Integration plusbackup in local VBR server"
linkTitle: "Integration plusbackup in local VBR server"
type: "docs"
description: ""
weight: 40
---

1.  Add Service Providers

    -   On the source system under Backup Infrastructure → Service Providers → Select Add Service Provider.

    {{< img src="images/image-1.png" alt="Screenshot: Add Service Provider" >}}

2.  Service Provider Data

    The wizard window opens:

    -   Enter the DNS name of the Cloud Connect server in the first column.

    -   "Allow this Veeam ..." → should only be checked if the affected Veeam server is to be controlled by the SPC. If this is not the case, do not check the box.

    {{< img src="images/image-2.png" alt="Screenshot: Wizardwindow - Service Provider" >}}

3.  Credentials

    The next step is a certificate check. This should be automatically accepted by public certification authorities.

    {{< img src="images/image-3.png" alt="Screenshot: Certificate" >}}

    -   Enter your login details under “Add or select credentials issued to you by the service provider”. To do this, click on -> “Add”.

    {{< img src="images/image-4.png" alt="Screenshot: Credentials" >}}

    -   In the wizard window, enter your user name in the following format: kd(your customer number) and your password (Plusbackup access data).

    -   Click on “Ok”.

4.  Backup Storage

    -   Here you can see which functionalities are activated -> click on “Apply”.

    {{< img src="images/image-5.png" alt="Screenshot: Backup Storage" >}}

    {{< img src="images/image-7.png" alt="Screenshot: Backup Storage" >}}

5.  Summary

    -   All the information you entered previously is displayed here. If this is correct -> click “Finish”.

    {{< img src="images/image-6.png" alt="Screenshot: Summary" >}}

6.  Service Provider check

    -   The added service provider should now appear in the service provider area.

    {{< img src="images/image-8.png" alt="Screenshot: Service Provider check" >}}
