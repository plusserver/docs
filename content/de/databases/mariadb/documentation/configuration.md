---
title: "Konfiguration"
linkTitle: "Konfiguration"
type: "docs"
---

Die in der Tabelle aufgeführten Parameter stellen die spezifischen Konfigurationseinstellungen dar, die wir an die MariaDB-Standardkonfiguration anpassen. Diese Parameter sind auf die Anforderungen unserer Plattform zugeschnitten und werden sorgfältig ausgewählt, um Leistung und Zuverlässigkeit zu optimieren.

> **Hinweis:** Die mit einem Sternchen (*) gekennzeichneten Parameter werden dynamisch auf Grundlage der verfügbaren Rechenressourcen berechnet, um eine nahtlose vertikale Skalierung zu ermöglichen.

| Parameter  | Type  | Default | Min | Max | Zulässige Werte |
|------------|-------|---------|-----|-----|-----------------|
| connect_timeout              | integer | 10 | 2 | 31536000 | |
| innodb_buffer_pool_size     | integer | Abhängig von der Node Größe | 2097152 | 9223372036854776000 | |
| innodb_file_per_table        | string  | ON | | | ON, OFF |
| innodb_flush_method          | string  | O_DIRECT | | | fsync, O_DSYNC, O_DIRECT, O_DIRECT_NO_FSYNC |
| innodb_lock_wait_timeout     | integer | 50 | 0 | 100000000 | |
| innodb_log_buffer_size       | integer | 16777216 | 262144 | 4294967295 | |
| innodb_log_file_size         | integer | 100663296 | 1048576 | 549755813888 | |
| innodb_strict_mode           | string  | ON | | | ON, OFF |
| innodb_ft_aux_table             | string  | - | | | |
| innodb_ft_cache_size            | integer | 8000000 | 1600000  | 80000000 | |
| innodb_ft_enable_diag_print     | string  | OFF | | | ON, OFF |
| innodb_ft_enable_stopword       | string  | ON | |  | ON, OFF |
| innodb_ft_max_token_size        | integer | 84 | 10 | 84 | |
| innodb_ft_min_token_size        | integer | 3 | 0 | 16 | |
| innodb_ft_num_word_optimize     | integer | 2000 | 1000 | 10000 | |
| innodb_ft_result_cache_limit    | integer | 2000000000 | 1000000 | 18446744073709551615 | |
| innodb_ft_server_stopword_table | string  | - | | | |
| innodb_ft_sort_pll_degree       | integer | 2 | 1 | 32 | |
| innodb_ft_total_cache_size      | integer | 640000000 | 32000000 | 1600000000 | |
| innodb_ft_user_stopword_table   | string  | - | | | |
| key_buffer_size              | integer | Abhängig von der Node Größe | 8 | | |
| local_infile                 | string  | OFF |  |  | ON, OFF |
| lock_wait_timeout            | integer | 86400 | 0 | 31536000 | |
| log_bin_trust_function_creators | string | OFF | | | ON, OFF |
| max_binlog_size              | integer | 1073741824 | 4096 | 1073741824 | |
| max_connect_errors           | integer | 100 | 1 | 4294967295 | |
| max_connections             | integer | Abhängig von der Node Größe | 10 | 100000 |  |
| open_files_limit             | integer | 0 |  0         | 4294967295 | |
| require_secure_transport     | string  | ON | | | ON, OFF |
| skip_name_resolve            | string  | ON | | | ON, OFF |
| table_open_cache            | integer | Abhängig von der Node Größe | 1 | 1048576 |  |
| sql_mode                     | string  | STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |  |  | ALLOW_INVALID_DATES, ANSI, ANSI_QUOTES, DB2, EMPTY_STRING_IS_NULL, ERROR_FOR_DIVISION_BY_ZERO, HIGH_NOT_PRECEDENCE, IGNORE_BAD_TABLE_OPTIONS, IGNORE_SPACE, MAXDB, MSSQL, MYSQL323, MYSQL40, NO_AUTO_CREATE_USER, NO_AUTO_VALUE_ON_ZERO, NO_BACKSLASH_ESCAPES, NO_DIR_IN_CREATE, NO_ENGINE_SUBSTITUTION, NO_FIELD_OPTIONS, NO_KEY_OPTIONS, NO_TABLE_OPTIONS, NO_UNSIGNED_SUBTRACTION, NO_ZERO_DATE, NO_ZERO_IN_DATE, ONLY_FULL_GROUP_BY, ORACLE, PAD_CHAR_TO_FULL_LENGTH, PIPES_AS_CONCAT, POSTGRESQL, REAL_AS_FLOAT, SIMULTANEOUS_ASSIGNMENT, STRICT_ALL_TABLES, STRICT_TRANS_TABLES, TIME_ROUND_FRACTIONAL|

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
