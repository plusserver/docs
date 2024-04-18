---
title: "Konfiguration eines Vertical Pod Autoscalers (VPA)"
linkTitle: "Konfiguration eines Vertical Pod Autoscalers (VPA)"
type: "docs"
weight: 20
date: 2023-02-21
---

Das folgende Beispiel demonstriert die Bereitstellung einer Anwendung auf der Grundlage eines öffentlich verfügbaren Abbilds. Dieses Beispiel veranschaulicht, wie der VPA auf Änderungen des Anwendungsstatus reagiert.

## 1. Bereitstellung eines Clusters
Zunächst sollten Sie einen Kubernetes-Cluster bereitstellen.

## 2. Installieren der VPA
Anders als die HPA muss die VPA separat installiert werden. Dies kann mit Hilfe des Repositorys https://github.com/kubernetes/autoscaler durchgeführt werden.

### Klonen des Repositorys

```bash
$ git clone https://github.com/kubernetes/autoscaler.git
```

### Zum richtigen Verzeichnis wechseln

```bash
$ cd autoscaler/vertical-pod-autoscaler/
```

### Installation des VPA

```bash
$ ./hack/vpa-up.sh
```

### Überprüfen der Installation

```bash
$ kubectl get pods -n kube-system
NAME                                        READY   STATUS    RESTARTS   AGE
...
metrics-server-7b236j497-bnw9s              1/1     Running   0          67d
vpa-admission-controller-3ns8d8777d-pps3w   1/1     Running   0          12s
vpa-recommender-6fcsnm26j5-s7lw0            1/1     Running   0          23s
vpa-updater-7sm51h55c-a9smw                 1/1     Running   0          23s
...
```

## 3) Einsetzen der Anwendung

## Ausrollen der Bereitstellung

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vpa-demo-deployment
spec:
  selector:
    matchLabels:
      run: vpa-demo-deployment
  replicas: 1
  template:
    metadata:
      labels:
        run: vpa-demo-deployment
    spec:
      containers:
      - name: vpa-demo-deployment
        image: k8s.gcr.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
          requests:
            cpu: 200m
```
```bash
$ kubectl apply -f deployment.yaml
deployment.apps/vpa-demo-deployment created

$ kubectl -n default get pods
NAME                                  READY   STATUS    RESTARTS   AGE
vpa-demo-deployment-85bff8877-9z9p9   1/1     Running   0          3s

$ kubectl -n default get deployment
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
vpa-demo-deployment   1/1     1            1           6s
```

### Erstellen eines Dienstes

```yaml
apiVersion: v1
kind: Service
metadata:
  name: vpa-demo-deployment
  labels:
    run: vpa-demo-deployment
spec:
  ports:
  - port: 80
  selector:
    run: vpa-demo-deployment
```

```bash
$ kubectl apply -f service.yaml
service/vpa-demo-deployment created
$ kubectl -n default get services # Can also be abbreviated as 'svc'
NAME                  TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
vpa-demo-deployment   ClusterIP   10.122.166.51   <none>        80/TCP    5s
kubernetes            ClusterIP   10.112.0.1      <none>        443/TCP   13d
```

### Konfiguration des VPA

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-deployment-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: vpa-demo-deployment
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
        controlledResources:
          - cpu
          - memory
        maxAllowed:
          cpu: 1
          memory: 500Mi
        minAllowed:
          cpu: 100m
          memory: 50Mi
  updatePolicy:
    updateMode: "Auto"
```

```bash
$ kubectl apply -f vpa.yaml
verticalpodautoscaler.autoscaling.k8s.io/my-deployment-vpa created
```

## 3) Prüfung

Status vor der Prüfung:

```bash
$ kubectl -n default get pods
NAME                                  READY   STATUS    RESTARTS   AGE
vpa-demo-deployment-85bff8877-9z9p9   1/1     Running   0          20m
```

```bash
$ kubectl -n default get verticalpodautoscaler # Can also be abbreviated as 'hpa'
NAME                  REFERENCE                        TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
vpa-demo-deployment   Deployment/vpa-demo-deployment   0%/50%    1         10        1          20m
```

### Last generieren

Der folgende Befehl simuliert die Last:

```bash
kubectl run -i --tty load-simulation --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://vpa-demo-deployment; done"
```

### Verhalten beim Laden

Das Verhalten während des Ladevorgangs ist anwendungsspezifisch und kann variieren.

## 4) Entfernen der Last

Um den Lastsimulator zu entfernen, verwenden Sie den folgenden Befehl:

```bash
$ kubectl delete pod load-simulation
pod "load-simulation" deleted
```

{{< alert title="Wichtig!" >}}
Die Standard-Ramp-Down-Zeit beträgt 5 Minuten. Das bedeutet, dass eine Verringerung der Last erst nach ca. 5 Minuten (+- 15 Sekunden) zu einer Verringerung der Replikate führt, was vom VPA bestätigt wird.
{{< /alert >}}

Danach werden die Replikate entfernt, da keine Last mehr vorhanden ist.

## 5) Aufräumen

Mit den folgenden Befehlen werden der Dienst, die Bereitstellung und der VPA entfernt:

```bash
$ kubectl delete -f vpa.yaml
horizontalpodautoscaler.autoscaling "vpa-demo-deployment" deleted
 
$ kubectl delete -f deployment.yaml
deployment.apps "vpa-demo-deployment" deleted
 
$ kubectl delete -f service.yaml
service "vpa-demo-deployment" deleted
```