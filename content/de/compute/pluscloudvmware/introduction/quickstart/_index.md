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

### Anmeldedaten

Dieses Dokumentation setzt voraus, dass Sie sowohl Ihre Zugangsdaten (Benutzername und Kennwort) als auch Ihre Mandanten-{{< abbr "URL" "Uniform Resource Locator">}} bereits vorliegen haben.

Mit diesen Daten kommen Sie direkt in das pluscloud vCloud Director Portal.

{{% alert title="Hinweis" color="info" %}}
**Initiales Passwort ändern**  
Es wird aus Sicherheitsgründen empfohlen, das Administrator-Kennwort beim ersten Login zu ändern.
{{% /alert %}}

#### Öffentliche IP Adresse

Zusätzlich ist es hilfreich, Ihre weiteren öffentlichen IP-Adressen griffbereit zu haben.
Diese können Sie auch in den Konfigurationsdialogen einsehen, wenn diese relevant sind.

### Datacenter

In der pluscloud VMware wird ein Mandant als so genannte `Organisation` abgebildet.
Eine solche `Organisation` verwaltet die Nutzerzugänge und Berechtigungen und beinhaltet ein oder mehrere Virtuelle Datacenter ({{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s), welche die Rechenressourcen für die virtualisierten Workloads bereitstellen.

{{< screenshot src="img/vdc-overview.png" title="OrgVDC Übersicht" >}}
Nach dem Login in die pluscloud sehen Sie eine Übersicht über die ({{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s) Ihrer Organisation.
{{< /screenshot >}}

{{< screenshot src="img/vdc-management.png" title="OrgVDC Verwaltung"  >}}
Mit einem Klick auf den im obigen Screenshot grün markierten Bereich gelangen Sie in das {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} und können dieses administrieren
{{< /screenshot >}}

## OrgVDC Netzwerke

{{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} Netzwerke sind virtuelle Netzwerksegmente, 
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
Ihr Organisationsnetzwerk sollte bei Netzwerktyp den Status `Weitergeleitet` aufweisen.
Die erste Adresse des verwendeten Subnetzes ist hierbei an das Edge-Gateway gebunden.
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
| Bereich             | Auswahl, ob das Netzwerk Konnektivität nur für {{< abbr "VM" "Virtuelle Maschine" >}}s im aktuellen {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} bereitstellt oder in der Datencentergruppe teilnehmenden {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s. |
| Typ                 | Unterscheidet, ob ein Netz weitergeleitet oder isoliert ist. Nur weitergeleitete Netzwerke bieten eine Konnektivität nach außen und eine Anbindung an das Edge-Gateway. |
| Edge-Gateway        | Unter diesem Punkt kann die Verbindung zum bereits bestehenden Edge-Gateway hergestellt werden. Als Schnittstellentyp ist im Normalfall `Intern` auszuwählen. |
| Gast-VLAN zulassen  | Ermöglicht die Erstellung von {{< abbr "VLAN" "Virtual Local Area Network" >}}s mit eigenen Sub-Interfaces. Diese Option wird im Regelfall nicht benötigt und wird nicht empfohlen. |
| Distributed Routing | Aktiviert Distributed Routing |
| Name                | Frei definierbarer Name für das zu erstellende Netzwerk. Dient als Referenz, um {{< abbr "VM" "Virtuelle Maschine" >}}s mit dem Netzwerk zu verbinden. |
| Beschreibung        | Optionaler Freitext, um weitere Informationen zu hinterlegen (z. B. Zweck und Verwendung des Netzwerks). |
| Dual Stack Modus    | Ermöglicht, dass das Netzwerk sowohl ein IPv4-Subnetz als auch ein IPv6-Subnetz hat. |
| Gateway {{< abbr "CIDR" "Classless Inter-Domain Routing" >}}        | Angabe der internen IP-Adressen des Gateways, gefolgt von der Angabe des Subnetzes in {{< abbr "CIDR" "Classless Inter-Domain Routing" >}} Notation (IP/Netmask). |
| Gemeinsame Nutzung mit anderen {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s in der Organisation | Option, um Netzwerke über mehrere virtuelle pluscloud DCs gemeinschaftlich zu nutzen. Im Regelfall deaktiviert.|
| Statischer IP Pool | Pool von IP Adressen zur automatischen Zuteilung an Netzwerkkomponenten (wie VMs oder vApp Gateways), die mit dem Netzwerk verbunden sind. |
| Primary und Secondary DNS | Die IP-Adressen der zu verwendenden DNS Server. Üblicherweise das Edge-Gateway. |
| DNS Suffix |  Falls ein spezifischer DNS Suffix benötigt wird, kann dieser hier eingetragen werden und wird automatisch bei den angeschlossenen VMs verwendet. Dieser Suffix wird bei der Namensauflösung als Standard-Suchdomäne verwendet. |

## Edge Gateway Konfiguration

Jedem OrgVDC wird automatisch eine Edge Gateway zugewiesen.
Dieses stellt für Ihre Umgebung den Zugang zum Internet zur Verfügung.
Des weiteren bietet es diverse Dienste an, z. B. Gateway Firewall, {{< abbr "NAT" "Network Adress Translation" >}}, {{< abbr "DNS" "Domain Name System" >}}, {{< abbr "IPAM" "Internet Protocol Adress Management" >}} und IPsec {{< abbr "VPN" "Virtual Private Network" >}}.
Virtuelle Maschinen haben standardmäßig keine Verbindung zur Außenwelt.
Diese muss erst über passende {{< abbr "NAT" "Network Adress Translation" >}}- und Firewall-Regeln im Edge-Gateway freigeschaltet werden.

{{< screenshot src="img/edgegw-selection.png" title="Edge Gateway Auswahl">}}
Die Konfiguration der Edge Gateways Verbindungen erfolgt über den Menüpunkt Edges im linken Menü.
Durch das Klicken auf den Namen des Edge-Gateways aus der Liste wird das Verwaltungsmenü des Edge-Gateways geöffnet.
{{< /screenshot >}}

{{< screenshot src="img/edgegw-overview.png" title="Edge Gateway Übersicht">}}
In diesem  stehen Ihnen die einzelnen Parameter zur Konfiguration des Edge-Gateways zur Verfügung.
Einige Standards werden durch plusserver bereits vorkonfiguriert ausgeliefert.
{{< /screenshot >}}

Damit Kommunikation zwischen VMs und dem Internet möglich wird, sind ein paar Firewall-Regeln, Anwendungsportprofile und {{< abbr "NAT" "Network Adress Translation" >}}-Regeln notwendig.

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
Wenn eine Adresse über mehrere {{< abbr "NAT" "Network Adress Translation" >}}-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet. Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel.  Die Regeln können Sie mit den Buttons `NACH OBEN VERSCHIEBEN` und `NACH UNTEN VERSCHIEBEN` verschieben, um die passende Reihenfolge festzulegen. Alternativ können Sie aber auch mit `VERSCHIEBEN NACH` die Regeln an eine definierte Stelle verschieben.
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
| Zustand              | Wenn dieser Schalter aktiviert ist, wird das {{< abbr "NAT" "Network Adress Translation" >}} Zustandsbehaftet konfiguriert. Dies ermöglicht es bei ausgehenden TCP Anfragen die zugehörigen Antworten zu empfangen. |
| Protokollierung      | Über diese Option kann das im Edge-Gateway integrierte Logging des gesamten Traffics zu dieser Regel aktiviert werden. Diese Protokollierung können Sie nicht selbstständig einsehen. Wir empfehlen diese Option deaktiviert zu lassen, sofern Sie nicht von uns dazu aufgefordert werden, eine andere Einstellung vorzunehmen. |
| Priorität            | Wenn eine Adresse über mehrere {{< abbr "NAT" "Network Adress Translation" >}}-Regeln verfügt, wird die Regel mit der höchsten Priorität angewendet. Ein niedrigerer Wert bedeutet eine höhere Priorität für diese Regel. |
| Firewall-Übereinstimmung | Legt fest, wie die Firewall während der {{< abbr "NAT" "Network Adress Translation" >}} eine Adressübereinstimmung ermittelt, wenn die Firewallphase nicht übersprungen wird. Im Folgenden sind gültige Werte aufgeführt: *Interne Adressübereinstimmung* Gibt an, dass die Firewall auf die interne Adresse einer NAT-Regel angewendet wird. Für SNAT ist die interne Adresse die ursprüngliche Quelladresse, bevor NAT durchgeführt wird. Für DNAT ist die interne Adresse die übersetzte Zieladresse, nachdem NAT durchgeführt wurde; *Externe Adressübereinstimmung*	Gibt an, dass die Firewall auf die externe Adresse einer NAT-Regel angewendet wird. Für SNAT ist die externe Adresse die übersetzte Quelladresse, nachdem {{< abbr "NAT" "Network Adress Translation" >}} durchgeführt wurde. Für DNAT ist die externe Adresse die ursprüngliche Zieladresse, bevor NAT durchgeführt wird *Bypass* Firewallphase wird übersprungen.|
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

[//]: # (TODO: Screenshot missing: FW Ruleset)

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

## Virtuelle Workloads

Bei virtuellen Workloads handelt es sich um virtuelle Maschinen (VMs), welche Sie optional über so genannte virtuelle Anwendungen (vApps) gruppieren können.

### vApps

vApps dienen der gruppierung von logisch zusammenhängenden virtuellen Maschinen. Wenn Sie beispielsweise eine Webanwendung haben, welche aus einer Webserver-VM, einer Anwendungsserver-VM und einer Datenbank-VM besteht, bietet es sich an diese drei VMs gemeinsam in einer vApp zusammen zu fassen.

{{< screenshot src="img/vapp-overview.png" title="vApps Ansicht" >}}
Über den Menüpunkt vApp können Sie die bestehenden vApps einsehen und neue erstellen.
{{< /screenshot >}}

{{< screenshot src="img/vapp-new.png" title="vApps erstellen" >}}
Die Erstellung läuft über den Button Neue vApp oder vApp aus einer OVF-Datei hinzufügen.
Ersteres fügt eine leere vApp für ein Standard-Deployment hinzu.
Letzteres eine vorkonfigurierte Umgebung aus einer OVF-Container-Datei.
{{< /screenshot >}}

Bei der Erstellung einer vApp ist nur der Name obligatorisch.
Im Beispiel wird eine vApp mit dem Namen `test` erstellt.
Alles Weitere kann auch im Nachgang oder auf VM-Ebene erfolgen.

[//]: # (TODO: Screenshot missing: vApp Create Dialog)

{{< screenshot src="img/vapp-network-new.png" title="vApp Netzwerk hinzufügen" >}}
In der vApp-Übersicht können Sie über den Menüpunkt Aktionen ein Netzwerk hinzufügen.
{{< /screenshot >}}

[//]: # (TODO: Section missing: vApp Network Wizard)

### Virtuelle Maschinen

Bei der Virtualisierung werden ein oder mehrere virtuelle IT-Systeme mit Hilfe eines Hypervisors auf physischen IT-Systemen ausgeführt.
Der Hypervisor stellt der VM mittels Software eine für dieses System eine gekapselte und von anderen VMs isolierte virtuelle Hardware zur Verfügung, welche die VM aus Ihrer Sicht wie reguläre Hardware nutzen kann.

Virtuelle Maschinen können über zwei Wege erstellt werden.

{{< screenshot src="img/vapp-vm-new.png" title="VM in vApp erstellen" >}}
Zum einen können Sie in der im vorherigen Schritt erstellten vApp den Menüpunkt `Aktionen` auswählen und dann `VM hinzufügen` nutzen.
Optional kann unter `Lease verlängern` ein Ablaufdatum für die vApp eingestellt werden, zu welchem die vApp gestoppt werden soll.
Standardmäßig laufen vApps nicht ab.
{{< /screenshot >}}

{{< screenshot src="img/vm-new.png" title="VM außerhalb einer vApp erstellen" >}}
Zum Anderen können Sie in der Seitenleiste den Menüpunkt `Virtuelle Maschinen` auswählen.
Hier können Sie die bestehenden VMs einsehen und über den Button Neue VM weitere erstellen.
{{< /screenshot >}}

{{< screenshot src="img/vm-new-dialog-poweron.png" title="VM erstellen Formular" >}}
In beiden Fällen wird Ihnen der gleiche Dialog zur Anlage einer neuen VM.

Bei der Erstellung der Virtuellen Maschinen können Sie grundsätzlich zwischen zwei Alternativen wählen:

* Erstellung aus einer Vorlage (Vorlage = Verbindung aus Template mit Betriebssystem, Ressourcen und Konfiguration)
* Erstellung einer neuen VM

VMs, die direkt über die vApp erstellt werden, werden dieser auch direkt logisch zugeordnet.
VMs, die über den Menüpunkt Virtuelle Maschinen erstellt werden, sind zunächst keiner vApp zugeordnet.
Sie können aber nachträglich über `Aktionen` und `Verschieben nach...` einer vApp zugeordnet werden.

Wenn Sie die Ressourcen der VM vor dem Einschalten anpassen möchten, deaktivieren Sie bitte die Checkbox Einschalten.
Die Checkbox finden Sie nicht im vApp-Dialog. Die VM übernimmt hier den Power-Status der vApp.
Um die Checkbox zu erhalten, müssen Sie den oben beschriebenen Weg über `Virtuelle Maschinen` → `Neue VM` wählen.
{{< /screenshot >}}

Je nach Auswahl unterscheiden sich die betreffenden Parameter.
Scrollen Sie nötigenfalls herunter, um alle Optionen sehen zu können.

{{< screenshot src="img/vm-new-dialog-selfservice.png" title="VM aus Template erstellen" >}}
Vorlagen für VMs, auch VM-Templates genannt dienen der beschleunigten und wiederholbaren Bereitstellung von VMs.
Ein VM-Template bündelt vCPU, vRAM und vDisk Ressourcen mit einem vorinstallierten Betriebssystem.
Das erspart Ihnen somit, die gesamte Installation selbst ausführen zu müssen.
Dies ist daher die Voreinstellung für neue VMs.
Bei der Instanziierung einer VM Vorlage werden die Konfigurationen sowie die Festplatte(n) des Templates kopiert und können angepasst werden.
Änderungen die nach der Instanziierung am Template vorgenommen werden, werden nicht für die VM übernommen.

Von plusserver vorbereitete VM-Vorlagen finden Sie im Katalog `selfservice`.
Für das Aktualisieren, Patchen und Konfigurieren dieser VM-Templates sind Sie selbst verantwortlich.
{{< /screenshot >}}

Die nachfolgenden Parameter können Sie bei VMs konfigurieren, die aus einer Vorlage erstellt werden.

| Parameter              | Beschreibung                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Name                   | Name der VM                                                                                                               |
| Computername           | Hostname des Computers                                                                                                    |
| Beschreibung           | Freitextfeld für eine kurze Beschreibung der VM                                                                           |
| Typ                    | `Neu` für eine neue VM oder `Aus Vorlage` um auf einer VM Vorlage aufzubauen.                                             |
| Einschalten            | Status der VM nach dem Erstellen. Wenn aktiviert, wird die VM nach Erstellung automatisch gestartet.                      |
| Vorlagen               | Liste aus Vorlagen aus dem Katalog                                                                                        |
| Benutzerdefinierte Speicherrichtlinie verwenden | Ermöglicht das Überschreiben der Performance-Klasse, die das Template für virtuellen Festplatte der VM verwendet |
| Zu verwendende Speicherrichtlinie               | Legt die Performance-Klasse des VM Speichers fest.                                              |
| Netzwerkadapter        | Konnektivität zu bestehendem Netzwerk einrichten und Entscheidung, ob die IP per DHCP oder manuell vergeben wird. Netzwerkadapter können Sie im Nachhinein über die Hardwaredetails hinzufügen |

{{< screenshot src="img/vm-new-dialog-scratch.png" title="VM von Startimage erstellen" >}}
Sie könne eine VM auch komplett neu von einem Startimage erstellen.
Beim Startimage handelt es sich um ein Installationsmedium, vergleichbar mit einer virtuellen Installations-DVD.
Hier können Sie flexibel jedes kompatible Betriebssystem installieren, sind dafür aber auch für die Prüfung der Kompatibilität sowie für die Auswahl und Installation der richtigen Treiber und das vornehmen der korrekten Einstellungen vollständig selbst verantwortlich.

Wir empfehlen, diesen Installationsweg nur zu wählen, wenn ihr Nutzungsszenario nicht mit den bereitgestellten Templates möglich ist.
{{< /screenshot >}}

Hier gibt es schon vor dem Erstellen deutlich mehr Einstellungsmöglichkeiten.
Die nachfolgenden Parameter können Sie bei neuen VMs konfigurieren.

| Parameter              | Beschreibung                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Name                   | Name der VM                                                                                                               |
| Computername           | Hostname des Computers                                                                                                    |
| Beschreibung           | Freitextfeld für eine kurze Beschreibung der VM                                                                           |
| Typ                    | `Neu` für eine neue VM oder `Aus Vorlage` um auf einer VM Vorlage aufzubauen.                                             |
| Einschalten            | Status der VM nach dem Erstellen. Wenn aktiviert, wird die VM nach Erstellung automatisch gestartet.                      |
| Betriebssystem-Familie | Grundsätzliche Unterscheidung ob Linux, Microsoft Windows oder andere                                                     |
| Betriebssystem         | Detaillierte Auswahl der Distribution und Version, bspw. Debian 9 64bit                                                   |
| Startimage             | Auswahl des Startimages                                                                                                   |
| Größe (Speicher)       | Vordefinierte oder benutzerdefinierte Auswahl der VM-Größe (Anzahl virtuelle CPUs, Kerne pro CPU, Arbeitsspeicher)        |
| Speicher               | Anzahl und Größe der angefügten Festplatten, Wahl der Speicherrichtlinie                                                  |
| Netzwerkadapter        | Eiscreenshotnrichten der Konnektivität zu bestehendem Netzwerk, festlegen des Netzwerkkartentyps (bevorzugt VMXNET3) und Entscheidung, ob die IP per DHCP oder manuell vergeben wird; hinzufügen weiterer Netzwerkadapter |
  
Die gesetzten Größen für Arbeitspeicher und CPU können über den Bearbeiten Button im Nachgang jederzeit angepasst werden.
Die Größe eines Datenträgers (Speicher) kann im Nachgang lediglich erhöht, nicht jedoch verringert werden.
Je nach Konfiguration und Betriebssystem ist hierzu in der Regel ein temporäres Ausschalten der VM erforderlich.

### VM Gastanmeldung

Um sich erfolgreich an einer VM anzumelden, benötigen Sie die korrekten Zugangsdaten. Wenn Sie die VM von einem Startimage installiert haben, sollten Sie im Rahmen der Installation die entsprechenden Zugangsdaten angelegt haben. Bei den Templates im `selfservice` Katalog wird als Administrationsnutzer der Standard des jeweiligen Betriebssystems verwendet. Dies ist bei Windows `Administrator` und bei Linux üblicherweise `root`.

{{< screenshot src="img/vm-details.png" title="VM Details" >}}
Die Informationen zu VM lassen sich in der Detailansicht der VM abrufen.
Von der Übersichtsseite der VMs aus erreichen Sie die Detailansicht einer VM am schnellsten über die Schaltfläche `Details`.
{{< /screenshot >}}

{{< screenshot src="img/vm-guestos-customization-overview.png" title="VM Gastbetriebsystemanpassung" >}}
Das Password des Initialen Nutzers wird von VMware im Rahmen der Anpassung des Gastbetriebsystems generiert und ist unter `Virtuelle Maschinen` → `Details` → `Gastbetriebssystemanpassung` → `Bearbeiten` zu finden.

{{< /screenshot >}}

{{< screenshot src="img/vm-guestos-customization-password.png" title="VM Password ändern" >}}
Um das Passwort zu ändern, muss die VM heruntergefahren und der Haken bei "Kennwort automatisch erstellen" entfernt werden.
Dann können Sie ein beliebiges Passwort eingeben.
{{< /screenshot >}}

{{< screenshot src="img/vm-guestos-recustomize.png" title="VM Password ändern" >}}
Damit das Passwort final gesetzt wird, muss die VM mit der Aktion `Einschalten, Neuanpassungen erzwingen` eingeschaltet werden.
Wichtig ist, dass die VM vorher ausgeschaltet ist. Die vApp herunterzufahren reicht hierbei nicht aus.
{{< /screenshot >}}

---

### VM Netzwerkanbindung

{{< screenshot src="img/vm-details.png" title="VM Details" >}}
Die Informationen zu VM lassen sich in der Detailansicht der VM abrufen.
Von der Übersichtsseite der VMs aus erreichen Sie die Detailansicht einer VM am schnellsten über die Schaltfläche `Details`.
{{< /screenshot >}}

{{< screenshot src="img/vm-network-overview.png" title="VM Netzwerkadapter Übersicht" >}}
Die Informationen zu VM lassen sich in der Detailansicht der VM abrufen.
Von der Übersichtsseite der VMs aus erreichen Sie die Detailansicht einer VM am schnellsten über die Schaltfläche `Details`.
Die Netzwerkanbindung kann nachträglich in der Virtuellen Maschine über `Details` → `Hardware` → `Netzwerkadapter` hergestellt werden.
{{< /screenshot >}}

{{< screenshot src="img/vm-network-edit.png" title="VM Netzwerkadapter Bearbeitung" >}}
Unter Netzwerkadapter und Hinzufügen wird der VM ein neues virtuelles Netzwerkinterface zu geordnet, welches wiederum einem bestehenden Netzwerk zugewiesen werden kann. Eine IP kann per DHCP oder manuell vergeben werden.
{{< /screenshot >}}

### VM Festplatten

Die Festplatten einer VM dienen der Datenpersistierung. Jede VM sollte mindestens eine Festplatte konfiguriert haben, welche das Betriebssystem beinhaltet.
Wir empfehlen, eine Platte für das Betriebssystem und eine weitere Platte für Anwendungsdaten anzulegen.
So erreichen Sie eine Datentrennung zwischen den technischen Daten und den Anwendungsdaten.
Dies reduziert das Risiko, dass aufgrund von unerwartet hohem Datenaufkommen bei den Anwendungsdaten die korrekte Funktionsweise und Wartbarkeit des Betriebssystems beeinträchtigt wird. Außerdem können Sie so verschiedene Speicherrichtlinien für die jeweiligen Platten verwewenden, wodurch Sie Kosten und Leistung in der Regel in einem besseren Verhältnis zueinander realisieren können.

{{< screenshot src="img/vm-vdisk.png" title="VM Festplatten" >}}
In den Details einer VM im Bereich Hardware können Sie dieser weitere Festplatten mittels `Hinzufügen` zuordnen.
Achten Sie beim Anlegen/Bearbeiten von Festplatten auf die korrekte gewünschte Einheit: MB oder GB.

Es können bis zu 15 virtuelle Festplatten pro VM konfiguriert werden. Jede der Platten kann bis zu maximal 8 TB groß werden.
Die Platten können auf bis zu 4 virtuelle Speichercontroller verteilt werden, wobei jeder Speichercontroller einen eignen Bus hat.
Jede Einheitennummer darf je Bus nur einmal vergeben werden.
Die Kombination aus Einheitennummer und Bus-Nummer muss für jede Festplatte der VM eineindeutig sein.

Die Änderungen müssen noch durch Klick auf `Speichern` bestätigt werden.
{{< /screenshot >}}

### Affinitätsregeln

Mit Affinitätsregeln können Sie Präferenzen oder harte Abhängigkeiten bezüglich der Platzierung von VMs auf der zu Grunde liegenden Hardware konfigurieren.

{{< screenshot src="img/affinityrule-overview.png" title="Affinitäts- und Antiaffinitätsregeln" >}}
Unter dem Menüpunkt Affinitätsregeln finden Sie eine Übersicht aller bestehenden Affinitätsregeln.
Jeweils unter dem Punkt `Neu` lassen sich Affinitätsregeln und Anti-Affinitätsregenl erstellen.
{{< /screenshot >}}

{{< screenshot src="img/affinityrule-new-affinity.png" title="Affinitätsregel erstellen" >}}
Mit einer Affinitätsregel geben Sie an, dass eine Auswahl von VMs gemeinsam auf die gleiche physikalische Hardware platziert werden sollen oder müssen.
Dies kann beispielsweise dabei helfen, Netzwerklatenzen zwischen zwei VMs zu minimieren oder den Datendurchsatz zwischen den VMs zu erhöhen.
{{< /screenshot >}}
Wenn Sie den Haken `Erforderlich` aktivieren, wird die Regel zwingend eingehalten.
Kann der VM Scheduler die Regel nicht einhalten, wird eine Fehlermeldung ausgegeben.
Es ist möglich, dass VMs nicht gestartet werden können.

Wenn der Haken `Erforderlich` deaktiviert ist, wird der Scheduler berechtigt die VMs auch auf verschiedenen Systemen zu starten, wenn es nicht möglich ist, alle VMs auf der gleichen Hardware zu starten.

{{< screenshot src="img/affinityrule-new-antiaffinity.png" title="Antiaffinitätsregel erstellen" >}}
Mit einer Affinitätsregel geben Sie an, dass eine Auswahl von VMs gemeinsam auf die verschiedene physikalische Systeme platziert werden sollen oder müssen.
Diese Regeln sollten Sie nutzen, wenn Sie mehrere gleichartige VMs aus Redundanzgründen betreiben.
Mit einer Antiaffinitätsregel können Sie dafür sorgen, dass die VMs nicht auf der gleichen Hardware laufen und somit der Ausfall eines Hypervisors nur eine der VMs beeinträchtigt.
{{< /screenshot >}}
Wenn Sie den Haken `Erforderlich` aktivieren, wird die Regel zwingend eingehalten.
Kann der VM Scheduler die Regel nicht einhalten, wird eine Fehlermeldung ausgegeben.
Es ist möglich, dass VMs nicht gestartet werden können.

Wenn der Haken `Erforderlich` deaktiviert ist, wird der Scheduler berechtigt die VMs auch gemeinsam auf einem Systemen zu starten, wenn es nicht möglich ist, alle VMs auf verschiedene Hardware zu verteilen.

## Speicherrichtlinien

Speicherrichtlinien definieren verschiedene Speicherklassen, welche sich hinsichtlich Leistungsparameter und Preis unterscheiden.

{{< screenshot src="img/storage-policy.png" title="Speicherrichtlinien" >}}
Unter dem Menüpunkt Speicherrichtlinien ist einsehbar, wie viel von welcher Storageklasse zur Verfügung steht und was belegt ist.
In der Spalte Standard sehen Sie, welche Storageklasse beim Erstellen einer VM als Standard ausgewählt wird.
{{< /screenshot >}}

### Speicherlimits

Grundsätzlich steht Storage unbegrenzt zur Verfügung, wobei die Größe einer einzelnen Festplatte limitiert ist.
Es werden Sicherheitslimits eingestellt, die jederzeit erhöht werden können.

Die Limits sollen sicherstellen, dass die Ressourcenbelegung nicht explosionsartig steigt und Kosten verursachen, wie es beispielsweise durch fehlerhafte Automationsskripte passieren könnte.

Die Limits werden mindestens einmal je 24 Stunden überprüft und angepasst.

## Backup

Optional können Sie für kostenpflichtige Backups ihrer VMs das integrierte Selfservice Backup-Portal auf Basis von Veeam im vCloud Director nutzen.

### Datensicherung mit Veeam

Die Backups können Sie mit der Rolle `Organisationsadministrator` selbst verwalten.
Die Anmeldung erfolgt über den vCloud Director.
Eine gesonderte Anmeldung am Backup-Portal ist nicht notwendig.

{{< screenshot src="img/veeam-menu.png" title="Menüeintrag für Backup Portal" >}}
Das Selfservice-Backupportal ist im Portal des vCloud Directors verlinkt und über den Menüpunkt `Datensicherung mit Veeam` erreichbar.
{{< /screenshot >}}

### Backup Portal

{{< screenshot src="img/veeam-dashboard.png" title="Dashboard des Backup-Portals" >}}
Im Dashboard sind die Statistiken zu den Backups einzusehen, insbesondere zu VMs, Backupjobs und Backupstorage.
Es gibt jeweils eine Ansicht für die letzten 24 Stunden bzw. die letzten 7 Tage (Hier: Die letzten 24 Stunden).
{{< /screenshot >}}

{{< screenshot src="img/veeam-overview-protected.png" title="Protected-Widget des Backup-Portals" >}}
Das Protected-Widget zeigt Informationen zur Anzahl der erfolgreich erfolgten Backups von vApps und VMs sowie die Gesamtgröße aller erfolgreich gesicherten VMs für den gewählten Zeitraum.
{{< /screenshot >}}

{{< screenshot src="img/veeam-overview-jobs.png" title="Jobs-Widget des Backup-Portals" >}}
Das Jobs-Widget gibt Auskunft über die Anzahl an angelegten Backupjobs, die maximale Dauer und die durchschnittliche Datensicherungsgeschwindigkeit.
{{< /screenshot >}}

{{< screenshot src="img/veeam-overview-backup-storage.png" title="Backup-Storage-Widget des Backup-Portals" >}}
Das Backup-Storage-Widget gibt Auskunft über die zugewiesene Quota und die benutzte Datenmenge.
{{< /screenshot >}}
Der Status signalisiert folgende Füllgrade:

* Grün: Mehr als 10 % Backupstorage ist noch verfügbar
* Gelb: Weniger als 10 % Backupstorage ist noch verfügbar
* Rot: Es ist kein Speicher mehr frei

### Backup Jobs

Backup Jobs steuern das Erstellen, Rotieren und Aufbewahren von Datensicherungskopien.

{{< screenshot src="img/veeam-jobs.png" title="Job-Tab des Backup-Portals" >}}
Im Job-Tab können Sie Backupjobs anlegen, editieren, löschen, aktivieren und deaktivieren.
Außerdem können Sie sich detaillierte Informationen zu den einzelnen Jobs anzeigen lassen.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-create.png" title="Erstellung Backup Job: Schaltfläche" >}}
Die Anlage eines neuen Backup Jobs starten Sie auf der Job-Seite mit Klick auf die Schaltfläche `Neu`.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-create-jobsettings.png" title="Erstellung Backup Job: Einstellungen" >}}
Der Wizard fordert einen Namen für den anzulegenden Backupjob. Außerdem definieren Sie die Anzahl der Wiederherstellungspunkte (Hier: 14).
Sie können an dieser Stelle auch komplexere Retention Policies einrichten.
{{< /screenshot >}}

--

{{< screenshot src="img/veeam-jobs-create-vmsettings.png" title="Erstellung Backup Job: OrgVDC auswählen" >}}
Fügen Sie dem Job ein oder mehrere VMs oder vApps hinzu, indem Sie über `Neu` neue Objekte in den Job aufnehmen.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-create-orgvdc-select.png" title="Erstellung Backup Job: OrgVDC auswählen" >}}
Wählen Sie das gewünschte OrgVDC aus.
Auf diese Weise umfasst der Job alle vApps und VMs innerhalb des gewählten OrgVDCs, einschließlich künftiger neuer Objekte.
{{< /screenshot >}}

Außerdem definieren Sie, in welcher Reihenfolge die Objekte gesichert werden sollen (Up/Down-Pfeile).
Auch können einzelne VMs einer vApp vom Backup ausgeschlossen werden.

{{< screenshot src="img/veeam-jobs-create-guestprocessing.png" title="Erstellung Backup Job: Gastintegration" >}}
Bei den Einstellungen zur Gastintegration (`Guest Processing`) können Sie optional Integrationsoptionen für das Gast-Betriebssystem aktivieren.
Beachten Sie, dass hierfür Vorbereitungsarbeiten an der VM vorzunehmen sind, um diese Integrationen nutzen zu können.
Für diese Schnellstart-Aleitung werden wir auf diese Optionen verzichten.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-create-guestprocessing.png" title="Erstellung Backup Job: Gastintegration" >}}
Bei den Einstellungen zur Gastintegration (`Guest Processing`) können Sie optional Integrationsoptionen für das Gast-Betriebssystem aktivieren.
Beachten Sie, dass hierfür Vorbereitungsarbeiten an der VM vorzunehmen sind, um diese Integrationen nutzen zu können.
Für diese Schnellstart-Aleitung werden wir auf diese Optionen verzichten.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-create-email-notifications.png" title="Erstellung Backup Job: Email Notofications" >}}
Unter Email Notifications können Sie eine E-Mail-Adresse hinterlegen, an die bestimmte Status-E-Mails eines Jobs geschickt werden.
{{< /screenshot >}}

Die Jobs werden automatisch in einem Backupzeitfenster von 22:00 Uhr bis 8:00 Uhr geplant.

{{< screenshot src="img/veeam-jobs-start.png" title="Backup Job: Start/Stop/Retry" >}}
Um einen Job manuell zu starten, zu stoppen oder zu wiederholen, markieren Sie diesen und wählen die gewünschte Aktion aus.
{{< /screenshot >}}

{{< screenshot src="img/veeam-jobs-disable.png" title="Backup Job: Disable/Enable/Edit" >}}
Um einen Job zu editieren, auszusetzen oder wieder zu reaktivieren, können Sie die entsprechende Aktion über das Dropdownmenu `Job` auswählen.
{{< /screenshot >}}

### Restore einer VM

{{< screenshot src="img/veeam-restore-vm.png" title="VM Restore: VM auswählen" >}}
Im Reiter VMs suchen Sie die VM heraus, die Sie wiederherstellen möchten.
Dazu können Sie auch das Suchfeld nutzen. Dann wählen Sie `Restore VM`.

Nun bieten sich zwei Optionen an: `Keep` oder `Overwrite`.
Während Overwrite die VM überschreibt, erzeugt Keep eine weitere VM mit dem Suffix `_restored`.
{{< /screenshot >}}

{{< screenshot src="img/veeam-restore-vm-restorepoint.png" title="VM Restore: Recovery Point auswählen" >}}
Anschließend suchen Sie den passenden Wiederherstellungspunkt aus und bestätigen den Restore-Auftrag.
{{< /screenshot >}}

## Herstellerdokumentation

* Tenant Portal Guide:  
  <https://docs.vmware.com/en/VMware-Cloud-Director/10.5/VMware-Cloud-Director-Tenant-Guide/GUID-74C9E10D-9197-43B0-B469-126FFBCB5121.html>
* API Documentation:  
  <https://developer.broadcom.com/xapis/vmware-cloud-director-api/37.3/>
* SDKs:
  * Golang:  
    <https://github.com/vmware/go-vcloud-director>
  * TypeScript / Python:  
    <https://github.com/vmware/vcd-api-tools>
* IaC:
  * Terraform:  
    <https://github.com/vmware/terraform-provider-vcd>
* Backup
  * Veeam-Dokumentation:  
    <https://helpcenter.veeam.com/docs/backup/em/vcd_working_with_portal.html?ver=120>
