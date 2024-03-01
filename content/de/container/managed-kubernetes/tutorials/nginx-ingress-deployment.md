---
title: "Deployment eines NGINX Ingress Controller"
linkTitle: "Deployment eines NGINX Ingress Controller"
type: "docs"
weight: 20
date: 2023-10-21
---

# Allgemein
Diese Anleitung ist für die Installation eines nginx Ingress Controllers auf Kubernetes gedacht.

## Bereitstellen
### kubeconfig laden
Der erste Schritt besteht darin, die kubeconfig für den jeweiligen Cluster zu laden.

```bash
export KUBECONFIG=$pfad_zur_kubeconfig
```

### nginx Ingress Controller installieren
Nun müssen Sie das Helm-Repository hinzufügen oder es aktualisieren, falls es bereits hinzugefügt wurde.

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx && helm repo update
```

Als nächstes müssen Sie eine Datei "values.yaml" mit den folgenden Schlüssel/Wert-Paaren erstellen:

```yaml
rbac:
  create: true

controller:
  publishService:
    enabled: true
  # Octavia config
  config:
    use-forwarded-headers: "true"
    compute-full-forwarded-for: "true"
    use-proxy-protocol: "true"
  service:
    annotations:
      loadbalancer.openstack.org/proxy-protocol: "true"
      #loadbalancer.openstack.org/keep-floatingip: "true" # Reserve the FloatingIP in OpenStack even after deleting the Helm chart
      #service.beta.kubernetes.io/openstack-internal-load-balancer: "true" # Create a LoadBalancer in OpenStack without FloatingIP
    #loadBalancerIP: <FloatingIP> # Here you can define an already reserved FloatingIP. When "openstack-internal-load-balancer" is true, this will define the private IPv4 address of the OpenStack LoadBalancer.
```

### Load Balancer mit privater IP-Adresse
Sie können jede verfügbare IP-Adresse aus dem Knoten (1) Netzwerk 10.250.0.0/16 des jeweiligen PSKE-Clusters verwenden.

Installieren Sie nun den nginx Ingress Controller mit Helm und den Schlüssel/Wert-Paaren aus der `values.yaml`:

```bash
helm install ingress-nginx ingress-nginx/ingress-nginx \
-f values.yaml \
--version 3.34.0 \
--create-namespace \
--namespace ingress-nginx
```

Jetzt können Sie IP-Whitelisting in einer Ingress-Ressource durchführen. Dazu fügen Sie der Ingress-Ressource die folgende Anmerkung hinzu:

```yaml
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx
  annotations:
    nginx.ingress.kubernetes.io/whitelist-source-range: "217.235.33.56/32,79.207.189.32/32"
```

### Reservierte FloatingIP freigeben
Der beste Weg, eine reservierte FloatingIP freizugeben, ist, "loadbalancer.openstack.org/keep-floatingip" im Helm-Diagramm auf "false" zu setzen.

```bash
helm upgrade ingress-nginx ingress-nginx/ingress-nginx \
--reuse-values \
--version 3.34.0 \
--namespace ingress-nginx \
--set controller.service.annotations.'loadbalancer\.openstack\.org/keep-floatingip'=false
```

Danach können Sie die Helmkarte löschen:

```bash
helm uninstall ingress-nginx \
--namespace ingress-nginx
```