---
title: "VLAN Bridging"
linkTitle: "VLAN Bridging"
type: "docs"
weight: 40
date: 2024-07-10
description: >
  Integration of hardware systems into the pluscloud VMware using VLAN bridging
---

With the pluscloud VMware, it is possible to integrate a {{< abbr "VLAN" "Virtual Local Area Network" >}} in the form of a virtual network segment.
This makes it possible to integrate a hardware system into the virtual infrastructure.
This allows you, for example, to integrate a hardware appliance or a hardware server into an otherwise virtual infrastructure and to migrate it gradually or operate it in parallel.

We recommend that you use this option restrictively.
We recommend that you use connectivity at {{< abbr "ISO" "International Organization for Standardization" >}} {{< abbr "OSI" "Open Systems Interconnection model" >}} layer 3 (network layer / {{< abbr "IP" "Internet Protocol">}} level) as a priority.

{{% alert title="Notice" color="info" %}}
**No Self-Service possible**  
VLAN bridging can currently only be set up by plusserver employees.  
Please contact the support channels you are familiar with.
{{% /alert %}}

## Technical implementation

The network virtualization of the pluscloud VMware is done with NSX-T.
This relies on encapsulation of network communication.
When moving from the physical infrastructure to the virtualized world, the frames of the {{< abbr "VLAN" "Virtual Local Area Network" >}} segment must also be encapsulated.
To do this, a {{< abbr "VLAN" "Virtual Local Area Network" >}} bridge is set up on an edge node, which performs the packing and unpacking of the frames.

The following graphic shows {{< abbr "VLAN" "Virtual Local Area Network" >}} bridging using the example of a hardware appliance:

```mermaid
flowchart LR

    %%% Nodes %%%
    subgraph colo[Colocation]
        hw1[Hardware-Appliance]
    end
    subgraph ss[Shared Switching]
        vlan1[VLAN 101]
    end
    subgraph egw[Edge Node]
        direction TB
        br1[VLAN-Bridge]
    end
    subgraph vdc[OrgVDC]
        direction TB
        is1[Imported Segment]
        vm1[VM]
    end

    %%% Edges %%%
    ss <-->|Shared Trunk| egw
    hw1 <-->|Switchport| vlan1 
    br1 <--> is1 <-->|vNIC| vm1
```

A hardware appliance in the colocation area of the data center is connected to the shared switching infrastructure via a switch port.
A {{< abbr "VLAN" "Virtual Local Area Network" >}} is configured for this connection, which in this example is given the {{< abbr "VLAN" "Virtual Local Area Network" >}}-{{< abbr "ID" "Identification number" >}} 101.

The shared switching infrastructure is connected to so-called edge nodes, which are part of the pluscloud VMware.
These are dedicated servers that handle communication between the cloud infrastructure and systems outside the cloud.
No customer workload is executed on these servers.
Instead, routing instances, gateways and {{< abbr "VLAN" "Virtual Local Area Network" >}} bridges are operated here.

A separate {{< abbr "VLAN" "Virtual Local Area Network" >}} bridge is configured for each {{< abbr "VLAN" "Virtual Local Area Network" >}} to be integrated.
This can be thought of as a switch that is connected to the {{< abbr "VLAN" "Virtual Local Area Network" >}} to be connected with one port and whose other port is connected to the virtual segment.

The VLAN is then available within an {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} as an imported segment. Virtual network interfaces ({{< abbr "vNIC" "Virtual Network Interface Card" >}}s) can now be connected to this segment.

## Performance

  {{< abbr "VLAN" "Virtual Local Area Network" >}} bridging is offered on a best-effort basis.
This means that there is no guarantee of specific availability, bandwidth or latency for this service.
The values listed here are therefore only intended as a guide and may be exceeded or undercut in the short or long term.

| Value               | Limit                                                           |
|---------------------|-----------------------------------------------------------------|
| Latency             | typically 700µs to 2000µs with peak values up to 5000µs         |
| RTT VM to hardware  | typically 1ms to 5ms, with peak values up to 10ms               |
| Bandwidth           | maximum 1000 Mbit/sec                                           |
