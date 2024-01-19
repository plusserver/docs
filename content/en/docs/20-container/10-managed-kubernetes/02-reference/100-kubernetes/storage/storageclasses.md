---
title: "StorageClasses"
linkTitle: "StorageClasses"
weight: 20
date: 2023-10-22
---

# StorageClasses

plusserver provides the following StorageClasses for "plusserver Kubernetes Engine (PSKE) on pluscloud open":

```bash
kubectl get storageclasses
NAME                             PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION
csi-cinder-sc-delete (default)   cinder.csi.openstack.org   Delete          Immediate           true
csi-cinder-sc-retain             cinder.csi.openstack.org   Retain          Immediate           true
```

- **csi-cinder-sc-delete** is the default StorageClass and is used if no explicit StorageClass is specified in the PersistentVolumeClaim.

## Provisioner

Each StorageClass uses a provisioner that determines which volume plugin is used to create PersistentVolumes. In this case, the "cinder.csi.openstack.org" provisioner is used.

Please note that the "cinder.csi.openstack.org" provisioner supports only the "ReadWriteOnce" access mode, meaning that the PersistentVolume can be mounted in read/write mode by only one node at a time.

## Reclaim Policy

PersistentVolumes created dynamically by a StorageClass use the reclaimPolicy specified in the StorageClass, which can be "Delete" or "Retain." With the "Delete" reclaimPolicy, the associated PersistentVolume is automatically deleted when the PersistentVolumeClaim is deleted. With the "Retain" reclaimPolicy, the PersistentVolume remains even after the PersistentVolumeClaim is deleted.

## Volume Binding Mode

The VolumeBindingMode determines when a PersistentVolume is created and associated with a matching PersistentVolumeClaim, if present. In this case, the PersistentVolume is created immediately (Immediate) and associated with a corresponding PersistentVolumeClaim. It's a one-to-one mapping of PersistentVolumeClaims to PersistentVolumes.

## Allow Volume Expansion

PersistentVolumes can be resized as needed. Users can increase the size of the associated PersistentVolume by modifying the PersistentVolumeClaim. Note that this feature only supports volume expansion and not volume reduction.

## StorageClass with ReclaimPolicy Delete

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: csi-cinder-sc-delete
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: cinder.csi.openstack.org
reclaimPolicy: Delete
```

## StorageClass with ReclaimPolicy Retain

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: csi-cinder-sc-retain
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: cinder.csi.openstack.org
reclaimPolicy: Retain
```