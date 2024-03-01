---
title: "Permanente Kubeconfig"
linkTitle: "Permanente Kubeconfig"
type: "docs"
weight: 20
date: 2024-01-18
description: ->
   Create a kubeconfig with unlimited lifetime
---

# Allgemein
Standardmäßig können Sie nur kubeconfigs mit einer maximalen Lebensdauer von 24h aus dem gardener Dashboard herunterladen. Mit dieser Anleitung werden Sie in der Lage sein, Ihre eigene permanente kubeconfig für Ihren Cluster zu erstellen.

## Schritt 1: Erstellen eines Servicekontos
Der Name des Dienstkontos wird der Benutzername in Kubeconfig sein. Hier erstellen wir das Service-Konto im kube-System, da ich eine clusterRole erstelle. Wenn Sie eine Konfiguration erstellen möchten, um den Zugriff auf Namespace-Ebene einzuschränken, erstellen Sie das Dienstkonto im gewünschten Namespace.

kubectl -n kube-system create serviceaccount perm-cluster-admin`

## Schritt 2: Erstellen Sie ein Geheimnis für das Dienstkonto
Ab Kubernetes Version 1.24 muss das Geheimnis für das Servicekonto separat mit einer Annotation kubernetes.io/service-account.name und dem Typ kubernetes.io/service-account-token erstellt werden.
Wir erstellen also ein yaml mit einem Geheimnis namens perm-cluster-admin-secret mit der entsprechenden Annotation und dem Typ.

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

Und wenden Sie die erstellte yaml mit

`kubectl apply -f perm-cluster-admin-secret.yaml`

## Schritt 3: Erstellen einer Cluster-Rolle
Fahren Sie nun mit der Erstellung einer clusterRole mit eingeschränkten Rechten für Clusterobjekte fort. Sie können den erforderlichen Objektzugriff entsprechend Ihren Anforderungen hinzufügen. Weitere Informationen finden Sie in der Dokumentation zum Dienstkonto und zur clusterRole.
Wenn Sie eine Namespace-scoped Rolle erstellen möchten, können Sie anstelle von clusterroles auch namespaced roles verwenden.
Erstellen Sie die folgende yaml-Datei, um die clusterRole zu erstellen:

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

## Schritt 4: Cluster-Rollenbindung erstellen
Das folgende YAML ist ein ClusterRoleBinding, das den perm-cluster-admin Service-Account mit der perm-cluster-admin clusterRole bindet.

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

Anwenden mit:

`kubectl apply -f perm-cluster-role-binding-admin.yaml`

## Schritt 5: Alle Cluster-Details und Geheimnisse abrufen

Wir werden alle erforderlichen kubeconfig-Details abrufen und sie in Variablen speichern. Anschließend werden wir sie direkt durch die Kubeconfig-YAML ersetzen.
Wenn Sie einen anderen Namen für die Ressourcen verwendet haben, ersetzen Sie diese entsprechend.

```bash
SA_SECRET_TOKEN= kubectl -n kube-system get secret/devops-cluster-admin-secret -o=go-template='{{.data.token}}' | base64 --decode
CLUSTER_NAME= kubectl config current-context
CURRENT_CLUSTER= kubectl config view --raw -o=go-template='{{range .contexts}}{{if eq .name "'''${CLUSTER_NAME}'''"}}{{ index .context "cluster" }}{{end}}{{end}}'
CLUSTER_CA_CERT= kubectl config view --raw -o=go-template='{{range .clusters}}{{if eq .name "'''${CURRENT_CLUSTER}'''"}}"{{with index .cluster "certificate-authority-data" }}{{.}}{{end}}"{{ end }}{{ end }}'
CLUSTER_ENDPOINT= kubectl config view --raw -o=go-template='{{range .clusters}}{{if eq .name "'''${CURRENT_CLUSTER}'''"}}{{ .cluster.server }}{{end}}{{ end }}'
```

## Step 6: Generate the kubeconfig with the variables

Füllen Sie nun die Variablen der kubeconfig.yaml entsprechend aus:

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

## Schritt 7: Validieren der generierten Kubeconfig

Um die Kubeconfig zu validieren, führen Sie sie mit dem Befehl kubectl aus, um zu sehen, ob der Cluster authentifiziert wird.

`kubectl get pods --kubeconfig=kubeconfig.yaml`