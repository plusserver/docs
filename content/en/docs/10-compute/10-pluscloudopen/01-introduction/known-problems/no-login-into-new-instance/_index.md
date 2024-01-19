---
#https://gohugo.io/content-management/page-bundles/
title: "Can not login into new launched instance"
date: 2023-02-24
description: >
  You have started a new instance but can not login with your putty generated ssh key.
---

You have just started a new instance but you can not login to it via ssh, although you have set up and deployed an ssh keypair - that you generated with putty or puttygen - into OpenStack. 

Even when you have checked, that the right ssh private key is used, the login does not work. 

The reason for this is, that putty and puttygen use a different format for the generation of ssh keypairs than OpenStack. The ssh key pairs, that are used in OpenStack and Linux should be 
saved in OpenSSH format. If you have a ssh key pair, already, you can convert it into OpenSSH format with putty, save it and upload the public key into OpenStack.

