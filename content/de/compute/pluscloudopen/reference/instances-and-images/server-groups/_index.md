---
title: "Server-Gruppen"
type: "docs"
weight: 60
date: 2024-02-09
description: >
  Verwendung von Server-Gruppen zur Anwendung von (Anti-)Affinität
---

## Überblick

Mit Server-Gruppen können Sie eine Reihe von VMs festlegen, die auf demselben Hypervisor (Affinität) oder auf verschiedenen Hypervisoren (Anti-Affinität) laufen müssen. Im Allgemeinen ist Anti-Affinität gut für Fehlertoleranz und Lastausgleich, während Affinität nützlich ist, wenn Sie Netzwerkeffekte zwischen Ihren VMs minimieren möchten.

Beim Einsatz von [Local SSD Storage](../../local-storage/) wird die Verwendung von Server-Gruppen dringend empfohlen, um Fehlertoleranz bei Ausfall eines Hypervisors zu erreichen.

Mit "**Server Groups**" können Sie Ihre neue Instanz einer bestehenden Server-Gruppe zuordnen, sodass Ihre neue Instanz entweder neben anderen Instanzen in dieser Server-Gruppe angelegt wird oder explizit nicht neben anderen Instanzen in dieser Gruppe (Affinität - Anti-Affinität).

<img src="2023-03-31_13-54.png" alt="Bildschirmfoto des Server-Gruppenmenüs" width="50%" height="50%" title="Server-Gruppenmenü">
<br/><br/>

Server-Gruppen können Affinitäts-, Anti-Affinitäts-, Soft-Affinitäts- und Soft-Anti-Affinitäts-Richtlinien haben. Die Affinitätsrichtlinie schlägt fehl (und die Instanz wird nicht erstellt), wenn die neue Instanz nicht neben einer bestehenden Instanz dieser Server-Gruppe platziert werden kann. Die Soft-Affinitätsrichtlinie platziert die neue Instanz nicht neben einer vorhandenen Instanz dieser Server-Gruppe, wenn dies nicht möglich ist (die neue Instanz wird aber trotzdem erstellt).
