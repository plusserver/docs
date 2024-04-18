---
title: "SCS R5"
linkTitle: "SCS R5"
type: "docs"
date: 2023-10-31
weight: 999
description: >
  Notes on changes and updates in SCS R5
---

## General notes 

- OpenStack 2023.1 (Antelope) is the OpenStack release that is used
- Ceph Quincy is the Ceph release that is used (no change to SCS R4)
- OVN and OVS are built from source and no longer installed via packages

## Important Information

This update requires us to rebuild the RabbitMQ messaging service. Therefore it is necessary to put the API and GUI into a downtime for about three hours. During this window, it will not be possible to manage running workload or spawn new workloads. Running workloads will not be affected!

## Overview of new features and requirements

### Horizon

Add support for port forwarding in the network floating IPs dashboard. This can be found under 'Network -> Floating IPs" in the dropdown menu of unassigned floating ips -> 'Configure floating IP port forwarding rules'.

### Nova

The latest compute API microversion supported for 2023.1 is v2.95.

### Keystone

With this version of Keystone, the old and deprecated "_member_" role is removed and only the new "member" role can be used in projects.

Since there are a lot of users who have the old role assigned, we will switch the roles for all users to the new one, so no one on the platform has to worry about it. At the same time, we will also upgrade the pco-expansion-api to version 0.2.1, which also uses the new "member" role.

### Flavors

Since the new SCS Flavor Naming Standard (https://docs.scs.community/standards/scs-0100-v2-flavor-naming/) has been released, it is neccessary for all SCS providers to follow it and provide the compute flavors with the new names, which will contain dashes instead of a colons. To minimize the impact, we will add the new flavors for everyone and set the old flavors to private visibility only in the projects that currently use them.

We ask you to only use the new flavors (with dashes) from the time the update is rolled out. Existing workloads will continue to run with the old flavor names. For a better overview within the projects, it would make sense to recreate running workloads with the new flavors, so that the old ones can then be removed from the project's flavor list.

### Detailed change logs for every component (incl. bug fixes)

- OpenStack 2023.1 press release: https://www.openstack.org/software/antelope/

OpenStack 2023.1 release notes:
- Overview: https://releases.openstack.org/antelope/index.html
- Barbican: https://docs.openstack.org/releasenotes/barbican/2023.1.html
- Cinder: https://docs.openstack.org/releasenotes/cinder/2023.1.html
- Designate: https://docs.openstack.org/releasenotes/designate/2023.1.html
- Glance: https://docs.openstack.org/releasenotes/glance/2023.1.html
- Heat: https://docs.openstack.org/releasenotes/heat/2023.1.html
- Horizon: https://docs.openstack.org/releasenotes/horizon/2023.1.html
- Keystone: https://docs.openstack.org/releasenotes/keystone/2023.1.html
- Neutron: https://docs.openstack.org/releasenotes/neutron/2023.1.html
- Nova: https://docs.openstack.org/releasenotes/nova/2023.1.html
- Octavia: https://docs.openstack.org/releasenotes/octavia/2023.1.html
- Placement: https://docs.openstack.org/releasenotes/placement/2023.1.html
 
