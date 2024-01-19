---
title: "Simple deployment example"
linkTitle: "Simple deployment example"
weight: 20
date: 2023-10-21
---

# Deployment

## NGINX Ingress Controller
To simplify the installation of the Ingress Controller, we will use the package manager "HELM" at this point:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

After a short waiting period, you can view the Public IP of the Ingress Controller under the created service:

```bash
kubectl --namespace ingress-nginx get services ingress-nginx-controller
```

## NGINX Deployment
In this example, we will use a simple NGINX deployment to serve a sample webpage. First, a PersistentVolumeClaim must be created to ensure that the webpage data persists across pod restarts:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nginx-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Now, you can create the actual NGINX deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:stable-alpine
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: nginx-data
      volumes:
      - name: nginx-data
        persistentVolumeClaim:
          claimName: nginx-data
```

Subsequently, the NGINX deployment must be made available within the cluster via a service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

## Ingress
To route incoming traffic from the Ingress Controller to the newly created deployment, an Ingress resource must be created:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```

## Content
As a final step, an `index.html` file must be created within the PersistentVolume so that the NGINX deployment doesn't display a "403 - Forbidden" error. For example:

```bash
kubectl exec deployment/nginx-deployment -- /bin/sh -c 'echo "<h1>Powered by PSKE</h1>" > /usr/share/nginx/html/index.html'
```

## Result
Accessing the Public IP of the Ingress Controller should display the following webpage:

```html
<h1>Powered by PSKE</h1>
```