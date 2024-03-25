---
title: "Instanzen und Images"
type: "docs"
weight: 50
date: 2023-02-24
description: >
  Instanzen aus Images erstellen, einloggen und gruppieren
---
## Überblick
Wenn Sie mit Images und Instanzen (auch virtuelle Maschinen genannt) in der Horizon Web-GUI arbeiten möchten, wählen Sie "Compute" aus dem Menü.
Die Übersicht zeigt Ihren aktuellen Verbrauch an Cloud-Ressourcen und die aktuellen Limits.
<img src="image2020-10-19_10-42-35.png" alt="screenshot of the compute overview" width="50%" height="50%" title="Compute Overview">

## Instanzen
Das Instanzen-Menü zeigt Details über alle Ihre virtuellen Maschinen und deren aktuellen Status. Von hier aus können Sie Ihre virtuellen Maschinen verwalten und neue Maschinen erstellen. Die Verwaltung Ihrer Instanzen umfasst verschiedene Aspekte, die im Folgenden erläutert werden.

### Menü "Instanz-Aktionen"
Das Menü "Aktionen" zeigt Optionen, die Ihre Instanz nicht verfügbar machen oder Auswirkungen auf die Sicherheit Ihrer Instanz haben können, in roter Farbe an:
<img src="image2020-10-19_10-51-36.png" alt="screenshot of the instances action menu" width="60%" height="60%" title="Instances Action Menu">

#### Floating IPs trennen
Trennen Sie eine Floating IP-Adresse, die derzeit mit Ihrer Instanz verbunden ist, von der Instanz. Je nachdem, wie Sie auf diese Instanz zugreifen, kann sie danach über das Netzwerk nicht mehr erreichbar sein.
#### Schnittstelle anhängen
Fügen Sie eine zusätzliche Netzwerkschnittstelle zu Ihrer Instanz hinzu. Mit dieser Option wird ein Requester geöffnet, in dem Sie das Netzwerk auswählen können, mit dem Sie die Schnittstelle verbinden möchten. Wenn Sie dort keine statische IP-Adresse auswählen, wird die Schnittstelle eine über DHCP beziehen (sofern dies für das Netzwerk aktiviert wurde). Bitte beachten Sie, dass die neue Schnittstelle eventuell zur Netzwerkkonfiguration Ihrer Instanz hinzugefügt werden muss (falls dies nicht automatisch geschieht).
#### Instanz bearbeiten
Hier können Sie den Namen Ihrer Instanz (und ihre Beschreibung) ändern. Außerdem können Sie Sicherheitsgruppen hinzufügen oder entfernen. Wenn Sie verschiedene Sicherheitsgruppen auf verschiedenen Netzwerkschnittstellen Ihrer Instanz haben, wählen Sie "Port-Sicherheitsgruppen bearbeiten", um diese separat zu bearbeiten.
#### Volume anhängen
Volumes, die Sie im Menü "Volumes" erstellt haben, können hier an Ihre Instanz angehängt werden. Beachten Sie, dass dadurch das Volume nur für Ihre Instanz verfügbar wird (z. B. als /dev/sdb in einer Linux-Instanz). Sie müssen ein Dateisystem darauf anlegen, es in /etc/fstab eintragen und es manuell mounten, um es zu benutzen.
#### Volume abhängen
Volumes, die nicht mehr benötigt werden oder die auf eine andere Instanz gemountet werden sollen, können hier von einer Instanz abgehängt werden. Volumes, die von einer Instanz abgehängt werden sollen, sollten zuerst von der Instanz ausgehängt (`umount`) werden und Anwendungen sollten nicht mehr auf sie zugreifen.
#### Metadaten aktualisieren
Hier können Sie die Metadaten für Ihre Instanz verwalten. Auf der linken Seite ist bereits ein Satz von Beispiel-Metadaten aus dem Glance-Metadatenkatalog verfügbar. Wenn Sie einen der Schlüssel verwenden möchten, klicken Sie einfach auf "+", um ihn nach rechts zu verschieben. Sie können Ihre eigenen Metadatenschlüssel über die Option "Benutzerdefiniert" erstellen.
#### Sicherheitsgruppen bearbeiten
Hier können Sie die Sicherheitsgruppen für Ihre Instanz verwalten. Wenn Ihre Instanz mehr als eine Netzwerkschnittstelle hat, werden Änderungen auf alle angewendet. Wenn Sie verschiedene Sicherheitsgruppen für verschiedene Netzwerkschnittstellen verwalten möchten, verwenden Sie bitte "Port-Sicherheitsgruppen bearbeiten" aus dem Menü.
#### Port-Sicherheitsgruppen bearbeiten
Sicherheitsgruppen können hier für verschiedene Netzwerkschnittstellen (Ports) separat konfiguriert werden. Darüber hinaus können Sie Port-Eigenschaften bearbeiten: Mit "Enable Admin State" können Sie Pakete über diesen Port weiterleiten, mit "Binding VNIC Type" den Typ der virtuellen Netzwerkarte für den Port wählen (für virtuelle Maschinen werden Sie in den meisten Fällen "Normal" wählen) und mit "Port Security" können Sie Sicherheitsfunktionen wie "Anti-Spoofing" aktivieren sowie die Verwendung von Sicherheitsgruppen für diesen Port erlauben.
#### Konsole
Öffnet eine virtuelle Konsole mit der Anmeldeaufforderung Ihrer Instanz.
#### Log anzeigen
Hier können Sie die Konsolenprotokollmeldungen Ihrer Instanz überprüfen.
#### Instanz retten
Der Rettungsmodus ist für Notfälle reserviert. Damit wird Ihre Instanz heruntergefahren und eine Rettungsinstanz (mit dem von Ihnen ausgewählten Image) gestartet, die das Root-Volume Ihrer Instanz einbindet, damit Sie Daten davon wiederherstellen oder die Konfiguration reparieren können. Optional können Sie ein Passwort für die Rettungsinstanz festlegen.
#### Instanz anhalten
Wenn Sie Ihre Instanz pausieren, wird sie mit allen Ressourcen "eingefroren". Sie ist dann nicht mehr verfügbar, kann aber sofort wieder aufgenommen werden.
#### Instanz aussetzen
Wenn Sie die Instanz aussetzen, wird sie mit allen Ressourcen heruntergefahren. Wenn Sie sie wieder aufnehmen, wird sie wieder gestartet.
#### Instanz auslagern
Das Auslagern einer Instanz ist ähnlich wie das Suspendieren. Der Speicher wird jedoch nicht gesichert. Sie können "Shelving" für Instanzen verwenden, die Sie am Wochenende nicht brauchen, aber in der nächsten Arbeitswoche wieder benutzen wollen.
#### Instanzgröße ändern
In diesem Dialog können Sie einige "Dimensionen" Ihrer Instanz (wie Arbeitsspeicher, CPUs und Root-Disk-Größe) ändern, indem Sie einen neuen Flavor auswählen. Außerdem können Sie wählen, ob Sie eine unpartitionierte Festplatte wünschen oder ob Sie die Festplatte selbst partitionieren möchten. Die Größenänderung kann einige Zeit in Anspruch nehmen.
#### Instanz sperren
Sie können versehentliche Änderungen und/oder Löschungen Ihrer Instanz verhindern, indem Sie sie "sperren". Für gesperrte Instanzen wird in Horizon ein kleines Schlosssymbol angezeigt. Administratoren der Plattform können Instanzen jedoch wieder entsperren.
#### Soft-Reboot Instanz
Es wird versucht, alle Anwendungen herunterzufahren, bevor die Instanz neu gestartet wird.
#### Harter Neustart der Instanz
Die Instanz wird neu gebootet, ohne den Anwendungen Zeit zum Herunterfahren zu geben.
#### Instanz ausschalten
Die Instanz wird sofort abgeschaltet. Dies kann zu Dateisystemprüfungen oder Datenbankwiederherstellungsvorgängen führen, wenn die Instanz wieder eingeschaltet wird.
#### Instanz wiederherstellen
Mit "Rebuild" können Sie eine Instanz neu erstellen, wobei Sie die Eigenschaften der Instanz ändern (z. B. ein anderes Image verwenden). Die UUID, Volumes und Ports der Instanz bleiben unverändert. Die Anwendung auf Instanzen mit Ceph-Volumes funktioniert allerdings nicht.
#### Instanz löschen
Die Instanz wird gelöscht. Alle verwendeten Ressourcen werden an den Pool zurückgegeben.
