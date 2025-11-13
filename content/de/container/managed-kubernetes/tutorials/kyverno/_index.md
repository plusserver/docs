---
title: "Kyverno im PSKE-Cluster mit hibernation verwenden"
linkTitle: "Kyverno im PSKE-Cluster mit hibernation verwenden"
type: "docs"
weight: 20
date: 2023-02-21
---


Wenn ein Gardener Cluster hibernated wird, werden alle Komponenten der Controlplane (API-Server, Controller-Manager usw.) und Workernodes heruntergefahren. Beim Aufwachen wird die Controlplane reaktiviert und die Nodes werden neu erstellt. Kubernetes versucht dann, die Workloads (Pods, Controller usw.) auf der Grundlage der in etcd gespeicherten Ressourcen wiederherzustellen.

Kyverno ist eine Policy Engine, die Ressourcen mutiert, validiert und generiert und Webhooks einführt, die alle Pod- (und anderen Ressourcen) Operationen abfangen. Wenn diese Webhooks beim Aufwachen des Clusters nicht verfügbar oder falsch konfiguriert sind, können API-Anfragen zum Erstellen/Löschen von Pods hängen bleiben oder fehlschlagen.


## Kyverno-Webhooks blockieren API-Anfragen
Kyverno installiert ValidatingWebhookConfiguration und MutatingWebhookConfiguration Ressourcen.
Wenn Kyverno Pods nach dem Aufwachen noch im Status „Pending“ oder „CrashLooping“ sind, versucht der API-Server dennoch, diese Webhooks für jede Ressourcenerstellung oder Löschung aufzurufen.
Da Kyverno nicht reagiert, bleiben diese Vorgänge jedoch hängen oder schlagen mit Zeitüberschreitungen fehl, wodurch die Controlplane effektiv blockiert wird.

So überprüfen Sie, ob dies die Ursache ist:

```
kubectl get validatingwebhookconfigurations
kubectl get pods -n kyverno
```

Wenn Pods im Kyverno-Namespace den Status „Pending“ oder „CrashLooping“ haben und Sie sehen, dass das Erstellen von Pods in anderen Namespaces hängen bleibt, ist das Ihr eindeutiger Beweis.


## Namespace / Pod Scheduling Abhängigkeiten
Nach dem Ruhezustand sind einige Nodes oder Namespaces möglicherweise noch nicht vorhanden.
Wenn Kyverno mit Nnodeselectors, Taints oder Affinityrules ausgeführt wird, kann es beim Aufwachen des Clusters zu Fehlern beim scheduling kommen.
Ohne bereitstehende Kyverno Pods schlagen alle Webhooks fehl und es können keine Pods gestartet werden.


## Webhook Konfiguration mit Fail-Open
Standardmäßig sind die Webhooks von Kyverno auf „fail-closed“ eingestellt (d. h., wenn Kyverno nicht antworten kann, wird die Anfrage abgelehnt).
In Hibernation-Szenarien führt dies zu einem Bootstrap Deadlock, und kein Kyverno Pod kann gestartet werden, da Kyverno selbst die Erstellung von Pods blockiert.

## Gardener Reconciliation und Kyverno Generate Policies
Wenn Sie Kyverno dazu verwenden, Richtlinien zu generieren, die automatisch ConfigMaps, Roles oder andere Ressourcen erstellen, können diese beim Aufwachen aus dem Ruhezustand aufgrund fehlender Abhängigkeiten fehlschlagen, was die Wiederherstellung weiter verzögert.



# So beheben oder umgehen Sie das Problem
## Kyverno-Webhooks auf „Fail-Open“ setzen

Dies ist die direkteste Lösung.
Bearbeiten Sie Ihre Kyverno-Webhook-Konfigurationen wie folgt:

```
kubectl patch validatingwebhookconfiguration kyverno-policy-validating-webhook-cfg \
  --type='json' -p='[{"op":"replace","path":"/webhooks/0/failurePolicy","value":"Ignore"}]'

kubectl patch mutatingwebhookconfiguration kyverno-policy-mutating-webhook-cfg \
  --type='json' -p='[{"op":"replace","path":"/webhooks/0/failurePolicy","value":"Ignore"}]'
```

Dadurch wird der API-Server angewiesen, auch dann fortzufahren, wenn Kyverno nicht verfügbar ist, sodass sich der Cluster wiederherstellen kann.


