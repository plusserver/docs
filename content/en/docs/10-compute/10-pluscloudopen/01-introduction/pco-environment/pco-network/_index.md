---
title: "PCO Network"
weight: 30
date: 2023-03-10
---

# public ips

pluscloud open provides two types of public IP addresses that can be used to access your virtual machines (VMs) from external locations or to use internet services.

## Floating IP

{{% alert title="Note" color="info" %}}
It's important to note that the Floating IP address is not visible on the VM itself, as the address translation happens on the network layer before the data packets reach the VM.
{{% /alert %}}

These are public IPv4 addresses that can be assigned to your VMs in pluscloud open. Once assigned, you can use the Floating IP address to reach your VMs from the internet. The Floating IP is bound to the VM, and Network Address Translation (NAT) is used to translate between the private (local) IP address of the VM and the public IP address. This makes it possible to access your VMs without having to configure a public IP address on the VM itself. The Floating IP address can be unbound from a VM and assigned to a different VM if needed.

## Router IP

pluscloud open also provides a public IP address that can be used by all VMs connected to a router to access the internet. This is useful for cases where you don't need external access to your VMs but want to allow them to access the internet. All traffic from the VMs connected to the router will use the same public IP address via Source Network Address Translation (SNAT), as long as there is no Floating IP assigned to the VMs. If a VM has a Floating IP assigned to it, it will use the Floating IP address for external access instead of the Router IP address.

# security groups

pluscloud open provides security groups to enable customers to define firewall rules for their virtual machines (VMs). These rules can be customized for each VM and configured based on different protocols, ports, and communication directions.

The default security group allows all outgoing traffic and enables SSH access to the VM. However, incoming traffic is prohibited by default, except for traffic from systems in the same security group. This ensures that any incoming traffic must be explicitly allowed before it is possible, preventing unauthorized access from outside the network.

Security groups are enforced on traffic passing through the Software Defined Network (OVN), regardless of the actual source or destination of the traffic. Additionally, security groups can be used for multiple VMs, making it possible to control them globally and use them for multiple VMs.

{{% alert title="Note" color="info" %}}
Note that SSH access is enabled in the default security group, so it's important to review and adjust the security group rules to ensure the desired level of security for your VMs.
{{% /alert %}}