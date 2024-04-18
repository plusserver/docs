---
title: "Installation des Horizontal Pod Autoscaler (HPA)"
linkTitle: "Installation des Horizontal Pod Autoscaler (HPA)"
type: "docs"
weight: 20
date: 2023-02-21
---

Im Folgenden werden die Schritte zur Bereitstellung eines Kubernetes-Clusters und zur Einrichtung der horizontalen Pod-Autoskalierung (HPA) mit einigen Test- und Bereinigungsschritten beschrieben:

## 1. Bereitstellen eines Clusters

Zuerst wird ein Kubernetes-Cluster bereitgestellt.

## 2. Stellen Sie die Anwendung bereit

**deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hpa-demo-deployment
spec:
  selector:
    matchLabels:
      run: hpa-demo-deployment
  replicas: 1
  template:
    metadata:
      labels:
        run: hpa-demo-deployment
    spec:
      containers:
      - name: hpa-demo-deployment
        image: k8s.gcr.io/hpa-example
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
          requests:
            cpu: 200m
```

Verwenden Sie `kubectl apply -f deployment.yaml`, um die Bereitstellung zu erstellen.

## 3. Erstellen Sie einen Dienst:

**service.yaml**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hpa-demo-deployment
  labels:
    run: hpa-demo-deployment
spec:
  ports:
  - port: 80
  selector:
    run: hpa-demo-deployment
```

Verwenden Sie "kubectl apply -f service.yaml", um den Dienst zu erstellen.

## 4. Konfigurieren Sie HPA

**hpa.yaml**
```yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-demo-deployment
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-demo-deployment
  minReplicas: 1
  maxReplicas: 10
  targetCPUUtilizationPercentage: 50
```

Verwenden Sie `kubectl apply -f hpa.yaml`, um den Horizontal Pod Autoscaler zu erstellen.

## 5. Testen
   Sie können den HPA testen, indem Sie die Last mit verschiedenen Methoden simulieren. Das mitgelieferte Beispiel verwendet `kubectl run`, um die Last zu simulieren:

```bash
kubectl run -i --tty load-simulation --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://hpa-demo-deployment; done"
```

## 6. Überwachung
   Überwachen Sie die HPA mit `kubectl` und anderen Überwachungswerkzeugen, um zu beobachten, wie sie auf Änderungen der Last reagiert.

```bash
# after 30 seconds
$ kubectl -n default get pods && kubectl -n default get horizontalpodautoscaler
NAME                                  READY   STATUS   RESTARTS   AGE
hpa-demo-deployment-85bff8877-5b49k   1/1     Running  0          28s
hpa-demo-deployment-85bff8877-98qdq   1/1     Running  0          58s
hpa-demo-deployment-85bff8877-9z9p9   1/1     Running  0          2m51s
hpa-demo-deployment-85bff8877-sfdjh   1/1     Running  0          58s
hpa-demo-deployment-85bff8877-vtn48   1/1     Running  0          58s
load-simulation                       1/1     Running  0          2m24s
 
NAME                  REFERENCE                        TARGETS    MINPODS   MAXPODS    REPLICAS   AGE
hpa-demo-deployment   Deployment/hpa-demo-deployment   241%/50%   1         10         4          24m
 
# after 3 Minutes
 
$ kubectl -n default get pods && kubectl -n default get horizontalpodautoscaler
NAME                                  READY   STATUS   RESTARTS   AGE
hpa-demo-deployment-85bff8877-5b49k   1/1     Running  0          3m29s
hpa-demo-deployment-85bff8877-98qdq   1/1     Running  0          3m59s
hpa-demo-deployment-85bff8877-9z9p9   1/1     Running  0          6m42s
hpa-demo-deployment-85bff8877-gmvr2   1/1     Running  0          58s
hpa-demo-deployment-85bff8877-sfdjh   1/1     Running  0          3m59s
hpa-demo-deployment-85bff8877-vtn48   1/1     Running  0          3m59s
load-simulation                       1/1     Running  0          5m25s
 
NAME                  REFERENCE                        TARGETS    MINPODS   MAXPODS    REPLICAS   AGE
hpa-demo-deployment   Deployment/hpa-demo-deployment   56%/50%    1         10         6          27m
 
# after 5 Minutes
 
$ kubectl -n default get pods && kubectl -n default get horizontalpodautoscaler
NAME                                  READY   STATUS   RESTARTS   AGE
hpa-demo-deployment-85bff8877-5b49k   1/1     Running  0          5m48s
hpa-demo-deployment-85bff8877-98qdq   1/1     Running  0          6m18s
hpa-demo-deployment-85bff8877-9z9p9   1/1     Running  0          8m12s
hpa-demo-deployment-85bff8877-gmvr2   1/1     Running  0          3m17s
hpa-demo-deployment-85bff8877-sfdjh   1/1     Running. 0          6m18s
hpa-demo-deployment-85bff8877-vtn48   1/1     Running  0          6m18s
load-simulation                       1/1     Running  0          7m44s
NAME                  REFERENCE                        TARGETS   MINPODS   MAXPODS    REPLICAS   AGE
hpa-demo-deployment   Deployment/hpa-demo-deployment   47%/50%   1         10         6          30m
```

## 7. Last entfernen
   Um den Lastsimulator zu entfernen, können Sie den entsprechenden Pod löschen:

```bash
kubectl delete pod load-simulation
```

## 8. Aufräumen
   Zum Schluss bereinigen Sie die Ressourcen, indem Sie den Horizontal Pod Autoscaler, das Deployment und den Service löschen:

```bash
kubectl löschen -f hpa.yaml
kubectl löschen -f deployment.yaml
kubectl löschen -f service.yaml
```

Diese Schritte sind ein Beispiel dafür, wie man HPA in einem Kubernetes-Cluster einrichtet und testet und anschließend die Ressourcen bereinigt.