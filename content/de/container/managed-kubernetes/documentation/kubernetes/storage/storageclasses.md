---
title: "StorageClasses"
linkTitle: "StorageClasses"
type: "docs"
weight: 20
date: 2023-10-22
---

# StorageClasses

plusserver stellt die folgenden StorageClasses für "plusserver Kubernetes Engine (PSKE) auf pluscloud open" zur Verfügung:

```bash
kubectl get storageclasses
NAME                  PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION
default (default)     cinder.csi.openstack.org   Delete          WaitForFirstConsumer   true                   
default-class         cinder.csi.openstack.org   Delete          WaitForFirstConsumer   true                   
encrypted             cinder.csi.openstack.org   Delete          Immediate              false
csi-cinder-sc-retain  cinder.csi.openstack.org   Retain          Immediate              true
```

- **default (default)** ist die Standard StorageClass und wird verwendet, wenn im PersistentVolumeClaim keine explizite StorageClass angegeben ist.

## Provisioner

Jede StorageClass verwendet einen Provisioner, der bestimmt, welches Volume-Plugin zur Erstellung von PersistentVolumes verwendet wird. In diesem Fall wird der "cinder.csi.openstack.org"-Provisioner verwendet.

Bitte beachten Sie, dass der "cinder.csi.openstack.org"-Provisioner nur den "ReadWriteOnce"-Zugriffsmodus unterstützt, was bedeutet, dass das PersistentVolume jeweils nur von einem Knoten im Lese-/Schreibmodus gemountet werden kann.

## Reclaim Policy

PersistentVolumes, die dynamisch von einer StorageClass erstellt werden, verwenden die in der StorageClass angegebene reclaimPolicy, die "Delete" oder "Retain" sein kann. Mit der reclaimPolicy "Delete" wird das zugehörige PersistentVolume automatisch gelöscht, wenn der PersistentVolumeClaim gelöscht wird. Bei der reclaimPolicy "Retain" bleibt das PersistentVolume auch nach dem Löschen des PersistentVolumeClaims erhalten.

## Volume Binding Mode

Der VolumeBindingMode bestimmt, wann ein PersistentVolume erstellt und mit einem passenden PersistentVolumeClaim verknüpft wird, falls vorhanden. In diesem Fall wird das PersistentVolume sofort erstellt (Immediate) und mit einem entsprechenden PersistentVolumeClaim verknüpft. Es handelt sich um eine Eins-zu-Eins-Zuordnung von PersistentVolumeClaims zu PersistentVolumes.

## Allow Volume Expansion

PersistentVolumes können nach Bedarf in ihrer Größe verändert werden. Benutzer können die Größe des zugehörigen PersistentVolumes durch Ändern des PersistentVolumeClaims erhöhen. Beachten Sie, dass diese Funktion nur die Volumenerweiterung und nicht die Volumenverkleinerung unterstützt.

## StorageClass mit ReclaimPolicy Delete

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

## StorageClass mit ReclaimPolicy Retain

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
