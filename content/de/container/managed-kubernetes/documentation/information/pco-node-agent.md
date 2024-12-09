---
title: "PSKE - pluscloudopen Node Agent"
linkTitle: "pluscloudopen Node Agent"
type: "docs"
weight: 110
date: 2024-12-05
---

# pluscloudopen Node Agent

In jedem mit der PSKE erstellten Kubernetes-Cluster wird automatisch der pluscloudopen-node-agent ausgerollt, welcher sich bei anstehenden Wartungsarbeiten an unserer Infrastruktur um die Neuverteilung Ihrer Workload kümmert.

Im Falle von Wartungsarbeiten wird das Scheduling auf die entsprechende(n) Node(s) deaktiviert und Workload graceful per Drain auf andere Nodes im Cluster verteilt.

Bitte stellen Sie sicher, dass Ihre Workload sauber auf neue Nodes verteilt werden kann, damit die Nodes nicht "forceful" entfernt werden müssen oder es zu Ausfällen der Workload kommt.

Gleichzeitig werden neue Nodes als Ersatz erstellt, damit es nicht zu Ressourcen-Engpässen innerhalb des Clusters kommt.

