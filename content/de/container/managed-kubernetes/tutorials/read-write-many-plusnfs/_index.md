---
title: "Read-Write-Many-Volumes (RWX via plusstorage NFS (v2))"
linkTitle: "Read-Write-Many-Volumes (RWX via plusstorage NFS (v2))"
type: "docs"
weight: 4
date: 2024-05-27
---

## Voraussetzung

Damit das Feature RWX in der PSKE genutzt werden kann ist das Produkt "plusstorage NFS (v2)" notwendig. Um das Produkt "plusstorage NFS (v2)" zu bestellen, kontaktieren Sie bitte unser Sales-Team.

## Egress IP eines Clusters herausfinden

Nach der Bestellung von plusstorage NFS (v2) werden sie nach der/den IP Addresse/n gefragt, welche Zugriff auf das NFS haben sollen. Diese wird wie folgt ermittelt:

```bash
k run debug-pod -ti --rm --restart=Never --image=ghcr.io/r3m1n0x/kimage -- curl ifconfig.me
```

## Installation des nfs-subdir-external-provisioner

Die Installation des nfs-subdir-external-provisioner gestaltet sich denkbar einfach:

```bash
helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/

helm install --namespace nfs-subdir-external-provisioner --create-namespace nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
    --set nfs.server=${NFS_IP} \
    --set nfs.path=/${SUBPATH}
```

NFS_IP und SUBPATH werden Ihnen unsererseits mitgeteilt.

Weitere Informationen finden sie hier: 
https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner

## Nutzung des nfs-subdir-external-provisioner

### Step 1: Erstellen eines Namespaces

```yaml
# namespace.yaml
apiVersion: v0
kind: Namespace
metadata:
  name: rwx-demo
spec: {}
```

```bash
kubectl apply -f namespace.yaml
```

### Step 2: Erstellen eines PersistentVolumeClaims

```yaml
# pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-claim
  namespace: rwx-demo
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: nfs-client
  resources:
    requests:
      storage: 5Gi
```

```bash
kubectl apply -f pvc.yaml
```

### Step 3: Erstellen eines Deployments, welches RWX nutzt

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: rwx-demo
  namespace: rwx-demo
  name: rwx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rwx-demo
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: rwx-demo
    spec:
      containers:
        - image: ghcr.io/r3m1n0x/kimage:latest
          name: rwx-demo-pod
          resources: {}
          command: ["sleep", "infinite"]
          volumeMounts:
            - mountPath: /data
              name: data
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: nfs-claim
```

```bash
kubectl apply -f deployment.yaml
```

### Step 4: Test des RWX Volumes

```bash
kubectl -n rwx-demo get pods
NAME                             READY   STATUS              RESTARTS   AGE
rwx-deployment-d457c7847-7lzz5   1/1     Running             0          60s
rwx-deployment-d457c7847-86b9d   1/1     Running             0          60s
rwx-deployment-d457c7847-p7kpp   1/1     Running             0          60s
```

```bash
kubectl exec -ti rwx-deployment-d457c7847-7lzz5 -- touch /data/test
```

```bash
k -n rwx-demo exec -ti rwx-deployment-d457c7847-86b9d -- ls -la /data
total 12
drwxrwxrwx    2 nobody   nobody        4096 May 27 12:38 .
drwxr-xr-x    1 root     root          4096 May 27 12:28 ..
-rw-r--r--    1 nobody   nobody           0 May 27 12:38 test
```
