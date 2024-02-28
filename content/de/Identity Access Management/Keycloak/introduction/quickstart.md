---
title: "Quickstartguide"
linkTitle: "Quickstartguide"
type: "docs"
weight: 30
---

## Bereitstellung

### Bestellung

Folgen Sie  [hier](../../tutorials/ordering/) dem Bestellvorgang.

### Anmeldedaten

Nach Abschluss der Bestellung ist Ihre IAM - Keycloak bereit. Ihre Anmeldedaten können Sie [hier](../../tutorials/retrieve_login_credentials/) einsehen.

### Nutzung der IAM - Keycloak

Melden Sie sich im Webinterface an, um IAM - Keycloak zu nutzen.

## Anpassungen

### Skalierung

Vertikale Skalierung: Sie können die *Knotengröße* Ihrer Keycloak-Instanz ändern. Alle verfügbaren Optionen werden [hier](../../documentation/nodesize/) erläutert.

#### Compute Resourcen

Wählen Sie zwischen zwei Knotengrößen:

- b2-4: 2vCPU + 4GB RAM
- b4-8: 4vCPU + 8GB RAM

Für individuelle Anforderungen, [eröffnen Sie ein Support-Ticket](https://customerservice.plusserver.com/support/ticket-create).

#### Datenspeicherung

Starten Sie mit 50 GB und erweitern Sie in 50-GB-Schritten bis zu 200 GB. Eine Reduktion der Speichergröße ist nich möglich.

## Sicherheit

### Whitelisting und Verschlüsselung

Beschränken Sie den Zugriff auf bekannte Quell-IP-Adressen. Die Kommunikation zur Web-GUI ist über HTTPS verschlüsselt.

### Softwareupdates

Erfahren Sie mehr über die Patchroutine für unsere *IAM - Keycloak* im Dokument [Updates](../../documentation/update/).

### Überwachung

Wir überwachen Ihre *IAM - Keycloak*, indem wir die zugrundeliegenden Rechen- und Speicherressourcen im Auge behalten als auch anwendungsspezifische Monitoring Checks durchführen. Unser 24x7-Supportteam kümmert sich um alle auftretenden Probleme und gewährleistet einen kontinuierlichen Verfügbarkeit.

### Regionen und AZ

Informationen zur Auswahl von Regionen und Verfügbarkeitszonen finden Sie im Dokument [Regionen und AZs](../../documentation/az/).

### SLA

Die Infrastruktur ist vollständig redundant. Wir garantieren daher ein SLA von 99,95.
