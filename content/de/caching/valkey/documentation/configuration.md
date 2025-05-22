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
