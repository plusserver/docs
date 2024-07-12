---
title: "Network types"
linkTitle: "Network types"
type: "docs"
weight: 10
date: 2024-07-01
description: >
   Available network types within the pluscloud VMware
---

There are three types of networks:

* External networks
* Org networks
* vApp networks

A connection can be created between these networks using a gateway:

```mermaid
flowchart LR
  ext[external networks] <-->|EdgeGateway| org[org networks] <-->|vApp Gateway| app[vApp networks]
```

## External networks

An external network represents a connection from the cloud environment to the outside world.
This can be an internet connection, for example, but also an external network segment that is to be integrated or a VPN connection.

The connection between an external network is implemented via ESXi port groups and can only be implemented by a cloud provider. It is not possible to set this up in self-service.

## Org networks

Org networks are used to establish connections within the cloud environment and are therefore intended for internal cloud traffic.
As the name suggests, org networks are connected to an organization.

There are three ways to connect an org network to an external network:

* Directly connected to an external network
* Indirectly connected to an external network, which is implemented using NAT or routing.
* Isolated, i.e. not connected to an external network

The connection between an org network and an external network is implemented using a so-called edge gateway.

## vApp networks

vApp networks are limited to the context of a vApp. In this respect, vApp networks behave towards org networks in a similar way to org networks towards external networks.

With vApp networks, it is possible to establish connections within a vApp that are limited to the vApp.

Here too, there are three ways to connect a vApp network to an org network:

* Directly connected to an org network
* Indirectly connected to an org network, which is implemented using NAT or routing.
* Isolated, i.e. not connected to an org network

The connection between an org network and an external network is implemented using a so-called vApp gateway.
