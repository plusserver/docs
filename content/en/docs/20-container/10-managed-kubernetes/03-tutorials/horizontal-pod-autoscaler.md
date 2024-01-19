---
title: "Setting up a Horizontal Pod Autoscaler (HPA)"
linkTitle: "Setting up a Horizontal Pod Autoscaler (HPA)"
weight: 20
date: 2023-02-21
---

Here are the steps involved in provisioning a Kubernetes cluster and setting up Horizontal Pod Autoscaling (HPA) with some testing and cleanup steps:

## 1) Provision a Cluster:
   First, provision a Kubernetes cluster.

## 2) Deploy the Application:

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

Use `kubectl apply -f deployment.yaml` to create the deployment.

## 3) Create a Service:

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

Use `kubectl apply -f service.yaml` to create the service.

## 4) Configure HPA:

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

Use `kubectl apply -f hpa.yaml` to create the Horizontal Pod Autoscaler.

## 5) Testing:
   You can test the HPA by simulating load using various methods. The provided example uses `kubectl run` to simulate load:

```bash
kubectl run -i --tty load-simulation --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://hpa-demo-deployment; done"
```

## 6) Monitoring:
   Monitor the HPA using `kubectl` and other monitoring tools to observe how it reacts to changes in load.

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

## 7) Remove Load:
   To remove the load simulator, you can delete the corresponding pod:

```bash
kubectl delete pod load-simulation
```

## 8) Cleanup:
   Finally, clean up the resources by deleting the Horizontal Pod Autoscaler, deployment, and service:

```bash
kubectl delete -f hpa.yaml
kubectl delete -f deployment.yaml
kubectl delete -f service.yaml
```

These steps provide an example of how to set up and test HPA in a Kubernetes cluster and then clean up the resources when done.