---
title: "IPsec VPN configuration"
linkTitle: "IPsec VPN configuration"
type: "docs"
weight: 20
date: 2024-08-08
description: >
   Konfigurieren einer IPsec-VPN-Verbindung zwischen dem virtuellen Datencenter Ihrer Organisation und einem anderen Standort
---

## Arten von Site-to-Site-VPNs, die von pluscloud VMware unterstützt werden

Pluscloud VMware unterstützt mehrere Arten von Site-to-Site-VPN-Verbindungen:

- Verbindung zu einem anderen Edge-Gateway innerhalb derselben Organisation.
- Verbindung zu einem Edge-Gateway in einer anderen Organisation (entweder auf pluscloud oder einem anderen vCloud-Dienstanbieter).
- Verbindung zu einem entfernten Netzwerk, das die IPsec-VPN-Endpunktfunktion unterstützt.

Für jeden Verbindungstyp müssen Sie die IP-Adressen für beide Endpunkte konfigurieren und ein gemeinsames Geheimnis festlegen. Sie müssen auch angeben, welche Virtual Data Center (VDC)-Netzwerke die VPN-Verbindung verwenden dürfen.

## So konfigurieren Sie IPsec-VPN-Einstellungen auf einem Edge-Gateway

Führen Sie die folgenden Schritte aus, um die IPsec-VPN-Einstellungen für ein Edge-Gateway in VMware Cloud Director zu konfigurieren:

1. Öffnen Sie das Dashboard des *Virtual Data Center* in VMware Cloud Director und wählen Sie das VDC aus, in dem Sie das IPsec-VPN einrichten möchten.

2. Klicken Sie im linken Navigationsbereich unter dem Abschnitt *Netzwerk* auf **Edges**.

3. Suchen Sie auf der Seite *Edge Gateways* das Edge-Gateway und klicken Sie darauf, um es zu konfigurieren.

4. Um einen neuen IPsec-VPN-Tunnel hinzuzufügen, klicken Sie auf die Schaltfläche **Neu**.

5. Geben Sie einen Namen und optional eine Beschreibung für den IPSec-VPN-Tunnel ein.

6. Um den Tunnel beim Erstellen zu aktivieren, schalten Sie die Option **Status** ein.

7. Wählen Sie einen Peer-Authentifizierungsmodus.

    **Vorausgesetzter Schlüssel** - Wählen Sie einen vorab vereinbarten Schlüssel zum Eingeben. Der vorab vereinbarte Schlüssel muss am anderen Ende des IPSec-VPN-Tunnels gleich sein.

    **Zertifikat** - Wählen Sie Standort- und CA-Zertifikate aus, die zur Authentifizierung verwendet werden sollen.

8. Geben Sie für die **IP-Adresse** des lokalen Endpunkts die externe IP-Adresse Ihres Edge-Gateways ein.

9. Geben Sie im Feld **Netzwerke** die Organisationsnetzwerke an, die über das VPN zugänglich sind. Trennen Sie mehrere Subnetze mit Kommas.

10. Geben Sie für die **IP-Adresse** des Remote-Endpunkts die externe IP-Adresse Ihres Remote-Standorts oder des Firewall-/Edge-Geräts ein, an dem das VPN angeschlossen wird.

11. Geben Sie im Feld **Netzwerke** das lokale Subnetz des Remote-Netzwerks ein, das von Ihrem pluscloud VDC aus zugänglich sein soll. Wenn das Remote-Netzwerk beispielsweise den Bereich `10.20.0.0/16` verwendet, geben Sie `10.20.0.0/16` ein oder spezifizieren Sie ein kleineres Subnetz, wie z.B. `10.20.0.0/25`. Trennen Sie mehrere Subnetze mit Kommas.

12. Geben Sie die Remote-ID für den Peer-Standort ein, wenn Sie die Zertifikatsauthentifizierung verwenden.

13. Klicken Sie auf **Weiter**.

14. Überprüfen Sie Ihre Einstellungen und klicken Sie auf **Fertigstellen**.

15. Um zu überprüfen, ob der Tunnel funktioniert, wählen Sie ihn aus und klicken Sie auf **Statistiken anzeigen**.

    Wenn der Tunnel funktioniert, werden **Tunnelstatus** und **IKE-Dienststatus** beide als *Up* angezeigt.
