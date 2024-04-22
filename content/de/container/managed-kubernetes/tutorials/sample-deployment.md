---
title: "Einfaches Beispiel Deployment"
linkTitle: "Einfaches Beispiel Deployment"
type: "docs"
weight: 20
date: 2023-10-21
---

# Deployment

## nginx Ingress Controller
Um die Installation des Ingress Controllers zu vereinfachen, werden wir an dieser Stelle den Paketmanager "HELM" verwenden:

```bash
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

Nach einer kurzen Wartezeit können Sie die öffentliche IP des Ingress-Controllers unter dem erstellten Dienst anzeigen:

```bash
kubectl --namespace ingress-nginx get services ingress-nginx-controller
```

## nginx-Bereitstellung
In diesem Beispiel verwenden wir ein einfaches nginx-Deployment, um eine Beispiel-Webseite bereitzustellen. Zunächst muss ein PersistentVolumeClaim erstellt werden, um sicherzustellen, dass die Daten der Webseite über Pod-Neustarts hinweg bestehen bleiben:

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

Nun können Sie die eigentliche nginx-Bereitstellung erstellen:

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

Anschließend muss die nginx-Bereitstellung innerhalb des Clusters über einen Dienst verfügbar gemacht werden:

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
Um eingehenden Datenverkehr vom Ingress Controller an die neu erstellte Bereitstellung zu leiten, muss eine Ingress-Ressource erstellt werden:

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

## Inhalt
Als letzter Schritt muss eine "index.html"-Datei innerhalb des PersistentVolume erstellt werden, damit die nginx-Bereitstellung keinen "403 - Forbidden"-Fehler anzeigt. Zum Beispiel:

```bash
kubectl exec deployment/nginx-deployment -- /bin/sh -c 'echo "<h1>Powered by PSKE</h1>" > /usr/share/nginx/html/index.html'
```

## Ergebnis
Beim Zugriff auf die öffentliche IP des Ingress Controllers sollte die folgende Webseite angezeigt werden:

```html
<h1>Powered by PSKE</h1>
```