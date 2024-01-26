---
#https://gohugo.io/content-management/page-bundles/
title: "OpenStack Object Storage as a Backend for Terraform Statefiles"
date: 2023-03-14
description: >
  Manage your Infrastructure as Code (IaC) with Hashicorp Terraform and use OpenStack Object Storage as a Backend
---

## Get your S3 credentials

In order to get your s3 credentials you need your OpenStack client set up correctly. If that's the case, you can enter

``$ openstack ec2 credentials create``

The output of that command should be similar to this:

    +------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
    | Field      | Value                                                                                                                                               |
    +------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
    | access     | 5aen4quuuQu8ci7aoceeyaek8oodohgh                                                                                                                    |
    | links      | {'self': 'https://prod1.api.pco.get-cloud.io:5000/v3/users/poashohhe9eo8EeQuez3ochaeWaeBoiR/credentials/OS-EC2/5aen4quuuQu8ci7aoceeyaek8oodohgh'}   |
    | project_id | Eine8Jai4hohzieShoo1iem0yai7fair                                                                                                                    |
    | secret     | iek1aechaequa8pheitahNgeizai3eig                                                                                                                    |
    | trust_id   | None                                                                                                                                                |
    | user_id    | poashohhe9eo8EeQuez3ochaeWaeBoiR                                                                                                                    |
    +------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+

Obviously your credentials should be different (those above are fake). Relevant for S3-access are only the "access" and "secret" values. 

## Create a bucket

With your S3 credentials ready, you need to create a place to store your data in. In S3 terms, this place is called a "bucket". You can either create a bucket via the web ui (Horizon) or on the command line.

### Create a bucket via web ui

Logged in to the web ui (Horizon) you can navigate to "Object Store" in the left menu and then click on "Containers" (that's how buckets are called in Horizon) ![Screenshot of Container screen in Horizon](./container2.png). 
Click on the "+Container" button then enter a name for your new container, choose a storage policy and choose, whether your new bucket should be accessable publicly or only private (most of the time you would choose private). Click on "Create" to create the new bucket 

![Screenshot of the Container create dialog in Horizon](./container1.png). 

It should immediately show up in the Container list 

![Screenshot of the Container details screen in Horizon](./container3.png).

### Create a bucket with aws cli

To create a bucket in your object storage from the command line you can use the aws cli tool, which should be installed into a python virtual environment:

    $ → python3 -m venv awscli
    $ → . ./awscli/bin/activate
    $ → pip3 install awscli
    Collecting awscli
      Using cached awscli-1.27.93-py3-none-any.whl (4.0 MB)
    Collecting botocore==1.29.93
    [...]
    Installing collected packages: urllib3, jmespath, six, python-dateutil, botocore, colorama, docutils, s3transfer, pyasn1, rsa, PyYAML, awscli
    Successfully installed PyYAML-5.4.1 awscli-1.27.93 botocore-1.29.93 colorama-0.4.4 docutils-0.16 jmespath-1.0.1 pyasn1-0.4.8 python-dateutil-2.8.2 rsa-4.7.2 s3transfer-0.6.0 six-1.16.0 urllib3-1.26.15

Next aws cli wants to be configured:

    (awscli) $ → aws configure --profile=prod1
    AWS Access Key ID [None]: 5aen4quuuQu8ci7aoceeyaek8oodohgh
    AWS Secret Access Key [None]: iek1aechaequa8pheitahNgeizai3eig
    Default region name [None]: 
    Default output format [None]: 
    (awscli) $ → 

With the configuration in place, you can finally create your bucket via cli:

    (awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api create-bucket --bucket mytfstate

Hashicorp recommends to enable versioning for the bucket, thus keeping versioned copies of your terraform.tfstate file. You can enable versioning for your bucket like this:

    (awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api put-bucket-versioning --bucket mytfstate --versioning-configuration 
    (awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api get-bucket-versioning --bucket mytfstate 
    {
    "Status": "Enabled",
    "MFADelete": "Disabled"
    }

## Set Up Terraform to use your new bucket as a backend for its tfstate

As we now have a bucket in the object store, we can configure terraform to use it as a backend for the terraform state.
Please include this part of the backend configuration into your terraform code: 

    terraform {
      required_providers {
        openstack = {
        source = "terraform-provider-openstack/openstack"
        }
      }
      required_version = ">= 0.13"
      
      backend "s3" {
         bucket = "mytfstate"
         key    = "terraform.tfstate"
         region = "us-east-1" 
         endpoint = "prod1.api.pco.get-cloud.io:8080"
         skip_credentials_validation = true
         skip_region_validation = true
         force_path_style = true
      }
    
    }
Now export your access-key and your secret-key as AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables respectively in order to prevent those being saved to your local disk.

    export AWS_ACCESS_KEY_ID='5aen4quuuQu8ci7aoceeyaek8oodohgh'
    export AWS_SECRET_ACCESS_KEY='iek1aechaequa8pheitahNgeizai3eig'

With your credentials exported, you can now initialize terraform like this:

    $ tform → terraform init
    
    Initializing the backend...
    
    Successfully configured the backend "s3"! Terraform will automatically
    use this backend unless the backend configuration changes.
    
    Initializing provider plugins...
    - Finding latest version of hashicorp/template...
    - Finding latest version of terraform-provider-openstack/openstack...
    - Installing terraform-provider-openstack/openstack v1.51.0...
    - Installed terraform-provider-openstack/openstack v1.51.0 (self-signed, key ID 4F80527A391BEFD2)
    - Installing hashicorp/template v2.2.0...
    - Installed hashicorp/template v2.2.0 (signed by HashiCorp)
    
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

