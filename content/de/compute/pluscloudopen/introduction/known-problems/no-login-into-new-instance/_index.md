---
#https://gohugo.io/content-management/page-bundles/
title: "Anmeldung bei neu gestarteter Instanz nicht möglich"
type: "docs"
date: 2023-02-24
description: >
  Sie haben eine neue Instanz gestartet, können sich aber nicht mit Ihrem mit PuTTY-generierten SSH-Schlüssel anmelden.
---

Sie haben gerade eine neue Instanz gestartet, können sich aber nicht per SSH anmelden, obwohl Sie ein SSH-Schlüsselpaar - dass Sie mit PuTTY oder PuTTYgen erzeugt haben - in OpenStack eingerichtet und bereitgestellt haben. 

Auch wenn Sie überprüft haben, dass der richtige SSH-Private-Key verwendet wird, funktioniert die Anmeldung nicht. 

Der Grund dafür ist, dass PuTTY und PuTTYgen ein anderes Format für die Erzeugung von SSH-Schlüsselpaaren verwenden als OpenStack. Die SSH-Schlüsselpaare, die in OpenStack und Linux verwendet werden, sollten im OpenSSH-Format gespeichert werden. Wenn Sie bereits ein SSH-Schlüsselpaar haben, können Sie es mit PuTTY in das OpenSSH-Format konvertieren, speichern und den öffentlichen Schlüssel in OpenStack hochladen.
