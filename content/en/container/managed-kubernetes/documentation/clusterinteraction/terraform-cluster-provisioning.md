---
title: "PSKE - Cluster Provisioning (Terraform)"
linkTitle: "Cluster Provisioning (Terraform)"
type: "docs"
weight: 10
date: 2023-10-20
---

# kubectl Provider

The Terraform kubectl Provider allows you to deploy Kubernetes clusters within the PSKE (Gardener) using Terraform.

## Required components and accesses 

- Access token to the PSKE (Gardener) dashboard
- Locally installed Terraform Client (https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- The kubectl Terraform Provider, which will later be installed by Terraform (https://github.com/gavinbunney/terraform-provider-kubectl)

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

This is used to define which provider is needed in which version and should be automatically obtained by the Terraform tool during the following "terraform init".

The file name "versions.tf" is arbitrary, you can name the file whatever you want, only the extension .tf is important, because Terraform will search and execute all *.tf files in the current directory. But it makes sense to name it according to a scheme so that you can keep track of its contents.

## Creating the PSKE Gardener configuration

In the next step we create a "gardener.tf" (as mentioned, the name itself doesn't matter as long as the file has a .tf ending), in which we define the following block at the beginning:

```terraform
provider "kubectl" {
  config_path    = "PATH/KUBECONFIGFILENAME"
}
```

This specifies that we want to use the "kubectl" Terraform provider that we previously defined in versions.tf. We also need to specify the path to kubeconfig for the PSKE/Gardener service account, which has the authority to create and delete clusters.

To do so, log in to the corresponding PSKE dashboard, in this specific case https://dashboard.prod.gardener.get-cloud.io.

From there, click on "Members" on the left, then find the project's service account, which in our case would be MA-24, with the role "Service Account Manager", and download the kubeconfig file from there.

This file must then be referenced in the previously created versions.tf. In our example it would look like this:

```terraform
provider "kubectl" {
  config_path    = "~/Downloads/kubeconfig-2.yaml"
}
```

This ensures that the kubectl provider has the necessary configuration to connect to the PSKE (Gardener) and perform the desired actions.

## Definition of the Kubernetes cluster

Now that we have set up Terraform and configured the kubectl provider to communicate with the PSKE, we are ready to actually deploy a Kubernetes cluster.

To do this, we create a file called cluster.tf (for example), which basically contains the following:

```terraform
resource "kubectl_manifest" "NAMEOFRESOURCE" {
    yaml_body = <<YAML
<HERE WE PUT THE ACTUAL CONFIG>
YAML
}
```

NAMEOFRESOURCE is only relevant to Terraform and does not reflect the name of the actual cluster, but it makes sense to name it so that it can be reassigned later in a growing configuration.

This file is used to pass the desired configuration to the Gardener API in YAML format, which you can of course write entirely by hand, but you can also let the dashboard do it for you.

To do so, you essentially go through the process of setting up a Kubernetes cluster using the PSKE dashboard, configuring the cluster the way you want it with all the settings you need, including the number and size of worker nodes, maintenance and hibernation schedules, and so on. When you're finished, don't actually start the creation, but click on "YAML" next to "Overview" in the bar at the top. There you will get the complete definition of the desired configuration in YAML format.

Now copy this configuration and paste it into the cluster.tf instead of < … >, i.e. between the two lines with YAML.

In our example, it would look like this, but as you can see from the metadata, it needs to be customized for the environment it will be running in.

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

Note: If you only want to create the cluster with Terraform and don't want to delete it using Terraform, you don't need to adjust anything else in the definition. However, the following adjustment is required if you want Terraform to be able to delete the created cluster with a "terraform destroy" later on:

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

Make sure you pay attention to the indentation. It's YAML!

## Creation of the Kubernetes cluster

Once you have done all of the above, you are ready to create the cluster.

We switch to the working directory with our shell where we have created versions.tf, cluster.tf and gardener.tf, initialize Terraform and let it install the kubectl provider:

```bash
terraform init
```

The output should look like this:

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

Next, you create a "terraform plan" that looks at the .tf configurations you created earlier and checks to see if they are correct, if everything is included, and if there are any syntax errors.

```bash
terraform plan
```

In our example, the output looks like this:

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

If everything is fine so far, it should say that it wants to create a resource (the Kubernetes cluster) with the previously defined values.

If you agree, you can use "terraform apply". Then you will be shown everything it will do and typing "yes" will finally start the process. You can avoid this query by appending an "-auto-approve" to the command, but you should be really, really sure that this is what you really want.

```bash
terraform apply
```

In our example it would look like this:

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

If no errors are displayed, the cluster creation has started. You can now go to the PSKE dashboard and follow the status until the creation is complete.

## Changes to the Kubernetes cluster

If you want to make changes to the Kubernetes cluster, you will need to adjust the definition we made earlier in cluster.tf.

For example, let's say we want to change the number of worker nodes from

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

After you have made the above change, you can use "terraform plan" to see if the syntax is correct and "terraform apply" to apply the change.

### Changes to an already existing cluster

If you wish to make changes to an already existing cluster via Terraform, you can just follow these steps:

1. Go into the Gardener dashboard and click on the cluster you want to import. Get the manifest by clicking YAML at the top of the page and save it.
Keep in mind, that you may have to remove any unnecessary value key pair from the yaml like creationTimestamp, resourceVersion and the whole status section at the bottom.

2. Fill in the according names and IDs and execute the following import command:
`terraform import kubectl_manifest.<cluster-name> core.gardener.cloud/v1beta1//Shoot//<cluster-name>//garden-<id>`

3. Then just proceed to execute `terraform init`, `terraform plan` and `terraform apply` and Terraform will apply your changes.



It's important to remember that just because the syntax is correct doesn't mean it can't fail during an "apply". This can happen for a number of reasons such as:

1. Desired resources exceed what is available in the cluster. So more CPU, RAM, etc. is required. The plan will be executed here, but Gardener will produce an error at some point during execution because the resources have been exhausted.

2. You define something that doesn’t exist, such as under machine / type, where in our example we selected the following type “SCS-2V:4:100”. If you specify a machine type that does not exist, e.g. "SCS-1V:2:100", i.e. only one VCPU core and 2 GB RAM, then "plan" will show everything as OK, but "apply" will return an error:

```bash
.workers[0].machine.type: Unsupported value: "SCS-1V:2:100": supported values: "SCS-16V:32:100", "SCS-16V:64:100", "SCS-2V:16:50", "SCS-2V:4:100", "SCS-2V:8:100", "SCS-4V:16:100", "SCS-4V:32:100", "SCS-4V:8:100", "SCS-8V:16:100", "SCS-8V:32:100", "SCS-8V:8:100"]
```

There are many more reasons why a plan cannot be executed, but these are usually explained by a relatively clear error message.

## Deletion of the Kubernetes cluster

If you want to delete the cluster via Terraform later on, the following block should be added to the configuration before creating the cluster as mentioned above:

```terraform
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

When this is done, you can use Terraform to delete the previously created cluster using a "terraform destroy". Again, you have to confirm with "yes", which can be avoided by appending "-auto-approve". But as always, be sure that this is what you want and that you are applying it to the right environment.

```bash
terraform destroy
```

In our example it looks like this: 
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

If no errors are reported and you get the information that one resource has been destroyed, you can switch back to the PSKE dashboard and watch the deletion process.
