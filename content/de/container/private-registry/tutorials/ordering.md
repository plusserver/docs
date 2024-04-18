---
title: "Bestellvorgang"
linkTitle: "Bestellvorgang"
type: "docs"
weight: 20
---

### CloudHub

Sie starten immer in unserem [CloudHub.](https://customerservice.plusserver.com)

### Private Registry auswählen

Navigieren Sie zunächst zu Cloud Services / Private Registry.

![Auswahl Cloud Service Private Registry](/images/content/04-msl/de/private_registry/ordering/1-cloud_service_priv_reg.png)

### Wählen Sie den Servicetyp

Wählen Sie hier Harbor aus.

![Auswahl Harbor](/images/content/04-msl/de/private_registry/ordering/2-cloud_service_priv_reg-type.png)

### Wählen Sie die Nodesize

Wählen Sie nun die Größe der Node aus. Sie wissen noch nicht, welche Leistung Sie benötigen? Dann wählen Sie den kleinsten Knoten und skalieren Sie später, wenn nötig.

![Auswahl Nodesize](/images/content/04-msl/de/private_registry/ordering/3-cloud_service_priv_reg-size.png)

### Speichergröße auswählen

Sie beginnen immer mit mindestens 50 GB Speicherplatz für Ihre Daten.

![Speichergröße wählen](/images/content/04-msl/de/private_registry/ordering/4-cloud_service_priv_reg-storage.png)

### Freischalten des Zugriffs

Der Service ist über eine öffentliche IP erreichbar. Da diese frei aus dem Internet verfügbar ist und potentiell von jedem "angegriffen" werden könnte, sperren wir initial jeglichen Zugriff auf den Service. Der reine Schutz durch eine verschlüsselte Verbindung mit Benutzername und Passwort ist nicht ausreichend. Deswegen muss dediziert angegeben werden, von welchen vertrauenswürdigen Quellen auf die Private Registry zugegriffen werden kann. Sie müssen hier den Zugriff von einer oder mehrere externen Adressen oder Adressbereichen freischalten. Idealerweise ist hier nur die eine IP freigegeben, von der der Service genutzt wird.

![Externen Zugang einrichten](/images/content/04-msl/de/private_registry/ordering/5-selection-trusted-sources.png)

### Wählen Sie die Region

Hier können Sie die [Region](../../documentation/az/) auswählen, in der die Harbor-Instanz bereitgestellt wird.

![Auswahl der Region](/images/content/04-msl/de/private_registry/ordering/6-selection_region.png)

### Rechnungsprofil auswählen

Sie sind ein neuer plusserver-Kunde und haben noch keine Rechnung erhalten? Dann wählen Sie *Neues Rechnungsprofil*. Wenn Sie bereits Kunde sind, können Sie aus bestehenden Rechnungsprofilen wählen, über die Sie zukünftig Rechnungen für die Service-Instanz erhalten.

![Rechnungsprofil auswählen](/images/content/04-msl/de/private_registry/ordering/7-selection-invoice-profile.png)

### Bestellung aufgeben

Bitte überprüfen Sie Ihre eingegebenen Daten mithilfe der Zusammenfassung und lesen Sie die Allgemeinen Geschäftsbedingungen und Vereinbarungen und bestätigen Sie diese. Erst dann können Sie die Bestellung abschließen, indem Sie auf ***Jetzt kostenpflichtig bestellen*** klicken.

<br>

![Zusammenfassung der Bestellung](/images/content/04-msl/de/private_registry/ordering/8-order-overview.png)

### Bestellstatus verfolgen

Direkt nach der Bestellung werden Sie auf den [Bestellstatus](https://customerservice.plusserver.com/order-status) weitergeleitet. Sie können hier jederzeit den Status laufender Aufträge einsehen.

* new: Status direkt nach dem Auftrag
* processing: Status sobald die automatische Bereitstellung angelaufen ist
* failed: Es ist leider etwas schiefgegangen, bitte öffnen Sie ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) hier im Portal, so dass wir Ihnen schnellstmöglich helfen können.
* DONE: Herzlichen Glückwunsch, Ihr neuer Private Registry steht zur Verfügung.
![Auftrag erfolgreich ausgeführt](/images/content/04-msl/de/private_registry/ordering/10-order_status.png)
