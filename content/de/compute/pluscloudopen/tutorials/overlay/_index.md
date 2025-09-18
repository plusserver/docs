---
#https://gohugo.io/content-management/page-bundles/
title: "Instanzen AZ-übergreifend per Overlay-VPN vernetzen"
type: "docs"
weight: 1
date: 2025-09-17
description: >
  Vernetzen Sie Instanzen über AZ-Grenzen hinweg mit Hilfe eines Overlay-VPNs
---

## Überblick

Es kann sinnvoll sein Instanzen, die sich in verschiedenen Availability Zonen (AZ) befinden, über ein Overlay-VPN zu vernetzen. Klassische Beispiele wären z. B. Datenbankreplikation, Failovercluster oder das Einbinden weiterer plusserver Produkte wie Instanzen aus der [pluscloud VMware](https://www.plusserver.com/produkt/pluscloud-vmware/) oder [Dedicated Server](https://www.plusserver.com/produkt/dedicated-server/). 

In diesem Tutorial wird vorgestellt, dies mit Hilfe von [Nebula](https://github.com/slackhq/nebula/) zu realisieren. Lesen Sie dazu bitte auch die [Nebula Dokumentation](https://nebula.defined.net/docs/).

## Voraussetzungen

Dieses Tutorial geht davon aus, dass Sie bereits über zwei OpenStack Instanzen in verschiedenen AZs der pluscloud open verfügen, die Sie miteinander vernetzen wollen. Weiterhin benötigen Sie eine dritte Instanz, entweder in einer der bestehenden Umgebungen oder in einer dritten.

## Certificate Authority (CA) erzeugen

Um Zertifikate für Instanzen erzeugen zu können, wird eine Certificate Authority (CA) benötigt. Um diese zu erzeugen, laden Sie zunächst die Nebula-Binaries von https://github.com/slackhq/nebula/releases für Ihre Plattform herunter und packen Sie als User "root" im Verzeichnis `/usr/local/bin` aus.


    laptop $ ~ → sudo tar -xvzf Downloads/nebula-linux-amd64.tar.gz -C /usr/local/bin 
    nebula
    nebula-cert
    laptop $ ~ → sudo chmod +x /usr/local/bin/nebula*

Legen Sie ein Verzeichnis `nebula-ca` an, wechseln Sie hinein und erzeugen Sie die CA:

    laptop $ ~ → mkdir nebula-ca
    mkdir: Verzeichnis 'nebula-ca' angelegt
    laptop $ ~ → cd nebula-ca/
    /data/nebula-ca
    laptop $ nebula-ca → nebula-cert ca -name "My New CA"
    laptop $ nebula-ca → ls
    ca.crt  ca.key

Die Datei `ca.key` enthält den Schlüssel, mit dem alle folgenden Zertifikate unterschrieben werden. Sie sollten sie gut aufheben und ggfs. zusätzlich verschlüsseln (z. B. mit gpg). Die Datei sollte _nicht_ auf Ihre Lighthouse Instanz oder auf andere Instanzen kopiert werden. Die so erzeugte CA hat eine Gültigkeit von einem Jahr. Danach müssen die Zertifikate erneuert werden. Der Parameter `-duration` erlaubt es, länger gültige Schlüssel zu erzeugen. 

Jetzt können wir uns dem Aufbau des Overlay-VPN zuwenden.

## Lighthouse erstellen

Der erste Schritt zum Aufbau des Overlay-VPN ist die Erstellung einer sogenannten "Lighthouse" Instanz. Sie wird benötigt, damit sich die verschiedenen Instanzen gegenseitig finden können. Die Lighthouse Instanz benötigt nur geringe CPU- und Memory-Ressourcen. Wichtig ist, dass sie über den UDP-Port 4242 aus dem Internet erreichbar ist. Erstellen Sie zunächst ein Zertifikat für die Lighthouse Instanz mit Hilfe Ihrer neuen CA:

    laptop $ nebula-ca → nebula-cert sign -name "leuchtturm1" -ip "10.10.10.1/24"
    laptop $ nebula-ca → ls leucht*
    leuchtturm1.crt  leuchtturm1.key

Auch hier könnte die "Haltbarkeit" des Zertifikates mit dem Parameter `-duration` angepasst werden.

Im zweiten Schritt muß eine Konfigurationsdatei für die Lighthouse Instanz erstellt werden. Nebula bietet eine [Beispieldatei](https://github.com/slackhq/nebula/blob/master/examples/config.yml) auf Github zum Download an. In unserem Beispiel könnte die `config.yaml` wie folgt aussehen:

    pki:
      ca: /etc/nebula/ca.crt
      cert: /etc/nebula/leuchtturm1.crt
      key: /etc/nebula/leuchtturm1.key

    static_host_map:

    lighthouse:
      am_lighthouse: true
      interval: 60
      hosts:

    listen:
      host: 0.0.0.0
      port: 4242

    firewall:
      outbound_action: drop
      inbound_action: drop

      conntrack:
        tcp_timeout: 12m
        udp_timeout: 3m
        default_timeout: 10m

      outbound:
        - port: any
          proto: any
          host: any

      inbound:
        - port: any
          proto: icmp
          host: any

Auf der Instanz, auf der das Lighthouse laufen soll, erzeugen Sie das Verzeichnis `/etc/nebula` und kopieren Sie die obige Konfigurationsdatei `config.yaml`, die beiden bei der Zertifikatserstellung entstandenen Dateien (`leuchtturm1.crt` und `leuchtturm1.key`) sowie die Zertifikatsdatei Ihrer CA - `ca.crt` - dorthin.

Als Nächstes benötigen Sie folgende Startdatei für den Dienst, damit dieser über systemd gestartet werden kann:

    [Unit]
    Description=Nebula overlay networking tool
    Wants=basic.target network-online.target nss-lookup.target time-sync.target
    After=basic.target network.target network-online.target
    Before=sshd.service

    [Service]
    Type=notify
    NotifyAccess=main
    SyslogIdentifier=nebula
    ExecReload=/bin/kill -HUP $MAINPID
    ExecStart=/usr/local/bin/nebula -config /etc/nebula/config.yaml
    Restart=always
 
    [Install]
    WantedBy=multi-user.target

Speichern Sie diese unter `/etc/systemd/system/nebula.service` und laden Sie die systemd-Konfiguration mit `sudo systemctl daemon-reload` neu. Danach können Sie den neuen Dienst mit `sudo systemctl enable nebula.service` aktivieren. Mit `sudo systemctl start nebula` sollte der Dienst dann starten.

Mit `ip addr show nebula1` sollte dann ungefähr so eine Ausgabe erscheinen:

    nl $ ~ → ip addr show nebula1
    4: nebula1: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1300 qdisc fq_codel state UNKNOWN group default qlen 500
        link/none 
        inet 10.10.10.1/24 scope global nebula1
           valid_lft forever preferred_lft forever
        inet6 fe80::2002:e730:cd87:a72f/64 scope link stable-privacy 
           valid_lft forever preferred_lft forever

Das `nebula1` Interface sollte die IP-Adresse haben, die Sie vorher bei der Erstellung des Zertifikats ausgesucht haben. In OpenStack muss der Instanz eine Floating-IP zugeordnet werden, damit diese aus dem Internet erreichbar ist. Zusätzlich sollten Sie eine Security-Group erzeugen, die sicherstellt, dass die Instanz nur auf dem UDP Port 4242 angesprochen werden kann.

Da das erste Lighthouse jetzt steht, können wir uns jetzt den anderen Instanzen zuwenden. 

## Nebula Instanzen konfigurieren

Auch für die "normalen" Instanzen, auf denen Nebula laufen soll, werden zunächst wieder Zertifikate von der CA benötigt. Wir erzeugen Sie wie gehabt:

    laptop $ nebula-ca → nebula-cert sign -name "prod1-postgresql-0" -ip "10.10.10.2/24"
    laptop $ nebula-ca → nebula-cert sign -name "prod4-postgresql-0" -ip "10.10.10.3/24"

Und natürlich muss auch auf jede Instanz, auf der Nebula laufen soll, das entsprechende Binary heruntergeladen werden und nach `/usr/local/bin` kopiert werden (s. o.).

Für die Instanzen werden etwas ausführlichere Konfigurationsdateien benötigt als für das Lighthouse:

    pki:
      ca: /etc/nebula/ca.crt
      cert: /etc/nebula/prod1-postgres-0.crt
      key: /etc/nebula/prod1-postgres-0.key

    static_host_map:
      "10.10.10.1": ["<public ip von leuchtturm1>:4242"]

    lighthouse:
      am_lighthouse: false
      interval: 60
      hosts:
        - "10.10.10.1"

    listen:
      host: 0.0.0.0
      port: 4242

    punchy:
      punch: true

    relay:
      am_relay: false
      use_relays: true

    tun:
      disabled: false
      dev: nebula1
      drop_local_broadcast: false
      drop_multicast: false
      tx_queue: 500
      mtu: 1300

      routes:

      unsafe_routes:

    logging:
      level: info
      format: text

    firewall:
      outbound_action: drop
      inbound_action: drop

      conntrack:
        tcp_timeout: 12m
        udp_timeout: 3m
        default_timeout: 10m

      outbound:
        - port: any
          proto: any
          host: any

      inbound:
        - port: any
          proto: icmp
          host: any

        - port: 5432
          proto: tcp
          host: any

        - port: 8008
          proto: tcp
          host: any

Speichern Sie - wie beim Lighthouse - die auf die jeweilige Instanz angepasste Konfigurationsdatei (`config.yaml`), die passenden Zertifikatsdateien (`prod1-postgresql-0.crt` und `prod1-postgresql-0.key` bzw. `prod4-postgresql-0.crt` und `prod4-postgresql-0.key`) und das Zertifikat Ihrer CA - `ca.crt` - auf den jeweiligen Instanzen nach `/etc/nebula` (vorher oben unter "pki" den Namen der Zertifikatsdatei anpassen). Genau wie bei der Lighthouse-Instanz wird ebenfalls ein Nebula Startfile für systemd erzeugt, der Dienst enabled und dann gestartet. Danach sollte von beiden Instanzen die IP-Adresse der Lighthouse-Instanz pingbar sein

    root@prod1-postgresql-0:~# ping 10.10.10.1
    PING 10.10.10.1 (10.10.10.1) 56(84) bytes of data.
    64 bytes from 10.10.10.1: icmp_seq=1 ttl=64 time=1.73 ms
    64 bytes from 10.10.10.1: icmp_seq=2 ttl=64 time=1.73 ms 
    ^C
    --- 10.10.10.1 ping statistics ---
    2 packets transmitted, 2 received, 0% packet loss, time 1002ms
    rtt min/avg/max/mdev = 1.729/1.730/1.731/0.001 ms

Ausserdem sollten sich die Instanzen gegenseitig pingen können:

    root@prod1-postgresql-0:/etc/nebula# ping 10.10.10.3
    PING 10.10.10.3 (10.10.10.3) 56(84) bytes of data.
    64 bytes from 10.10.10.3: icmp_seq=1 ttl=64 time=1.69 ms
    64 bytes from 10.10.10.3: icmp_seq=2 ttl=64 time=1.91 ms
    64 bytes from 10.10.10.3: icmp_seq=3 ttl=64 time=1.84 ms
    ^C
    --- 10.10.10.3 ping statistics ---
    3 packets transmitted, 3 received, 0% packet loss, time 2004ms
    rtt min/avg/max/mdev = 1.687/1.813/1.914/0.094 ms

Für alle weiteren Instanzen gilt dasselbe Vorgehen:

1. Nebula Binary herunterladen und installieren
2. Zertifikat erstellen und die beiden Dateien auf die Instanz nach `/etc/nebula` kopieren
3. `ca.crt` Datei der CA auf die Instanz nach `/etc/nebula` kopieren
4. Konfigurationsdatei `config.yaml` für die Instanz erzeugen und nach `/etc/nebula` kopieren
5. Unit-File für systemd auf der Instanz erzeugen, den Dienst aktivieren und starten 

## Tipp
Wenn Sie planen dies in einer Produktionsumgebung zu nutzen, sollten Sie mehrere Lighthouse-Instanzen in verschiedenen Cloud-Umgebungen starten.
Weiterhin bietet die Firma [Defined Networking](https://www.defined.net/) Nebula in einer "managed" Variante an die erlaubt, das hier geschilderte Setup mit Hilfe einer [API](https://docs.defined.net/guides/automating-host-creation/), stark zu automatisieren. 




