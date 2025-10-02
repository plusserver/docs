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

Viele Kunden haben den Wunsch, Infrastruktur möglichst ausfallsicher aufzubauen. Das schließt oft auch den Betrieb von Datenbankclustern an zwei unabhängigen Standorten/Rechenzentren mit ein. Dieses Tutorial zeigt, wie man ein PostgreSQL Cluster in zwei verschiedenen Availability Zonen (AZs) mit Hilfe eines Overlay-VPNs ([Nebula](https://github.com/slackhq/nebula/) und [Patroni](https://patroni.readthedocs.io/en/latest/)  aufbaut. 

## Voraussetzungen

Dieses Tutorial geht davon aus, dass Sie bereits über ein funktionierendes Consul Cluster verfügen, welches Teil Ihres Overlay-VPNs ist. Weiterhin benötigen Sie zwei OpenStack-Umgebungen mit mindestens je einer Instanz für die PostgreSQL Datenbanken in verschiedenen AZs der pluscloud open (am besten in einer Region), die Sie zu einem Cluster verbinden wollen und die ebenfalls bereits Teil des Overlay-VPNs auf Basis von Nebula sind.




## Tipp
Wenn Sie planen dies in einer Produktionsumgebung zu nutzen, sollten Sie mehrere Lighthouse-Instanzen in verschiedenen Cloud-Umgebungen starten.
Weiterhin bietet die Firma [Defined Networking](https://www.defined.net/) Nebula in einer "managed" Variante an die erlaubt, das hier geschilderte Setup mit Hilfe einer [API](https://docs.defined.net/guides/automating-host-creation/), stark zu automatisieren. 

Es gibt auch eine [Sammlung von systemd-Units](https://github.com/quickvm/defined-systemd-units), mit denen man Instanzen automatisiert (z. B. beim Start) zum Overlay-VPN von Defined Networking hinzufügen resp. (beim Herunterfahren) daraus entfernen kann. 




