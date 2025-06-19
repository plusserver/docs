---
title: "Change-Management"
linkTitle: "Change-Management"
type: "docs"
weight: 60
date: 2025-06-13
---

## Behebung von CVEs und Updates im PSKE-Umfeld?
Sicherheitslücken, die als Common Vulnerabilities and Exposures (CVEs) identifiziert werden, werden zeitnah behoben. Sobald ein entsprechender Fix vom SAP Gardener-Projekt zur Verfügung gestellt wird – also vom sogenannten Upstream – wird dieser in das System integriert und ausgerollt.

- Größere Funktions- oder Versionsänderungen, wie Major- und Minor-Upgrades oder neue Features, werden im Rahmen von neuen PSKE-Versionen (Plusserver Kubernetes Engine) veröffentlicht. Diese Versionen durchlaufen zuvor umfangreiche Tests, um Stabilität und Kompatibilität sicherzustellen, bevor sie für Kunden bereitgestellt werden.

- Kunden werden über anstehende größere Upgrades rechtzeitig über die [Plusserver-Statusseite](https://status.plusserver.com/) informiert. Zusätzlich können Sie sich jederzeit über bevorstehende Updates und Veröffentlichungen im offiziellen [Release-Plan](https://docs.plusserver.com/de/container/managed-kubernetes/introduction/release-plan/) einen Überblick verschaffen.


## Wann kann eine Sicherheitslücke (CVE) nicht geschlossen werden?
In bestimmten Fällen ist es nicht möglich, eine bekannte Sicherheitslücke, auch Common Vulnerability and Exposure (CVE) genannt,
zeitnah oder überhaupt zu schließen. Dies kann aus mehreren Gründen der Fall sein:

- Erreichen des End-of-Life (EOL) einer Kubernetes-Version
Wenn die betroffene Kubernetes-Version das Ende ihres offiziellen Lebenszyklus (End of Life, EOL) erreicht hat,
erhält sie keine Sicherheitsupdates oder Bugfixes mehr von der Community bzw. vom Upstream-Projekt.
In solchen Fällen ist ein Schließen der Schwachstelle nur durch ein vollständiges Upgrade auf eine unterstützte Version möglich.
Dies ist unter Umständen nicht sofort realisierbar.

- Kein verfügbarer Fix durch den Upstream (z. B. SAP Gardener):
Eine Schwachstelle kann nicht geschlossen werden, wenn noch kein offizieller Patch vom Upstream-Projekt, in diesem Fall SAP Gardener, bereitgestellt wurde.
Auch wenn das Problem bekannt ist, kann es eine gewisse Zeit dauern, bis ein stabiler und getesteter Fix bereitgestellt wird.

- Ein Patch kann einen Breaking Change oder potenzielle Instabilitäten verursachen.
Es kann vorkommen, dass ein verfügbarer Patch die Schwachstelle zwar theoretisch behebt, aber gleichzeitig gravierende Änderungen am System mit sich bringt.
Wenn dieser sogenannte „Breaking Change“ das Risiko birgt, die Stabilität oder Funktionalität der Plattform negativ zu beeinflussen, wird unter Umständen zunächst
auf die Einspielung verzichtet. Stattdessen kann eine Maßnahme zur Risikominimierung getroffen oder der Fix in ein reguläres Update eingeplant werden.
Sobald umfangreiche Tests abgeschlossen sind, kann der Fix in ein reguläres Update eingeplant werden.