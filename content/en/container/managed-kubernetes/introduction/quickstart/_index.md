---
title: "Quickstart"
linkTitle: "Quickstart"
type: "docs"
weight: 10
date: 2024-01-19
---

## Order

What is the fastest way to get your PSKE? Just follow our ordering guide.

### CloudHub

Start the ordering process in our CloudHub.

### Select Managed Kubernetes

Navigate to Cloud Services > Managed Kubernetes.

{{< img src="1.png" alt="" >}}

### Order Managed Kubernetes

Select 'Order PSKE Now'.

{{< img src="2.png" alt="" >}}

### Select billing profile

Are you a new plusserver customer and do not yet receive an invoice? Then select New Invoice Profile.

Are you already a customer? Then you can add your new PSKE to an existing invoice by searching for your billing profile under Existing Invoice Profile.

{{< img src="3.png" alt="" >}}

### Select e-mail for deployment information

Enter the e-mail address to which all relevant information on the provision of the PSKE should be sent, such as status updates or passwords.

{{< img src="4.png" alt="" >}}

### Select onboarding workshop

If you wish to take advantage of our personal PSKE onboarding workshop, please check the box.

{{< img src="5.png" alt="" >}}

### Advice on additional services

If you would like to find out more about other supplementary services, please also select our offer for a consultation on this topic.

{{< img src="6.png" alt="" >}}

#### Workload Protection as a Service

As a useful complement to PSKE, Workload Protection offers you an in-depth protection for your applications, containers as well as the platform itself.

Included features:

- Images & Container Surveillance (vulnerabilities)
- Runtime Protection (XDR, File-Surveillance etc.)
- Source Codes & Infrastructure as a Code Scans (DevSecOps & IAC)
- Compliance and Auditing of the configuration
- Platform protection (e.g. for AWS)
- SOC integration (on request): In order to detect cyber attacks at an early stage and initiate necessary countermeasures (recommendations for action), Workload Protection can be monitored by our team of analysts 24x7 - SOC.

### Complete your order

Please review the summary to verify the information you have entered. Be sure to read and accept the terms and conditions. Only then can you complete the order by clicking on "Place Order Now".

{{< img src="7.png" alt="" >}}

### Track order status

You will be redirected to the order status page immediately after placing your order. You can check the status of your current orders at any time.

- NEW: Status directly after the order
- PROCESSING: Status as soon as automatic provision has started
- FAILED: Unfortunately something has gone wrong, please open a ticket here in the portal so that we can help you as quickly as possible.
- DONE: Congratulations, your PSKE is available

### Get access data

Immediately after placing your order, you will find your access data in the Contracts section.

## First steps with PSKE

### Web interface

#### Login

Go to https://dashboard.prod.gardener.get-cloud.io/ to access the PSKE Dashboard:

{{< img src="8.png" alt="" >}}

You can log in with the API token we provide.

#### Overview

You should now see an overview like this (some clusters are already created in this demo).

{{< img src="9.png" alt="" >}}

### Cluster creation

Please navigate to the Clusters section to create your first cluster.

### Cluster details

{{< img src="10.png" alt="" >}}

1. The cluster name can be freely selected - the characters are only restricted by lowercase [a-z] or digits [0-9] (no special characters).
2. The Kubernetes version can be freely selected (we recommend using the latest version, as this supports all common Kubernetes features).
Versions that are EOL are marked accordingly.
1. Select the purpose of the cluster here. The following defaults are used (which can be changed):
   1. "evaluation" will shut down the cluster at the end of the workday ( 5 p.m.), but will not restart it.
   2. "development" causes clusters to automatically shut down (at 5 p.m.) and restart (at 8 a.m.).
   3. With "testing", there is no monitoring and logging of the cluster from our side.
   4. There is no hibernation schedule for "production", the cluster runs 24/7.

### Infrastructure details

{{< img src="11.png" alt="" >}}

1. Cloud Profile" lets you choose which of our datacenters your cluster runs in.
2. The pluscloud open secret is provided by us and cannot be deleted or changed.
3. Depending on the selected cloud profile, the corresponding region is automatically selected (prod1 => DE-WEST-1 (Cologne), prod2 => DE-NORD-1 (Hamburg), prod3 => DE-NORD-2 (Hamburg) and prod4 => DE-NORD-2 (Duesseldorf)). They refer to our datacenter location in Cologne, two locations in Hamburg and another one in Duesseldorf.
4. We recommend using the "Cilium" preset for "Networking Type".

### Worker

{{< img src="12.png" alt="" >}}

1. The group name can be freely chosen, but the characters are limited to lower case letters [a-z] or digits [0-9],"-" is the only special character allowed.
2) We only support the "amd64" architecture.
3. Under "Machine Type" you can select different flavors (e.g. SCS-16V:64:100 - Sovereign Cloud Stack (SCS)), which differ in the combination of CPU cores and RAM.
4) Flatcar or Ubuntu is currently available as the "Machine Image" for the workers.
5. The required "Volume Size" for the worker can be configured here. A later downsizing of the volume is possible via your dashboard and is done as a rolling upgrade, i.e. the old worker is replaced by a new worker with the new size.
6. The required "Volume Size" for the worker can be configured here, a later downsizing of the volume is possible via the dashboard in the self-service.
The downsizing is performed as a rolling upgrade, which means that the old worker is replaced by a new worker with the new sizing.
1. Autoscaling can be used to define the max and min number and the number of steps in which further workers are started. The autoscaler works on the basis of the requested resources of the workers, a detailed explanation can be found here https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
2. AZ = Availability Zones, spanning several fire sections.

### Flavors

During cluster creation in PSKE, 11 different node flavors are available:

| Flavor | CPU | RAM | ROM |
| --- | --- | --- | --- |
| SCS-2V:4:100 | 2 vCPUs | 4 GB | 100 GB |
| SCS-2V:8:100 | 2 vCPUs | 8 GB | 100 GB |
| SCS-2V:16:50 | 2 vCPUs | 16 GB | 50 GB |
| SCS-4V:8:100 | 4 vCPUs | 8 GB | 100 GB |
| SCS-4V:16:100 | 4 vCPUs | 16 GB | 100 GB |
| SCS-4V:32:100 | 4 vCPUs | 32 GB | 100 GB |
| SCS-8V:8:100 | 8 vCPUs | 8 GB | 100 GB |
| SCS-8V:16:100 | 8 vCPUs | 16 GB | 100 GB |
| SCS-8V:32:100 | 8 vCPUs | 32 GB | 100 GB |
| SCS-16V:32:100 | 16 vCPUs | 32 GB | 100 GB |
| SCS-16V:64:100 | 16 vCPUs | 64 GB | 100 GB |

The selection in the dashboard looks like this:

{{< img src="13.png" alt="" >}}

### Maintenance

{{< img src="14.png" alt="" >}}

1. A maintenance window for automatic updates (operating system and Kubernetes patch version) can be configured here. We recommend defining a maintenance window and checking the boxes in the Auto Updates section.
2. Worker operating system updates are done by rolling update, i.e. a worker is removed and a new worker is installed with the updates.
3. The Kubernetes version must be continuously patched to ensure that the Kubernetes cluster always supports all features.

### Hibernation

{{< img src="15.png" alt="" >}}

1. Select the days you wish to temporarily shut down your cluster to save resources and costs.
2. Specify the time at which to wake up the cluster.
3. Specify the time at which to shut down the cluster.

## Secrets


### DNS Secrets

{{< img src="16.png" alt="" >}}

1. The secrets for an external DNS provider can be stored here.

## Member

{{< img src="17.png" alt="" >}}

1. Here you can find an overview of the service accounts you already have.
2. Easily create additional service accounts with different roles.
3. See an overview and description of the different service account roles.

## Kubeconfig

A Kubeconfig must be available to interact with a cluster.

### Download of the kubeconfig

{{< img src="18.png" alt="" >}}

{{< img src="19.png" alt="" >}}

1. You can download the Kubeconfig by clicking on the key icon in the bar of the respective cluster.
2. In the new window, simply click on the download symbol.

### Using the Kubeconfig

The downloaded Kubeconfig should ideally be stored in the ".kube" folder in the home directory of the respective user.

```mv {KUBECONFIG-NAME}.yaml ~/.kube/```

This can then be exported.

```export KUBECONFIG=~/.kube/{KUBECONFIG-NAME}.yaml```