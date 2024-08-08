---
title: "Edge configuration for external Firewall"
linkTitle: "Edge configuration for external Firewall"
type: "docs"
weight: 10
date: 2024-08-07
description: >
   Configuring a VMware Edge Gateway to Forward All Traffic to a Firewall VM
---

To configure a VMware Edge Gateway so that all traffic is forwarded to a firewall in a VM (essentially putting the Edge Gateway in "pass-through" mode), you need to follow some specific steps. This involves configuring network rules and potentially disabling the Edge Gateway firewall functionality. Here are the general steps you can follow:

## Step 1: Configure the Edge Gateway Firewall

1. Log in to vCloud Director.
2. Navigate to the Edge Gateway you want to configure.
3. Go to the firewall settings of the Edge Gateway.
4. Create rules to forward all traffic to the VM with the firewall. Typically, this is done by creating an "Allow all" rule for incoming and outgoing traffic.
   - **Source:** Any
   - **Destination:** Any
   - **Service:** Any
   - **Action:** Allow

## Step 2: Configure NAT Rules (if necessary)

1. If using NAT, ensure that NAT rules are correctly configured to forward traffic to the internal firewall VM.
2. Configure SNAT and DNAT rules accordingly to forward the traffic correctly.

## Step 3: Configure Static Routes

1. Ensure the routing table of the Edge Gateway is configured to forward traffic to the internal firewall VM.
2. Add static routes to the VM functioning as the firewall.
   - **Target Network**
   - **Gateway:** IP address of the internal firewall VM

## Step 4: Disable the Edge Gateway Firewall (optional)

1. In some cases, you may want to disable the Edge Gateway firewall functionality completely to ensure it does not conflict with the internal firewall VM.
2. This can be done in the firewall configuration area of the Edge Gateway by deleting or explicitly disabling all rules.

## Step 5: Ensure the Internal Firewall VM is Properly Configured

1. Ensure that the firewall VM is configured to handle and filter the traffic.
2. Configure appropriate rules and security policies on the internal firewall VM to control and protect the traffic.

By following the above steps, you will ensure that all traffic is routed through the Edge Gateway to the internal firewall VM, where it can be further processed and filtered.
