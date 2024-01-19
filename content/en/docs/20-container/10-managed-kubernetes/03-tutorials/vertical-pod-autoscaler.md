---
title: "Setting up a Vertical Pod Autoscaler (VPA)"
linkTitle: "Setting up a Vertical Pod Autoscaler (VPA)"
weight: 20
date: 2023-02-21
---

The following example demonstrates the deployment of an application based on a publicly available image. This example illustrates how the VPA responds to changes in the application state.

## 1) Provisioning a Cluster
First, you should provision a Kubernetes cluster.

## 2) Installing the VPA
Unlike the HPA, the VPA needs to be installed separately. This can be done using the repository https://github.com/kubernetes/autoscaler.

### Cloning the Repository

```bash
$ git clone https://github.com/kubernetes/autoscaler.git
```

### Changing to the Right Directory

```bash
$ cd autoscaler/vertical-pod-autoscaler/
```

### Installing the VPA

```bash
$ ./hack/vpa-up.sh
```

### Verifying the Installation

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

## 3) Deploying the Application

### Rolling out the Deployment

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

### Creating a Service

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

### Configuring the VPA

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

## 3) Testing

Status before testing:

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

### Generating Load

The following command simulates load:

```bash
kubectl run -i --tty load-simulation --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://vpa-demo-deployment; done"
```

### Behavior during Load

The behavior during the load is specific to the application and may vary.

## 4) Removing Load

To remove the load simulator, use the following command:

```bash
$ kubectl delete pod load-simulation
pod "load-simulation" deleted
```

{{< alert title="Important!" >}}
IMPORTANT! The default ramp-down time is 5 minutes. This means that reducing the load will not immediately result in a decrease in replicas for approximately 5 minutes (+- 15 seconds) as acknowledged by the VPA.
{{< /alert >}}

Subsequently, the replicas will be removed as there is no longer any load.

## 5) Cleanup

The following commands remove the service, deployment, and VPA:

```bash
$ kubectl delete -f vpa.yaml
horizontalpodautoscaler.autoscaling "vpa-demo-deployment" deleted
 
$ kubectl delete -f deployment.yaml
deployment.apps "vpa-demo-deployment" deleted
 
$ kubectl delete -f service.yaml
service "vpa-demo-deployment" deleted
```