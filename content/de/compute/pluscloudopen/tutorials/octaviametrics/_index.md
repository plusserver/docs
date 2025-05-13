---
#https://gohugo.io/content-management/page-bundles/
title: "Loadbalancermetriken erfassen mit Prometheus"
type: "docs"
weight: 1
date: 2025-05-13
description: >
  Erfassen Sie die Leistungsdaten Ihres Loadbalancers in einer eigenen Prometheus-Instanz
---

## Überblick

Wenn Sie einen oder mehrere Loadbalancer (Octavia) in Ihren Projekten einsetzen, ist es sinnvoll deren Leistungsdaten z. B. mit Prometheus zu erfassen und dann z. B. mit Grafana zu visualisieren.

In diesem Tutorial wird eine Möglichkeit vorgestellt, dies zu realisieren.

## Voraussetzungen

Dieses Tutorial geht davon aus, dass Sie bereits über ein OpenStack Projekt in der pluscloud open verfügen, dass in diesem Projekt mindestens eine Instanz (z. B. mit Ubuntu) läuft, auf der auch bereits Docker installiert ist. Weiterhin sollte die Instanz bereits über eine Floating-IP und via SSH von Ihnen erreichbar sein. Zusätzlich ist es hilfreich, wenn Sie den OpenStack-Client installiert haben, um Ihre Umgebung zu verwalten.

## Loadbalancer erzeugen

Als erstes, wird der Loadbalancer und der Listener für Prometheus erzeugt:

    openstack loadbalancer create --name testlb --vip-subnet-id <Ihr-Subnetz-Name> --wait
    openstack loadbalancer listener create --name stats-listener --protocol PROMETHEUS --protocol-port 8088 testlb

Für "Ihr-Subnetz-Name" müssen Sie Ihr gewünschtes Subnetz einsetzen. Mit dem OpenStack-Client können Sie diese einfach listen:

    openstack subnet list

Nachdem der Loadbalancer erzeugt ist, sollten Sie die `vip_address` mit

    openstack loadbalancer list

ermitteln und für später merken. Das könnte z. B. so aussehen:

    openstack loadbalancer show -c vip_address testlb

Nachdem ein Loadbalancer mit dem entsprechenden Listener erstellt worden ist, werden jetzt noch die Werkzeuge erstellt, um die Metriken einzusammeln und zu visualisieren.

## Prometheus und Grafana via docker-compose bereitstellen

Speichern Sie dazu die folgende Konfigurationsdatei unter dem Namen `docker-compose.yml` auf Ihrer OpenStack-Instanz in einem eigenen Verzeichnis (z. B. `/data/prometheus-grafana/`) ab (die drei Striche gehören dazu!). 

    ---
     
    volumes:
      prometheus_data:
      grafana_data:
    
    services:
      prometheus:
        image: prom/prometheus
        container_name: prometheus
        restart: unless-stopped
        volumes:
          - ./prometheus/:/etc/prometheus/
          - prometheus_data:/prometheus
        ports:
          - 9090:9090
        command:
          - '--config.file=/etc/prometheus/prometheus.yaml'
          - '--storage.tsdb.path=/prometheus'
      grafana:
        image: grafana/grafana
        container_name: grafana
        restart: unless-stopped
        volumes:
          - grafana_data:/var/lib/grafana
        ports:
          - 3000:3000
        environment:
          - GF_SECURITY_ADMIN_USER=admin
          - GF_SECURITY_ADMIN_PASSWORD=S3cure!

Bitte setzen Sie Ihr eigenes Passwort für Grafana!

Erzeugen Sie danach auf der Instanz das Verzeichnis `/etc/prometheus`

    mkdir -p /etc/prometheus

und speichern Sie dort die folgende Konfigurationsdatei unter dem Namen `prometheus.yaml` ab.

    global:
      scrape_interval: 15s
      evaluation_interval: 15s
      scrape_timeout: 10s 

    scrape_configs:
    - job_name: 'Octavia LoadBAlancer'
      static_configs:
      - targets: ['LB_IP:8088']


Setzen Sie statt "LB_IP" dort bitte die IP-Adresse ein, die Sie vorher oben gespeichert hatten.

Danach können Sie Prometheus und Grafana mit dem Kommando

    /data/prometheus-grafana: docker compose up -d

starten. 

![Bildschirmfoto des Quellmenüs](./2023-04-24_16-19.png)

