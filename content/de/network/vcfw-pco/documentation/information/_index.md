---
title: "Information"
linkTitle: "Information"
type: "docs"
weight: 2
date: 2024-02-20
description: >

---
## Wichtige Hinweise

### IP-Adressen Port1 und Port2

Die IP Adressen auf Port 1 und Port 2 dürfen **nicht** modifiziert werden.
Die RFC3927 Link Local IPv4 Adressen sind für die Cluster Kommunikation, sowie die Internet Anbindung via pluscloud open notwendig.

### HA Heartebat Type

Der HA Heartbeat Type darf **nicht** von *Unicast* auf *Broadcast* geändert werden. Ansonsten ist die interne Cluster Kommunikation in der pluscloud open Umgebung nicht mehr gegeben.

### Benutzer admin

Der Benutzer **admin** darf auch auf einer Firewall mit dem Management Level *Self Service* **nicht** gelöscht oder geändert werden. Dieser wird unter anderem für die Konfigurationssicherung durch die plusserver benötigt.

### Vorbelegung SNMP Einstellungen

Die bestehenden SNMP Einstellungen dürfen **nicht** gelöscht oder geändert werden, diese werden unter anderem für das plusserver Monitoring benötigt.

### Deaktivierung der Lizenz durch fehlerhafte Firewall Konfiguration

Die Firewall Einstellungen dürfen **nicht* derart verändert werden, so dass die Firewall keine Möglichkeit mehr hat den Fortinet Lizenzserver im Internet zu erreichen. Dieses hätte die automatische Deaktivierung der Lizenz und somit der Firewall zur Folge.

### Adressobjekte beginnend mit PSMANAGED_ / Local-In Policies

Die Adressobjekte, die mit **PSMANAGED_** beginnen und die dazugehörigen Local-In Policies dürfen **nicht** gelöscht oder geändert werden.
