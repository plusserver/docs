---
title: "Basics"
linkTitle: "Basics"
type: "docs"
weight: 1
date: 2025-09-19
description: >
  Everything you need for a perfect start with your virtual cloud firewall - pluscloud vmware
---

## Deployment

The **Virtual Cloud Firewall** (VCFW) is provided as virtual machines (VMs) with the FortiGate operating system (FortiOS) installed.

These VMs receive the required CPU, memory, hard disk and network resources. After deployment, the **VCFW** is configured with basic settings such as IP address, hostname and administrative credentials.

The network interfaces are configured to connect to these corresponding security zones and external networks.

Security policies and NAT rules are set up to allow or block traffic based on defined rules.

Monitoring and management tools are integrated to monitor the performance and security of the **VCFW**.

## Basic functions of the Virtual Cloud Firewall

### Network security

The **VCFW** acts as a firewall to control traffic between different security zones and enforce security policies to defend against threats.

### VPN connectivity

The **VCFW** provides secure VPN tunnels for remote access or cross-site connections.

### NAT (Network Address Translation)

The **VCFW** translates internal private IP addresses into a public IP address for Internet communication.

### IPS (Intrusion Prevention System)

The **VCFW** can monitor network traffic for known infiltration attempts and malicious activities.

### Traffic shaping

The **VCFW** enables the management and prioritisation of traffic on the basis of predefined rules.

### Web filtering

The **VCFW** can block access to certain websites based on content filtering policies.

### Logging and monitoring

The **VCFW** generates logs and provides monitoring functions for network activities.

## Useful hints and best practices

### Testing in a non-production environment

Changes to the configuration of the **Virtual Cloud Firewall** should always be tested in a non-production environment before being implemented in production to avoid disruptions.

### Regular firmware updates

This is constantly being further developed, so the major version currently in use should always be updated to the latest minor version released, especially with regard to security vulnerabilities. This often also provides additional improvements from the manufacturer.

### Backup of configurations

The **Virtual Cloud Firewall** configurations should be backed up regularly to prevent data loss in the event of failures. This backup is already included in the product.

### Segmentation and zones

Use network segmentation and security zones effectively to control data traffic and increase security.
