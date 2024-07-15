---
title: "Network types"
linkTitle: "Network types"
type: "docs"
weight: 10
date: 2024-07-01
description: >
   Available network types within pluscloud VMware
---

There are various types of networks which can be connected using gateways. 

```mermaid
flowchart LR
  ext[external networks] <-->|EdgeGateway| org[org networks] <-->|vApp Gateway| app[vApp networks]
```

## Types of networks

There are three types of networks that are in a hierarchical relationship:

* External networks
* Org networks
* vApp networks

### External networks

An external network represents a connection from the cloud environment to the outside world.
This can be an internet connection, an external network segment that is to be bridged or a VPN connection.

The connection between an external network is implemented via ESXi port groups and can only be implemented by a cloud provider. It is not possible to set this up in self-service.

### Org networks

Org networks are used to establish connections within the cloud environment and are therefore intended for internal cloud traffic.
As the name suggests, org networks are connected to an organization.

The routing instance between an org network and an external network is implemented using a so-called EdgeGateway.

### vApp networks

vApp networks are limited to the context of a vApp. In this respect, vApp networks behave towards org networks in a similar way to org networks towards external networks.

With vApp networks, it is possible to establish connections within a vApp that are limited to the vApp.

The routing instance between an org network and an external network is implemented using a so-called vAppGateway.

## Network Connection Types

There are three ways to connect a virtual network segments with another network segment:

| Connection Type | Explanation                                                                                                 |
|-----------------|-------------------------------------------------------------------------------------------------------------|
| Direct          | The network segment is connected on the Data Link layer, i.e. like they are connected via a Layer-2-Switch. |
| Routed          | The network segment is connected on the Network Layer, i.e. via a gateway which performs NAT or routing.    |
| Isolated        | The network segment is not connected to any other network segment                                           |
