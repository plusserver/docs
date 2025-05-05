---
title: "Konfiguration"
linkTitle: "Konfiguration"
type: "docs"
---

Die in der Tabelle aufgeführten Parameter stellen die spezifischen Konfigurationseinstellungen dar, die wir an die MySQL-Standardkonfiguration anpassen. Diese Parameter sind auf die Anforderungen unserer Plattform zugeschnitten und werden sorgfältig ausgewählt, um Leistung und Zuverlässigkeit zu optimieren.

> **Hinweis:** Die mit einem Sternchen (*) gekennzeichneten Parameter werden dynamisch auf Grundlage der verfügbaren Rechenressourcen berechnet, um eine nahtlose vertikale Skalierung zu ermöglichen.

| Parameter | Type | Standard | Min | Max | Zulässige Werte  |
|-----------|------|----------|-----|-----|----------|
| connect_timeout                 | integer | 10 | 2 | 31536000 |  |
| innodb_buffer_pool_size         | integer | (*) | 2097152 | 9223372036854775807 | |
| innodb_flush_method             | string | O_DIRECT | | | fsync, O_DSYNC, littlesync, nosync, O_DIRECT, O_DIRECT_NO_FSYNC |
| innodb_redo_log_capacity        | integer | 104857600 | 8388608 | 137438953472 | |
| innodb_lock_wait_timeout        | integer | 50 | 0 | 100000000 | |
| innodb_log_buffer_size          | integer | 16777216 | 262144 | 4294967295 | |
| innodb_log_file_size            | integer | 100663296 | 1048576 | 549755813888 | |
| innodb_strict_mode              | string | ON |  |  | ON, OFF |
| innodb_ft_cache_size            | integer | 8000000    | 1600000  | 80000000             | |
| innodb_ft_enable_diag_print     | string  | OFF        |          |                      | ON, OFF |
| innodb_ft_enable_stopword       | string  | ON         |          |                      | ON, OFF |
| innodb_ft_max_token_size        | integer | 84         | 10       | 84                   | |
| innodb_ft_min_token_size        | integer | 3          | 0        | 16                   | |
| innodb_ft_num_word_optimize     | integer | 2000       | 1000     | 10000                | |
| innodb_ft_result_cache_limit    | integer | 2000000000 | 1000000  | 18446744073709551615 | |
| innodb_ft_server_stopword_table | string  | -          |          |                      | |
| innodb_ft_sort_pll_degree       | integer | 2          | 1        | 32                   | |
| innodb_ft_total_cache_size      | integer | 640000000  | 32000000 | 1600000000           | |
| innodb_ft_user_stopword_table   | string  | -          |          |                      | |
| key_buffer_size                 | integer | (*) | 0 | 4294967295 | |
| max_connections                 | integer | 151 | 10 | 100000 | |
| table_open_cache                | integer | (*) | 1 | 1048576 | |
| log_bin_trust_function_creators | string | OFF | | | ON, OFF |
| lock_wait_timeout               | integer | 31536000 | 1 | 31536000 | |
| max_connect_errors              | integer | 100 | 1 | 4294967295 | |
| open_files_limit                | integer | 5000 | 0 | 4294967295 | |
| sql_mode                        | string | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION | | | ALLOW_INVALID_DATES, ANSI, ANSI_QUOTES, ERROR_FOR_DIVISION_BY_ZERO, HIGH_NOT_PRECEDENCE, IGNORE_SPACE, NO_AUTO_VALUE_ON_ZERO, NO_BACKSLASH_ESCAPES, NO_DIR_IN_CREATE, NO_ENGINE_SUBSTITUTION, NO_UNSIGNED_SUBTRACTION, NO_ZERO_DATE, NO_ZERO_IN_DATE, ONLY_FULL_GROUP_BY, PAD_CHAR_TO_FULL_LENGTH, PIPES_AS_CONCAT, REAL_AS_FLOAT, STRICT_ALL_TABLES, STRICT_TRANS_TABLES, TIME_TRUNCATE_FRACTIONAL |
| federated                       | string | OFF | | | ON, OFF |

### Erläuterung der Tabelle

- **Parameter** In dieser Spalte werden die Konfigurationsparameter aufgeführt.
- **Type** Gibt den Datentyp des Konfigurationsparameters an (z. B. Integer, String).
- **Default** Zeigt den Standardwert für jeden Parameter an.
- **Min** Zeigt den minimal zulässigen Wert für numerische Parameter an.
- **Max** Zeigt den maximal zulässigen Wert für numerische Parameter an.
- **Zulässige Werte** Zeigt die zulässigen Werte für String-Parameter an.

**Für gewünschte Konfigurationsänderungen oder falls Sie einen noch nicht aufgeführten Parameter benötigen, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).**

> *Wir arbeiten an einer Funktion, mit der Sie Ihre DBaaS-Einstellungen direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
