---
title: "IPsec VPN configuration"
linkTitle: "IPsec VPN configuration"
type: "docs"
weight: 20
date: 2024-08-08
description: >
   Configure an IPsec VPN connection between your organization virtual data center and another site. 
---

## Types of Site-to-Site VPN Supported by pluscloud VMware

pluscloud VMware offers support for several types of site-to-site VPN connections:

- Connecting to another edge gateway within the same organization.
- Connecting to an edge gateway in a different organization (whether on pluscloud or another vCloud service provider).
- Connecting to a remote network that supports IPsec VPN endpoint capability.

For each connection type, you'll need to configure the IP addresses for both endpoints and establish a shared secret. You'll also need to specify which Virtual Data Center (VDC) networks are permitted to use the VPN link.

## How to Configure IPsec VPN Settings on an Edge Gateway

Follow these steps to configure IPsec VPN settings for an edge gateway in VMware Cloud Director:

1. Open the *Virtual Data Center* dashboard in VMware Cloud Director and choose the VDC where you wish to set up IPsec VPN.

2. In the left-hand navigation pane, click on **Edges** under the *Networking* section.

3. In the *Edge Gateways* page, find the edge gateway and click it to configure it.

4. To add a new IPsec VPN tunnel, click the **New** button.

5. Enter a name and, optionally, a description for the IPSec VPN tunnel.

6. To enable the tunnel upon creation, toggle on the **Status** option.

7. Select a peer authentication mode.

    **Pre-Shared Key** - Choose a pre-shared key to enter. The pre-shared key must be the same on the other end of the IPSec VPN tunnel.

    **Certificate** - Select site and CA certificates to be used for authentication.

8. For the Local Endpoint **IP Address**, input the external IP address of your edge gateway.

9. In the **Networks** field, specify the organization networks that can be accessed via the VPN. Separate multiple subnets with commas.

10. For the Remote Endpoint **IP Address** enter the external IP address of your remote site or the firewall/edge device where the VPN will connect.

11. In the **Networks** field, input the remote network's local subnet that should be accessible from your pluscloud VDC. For instance, if the remote network uses the `10.20.0.0/16` range, enter `10.20.0.0/16` or specify a smaller subnet, such as `10.20.0.0/25`. Separate multiple subnets with commas.

12. Enter the remote ID for the peer site if using certificate as authentication method.

13. Click **Next**.

14. Review your settings and click **Finish**.

15. To verify that the tunnel is functioning, select it and click **View Statisticts**.

    If the tunnel is functioning, **Tunnel Status** and **IKE Service Status** both display *Up*.
