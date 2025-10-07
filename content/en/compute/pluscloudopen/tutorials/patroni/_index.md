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

Vorher sollten Sie die Parameter `datacenter`, `node_name`, `retry_join` und `encrypt` auf Ihre Situation anpassen. Der Name des Datacenters muß zu Ihrem Consul Cluster passen und der Node Name könnte zum Beispiel dem Namen Ihrer VM entsprechen. Hinter `retry_join` müssen Sie die IP-Adressen Ihrer drei Consul Server aufführen und bei `encrypt` muß der Gossip Encryption Key Ihres Consul Clusters aufgeführt werden. Die Parameter `ca_file`, `cert_file` und `key_file` verweisen auf die Zertifikatsdateien Ihres Consul Clusters bzw. des Consul Clients.

    datacenter = "de-west"
    data_dir   =  "/opt/consul"
    log_level  =  "INFO"
    node_name  =  "prod4-postgresql-0"
    server     =  false
    leave_on_terminate = true

    retry_join = [ "100.102.1.30", "100.102.1.31", "100.102.1.32" ]

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


## PostgreSQL

Für den Aufbau des PostgreSQL Clusters muß auf beiden Clusterknoten die Datenbanksoftware installiert werden. Dazu benutzen wir die Softwarepakete, die für die verwendete Linux Distribution verfügbar sind. Zum Beispiel:

    sudo apt-get -y install postgresql-14
    sudo apt-get -y install postgresql-contrib

Nach der Installation sollte sichergestellt werden, dass der Datenbankdienst nicht automatisch gestartet wird. Wir möchten, dass Patroni die Datenbanksoftware stoppen und starten kann:

    sudo systemctl disable postgresql.service

Weiterhin sollten Sie ein Verzeichnis anlegen, in welchem Patroni die Datenbank erzeugen kann. Das Verzeichnis sollte nicht von den Softwarepaketen der Linux Distribution verwendet oder verwaltet werden. Das Verzeichnis muß dem User "postgres" gehören und passende Rechte zugewiesen bekommen. Zum Beispiel so: 

    mkdir -p /var/lib/postgresql/data
    chown postgres:postgres /var/lib/postgresql/data
    chmod 0700 /var/lib/postgresql/data

Zusätzlich werden noch die Pakete `python-psycopg2` und `pgbackrest` benötigt:

     sudo apt-get -y install python3-psycopg2
     sudo apt-get -y install pgbackrest


## Patroni

Als Letztes erfolgt die Installation von Patroni. Patroni ist in Python geschrieben und lässt sich am einfachsten mit dem Python Package Installer (pip) installieren. Je nach Linux Distribution muß dieser möglicherweise selbst erst installiert werden:

    sudo apt-get -y install python3-pip

Ist das geschehen, kann danach gleich Patroni installiert werden. Da wir Consul als DCS verwenden wollen, wählen wir die Consul Variante:

    sudo pip3 install patroni[consul]

Da Patroni kein Unit File für systemd mitinstalliert, müssen wir dies selbst hinzufügen. Öffnen Sie dazu in einem Editor die Datei `/etc/systemd/system/patroni.service` und kopieren Sie untenstehenden Inhalt hinein:

    [Unit]
    Description=Runners to orchestrate a high-availability PostgreSQL
    After=network.target
    ConditionPathExists=/var/lib/postgresql/patroni.yml

    [Service]
    Type=simple

    User=postgres
    Group=postgres

    # Read in configuration file if it exists, otherwise proceed
    EnvironmentFile=-/etc/patroni_env.conf

    # the default is the user's home directory, and if you want to change it, you must provide an absolute path.
    # WorkingDirectory=/home/sameuser

    # Pre-commands to start watchdog device
    # Uncomment if watchdog is part of your patroni setup
    #ExecStartPre=-/usr/bin/sudo /sbin/modprobe softdog
    #ExecStartPre=-/usr/bin/sudo /bin/chown postgres /dev/watchdog

    # Start the patroni process
    ExecStart=/usr/local/bin/patroni /var/lib/postgresql/patroni.yml

    # Send HUP to reload from patroni.yml
    ExecReload=/bin/kill -s HUP $MAINPID

    # only kill the patroni process, not it's children, so it will gracefully stop postgres
    KillMode=process

    # Give a reasonable amount of time for the server to start up/shut down
    TimeoutSec=30

    # Do not restart the service if it crashes, we want to manually inspect database on failure
    Restart=no

    [Install]
    WantedBy=multi-user.target

Speichern Sie die Datei ab.

Wie wir sehen, wird patroni als User "postgres" laufen. Erzeugen Sie bitte noch mit einem Editor die Datei `/etc/patroni_env.conf` und kopieren Sie den untenstehenden Inhalt hinein:

    PATH=$PATH:/usr/lib/postgresql/14/bin

Speichern Sie die Datei ab. Hier wird der Pfad angegeben, an dem Patroni die PostgreSQL Binaries finden kann, die wir vorher mit den Softwarepaketen der Linux Distribution installiert haben.

Weiterhin benötigt Patroni zum Start eine Konfigurationsdatei (`patroni.yml`). Die Konfiguration von Patroni hat viele Parameter, die in der entsprechenden [Dokumentation](https://patroni.readthedocs.io/en/latest/yaml_configuration.html) erläutert werden. Öffnen Sie die Datei als User "postgres" unter `/var/lib/postgresql/patroni.yml` und kopieren Sie den folgenden Inhalt hinein:

    scope: patroni42
    namespace: terra42
    name: prod1-postgresql-0

    restapi:
      listen: <instance-nebula-ip>:8008
      connect_address: <instance-nebula-ip>:8008

    consul:
      host: <instance-nebula-ip>:8500
      register_service: true
      cacert: /etc/consul/certificates/ca.pem
      cert: /etc/consul/certificates/cert.pem
      key: /etc/consul/certificates/private_key.pem
      dc: de-west

    bootstrap:
      dcs:
        ttl: 30
        loop_wait: 10
        retry_timeout: 10
        maximum_lag_on_failover: 1048576
        postgresql:
          use_pg_rewind: true
          use_slots: true
          parameters:

      # some desired options for 'initdb'
      initdb:  # Note: It needs to be a list (some options need values, others are switches)
      - encoding: UTF8
      - data-checksums

      pg_hba:  # Add following lines to pg_hba.conf after running 'initdb'
      - host replication replicator 127.0.0.1/32 md5
      - host replication replicator <instance-nebula-network> md5
      - host all all 0.0.0.0/0 md5
      - local all pmm md5

    # Additional script to be launched after initial cluster creation (will be passed the connection URL as parameter)
    # post_init: /usr/local/bin/setup_cluster.sh

      # Some additional users users which needs to be created after initializing new cluster
      users:
        admin:
          password: supergeheim
          options:
            - createrole
            - createdb

    postgresql:
      listen: "*:5432"
      connect_address: <instance-nebula-ip>:5432
      data_dir: /var/lib/postgresql/data
      pgpass: /tmp/pgpass0
      authentication:
        replication:
          username: replicator
          password: rep-pass
        superuser:
          username: postgres
          password: supergeheim
        rewind:  # Has no effect on postgres 10 and lower
          username: rewind_user
          password: rewind_password
      parameters:
        unix_socket_directories: '/var/run/postgresql'

    tags:
        nofailover: false
        noloadbalance: false
        clonefrom: false
        nosync: false

Es gibt einige Stellen in dieser Konfigurationsdatei, an denen Sie Anpassungen vornehmen müssen, die Ihr aktuelles Setup wiederspiegeln. Bei `name` sollten Sie den Namen Ihrer VM oder einen anderen sprechenden Namen eintragen. An den Stellen wo im Beispiel noch `<instance-nebula-ip>` steht, muß die IP-Adresse eingetragen werden, die die jeweilige VM im Overlay-VPN bekommen hat. Also bei `listen`, `connect_address` (kommt zweimal vor) und `host`. Bei `<instance-nebula-network>` sollten Sie die Netzwerkadresse des Overlay-VPNs in CIDR-Notation eintragen (also zum Beispiel `100.102.0.0/22`). 

Wenn Sie die Konfigurationsdateien für beide PostgreSQL-Server erzeugt haben können Sie auf den VMs nacheinander Patroni mit dem Kommando `systemctl start patroni` starten. Patroni sollte dann PostgreSQL starten und eine Replikation einrichten. Den Erfolg können Sie zum Beispiel mit `patronictl` überprüfen:

    postgres@postgresql-0:~$ patronictl -c patroni.yml list
    + Cluster: patroni42 (7550645978936616804) ---+-----------+----+-----------+
    | Member             | Host         | Role    | State     | TL | Lag in MB |
    +--------------------+--------------+---------+-----------+----+-----------+
    | prod1-postgresql-0 | 100.102.1.37 | Replica | streaming |  7 |         0 |
    | prod4-postgresql-0 | 100.102.1.36 | Leader  | running   |  7 |           |
    +--------------------+--------------+---------+-----------+----+-----------+

## Tipps

Natürlich gibt es rund um die Themen Consul und Patroni noch viele Dinge zu entdecken und einzurichten. Zum Beispiel kann es hilfreich sein, dnsmasq zu installieren und zu [konfgurieren](https://developer.hashicorp.com/consul/docs/manage/dns/forwarding/enable?page=services&page=discovery&page=dns-forwarding&page=enable) damit Consul DNS für alle Dienste auf den VMs funktioniert (auch auf den Datenbank Clients). Auf diese Weise lässt sich eventuell der Einsatz eines Loadbalancers einsparen:

    debian@nom-b544a874-fe78:~$ dig +short primary.patroni42.service.consul
    100.102.0.36
    debian@nom-b544a874-fe78:~$ dig +short replica.patroni42.service.consul
    100.102.0.37

Eine weitere interessante Komponente ist auch [Percona Monitoring and Management](https://docs.percona.com/percona-monitoring-and-management/3/index.html) welches sich hervorragend für Monitoring, Alerting und Analyse des Patroni Clusters eignet und dafür auch ein eigenes [Dashboard](https://docs.percona.com/percona-monitoring-and-management/3/reference/dashboards/dashboard-postgresql-patroni-details.html?h=patroni) mitbringt.

Und Patroni selbst hat natürlich auch noch viele weitere Fähigkeiten. Mit [wal-g](https://wal-g.readthedocs.io/) kann Patroni beispielsweise Backups direkt nach S3 speichern. Oder mit Hilfe der [Citus Extension](https://docs.citusdata.com/en/stable/installation/multi_node.html), [Multi-Node Citus Cluster](https://patroni.readthedocs.io/en/latest/citus.html) aufzubauen. Es lohnt sich auf jeden Fall, die [Patroni Dokumentation](https://patroni.readthedocs.io/en/latest/index.html) durchzugehen. 



