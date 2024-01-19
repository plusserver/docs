---
title: "Persistent Volume Encryption"
linkTitle: "Persistent Volume Encryption"
weight: 20
date: 2023-10-22
---

# PersistentVolume Encryption

When creating PersistentVolumes (PV) or PersistentVolumeClaims (PVC), you can specify the StorageClass "encrypted" to have the volume created on OpenStack with LUKS encryption.

The following example manifest creates a Pod with a volumeMount and an associated PVC that uses the StorageClass:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-encrypted
spec:
  volumes:
    - name: encrypted
      persistentVolumeClaim:
        claimName: encrypted
  containers:
    - name: pod-encrypted
      image: nginx
      volumeMounts:
        - mountPath: "/encrypted"
          name: encrypted
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: encrypted
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 1Gi
  storageClassName: encrypted
```

In this example, the "encrypted" StorageClass ensures that the volume created on OpenStack is encrypted with LUKS.
