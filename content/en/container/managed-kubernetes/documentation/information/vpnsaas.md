---
title: "PSKE - VPNaaS"
linkTitle: "VPNaaS"
type: "docs"
weight: 30
date: 2023-10-16
---

This introduction is intended to help you choose the right VPNaaS solution for your specific use case in order to securely access your Kubernetes cluster within PSKE. 
We present different options to help you find the best possible solution to securely connect and manage your clusters.

## Site-to-Site-VPN (Hybrid Connector kurz HC)
This solution is well suited if a VMware Cloud Endpoint provides a database service and a PSKE Kubernetes cluster is to access this service securely via a VPN connection. 
Provisioning is described in more detail in article [HC - Provisioning](https://docs.plusserver.com/en/container/managed-kubernetes/documentation/hybridconnector/hc-provisioning/).

## Remote-Access-VPN (Virtual Cloud Firewall kurz vCFW)
This solution is mainly used when individuals access services that are to be provided via a Kubernetes PSKE cluster and securely consumed via a VPN connection.

## Disclaimer
Please note that we only provide support for the VPNaaS solutions we offer. Third-party solutions are not supported.
