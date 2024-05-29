---
title: "Bestellvorgang"
linkTitle: "Bestellvorgang"
type: "docs"
weight: 20
---

### Kundenportal CloudHub

Sie starten immer in unserem Kundenportal [CloudHub](https://customerservice.plusserver.com).

### Keycloak as a Service auswählen

Navigieren Sie zunächst zu Keycloak as a Service.

![Auswahl Keycloak as a Service](/images/content/04-msl/de/iam_keycloak/ordering/1-cloud_service_keycloak.png)

### Wählen Sie den Servicetyp

Wählen Sie hier Keycloak aus.

![Auswahl Keycloak](/images/content/04-msl/de/iam_keycloak/ordering/2-select_keycloak_version.png)

### Wählen Sie Instanztyp und Instanzgröße

Wählen Sie nun die Größe der Node aus. Sie wissen noch nicht, welche Leistung Sie benötigen? Dann wählen Sie den kleinsten Knoten und skalieren Sie später, wenn nötig (in Planung).

![Auswahl Nodesize](/images/content/04-msl/de/iam_keycloak/ordering/3-iam_keycloak-size.png)

### Speichergröße auswählen

Sie beginnen immer mit mindestens 50 GB Speicherplatz für Ihre Daten.

![Speichergröße wählen](/images/content/04-msl/de/iam_keycloak/ordering/4-select-storage-size.png)

### Freischalten des Zugriffs

Der Service ist über eine öffentliche IP erreichbar. Da diese frei aus dem Internet verfügbar ist und potentiell von jedem "angegriffen" werden könnte, sperren wir intial jeglichen Zugriff auf den Service. Der reine Schutz durch eine verschlüsselte Verbindung mit Benutzername und Passwort ist nicht ausreichend. Deswegen muss dediziert angegeben werden, von welchen vertrauenswürdigen Quellen auf die Keycloak-as-a-Service-Instanz zugegriffen werden darf.
Sie müssen hier den Zugriff von einer oder mehreren externen Adressen oder Adressbereichen freischalten. Idealerweise ist hier nur die eine IP freigegeben, von der der Service genutzt wird.

![Externen Zugang einrichten](/images/content/04-msl/de/iam_keycloak/ordering/5-selection-trusted-sources.png)

### Wählen Sie die Region

Hier können Sie die [Region](../../documentation/az/) auswählen, in der die Keycloak-Instanz bereitgestellt wird.

![Auswahl der Region](/images/content/04-msl/de/iam_keycloak/ordering/6-selection_region.png)

### Rechnungsprofil auswählen

Sie sind ein neuer plusserver-Kunde und haben noch keine Rechnung erhalten? Dann wählen Sie *Neues Rechnungsprofil*. Wenn Sie bereits Kunde sind, können Sie aus bestehenden Rechnungsprofilen wählen, über die Sie zukünftig Rechnungen für die Service-Instanz erhalten.

![Rechnungsprofil auswählen](/images/content/04-msl/de/iam_keycloak/ordering/7-selection-invoice-profile.png)

### Bestellung aufgeben

Bitte überprüfen Sie Ihre eingegebenen Daten mit Hilfe der Zusammenfassung. Anschließend werden Sie gebeten, den Allgemeinen Geschäftsbedingungen und Vereinbarungen zuzustimmen. Erst dann können Sie die Bestellung abschließen, indem Sie auf ***Jetzt kostenpflichtig bestellen*** klicken.

<br>

![Zusammenfassung der Bestellung](/images/content/04-msl/de/iam_keycloak/ordering/8-order-overview.png)

### Bestellstatus verfolgen

Direkt nach der Bestellung werden Sie auf den [Bestellstatus](https://customerservice.plusserver.com/order-status) weitergeleitet. Sie können hier jederzeit den Status laufender Aufträge einsehen.

* new: Status direkt nach dem Auftrag
* processing: Status sobald die automatische Bereitstellung angelaufen ist
* failed: Es ist leider etwas schiefgegangen. Bitte öffnen Sie ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) in unserem Kundenportal [CloudHub](https://customerservice.plusserver.com), sodass wir Ihnen schnellstmöglich helfen können.
* DONE: Herzlichen Glückwunsch, Ihre neue Keycloak-as-a-Service-Instanz steht Ihnen zur Verfügung.
![Auftrag erfolgreich ausgeführt](/images/content/04-msl/de/iam_keycloak/ordering/10-order_status.png)
