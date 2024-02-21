---
title: "Instanzen erstellen"
type: "docs"
weight: 50
date: 2023-02-24
description: >
  Erstellen von Instanzen mit der Horizon GUI
---
## Instanz starten
Über die Schaltfläche "Launch Instance" können Sie eine oder mehrere neue Instanzen erstellen und starten. Ein geführter Dialog hilft Ihnen dabei, alle notwendigen Schritte zu durchlaufen. Sobald Sie genügend Informationen zum Starten einer Instanz eingegeben haben, wird die Schaltfläche "Instanz erstellen" verfügbar und Sie können Ihre neue(n) Instanz(en) starten. Sternchen (*) markieren erforderliche Informationen.

Beachten Sie, dass der Shell-Zugriff auf die neue Instanz nur über eine ssh-Schlüsselauthentifizierung möglich ist. Daher müssen Sie entweder ein ssh-Schlüsselpaar während der Instanzerstellung erstellen oder Ihr Schlüsselpaar vorher hochladen.
Wenn Sie auf "**Instanz starten**" klicken, öffnet sich ein Dialog, der Sie durch verschiedene Schritte führt, die zum Starten einer Instanz ausgeführt werden müssen:

![Screenshot des Menüs zum Starten der Instanz](./2023-03-30_10-39.png)

Wie üblich markieren Sternchen (*) die erforderlichen Informationen, und sobald Sie genügend Informationen eingegeben haben, wird die Schaltfläche "**Instanz starten**" aktiviert.

Im Feld "**Instanzname**" müssen Sie Ihrer neuen Instanz einen Namen geben. Die Beschreibung ist optional. Es gibt nur eine "**Verfügbarkeitszone**", die Sie auswählen können. Sie können das Feld "**Anzahl**" verwenden, um mehrere Instanzen desselben Typs gleichzeitig zu erzeugen.

"Als nächstes sollten Sie die "**Quelle**" Ihrer Instanz definieren. Im Grunde genommen wählst du aus, auf welchem Bild deine Instanz basieren soll.

<img src="2023-03-30_11-09.png" alt="Bildschirmfoto des Quellmenüs" width="50%" height="50%" title="Quellmenü">

Zunächst wählen Sie aus, ob Ihre neue Instanz von einem Image (unter "**Verfügbar**" sehen Sie eine Liste der verfügbaren Elemente), von einem Instanz-Snapshot, von einem Datenträger oder von einem Volume-Snapshot gebootet werden soll. Wenn Sie einen vorhandenen Datenträger auswählen, können Sie nur eine Instanz von diesem booten. Wenn Sie ein Image oder einen Snapshot wählen, können Sie mehr als eine Instanz davon booten. Sie wählen das gewünschte Element aus, indem Sie auf den kleinen Pfeil nach oben auf der rechten Seite klicken.

Als nächstes legen Sie die "**Volumengröße**" des Root-Volumes Ihrer neuen Instanz fest. Wenn Sie hier keinen Wert festlegen (oder einen zu kleinen), wird die Größe automatisch an die Größe des von Ihnen gewählten Bildes angepasst.

Die Optionen auf der rechten Seite ("**Neues Volume erstellen**" und "**Volume beim Löschen der Instanz löschen**") bestimmen den Lebenszyklus des Root-Volumes Ihrer Instanz. Wenn Sie möchten, dass Ihre Instanz und ihr Root-Volume gelöscht werden, wenn die Instanz gelöscht wird, sollten Sie wählen, kein neues Volume zu erstellen (die Option, das Volume beim Löschen der Instanz zu löschen, wird deaktiviert). Wenn Sie sich entschieden haben, ein Volume zu erstellen, können Sie festlegen, dass das Volume beim Löschen der Instanz gelöscht wird. Wenn Sie diese Option nicht wählen, wird das Root-Volume der Instanz die Löschung der Instanz "überleben" (und Speicherplatz verbrauchen und in Rechnung gestellt werden).

Nun müssen Sie - indem Sie auf "Weiter" klicken - den "**Flavor**" Ihrer neuen Instanz auswählen. "Flavors" bestimmen die "Dimensionen" Ihrer neuen Instanz hinsichtlich der Anzahl der virtuellen CPUs, der Menge des virtuellen Speichers und der Größe der Root-Disk.

<img src="2023-03-31_09-52.png" alt="Bildschirmfoto des Flavor-Menüs" width="50%" height="50%" title="Flavor-Menü">

Wenn Sie auf den kleinen Pfeil auf der linken Seite - vor jeder Geschmacksrichtung - klicken, sehen Sie, welche Auswirkungen die Wahl dieser Geschmacksrichtung auf Ihren Konsum hat. Wenn du auf den Pfeil nach oben" klickst, wählst du die Geschmacksrichtung für die Instanzerstellung aus. Wenn die Wahl eines Flavors mehr Ressourcen verbrauchen würde, als in Ihrem Kontingent verfügbar sind, wird es mit einem gelben "Warn"-Ausrufezeichen markiert.

Pluscloud open ist für die Erstellung und Verwaltung der Flavors zuständig.

Als nächstes müssen Sie die "**Netzwerke**" auswählen, mit denen Ihre neue Instanz verbunden werden soll.

<img src="2023-03-31_10-04.png" alt="screenshot of the networks menu" width="50%" height="50%" title="Networks Menu">

Je nach Ihrer Netzwerktopologie wählen Sie eines oder mehrere Netzwerke aus der Liste unter "**Verfügbar**" aus.

Unter "**Sicherheitsgruppen**" können Sie auswählen, welche Sicherheitsgruppen für Ihre neue Instanz angewendet werden sollen.

<img src="2023-03-31_10-34.png" alt="Bildschirmfoto des Menüs "Sicherheitsgruppen"" width="50%" height="50%" title="Menü "Sicherheitsgruppen">

Die "Standard"-Sicherheitsgruppe würde den grundlegenden Zugriff auf Ihre Instanz ermöglichen. Zusätzliche Sicherheitsgruppen können den Verkehr zu und von bestimmten Netzwerken oder bestimmten Ports (un)zulassen. Wenn Sie die Standard-Sicherheitsgruppe entfernen, können Sie nur über die VNC-Konsole auf Ihre neue Instanz zugreifen.

Das Menü "**Schlüsselpaar**" ermöglicht es Ihnen, ein neues ssh-Schlüsselpaar (öffentlich/privat) zu erzeugen, indem Sie auf "Schlüsselpaar erstellen" klicken, oder ein bereits vorhandenes Schlüsselpaar mit "Schlüsselpaar importieren" zu importieren, um sich über Secure Shell (ssh) bei Ihrer neuen Instanz anmelden zu können.

<img src="2023-03-31_13-30.png" alt="Bildschirmfoto des Schlüsselpaar-Menüs" width="50%" height="50%" title="Schlüsselpaar-Menü">

Wenn Sie ein Schlüsselpaar erstellen, erhalten Sie den _privaten_ Schlüssel, den Sie auf Ihrer lokalen Arbeitsstation speichern und vor dem Abhören durch Dritte schützen sollten. Die öffentliche Hälfte des Schlüsselpaares wird in Ihrem OpenStack-Projekt gespeichert. Wenn Sie sich für den Import eines "Schlüsselpaares" entscheiden, importieren Sie eigentlich nur den _öffentlichen_ Teil Ihres Schlüsselpaares. Der private Schlüssel bleibt in Ihrem Besitz.

Sie können auch schnell ein neues öffentliches/privates Schlüsselpaar auf der Kommandozeile mit ``ssh-keygen -t rsa -f cloud.key`` erzeugen und dann den öffentlichen Schlüssel ``cloud.key.pub`` in Ihr OpenStack-Projekt importieren.
Wenn Sie Windows benutzen, würden Sie PuttyGen benutzen, um das gleiche zu tun - stellen Sie nur sicher, dass Sie ``openssh`` als Schlüsselformat wählen.

"**Konfiguration**" ist ein Menü, das es Ihnen ermöglicht, ein Skript hochzuladen und auszuführen, mit dem Sie Ihre Instanz nach dem Start anpassen können.

<img src="2023-03-31_13-47.png" alt="Bildschirmfoto des Konfigurationsmenüs" width="50%" height="50%" title="Konfigurationsmenü">

Da viele Cloud-Images heutzutage [cloud-init](https://cloudinit.readthedocs.io/en/latest/) zur Anpassung verwenden, wird diese Option vielleicht etwas seltener genutzt als sonst.
Eine weitere Option hier ist "**Disk Partition**", die "automatisch" und "manuell" durchgeführt werden kann. Bei "Automatisch" wird grundsätzlich eine Partition pro Datenträger erstellt. Mit "manuell" können Sie mehrere Partitionen pro Volume erstellen.

Mit ["**Servergruppen**"](../server-groups/) können Sie Ihre neue Instanz einer bestehenden Servergruppe zuordnen, so dass Ihre neue Instanz entweder neben anderen Instanzen in dieser Servergruppe oder explizit nicht neben anderen Instanzen in dieser Gruppe erstellt wird (Affinität - Anti-Affinität).

Wenn Sie einige "**Scheduler-Hinweise**" hinzufügen möchten, um die Platzierung Ihrer neuen Instanz zu beeinflussen, können Sie entweder aus dem vorhandenen Metadatenkatalog wählen oder Ihre eigenen Schlüssel in der ersten Zeile der linken Seite erstellen.

<img src="2023-03-31_14-17.png" alt="Screenshot des Menüs "Scheduler-Hinweise"" width="50%" height="50%" title="Menü "Scheduler-Hinweise">

Klicken Sie einfach auf ein "+" auf einer Taste von links, um sie nach rechts zu verschieben, um sie der neuen Instanz zuzuweisen. Zusätzliche Informationen werden in der Box am unteren Rand des Menüs angezeigt.

Auf ähnliche Weise können Sie im Menü "**Metadaten**" (weitere) Metadaten zu Ihrer neuen Instanz hinzufügen.

<img src="2023-03-31_14-22.png" alt="Bildschirmfoto des Metadaten-Menüs" width="50%" height="50%" title="Metadaten-Menü">

Es steht ein Katalog mit bereits vorhandenen Metadaten zur Verfügung. Sie können aber auch Ihre eigenen Schlüssel im Feld "Benutzerdefiniert" erstellen.
Klicken Sie einfach auf das "+" auf dem gewünschten Element auf der linken Seite, um es nach rechts zu verschieben.
