---
title: "SCS R&"
linkTitle: "SCS R6"
type: "docs"
date: 2024-03-25
weight: 999
description: >
  Notes on changes and updates in SCS R6
---

## General notes 

- OpenStack 2023.2 (Bobcat) is the OpenStack release that is used
- Ceph Quincy is the Ceph release that is used. Version 17.2.7 is included.

## Important information

This update requires us to rebuild the RabbitMQ messaging service to move to quorum queues, which are a lot more stable and resilient. Therefore it is necessary to put the API and GUI into a downtime for about three hours. During this window, it will not be possible to manage running workload or spawn new workloads. Running workloads will not be affected!

## Overview of new features and requirements

### Horizon

We have switched to a new branding mechanism to improve the design of the log in page.

### Nova

The latest compute API microversion supported for 2023.2 is v2.95.

### Neutron

Fixes an issue in the OVN driver, that could make network metadata unavailable, if the metadata port was ever deleted. To recreate the port, users can now disable and reenable DHCP for one of the subnets associated with the network using the Neutron API. This will try and create the port - similar to what happens in the DHCP agent for ML2/OVS.

### Heat

The following resource types are now hidden. Neutron LBaaS v2 was already retired thus the following resource types can no longer be used:

- OS::Neutron::LBaaS::LoadBalancer
- OS::Neutron::LBaaS::Listener
- OS::Neutron::LBaaS::Pool
- OS::Neutron::LBaaS::PoolMember
- OS::Neutron::LBaaS::HealthMonitor
- OS::Neutron::LBaaS::L7Policy
- OS::Neutron::LBaaS::L7Rule

### Detailed change logs for every component (incl. bug fixes)

- OpenStack 2023.2 press release: https://www.openstack.org/software/openstack-bobcat/

OpenStack 2023.2 release notes:
- Overview: https://releases.openstack.org/bobcat/index.html
- Barbican: https://docs.openstack.org/releasenotes/barbican/2023.2.html
- Ceilometer: https://docs.openstack.org/releasenotes/ceilometer/2023.2.html
- Cinder: https://docs.openstack.org/releasenotes/cinder/2023.2.html
- Designate: https://docs.openstack.org/releasenotes/designate/2023.2.html
- Glance: https://docs.openstack.org/releasenotes/glance/2023.2.html
- Heat: https://docs.openstack.org/releasenotes/heat/2023.2.html
- Horizon: https://docs.openstack.org/releasenotes/horizon/2023.2.html
- Ironic: https://docs.openstack.org/releasenotes/ironic/2023.2.html
- Keystone: https://docs.openstack.org/releasenotes/keystone/2023.2.html
- Manila: https://docs.openstack.org/releasenotes/manila/2023.2.html
- Neutron: https://docs.openstack.org/releasenotes/neutron/2023.2.html
- Nova: https://docs.openstack.org/releasenotes/nova/2023.2.html
- Octavia: https://docs.openstack.org/releasenotes/octavia/2023.2.html
- Placement: https://docs.openstack.org/releasenotes/placement/2023.2.html 
