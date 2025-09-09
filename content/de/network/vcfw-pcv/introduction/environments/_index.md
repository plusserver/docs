---
title: "Grundlagen"
linkTitle: "Grundlagen"
type: "docs"
weight: 1
date: 2025-08-15
description: >
  Grundlegende Informationen über die Nutzung der Virtual Cloud Firewall - pluscloud VMware
---

## Bereitstellung

Die **Virtual Cloud Firewall** (VCFW) wird als virtuelle Maschinen (VMs) mit installiertem FortiGate-Betriebssystem (FortiOS) bereitgestellt.

Diese VMs erhalten die erforderlichen CPU-, Speicher-, Festplatten- und Netzwerkressourcen. Nach der Bereitstellung wird die **VCFW** mit grundlegenden Einstellungen wie IP-Adresse, Hostname und administrativen Anmeldeinformationen konfiguriert.

Die Netzwerkschnittstellen werden konfiguriert, um mit diesen entsprechenden Sicherheitszonen und externe Netzwerke zu verbinden.

Sicherheitsrichtlinien und NAT-Regeln werden eingerichtet, um den Datenverkehr basierend auf festgelegten Regeln zuzulassen oder zu blockieren.

Überwachungs- und Verwaltungstools werden integriert um die Leistung und Sicherheit der **VCFW** zu überwachen.

## Grundlegende Funktionen der Virtual Cloud Firewall

### Netzwerksicherheit

Die **VCFW** fungiert als Firewall um den Datenverkehr zwischen verschiedenen Sicherheitszonen zu kontrollieren und Sicherheitsrichtlinien zur Abwehr von Bedrohungen durchzusetzen.

### VPN-Konnektivität

Die **VCFW** bietet sichere VPN-Tunnel für Remote-Zugriff oder standortübergreifende Verbindungen.

### NAT (Network Address Translation)

Die **VCFW** übersetzt interne private IP-Adressen in eine öffentliche IP-Adresse für die Internetkommunikation.

### IPS (Intrusion Prevention System)

Die **VCFW** kann den Netzwerkverkehr auf bekannte Infiltrationsversuche und schädliche Aktivitäten hin überwachen.

### Traffic-Shaping

Die **VCFW** ermöglicht die Verwaltung und Priorisierung von Verkehr auf Basis vordefinierter Regeln.

### Webfilterung

Die **VCFW** kann den Zugriff auf bestimmte Websites basierend auf Inhaltsfilterrichtlinien blockieren.

### Protokollierung und Überwachung

Die **VCFW** generiert Protokolle und bietet Überwachungsfunktionen für Netzwerkaktivitäten.

## Nützliche Hinweise und bewährte Verfahren

### In einer nicht produktiven Umgebung testen

Änderungen an der Konfiguration der **Virtual Cloud Firewall** sollten immer in einer nicht produktiven Umgebung getestet werden, bevor sie in der Produktion implementiert werden, um Störungen zu vermeiden.

### Regelmäßige Firmware-Updates

Das wird stetig weiterentwickelt, gerade in Bezug auf Sicherheitslücken sollte somit die aktuell eingesetzte Major Version immer auf die letzte freigegebene Minorversion aktualisiert werden. Hiermit werden häufig auch zusätzliche Verbesserungen vom Hersteller bereitgestellt.

### Sicherung von Konfigurationen

Die **Virtual Cloud Firewall** Konfigurationen sollte regelmäßig gesichert werden, um Datenverlust im Falle von Ausfällen zu verhindern. Diese Sicherung ist bereits im Produkt beinhaltet.

### Segmentierung und Zonen

Nutzen Sie Netzwerksegmentierung und Sicherheitszonen effektiv, um den Datenverkehr zu steuern und die Sicherheit zu erhöhen.
