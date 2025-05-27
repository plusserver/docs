---
title: "PSKE - Shoot Spec"
linkTitle: "Shoot Spec"
type: "docs"
weight: 10
date: 2023-10-24
---

{{% alert title="Warnung" color="warning" %}}
Fehlkonfigurationen im ShootSpec können Fehler verursachen oder den Cluster sogar funktionsunfähig machen.
Einige Konfigurationsoptionen können nur bei der Erstellung eines Clusters bearbeitet werden.
{{% /alert %}}

## Einführung

Die ShootSpec ist eine YAML-Datei, die die Konfiguration eines Kubernetes-Clusters in SAP Gardener beschreibt. Sie enthält Informationen wie die Cloud-Plattform, die Ressourcenzuweisung und die Sicherheitseinstellungen des Clusters.

## Verwendung

Sie können die ShootSpec eines Clusters in der SAP Gardener Web-Konsole oder über die SAP Gardener CLI bearbeiten. Die ShootSpec wird in der Sektion `spec` der Ressourcendefinition des Clusters gespeichert.

Sie können auf die Web-Konsole zugreifen, indem Sie auf die Detailseite des Clusters navigieren und auf die Schaltfläche "Edit" in der oberen rechten Ecke klicken. Die ShootSpec wird auf der Registerkarte "YAML" angezeigt.

{{< img src="1.png" alt="" >}}

## Aufbau

Der ShootSpec besteht aus den folgenden Abschnitten:

- Shoot: Der Hauptabschnitt enthält allgemeine Informationen über den Cluster, wie den Namen, die Region und die Cloud-Plattform.
- Infrastruktur: Der Abschnitt "Infrastruktur" beschreibt die Infrastruktur des Clusters, z. B. die Art der Rechen-, Speicher- und Netzwerkressourcen.
- Steuerebene: Der Abschnitt "controlplane" beschreibt die Steuerungsebene des Clusters.
- Geheimnisse: Der Abschnitt "secrets" enthält geheime Daten, wie z. B. die Anmeldedaten für die Cloud-Plattform.

## Beispiel

Das folgende Beispiel zeigt eine Standard-ShootSpec für einen Kubernetes-Cluster in der PSKE:

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

## Anwendung

Der ShootSpec wird von SAP Gardener zum Erstellen und Verwalten eines Kubernetes-Clusters verwendet. Um eine ShootSpec zu erstellen, können Sie die SAP Gardener CLI oder die SAP Gardener Webkonsole verwenden.

## Dokumentation

Die vollständige Dokumentation für ShootSpec finden Sie in der [SAP Gardener Dokumentation](https://gardener.cloud/docs/gardener/).