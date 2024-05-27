---
title: "Schnellstart"
linkTitle: "Schnellstart"
type: "docs"
weight: 30
---

## Bereitstellung

### Bestellung

Folgen Sie dem Bestellvorgang. [Hier](../../tutorials/ordering/) finden Sie dazu eine Anleitung.

### Anmeldedaten

Nach Abschluss der Bestellung ist Ihr Keycloak as a Service bereit. [Hier](../../tutorials/retrieve_login_credentials/) erfahren Sie, wo Sie Ihre Anmeldedaten jederzeit einsehen können.

### Nutzung des Keycloak as a Service

Melden Sie sich an der Keycloak-as-a-Service-Weboberfläche an, um Keycloak as a Service zu nutzen. Unter [Erste Schritte](../../tutorials/first_steps/#an-der-iam---keycloak-webui-anmelden) erhalten Sie eine detaillierte Anleitung dazu.

## Anpassungen

### Skalierung

Vertikale Skalierung: in Planung.

#### Compute-Resourcen

Zur Zeit ist Keycloak as a Service nur in einer Knoten-Größe verfügbar:

- kc4-8: 4 vCPU + 8 GB RAM

Bitte [eröffnen Sie ein Support-Ticket](https://customerservice.plusserver.com/support/ticket-create), wenn Sie individuelle Anforderungen haben.

#### Datenspeicherung

Starten Sie mit 50 GB und erweitern Sie in 50-GB-Schritten bis zu 200 GB. Eine Reduktion der Speichergröße ist nicht möglich.

## Sicherheit

### Whitelisting und Verschlüsselung

Beschränken Sie den Zugriff auf bekannte Quell-IP-Adressen. <br/>
Die Kommunikation zur Web-GUI ist über HTTPS verschlüsselt.

#### Eigene Firewall freischalten

Unter Umständen müssen Sie Freischaltungen an Ihren eigenen Firewall vornehmen, um den Client-Anwendungen Zugriff auf die Keycloak-as-a-Service-Instanz zu ermöglichen. </br>
In Ihren Anmeldedaten finden Sie die URL Ihrer Keycloak-as-a-Service-Instanz, aus deren FQDN Sie die für die Freischaltung benötigte IP Adresse ermitteln können.
Zum Beispiel wenn in Ihrem Vertrag folgende ![Zugangsdaten](/images/content/04-msl/de/iam_keycloak/get_credentials/3-credentials-view.png) stehen, können Sie mit Standard-Tools wie *nslookup*, *host* oder *dig* die IP Adresse abfragen:
![IP-Adresse](/images/content/04-msl/de/iam_keycloak/ordering/11-get-instanz-ip.png)

### Softwareupdates

Erfahren Sie mehr über die Patchroutine für unsere *Keycloak as a Service* im Dokument [Updates](../../documentation/update/).

### Überwachung

Wir überwachen Ihre *Keycloak as a Service*, indem wir die zugrundeliegenden Rechen- und Speicherressourcen im Auge behalten als auch anwendungsspezifische Monitoring Checks durchführen. Unser 24x7-Supportteam kümmert sich um alle auftretenden Probleme und gewährleistet eine kontinuierliche Verfügbarkeit.

### Regionen und AZ

Informationen zur Auswahl von Regionen und Verfügbarkeitszonen finden Sie im Dokument [Regionen und AZs](../../../general/plusserver-region-az/).

### SLA

Die Infrastruktur ist vollständig redundant. Wir garantieren daher ein SLA von 99,95 Prozent.
