---
title: "Server-Gruppen"
type: "docs"
weight: 60
date: 2024-02-09
description: >
  Verwendung von Servergruppen zur Anwendung von (Anti-)Affinität
---

## Überblick

Mit Servergruppen können Sie eine Reihe von VMs festlegen, die auf demselben Hypervisor (Affinität) oder auf verschiedenen Hypervisoren (Anti-Affinität) laufen müssen. Im Allgemeinen ist Anti-Affinität gut für Fehlertoleranz und Lastausgleich, während Affinität nützlich ist, wenn Sie Netzwerkeffekte zwischen Ihren VMs minimieren möchten.

Bei der Verwendung von [Local SSD Storage](../../local-storage/) wird die Verwendung von Servergruppen dringend empfohlen, um Fehlertoleranz gegenüber einem Hypervisor-Ausfall zu erreichen.

Mit "**Server Groups**" können Sie Ihre neue Instanz einer bestehenden Servergruppe zuordnen, so dass Ihre neue Instanz entweder neben anderen Instanzen in dieser Servergruppe oder explizit nicht neben anderen Instanzen in dieser Gruppe erstellt wird (Affinität - Anti-Affinität).

<img src="2023-03-31_13-54.png" alt="Bildschirmfoto des Servergruppenmenüs" width="50%" height="50%" title="Servergruppenmenü">
<br/><br/>

Servergruppen können Affinitäts-, Anti-Affinitäts-, Soft-Affinitäts- und Soft-Anti-Affinitäts-Richtlinien haben. Während die Affinitätsrichtlinie fehlschlägt (und die Instanz nicht erstellt), wenn sie die neue Instanz nicht neben einer bestehenden Instanz dieser Servergruppe platzieren kann, platziert die Soft-Affinitätsrichtlinie die neue Instanz nicht neben einer bestehenden Instanz dieser Servergruppe, wenn dies nicht möglich ist (erstellt die neue Instanz aber trotzdem).
