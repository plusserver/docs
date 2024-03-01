---
title: "PSKE - Cluster hibernation"
linkTitle: "Cluster hibernation"
type: "docs"
weight: 20
date: 2023-02-21
---

Die "Hibernation"-Funktion bietet Ihnen die Möglichkeit, einen oder mehrere PSKE-Cluster automatisch oder per Knopfdruck in den "Ruhezustand" zu versetzen, um Kosten für Cloud-Ressourcen zu sparen, die nicht rund um die Uhr benötigt werden.

Beispiel: Test- oder Entwicklungs-PSKE-Cluster, die nur während der regulären Arbeitszeiten betrieben werden.

## Hibernation

Mit der Funktion "Hibernation" werden die folgenden PSKE-Cluster-Komponenten heruntergefahren:

- Workload
- Worker Nodes des PSKE-Clusters
- Control Plane (kube-apiserver, etcd, kube-scheduler, kube-controller-manager, cloud-controller-manager)

Ausgenommen hiervon sind Floating IP-Adressen, Load Balancer und Persistent Volumes, für die weiterhin Gebühren anfallen.

Da die Daten der Control Plane persistent gespeichert werden und wir weiterhin Rechenressourcen für den Cluster reservieren, wird die Stunde des Clusters weiterhin in Rechnung gestellt.

## Wake-Up

Beim "Aufwachen" werden der PSKE-Cluster und seine Komponenten, einschließlich Floating-IP-Adressen, Load Balancers und Persistent Volumes, in ihren vorherigen Zustand zurückversetzt und können wie gewohnt verwendet werden.

## Hibernation-Konfiguration

### (1) Im PSKE Dashboard

### (1.1) Manuell über YAML Cluster Manifest

Wenn Sie Ihren PSKE-Cluster manuell über das YAML-Cluster-Manifest in den Ruhezustand versetzen möchten, können Sie dies unter dem Abschnitt "spec" konfigurieren.

```yaml
spec:
  hibernation:
    enabled: true
    schedules:
      - start: "00 20 * * *"     # Start hibernation every day at 8 PM
        end: "0 6 * * *"         # Stop hibernation every day at 6 AM
        location: "Europe/Berlin"  # Specify a location for the cron to run in
```

Die Start- und Endpunkte folgen der bekannten Cron-Syntax aus der Crontab in der Unix/Linux-Welt.

### (1.2) Manuell per Knopfdruck

Wenn Sie Ihren PSKE-Cluster manuell in den "Ruhezustand" versetzen wollen, können Sie unter Cluster (1) den entsprechenden PSKE-Cluster auswählen und über die drei Punkte (2) die Option "Hibernate Cluster" (3) wählen.

![1](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/1.png)

![2](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/2.png)

### (1.3) Automatisiert über Hibernation-Zeitplan

Wenn Sie Ihren PSKE-Cluster automatisiert in den Ruhezustand versetzen wollen, können Sie den Ruhezustand-Zeitplan verwenden und den Start- und Endpunkt sowie den Wochentag für jeden PSKE-Cluster separat konfigurieren.

#### Neuer PSKE-Cluster

![3](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/3.png)

Sie können eine oder mehrere Hibernation Schedule Tasks konfigurieren. Legen Sie dazu unter (1) einen neuen PSKE-Cluster an und scrollen Sie bis zum Ende der Seite. Konfigurieren Sie unter (2) die Wochentage, Start- und Endpunkte und auch ohne Startpunkt (Wake up at). Sie können auch zusätzliche Hibernation Schedule-Aufgaben erstellen (3) und die Erstellung des PSKE-Clusters mit (4) abschließen.

#### Vorhandener PSKE-Cluster

Wählen Sie den entsprechenden PSKE-Cluster unter (1) aus und klicken Sie auf den Namen (2), um den Abschnitt Hibernation (3) aufzurufen.

![4](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/4.png)

![5](/images/content/02-pske/10-cluster-interaction/cluster-hibernation/5.png)

Über (1) können Sie die Wochentage, Start- und Endzeitpunkte und auch ohne Startzeitpunkt (Wake up at) konfigurieren. Sie können auch zusätzliche Hibernation Schedule-Aufgaben erstellen (2) und die Erstellung von Hibernation Schedule-Aufgaben für den ausgewählten PSKE-Cluster mit (3) speichern.

![6](/images/content/02-pske/10-clusterinteraction/cluster-hibernation/6.png)