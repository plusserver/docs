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

<br>

### Verfügbare PostgreSQL Extension

| **Name**                        | **Default Version** | **Installed Version** | **Comment**                                                                                                            |
|---------------------------------|---------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------|
| address_standardizer            | 3.4.0               |                       | Used to parse an address into constituent elements. Generally used to support geocoding address normalization step.   |
| address_standardizer_data_us    | 3.4.0               |                       | Address Standardizer US dataset example                                                                                |
| adminpack                       | 2.1                 |                       | Administrative functions for PostgreSQL                                                                                |
| amcheck                         | 1.3                 |                       | Functions for verifying relation integrity                                                                             |
| autoinc                         | 1.0                 |                       | Functions for autoincrementing fields                                                                                  |
| bloom                           | 1.0                 |                       | Bloom access method - signature file based index                                                                       |
| btree_gin                       | 1.3                 |                       | Support for indexing common datatypes in GIN                                                                           |
| btree_gist                      | 1.7                 |                       | Support for indexing common datatypes in GiST                                                                          |
| citext                          | 1.6                 |                       | Data type for case-insensitive character strings                                                                       |
| cube                            | 1.5                 |                       | Data type for multidimensional cubes                                                                                   |
| dblink                          | 1.2                 |                       | Connect to other PostgreSQL databases from within a database                                                           |
| dict_int                        | 1.0                 |                       | Text search dictionary template for integers                                                                           |
| dict_xsyn                       | 1.0                 |                       | Text search dictionary template for extended synonym processing                                                        |
| earthdistance                   | 1.1                 |                       | Calculate great-circle distances on the surface of the Earth                                                           |
| file_fdw                        | 1.0                 |                       | Foreign-data wrapper for flat file access                                                                              |
| fuzzystrmatch                   | 1.1                 |                       | Determine similarities and distance between strings                                                                    |
| hstore                          | 1.8                 |                       | Data type for storing sets of (key, value) pairs                                                                       |
| insert_username                 | 1.0                 |                       | Functions for tracking who changed a table                                                                             |
| intagg                          | 1.1                 |                       | Integer aggregator and enumerator (obsolete)                                                                           |
| intarray                        | 1.5                 |                       | Functions, operators, and index support for 1-D arrays of integers                                                     |
| isn                             | 1.2                 |                       | Data types for international product numbering standards                                                               |
| lo                              | 1.1                 |                       | Large Object maintenance                                                                                               |
| ltree                           | 1.2                 |                       | Data type for hierarchical tree-like structures                                                                        |
| moddatetime                     | 1.0                 |                       | Functions for tracking last modification time                                                                          |
| old_snapshot                    | 1.0                 |                       | Utilities in support of old_snapshot_threshold                                                                         |
| orafce                          | 4.7                 |                       | Functions and operators that emulate a subset of functions and packages from the Oracle RDBMS                          |
| pageinspect                     | 1.11                |                       | Inspect the contents of database pages at a low level                                                                  |
| pg_buffercache                  | 1.3                 |                       | Examine the shared buffer cache                                                                                        |
| pg_freespacemap                 | 1.2                 |                       | Examine the free space map (FSM)                                                                                       |
| pg_prewarm                      | 1.2                 |                       | Prewarm relation data                                                                                                  |
| pg_stat_statements              | 1.10                |                       | Track planning and execution statistics of all SQL statements executed                                                 |
| pg_surgery                      | 1.0                 |                       | Extension to perform surgery on a damaged relation                                                                     |
| pg_trgm                         | 1.6                 |                       | Text similarity measurement and index searching based on trigrams                                                      |
| pg_visibility                   | 1.2                 |                       | Examine the visibility map (VM) and page-level visibility info                                                         |
| pg_walinspect                   | 1.0                 |                       | Functions to inspect contents of PostgreSQL Write-Ahead Log                                                            |
| pgaudit                         | 1.7                 |                       | Provides auditing functionality                                                                                        |
| pgautofailover                  | 2.0                 |                       | pg_auto_failover                                                                                                       |
| pgcrypto                        | 1.3                 |                       | Cryptographic functions                                                                                                |
| pgrowlocks                      | 1.2                 |                       | Show row-level locking information                                                                                     |
| pgstattuple                     | 1.5                 |                       | Show tuple-level statistics                                                                                            |
| pljava                          | 1.6.6               |                       | PL/Java procedural language [PL/Java](https://tada.github.io/pljava/)                                                  |
| plpgsql                         | 1.0                 | 1.0                   | PL/pgSQL procedural language                                                                                           |
| postgis                         | 3.4.0               | 3.4.0                 | PostGIS geometry and geography spatial types and functions                                                             |
| postgis_raster                  | 3.4.0               |                       | PostGIS raster types and functions                                                                                     |
| postgis_tiger_geocoder          | 3.4.0               |                       | PostGIS tiger geocoder and reverse geocoder                                                                            |
| postgis_topology                | 3.4.0               |                       | PostGIS topology spatial types and functions                                                                           |
| postgres_fdw                    | 1.1                 |                       | Foreign-data wrapper for remote PostgreSQL servers                                                                     |
| refint                          | 1.0                 |                       | Functions for implementing referential integrity (obsolete)                                                            |
| seg                             | 1.4                 |                       | Data type for representing line segments or floating-point intervals                                                   |
| sslinfo                         | 1.2                 |                       | Information about SSL certificates                                                                                     |
| tablefunc                       | 1.0                 |                       | Functions that manipulate whole tables, including crosstab                                                             |
| tcn                             | 1.0                 |                       | Triggered change notifications                                                                                         |
| tsm_system_rows                 | 1.0                 |                       | TABLESAMPLE method which accepts number of rows as a limit                                                             |
| tsm_system_time                 | 1.0                 |                       | TABLESAMPLE method which accepts time in milliseconds as a limit                                                       |
| unaccent                        | 1.1                 |                       | Text search dictionary that removes accents                                                                            |
| uuid-ossp                       | 1.1                 |                       | Generate universally unique identifiers (UUIDs)                                                                        |
| xml2                            | 1.1                 |                       | XPath querying and XSLT                                                                                                |

<br>

**Wenn Sie Ihre DBaas-Konfiguration anpassen möchten oder einen nicht aufgeführten Parameter ändern wollen, eröffnen Sie bitte ein [Ticket](https://customerservice.plusserver.com/support/ticket-create).**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie Ihre DBaaS-Einstellungen direkt in unserem Kundenportal ändern können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
