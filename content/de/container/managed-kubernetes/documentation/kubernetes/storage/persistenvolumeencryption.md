---
title: "Persistent Volume Encryption"
linkTitle: "Persistent Volume Encryption"
type: "docs"
weight: 20
date: 2023-10-22
---

# PersistentVolume Encryption

Beim Erstellen von PersistentVolumes (PV) oder PersistentVolumeClaims (PVC) können Sie die StorageClass "encrypted" angeben, damit das Volume auf OpenStack mit LUKS-Verschlüsselung erstellt wird.

Das folgende Beispielmanifest erstellt einen Pod mit einem volumeMount und einem zugehörigen PVC, der die StorageClass verwendet:

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

In diesem Beispiel sorgt die StorageClass "encrypted" dafür, dass das auf OpenStack erstellte Volume mit LUKS verschlüsselt wird.
[Siehe pluscloud open für Details.](../../../../../compute/pluscloudopen/reference/volumes-snap-back/#encrypted-volumes)
