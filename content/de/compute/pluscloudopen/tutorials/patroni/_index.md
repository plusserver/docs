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

Dieses Tutorial geht davon aus, dass Sie bereits über ein funktionierendes Consul Cluster verfügen, welches Teil Ihres Overlay-VPNs ist. Weiterhin benötigen Sie zwei OpenStack-Umgebungen mit mindestens je einer Instanz für die PostgreSQL Datenbanken in verschiedenen AZs der pluscloud open (am besten in einer Region), die Sie zu einem Cluster verbinden wollen und die ebenfalls bereits Teil des Overlay-VPNs auf Basis von Nebula sind.

## Consul Client installieren

tls, interface binding, systemd unit file

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



