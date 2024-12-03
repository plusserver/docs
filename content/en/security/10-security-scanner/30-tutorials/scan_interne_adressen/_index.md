---
title: "Security Scanner - Scanning Internal IP Addresses with the Gateway"
linkTitle: "Security Scanner - Scanning Internal IP Addresses with the Gateway"
date: 2024-11-20
weight: 1
description: "Guide for scanning internal IP addresses with the Gateway"
type: docs
---

# Security Scanner - Scanning Internal IP Addresses with the Gateway

## Introduction

Since not all IP addresses in your infrastructure can be checked externally, you have the option to set up a gateway. This allows isolated networks (e.g., RfC-1918) to be checked for vulnerabilities.

## (1) Installing Gateway

### (1.1) Download Gateway Image

Navigate to https://sec-scan.psmanaged.com/ui/gsp/entities/gateway/list/. There, select the available platform and download the image.

![Gateway Image Download](./vmware-download.png)

### (1.2) Upload Image to the vAPP Template Catalog of your PlusCloud

![vAPP Templates](./vapp-vorlagen.png)

### (1.3) Create New Virtual Machine

![Create New VM](./neue-vm.png)

### (1.4) Specify VM Hostname and Select Template

![Hostname and Template](./hostname-template.png)

### (1.5) Configure Network & IP Address

![Network Settings](./netzwerk-einstellungen.png)

### (1.6) Configure Firewall

To configure the gateway via Web GUI in step (2.3) Open Gateway Web UI, the internal IP address of the gateway must be made available through a publicly accessible IP address of your Edge Gateway using SNAT, DNAT, and firewall rules.

### (1.7) Connect to VM Console

![Connect to VM](./vm-verbinden.png)
After the login prompt appears, enter admin as both username and password.

### (1.8) Select Network Configuration

![Network Configuration](./network-config.png)

### (1.9) Set Network Configuration Information

![Network Info](./network-info.png)

### (1.10) Test Network Connection to Security Scanner

![Network Test](./network-test.png)

### (1.11) Select Gateway Configuration

![Gateway Configuration](./gateway-config.png)

### (1.12) Select Set Web Password & Assign Password

![Web Password](./web-password.png)

## (2) Configure Gateway

### (2.1) Create New Gateway

![Create Gateway](./gateway-create.png)
Please specify another free IP address from the network where you installed the gateway.

### (2.2) Copy Token

To connect the gateway to the Security Scanner, authentication and encryption are necessary. For this, copy the API key from the gateway settings.

![Token Configuration](./token-config.png)

### (2.3) Open Gateway Web UI

In step (1.6) Configure Firewall, you made the gateway available through a publicly accessible IP address. Now enter the gateway's IP address in your browser and log in using the assigned web password (e.g., https://195.252.XXX.XXX).

![Web UI](./web-ui.png)

### (2.4) Check Gateway Status

![Gateway Status](./gateway-status.png)

The gateway is now set up. You can select the gateway for scanning when creating a scan task.
