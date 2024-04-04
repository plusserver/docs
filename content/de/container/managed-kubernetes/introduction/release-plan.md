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
| Februar | 05.02.2024 | Change | [Release PSKE Version 1.9.0](https://docs.plusserver.com/container/managed-kubernetes/releasenotes/notes/1-9-0/) |
| März | - | - | - |
| April | 02.04.2024 | Change | [Release PSKE Version 1.10.1](https://docs.plusserver.com/container/managed-kubernetes/releasenotes/notes/1-10-1/) |
| Mai | - | - | - |
| Juni | 11.06.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| Juli | - | - | - |
| August| 13.08.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| September | - | - | - |
| Oktober | 08.10.2024 | Standardchange | Standard Change - Kubernetes Patch Version |
| November | - | - | - |
| Dezember | 10.12.2024 | Standardchange | Standard Change - Kubernetes Patch Version |

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
