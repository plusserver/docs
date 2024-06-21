---
title: "Permanent kubeconfig"
linkTitle: "Permanent kubeconfig"
type: "docs"
weight: 20
date: 2024-05-30
description: >

---

# General
By default you can only download kubeconfigs with a maximum lifetime of 24h from the Gardener Dashboard. With this guide you'll be able to create your own permanent kubeconfig for your cluster.

## Step 1: Create a service account
The service account name will be the user name in kubeconfig. Here we are creating the service account in the kube-system as I am creating a clusterRole. If you want to create a config to give namespace level limited access, create the service account in the required namespace.

`kubectl -n kube-system create serviceaccount perm-cluster-admin`


## Step 2: Create cluster role binding
The following YAML is a ClusterRoleBinding that binds the perm-cluster-admin service account with the perm-cluster-admin clusterRole.

`k create clusterrolebinding perm-cluster-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:perm-cluster-admin -n kube-system`


## Step 3: Create Secret

Create a file named secret.yaml and copy the yaml file below.

```yaml
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
  name: perm-cluster-admin-token
  namespace: kube-system
  annotations:
    kubernetes.io/service-account.name: perm-cluster-admin
```

Apply with: `kubectl apply -f secret.yaml`


## Step 4: Generate the kubeconfig with the variables

Now fill in the variables of the kubeconfig.yaml accordingly:

```bash
ca=$(kubectl -n kube-system get secret/perm-cluster-admin-token -o jsonpath='{.data.ca\.crt}')
token=$(kubectl -n kube-system get secret/perm-cluster-admin-token -o jsonpath='{.data.token}' | base64 --decode)
server=`cat $KUBECONFIG | yq '.clusters[0].cluster.server'`
```

## Step 5: Generate the kubeconfig with the variables

```yaml
apiVersion: v1
kind: Config
clusters:
- name: default-cluster
  cluster:
    certificate-authority-data: ${ca}
    server: ${server}
contexts:
- name: default-context
  context:
    cluster: default-cluster
    namespace: default
    user: default-user
current-context: default-context
users:
- name: default-user
  user:
    token: ${token}
```

## Step 6: Validate the generated kubeconfig

To validate the kubeconfig, execute it with the kubectl command to see if the cluster is getting authenticated.

`kubectl get pods --kubeconfig=kubeconfig.yaml`