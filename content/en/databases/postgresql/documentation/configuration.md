---
title: "Configuration"
linkTitle: "Configuration"
type: "docs"
---

The parameters listed in the table represent the specific configuration settings that we customize from the default configuration provided by PostgreSQL. These parameters are tailored to suit our platform's requirements and are carefully selected to optimize performance and reliability.

> **Note:** Parameters marked with an asterisk (*) are dynamically calculated based on available compute resources, allowing for seamless vertical scaling.

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

### Column Explanation

- **Parameter:** This column lists the configuration parameters.
- **Type:** Indicates the data type of the configuration parameter (e.g., integer, string).
- **Default:** Displays the default value for each parameter.
- **Modifiable:** Indicates whether the parameter can be modified (`true`/`false`).
- **Restart Required:** Specifies whether a server restart is required for changes to take effect (`true`/`false`).
- **Min:** Shows the minimum permissible value for numeric parameters.
- **Max:** Displays the maximum permissible value for numeric parameters.
- **Allowed Values:** Lists the values allowed for string parameters.

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

**For custom DBaaS configurations including parameters not listed above, please submit a [support ticket](https://customerservice.plusserver.com/support/ticket-create) to our team.**

>*We're working on a feature to let you directly modify configuration parameters in our customer portal. Until then we thank you for your patience as we improve our services.*
