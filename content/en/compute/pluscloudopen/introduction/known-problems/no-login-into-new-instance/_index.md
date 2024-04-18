---
#https://gohugo.io/content-management/page-bundles/
title: "Can not login to newly launched instance"
type: "docs"
date: 2023-02-24
description: >
  You have started a new instance, but are unable to login with your PuTTY-generated SSH key.
---

You have just started a new instance, but cannot log in via SSH, even though you have an SSH keypair - generated with PuTTY or PuTTYgen - set up and deployed in OpenStack. 

Even after checking that the correct SSH private key is being used, the login does not work. 

This is because PuTTY and PuTTYgen use a different format for generating SSH keypairs than OpenStack. The SSH key pairs used in OpenStack and Linux should be 
saved in OpenSSH format. If you already have an SSH key pair, you can use PuTTY to convert it to OpenSSH, save it and upload the public key to OpenStack.

