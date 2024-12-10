---
title: "Release-Plan"
linkTitle: "Release-Plan"
type: "docs"
weight: 30
date: 2024-03-12
---

Mit diesem Release-Plan möchten wir Ihnen mehr Transparenz und Planungssicherheit im Hinblick auf bevorstehende Updates und Änderungen unserer Produkte und Services bieten. Der Plan beinhaltet eine Tabelle mit Datum, Art des Changes und relevanten Informationen.

So können Sie sich frühzeitig auf wichtige Updates vorbereiten und sicherstellen, dass Ihre Systeme und Prozesse reibungslos funktionieren. Zusätzlich finden Sie Informationen zum Verhalten von AutoUpdates bei Enforced Upgrades. So haben Sie die volle Kontrolle und können selbst entscheiden, wann und wie Updates durchgeführt werden.

## Release-Plan 2024

| Monat | Datum | Change-Typ | Info |
| --- | --- | --- | --- |
| Januar | - | - | - |
| Februar | 05.02.2024 | Change | [Release PSKE Version 1.9.0](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-9-0/) |
| März | - | - | - |
| April | 02.04.2024 | Change | [Release PSKE Version 1.10.1](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-10-1/) |
| Mai | 21.05.2024 | Change | [Release PSKE Version 1.10.2](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-10-2/) |
| Juni | - | - | - |
| Juli | 29.07.2024 | Change | [Launch PSKE Version 1.12.0](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-12-0/) |
| August| 13.08.2024 | Change | [Launch PSKE Version 1.13.0](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-13-0/) |
| September | 03.09.2024 | Change | [Launch PSKE Version 1.13.1](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-13-1/) |
| September | 30.09.2024 | Change | [Launch PSKE Version 1.14.0](https://docs.plusserver.com/de/container/managed-kubernetes/releasenotes/notes/1-14-0/) |
| Oktober | - | - | - |
| November | - | - | - |
| Dezember | 02.12.2024 | Change | [Launch PSKE Version 1.16.0](https://docs.plusserver.com/en/container/managed-kubernetes/releasenotes/notes/1-16-0/) |
| Dezember | 19.12.2024 | Change | [Launch PSKE Version 1.17.0](https://status.plusserver.com/incidents/w8s3wqf2w01j) |

## Verhalten bei AutoUpdates

**AutoUpdates:**
- Aktiviert:
  - *Wartungsfenster:* Updates werden automatisch innerhalb des festgelegten Maintenance Windows durchgeführt.
  - *Zeitpunkt:* Der genaue Zeitpunkt des Updates innerhalb des Maintenance Windows kann durch Kunden bestimmt werden.
- Deaktiviert:
  - *Aktualisierung:* Updates werden erst nach Ablauf der aktuell genutzten Version durchgeführt.
  - *Zeitpunkt:* Der Zeitpunkt des Updates ist meist 0 Uhr.

**Enforced Upgrades:**
- *Unabhängig von AutoUpdates:* Enforced Upgrades werden unabhängig davon durchgeführt, ob AutoUpdates aktiviert oder deaktiviert sind.
- *Zeitpunkt:* Enforced Upgrades werden so schnell wie möglich durchgeführt, nachdem die neue Version verfügbar ist.

**Zusammenfassend:**

| AutoUpdates | Enforced Upgrade | Zeitpunkt des Updates |
| --- | --- | --- |
| Aktiviert | Ja | Innerhalb des nächsten Maintenance Windows |
| Aktiviert | Nein | Automatisch innerhalb des nächsten Maintenance Windows |
| Deaktiviert | Ja | Sobald die neue Version verfügbar ist |
| Deaktiviert | Nein | Nach Ablauf der aktuell genutzten Version |
