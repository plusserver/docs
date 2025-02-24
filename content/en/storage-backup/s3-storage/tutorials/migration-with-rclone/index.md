---
title: "Data Migration with rclone"
linkTitle: "Data Migration with rclone"
type: "docs"
weight: 120
date: "2024-02-07"
---

In this section, we will guide you on how to migrate data from our existing S3 solution to the new S3 solution using the **"rclone"** tool. Rclone is a powerful command-line tool that allows you to seamlessly copy and synchronize data between different cloud storage providers. This step serves as a practical example to illustrate how to efficiently and smoothly perform data migration between S3 buckets.

### Step 1: Installing rclone

To ensure comprehensive support for modern S3 features, we strongly recommend always using the latest version of rclone. If you install it using the package manager of common Linux distributions (such as Debian, Ubuntu, RHEL, CentOS), the latest version may not always be available. To follow the content of this guide optimally, we recommend downloading and installing rclone directly from the [official website](https://rclone.org/install/).

Example youtube Video with configuration + migration:

[Videolink](https://youtu.be/de5WQ8oGEfs?si=agUt4q7ZQKAS3gkh)

[![](https://i.ytimg.com/vi/de5WQ8oGEfs/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBMgPyh_MA8=&rs=AOn4CLAZX6zx_jZM0mikGg7X_qOywXdJPQ)](https://youtu.be/de5WQ8oGEfs?si=agUt4q7ZQKAS3gkh)

### Step 2: Configuring rclone via rclone Configuration Guide

To interact with your storage solutions, including access credentials, they need to be configured for rclone. The following steps must be repeated for all storages (not buckets) you want to migrate from or to.

Rclone provides an interactive configuration wizard via `rclone config`.

{{% alert title="Note" %}}
In case of an error message `NOTICE: Config file "/home/<user>/.config/rclone/rclone.conf" not found - using defaults`, you can create it with `mkdir -p ~/.config/rclone && touch $_/rclone.conf`.
{{% /alert %}}

```bash
rclone config

No remotes found, make a new one?

    n) New remote
    s) Set configuration password
    q) Quit config
    n/s/q>
```

After selecting n + Enter to create a new remote, you will be prompted to give it a name.

This name will be referenced in path specifications later, so choose a short but unambiguous name for your respective remotes, e.g., s3-old and s3-new.

Next, rclone presents a variety of different storage types to choose from.

```bash
1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
 3 / Alias for an existing remote
   \ (alias)
 4 / Amazon Drive
   \ (amazon cloud drive)
 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, ArvanCloud [...] Qiniu and Wasabi
   \ (s3)
 6 / Backblaze B2
   \ (b2)

    .
    .
    .

51 / seafile
   \ (seafile)
Storage> _
```

In this case, type s3 or 5 and confirm with Enter.

Next, specify your respective provider. Choose the appropriate option for our S3-compatible systems, which is Other or 27, and confirm with Enter.

```bash
Option provider.
Choose your S3 provider.
Choose a number from below, or type in your own string value.
Press Enter for the default (exit).
 1 / Amazon Web Services (AWS) S3
   \ (AWS)
 2 / Alibaba Cloud Object Storage System (OSS) formerly Aliyun
   \ (Alibaba)
 3 / Arvan Cloud Object Storage (AOS)
   \ (ArvanCloud)

    .
    .
    .

26 / Qiniu Object Storage (Kodo)
   \ (Qiniu)
27 / Any other S3 compatible provider
   \ (Other)
provider> _
```

The configuration wizard asks whether you want to enter your credentials manually or retrieve them from environment variables or IAM. Choose 1 for manual entry.

```bash
Option env_auth.
Get AWS credentials from runtime (environment variables or EC2/ECS meta data if no env vars).
Only applies if access_key_id and secret_access_key is blank.
Choose a number from below, or type in your own boolean value (true or false).
Press Enter for the default (false).
 1 / Enter AWS credentials in the next step.
   \ (false)
 2 / Get AWS credentials from the environment (env vars or IAM).
   \ (true)
env_auth> _
```

Next, the configuration wizard asks for the region of the remote. Please choose option 1.

```bash
Leave blank if you are using an S3 clone and you don't have a region.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
   / Use this if unsure.
 1 | Will use v4 signatures and an empty region.
   \ ()
   / Use this only if v4 signatures don't work.
 2 | E.g. pre Jewel/v10 CEPH.
   \ (other-v2-signature)
region> _

Now you need to provide the appropriate endpoints:

bash

Endpoint for S3 API.
Required when using an S3 clone.
Enter a value. Press Enter to leave empty.
endpoint> _
```

Here is an overview of the service endpoint migration from our old S3 service to the new S3 service:

| Region | Old S3 Service | New S3 Service |
|-------------------------|----------------------------------------------|----------------------------------------------|
| de-north-2 (Hamburg) | [https://de-2.s3.psmanaged.com](https://de-2.s3.psmanaged.com) | [https://s3.de-north-2.psmanaged.com](https://s3.de-north-2.psmanaged.com) |
| de-west-1 (Cologne) | (not available) | [https://s3.de-west-1.psmanaged.com](https://s3.de-west-1.psmanaged.com) |
| de-west-2 (Dusseldorf) | [https://de-4.s3.psmanaged.com](https://de-4.s3.psmanaged.com) | (Planned) |

For detailed information on the new service endpoints, we recommend to read the updated [documentation.](/storage-backup/s3-storage/introduction/s3-regions/).

If you have further questions or need additional support, feel free to reach out.

Location constraints are irrelevant for our use case, so you can simply skip the last step by pressing Enter.

```bash
Option location_constraint.
Location constraint - must be set to match the Region.
Leave blank if not sure. Used when creating buckets only.
Enter a value. Press Enter to leave empty.
location_constraint>
```

### Step 3: Using rclone

Basic syntax of rclone:

```bash
rclone [options] subcommand <parameters> <parameters...>
```

The syntax for the paths passed to the rclone command is as follows:

{{% alert title="Info" %}}
On Windows, you can use \ instead of / only in local paths. Non-local paths must use /.
For more information on Windows-specific paths, refer to [here](https://rclone.org/local/#paths-on-windows).
{{% /alert %}}

```bash
/path/to/dir
```

This refers to the local file system.

```bash
remote:path/to/dir
```

This refers to a directory path/to/dir on remote:, as defined in the configuration file (configured with rclone config).

Here are some application examples:

Migrating buckets WITHOUT ObjectLock and WITHOUT Versioning

```bash
rclone sync old-s3:mybucket new-s3:mybucket --metadata --checksum --progress --no-update-modtime
```

Migrating buckets WITH VERSIONING

```bash
rclone sync old-s3:mybucket new-s3:mybucket --metadata --checksum --progress --s3-versions
```

### Explanation of rclone Sync Command Parameters

For a more detailed documentation and additional options, we recommend checking the rclone documentation. Here is an overview of the current documentation.

| Parameter                 | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sync`**                | Synchronizes the source with the destination, updating only the destination. It does not transfer files that are identical in source and destination but compares based on size and modification time or MD5SUM. The destination is updated to match the source, including deleting files if necessary (except for duplicate objects). If you don't want to delete files in the destination, use the `copy` command instead. |
| **`old-s3:mybucket`**     | References the `mybucket` bucket in the `old-s3` remote, representing the source of the synchronization.                                                                                                                                                                                                                                                                                                                     |
| **`new-s3:mybucket`**     | References the `mybucket` bucket in the `new-s3` remote, representing the destination of the synchronization.                                                                                                                                                                                                                                                                                                                |
| **`--metadata`**          | Metadata is information about a file that is not the content of the file. Normally, rclone only preserves modification time and content (MIME type) where possible. Rclone supports retaining all available metadata of files (not directories) when using the `--metadata` or `-M` flag.                                                                                                                                    |
| **`--checksum`**          | Normally, rclone checks the modification time and size of files to determine if they are the same. If you set this flag, rclone checks by hashing and size to see if the files are the same. This process leads to significantly faster transfer in an S3 → S3 migration.                                                                                                                                                    |
| **`--progress`**          | This flag instructs rclone to update statistics in a static block in the terminal to provide a real-time overview of the transfer. All log messages are displayed above the static block. Log messages push the static block to the bottom of the terminal, where it remains.                                                                                                                                                |
| **`--no-update-modtime`** | If you use this flag, rclone does not update the modification times of migrated objects. This is useful if you want to retain the original modification times.                                                                                                                                                                                                                                                               |
