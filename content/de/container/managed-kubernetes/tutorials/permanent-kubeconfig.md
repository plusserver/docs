---
title: "Permanente Kubeconfig"
linkTitle: "Permanente Kubeconfig"
type: "docs"
weight: 20
date: 2024-05-30
---

# Allgemein
Standardmäßig können Sie nur kubeconfigs mit einer maximalen Lebensdauer von 24h aus dem gardener Dashboard herunterladen. Mit dieser Anleitung werden Sie in der Lage sein, Ihre eigene permanente kubeconfig für Ihren Cluster zu erstellen.

## Schritt 1: Erstellen eines Servicekontos
Der Name des Dienstkontos wird der Benutzername in Kubeconfig sein. Hier erstellen wir das Servicekonto im kube-system-Namespace, um eine clusterRole zu definieren. Wenn Sie eine Konfiguration erstellen möchten, um den Zugriff auf Namespace-Ebene einzuschränken, erstellen Sie das Dienstkonto im gewünschten Namespace.

`kubectl -n kube-system create serviceaccount perm-cluster-admin`

## Schritt 2: Cluster-Rollenbindung erstellen
Das folgende YAML ist ein ClusterRoleBinding, das den perm-cluster-admin Service-Account mit der perm-cluster-admin clusterRole bindet.

`k create clusterrolebinding perm-cluster-admin-binding --clusterrole=cluster-admin --serviceaccount=kube-system:perm-cluster-admin -n kube-system`

## Schritt 3: Erstellen Sie ein Geheimnis für das Dienstkonto
Ab Kubernetes Version 1.24 muss das Geheimnis für das Servicekonto separat mit einer Annotation kubernetes.io/service-account.name und dem Typ kubernetes.io/service-account-token erstellt werden.
Wir erstellen also ein yaml mit einem Geheimnis namens perm-cluster-admin-secret mit der entsprechenden Annotation und dem Typ.

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

Und wenden Sie die erstellte yaml mit `kubectl apply -f secret.yaml` an.

## Schritt 4: Alle Cluster-Details und Geheimnisse abrufen

Wir werden alle erforderlichen kubeconfig-Details abrufen und sie in Variablen speichern. Anschließend werden wir sie direkt durch die Kubeconfig-YAML ersetzen.
Wenn Sie einen anderen Namen für die Ressourcen verwendet haben, ersetzen Sie diese entsprechend.

```bash
ca=$(kubectl -n kube-system get secret/perm-cluster-admin-token -o jsonpath='{.data.ca\.crt}')
token=$(kubectl -n kube-system get secret/perm-cluster-admin-token -o jsonpath='{.data.token}' | base64 --decode)
server=`cat $KUBECONFIG | yq '.clusters[0].cluster.server'`
```

## Step 5: Generieren der Kubeconfig mit den Variablen

Füllen Sie nun die Variablen der kubeconfig.yaml entsprechend aus:

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

## Schritt 6: Validieren der generierten Kubeconfig

Um die Kubeconfig zu validieren, führen Sie sie mit dem Befehl kubectl aus, um zu sehen, ob der Cluster authentifiziert wird.

`kubectl get pods --kubeconfig=kubeconfig.yaml`