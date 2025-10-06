---
#https://gohugo.io/content-management/page-bundles/
title: "PostgreSQL Cluster AZ-übergreifend mit Patroni aufbauen"
type: "docs"
weight: 1
date: 2025-10-02
description: >
  Erzeugen Sie einen PostgreSQL Cluster in zwei AZs mit Hilfe eines Overlay-VPNs und Patroni
---

## Überblick

Viele Kunden haben den Wunsch, Infrastruktur möglichst ausfallsicher aufzubauen. Das schließt oft auch den Betrieb von Datenbankclustern an zwei unabhängigen Standorten bzw. Rechenzentren mit ein. Dieses Tutorial zeigt, wie man ein PostgreSQL Cluster in zwei verschiedenen Availability Zonen (AZs) mit Hilfe eines Overlay-VPNs ([Nebula](https://github.com/slackhq/nebula/)) und [Patroni](https://patroni.readthedocs.io/en/latest/)  aufbaut. 

## Voraussetzungen

Dieses Tutorial geht davon aus, dass Sie bereits über ein funktionierendes Consul Cluster verfügen, welches Teil Ihres Overlay-VPNs ist (der Aufbau eines Consul Clusters über mehrere AZs wird Gegenstand eines anderen Tutorials). Weiterhin benötigen Sie zwei OpenStack-Umgebungen mit mindestens je einer Instanz für die PostgreSQL Datenbanken in verschiedenen AZs der pluscloud open (am besten in einer Region), die Sie zu einem Cluster verbinden wollen und die ebenfalls bereits Teil des Overlay-VPNs auf Basis von Nebula sind (die Verbindung von VMs über ein Overlay-VPN) ist Gegenstand eines anderen [Tutorials](https://docs.plusserver.com/de/compute/pluscloudopen/tutorials/overlay/).

## Consul Client installieren

Patroni verwendet einen "Distributed Configuration Store" (DCS), um den PostgreSQL Cluster zu koordinieren und zu verwalten. Ein von Patroni unterstützter DCS ist Consul. Der Consul Client stellt die Verbindung zum Consul Cluster her und muß deshalb auf den VMs installiert werden, auf denen auch PostgreSQL installiert werden soll.

Die Installation ist denkbar einfach: Wir laden uns die aktuelle Consul Version bei [Hashicorp](https://releases.hashicorp.com/consul/) für unser Betriebssystem herunter und installieren sie im Verzeichnis `/usr/local/bin`. Unter Linux also etwa

    root@postgresql-0 ~ → wget -c -q https://releases.hashicorp.com/consul/1.21.5/consul_1.21.5_linux_amd64.zip
    root@postgresql-0 ~ → unzip consul_1.21.5_linux_amd64.zip
    Archive:  consul_1.21.5_linux_amd64.zip
      inflating: LICENSE.txt             
      inflating: consul            
    root@postgresql-0 ~ → mv consul /usr/local/bin
    root@postgresql-0 ~ → chmod +x /usr/local/bin/consul

Jetzt benötigen wir noch ein Unit-File, damit wir Consul per systemd starten und stoppen können. Erzeugen Sie dazu mit einem Editor als User "root" die Datei `/etc/systemd/system/consul.service`, kopieren Sie den untenstehenden Inhalt hinein und speichern Sie die Datei ab. 

    [Unit]
    Description="HashiCorp Consul - A service mesh solution"
    Documentation=https://www.consul.io/
    Requires=network-online.target
    After=network-online.target
    ConditionFileNotEmpty=/etc/consul/consul.hcl

    [Service]
    EnvironmentFile=-/etc/consul.d/consul.env
    User=consul
    Group=consul
    ExecStart=/usr/local/bin/consul agent -config-dir=/etc/consul/
    ExecReload=/bin/kill --signal HUP $MAINPID
    KillMode=process
    KillSignal=SIGTERM
    Restart=on-failure
    LimitNOFILE=65536

    [Install]
    WantedBy=multi-user.target

Anschliessend sollten Sie die systemd Konfiguration mit dem Kommando `systemctl daemon-reload` neu einlesen. 

Wie im systemd Unit-File angegeben, erwartet Consul seine Konfiguration im Verzeichnis `/etc/consul`. Zusätzlich soll der Dienst vom User "consul" in der Gruppe "consul" ausgeführt werden und sein Heimatverzeichnis soll `/opt/consul` werden. Legen Sie also zunächst den neuen User und die Gruppe mit dem Kommando `useradd -d /opt/consul consul` an, erzeugen Sie sein Homeverzeichnis mit `mkdir -p /opt/consul` und geben Sie ihm mit dem Kommando `chown -R consul:consul /opt/consul` Zugriff auf sein eigenes Homeverzeichnis.

Erzeugen Sie nun die Consul Konfiguration in dem Sie als User "root" die Datei `/etc/consul/consul.hcl` in einem Editor öffnen. Kopieren Sie dann den untenstehenden Inhalt hinein und speichern Sie die Datei ab. 

Vorher sollten Sie die Parameter `datacenter`, `node_name`, `retry_join` und `encrypt` auf Ihre Situation anpassen. Der Name des Datacenters muß zu Ihrem Consul Cluster passen und der Node Name könnte z. B. dem Namen Ihrer VM entsprechen. Hinter `retry_join` müssen Sie die IP-Adressen Ihrer drei Consul Server aufführen und bei `encrypt` muß der Gossip Encryption Key Ihres Consul Clusters aufgeführt werden. Die Parameter `ca_file`, `cert_file` und `key_file` verweisen auf die Zertifikatsdateien Ihres Consul Clusters.

    datacenter = "de-west"
    data_dir   =  "/opt/consul"
    log_level  =  "INFO"
    node_name  =  "prod4-postgresql-0"
    server     =  false
    leave_on_terminate = true

    retry_join = [ "100.102.0.30", "100.102.0.31", "100.102.0.32" ]

    encrypt    = "myencryptionkey"

    tls {
      defaults {
        ca_file    = "/etc/consul/certificates/ca.pem"
        cert_file  = "/etc/consul/certificates/cert.pem"
        key_file   = "/etc/consul/certificates/private_key.pem"
      }
    }

    auto_encrypt = {
      tls = true
    }

    bind_addr      = "{{ GetInterfaceIP \"nebula1\" }}"
    advertise_addr = "{{ GetInterfaceIP \"nebula1\" }}"
    client_addr    = "{{ GetInterfaceIP \"nebula1\" }}"

    addresses {
       http     = "{{ GetInterfaceIP \"nebula1\" }}"
       https    = "{{ GetInterfaceIP \"nebula1\" }}"
       grpc     = "{{ GetInterfaceIP \"nebula1\" }}"
    }



tls, interface binding, systemd unit file

    [Unit]
    Description="HashiCorp Consul - A service mesh solution"
    Documentation=https://www.consul.io/
    Requires=network-online.target
    After=network-online.target
    ConditionFileNotEmpty=/etc/consul/consul.hcl

    [Service]
    EnvironmentFile=-/etc/consul.d/consul.env
    User=consul
    Group=consul
    ExecStart=/usr/local/bin/consul agent -config-dir=/etc/consul/ -bind '{{ GetInterfaceIP "defined1" }}'
    ExecReload=/bin/kill --signal HUP $MAINPID
    KillMode=process
    KillSignal=SIGTERM
    Restart=on-failure
    LimitNOFILE=65536

    [Install]
    WantedBy=multi-user.target


## PostgreSQL

Verzeichnis anlegen, postgres:postgres und 0700 setzen
postgres pakete der distribution installieren (postgresql-15, postgresql-contrib)
postgres-service im systemd disablen (patroni soll die kontrolle haben)
python-psycopg2 (paket installieren
ggfs. postgres-extensions installieren (z. B. Citus)
pgbackrest ((paket) installieren 

## Patroni

patroni mit python installieren (pip3 install patroni[consul])
systemd unit file
patroni.yml erstellen, rechte der Datei anpassen (postgres:postgres) in /var/lib/postgresql (s. template-file für große instanz)
patroni starten (systemctl enable patroni ; systemctl start patroni)




## Tipp

Hinweis auf PMM, wal-g



