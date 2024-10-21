---
title: "PSKE - VPNaaS"
linkTitle: "VPNaaS"
type: "docs"
weight: 30
date: 2023-10-16
---

Diese Einführung soll Ihnen dabei helfen, die passende VPNaaS-Lösung für Ihren spezifischen Anwendungsfall zu wählen, um sicher auf Ihren Kubernetes-Cluster innerhal 
der PSKE zuzugreifen. Wir stellen verschiedene Optionen vor, damit Sie die bestmögliche Lösung für die sichere Verbindung und Verwaltung Ihrer Cluster finden können.

## Site-to-Site-VPN (Hybrid Connector kurz HC)
Diese Lösung eignet sich hervorragend, wenn ein Cloud Endpoint z.B. eine VMware Cloud, die einen oder mehrere Services wie bspw. einen Database Service etc. 
zur Verfügung stellt und ein PSKE Kubernetes Cluster über eine VPN Verbindung auf diesen Service zugreifen soll um diesen sicher konsumieren zu können.

## Remote-Access-VPN (Virtual Cloud Firewall kurz vCFW)
Diese Lösung wird hauptsächlich verwendet, wenn Einzelpersonen auf Services zugreifen, die über einen Kubernetes PSKE-Cluster bereitgestellt und
sicher über eine VPN Verbindung konsumiert werden sollen.

## Disclaimer
Bitte beachten Sie, dass wir ausschließlich Support für die von uns angebotenen VPNaaS-Lösungen bereitstellen. Lösungen von Drittanbietern werden nicht unterstützt.
