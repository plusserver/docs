---
title: "Permanent Kubeconfig"
linkTitle: "Permanent Kubeconfig"
weight: 20
date: 2024-01-18
description: ->
   Create a kubeconfig with unlimited lifetime
---

# General
By default you can only download kubeconfigs with a maximum lifetime of 24h from the gardener Dashboard. With this guide you'll be able to create your own permanent kubeconfig for your cluster.

## Step 1: Create a service account
The service account name will be the user name in Kubeconfig. Here we are creating the service account in the kube-system as I am creating a clusterRole. If you want to create a config to give namespace level limited access, create the service account in the required namespace.

`kubectl -n kube-system create serviceaccount perm-cluster-admin`

## Step 2: Create a secret for the service account
From Kubernetes Version 1.24, the secret for the service account has to be created separately with an annotation kubernetes.io/service-account.name and type kubernetes.io/service-account-token
Hence we will create a yaml with a secret named perm-cluster-admin-secret with the according annotation and type.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: perm-cluster-admin-secret
  namespace: kube-system
  annotations:
    kubernetes.io/service-account.name: devops-cluster-admin
type: kubernetes.io/service-account-token
```

And apply the created yaml with

`kubectl apply -f perm-cluster-admin-secret.yaml`

## Step 3: Create a cluster role
Now continue with creating a clusterRole with limited privileges to cluster objects. You can add the required object access as per your requirements. Refer to the service account and clusterRole documentation for more information.
If you want to create a namespace-scoped role, you can use namespaced roles instead of clusterroles.
Create the following yaml to create the clusterRole:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: perm-cluster-admin
rules:
- apiGroups: [""]
  resources:
  - nodes
  - nodes/proxy
  - services
  - endpoints
  - pods
  verbs: ["get", "list", "watch"]
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs: ["get", "list", "watch"]
```

`kubectl apply -f perm-cluster-admin.yaml`


## Step 4: Create cluster role binding
The following YAML is a ClusterRoleBinding that binds the perm-cluster-admin service account with the perm-cluster-admin clusterRole.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: perm-cluster-role-binding-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: dperm-cluster-admin
subjects:
- kind: ServiceAccount
  name: perm-cluster-admin
  namespace: kube-system
```

Apply with:

`kubectl apply -f perm-cluster-role-binding-admin.yaml`

## Step 5: Get all Cluster Details & Secrets

We will retrieve all the required kubeconfig details and save them in variables. Then, finally, we will substitute it directly with the Kubeconfig YAML.
If you have used a different names for the ressources, replace them accordingly.

```bash
SA_SECRET_TOKEN= kubectl -n kube-system get secret/devops-cluster-admin-secret -o=go-template='{{.data.token}}' | base64 --decode
CLUSTER_NAME= kubectl config current-context
CURRENT_CLUSTER= kubectl config view --raw -o=go-template='{{range .contexts}}{{if eq .name "'''${CLUSTER_NAME}'''"}}{{ index .context "cluster" }}{{end}}{{end}}'
CLUSTER_CA_CERT= kubectl config view --raw -o=go-template='{{range .clusters}}{{if eq .name "'''${CURRENT_CLUSTER}'''"}}"{{with index .cluster "certificate-authority-data" }}{{.}}{{end}}"{{ end }}{{ end }}'
CLUSTER_ENDPOINT= kubectl config view --raw -o=go-template='{{range .clusters}}{{if eq .name "'''${CURRENT_CLUSTER}'''"}}{{ .cluster.server }}{{end}}{{ end }}'
```

## Step 6: Generate the kubeconfig with the variables

Now fill in the variables of the kubeconfig.yaml accordingly:

```yaml
apiVersion: v1
kind: Config
current-context: ${CLUSTER_NAME}
contexts:
- name: ${CLUSTER_NAME}
  context:
    cluster: ${CLUSTER_NAME}
    user: perm-cluster-admin
clusters:
- name: ${CLUSTER_NAME}
  cluster:
    certificate-authority-data: ${CLUSTER_CA_CERT}
    server: ${CLUSTER_ENDPOINT}
users:
- name: perm-cluster-admin
  user:
    token: ${SA_SECRET_TOKEN}
```

## Step 7: Validate the generated Kubeconfig

To validate the Kubeconfig, execute it with the kubectl command to see if the cluster is getting authenticated.

`kubectl get pods --kubeconfig=kubeconfig.yaml`