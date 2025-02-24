---
title: "Datenmigration mit rclone"
linkTitle: "Datenmigration mit rclone"
type: "docs"
weight: 120
date: "2024-02-07"
---

In diesem Abschnitt zeigen wir Ihnen, wie Sie Daten von unserer bisherigen S3-Lösung auf die neue S3-Lösung migrieren können, indem Sie das Tool **"rclone"** verwenden. Rclone ist ein leistungsstarkes Kommandozeilen-Tool, das es Ihnen ermöglicht, Daten zwischen verschiedenen Cloud-Speicheranbietern nahtlos zu kopieren und zu synchronisieren. Dieser Schritt dient als praktisches Beispiel, um Ihnen zu veranschaulichen, wie Sie die Migration von Daten zwischen S3-Buckets effizient und problemlos durchführen können.

### Schritt 1: Installation von rclone

Um sicherzustellen, dass Sie umfassende Unterstützung für moderne S3-Funktionen erhalten, empfehlen wir dringend, stets die neueste Version von rclone zu verwenden. Bei der Installation über den Paketmanager gängiger Linux-Distributionen (wie Debian, Ubuntu, RHEL, CentOS) ist möglicherweise nicht immer die aktuellste Version verfügbar. Um den Inhalten dieses Leitfadens optimal zu folgen, empfehlen wir daher, rclone direkt von der [offiziellen Website](https://rclone.org/install/) herunterzuladen und zu installieren.

Beispielyoutube Video mit Konfiguration + Durchführung Migration:

[Videolink](https://youtu.be/de5WQ8oGEfs?si=agUt4q7ZQKAS3gkh)

[![](https://i.ytimg.com/vi/de5WQ8oGEfs/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBMgPyh_MA8=&rs=AOn4CLAZX6zx_jZM0mikGg7X_qOywXdJPQ)](https://youtu.be/de5WQ8oGEfs?si=agUt4q7ZQKAS3gkh)

### Schritt 2: Konfigurieren von rclone via Configuration Guide von rclone

Um mit Ihren Storage-Lösungen interagieren zu können, müssen diese - inklusive Zugangsdaten - für rclone hinterlegt werden. Die folgenden Schritte müssen für alle Storages (nicht Buckets), von oder zu denen migriert werden soll, wiederholt werden.

Rclone bietet einen interaktiven Konfigurationsassistenten via `rclone config`.

{{% alert title="Info" %}}
Bei einer Fehlermeldung `NOTICE: Config file "/home/<user>/.config/rclone/rclone.conf" not found - using defaults` kann diese mit `mkdir -p ~/.config/rclone && touch $_/rclone.conf` angelegt werden.
{{% /alert %}}

```bash
rclone config

No remotes found, make a new one?

    n) New remote
    s) Set configuration password
    q) Quit config
    n/s/q>
```

Nachdem mit n + Enter das Anlegen eines neuen Remotes ausgewählt wurde, werden Sie gebeten, ihm einen Namen zu geben.

Dieser Name wird später in Pfadangaben referenziert, also wählen Sie am besten einen kurzen, aber unmissverständlichen Namen für Ihre jeweiligen Remotes, z.B., `s3-old` und `s3-new`.

Nun präsentiert rclone eine Vielzahl verschiedener Storage-Typen, aus denen Sie wählen können.

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

In diesem Fall tippen Sie s3 bzw. 5 und bestätigen dies mit Enter.

Als Nächstes geben Sie Ihren jeweiligen Provider an. Wählen Sie die für unsere S3-kompatiblen Systeme angebrachte Option Other bzw. 27 und bestätigen Sie mit Enter.

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

Der Konfigurationsassistent fragt ab, ob Sie Ihre Zugangsdaten manuell eingeben möchten oder diese aus den Umgebungsvariablen bzw. dem IAM beziehen möchten. Wählen Sie die 1 für manuelle Eingabe.

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

Als Nächstes fragt der Konfigurationsassisstent die Region des Remotes ab. Bitte wählen Sie hier die Option 1.

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
```

Nun müssen noch die dementsprechenden Endpoints angegeben werden:

```bash

Endpoint for S3 API.
Required when using an S3 clone.
Enter a value. Press Enter to leave empty.
endpoint> _
```

Hier finden Sie eine Übersicht der Service-Endpoint-Migration von unserem alten S3-Service auf den neuen S3-Service:

| Region                 | Alter S3 Service                                               | Neuer S3 Service                                                           |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------- |
| de-north-2 (Hamburg)   | [https://de-2.s3.psmanaged.com](https://de-2.s3.psmanaged.com) | [https://s3.de-north-2.psmanaged.com](https://s3.de-north-2.psmanaged.com) |
| de-west-1 (Köln)       | (nicht verfügbar)                                              | [https://s3.de-west-1.psmanaged.com](https://s3.de-west-1.psmanaged.com)   |
| de-west-2 (Düsseldorf) | [https://de-4.s3.psmanaged.com](https://de-4.s3.psmanaged.com) | (In Planung)                                                               |

Für detaillierte Informationen zu den neuen Service-Endpoints empfehlen wir Ihnen, die aktualisierte [Dokumentation](/storage-backup/s3-storage/introduction/s3-regions/) aufzurufen.

Bei weiteren Fragen oder für zusätzliche Unterstützung stehen wir Ihnen gerne zur Verfügung.

Location constraints sind für unseren Anwendungszweck irrelevant. Der letzte Schritt kann daher einfach mit Enter übersprungen werden.

```bash
Option location_constraint.
Location constraint - must be set to match the Region.
Leave blank if not sure. Used when creating buckets only.
Enter a value. Press Enter to leave empty.
location_constraint>
```

### Schritt 3: Verwendung von rclone

Grundlegender Syntax von rclone:

```bash
rclone [options] subcommand <parameters> <parameters...>
```

Die Syntax der Pfade, die an den Befehl rclone übergeben werden, lautet wie folgt:
{{% alert title="Info" %}}
Unter Windows kann \ anstelle von / nur in lokalen Pfaden verwendet werden. Nicht-lokale Pfade müssen / verwenden. Weitere Informationen zu Windows-spezifischen Pfaden finden Sie [hier](https://rclone.org/local/#paths-on-windows).
{{% /alert %}}

```bash
/path/to/dir
```

Dies bezieht sich auf das lokale Dateisystem.

```bash
remote:path/to/dir
```

Dies bezieht sich auf ein Verzeichnis `path/to/dir` auf `remote:`, wie in der Konfigurationsdatei definiert (konfiguriert mit rclone config).

**Daraus ergeben sich folgende Anwendungsbeispiele:**

Migrieren von Buckets OHNE ObjectLock und OHNE Versionierung

```bash
rclone sync old-s3:mybucket new-s3:mybucket --metadata --checksum --progress --no-update-modtime
```

Migrieren von Buckets MIT VERSIONIERUNG

```bash
rclone sync old-s3:mybucket new-s3:mybucket --metadata --checksum --progress --s3-versions
```

### rclone Sync-Befehl Parametererklärung

Für eine ausführlichere Dokumentation und zusätzliche Optionen empfehlen wir, die rclone-Dokumentation aufzurufen. Hier erhalten Sie einen Abriss der aktuellen Dokumentation.

| Parameter                 | Erklärung                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sync`**                | Synchronisiert die Quelle mit dem Ziel, wobei nur das Ziel geändert wird. Überträgt keine Dateien, die in Quelle und Ziel identisch sind, sondern vergleicht anhand von Größe und Änderungszeit oder MD5SUM. Das Ziel wird so aktualisiert, dass es mit der Quelle übereinstimmt, einschließlich des Löschens von Dateien, falls erforderlich (außer bei doppelten Objekten). Wenn Sie die Dateien im Ziel nicht löschen wollen, verwenden Sie stattdessen den Befehl copy. |
| **`old-s3:mybucket`**     | Referenziert den Bucket mybucket im remote old-s3 und stellt hier die Quelle der Synchronisation dar.                                                                                                                                                                                                                                                                                                                                                                       |
| **`new-s3:mybucket`**     | Referenziert den Bucket mybucket im remote new-s3 und stellt hier das Ziel der Synchronisation dar.                                                                                                                                                                                                                                                                                                                                                                         |
| **`--metadata`**          | Metadaten sind Informationen über eine Datei, bei denen es sich nicht um den Inhalt der Datei handelt. Normalerweise bewahrt rclone nur die Änderungszeit und den Inhalt (MIME-Typ), wo dies möglich ist. Rclone unterstützt die Beibehaltung aller verfügbaren Metadaten von Dateien (nicht Verzeichnissen), wenn die Flag --metadata oder -M verwendet wird.                                                                                                              |
| **`--checksum`**          | Normalerweise prüft rclone die Änderungszeit und die Größe von Dateien, um festzustellen, ob sie gleich sind. Wenn Sie diese Flag setzen, prüft rclone durch Hashing und Größe, ob die Dateien gleich sind. Dieses Verfahren führt zu einer deutlich schnelleren Übertragung bei einer S3 → S3 Migration.                                                                                                                                                                   |
| **`--progress`**          | Diese Flag veranlasst rclone, die Statistiken in einem statischen Block im Terminal zu aktualisieren, um einen Echtzeit-Überblick über die Übertragung zu erhalten. Alle Protokollmeldungen werden über dem statischen Block angezeigt. Log-Meldungen schieben den statischen Block an den unteren Rand des Terminals, wo er verbleibt.                                                                                                                                     |
| **`--no-update-modtime`** | Wenn Sie dieses Flag verwenden, aktualisiert rclone die Änderungszeiten der migrierten Objekte nicht. Dies ist nützlich, wenn Sie die ursprünglichen Änderungszeiten beibehalten möchten.                                                                                                                                                                                                                                                                                   |
