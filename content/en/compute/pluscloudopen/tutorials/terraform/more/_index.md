---
title: "More examples"
linkTitle: "More examples"
type: "docs"
weight: 3
date: 2023-02-21
description: >
   Example Terraform descriptions for some use cases
---

## Roll out one individual instance

In our Terraform Repo example you will find an example description of how to deploy a single instance.

[SOURCE](https://github.com/pluscloudopen/terraform-pco/tree/main/just-one-instance)

### Variables

Before you fire your "terraform apply", make sure that you change the following variables in variables.tf or create a *.tfvars and set the values for yourself:

* keypair_name - replace this with the name of your key pair
* private_network_name - replace it with the name of your project network

Optional changes:

* image (name) - the name of the operating system image you wish to use
* flavor (name) - the name of the flavor (instance size) you want to use

## Single instance with *cloud-init*

This example describes how an instance can be deployed with the help of cloud-init.

[SOURCE](https://github.com/pluscloudopen/terraform-pco/tree/main/instance-using-cloud-init)

### Variables

Before you fire your "terraform apply", make sure that you change the following variables in variables.tf or create a *.tfvars and set the values for yourself:

* keypair_name - replace this with the name of your key pair
* private_network_name - replace it with the name of your project network

Optional changes:

* image (name) - the name of the operating system image you wish to use
* flavor (name) - the name of the flavor (instance size) you want to use

### cloud-init

The example performs an update, installs an nginx web server, changes the title in the default page and performs a restart.

Further information on using cloud-init can be found in the examples in the official documentation.

[cloud-init Documentation: Examples of the cloud configuration](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)

## Deploy multiple instances behind one LB

In this example, we deploy a certain number of servers that are made accessible with a load balancer.

[SOURCE](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)

### Variables

Before you fire your "terraform apply", make sure that you change the following variables in variables.tf or create a *.tfvars and set the values for yourself:

* keypair_name - replace this with the name of your key pair
* private_network_name - replace this with the name of your project network
* private_subnet_name - replace it with the name of the subnet in your project network

Optional changes:

* image (name) - the name of the operating system image you wish to use
* flavor (name) - the name of the flavor (instance size) you want to use
* server_count - the number of web servers you want to create (default: 2)

You can also change the variables via cli as in:

```bash
terraform plan -var "server_count=5"
```

```bash
terraform apply -var "server_count=5"
```

### cloud-init

The example performs an update, installs an nginx web server, changes the title in the default page and adds the hostname and performs a restart. It will take a few moments until it is ready after terraform has reported a successful installation.

Further information on using cloud-init can be found in the examples in the official documentation.

[cloud-init Documentation: Examples of the cloud configuration](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)
