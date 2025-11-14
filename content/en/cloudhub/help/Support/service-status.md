---
title: "Service Status"
linkTitle: "Service Status"
type: "docs"
weight: 3
description: >
    Information about service status in CloudHub
---

## Service Status

The ["Service Status"](https://cloudhub.plusserver.com/support/server-status) page provides you with an up-to-date overview of the status of your monitored systems and services. The information is displayed in two pie charts – one for hosts and one for services.
![Pie charts showing malfunctions](../img/service-status/diagrams-malfunctions.png)

### Status display

The diagrams show the current distribution of the following statuses:

- **OK** – The system or service is working without errors.
- **Warning** – There is an indication of a possible bottleneck or deviation.
- **Critical** – There is a malfunction that requires immediate attention.
- **Unknown** – The status could not be determined.

**Important:**
Only systems that are monitored according to our current **Icinga2** standard are displayed.

Translated with DeepL.com (free version)

### Detailed view of malfunctions

If there are any malfunctions, you can click on the affected area in the corresponding pie chart.
This will take you to a more detailed overview, where the malfunctions are displayed in tabular form.
![Detailed view of malfunctions](../img/service-status/detailed-view-malfunctions.png)

#### Malfunction table

The table shows the following information:

- **Status** of the host or service
- **Host name** of the affected system
- **Service** – Name of the affected service (only displayed in the table for services)

This view makes it easier for you to quickly identify affected systems and take targeted action.
