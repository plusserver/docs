---
title: "Bestellvorgang"
linkTitle: "Bestellvorgang"
type: "docs"
weight: 20
---

### Kundenportal

Sie starten immer in unserem [Cloudhub.](https://customerservice.plusserver.com)

### Auswahl Service

Navigieren Sie zunächst zu Cloud Services / Caching.

![Auswahl Cloud Service CaaS](/images/content/04-msl/de/caching/ordering/1-cloud_service_caching.png)

### Auswahl Nodesize

Wählen Sie nun die Größe bzw. Leistungsfähigkeit aus. Sie wissen noch nicht welche Leistung Sie benötigen? Dann wählen Sie die kleinste Node und skalieren bei Bedarf später.

![Selection Nodesize](/images/content/04-msl/de/caching/ordering/3-selection-node-size.png)

### Auswahl der Speichergröße

Sie starten immer mit mindestens 50GB Speicher für Ihre Daten.

![Auswahl Speichergröße](/images/content/04-msl/de/databases/ordering/4-select-storage-size.png)

### Freischalten des Zugriffs

Der Service ist über eine öffentliche IP erreichbar. Da diese frei aus dem Internet verfügbar ist und potentiell von jedem "angegriffen" werden könnte, sperren wir intial jeglichen Zugriff auf den Service. Der reine Schutz durch eine verschlüsselte Verbindung mit Benutzername und Passwort ist nicht ausreichend. Deswegen muss dediziert angegeben werden, von welchen vertrauenswürdigen Quellen auf die DBaaS zugegriffen werden kann. Sie müssen hier den Zugriff von einer oder mehreren externen Adressen oder Adressbereichen freischalten. Idealerweise ist hier nur die eine IP freigegeben, von der der Service genutzt wird.

![Externen Zugriff einrichten](/images/content/04-msl/de/databases/ordering/5-selection-trusted-sources.png)

### Auswahl der Region

Hier können Sie die [Region](../documentation/az/) auswählen, in der der Dienst bereitgestellt werden soll.

![Auswahl der Region](/images/content/04-msl/de/caching/ordering/6-selection_region.png)

### Auswahl des Abrechnungsprofils

Sie sind neuer Kunde bei *plusserver* und bekommen noch keine Rechnung? Dann wählen Sie ***Neues Rechnungsprofil***. Sind Sie bereits Kunde: Dann können Sie aus bereits bestehenden Rechnungsprofilen wählen und bekommen den neuen DBaaS mit auf eine bestehende Rechnung, die Sie im nächsten Schritt auswählen.

![Rechnungsprofil auswählen](/images/content/04-msl/de/databases/ordering/7-selection-invoice-profile.png)

### Bestellung aufgeben

Prüfen Sie bitte über die Zusammenfassung Ihre eingegeben Daten. Lesen Sie bitte die Bestimmungen und Vereinbarungen und bestätigen diese. Erst danach können Sie die Bestellung mit dem Button ***jetzt kostenpflichtig bestellen*** abschließen.

![Zusammenfassung der Bestellung](/images/content/04-msl/de/caching/ordering/8-order-overview.png)

### Bestellstatus verfolgen

Unmittelbar nach Ihrer Bestellung werden Sie zu [Bestellstatus](https://customerservice.plusserver.com/order-status) weitergeleitet. Hier können Sie jederzeit den Status der aktuellen Bestellung einsehen.

- new: Status direkt nach dem Auftrag
- processing: Status sobald die automatische Bereitstellung angelaufen ist
- failed: Es ist leider etwas schiefgegangen, bitte öffnen Sie ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) hier im Portal, so dass wir Ihnen schnellstmöglich helfen können.
- DONE: Herzlichen Glückwunsch, Ihr neuer DBaaS steht zur Verfügung

![Bestellung erfolgreich abgeschlossen](/images/content/04-msl/de/caching/ordering/10-order_status.png)
