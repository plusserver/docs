---
title: "Information"
linkTitle: "Information"
type: "docs"
weight: 2
date: 2025-08-19
description: >

---

## Important notes

### IP addresses Port 1 and Port 2

The IP addresses on port 1 and port 2 must **not** be modified.
The RFC3927 link local IPv4 addresses are required for cluster communication and the Internet connection via pluscloud vmware.

### HA Heartebat Type

The HA heartbeat type must **not** be changed from *unicast* to *broadcast*. Otherwise the internal cluster communication in the pluscloud vmware environment is no longer possible.

### User admin

The user **admin** may **not** be deleted or changed even on a firewall with the management level *Self Service*. This is required for configuration backup by plusserver, among other things.

### Default SNMP settings

The existing SNMP settings may **not** be deleted or changed; these are required for plusserver monitoring, among other things.

### Deactivation of the license due to incorrect firewall configuration

The firewall settings must **not** be changed in such a way that the firewall is no longer able to reach the Fortinet license server on the Internet. This would result in the automatic deactivation of the license and thus the firewall.

### Address objects beginning with PSMANAGED_ / Local-In Policies

The address objects beginning with **PSMANAGED_** and the associated Local-In Policies may **not** be deleted or changed.
