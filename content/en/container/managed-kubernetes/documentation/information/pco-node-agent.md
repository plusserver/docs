---
title: "PSKE - pluscloudopen Node Agent"
linkTitle: "pluscloudopen Node Agent"
type: "docs"
weight: 110
date: 2024-12-05
---

# pluscloudopen Node Agent

In every Kubernetes cluster created with the PSKE, the pluscloudopen-node-agent is automatically rolled out, which takes care of the redistribution of your workload when maintenance work is due on our infrastructure.

In the event of maintenance work, scheduling is deactivated on the corresponding node(s) and workload is gracefully distributed to other nodes in the cluster via drain.

Please ensure that your workload can be distributed cleanly to new nodes so that the nodes do not have to be removed “forcefully” or workload failures occur.

At the same time, new nodes are created as replacements so that there are no resource bottlenecks within the cluster.

