---
title: "Security Scanner - Scan von internen IP-Adressen mit dem Gateway"
linkTitle: "Security Scanner - Scan von internen IP-Adressen mit dem Gateway"
date: 2024-11-20
weight: 10
description: "Anleitung zum Scannen interner IP-Adressen mit dem Gateway"
type: docs
---

# Security Scanner - Scan von internen IP-Adressen mit dem Gateway

## Einleitung

Da nicht alle IP-Adressen Ihrer Infrastruktur von extern geprüft werden können, haben Sie die Möglichkeit ein Gateway einzurichten. Mithilfe dessen können auch isolierte Netzwerke (z. B. RfC-1918) auf Schwachstellen hin überprüft werden.

# Gateway installieren

## Gateway Image herunterladen

Navigieren Sie auf https://sec-scan.psmanaged.com/ui/gsp/entities/gateway/list/. Dort wählen Sie die vorhandene Plattform aus und laden das Image runter.

![Gateway Image herunterladen](./vmware-download.png)

## Image in den Katalog der vAPP-Vorlagen Ihrer PlusCloud hochladen

![vAPP-Vorlagen](./vapp-vorlagen.png)

## Neue virtuelle Maschine anlegen

![Neue VM anlegen](./neue-vm.png)

## Hostnamen der VM angeben und Template auswählen

![Hostname und Template](./hostname-template.png)

## Netzwerk & IP-Adresse einstellen

![Netzwerk Einstellungen](./netzwerk-einstellungen.png)

## Firewall einstellen

Um in Schritt (2.3) Web-UI des Gateways öffnen das Gateway via Web-GUI konfigurieren zu können, muss die interne IP-Adresse des Gateways mithilfe von SNAT-, DNAT- und Firewall-Regeln über eine öffentlich erreichbare IP-Adresse Ihres Edge-Gateways verfügbar gemacht werden.

## Mit der VM-Konsole verbinden

![Mit VM verbinden](./vm-verbinden.png)
Nachdem der Login-Prompt angezeigt wird, muss als Benutzername und Passwort admin angegeben werden.

## Network configuration auswählen

![Network Configuration](./network-config.png)

## Informationen der Netzwerkkonfiguration einstellen

![Network Info](./network-info.png)

## Netzwerkverbindung zum Security Scanner testen

![Netzwerktest](./network-test.png)

## Gateway configuration auswählen

![Gateway Configuration](./gateway-config.png)

## Set web password auswählen & Passwort vergeben

![Web Password](./web-password.png)

# Gateway konfigurieren

## Neues Gateway erstellen

![Gateway erstellen](./gateway-create.png)
Bitte geben Sie eine weitere freie IP-Adresse aus dem Netzwerk an, in dem Sie das Gateway installiert haben.

## Token kopieren

Um das Gateway mit dem Security-Scanner zu verbinden, ist eine Authentifizierung und Verschlüsselung notwendig. Hierzu kopieren Sie den API-Schlüssel aus den Einstellungen des Gateways heraus.

![Token Configuration](./token-config.png)

## Web-UI des Gateways öffnen

Sie haben in Schritt (1.6) Firewall einstellen das Gateway über eine öffentlich erreichbare IP-Adresse verfügbar gemacht. Geben Sie die IP-Adresse des Gateways nun im Browser ein und melden sich mithilfe des vergebenen Web-Passworts an (z. B. https://195.252.XXX.XXX).

![Web UI](./web-ui.png)

## Status des Gateways überprüfen

![Gateway Status](./gateway-status.png)

Das Gateway ist nun eingerichtet. Sie können beim Anlegen einer Scan-Aufgabe das Gateway für die Prüfung auswählen.
