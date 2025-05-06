---
title: "Konfiguration"
linkTitle: "Konfiguration"
type: "docs"
---

Die in der Tabelle aufgeführten Parameter stellen die spezifischen Konfigurationseinstellungen dar, die sie für den CaaS anpassen können.


| Parameter  | Type  | Default | Min | Max | Zulässige Werte |
|------------|-------|---------|-----|-----|-----------------|
| maxmemory-policy | string | volatile-lru |  | | volatile-lru, allkeys-lru, volatile-lfu, allkeys-lfu, volatile-random, allkeys-random, volatile-ttl, noeviction |

### Erläuterung der Tabelle

- **Parameter** In dieser Spalte werden die Konfigurationsparameter aufgeführt.
- **Type** Gibt den Datentyp des Konfigurationsparameters an (z. B. Integer, String).
- **Default** Zeigt den Standardwert für jeden Parameter an.
- **Min** Zeigt den minimal zulässigen Wert für numerische Parameter an.
- **Max** Zeigt den maximal zulässigen Wert für numerische Parameter an.
- **Zulässige Werte** Zeigt die zulässigen Werte für String-Parameter an.

<br>

**Für gewünschte Konfigurationsänderungen oder falls Sie einen noch nicht aufgeführten Parameter benötigen, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie Ihre DBaaS-Einstellungen direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
