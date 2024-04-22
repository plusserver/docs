---
title: "Volume Snapshots"
linkTitle: "Volume Snapshots"
type: "docs"
weight: 20
date: 2024-01-18
---

### Volume-Snapshots

Volume-Snapshots sind eine Möglichkeit, den Inhalt eines Volumes zu einem bestimmten Zeitpunkt zu sichern. Sie werden in Kubernetes durch den VolumeSnapshot-Ressourcentyp dargestellt.

Um einen Snapshot eines Volumes zu erstellen, müssen Sie einen VolumeSnapshot-Ressourcentyp erstellen. In diesem Ressourcentyp müssen Sie den Namen des Volumes angeben, das Sie sichern möchten. Optional können Sie auch einen Namen für den Snapshot angeben.

Hier sehen Sie ein Beispiel für einen VolumeSnapshot-Ressourcentyp:

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: my-volume-snapshot
spec:
  source:
    name: my-volume
```

Sobald Sie einen VolumeSnapshot-Ressourcentyp erstellt haben, wird der Snapshot erstellt. Der Snapshot wird in einem Kubernetes-Verzeichnis namens /var/lib/kubelet/pods/<POD_NAME>/volumes/<VOLUME_NAME>/snapshots/<SNAPSHOT_NAME> gespeichert.

### Volume-Snapshot-Gruppen

Volume Snapshot Groups (VSGs) sind eine Möglichkeit, mehrere Volume Snapshots zu einem einzigen Snapshot zusammenzufassen. VSGs werden in Kubernetes durch den Ressourcentyp VolumeSnapshotGroup dargestellt.

Um eine VSG zu erstellen, müssen Sie einen VolumeSnapshotGroup-Ressourcentyp erstellen. In diesem Ressourcentyp müssen Sie die Namen der Volumes angeben, die Sie in der VSG gruppieren möchten. Optional können Sie auch einen Namen für die VSG angeben.

Im Folgenden finden Sie ein Beispiel für einen VolumeSnapshotGroup-Ressourcentyp:

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotGroup
metadata:
  name: my-volume-snapshot-group
spec:
  snapshotSelector:
    matchLabels:
      app: my-app
  volumeSnapshots:
  - name: my-volume-snapshot-1
  - name: my-volume-snapshot-2
```

Sobald Sie einen VolumeSnapshotGroup-Ressourcentyp erstellt haben, wird die VSG erstellt. Der Snapshot wird in einem Kubernetes-Verzeichnis namens /var/lib/kubelet/pods/<POD_NAME>/volumes/<VOLUME_NAME>/snapshots/<VSG_NAME> gespeichert.

### Lösungen für Volume Snapshots

Es gibt eine Vielzahl von Lösungen für Volume Snapshots in Kubernetes. Eine Möglichkeit ist die Verwendung der nativen Kubernetes-API. Eine andere Möglichkeit ist die Verwendung eines Tools oder Dienstes eines Drittanbieters.

#### Native Kubernetes-API

Die native Kubernetes-API bietet eine einfache Möglichkeit zur Erstellung von Volume Snapshots. Sie ist jedoch nicht so flexibel wie ein Drittanbieter-Tool oder -Dienst.

#### Tools und Dienste von Drittanbietern

Es gibt eine Reihe von Tools und Diensten von Drittanbietern, die Volume Snapshots in Kubernetes unterstützen. Diese Tools und Dienste bieten oft zusätzliche Funktionen und Flexibilität, die die native Kubernetes-API nicht bietet.

Hier sind einige Beispiele für Tools und Dienste von Drittanbietern, die Volume Snapshots in Kubernetes unterstützen:

- Portworx
- Velero
- NetApp Trident
- Rook

#### Beispiele für die Verwendung von Volume Snapshots

Volume Snapshots können für eine Vielzahl von Zwecken verwendet werden, darunter:

- Datensicherung: Volume Snapshots können verwendet werden, um Daten im Falle eines Ausfalls oder einer Katastrophe zu sichern.
- Datenmigration: Volume Snapshots können verwendet werden, um Daten von einem Speichersystem auf ein anderes zu migrieren.
- Datenwiederherstellung: Volume Snapshots können verwendet werden, um Daten wiederherzustellen, falls sie versehentlich gelöscht oder beschädigt wurden.

Hier sind einige Beispiele für die Verwendung von Volume Snapshots:

- Eine Unternehmensanwendung verwendet ein persistentes Volume zum Speichern von Daten. Die Anwendung wird regelmäßig mit einem Snapshot gesichert. Wenn die Anwendung ausfällt, wird der Snapshot verwendet, um die Anwendung wiederherzustellen.
- Ein Cloud-Service-Anbieter bietet einen Dienst an, der für seine Kunden Volume Snapshots erstellt. Die Kunden können Volume Snapshots zur Sicherung und Migration von Daten verwenden.
- Ein Forschungslabor benötigt eine Möglichkeit, große Datenmengen zu speichern. Das Labor nutzt Volume Snapshots, um Daten in der Cloud zu sichern. Die Daten können dann von anderen Forschern in der Cloud abgerufen und verwendet werden.