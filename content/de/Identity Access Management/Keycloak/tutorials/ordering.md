---
title: "Bestellvorgang"
linkTitle: "Bestellvorgang"
type: "docs"
weight: 20
---

### Kundenportal

Sie starten immer in unserem [Kundenportal](https://customerservice.plusserver.com)

### IAM - Keycloak auswählen

Navigieren Sie zunächst zu IAM - Keycloak.

![Auswahl IAM - Keycloak](/images/content/04-msl/de/iam_keycloak/ordering/1-cloud_service_tbd_keycloak.png)

### Wählen Sie den Servicetyp

Wählen Sie hier Keycloak aus.

![Auswahl Keycloak](/images/content/04-msl/de/iam_keycloak/ordering/2-tbd.png)

### Wählen Sie die Nodesize

Wählen Sie nun die Größe der Node aus. Sie wissen noch nicht, welche Leistung Sie benötigen? Dann wählen Sie den kleinsten Knoten und skalieren Sie später, wenn nötig

![Auswahl Nodesize](/images/content/04-msl/de/iam_keycloak/ordering/3-iam_keycloak-size2.png)

### Speichergröße auswählen

Sie beginnen immer mit mindestens 50 GB Speicherplatz für Ihre Daten.

![Speichergröße wählen](/images/content/04-msl/de/iam_keycloak/ordering/4-iam_keycloak-storage.png)

### Freischalten des Zugriffs

Der Service ist über eine öffentliche IP erreichbar. Da diese frei aus dem Internet verfügbar ist und potentiell jedem "angegriffen" werden könnte, sperren wir intial jeglichen Zugriff auf den Service. Der reine Schutz durch eine verschlüsselte Verbindung mit Benutzername und Passwort ist nicht ausreichend. Deswegen muss dediziert angegeben werden, von welchen vertrauenswürdigen Quellen die IAM - Keycloak Instanz zugreifbar sein soll
Sie müssen hier den Zugriff von einer oder mehrer externen Adressen oder Adressbereichen freischalten. Idealerweise ist hier nur die eine IP freigegeben, von der der Service genutzt wird.

![Externen Zugang einrichten](/images/content/04-msl/de/iam_keycloak-/ordering/5-selection-trusted-sources.png)

### Wählen Sie die Region

Hier können Sie die [Region](../../documentation/az/) auswählen, in der die Keycloak-Instanz bereitgestellt wird.

![Auswahl der Region](/images/content/04-msl/de/iam_keycloak/ordering/6-selection_region.png)

### Abrechnungsprofil auswählen

Sie sind ein neuer Plusserver-Kunde und haben noch keine Rechnung erhalten? Dann wählen Sie *Neues Abrechnungsprofil*. Wenn Sie bereits Kunde sind, können Sie aus bestehenden Abrechnungsprofilen wählen, über die Sie zukünftig Rechnungen für die Service-Instanz erhalten.

![Rechnungsprofil auswählen](/images/content/04-msl/de/iam_keycloak/ordering/7-selection-invoice-profile.png)

### Bestellung aufgeben

Bitte überprüfen Sie die Daten, die Sie in der Zusammenfassung eingegeben haben. Bitte lesen Sie die Allgemeinen Geschäftsbedingungen und Vereinbarungen und bestätigen Sie diese. Erst dann können Sie die Bestellung abschließen, indem Sie auf ***Jetzt kostenpflichtig bestellen*** klicken.

<br>

![Zusammenfassung der Bestellung](/images/content/04-msl/de/iam_keycloak/ordering/8-order-overview.png)

### Bestellstatus verfolgen

Direkt nach der Bestellung werden Sie auf den [Bestellstatus](https://customerservice.plusserver.com/order-status) weitergeleitet. Sie können hier jederzeit den Status laufender Aufträge einsehen.

* new: Status direkt nach dem Auftrag
* processing: Status sobald die automatische Bereitstellung angelaufen ist
* failed: Es ist leider etwas schiefgegangen, bitte öffnen Sie ein [Ticket](https://customerservice.plusserver.com/support/ticket-create) hier im Portal, so dass wir Ihnen schnellstmöglich helfen können.
* DONE: Herzlichen Glückwunsch, Ihre neu IAM - Keycloak Instanz steht zur Verfügung
![Auftrag erfolgreich ausgeführt](/images/content/04-msl/de/iam_keycloak/ordering/10-order_status.png)
