---
title: "Schnellstart"
linkTitle: "Schnellstart"
type: "docs"
weight: 10
date: 2024-01-19
---

## Bestellung

Erfahren Sie hier, wie Sie schnell und einfach Ihre PSKE bestellen können.

### CloudHub

Starten Sie den Bestellprozess in unserem Kundenportal.

### Auswahl Managed Kubernetes

Navigieren Sie zu Cloud Services > Managed Kubernetes.

{{< img src="1.png" alt="" >}}

### Bestellen des Managed Kubernetes

Klicken sie 'Jetzt PSKE bestellen'.

{{< img src="2.png" alt="" >}}

### Abrechnungsprofil auswählen

Sie sind ein neuer plusserver-Kunde und haben noch keine Rechnung erhalten? Dann wählen Sie bitte Neues Rechnungsprofil aus.

Sind Sie bereits Kunde? Dann können Sie aus bestehenden Abrechnungsprofilen wählen und erhalten die neue PSKE auf eine bestehende Rechnung. Wählen Sie dazu bitte Existierendes Rechnungsprofil aus.

{{< img src="3.png" alt="" >}}

### E-Mail für Bereitstellungsinformationen auswählen

Geben Sie die E-Mail-Adresse ein, an die alle relevanten Informationen über die Bereitstellung der PSKE gesendet werden sollen, z. B. Statusaktualisierungen oder Passwörter.

{{< img src="4.png" alt="" >}}

### Onboarding-Workshop auswählen

Wenn Sie an unserem Onboarding-Workshop zum Thema PSKE durch einen unserer Mitarbeiter teilnehmen möchten, kreuzen Sie bitte das entsprechende Feld an.

{{< img src="5.png" alt="" >}}

### Beratung zu weiteren Zusatzleistungen

Wenn Sie sich über weitere Zusatzleistungen informieren möchten, wählen Sie bitte auch unser Angebot für eine Beratung zu diesem Thema.

{{< img src="6.png" alt="" >}}

### Security Operations Center

Dieser Dienst wird in Kürze für Sie verfügbar sein.


### Auslösen der Bestellung

Bitte überprüfen Sie Ihre eingegebenen Daten über die Zusammenfassung. Bitte lesen Sie die Allgemeinen Geschäftsbedingungen und Vereinbarungen und bestätigen Sie diese. Erst dann können Sie die Bestellung abschließen, indem Sie auf Jetzt kostenpflichtig bestellen klicken.

{{< img src="7.png" alt="" >}}

### Bestellstatus verfolgen

Unmittelbar nach dem Absenden Ihrer Bestellung werden Sie zum Bestellstatus weitergeleitet. Hier können Sie jederzeit den Status der aktuellen Bestellung einsehen.

- NEU: Status direkt nach der Bestellung
- BEARBEITUNG: Status, sobald die automatische Bereitstellung begonnen hat
- FEHLGESCHLAGEN: Leider ist etwas schief gelaufen, bitte eröffnen Sie ein Ticket hier im Portal, damit wir Ihnen schnellstmöglich helfen können.
- ERFOLGT: Herzlichen Glückwunsch, Ihr PSKE ist verfügbar

### Zugangsdaten einsehen

Unmittelbar nach Ihrer Bestellung können Sie von der Bestellung direkt zum Vertrag springen. Dort finden Sie die Zugangsdaten. Sie können die Zugangsdaten auch jederzeit über die Verträge abrufen.

## Erste Schritte mit PSKE

### Webinterface

#### Anmeldung

Durch Aufruf von: https://dashboard.prod.gardener.get-cloud.io/ gelangen Sie auf die folgende Website:

{{< img src="8.png" alt="" >}}

Sie können sich dort mit dem von uns bereitgestellten API-Token anmelden.

#### Übersicht

Sie sollten nun diese Übersicht sehen (Cluster sind in dieser Demo bereits vorhanden).

{{< img src="9.png" alt="" >}}

### Clustererstellung

### Cluster-Details

{{< img src="10.png" alt="" >}}

1. Der Clustername kann frei gewählt werden - die Zeichen sind nur durch Kleinbuchstaben [a-z] oder Ziffern [0-9] beschränkt (keine Sonderzeichen).
2. Die Kubernetes-Version ist frei wählbar (wir empfehlen die Verwendung der neuesten Version, da diese alle gängigen Kubernetes-Funktionen unterstützt).
Versionen, die nicht mehr verfügbar sind, sind entsprechend gekennzeichnet.
1. Wählen Sie hier den Zweck des Clusters aus. Es werden die folgenden Standardeinstellungen vorgenommen (die natürlich angepasst werden können):
   1. Für "Evaluation" wird der Cluster am Ende des Arbeitstages (17:00 Uhr) heruntergefahren, aber nicht wieder hochgefahren.
   2. Bei "Entwicklung" schaltet er sich automatisch ab (um 17:00 Uhr) und fährt wieder hoch (um 8:00 Uhr).
   3. Bei "Testing" wird von unserer Seite keine Überwachung und Protokollierung für den Cluster bereitgestellt.
   4. Für die "Produktion" ist kein Ruhezeitplan hinterlegt, sie läuft 24/7.

### Details zur Infrastruktur

{{< img src="11.png" alt="" >}}

1. Unter "Cloud Profile" geben Sie an, in welchem unserer Rechenzentren Ihr Cluster laufen soll.
2. Das Secret für die pluscloud open ist bereits bei uns hinterlegt und kann von Ihnen nicht gelöscht oder geändert werden.
3. Je nach gewähltem Cloud-Profil wird automatisch die Region entsprechend hinterlegt (prod1 => DE-WEST (Köln), prod2 => DE-NORD (Hamburg), prod3 => DE-NORD (Hamburg) und prod4 => DE-SOUTH (Düsseldorf).
Dies bezieht sich auf den Standort der Rechenzentren in Köln und Hamburg (wir haben hier zwei Rechenzentren).
1. Wir empfehlen die Vorauswahl "Cilium" als "Networking Type" zu verwenden.

### Worker

{{< img src="12.png" alt="" >}}

1. Der Gruppenname kann frei gewählt werden, die Zeichen sind nur durch Kleinbuchstaben [a-z] oder Ziffern [0-9] beschränkt (nur das "-" Zeichen ist als Sonderzeichen erlaubt).
2) Wir unterstützen nur die "amd64"-Architektur.
3) Hier können unter "Machine Type" verschiedene Flavors ausgewählt werden (z.B. SCS-16V:64:100 - Sovereign Cloud Stack (SCS)), die sich in der Kombination von CPU-Kernen und RAM unterscheiden.
4. Flatcar oder Ubuntu ist derzeit als "Machine Image" für die Worker verfügbar.
5. Containerd oder Docker kann als "Container Runtime" ausgewählt werden. Wir empfehlen, die Vorauswahl containerd zu verwenden, da in neueren Kubernetes-Versionen keine Docker-Unterstützung mehr existiert.
6. Die gewünschte "Volume Size" für den Worker kann hier konfiguriert werden, ein späteres Downsizing des Volumes ist über das Dashboard im Self-Service möglich.
Das Downsizing wird als Rolling Upgrade durchgeführt, d.h. der alte Worker wird durch einen neuen Worker mit der neuen Größe ersetzt.
1. Mit dem Autoscaling kann die maximale und minimale Anzahl sowie die Anzahl der Schritte, in denen weitere Worker gestartet werden, festgelegt werden. Der Autoscaler arbeitet auf Basis der angeforderten Ressourcen der Worker, eine ausführliche Erklärung finden Sie hier https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
2. AZ = Availability Zones (Verfügbarkeitszonen), die sich über mehrere Brandabschnitte erstrecken.

### Flavors

Bei der Erstellung eines Clusters in der PSKE stehen 11 verschiedene Flavors für die Nodes zur Verfügung:

| Flavor | CPU | RAM | ROM |
| --- | --- | --- | --- |
| SCS-2V:4:100 | 2 vCPUs | 4 GB | 100 GB |
| SCS-2V:8:100 | 2 vCPUs | 8 GB | 100 GB |
| SCS-2V:16:50 | 2 vCPUs | 16 GB | 50 GB |
| SCS-4V:8:100 | 4 vCPUs | 8 GB | 100 GB |
| SCS-4V:16:100 | 4 vCPUs | 16 GB | 100 GB |
| SCS-4V:32:100 | 4 vCPUs | 32 GB | 100 GB |
| SCS-8V:8:100 | 8 vCPUs | 8 GB | 100 GB |
| SCS-8V:16:100 | 8 vCPUs | 16 GB | 100 GB |
| SCS-8V:32:100 | 8 vCPUs | 32 GB | 100 GB |
| SCS-16V:32:100 | 16 vCPUs | 32 GB | 100 GB |
| SCS-16V:64:100 | 16 vCPUs | 64 GB | 100 GB |

Die Auswahl im Dashboard sieht wie folgt aus:

{{< img src="13.png" alt="" >}}

### Maintenance

{{< img src="14.png" alt="" >}}

1. Ein Wartungsfenster für automatische Updates (Betriebssystem und Kubernetes-Patch-Version) kann hier konfiguriert werden. Wir empfehlen, ein Wartungsfenster zu definieren und das Häkchen bei "Auto Updates" zu setzen.
2. die Updates für das Betriebssystem der Worker werden per Rolling Update durchgeführt, d.h. ein Worker wird herausgenommen und ein neuer Worker mit durchgeführten Updates wird aufgenommen.
3. Um sicherzustellen, dass der Kubernetes-Cluster immer alle Funktionen unterstützt, ist ein kontinuierliches Patchen der Kubernetes-Version notwendig.

### Hibernation

{{< img src="15.png" alt="" >}}

1. die Tage, an denen Sie Ihren Cluster starten oder herunterfahren wollen, um Ressourcen und damit Kosten zu sparen.
2. die Uhrzeit, zu der der Cluster aufgeweckt werden soll, kann hier angegeben werden.
3. hier wird die Uhrzeit angegeben, zu der der Cluster heruntergefahren werden soll.

## Secrets

### DNS Secrets

{{< img src="16.png" alt="" >}}

1. Hier können die Secrets für einen externen DNS-Anbieter gespeichert werden.

## Member

{{< img src="17.png" alt="" >}}

1. Hier finden Sie eine Übersicht über die bereits angelegten Servicekonten.
2. Weitere Servicekonten mit unterschiedlichen Rollen können Sie einfach im Self-Service anlegen.
3. Hier finden Sie eine Übersicht und eine Beschreibung der verschiedenen Servicekonten.

## Kubeconfig

Um mit einem Cluster interagieren zu können, muss eine Kubeconfig vorhanden sein.

### Download der Kubeconfig

{{< img src="18.png" alt="" >}}

{{< img src="19.png" alt="" >}}

1. Laden Sie die Kubeconfig über das Schlüsselsymbol in der Leiste des jeweiligen Clusters herunter.
2. Im neuen Fenster klicken Sie einfach auf das Download-Symbol.

### Verwendung der Kubeconfig

Die heruntergeladene Kubeconfig sollte idealerweise im Ordner ".kube" im Home-Verzeichnis des jeweiligen Benutzers gespeichert werden.

```mv {KUBECONFIG-NAME}.yaml ~/.kube/```

Diese kann dann exportiert werden.

```export KUBECONFIG=~/.kube/{KUBECONFIG-NAME}.yaml```