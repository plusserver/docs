---
title: "PSKE - Cluster Autoskalierung"
linkTitle: "Cluster Autoskalierung"
type: "docs"
weight: 20
date: 2023-02-21
---

# Cluster Autoscaler (Horizontal Node Autoscaler - HNA)

Der Cluster-Autoscaler, auch bekannt als Horizontal Node Autoscaler (HNA), ist ein Tool, das die Anzahl der Worker Nodes in einem Kubernetes-Cluster unter den folgenden Bedingungen automatisch anpasst:

- Es gibt Pods, die aufgrund unzureichender Ressourcen nicht starten können.
- Es gibt Worker Nodes, die über einen bestimmten Zeitraum (Standard: 30 Minuten) nicht ausgelastet sind, und Pods können auf andere Worker Nodes verteilt werden.

## Voraussetzungen

Um den Horizontal Node Autoscaler in einem Shoot Cluster zu installieren, müssen die Werte "Autoscaler Min." und "Autoscaler Max." in mindestens einer Workergroup definiert sein.

- Autoscaler Min." definiert die minimale Anzahl von Worker Nodes innerhalb der Worker Group.
- Autoscaler Max." definiert die maximale Anzahl von Worker Nodes, die der Horizontal Node Autoscaler im Falle von Ressourcenknappheit innerhalb einer Worker Group bereitstellt.

![HNA](/images/content/02-pske/30-clusterconfiguration/hna.png)

## Simulation

Derzeit verfügt der Shoot-Cluster über einen Arbeitsknoten:

```bash
kubectl describe node shoot--ldtivqit95-worker-jh07p-z1-7d897-cgrw6
Capacity:
  cpu:                2
  ephemeral-storage:  50633164Ki
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             4030532Ki
  pods:               110
Allocatable:
  cpu:                1920m
  ephemeral-storage:  49255941901
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             2879556Ki
  pods:               110
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests      Limits
  --------           --------      ------
  cpu                1047m (54%)   0 (0%)
  memory             1120Mi (39%)  18788Mi (668%)
  ephemeral-storage  0 (0%)        0 (0%)
  hugepages-1Gi      0 (0%)        0 (0%)
  hugepages-2Mi      0 (0%)        0 (0%)
```

Eine NGINX-Bereitstellung wird erstellt:

```yaml
kubectl apply -f deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
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
        image: nginx
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "2048Mi"
          #   cpu: "500m"
          limits:
            memory: "2048Mi"
            # cpu: "500m"
```

Die Ressourcen des vorhandenen Arbeitsknotens reichen nicht aus, wodurch der Cluster-Autoscaler (Horizontal Node Autoscaler) ausgelöst wird:

```bash
k describe pod nginx-54c7fd947f-b2k67
Events:
  Type     Reason            Age   From                Message
  ----     ------            ----  ----                -------
  Warning  FailedScheduling  37s   default-scheduler   0/1 nodes are available: 1 Insufficient memory. preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod.
  Normal   TriggeredScaleUp  26s   cluster-autoscaler  pod triggered scale-up: [{shoot--ldtivqit95-worker-jh07p-z1 1->2 (max: 3)}]
```

Nach dem Löschen des Deployments wird der zusätzliche Worker Node durch den Cluster Autoscaler (Horizontal Node Autoscaler) nach 30 Minuten deprovisioniert.

## Best Practices

- Ändern Sie Knoten, die Teil einer Autoscaling-Gruppe sind, nicht manuell. Alle Knoten in derselben Knotengruppe sollten dieselbe Kapazität und dieselben Bezeichnungen haben.
- Verwenden Sie Anfragen für Container/Pods.
- Verwenden Sie PodDisruptionBudgets, um zu verhindern, dass Pods zu abrupt gelöscht werden (falls erforderlich).
- Vergewissern Sie sich, dass das Kontingent Ihres Cloud-Anbieters ausreicht, bevor Sie die Min-/Max-Werte für den Horizontal Node Autoscaler festlegen.
- Vermeiden Sie die Verwendung zusätzlicher Node Group Autoscaler (auch von Ihrem Cloud-Anbieter).

## Schlussfolgerung

Der Horizontal Node Autoscaler funktioniert wie oben beschrieben. Damit der Cluster-Autoscaler wie vorgesehen funktioniert, ist es wichtig, dass Sie sich an die Best Practices halten. Der HNA ist in PSKE standardmäßig aktiviert und steht Ihnen zur Verfügung.
