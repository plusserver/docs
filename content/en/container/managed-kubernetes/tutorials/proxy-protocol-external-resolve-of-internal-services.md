---
title: "Proxy Protocol - External resolve of internal services"
linkTitle: "Proxy Protocol - External resolve of internal services"
type: "docs"
weight: 4
date: 2024-01-18
---

When using a Load Balancer with the Proxy Protocol in Kubernetes, there can be problems with accessing applications within the cluster from each other.

If you are using a load balancer with the Proxy Protocol in your Kubernetes cluster, you may encounter issues when trying to access another Ingress/Service from a pod within the cluster. The reason for this is that kube-proxy adds an iptables rule for the external IP address of the load balancer, redirecting traffic around the load balancer. This leads to an error when the pod establishing the connection does not speak the Proxy Protocol and, in this case, communicates directly with the Ingress controller.

### Solution

To resolve this issue, you must add an additional annotation to the Load Balancer service. This annotation sets a hostname for the Load Balancer.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-load-balancer
  annotations:
    loadbalancer.openstack.org/hostname: 192.168.1.100.nip.io
spec:
  type: LoadBalancer
```

Create an A record for the Load Balancer IP address in your domain. The kube-proxy uses this A record to send traffic to the Load Balancer.

### Outlook

This issue was fixed in the upstream Kubernetes project for v1.20, but was later reverted. There is an open issue that addresses the Load Balancer issue in v1.28. The improvement proposal is KEP-1866.

### Explanation

The Proxy Protocol is a protocol used by Load Balancers and Ingress-Controller to identify the real client IP. The protocol adds additional information to the TCP header that identifies the client.

The Cert-Manager doesn't use the Proxy Protocol but want to generate a TLS certificate request. If traffic is sent directly to the Services, the Cert-Manager cant connect to its endpoint and perform the initial self-check.

### References

Kubernetes issue with the Proxy Protocol: https://github.com/kubernetes/kubernetes/issues/66607
Proxy Protocol specification: http://www.haproxy.org/download/1.8/doc/proxy-protocol.txt
Pull request to fix the issue in v1.20: https://github.com/kubernetes/kubernetes/pull/92312
Issue with the Load Balancer in v1.28: https://github.com/kubernetes/enhancements/issues/1860
Improvement proposal for KEP-1866:https://github.com/kubernetes/enhancements/tree/master/keps/sig-network/1860-kube-proxy-IP-node-binding