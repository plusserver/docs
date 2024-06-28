---
title: "Schnellstart"
linkTitle: "Schnellstart"
type: "docs"
weight: 10
date: 2024-06-27
description: >
  Schneller Einstieg in die pluscloud VMware und die damit verbundenen Selfservice-Funktionen. 
---

Dieses Dokument dient Ihnen zum schnellen Einstieg in die pluscloud v und die damit verbundenen Selfservice-Funktionen.
Für die umfangreichen Selfservices sowie das Netzwerk-, Storage- und VM-Management nutzen Sie hier den VMware vCloud Director.

## Erste Schritte

Dieser Artikel behandelt Schritt für Schritt, wie nach dem initialen Netzwerksetup {{< abbr "VM" "Virtuelle Maschine" >}}s und/oder {{< abbr "vApps" "Virtuelle Applikationen" >}} erstellt werden und diese final in externe Netze oder an das Internet angebunden werden.

Bei diesem und anderen Themen steht natürlich unser Support ebenfalls zur Verfügung.

{{< screenshot src="img/help.png" title="Hilfemenü" >}}
Umfangreiche Hilfe in technischen Portaldetails können Sie über das Fragezeichen in der oberen rechten Ecke bei VMware Online einsehen.
{{< /screenshot >}}

#### Anmeldedaten

Dieses Dokumentation setzt voraus, dass Sie sowohl Ihre Zugangsdaten (Benutzername und Kennwort) als auch Ihre Mandanten-{{< abbr "URL" "Uniform Resource Locator">}} bereits vorliegen haben.

Mit diesen Daten kommen Sie direkt in das pluscloud vCloud Director Portal.

{{% alert title="Hinweis" color="info" %}}
**Initiales Passwort ändern**  
Es wird aus Sicherheitsgründen empfohlen, das Administrator-Kennwort beim ersten Login zu ändern.
{{% /alert %}}

{{< screenshot src="img/portal-ip-overview.png" title="IP-Übersicht im Kundenportal" >}}
Zusätzlich ist es hilfreich, Ihre weiteren öffentlichen IP-Adressen griffbereit zu haben. Diese können Sie auch im plusserver-Kundenportal einsehen.
{{< /screenshot >}}

{{< screenshot src="img/vdc-overview.png" title="OrgVDC Übersicht" >}}
Nach dem Login in die pluscloud sehen Sie eine Übersicht über die virtuellen Datacenter Ihrer Organisation ({{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s)
{{< /screenshot >}}

{{< screenshot src="img/vdc-management.png" title="OrgVDC Verwaltung"  >}}
Mit einem Klick auf den im obigen Screenshot grün markierten Bereich gelangen Sie in das virtuelle Datacenter und können dieses administrieren
{{< /screenshot >}}

## Verwaltung von OrgVDC Netzwerken

OrgVDC Netzwerke sind virtuelle {{< abbr "LAN" "Local Area Network" >}}s, 
welche innerhalb eines {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} bereitgestellt werden.
Sie dienen zur Verbindung zwischen verschiedenen Komponenten eines {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s.

Um einen Zugriff von innerhalb des {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s zum Internet herzustellen,
können Sie ein {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} Netzwerk verwenden, das mit einem edge-gateway verbunden ist.
Ein solches Netzwerk wird in der Regel bei der Bereitstellung des {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s
mit dem Namen `default-network` angelegt, kann aber gelöscht und/oder modifiziert werden.
Weiterhin müssen auf dem Edge Gateway passende {{< abbr "NAT" "Network Address Translation" >}}-Regeln angelegt sein,
um Datenverkehr zwischen {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} Komponenten und dem Internet zu ermöglichen.

{{< screenshot src="img/network-overview.png" title="OrgVDC Netzwerkübersicht" >}}
Wenn Sie unter Netzwerk auf den Menüpunkt Netzwerke im linken Navigationsmenü klicken, sehen Sie alle bestehenden Netzwerke.
{{< /screenshot >}}

{{< screenshot src="img/network-default-network.png" title="Default Netzwerk" >}}
Ihr Organisationsnetzwerk sollte bei Netzwerktyp den Status `Weitergeleitet` aufweisen. Die erste Adresse des verwendeten Subnetzes ist hierbei an das Edge-Gateway gebunden.
{{< /screenshot >}}

{{< screenshot src="img/network-new.png" title="Neues Netzwerk anlegen" >}}
Ein fehlendes oder zusätzliches Organisationsnetzwerk sowie weitere Netze können Sie über die Schaltfläche `Neu` anlegen.
{{< /screenshot >}}

{{< screenshot src="img/network-new-area.png" title="Bereich des Netzwerks auswählen">}}
Hier wählen Sie den Gültikkeitsbereich eines Netzwerks aus. 
In diesem beispiel handelt es sich um das aktuell angewählte {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}
{{< /screenshot >}}

Beim Typ des zu erstellenden Netzwerks bietet die Option `Weitergeleitet` die Möglichkeit, Ihr Edge-Gateway auszuwählen und externe Kommunikation zu ermöglichen.
Isolierte Netzwerke stehen nur Ihren virtuellen Maschinen zur Verfügung und sind von externen Verbindungen abgekoppelt.

#### Relevante Netzwerkparameter
Im Wizard für weitergeleitete Netzwerke sind folgende Parameter relevant:

| Parameter           | Beschreibung                 |
|---------------------|------------------------------|
| Bereich             | Auswahl, ob das Netzwerk Konnektivität nur für VMs im aktuellen VDC bereitstellt oder in der Datencentergruppe teilnehmenden VDCs. |
| Typ                 | Unterscheidet, ob ein Netz weitergeleitet oder isoliert ist. Nur weitergeleitete Netzwerke bieten eine Konnektivität nach außen und eine Anbindung an das Edge-Gateway. |
| Edge-Gateway        | Unter diesem Punkt kann die Verbindung zum bereits bestehenden Edge-Gateway hergestellt werden. Als Schnittstellentyp ist im Normalfall `Intern` auszuwählen. |
| Gast-VLAN zulassen  | Ermöglicht die Erstellung von VLANs mit eigenen Sub-Interfaces. Diese Option wird im Regelfall nicht benötigt und wird nicht empfohlen. |
| Distributed Routing | Aktiviert Distributed Routing |
| Name                | Frei definierbarer Name für das zu erstellende Netzwerk. Dient als Referenz, um VMs mit dem Netzwerk zu verbinden. |
| Beschreibung        | Optionaler Freitext, um weitere Informationen zu hinterlegen (z. B. Zweck und Verwendung des Netzwerks). |
| Dual Stack Modus    | Ermöglicht, dass das Netzwerk sowohl ein IPv4-Subnetz als auch ein IPv6-Subnetz hat. |
| Gateway CIDR        | Angabe der internen IP-Adressen des Gateways, gefolgt von der Angabe des Subnetzes in CIDR Notation (IP/Netmask). |
| Gemeinsame Nutzung mit anderen vDCs in der Organisation | Option, um Netzwerke über mehrere virtuelle pluscloud DCs gemeinschaftlich zu nutzen. Im Regelfall deaktiviert.|
| Statischer IP Pool | Pool von IP Adressen zur automatischen Zuteilung an Netzwerkkomponenten (wie VMs oder vApp Gateways), die mit dem Netzwerk verbunden sind. |
| Primary und Secondary DNS | Die IP-Adressen der zu verwendenden DNS Server. Üblicherweise das Edge-Gateway. |
| DNS Suffix |  Falls ein spezifischer DNS Suffix benötigt wird, kann dieser hier eingetragen werden und wird automatisch bei den angeschlossenen VMs verwendet. Dieser Suffix wird bei der Namensauflösung als Standard-Suchdomäne verwendet. |

## Edge Gateway Konfiguration

Jedem OrgVDC wird automatisch eine Edge Gateway zugewiesen.
Dieses stellt für Ihre Umgebung den Zugang zum Internet zur Verfügung.
Des weiteren bietet es diverse Dienste an, z. B. Gateway Firewall, NAT, DNS, IPAM und IPsec VPN.
Virtuelle Maschinen haben standardmäßig keine Verbindung zur Außenwelt.
Diese muss erst über passende NAT- und Firewall-Regeln im Edge-Gateway freigeschaltet werden.

{{< screenshot src="img/edgegw-selection.png" title="Edge Gateway Auswahl">}}
Die Konfiguration der Edge Gateways Verbindungen erfolgt über den Menüpunkt Edges im linken Menü.
Durch das Klicken auf den Namen des Edge-Gateways aus der Liste wird das Verwaltungsmenü des Edge-Gateways geöffnet.
{{< /screenshot >}}

{{< screenshot src="img/edgegw-overview.png" title="Edge Gateway Übersicht">}}
In diesem  stehen Ihnen die einzelnen Parameter zur Konfiguration des Edge-Gateways zur Verfügung.
Einige Standards werden durch plusserver bereits vorkonfiguriert ausgeliefert.
{{< /screenshot >}}

Damit Kommunikation zwischen VMs und dem Internet möglich wird, sind ein paar Firewall-Regeln, Anwendungsportprofile und NAT-Regeln notwendig.

### Anwendungsportprofile

Wir empfehlen Ihnen, zuerst die Anwendungsportprofile zu setzen.
Die Anwendungsportprofile werden benötigt, um Ports für Anwendungen in einer Entität zusammenzufassen.

{{< screenshot src="img/edgegw-app-profile-overview.png" title="Anwendungsprofil Übersicht">}}
Dazu muss der Reiter `Anwendungsportprofile` in der Edge-Gateway-Konfiguration gewählt werden.
{{< /screenshot >}}

{{< screenshot src="img/edgegw-app-profile-new.png" title="Neues Anwendungsprofil">}}
Hier können Sie mit der Schaltfläche "NEU" ein neues Anwendungsportprofil anlegen oder sich die Standardanwendungen und die benutzerdefinierten Anwendungen überprüfen.
{{< /screenshot >}}

{{< screenshot src="img/edgegw-app-profile-create.png" title="Dialog für neues Anwendungsprofil">}}
In diesem Dialogfenster können Sie die Ports für ein neues Anwendungsprofil konfigurieren.
Sie können einer Anwendung weitere Ports hinzufügen, indem Sie die Schaltfläche `Portprofil hinzufügen` verwenden.
{{< /screenshot >}}

#### Parameter für ein Anwendungsprofil
Folgende Parameter können Sie in einem Anwendungsprofil konfigurieren:

| Parameter             | Beschreibung                                                                                                              |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| Name                  | Frei definierbarer Name für das zu erstellende Anwendungsportprofil.                                                      |
| Beschreibung          | Optionaler Freitext, um weitere Informationen zu hinterlegen (z. B. Zweck und Verwendung des Anwendungsportprofils).      |
| Portprofil hinzufügen | Fügt ein weiteres Protprofil hinzu.                                                                                       |
| Protokoll             | Auswahl des Protokolles: {{< abbr "TCP" "Transport Control Protocol" >}} oder {{< abbr "UDP" "User Datagram Protocol" >}} |
| Port                  | Auswahl des Ports oder der Ports als kommaseparierte Liste von Portnummern                                                |

### NAT Regeln

Wir empfehlen Ihnen, als nächstes die {{< abbr "NAT" "Network Address Translation" >}}-Regeln zu setzen.
Diese {{< abbr "NAT" "Network Address Translation" >}}-Regeln spezifizieren, wie zwischen internen, meist in der Regel privaten IP-Adressen aus dem RFC1918 Adressbereich und den öffentlichen IP-Adressen übersetzt werden soll.

{{< screenshot src="img/nat.png" title="NAT Regeln">}}
Dazu muss der Reiter {{< abbr "NAT" "Network Address Translation" >}} in der Edge-Gateway-Konfiguration gewählt werden.
{{< /screenshot >}}

{{% alert title="Hinweis" color="info" %}}
**Prioritäten bei NAT-Regeln**  
Wenn eine Adresse über mehrere NAT-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet. Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel.  Die Regeln können Sie mit den Buttons `NACH OBEN VERSCHIEBEN` und `NACH UNTEN VERSCHIEBEN` verschieben, um die passende Reihenfolge festzulegen. Alternativ können Sie aber auch mit `VERSCHIEBEN NACH` die Regeln an eine definierte Stelle verschieben.
{{% /alert %}}

{{< screenshot src="img/nat-new.png" title="Neue NAT Regel erstellen" >}}
Öffnen Sie den Dialog zum Erstellen einer neuen {{< abbr "NAT" "Network Address Translation" >}}-Regel über die Schaltfläche `Neu`
{{< /screenshot >}}

{{< screenshot src="img/nat-new-dialog.png" title="Dialog zum Erstellen einer neuen NAT Regel" >}}
Öffnen Sie den Dialog zum Erstellen einer neuen {{< abbr "NAT" "Network Address Translation" >}}-Regel über die Schaltfläche `Neu`
{{< /screenshot >}}

#### SNAT Parameter

Eine {{< abbr "SNAT" "Source Network Address Translation">}}-Regel stellt eine Vorschrift dar, wie eine Quell-IP zu einer Ziel-IP übersetzt werden soll.
Die Quell-IP liegt dabei in der Regel innerhalb des OrgVDCs während die Ziel-IP in der Regel außerhalb des OrgVDC-Netzwerks liegt.

Üblicherweise sollten Sie {{< abbr "SNAT" "Source Network Address Translation">}}-Regeln verwenden, wenn Sie von innerhalb des OrgVDCs auf Internetressourcen zugreifen möchten.

Die nachfolgenden Parameter sollten Sie konfigurieren:

| Parameter            | Beschreibung                             |
|----------------------|------------------------------------------|
| Name                 | Frei definierbarer Name für die zu erstellende NAT-Regel.                                                |
| Beschreibung         | Optionaler Freitext, um weitere Informationen zu hinterlegen (z. B. Zweck und Verwendung der NAT-Regel). |
| Schnittstellentyp    | Um eine {{< abbr "SNAT" "Source Network Address Translation">}}-Regel zu erstellen muss hier {{< abbr "SNAT" "Source Network Address Translation">}} gewählt werden.                                           |
| Externe IP           | Hier verwenden Sie eine der Ihnen zugeordneten öffentlichen IP-Adressen.                                 |
| Externer             | Der "externe Port" definiert den Port, von der definierten externe IP-Adresse, welcher genutzt wird, um auf den SNAT-Dienst zuzugreifen. |
| Interne IP           | Dies ist das vorher definierte IP-Subnetz, welches Sie intern verwenden.                                 |
| Anwendung            | Hier wird ein Anwendungsprofil gewählt.                                                                  |

Die nachfolgenden Parameter können Sie optional zusätzlich konfigurieren:

| Parameter            | Beschreibung                             |
|----------------------|------------------------------------------|
| Zustand              | Wenn dieser Schalter aktiviert ist, wird das NAT Zustandsbehaftet konfiguriert. Dies ermöglicht es bei ausgehenden TCP Anfragen die zugehörigen Antworten zu empfangen. |
| Protokollierung      | Über diese Option kann das im Edge-Gateway integrierte Logging des gesamten Traffics zu dieser Regel aktiviert werden. Diese Protokollierung können Sie nicht selbstständig einsehen. Wir empfehlen diese Option deaktiviert zu lassen, sofern Sie nicht von uns dazu aufgefordert werden, eine andere Einstellung vorzunehmen. |
| Priorität            | Wenn eine Adresse über mehrere NAT-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet. Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel.
| Firewall-Übereinstimmung | Legt fest, wie die Firewall während der NAT eine Adressübereinstimmung ermittelt, wenn die Firewallphase nicht übersprungen wird. Im Folgenden sind gültige Werte aufgeführt: *Interne Adressübereinstimmung* Gibt an, dass die Firewall auf die interne Adresse einer NAT-Regel angewendet wird. Für SNAT ist die interne Adresse die ursprüngliche Quelladresse, bevor NAT durchgeführt wird. Für DNAT ist die interne Adresse die übersetzte Zieladresse, nachdem NAT durchgeführt wurde; *Externe Adressübereinstimmung*	Gibt an, dass die Firewall auf die externe Adresse einer NAT-Regel angewendet wird. Für SNAT ist die externe Adresse die übersetzte Quelladresse, nachdem NAT durchgeführt wurde. Für DNAT ist die externe Adresse die ursprüngliche Zieladresse, bevor NAT durchgeführt wird *Bypass* Firewallphase wird übersprungen.|
| Interne IP             | Hier verwenden Sie die Ihnen zugeordneten öffentlichen IP-Adressen oder Subnetze.|
| Anwendung              | hier wird ein Anwendungsprofil gewählt, welches die Ports festlegt.|

#### DNAT Parameter

Eine {{< abbr "DNAT" "Destination Network Address Translation">}}-Regel stellt eine Vorschrift dar, wie eine Quell-IP zu einer Ziel-IP übersetzt werden soll.
Die Quell-IP liegt dabei in der Regel außerhalb des OrgVDCs während die Ziel-IP in der Regel innerhalb des OrgVDC-Netzwerks liegt.

Üblicherweise sollten Sie {{< abbr "DNAT" "Destination Network Address Translation">}}-Regeln verwenden, wenn Sie von außerhalb des OrgVDCs auf eine Ressource innerhalb des OrgVDCs zugreifen möchten.

Die nachfolgenden Parameter sollten Sie konfigurieren:

| Parameter            | Beschreibung                             |
|----------------------|------------------------------------------|
| Name                 | Frei definierbarer Name für die zu erstellende NAT-Regel.                                                |
| Beschreibung         | Optionaler Freitext, um weitere Informationen zu hinterlegen (z. B. Zweck und Verwendung der NAT-Regel). |
| Schnittstellentyp    | Um eine {{< abbr "DNAT" "Destination Network Address Translation">}}-Regel zu erstellen muss hier {{< abbr "DNAT" "Destination Network Address Translation">}} gewählt werden.                                           |
| Externe IP           | Hier verwenden Sie eine der Ihnen zugeordneten öffentlichen IP-Adressen.                                 |
| Externer Port        | Der "externe Port" definiert den Port, von der definierten externe IP-Adresse, welcher genutzt wird, um auf den DNAT-Dienst zuzugreifen. |
| Interne IP           | Dies ist das vorher definierte IP-Subnetz, welches Sie intern verwenden.                                 |
| Anwendung            | Hier wird ein Anwendungsprofil gewählt.                                                                  |

Die nachfolgenden Parameter können Sie optional zusätzlich konfigurieren:

| Parameter            | Beschreibung                             |
|----------------------|------------------------------------------|
| Zustand              | Wenn dieser Schalter aktiviert ist, wird das NAT Zustandsbehaftet konfiguriert. Dies ermöglicht es bei ausgehenden TCP Anfragen die zugehörigen Antworten zu empfangen. |
| Protokollierung      | Über diese Option kann das im Edge-Gateway integrierte Logging des gesamten Traffics zu dieser Regel aktiviert werden. Diese Protokollierung können Sie nicht selbstständig einsehen. Wir empfehlen diese Option deaktiviert zu lassen, sofern Sie nicht von uns dazu aufgefordert werden, eine andere Einstellung vorzunehmen. |
| Priorität            | Wenn eine Adresse über mehrere NAT-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet. Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel.
| Firewall-Übereinstimmung | Legt fest, wie die Firewall während der NAT eine Adressübereinstimmung ermittelt, wenn die Firewallphase nicht übersprungen wird. Im Folgenden sind gültige Werte aufgeführt: *Interne Adressübereinstimmung* Gibt an, dass die Firewall auf die interne Adresse einer NAT-Regel angewendet wird. Für SNAT ist die interne Adresse die ursprüngliche Quelladresse, bevor NAT durchgeführt wird. Für DNAT ist die interne Adresse die übersetzte Zieladresse, nachdem NAT durchgeführt wurde; *Externe Adressübereinstimmung*	Gibt an, dass die Firewall auf die externe Adresse einer NAT-Regel angewendet wird. Für SNAT ist die externe Adresse die übersetzte Quelladresse, nachdem NAT durchgeführt wurde. Für DNAT ist die externe Adresse die ursprüngliche Zieladresse, bevor NAT durchgeführt wird *Bypass* Firewallphase wird übersprungen.|
| Interne IP             | Hier verwenden Sie die Ihnen zugeordneten öffentlichen IP-Adressen oder Subnetze.|
| Anwendung              | hier wird ein Anwendungsprofil gewählt, welches die Ports festlegt.|

### Gateway Firewall

Das Edge Gateway bietet auch einen Firewall-Dienst, welcher den Datenverkehr zwischen außerhalb und innerhalb eines OrgVDCs einschränken kann.
Diese Firewall kann nicht zwischen Netzwerksegmenten innerhalb eines OrgVDCs eingesetzt werden, da dieser interne Datenverkehr nicht über den Service Router, an dem die Firewall-Regeln evaluiert wird, geleitet wird.

{{% alert title="Hinweis" color="info" %}}
**Prioritäten bei Firewall-Regeln**  
Wenn eine Adresse über mehrere Firewall-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet.
Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel.
{{% /alert %}}

{{< screenshot src="img/edgegw-fw-overview.png" title="Firewall Ansicht" >}}
Die Firewall können Sie über die entsprechende Schaltfläche im seitlichen Menü auswählen.
{{< /screenshot >}}

Die Regeln können Sie mit den Buttons `NACH OBEN VERSCHIEBEN` und `NACH UNTEN VERSCHIEBEN` verschieben, um die passende Reihenfolge festzulegen. 
Alternativ können Sie aber auch mit `VERSCHIEBEN NACH` die Regeln an eine definierte Stelle verschieben.

Die Firewall-Regeln werden von oben nach unten abgearbeitet und die erste zutreffende Regel wird angewandt.
Die letzte Regel ist immmer enthalten und sorgt für das verwerfen der Netzwerkkommunikation, sofern diese nicht ausdrücklich durch eine vorherige Regel zugelassen wurde.

{{< screenshot src="img/edgegw-fw-edit-rules.png" title="Firewall Regeln" >}}
Die Firewall-Regeln können Sie mit Klick auf die Schaltfläche `Regeln bearbeiten` editieren.
{{< /screenshot >}}

#### Firewallregeln erstellen

[//]: # (TODO: Screenshot missing)

Hier können Sie neue Regel erstellen mit `NEUE OBEN`, welches eine neue Regel am Anfang der Liste erstellt,
oder indem Sie eine Vorhandene Regel Auswählen und dann `NEUE DADRÜBER` auswählen, welches eine neue Regel über der Ausgewählten erstellt.

Die nachfolgenden Parameter sollten Sie konfigurieren:

| Parameter             | Beschreibung                                                                                                              |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| Name                  | Frei wählbarer Name für die Regel                                                                                         |
| Kategorie             | Art der Regel (Nicht editierbar)                                                                                          |
| Zustand               | Definiert ob die Regel aktiv oder inaktiv ist. Inaktive Regeln werden ignoriert.                                          |
| Anwendung             | Auswahl welches Anwenungsprofil angewendet werden soll (Sammlung von Ports für eine Anwendung)                            |
| Quelle                | Ursprung der Datenkommunikation (Beispiel: DNAT - jede Quelle / SNAT - internes Netzwerk)                                 |
| Ziel                  | Adressat der Datenkommunikation (Beispiel: DNAT - internes Netzwerk / SNAT - Belibiges Zeil)                              |
| Aktion                | Bestimmt ob die Datenkommunikation zugelassen, verworfen oder mit entsprechender Information zurückgewiesen wird          |
| Protokoll             | Auswahl des für die Regel benutzen Kommunikationsprotokolls                                                               |
| Protokollierung       | Über diese Option kann das im Edge-Gateway integrierte Logging des gesamten Traffics zu dieser Regel aktiviert werden.    |

Mit `Speichern` übernehmen Sie die konfigurierten Regeln.

{{% alert title="Hinweis" color="info" %}}
**PSMANAGED-Regeln**  
Bitte lassen Sie die PSMANAGED-Regeln (`plusserver_default_out`) unbedingt bestehen.
Diese haben einen direkten Einfluss auf die gebuchten Services.
Wenn diese nicht existieren, wird das Management/die Funktion seitens plusserver eingeschränkt.
{{% /alert %}}

### Loadbalancer

Beim Loadbalancer handelt es sich um eine kostenpflichtige Zusatzoption.
Daher wird in dieser Anleitung kein Loadbalancing behandelt.

### IPSec VPN

Ein Edge Gateway bietet begrenzte Möglichkeiten der Einrichtung eines VPNs mit IPSec.
Dies ist nicht für alle Setups erforderlich und wird daher in dieser Anleitung nicht weiter beschrieben.
