---
title: "Hubble UI (Cilium)"
linkTitle: "Hubble UI (Cilium)"
type: "docs"
weight: 20
date: 2023-02-21
---

If you need a troubleshooting tool to troubleshoot or visualize the connectivity between pods, services, packet flows, and their dependencies, the Hubble UI tool can be used for troubleshooting locally in the browser via port forwarding, provided that Cilium was already selected as the Container Network Interface (CNI) during cluster creation.

## Activate Hubble UI in the cluster


The existing cluster YAML manifest needs to be extended under the "networking:" section to enable Hubble and include the following points, and then it should be saved.

```yaml
networking:
  type: cilium
  providerConfig:
    apiVersion: cilium.networking.extensions.gardener.cloud/v1alpha1
    kind: NetworkConfig
    hubble:
      enabled: true
    store: kubernetes
```

## Run Hubble UI in your Browser

If you are locally connected to your cluster using kubectl, you can later access the Hubble UI tool via your browser using port-forwarding at the URL http://localhost:12000/.

```bash
$ export KUBECONFIG=./my-pske-cluster.yaml
$ kubectl port-forward -n kube-system svc/hubble-ui --address 0.0.0.0 --address :: 12000:80
Forwarding from 0.0.0.0:12000 -> 8081
Forwarding from [::]:12000 -> 8081
```

Once the Hubble UI tool appears in your browser, you can directly select your preferred namespace (1) from the browser.

{{< img src="1.png" alt="" >}}

After selecting a namespace, the Hubble UI tool is divided into three different sections:

1. Additional filtering options, such as based on IP, DNS, or pods.
2. Visualization of connectivity between pods, services, packet flows, and their dependencies.
3. Flow details between the source service and destination service.

{{< img src="2.png" alt="" >}}
