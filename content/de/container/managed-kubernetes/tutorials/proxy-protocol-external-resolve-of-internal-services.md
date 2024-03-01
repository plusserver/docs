---
title: "Proxy Protocol - Externe Auflösung von internen Services"
linkTitle: "Proxy Protocol - Externe Auflösung von internen Services"
type: "docs"
weight: 4
date: 2024-01-18
---

Bei der Verwendung eines Load Balancers mit dem Proxy-Protokoll in Kubernetes kann es zu Problemen beim gegenseitigen Zugriff auf Anwendungen innerhalb des Clusters kommen.

Wenn Sie einen Load Balancer mit dem Proxy-Protokoll in Ihrem Kubernetes-Cluster verwenden, können Probleme auftreten, wenn Sie versuchen, von einem Pod innerhalb des Clusters auf einen anderen Ingress/Service zuzugreifen. Der Grund dafür ist, dass kube-proxy eine iptables-Regel für die externe IP-Adresse des Load Balancers hinzufügt und den Verkehr um den Load Balancer herum umleitet. Dies führt zu einem Fehler, wenn der Pod, der die Verbindung herstellt, nicht das Proxy-Protokoll spricht und in diesem Fall direkt mit dem Ingress-Controller kommuniziert.

### Lösung

Um dieses Problem zu beheben, müssen Sie dem Load Balancer Service eine zusätzliche Annotation hinzufügen. Diese Anmerkung legt einen Hostnamen für den Load Balancer fest.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-load-balancer
  annotations:
    loadbalancer.openstack.org/hostname: 192.168.1.100.nip.io
spec:
  type: LoadBalancer
```

Erstellen Sie einen A-Eintrag für die IP-Adresse des Load Balancers in Ihrer Domain. Der kube-proxy verwendet diesen A-Eintrag, um den Datenverkehr an den Load Balancer zu senden.

### Ausblick

Dieses Problem wurde im Upstream-Kubernetes-Projekt für v1.20 behoben, aber später rückgängig gemacht. Es gibt einen offenen Punkt, der das Load Balancer-Problem in v1.28 behandelt. Der Verbesserungsvorschlag lautet KEP-1866.

### Erläuterung

Das Proxy-Protokoll ist ein Protokoll, das von Load Balancern und Ingress-Controllern verwendet wird, um die echte Client-IP zu identifizieren. Das Protokoll fügt dem TCP-Header zusätzliche Informationen zur Identifizierung des Clients hinzu.

Der Cert-Manager verwendet das Proxy-Protokoll nicht, sondern möchte eine TLS-Zertifikatsanforderung generieren. Wenn der Datenverkehr direkt an die Dienste gesendet wird, kann der Cert-Manager keine Verbindung zu seinem Endpunkt herstellen und die anfängliche Selbstprüfung durchführen.

### Referenzen

Kubernetes issue with the Proxy Protocol: https://github.com/kubernetes/kubernetes/issues/66607
Proxy Protocol specification: http://www.haproxy.org/download/1.8/doc/proxy-protocol.txt
Pull request to fix the issue in v1.20: https://github.com/kubernetes/kubernetes/pull/92312
Issue with the Load Balancer in v1.28: https://github.com/kubernetes/enhancements/issues/1860
Improvement proposal for KEP-1866:https://github.com/kubernetes/enhancements/tree/master/keps/sig-network/1860-kube-proxy-IP-node-binding