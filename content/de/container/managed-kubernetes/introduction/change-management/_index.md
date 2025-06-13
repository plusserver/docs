---
title: "Change-Management"
linkTitle: "Change-Management"
type: "docs"
weight: 60
date: 2025-06-13
---

## Wann wird wie gepatcht?
 - CVEs werden gefixt. Das geschieht, sobald ein Fix durch SAP Gardener zur Verfügung steht. Dieser Fix kommt vom Upstream.
 - Major-/Minor-Upgrades und Features werden mit einer neuen PSKE-Version veröffentlicht, sobald diese erfolgreich getestet wurde.
 - Kunden erhalten vor größeren Upgrades Ankündigungen via [Plusserver-Status] (https://status.plusserver.com/).
 - Updates können im Voraus im [Release-Plan] (https://docs.plusserver.com/de/container/managed-kubernetes/introduction/release-plan/) eingesehen werden.

## Wann ist eine Schwachstelle (CVE) nicht schließbar?
- Eine Schwachstelle (CVE) kann durchaus nicht schließbar sein, wenn:
- Die Kubernetes-Version End of Life (EOL) erreicht hat.
- Ein Upstream-Fix (SAP Gardener) existiert nicht oder ist noch nicht verfügbar.
- Der Patch ein Breaking Change wäre und zu Instabilitäten der Plattform führen könnte.
