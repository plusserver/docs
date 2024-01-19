---
title: "PSKE - Cluster Provisioning (Terraform)"
linkTitle: "Cluster Provisioning (Terraform)"
weight: 10
date: 2023-10-20
---

# Kubectl Provider

The Terraform Kubectl Provider enables the provisioning of Kubernetes clusters within the PSKE (Gardener) using, as already mentioned, Terraform.

## Components and accesses required

The following is required:

- Access token to the PSKE (Gardener) dashboard
- locally installed Terraform Client (https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- the kubectl Terraform Provider, which is later installed independently by Terraform (https://github.com/gavinbunney/terraform-provider-kubectl)

## Terraform preparation and provider setup

First, create an empty working directory for the test or clone this repo and change to its directory.

Depending on whether you have created an empty directory or using the repository, you create a “versions.tf” which contains the following:

```terraform
terraform {
  required_version = ">= 0.13"

  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
  }
}
```

Here it is defined which provider is required in which version and should be obtained automatically by the Terraform tool at the following "terraform init".

Basically the name "versions.tf" is completely arbitrary, you can call the file whatever you want, only the ending .tf is important because Terraform searches for and executes all *.tf files in the current directory when executed. But it makes sense to name it according to an appropriate scheme so that you can keep track of its contents.

## Creating the PSKE Gardener configuration

In the next step we create a "gardener.tf" (as mentioned, the name itself doesn't matter as long as the file has a .tf ending), in which we define the following block at the beginning:

```terraform
provider "kubectl" {
  config_path    = "PATH/KUBECONFIGFILENAME"
}
```

Here it is defined that we want to use the "kubectl" Terraform provider, which we previously specified in the versions.tf. Furthermore, we need to specify the path to the kubeconfig for the PSKE/Gardener service account, which has the authorization to create and delete clusters.

To do this, log in to the corresponding PSKE dashboard, in this specific case https://dashboard.prod.gardener.get-cloud.io.

There you click on "Members" on the left and then look for the project's service account, in my specific case that would be MA-24, which also has the role "Service Account Manager", and download the kubeconfig file from there.

This file must then be referenced accordingly in the previously created versions.tf. In this simple example it would be like this for me:

```terraform
provider "kubectl" {
  config_path    = "~/Downloads/kubeconfig-2.yaml"
}
```

This ensures that the kubectl provider has the necessary configuration to connect to the PSKE (Gardener) and carry out the corresponding actions.

## Definition of the Kubernetes cluster

After we have set up Terraform and configured the kubectl provider so that it can communicate with the PSKE, we come to the actual point of provisioning a Kubernetes cluster.

For this purpose, for example, we create a cluster.tf, which must basically have the following content:

```terraform
resource "kubectl_manifest" "NAMEOFRESOURCE" {
    yaml_body = <<YAML
<HERE WE PUT THE ACTUAL CONFIG>
YAML
}
```

NAMEDERRESOURCE is only relevant for Terraform and does not reflect the name of the actual cluster, but frankly it makes sense to name them so that they can be assigned again later in a growing configuration.

This is used to pass the desired configuration to the Gardener API in YAML format, which you can of course be written entirely by hand, but you can also let the dashboard do it for you.

To do this, you essentially go through the process of setting up a Kubernetes cluster using the corresponding PSKE dashboard, configure the cluster the way you need it with all the settings you need, including the number and size of worker nodes, maintenance and hibernation schedules, etc. At the end, don't actually start the creation, but click on "YAML" next to "Overview" in the bar at the top. There you will then receive the complete definition of the desired configuration in YAML format.

Now copy this configuration and paste it into the cluster.tf instead of <HERE WE PUT THE ACTUAL CONFIG>, i.e. between the two lines with YAML.

In my example this would look like this, but as you can see from the metadata, this has to be adapted accordingly for the environment in which it is to run. Therefore, it is better to use your own extract.

```terraform
resource "kubectl_manifest" "tf_test_shoot" {
    yaml_body = <<YAML
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  namespace: garden-ma-24
  name: terraform-test
spec:
  provider:
    type: openstack
    infrastructureConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/16
      floatingPoolName: ext01
    controlPlaneConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerProvider: amphora
    workers:
      - name: k8sworker
        minimum: 1
        maximum: 2
        maxSurge: 1
        machine:
          type: SCS-2V:4:100
          image:
            name: ubuntu
            version: 22.4.2
          architecture: amd64
        zones:
          - nova
        cri:
          name: containerd
        volume:
          size: 50Gi
  networking:
    nodes: 10.250.0.0/16
    type: cilium
  cloudProfileName: pluscloudopen-hire
  secretBindingName: my-openstack-secret
  region: RegionOne
  purpose: evaluation
  kubernetes:
    version: 1.27.5
    enableStaticTokenKubeconfig: false
  addons:
    kubernetesDashboard:
      enabled: false
    nginxIngress:
      enabled: false
  maintenance:
    timeWindow:
      begin: 010000+0200
      end: 020000+0200
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
  hibernation:
    schedules:
      - start: 00 17 * * 1,2,3,4,5
        location: Europe/Berlin
  controlPlane:
    highAvailability:
      failureTolerance:
        type: node
YAML
}
```

Note: if you only want to create the cluster using Terraform but don't want to delete it with Terraform again, then you don't need to adjust anything else to the definition. However, if Terraform should later be able to delete the created cluster using a "terraform destroy", then the following adjustment is required here:

```terraform
metadata:
  namespace: garden-ma-24
  name: terraform-test
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

So you need to add the following annotation:

```terraform
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

Important, pay attention to the indentation, it's YAML!!!

## Creation of the Kubernetes cluster

If you have done everything above accordingly, we finally come to the actual creation of the cluster.

We switch to the working directory with our shell, where we have created the versions.tf, cluster.tf and gardener.tf and first initialize the Terraform and let it install the kubectl provider:

```bash
terraform init
```

The output here should resemble this:

```bash
Initializing the backend...

Initializing provider plugins...
- Finding gavinbunney/kubectl versions matching ">= 1.7.0"...
- Installing gavinbunney/kubectl v1.14.0...
- Installed gavinbunney/kubectl v1.14.0 (self-signed, key ID AD64217B5ADD572F)

Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

Next you make a “terraform plan”, which looks at the previously created .tf configurations and checks if it is in order, whether it knows everything and whether you have made any syntax errors.

```bash
terraform plan
```

In my example case, the output here should resemble this:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be created
  + resource "kubectl_manifest" "tf_test_shoot" {
      + api_version             = "core.gardener.cloud/v1beta1"
      + apply_only              = false
      + force_conflicts         = false
      + force_new               = false
      + id                      = (known after apply)
      + kind                    = "Shoot"
      + live_manifest_incluster = (sensitive value)
      + live_uid                = (known after apply)
      + name                    = "terraform-test"
      + namespace               = "garden-ma-24"
      + server_side_apply       = false
      + uid                     = (known after apply)
      + validate_schema         = true
      + wait_for_rollout        = true
      + yaml_body               = (sensitive value)
      + yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT
      + yaml_incluster          = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

If everything suits him so far, then it should say that he wants to create a resource here (the Kubernetes cluster) with the previously defined values.

If you agree to this, you can do this using “terraform apply”. It then shows you everything it would do and requires you to say “yes” so that it can actually do it. You can avoid this query by appending an "-auto-approve" to the command, but you should be really, really sure that this is what you really want.

```bash
terraform apply
```

Which in my case would look like this:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be created
  + resource "kubectl_manifest" "tf_test_shoot" {
      + api_version             = "core.gardener.cloud/v1beta1"
      + apply_only              = false
      + force_conflicts         = false
      + force_new               = false
      + id                      = (known after apply)
      + kind                    = "Shoot"
      + live_manifest_incluster = (sensitive value)
      + live_uid                = (known after apply)
      + name                    = "terraform-test"
      + namespace               = "garden-ma-24"
      + server_side_apply       = false
      + uid                     = (known after apply)
      + validate_schema         = true
      + wait_for_rollout        = true
      + yaml_body               = (sensitive value)
      + yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT
      + yaml_incluster          = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

kubectl_manifest.tf_test_shoot: Creating...
kubectl_manifest.tf_test_shoot: Creation complete after 2s [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

If it doesn't display any errors here, then it has started creating the cluster. You can now go to the PSKE dashboard and follow the status until the creation has taken place.

## Change to the Kubernetes cluster

If you want to make changes to the Kubernetes cluster, you will need to adapt the definition we previously made in “cluster.tf”.

Let's say, for example, that we want to adjust the number of worker nodes, for example from

```terrform
    workers:
      - name: k8sworker
        minimum: 2
        maximum: 3
        maxSurge: 1
```

to

```terrform
    workers:
      - name: k8sworker
        minimum: 2
        maximum: 3
        maxSurge: 1
```

After you have made the above change, you can use "terraform plan" to see whether the syntax is correct and with "terraform apply" you can have the change defined above carried out.

It's important to remember that just because the syntax is correct, it doesn't mean it cannot fail during an "apply". This can have multiple reasons, for example:

1. Desired resources exceed what is available in the cluster. So more CPU, RAM, etc. is required. The plan will be executed here, but Gardener will produce an error at some point during execution because the resources have been exhausted.

2. You define something that doesn't exist, such as under machine / type, where in our example we selected the following type "SCS-2V:4:100". If you specify a machine type here that is not provided in this form, e.g. "SCS-1V:2:100", i.e. only VCPU core and 2GB RAM, then everything will be displayed by "plan" as everything is OK , but an "apply" returns an error:

```bash
.workers[0].machine.type: Unsupported value: "SCS-1V:2:100": supported values: "SCS-16V:32:100", "SCS-16V:64:100", "SCS-2V:16:50", "SCS-2V:4:100", "SCS-2V:8:100", "SCS-4V:16:100", "SCS-4V:32:100", "SCS-4V:8:100", "SCS-8V:16:100", "SCS-8V:32:100", "SCS-8V:8:100"]
```

There are many more reasons why a plan cannot be executed, but these are usually explained by a relatively clear error message.

## Deletion of the Kubernetes cluster

If you want to delete the cluster again via Terraform, you had to add the following block to the configuration before creating it, as mentioned above:

```terraform
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

Once you have done this, you are now able to use Terraform to delete the previously created cluster using a “terraform destroy”. Here too, confirmation is required by entering “yes”, which can of course be avoided by appending “-auto-approve”. But as always, be sure that it is what you want and that you are applying it to the right environment.

```bash
terraform destroy
```

In my case it looks like this:
<>
```bash
kubectl_manifest.tf_test_shoot: Refreshing state... [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be destroyed
  - resource "kubectl_manifest" "tf_test_shoot" {
      - api_version             = "core.gardener.cloud/v1beta1" -> null
      - apply_only              = false -> null
      - force_conflicts         = false -> null
      - force_new               = false -> null
      - id                      = "/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test" -> null
      - kind                    = "Shoot" -> null
      - live_manifest_incluster = (sensitive value)
      - live_uid                = "42edffa5-dacd-4c23-a879-a8034b175f7c" -> null
      - name                    = "terraform-test" -> null
      - namespace               = "garden-ma-24" -> null
      - server_side_apply       = false -> null
      - uid                     = "42edffa5-dacd-4c23-a879-a8034b175f7c" -> null
      - validate_schema         = true -> null
      - wait_for_rollout        = true -> null
      - yaml_body               = (sensitive value)
      - yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT -> null
      - yaml_incluster          = (sensitive value)
    }

Plan: 0 to add, 0 to change, 1 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

kubectl_manifest.tf_test_shoot: Destroying... [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]
kubectl_manifest.tf_test_shoot: Destruction complete after 1s

Destroy complete! Resources: 1 destroyed.
```

If he doesn't give any errors here again and says at the end that he has destroyed 1 resource, then you can switch back to the PSKE dashboard and watch the deletion process.
