---
title: "Konfiguration"
linkTitle: "Konfiguration"
type: "docs"
---

Die in der Tabelle aufgeführten Parameter stellen die spezifischen Konfigurationseinstellungen dar, die wir an die MariaDB-Standardkonfiguration anpassen. Diese Parameter sind auf die Anforderungen unserer Plattform zugeschnitten und werden sorgfältig ausgewählt, um Leistung und Zuverlässigkeit zu optimieren.

> **Hinweis:** Die mit einem Sternchen (*) gekennzeichneten Parameter werden dynamisch auf Grundlage der verfügbaren Rechenressourcen berechnet, um eine nahtlose vertikale Skalierung zu ermöglichen.

| Parameter                    | Type    | Default                | Modifiable | Restart Required | Min       | Max                  | Allowed Values                                               |
|------------------------------|---------|------------------------|------------|------------------|-----------|----------------------|--------------------------------------------------------------|
| connect_timeout              | integer | 10                     | true       | false            |           |                      |                                                              |
| expire_logs_days             | integer | 1                      | false      | false            | 0         | 99                   |                                                              |
| innodb_buffer_pool_size*     | integer | 134217728              | true       | false            | 2097152   | 9223372036854776000 |                                                              |
| innodb_file_per_table        | string  | ON                     | false      | false            |           |                      | ON, OFF                                                      |
| innodb_flush_method          | string  | O_DIRECT               | false      | true             |           |                      | fsync, O_DSYNC, O_DIRECT, O_DIRECT_NO_FSYNC                |
| innodb_lock_wait_timeout     | integer | 50                     | true       | false            | 0         | 100000000            |                                                              |
| innodb_log_buffer_size       | integer | 16777216               | true       | true             | 262144    | 4294967295           |                                                              |
| innodb_log_file_size         | integer | 100663296              | true       | true             | 1048576   | 549755813888         |                                                              |
| innodb_strict_mode           | string  | ON                     | true       | false            |           |                      | ON, OFF                                                      |
| key_buffer_size*             | integer | 134217728              | true       | false            | 8         |                      |                                                              |
| local_infile                 | string  | OFF                    | false      | false            |           |                      | ON, OFF                                                      |
| lock_wait_timeout            | integer | 86400                  | true       | false            | 0         | 31536000             |                                                              |
| log_bin_trust_function_creators | string | OFF                  | true       | false            |           |                      | ON, OFF                                                      |
| max_allowed_packet*          | integer | 16777216               | false      | false            | 1024      | 1073741824           |                                                              |
| max_binlog_size              | integer | 1073741824             | true       | false            | 4096      | 1073741824           |                                                              |
| max_connect_errors           | integer | 100                    | true       | false            | 1         | 4294967295           |                                                              |
| max_connections*             | integer | 151                    | true       | true             | 10        | 100000               |                                                              |
| open_files_limit             | integer | 0                      | true       | true             | 0         | 4294967295           |                                                              |
| require_secure_transport     | string  | ON                     | false      | false            |           |                      | ON, OFF                                                      |
| skip_name_resolve            | string  | ON                     | false      | true             |           |                      | ON, OFF                                                      |
| ssl_cipher                   | string  | ECDHE-ECDSA-AES128-GCM-SHA256:<br>ECDHE-RSA-AES128-GCM-SHA256:<br>ECDHE-ECDSA-AES256-GCM-SHA384:<br>ECDHE-RSA-AES256-GCM-SHA384:<br>ECDHE-ECDSA-CHACHA20-POLY1305:<br>ECDHE-RSA-CHACHA20-POLY1305:<br>DHE-RSA-AES128-GCM-SHA256:<br>DHE-RSA-AES256-GCM-SHA384 | true | true             |           |                      |                                                              |
| sql_mode                     | string  | STRICT_TRANS_TABLES,<br>ERROR_FOR_DIVISION_BY_ZERO,<br>NO_AUTO_CREATE_USER,<br>NO_ENGINE_SUBSTITUTION | true | false |           |                      | ALLOW_INVALID_DATES, ANSI, ANSI_QUOTES, DB2, EMPTY_STRING_IS_NULL, ERROR_FOR_DIVISION_BY_ZERO, HIGH_NOT_PRECEDENCE, IGNORE_BAD_TABLE_OPTIONS, IGNORE_SPACE, MAXDB, MSSQL, MYSQL323, MYSQL40, NO_AUTO_CREATE_USER, NO_AUTO_VALUE_ON_ZERO, NO_BACKSLASH_ESCAPES, NO_DIR_IN_CREATE, NO_ENGINE_SUBSTITUTION, NO_FIELD_OPTIONS, NO_KEY_OPTIONS, NO_TABLE_OPTIONS, NO_UNSIGNED_SUBTRACTION, NO_ZERO_DATE, NO_ZERO_IN_DATE, ONLY_FULL_GROUP_BY, ORACLE, PAD_CHAR_TO_FULL_LENGTH, PIPES_AS_CONCAT, POSTGRESQL, REAL_AS_FLOAT, SIMULTANEOUS_ASSIGNMENT, STRICT_ALL_TABLES, STRICT_TRANS_TABLES, TIME_ROUND_FRACTIONAL</summary></details>
|
| table_open_cache*            | integer | 2000                   | true       | true             | 1         | 1048576              |                                                              |
| tls_version                  | string  | TLSv1.2,TLSv1.3        | true       | true             |           |                      |                                                              |

### Erläuterung der Tabelle

- **Parameter:** In dieser Spalte werden die Konfigurationsparameter aufgeführt.
- **Type:** Gibt den Datentyp des Konfigurationsparameters an (z. B. Integer, String).
- **Default:** Zeigt den Standardwert für jeden Parameter an.
- **Modifiable:** Zeigt an, ob der Parameter modifiziert werden kann (`true`/`false`).
- **Restart Required:** Gibt an, ob ein Neustart des Servers erforderlich ist, damit Änderungen wirksam werden (`true`/`false`).
- **Min:** Zeigt den minimal zulässigen Wert für numerische Parameter an.
- **Max:** Zeigt den maximal zulässigen Wert für numerische Parameter an.
- **Allowed Values:** Zeigt die zulässigen Werte für String-Parameter an.

<br>

**Für gewünschte Konfigurationsänderungen oder falls Sie einen noch nicht aufgeführten Parameter benötigen, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie Ihre DBaaS-Einstellungen direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
