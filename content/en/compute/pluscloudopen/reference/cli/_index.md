---
title: "OpenStack on the Command Line (CLI)"
type: "docs"
weight: 50
date: 2023-02-24
description: >
  Working with OpenStackClient on the CLI
---
## OpenstackClient Examples

| Command | Effect |
| ------- | ------ |
| ``openstack image list`` | shows a list of available images |
| ``openstack image show <imagename>`` | shows the details of a specific image |
| ``openstack image set <imagename>``  | updates an image by name or ID |
| ``openstack image create ISO_IMAGE --file IMAGE.iso --disk-format iso --container-format bare`` | creates an image from an uploaded ISO file |
| ``openstack volume create --image <image> --size <size> name <somename>`` | creates a volume with a custom size | 
| ``openstack volume list`` | lists all volumes in your project | 
| ``openstack server add volume <server ID> <volume ID> --device /dev/vdb`` | attaches a volume to a server (specifying server ID and volume ID) as /dev/vdb | 
| ``openstack server remove volume <server ID> <volume ID>`` | detaches a volume from a server (specifying server ID and volume ID) |
| ``openstack volume set <volume ID> --size <size>`` | resizes a volume by setting a new size | 
| ``openstack volume delete <volume ID>`` | deletes a volume (note that a volume cannot be attached to a server during deletion - detach it first) |
| ``openstack volume transfer request create <volume ID>`` | creates a volume transfer request - the output of this command is a transfer ID and an authorization key - the key should be sent to the new owner of the volume (e. g. via e-mail) | 
| ``openstack volume transfer request accept <transfer ID> <authorization key>`` | to complete a volume transfer, the new owner accepts the volume with this command - using the authorization key received via e-mail |
| ``openstack volume transfer request delete <transfer ID>`` | deletes a pending volume transfer |

