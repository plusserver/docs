---
title: "Server-Gruppen"
type: "docs"
weight: 60
date: 2024-02-09
description: >
  Verwendung von Server-Gruppen zur Anwendung von (Anti-)Affinität
---

### Überblick

Servergruppen bieten einen Mechanismus zur Angabe der Lokalität von Servern im Verhältnis zu anderen Servern. Sie ermöglichen es Ihnen, anzugeben, ob Server auf demselben Host (Affinität) oder auf verschiedenen Hosts (Anti-Affinität) laufen sollen. Affinität ist von Vorteil, wenn Sie die Netzwerklatenz minimieren möchten, während Anti-Affinität die Fehlertoleranz und Lastverteilung verbessern kann.

### Verfügbare Richtlinien

* affinity

  Schränkt Instanzen, die zur Servergruppe gehören, auf denselben Host ein und schlägt fehl, wenn die Instanz nicht auf diesem Host platziert werden kann.
  {{% alert title="Einschränkungen bei Wartungsarbeiten" color="warning" %}}
  Bitte beachten Sie, dass wir jeden Hypervisor (Host, auf dem Ihre VM läuft) einmal im Monat neu starten, um Updates zu installieren. Da wir nicht garantieren können, dass die gesamte Affinity-Gruppe auf einen anderen Hypervisor migriert werden kann, verbleiben alle VMs innerhalb der Gruppe auf dem Hypervisor, der gerade aktualisiert wird. Folglich werden alle VMs in dieser Gruppe für die Dauer des Neustarts ausgeschaltet. Weitere Informationen zu unseren regelmäßigen Wartungsarbeiten finden Sie [hier](../../../Einführung/Umgebungen/#Wartung).
  {{% /alert %}}

* anti-affinity
  
  Schränkt Instanzen, die zu einer Servergruppe gehören, auf verschiedene Hosts ein.

* soft-affinity
  
  Versucht, Instanzen, die zur Servergruppe gehören, auf denselben Host zu beschränken. Wenn es nicht möglich ist, alle Instanzen auf einem Host einzuplanen, werden sie zusammen auf so wenigen Hosts wie möglich eingeplant.

* soft-anti-affinity

  Versucht, die zur Servergruppe gehörenden Instanzen auf getrennte Hosts zu beschränken. Wenn es nicht möglich ist, alle Instanzen auf separaten Hosts einzuplanen, werden sie auf so vielen separaten Hosts wie möglich eingeplant.

### Einschränkungen

* Server Gruppen können der VM nur beim erstellen des Servers zugeordnet werden.
* VMs können nur einzeln von Server Gruppen entfernt werden wenn man die VM *löscht*.

### Anwendungsfälle

* Bei der Verwendung von [Local SSD Storage](../../local-storage/) wird dringend empfohlen, Servergruppen mit einer **Affinitätsrichtlinie** zu verwenden, um Fehlertoleranz gegenüber einem Hypervisor-Ausfall oder Hypervisor-Wartungsarbeiten zu erreichen.

<img src="2023-03-31_13-54.png" alt="Bildschirmfoto des Server-Gruppenmenüs" width="50%" height="50%" title="Server-Gruppenmenü">
<br/><br/>
