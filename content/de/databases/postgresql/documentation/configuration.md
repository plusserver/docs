---
title: "Konfiguration"
linkTitle: "Konfiguration"
type: "docs"
---

Die in der Tabelle aufgeführten Parameter stellen die spezifischen Konfigurationseinstellungen dar, die wir an die PostgreSQL-Standardkonfiguration anpassen. Diese Parameter sind auf die Anforderungen unserer Plattform zugeschnitten und werden sorgfältig ausgewählt, um Leistung und Zuverlässigkeit zu optimieren.

> **Hinweis:** Die mit einem Sternchen (*) gekennzeichneten Parameter werden dynamisch auf Grundlage der verfügbaren Rechenressourcen berechnet, um eine nahtlose vertikale Skalierung zu ermöglichen.

| **Parameter**                       | **Type** | **Default**      | **Modifiable** | **Restart Required** | **Min** | **Max** | **Allowed Values** |
|-------------------------------------|----------|------------------|----------------|---------------------|---------|---------|--------------------|
| default_statistics_target           | integer  | 100              | True           | False               | 50      | 500     |                    |
| effective_cache_size*               | string   | 4GB              | True           | False               |         |         |                    |
| effective_io_concurrency            | integer  | 200              | True           | False               | 1       | 1000    |                    |
| jit                                 | string   | on               | True           | True                |         |         | on off             |
| maintenance_work_mem*               | string   | 64MB             | True           | False               |         |         |                    |
| max_connections*                    | integer  | 100              | True           | True                | 100     | 1000    |                    |
| max_parallel_maintenance_workers*   | integer  | 2                | True           | False               |         |         |                    |
| max_parallel_workers*               | integer  | 8                | True           | False               |         |         |                    |
| max_parallel_workers_per_gather*    | integer  | 2                | True           | False               |         |         |                    |
| max_wal_size                        | string   | 1GB              | True           | True                |         |         |                    |
| max_worker_processes*               | integer  | 8                | True           | True                |         |         |                    |
| min_wal_size                        | string   | 80MB             | True           | True                |         |         |                    |
| random_page_cost                    | string   | 1.1              | True           | False               |         |         |                    |
| shared_buffers*                     | string   | 128MB            | True           | True                |         |         |                    |
| temp_file_limit                     | integer  | -1               | True           | False               |         |         |                    |
| timezone                            | string   | Europe/Berlin    | True           | True                |         |         |                    |
| wal_buffers                         | integer  | -1               | True           | True                |         |         |                    |
| work_mem*                           | string   | 4MB              | True           | False               |         |         |                    |

### Erläuterung der Tabelle

- **Parameter:** In dieser Spalte werden die Konfigurationsparameter aufgeführt.
- **Type:** Gibt den Datentyp des Konfigurationsparameters an (z. B. Integer, String).
- **Default:** Zeigt den Standardwert für jeden Parameter an.
- Modifiable:** Zeigt an, ob der Parameter modifiziert werden kann (`true`/`false`).
- **Restart Required:** Gibt an, ob ein Neustart des Servers erforderlich ist, damit Änderungen wirksam werden (`true`/`false`).
- **Min:** Zeigt den minimal zulässigen Wert für numerische Parameter an.
- **Max:** Zeigt den maximal zulässigen Wert für numerische Parameter an.
- **Allowed Values:** Zeigt die zulässigen Werte für String-Parameter an.

### Verfügbare PostgreSQL Extension PostgreSQL 14

| **Name**                        | **Version** | **Comment**                                                                                             |
|---------------------------------|-------------|---------------------------------------------------------------------|
| [btree_gin](https://www.postgresql.org/docs/14/btree-gin.html) | 1.3 | support for indexing common datatypes in GIN |
| [btree_gist](https://www.postgresql.org/docs/14/btree-gist.html) | 1.6  | support for indexing common datatypes in GiST |
| [citext](https://www.postgresql.org/docs/14/citext.html) | 1.6 | data type for case-insensitive character strings |
| [cube](https://www.postgresql.org/docs/14/cube.html) | 1.5 | data type for multidimensional cubes |
| [dict_int](https://www.postgresql.org/docs/14/dict-int.html) | 1.0 | text search dictionary template for integers |
| [fuzzystrmatch](https://www.postgresql.org/docs/14/fuzzystrmatch.html) | 1.1 | determine similarities and distance between strings |
| [hstore](https://www.postgresql.org/docs/14/hstore.html) | 1.8 | data type for storing sets of (key, value) pairs |
| [intarray](https://www.postgresql.org/docs/14/intarray.html) | 1.5 | functions, operators, and index support for 1-D arrays of integers |
| [isn](https://www.postgresql.org/docs/14/isn.html) | 1.2 | data types for international product numbering standards |
| [lo](https://www.postgresql.org/docs/14/lo.html) | 1.1 | Large Object maintenance |
| [ltree](https://www.postgresql.org/docs/14/ltree.html) | 1.2 | data type for hierarchical tree-like structures |
| [pgcrypto](https://www.postgresql.org/docs/14/pgcrypto.html) | 1.3 | cryptographic functions |
| [seg](https://www.postgresql.org/docs/14/seg.html) | 1.4 | data type for representing line segments or floating-point intervals |
| [tablefunc](https://www.postgresql.org/docs/14/tablefunc.html) | 1.0 | functions that manipulate whole tables, including crosstab |
| [tcn](https://www.postgresql.org/docs/14/tcn.html) | 1.0 | Triggered change notifications |
| [tsm_system_rows](https://www.postgresql.org/docs/14/tsm-system-rows.html) | 1.0 | TABLESAMPLE method which accepts number of rows as a limit |
| [tsm_system_time](https://www.postgresql.org/docs/14/tsm-system-time.html) | 1.0 | TABLESAMPLE method which accepts time in milliseconds as a limit |
| [uuid-ossp](https://www.postgresql.org/docs/14/uuid-ossp.html) | 1.1 | generate universally unique identifiers (UUIDs) |

### Verfügbare PostgreSQL Extension PostgreSQL 15

| **Name**                        | **Version** | **Comment**                                                                                             |
|---------------------------------|-------------|---------------------------------------------------------------------|
| [btree_gin](https://www.postgresql.org/docs/15/btree-gin.html) | 1.3 | support for indexing common datatypes in GIN |
| [btree_gist](https://www.postgresql.org/docs/15/btree-gist.html) | 1.7  | support for indexing common datatypes in GiST |
| [citext](https://www.postgresql.org/docs/15/citext.html) | 1.6 | data type for case-insensitive character strings |
| [cube](https://www.postgresql.org/docs/15/cube.html) | 1.5 | data type for multidimensional cubes |
| [dict_int](https://www.postgresql.org/docs/15/dict-int.html) | 1.0 | text search dictionary template for integers |
| [fuzzystrmatch](https://www.postgresql.org/docs/15/fuzzystrmatch.html) | 1.1 | determine similarities and distance between strings |
| [hstore](https://www.postgresql.org/docs/15/hstore.html) | 1.8 | data type for storing sets of (key, value) pairs |
| [intarray](https://www.postgresql.org/docs/15/intarray.html) | 1.5 | functions, operators, and index support for 1-D arrays of integers |
| [isn](https://www.postgresql.org/docs/15/isn.html) | 1.2 | data types for international product numbering standards |
| [lo](https://www.postgresql.org/docs/15/lo.html) | 1.1 | Large Object maintenance |
| [ltree](https://www.postgresql.org/docs/15/ltree.html) | 1.2 | data type for hierarchical tree-like structures |
| [pgcrypto](https://www.postgresql.org/docs/15/pgcrypto.html) | 1.3 | cryptographic functions |
| [seg](https://www.postgresql.org/docs/15/seg.html) | 1.4 | data type for representing line segments or floating-point intervals |
| [tablefunc](https://www.postgresql.org/docs/15/tablefunc.html) | 1.0 | functions that manipulate whole tables, including crosstab |
| [tcn](https://www.postgresql.org/docs/15/tcn.html) | 1.0 | Triggered change notifications |
| [tsm_system_rows](https://www.postgresql.org/docs/15/tsm-system-rows.html) | 1.0 | TABLESAMPLE method which accepts number of rows as a limit |
| [tsm_system_time](https://www.postgresql.org/docs/15/tsm-system-time.html) | 1.0 | TABLESAMPLE method which accepts time in milliseconds as a limit |
| [uuid-ossp](https://www.postgresql.org/docs/15/uuid-ossp.html) | 1.1 | generate universally unique identifiers (UUIDs) |


### Verfügbare PostgreSQL Extension PostgreSQL 16

| **Name**                        | **Version** | **Comment**                                                                                             |
|---------------------------------|-------------|---------------------------------------------------------------------|
| [btree_gin](https://www.postgresql.org/docs/16/btree-gin.html) | 1.3 | support for indexing common datatypes in GIN |
| [btree_gist](https://www.postgresql.org/docs/16/btree-gist.html) | 1.7  | support for indexing common datatypes in GiST |
| [citext](https://www.postgresql.org/docs/16/citext.html) | 1.6 | data type for case-insensitive character strings |
| [cube](https://www.postgresql.org/docs/16/cube.html) | 1.5 | data type for multidimensional cubes |
| [dict_int](https://www.postgresql.org/docs/16/dict-int.html) | 1.0 | text search dictionary template for integers |
| [fuzzystrmatch](https://www.postgresql.org/docs/16/fuzzystrmatch.html) | 1.1 | determine similarities and distance between strings |
| [hstore](https://www.postgresql.org/docs/16/hstore.html) | 1.8 | data type for storing sets of (key, value) pairs |
| [intarray](https://www.postgresql.org/docs/16/intarray.html) | 1.5 | functions, operators, and index support for 1-D arrays of integers |
| [isn](https://www.postgresql.org/docs/16/isn.html) | 1.2 | data types for international product numbering standards |
| [lo](https://www.postgresql.org/docs/16/lo.html) | 1.1 | Large Object maintenance |
| [ltree](https://www.postgresql.org/docs/16/ltree.html) | 1.2 | data type for hierarchical tree-like structures |
| [pgcrypto](https://www.postgresql.org/docs/16/pgcrypto.html) | 1.3 | cryptographic functions |
| [seg](https://www.postgresql.org/docs/16/seg.html) | 1.4 | data type for representing line segments or floating-point intervals |
| [tablefunc](https://www.postgresql.org/docs/16/tablefunc.html) | 1.0 | functions that manipulate whole tables, including crosstab |
| [tcn](https://www.postgresql.org/docs/16/tcn.html) | 1.0 | Triggered change notifications |
| [tsm_system_rows](https://www.postgresql.org/docs/16/tsm-system-rows.html) | 1.0 | TABLESAMPLE method which accepts number of rows as a limit |
| [tsm_system_time](https://www.postgresql.org/docs/16/tsm-system-time.html) | 1.0 | TABLESAMPLE method which accepts time in milliseconds as a limit |
| [uuid-ossp](https://www.postgresql.org/docs/16/uuid-ossp.html) | 1.1 | generate universally unique identifiers (UUIDs) |

<br>

**Für gewünschte Konfigurationsänderungen oder falls Sie einen noch nicht aufgeführten Parameter benötigen, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie Ihre DBaaS-Einstellungen direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
