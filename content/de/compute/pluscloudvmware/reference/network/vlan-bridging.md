---
title: "VLAN Bridging"
linkTitle: "VLAN Bridging"
type: "docs"
weight: 40
date: 2024-07-10
description: >
  Einbindung von Hardwaresystemen in die pluscloud VMware
---

Bei der pluscloud VMware besteht die Möglichkeit ein {{< abbr "VLAN" "Virtual Local Area Network" >}} in Form eines virtuellen Netzwerksegments einzubinden.
Dies Ermöglicht es, ein Hardware-System in die virtuelle Infrastruktur zu integrieren.
Auf diese Weise können Sie beispielsweise eine Hardware-Appliance oder einen Hardware-Server in eine sonst virtuelle Infrastruktur einbinden und diese nach und nach migrieren oder parallel betreiben.

Wir empfehlen, diese Option restriktiv einzusetzen.
Verwenden Sie bevorzugt eine Konnektivität auf {{< abbr "ISO" "International Organization for Standardization" >}} {{< abbr "OSI" "Open Systems Interconnection model" >}} Schicht 3 (Vermittlungsschicht / {{< abbr "IP" "Internet Protocol">}}-Ebene) anzustreben.

{{% alert title="Hinweis" color="info" %}}
**Kein Self-Service möglich**  
Die Einrichtung von VLAN Bridging kann derzeit nur durch Mitarbeiter von plusserver erfolgen.  
Wenden Sie sich bitte an die Ihnen bekannten Supportkanäle.
{{% /alert %}}

## Technische Umsetzung

Die Netzwerkvirtualisierung der pluscloud VMware erfolgt mit NSX-T.
Dieses setzt auf Enkapsulierung der Netzwerkkommunikation.
Beim Übergang von der physikalischen Infrastruktur in die virtualisierte Welt müssen daher die Frames des {{< abbr "VLAN" "Virtual Local Area Network" >}}-Segments ebenfalls enkapsuliert werden.
Hierzu wird auf einer Edge Node eine {{< abbr "VLAN" "Virtual Local Area Network" >}}-Brücke eingerichtet, welche das Ver- und Entpacken der Frames vornimmt.

Die nachfolgende Grafik zeigt {{< abbr "VLAN" "Virtual Local Area Network" >}}-Bridging am Beispiel einer Hardware-Appliance:

```mermaid
flowchart LR

    %%% Nodes %%%
    subgraph colo[Colocation]
        hw1[Hardware-Appliance]
    end
    subgraph ss[Shared Switching]
        vlan1[VLAN 101]
    end
    subgraph egw[Edge Node]
        direction TB
        br1[VLAN-Bridge]
    end
    subgraph vdc[OrgVDC]
        direction TB
        is1[Imported Segment]
        vm1[VM]
    end

    %%% Edges %%%
    ss <-->|Shared Trunk| egw
    hw1 <-->|Switchport| vlan1 
    br1 <--> is1 <-->|vNIC| vm1
```

Eine Hardware-Appliance im Colocation-Bereich des Rechenzetrums wird über einen Switchport mit der Shared Switching Infrastruktur verbunden.
Für diese Verbindung wird ein {{< abbr "VLAN" "Virtual Local Area Network" >}} konfiguriert, welches hier beispielsweise die {{< abbr "VLAN" "Virtual Local Area Network" >}}-{{< abbr "ID" "Identifikationsnummer" >}} 101 erhält.

Die Shared Switching Infrastruktur ist mit so genannten Edge Nodes verbunden, welche Teil der pluscloud VMware sind.
Es handelt sich um dedizierte Server, welche die Kommunikation zwischen der Cloudinfrastruktur und den Systemen außerhalb der Cloud handhaben.
Auf diesen Servern wird kein Kundenworkload ausgeführt.
Stattdessen werden hier neben Routing-Instanzen und Gateways auch {{< abbr "VLAN" "Virtual Local Area Network" >}}-Bridges betrieben.

Für jedes einzubindende {{< abbr "VLAN" "Virtual Local Area Network" >}} wird eine eigene {{< abbr "VLAN" "Virtual Local Area Network" >}}-Bridge konfiguriert.
Diese kann man sich als Switch vorstellen, welcher mit einem Port an das anzubindende {{< abbr "VLAN" "Virtual Local Area Network" >}} angeschlossen ist und dessen anderer Port mit dem virtuellen Segment verbunden ist.

Das VLAN steht dann innerhalb eines {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}s als Importiertes Segement zur Verfügung. An dieses Segment können nun virtuelle Netzwerkinterfaces ({{< abbr "vNIC" "Virtual Network Interface Card" >}}s) angeschlossen werden.

## Performance

Das {{< abbr "VLAN" "Virtual Local Area Network" >}}-Bridging wird auf Best-Effort Basis angeboten.
Das bedeutet, dass es für diesen Dienst keine Zusicherung bestimmter Verfügbarkeiten, Bandbreiten oder Latenzen gibt.
Die hier aufgeführten Werte sind daher lediglich zur Orientierung geeignet und können kurz- oder längerfristig auch über- bzw. unterschritten werden.

| Wert                | Grenze                                                          |
|---------------------|-----------------------------------------------------------------|
| Latenz              | typischerweise 700µs bis 2000µs mit Spitzenwerten bis zu 5000µs |
| RTT VM zu Hardware  | typischerweise 1ms bis 5ms, mit Spitzenwerten bis zu 10ms       |
| Bandbreite          | maximal 1000 Mbit/sec                                           |
