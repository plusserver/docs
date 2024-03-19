---
title: "OpenStack auf der Kommandozeile (CLI)"
type: "docs"
weight: 50
date: 2023-02-24
description: >
  Arbeiten mit dem OpenStackClient auf dem Command Line Interface (CLI)
---
## Openstack Client Beispiele

| Befehl | Wirkung |
| ------- | ------ |
| ``openstack image list`` | zeigt eine Liste der verfügbaren Images |
| ``openstack image show <imagename>`` | zeigt die Details zu einem bestimmten Image an |
| ``openstack image set <imagename>`` | aktualisiert ein Image nach Name oder ID |
| ``openstack image create ISO_IMAGE --file IMAGE.iso --disk-format iso --container-format bare`` | erzeugt ein Image aus einer hochgeladenen ISO-Datei |
| ``openstack volume create --image <image> --size <size> name <somename>`` | erzeugt ein Volume mit einer benutzerdefinierten Größe | 
| ``openstack volume list`` | listet alle Volumes in Ihrem Projekt auf | 
| ``openstack server add volume <server ID> <volume ID> --dev /dev/vdb`` | fügt ein Volume an einen Server (unter Angabe von Server ID und Volume ID) als /dev/vdb an | 
| ``openstack server remove volume <server ID> <volume ID>`` | trennt ein Volume von einem Server (unter Angabe von Server ID und Volume ID) |
| ``openstack volume set <volume ID> --size <size>`` | ändert die Größe eines Volumes durch Setzen einer neuen Größe | 
| ``openstack volume delete <volume ID>`` | löscht ein Volume (beachten Sie, dass ein Volume während des Löschens nicht an einen Server angeschlossen werden kann - trennen Sie es zuerst) |
| ``openstack volume transfer request create <volume ID>`` | erstellt eine Volume-Transfer-Anforderung - die Ausgabe dieses Befehls ist eine Transfer-ID und ein Autorisierungsschlüssel - der Schlüssel sollte an den neuen Besitzer des Volumes geschickt werden (z. B. per E-Mail) | 
| ``openstack volume transfer request accept <Übertragungs-ID> <Autorisierungsschlüssel>`` | um eine Datenträgerübertragung abzuschließen, akzeptiert der neue Besitzer den Datenträger mit diesem Befehl - unter Verwendung des Autorisierungsschlüssels, den er per E-Mail erhalten hat |
| ``openstack volume transfer request delete <Übertragungs-ID>`` | löscht einen anstehenden Datenträger-Transfer |
