---
title: "PSKE - VPNaaS"
linkTitle: "VPNaaS"
type: "docs"
weight: 30
date: 2023-10-16
---

This introduction is intended to help you choose the right VPNaaS solution for your specific use case in order to securely access your Kubernetes cluster within PSKE. 
the PSKE. We present different options to help you find the best possible solution to securely connect and manage your clusters.

## Site-to-Site-VPN (Hybrid Connector kurz HC)
This solution is ideal if a cloud endpoint, e.g. a VMware cloud that provides one or more services such as a database service, etc., and a PSKE Kubernetes cluster is to access this service via a VPN connection in order to consume it securely. and a PSKE Kubernetes cluster is to access this service via a VPN connection in order to be able to consume it securely.

## Remote-Access-VPN (Virtual Cloud Firewall kurz vCFW)
This solution is mainly used when individuals access services that are to be provided via a Kubernetes PSKE cluster and securely consumed via a VPN connection.

## Disclaimer
Please note that we only provide support for the VPNaaS solutions we offer. Third-party solutions are not supported.
