---
title: "Quickstart guide"
linkTitle: "Quickstart guide"
type: "docs"
weight: 30
---

## Bereitstellung

### Bestellung

Folgen Sie dem [hier](../../tutorials/ordering/) beschriebenen Bestellvorgang.  

### Anmeldedaten

Nach Abschluss der Bestellung ist Ihre Private Registry - Harbor bereit. Ihre Anmeldedaten können Sie [hier](../../tutorials/retrieve_login_credentials/) einsehen.

### Nutzung der Private Registry

Melden Sie sich mit den erhaltenen Anmeldetedaten am Webinterface der Private Registry - Harbor an.

## Anpassungen

### Skalierung

#### Compute-Ressourcen

Wählen Sie zwischen zwei Knotengrößen:

- b2-4: 2vCPU + 4GB RAM
- b4-8: 4vCPU + 8GB RAM

Für individuelle Anforderungen [eröffnen Sie bitte ein Support-Ticket](https://customerservice.plusserver.com/support/ticket-create).

#### Datenspeicherung

Starten Sie mit 50 GB und erweitern Sie in 50-GB-Schritten bis zu 200 GB. Eine Reduktion der Speichergröße ist nicht möglich.

## Sicherheit

### Whitelisting und Verschlüsselung

Beschränken Sie den Zugriff auf bekannte Quell-IP-Adressen. Die Kommunikation zur Web-GUI ist über HTTPS verschlüsselt.

### Softwareupdates

Erfahren Sie mehr über die Patchroutine für unsere *Private Registry - Harbor* im Dokument [Updates](../../documentation/update/).

### Überwachung

Wir überwachen Ihre *Private Registry - Harbor*, indem wir die zugrundeliegenden Rechen- und Speicherressourcen im Auge behalten als auch anwendungsspezifische Monitoring Checks durchführen. Unser 24x7-Supportteam kümmert sich um alle auftretenden Probleme und gewährleistet einen kontinuierliche Verfügbarkeit.

### Regionen und AZ

Informationen zur Auswahl von Regionen und Verfügbarkeitszonen finden Sie im Dokument [Regionen und AZs](../../../allgemein/plusserver-region-az/).

### SLA

Die Infrastruktur ist vollständig redundant. Wir garantieren daher ein SLA von 99,95 Prozent.
