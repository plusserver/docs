---
title: "Quickstart guide"
linkTitle: "Quickstart guide"
type: "docs"
weight: 30
---

## Bereitstellung

### Bestellung

Sie brauchen schnell einen Caching Service? Dann führen wir Sie [hier](../../tutorials/ordering/) durch den Bestellvorgang.

### Anmeldedaten abrufen

Der Bestellvorgang ist abgeschlossen und Ihr CaaS ist einsatzbereit. Das erste, was Sie tun sollten, ist Ihre [Anmeldedaten](../../tutorials/retrieve_login_credentials/) abzurufen.

### Verwenden Sie die CaaS in Ihrer Anwendung

Genießen Sie unseren Caching-as-a-Service. Keine Verwaltungssorgen - einfach anschließen und loslegen. Konzentrieren Sie sich auf Ihre Anwendung, wir kümmern uns um den Rest.

## Anpassung

### Skalierung

Es gibt zwei Möglichkeiten, unsere CaaS zu skalieren.

- Vertikale Skalierung: Zuallererst können Sie die *Knotengröße* Ihrer CaaS-Instanz ändern. Alle verfügbaren Optionen werden [hier](../../documentation/nodesize/) erläutert.

- Horizontale Skalierung: Zweitens können Sie [Read-Replicas](../../documentation/read_replicas/) zu Ihrer CaaS hinzufügen. Wenn Ihre Anwendung in der Lage ist, Lese-/Schreiboperationen zu verteilen, kann diese Funktion die Reaktionsfähigkeit des Systems insgesamt stark verbessern.

### Konfiguration

Alles über die Konfiguration des Dienstes finden Sie [hier](../../documentation/configuration/).

## Allgemeine Informationen

### Sicherheit

#### Whitelisting von Quell-IP-Adressen

Stellen Sie sicher, dass Sie nur bekannte Quell-IP-Adressen zulassen, die Ihre Anwendungen verwenden. Dies hilft, unerwünschte Bots oder Crawler fernzuhalten, die versuchen, Ihren Dienst zu schädigen.

#### Verschlüsselung

Wir verlangen eine sichere, verschlüsselte Kommunikation zwischen dem Kunden/der Anwendung und unserem CaaS. Selbst wenn jemand den Netzwerkverkehr abfängt, kann er die Daten nicht sehen.

Wenn Sie Zertifizierungsfehler erhalten, stellen Sie sicher, dass die erforderlichen [Let's Encrypt-(Zwischen)-Zertifikate](https://letsencrypt.org/certificates/) auf dem zugreifenden System verfügbar sind.

### Sicherung und Wiederherstellung

Alle Details zu den Backup- und Restore-Automatisierungen finden Sie in unserem Dokument [Backup and Restore](../../documentation/backup/).

### Aktualisierungen

Erfahren Sie mehr über die Patchroutine für unser CaaS im Dokument [Updates](../../documentation/update/).

### Überwachung

Wir überwachen unser CaaS, indem wir sowohl die zugrunde liegenden Rechen- und Speicherressourcen im Auge behalten als auch datenbankspezifische Prüfungen durchführen. Unser 24x7-Supportteam kümmert sich um alle auftretenden Probleme und gewährleistet einen kontinuierlichen und zuverlässigen Service.

### Regionen und AZ

Informationen zur Auswahl von Regionen und Verfügbarkeitszonen finden Sie im Dokument [Regionen und AZ](../../../general/plusserver-region-az).

### SLA

Die Infrastruktur ist vollständig redundant. Wir garantieren daher ein SLA von 99,95 Prozent.
