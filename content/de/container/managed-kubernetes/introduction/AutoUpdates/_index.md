---
title: "AutoUpdates"
linkTitle: "AutoUpdates"
type: "docs"
weight: 31
date: 2025-06-13
---

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
