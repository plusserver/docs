---
#https://gohugo.io/content-management/page-bundles/
title: "Ein plusstorage NFS Volume mounten"
type: "docs"
weight: 1
date: 2024-06-20
description: >
  Mounten Sie ein plusstorage NFS Volume in einer oder mehreren pluscloudopen Instanzen
---

## Voraussetzungen

* Mindestens eine laufende Instanz in der pluscloudopen.
* Mindestens ein plusstorage NFS Volume mit den zugehörigen Informationen (IP-Adresse und Volumename - diese sind Ihnen nach der Einrichtung durch plusserver zugegangen).

## Softwareinstallation

Um auf Ihrer pluscloudopen Instanz ein NFS-Volume mounten zu können, muss dort mindestens das Paket nfs-common installiert sein. Es kann z. B. auf Debian-Linux mit dem Kommando 

```bash
sudo apt-get install nfs-common
```

 installiert werden.

## Mountpoint anlegen

Um das NFS-Volume im Dateisystem der Instanz verfügbar zu machen, muss es an einem Punkt im Dateisystem eingehängt werden. Das ist ein Verzeichnis, welches deshalb auch "Mountpoint" genannt wird. Ein Mountpoint kann z. B. mit dem Kommando

```bash
sudo mkdir /nfs
```

angelegt werden.

## /etc/fstab editieren

Damit das Volume immer gemountet wird, sobald die Instanz gestartet wird, muss es in die Filesystemtabelle (`/etc/fstab`) eingetragen werden. Da es sich hierbei um eine Systemdatei handelt, kann diese nur vom User "root" editiert werden. Die normale `/etc/fstab` sieht ungefähr so aus:

```bash
root@nfsv2-consumer:~# cat /etc/fstab
LABEL=cloudimg-rootfs / ext4 discard,errors=remount-ro 0 1
LABEL=UEFI /boot/efi vfat umask=0077 0 1
```

Der Datei sollte eine weitere Zeile hinzugefügt werden, indem sie z. B. mit dem Editor `nano` geöffnet wird und die folgende Zeile angefügt wird. Die Informationen, die nach der Einrichtung durch Plusserver erhalten wurden, sowie der oben angelegte Mountpoint sollten verwendet werden:

```bash
64.128.241.6:/sn100100 /nfs nfs defaults 0 0
```

Die Datei `/etc/fstab` sollte gespeichert werden. Sie sollte jetzt z. B. so aussehen:

```bash
root@nfsv2-consumer:~# cat /etc/fstab
LABEL=cloudimg-rootfs / ext4 discard,errors=remount-ro 0 1
LABEL=UEFI /boot/efi vfat umask=0077 0 1
64.128.241.6:/sn100100 /nfs nfs defaults 0 0
```

## Volume mounten

Das Volume kann jetzt z. B. mit dem Kommando 

```bash
sudo mount -a
```

eingehängt werden. Mit dem Kommando `df -h` sollte es jetzt sichtbar sein:

```bash
root@nfsv2-consumer:~# df -h
Filesystem              Size  Used Avail Use% Mounted on
tmpfs                   794M  1.1M  793M   1% /run
/dev/sda1                20G  2.2G   18G  12% /
tmpfs                   3.9G     0  3.9G   0% /dev/shm
tmpfs                   5.0M     0  5.0M   0% /run/lock
/dev/sda15              105M  6.1M   99M   6% /boot/efi
tmpfs                   794M  4.0K  794M   1% /run/user/1013
64.128.241.6:/sn100100 1000G  704K 1000G   1% /nfs
```

## Tipps

Das Network File System (NFS) kennt viele Einsatzszenarien und kann mit verschiedenen Optionen auf diese angepasst werden.

### Mounten an mehreren Instanzen

Wenn das NFS-Volume gleichzeitig an mehreren pluscloudopen Instanzen gemountet werden soll, sollte sichergestellt werden, dass User-ID und Group-ID der User, die dort Dateien lesen und/oder schreiben können sollen, auf allen beteiligten Instanzen identisch sind. Es reicht nicht, wenn nur der Username identisch ist. 

### Mountoptionen

Je nach Einsatzzweck kann es sinnvoll sein, in der `/etc/fstab` zusätzliche Mountoptionen zu wählen, um z. B. das Ausführen von Programmen, die auf dem NFS-Volume gespeichert sind, zu unterbinden (`noexec`). Ohne die Angabe von zusätzlichen Optionen in der `/etc/fstab`, wird das NFS-Volume mit Standardoptionen gemountet. Welche das sind, kann mit dem Kommando `sudo cat /proc/mounts | grep nfs` angesehen werden. In unserem Beispiel sieht das so aus:

```bash
root@nfsv2-consumer:~# cat /proc/mounts | grep nfs
64.128.241.6:/sn100100 /nfs nfs4 rw,relatime,vers=4.2,rsize=65536,wsize=65536,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.0.126,local_lock=none,addr=64.128.241.6 0 0
```

Möchten diesen Optionen noch welche hinzugefügt oder diese angepasst werden, dann sollten sie wie folgt der `/etc/fstab` hinzugefügt werden:

```bash
root@nfsv2-consumer:~# cat /etc/fstab | grep nfs
64.128.241.6:/sn100100 /nfs nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0
```

Eine Übersicht über die verfügbaren Optionen für NFS gibt die Manual Page zu NFS, die mit 

```bash
man nfs
```

aufgerufen werden kann. Alle weiteren Optionen, die unabhängig von NFS verwendet werden können, sind der Manual Page zum `mount` Kommando zu entnehmen:

```bash
man mount
```

