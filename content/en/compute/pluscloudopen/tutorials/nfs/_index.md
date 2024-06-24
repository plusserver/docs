---
#https://gohugo.io/content-management/page-bundles/
title: "Mount a plusstorage NFS volume"
type: "docs"
weight: 1
date: 2024-06-21
description: >
  Mount a plusstorage NFS volume in one or more pluscloudopen instances
---

## Prerequisites

* At least one running instance on pluscloudopen.
* At least one plusstorage NFS volume along with the required information like IP address and volume name. This information should have been provided after the deployment in the plusserver infrastructure.

## Software Installation

To mount an NFS volume in your pluscloudopen instance, the package `nfs-common` needs to be installed (if it is not installed already). On Debian-Linux, it can be installed with this command:

```bash
sudo apt-get install nfs-common
```

## Create a Mount Point

To make the NFS volume available in the filesystem, it has to be "mounted" to a directory in the filesystem. Such a directory is called a "mount point". A mount point can be created with the command:

```bash
sudo mkdir /nfs
```

## Edit `/etc/fstab`

To ensure that the volume is always mounted as soon as the instance is started, it needs to be added to the filesystem table (`/etc/fstab`). As `/etc/fstab` is a system file, it can only be edited by the "root" user. The default `/etc/fstab` is similar to this:

```bash
root@nfsv2-consumer:~# cat /etc/fstab
LABEL=cloudimg-rootfs / ext4 discard,errors=remount-ro 0 1
LABEL=UEFI /boot/efi vfat umask=0077 0 1
```

A line should be added to the file by opening it with an editor (e.g., `nano`) and adding the following line at the end. The information received after the volume was deployed by plusserver and the mount point created earlier should be used:

```bash
64.128.241.6:/sn100100 /nfs nfs defaults 0 0
```

The file `/etc/fstab` should be saved. It should look similar to this now:

```bash
root@nfsv2-consumer:~# cat /etc/fstab
LABEL=cloudimg-rootfs / ext4 discard,errors=remount-ro 0 1
LABEL=UEFI /boot/efi vfat umask=0077 0 1
64.128.241.6:/sn100100 /nfs nfs defaults 0 0
```

## Mount the Volume

The volume can now be mounted with this command:

```bash
sudo mount -a
```

It should show up when `df -h` is typed:

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

## Hints

The Network File System (NFS) has many use cases and can be adapted to these with various options.

### Mount a Volume to Multiple Instances

If the NFS volume needs to be mounted to multiple instances in pluscloudopen at the same time, it should be ensured that user IDs and group IDs of the users who want to read and write files on/from the volume are identical on all instances. It is not sufficient to use the same user name.

### Mount Options

It can be sensible or necessary to add mount options to `/etc/fstab`, e.g., to prevent the execution of binaries written to the NFS volume (`noexec`). Without adding options to the `/etc/fstab`, the NFS volume is mounted with default options. These can be seen by executing `sudo cat /proc/mounts | grep nfs`. In our example, they look like this:

```bash
root@nfsv2-consumer:~# cat /proc/mounts | grep nfs
64.128.241.6:/sn100100 /nfs nfs4 rw,relatime,vers=4.2,rsize=65536,wsize=65536,namlen=255,hard,proto=tcp,timeo=600,retrans=2,sec=sys,clientaddr=192.168.0.126,local_lock=none,addr=64.128.241.6 0 0
```

If options need to be added or customized, they should be added to `/etc/fstab` similar to this:

```bash
root@nfsv2-consumer:~# cat /etc/fstab | grep nfs
64.128.241.6:/sn100100 /nfs nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0
```

An overview of all available NFS options is available in the NFS manual page. It can be read by typing:

```bash
man nfs
```

All other options that can be used during mounting of filesystems can be seen in the `mount` manual page:

```bash
man mount
```

