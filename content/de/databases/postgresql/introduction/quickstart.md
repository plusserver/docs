---
title: " Quickstartguide"
linkTitle: " Quickstartguide"
type: "docs"
weight: 30
---

## Bereitstellung

### Bestellung

Sie brauchen schnell eine Datenbank? Dann führen wir Sie durch den Bestellvorgang [hier](../../tutorials/ordering/).

### Anmeldedaten abrufen

Der Bestellvorgang ist abgeschlossen und Ihr DBaaS ist einsatzbereit. Das erste, was Sie tun sollten, ist Ihre [Anmeldedaten](../../tutorials/retrieve_login_credentials/) abzurufen.

### Erstellen Sie eine neue Datenbank und einen neuen Benutzer

Verwenden Sie Ihren MySQL-Client, um [Ihre erste Datenbank und Ihren ersten Benutzer anzulegen](../../tutorials/create_db_and_user/).

### Importieren Sie Ihre Datenbank

Vielleicht möchten Sie eine Datenbank aus einem bestehenden Projekt [migrieren](../../tutorials/database_import/).  

### Verwenden Sie die DBaas in Ihrer Anwendung

Genießen Sie unseren Datenbank-as-a-Service. Keine Verwaltungssorgen - einfach anschließen und loslegen. Konzentrieren Sie sich auf Ihre Anwendung, wir kümmern uns um den Rest.

## Anpassung

### Skalierung

Es gibt zwei Möglichkeiten, unsere DBaaS zu skalieren.

- Vertikale Skalierung: Zuallererst können Sie die *Knotengröße* Ihrer DBaaS-Instanz ändern. Alle verfügbaren Optionen werden [hier] erläutert (../../documentation/nodesize/).

- Horizontale Skalierung: Zweitens können Sie [Read-Replicas](../../documentation/read_replicas/) zu Ihrer DBaaS hinzufügen. Wenn Ihre Anwendung in der Lage ist, Lese-/Schreiboperationen zu verteilen, kann diese Funktion die Reaktionsfähigkeit des Systems insgesamt stark verbessern.

### Konfiguration

Alles über die Datenbankkonfiguration finden Sie [hier](../../documentation/configuration/).

## Allgemeine Informationen

### Sicherheit

#### Whitelisting von Quell-IP-Adressen

Stellen Sie sicher, dass Sie nur bekannte Quell-IP-Adressen zulassen, die Ihre Anwendungen verwenden. Dies hilft, unerwünschte Bots oder Crawler fernzuhalten, die versuchen, Ihren Dienst zu schädigen.

#### Verschlüsselung

Wir verlangen eine sichere, verschlüsselte Kommunikation zwischen dem Kunden/der Anwendung und unserem DBaaS. Selbst wenn jemand den Netzwerkverkehr abfängt, kann er die Daten nicht sehen.

Wenn Sie Zertifizierungsfehler erhalten, stellen Sie sicher, dass die erforderlichen Let's Encry (Zwischen-)Zertifikate auf dem zugreifenden System verfügbar sind. [Let's Encrypt-Zertifikate](https://letsencrypt.org/certificates/)

### Sicherung und Wiederherstellung

Alle Details zu den Backup- und Restore-Automatisierungen finden Sie in unserem Dokument [Backup and Restore](../../documentation/backup/).

### Aktualisierungen

Erfahren Sie mehr über die Patchroutine für unser DBaaS im Dokument [Updates](../../documentation/update/).

### Überwachung

Wir überwachen unser DBaaS, indem wir sowohl die zugrunde liegenden Rechen- und Speicherressourcen im Auge behalten als auch datenbankspezifische Prüfungen durchführen. Unser 24x7-Supportteam kümmert sich um alle auftretenden Probleme und gewährleistet einen kontinuierlichen und zuverlässigen Service.

### Regionen und AZ

Informationen zur Auswahl von Regionen und Verfügbarkeitszonen finden Sie im Dokument [Regionen und AZs](../../documentation/az/).

### SLA

Die Infrastruktur ist vollständig redundant. Wir garantieren daher ein SLA von 99,95.
