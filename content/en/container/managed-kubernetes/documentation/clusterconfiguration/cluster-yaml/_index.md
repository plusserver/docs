---
title: "PSKE - Shoot Spec"
linkTitle: "Shoot Spec"
type: "docs"
weight: 10
date: 2023-10-24
---

{{% alert title="Warning" color="warning" %}}
Misconfigurations in the Shoot Spec can cause errors or even make the cluster inoperable.
Some configuration options can only be edited when a cluster is created.
{{% /alert %}}

## Introduction

The Shoot Spec is a YAML file that describes the configuration of a Kubernetes cluster in SAP Gardener. It contains information such as the cloud platform, resource allocation, and security settings of the cluster.

## Usage

You can edit the Shoot Spec of a cluster in the SAP Gardener web console or by using the SAP Gardener CLI. The Shoot Spec is stored in the `spec` section of the cluster's resource definition.

You can access the web console by navigating to the cluster's details page and click on the "Edit" button in the top right corner. The Shoot Spec is displayed in the "YAML" tab.

{{< img src="1.png" alt="" >}}

## Structure

The Shoot Spec consists of the following sections:

- shoot: The main section contains general information about the cluster, such as the name, region, and cloud platform.
- infrastructure: The "infrastructure" section describes the infrastructure of the cluster, such as the type of compute, storage, and networking resources.
- controlplane: The "controlplane" section describes the control plane of the cluster.
- secrets: The "secrets" section contains secret data, such as cloud platform credentials.

## Example

The following example shows a standard Shoot Spec for a Kubernetes cluster in PSKE:

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: demo-cluster
  namespace: garden-demo-4c6e3
spec:
  addons:
    kubernetesDashboard:
      enabled: false
      authenticationMode: token
    nginxIngress:
      enabled: false
      externalTrafficPolicy: Cluster
  cloudProfileName: pluscloudopen
  dns:
    domain: demo-cluster.demo.projects.prod.gardener.get-cloud.io
  hibernation:
    enabled: true
    schedules:
      - start: 00 16 * * 6,0
        end: 00 07 * * 6,0
        location: Europe/Berlin
  kubernetes:
    kubeAPIServer:
      requests:
        maxNonMutatingInflight: 400
        maxMutatingInflight: 200
      enableAnonymousAuthentication: false
      eventTTL: 1h0m0s
      logging:
        verbosity: 2
      defaultNotReadyTolerationSeconds: 300
      defaultUnreachableTolerationSeconds: 300
    kubeControllerManager:
      nodeCIDRMaskSize: 24
      nodeMonitorGracePeriod: 2m0s
    kubeScheduler:
      profile: balanced
    kubeProxy:
      mode: IPTables
      enabled: true
    kubelet:
      failSwapOn: true
      kubeReserved:
        cpu: 80m
        memory: 1Gi
        pid: 20k
      imageGCHighThresholdPercent: 50
      imageGCLowThresholdPercent: 40
      serializeImagePulls: true
    version: 1.26.7
    enableStaticTokenKubeconfig: true
  networking:
    type: cilium
    pods: 10.96.0.0/12
    nodes: 10.250.0.0/16
    services: 10.112.0.0/12
    ipFamilies:
      - IPv4
  maintenance:
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
    timeWindow:
      begin: 000000+0200
      end: 010000+0200
  provider:
    type: openstack
    controlPlaneConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerProvider: amphora
    infrastructureConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/16
      floatingPoolName: ext01
    workers:
      - cri:
          name: containerd
        name: worker-demo
        machine:
          type: SCS-2V:4:100
          image:
            name: ubuntu
            version: 22.4.2
          architecture: amd64
        maximum: 4
        minimum: 2
        maxSurge: 1
        maxUnavailable: 0
        volume:
          size: 50Gi
        zones:
          - az1
        systemComponents:
          allow: true
    workersSettings:
      sshAccess:
        enabled: true
  purpose: production
  region: prod1
  secretBindingName: demo-1
  seedName: c301
  systemComponents:
    coreDNS:
      autoscaling:
        mode: horizontal
  controlPlane:
    highAvailability:
      failureTolerance:
        type: node
```

## Application

The Shoot Spec is used by SAP Gardener to create and manage a Kubernetes cluster. To create a Shoot Spec, you can use the SAP Gardener CLI or the SAP Gardener web console.

## Documentation

The full documentation for the Shoot Spec can be found in the [SAP Gardener documentation](https://gardener.cloud/docs/gardener/).
