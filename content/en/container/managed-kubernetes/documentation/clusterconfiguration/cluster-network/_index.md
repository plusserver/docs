---
title: "PSKE - Cluster Networking"
linkTitle: "Cluster Networking"
type: "docs"
weight: 20
date: 2023-02-21
---

This document contains network related information for Shoot clusters.

## Defaults

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  networking:
    pods: 10.96.0.0/12
    nodes: 10.250.0.0/16
    services: 10.112.0.0/12
```

## Pod / Service Network

A Pod / Service network is imperative for any kind of cluster communication with Pods not started within the node's host network.
More information about the Kubernetes network model can be found in the [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/) topic.

Gardener allows users to configure the Pod network's CIDR during Shoot creation:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  networking:
    type: <some-network-extension-name> # {calico,cilium}
    pods: 100.96.0.0/16
    nodes: ...
    services: ...
```

{{% alert title="Warning" color="warning" %}}
The `networking.pods` IP configuration is immutable and cannot be changed afterwards. Please consider the following paragraph to choose a configuration which will meet your demands.
{{% /alert %}}

One of the network plugin's (CNI) tasks is to assign IP addresses to Pods started in the Pod network.
Different network plugins come with different IP address management (IPAM) features, so we can't give any definite advice how IP ranges should be configured.
Nevertheless, we want to outline the standard configuration.

Information in `.spec.networking.pods` matches the [--cluster-cidr flag](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) of the Kube-Controller-Manager of your Shoot cluster.
This IP range is divided into smaller subnets, also called `podCIDRs` (default mask `/24`) and assigned to Node objects `.spec.podCIDR`.
Pods get their IP address from this smaller node subnet in a default IPAM setup.
Thus, it must be guaranteed that enough of these subnets can be created for the maximum amount of nodes you expect in the cluster.

_**Example 1**_

```text
Pod network: 100.96.0.0/16
nodeCIDRMaskSize: /24
-------------------------

Number of podCIDRs: 256 --> max. Node count 
Number of IPs per podCIDRs: 256
```

With the configuration above a Shoot cluster can at most have **256 nodes** which are ready to run workload in the Pod network.

_**Example 2**_

```text
Pod network: 100.96.0.0/20
nodeCIDRMaskSize: /24
-------------------------

Number of podCIDRs: 16 --> max. node count 
Number of IPs per podCIDRs: 256
```

With the configuration above a Shoot cluster can at most have **16 nodes** which are ready to run workload in the Pod network.

Beside the configuration in `.spec.networking.pods`, users can tune the `nodeCIDRMaskSize` used by Kube-Controller-Manager on shoot creation.
A smaller IP range per node means more `podCIDRs` and thus the ability to provision more nodes in the cluster, but less available IPs for Pods running on each of the nodes.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  kubeControllerManager:
    nodeCIDRMaskSize: 24 (default)
```

{{% alert title="Warning" color="warning" %}}
The `nodeCIDRMaskSize` configuration is immutable and cannot be changed afterwards.
{{% /alert %}}

_**Example 3**_

```text
Pod network: 100.96.0.0/20
nodeCIDRMaskSize: /25
-------------------------

Number of podCIDRs: 32 --> max. Node count 
Number of IPs per podCIDRs: 128
```

With the configuration above, a Shoot cluster can at most have **32 nodes** which are ready to run workload in the Pod network.


## Load Balancer with Private IP Address

Any available, unused IP address from the node network 10.250.0.0/16 of the respective PSKE cluster can be used for the load balancer.

Configuration options:

- keep-floatingip: true | false 
  - Reserves the floating IP address in OpenStack.

- proxy-protocol: true | false 
  - Enables or disables support for the Proxy Protocol.

- openstack-internal-load-balancer: true | false
  - Creates an internal load balancer in OpenStack without assigning a floating IP.

- loadBalancerIP: 10.250.0.2
  - Specifies the IP address of the load balancer.

For an internal load balancer (openstack-internal-load-balancer: true), this defines the private IPv4 address within the cluster network.
Alternatively, a previously reserved floating IP can be used here if openstack-internal-load-balancer is set to false.

```yaml
  service:
    annotations:
      loadbalancer.openstack.org/proxy-protocol: "true"
      loadbalancer.openstack.org/keep-floatingip: "false"
      service.beta.kubernetes.io/openstack-internal-load-balancer: "true"
      loadbalancer.openstack.org/loadBalancerIP: 10.250.0.2
```