---
title: "SCS R5"
linkTitle: "SCS R5"
date: 2023-10-31
weight: 999
description: >

---

## General notes for the SCS R5 Release on pluscloud open:

- OpenStack 2023.1 (Antelope) is the OpenStack release that is used.
- Ceph Quincy is the Ceph release that is used (no change to SCS R4)
- OVN and OVS are built from source and no longer installed via packages.

## Important Information:

With this update we have to rebuild the RabbitMQ Messaging Service and therefore it is necessary to set the API and GUI into a downtime for about three hours. Into that window it will not be possible to manage running workload or spawn new workload.
Running workload will not be affected!

## New features and requirements overview:

### horizon

Add support to portforwardings in the Network Floating IPs dashboard. Find it in the menu under 'Network -> Floating IPs" in the dropdown menu of unassigned floating ips -> 'Configure floating IP port forwarding rules'

### nova

The latest Compute API microversion supported for 2023.1 is v2.95.

### keystone

with this version of keystone the old and deprecated role "_member_" will be removed and only the new role "member" can be used from now on inside the projects.

As there are a lot of users which have the old role assigned we will switch the roles for all users to the new one so that none of the users of the platform have to take care about that. At the same time we will also switch the pco-expansion-api to version 0.2.1 which also uses the new "member" role.

### flavors

as the new SCS flavor standard (which can be found here: https://docs.scs.community/standards/scs-0100-v2-flavor-naming/) has been released it is neccessary for all SCS providers to follow this and provide the compute flavors with the new names which will contain dashes instead of a colons. To keep the impact as small as possible we will add the new flavors for everybody and set the old flavors to private visibility only in the projects which are using them at the moment.

We ask you to only use the new flavors (with dashes) starting from the point of time when the update has been rolled out. Existing workload will continue running with the old flavor names. For a better overview inside the projects it would make sense to recreate running workloads with the new flavors, so that the old ones can then be purged from the project's flavor list.
more details

### detailed changelogs for every component which includes also bugfixes etc. can be found here:

- OpenStack 2023.1 press announcement: https://www.openstack.org/software/antelope/

OpenStack 2023.1 release notes:
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
- Overview: https://releases.openstack.org/antelope/index.html
 
