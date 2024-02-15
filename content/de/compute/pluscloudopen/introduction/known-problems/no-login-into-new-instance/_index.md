---
#https://gohugo.io/content-management/page-bundles/
title: "Anmeldung bei neu gestarteter Instanz nicht möglich"
type: "docs"
date: 2023-02-24
description: >
  Sie haben eine neue Instanz gestartet, können sich aber nicht mit Ihrem mit Putty generierten SSH-Schlüssel anmelden.
---

Sie haben gerade eine neue Instanz gestartet, können sich aber nicht per ssh anmelden, obwohl Sie ein ssh-Schlüsselpaar - dass Sie mit putty oder puttygen erzeugt haben - in OpenStack eingerichtet und bereitgestellt haben. 

Auch wenn Sie überprüft haben, dass der richtige ssh Private Key verwendet wird, funktioniert die Anmeldung nicht. 

Der Grund dafür ist, dass putty und puttygen ein anderes Format für die Erzeugung von ssh-Schlüsselpaaren verwenden als OpenStack. Die ssh-Schlüsselpaare, die in OpenStack und Linux verwendet werden, sollten im OpenSSH-Format gespeichert werden. Wenn Sie bereits ein ssh-Schlüsselpaar haben, können Sie es mit putty in das OpenSSH-Format konvertieren, speichern und den öffentlichen Schlüssel in OpenStack hochladen.
