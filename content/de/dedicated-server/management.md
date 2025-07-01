---
title: "Verwaltung"
linkTitle: "Verwaltung"
type: "docs"
weight: 10
description: >
    Verwaltung Ihrer Dedicated Server
---

## Firewall

### Einschränkungen

Die Firewall, welche bei Ihrem Dedicated Server inkludiert ist, ist ein einfacher Paketfilter, welcher ausschließlich eingehende Pakete filtert. Es gelten folgende weitere Einschränkungen:

* Das Entfernen (nicht das Deaktivieren) ALLER Firewallregeln führt dazu, dass die Firewall an sich deaktiviert wird - es findet keinerlei Filterung mehr statt (Any-Any Accept)!
* Umgekehrt bedeutet dies: Das Hinzufügen einer einzelnen Regel aktiviert die Firewall grundsätzlich - es werden nur noch Pakete erlaubt, welche explizit freigeschaltet wurden.
* Es können maximal 20 Regeln angelegt werden.
* Uns liegen keinerlei Logs von abgelehnten oder akzeptierten Paketen vor, diese können daher auch nicht zur Unterstützung bei der Entstörung herangezogen werden.

### Verwalten

Um die Firewallregeln Ihres Systems zu editieren, melden Sie sich im CloudHub an und öffnen das Dashboard Ihres Servers (Produkt-Dashboard -> Dedicated Server -> Server auswählen). Am Ende der Seite finden Sie den Punkt "Firewall-Konfigurationen".

Die Firewallregeln sind in IPv4-/IPv6-Regeln unterteilt (1). Um die Regeln zu editieren, wechseln Sie in den Bearbeitungsmodus (2).

![Firewall Regeln im Cloudhub](../bmc-firewall-1.png)

#### Regeln editieren und hinzufügen

Wenn Sie neue Firewallregeln hinzufügen wollen (1), gibt es folgendes zu beachten:

* "Reihenfolge" (2) wirkt sich entsprechend des numerischen Wertes auf die Sortierung der Firewall Regeln aus. Ein Sortieren der vorhandenen Regeln ist auch per Drag & Drop möglich.
* Quell- und Zielports (3, 4) sind optionale Felder. Werden diese leer gelassen, entspricht dies "any" bzw. allen Ports.

![Firewall Regeln editieren](../bmc-firewall-2.png)

Anschließend werden die Änderungen über "Änderungen bestätigen" gespeichert. Es kann einige Minuten dauern, bis die Änderungen aktiv werden.

## Festplatten

Ihr Server hat in der Basiskonfiguration zwei Festplatten, welche als RAID1 konfiguriert ausgeliefert werden und auf welchen das Betriebssystem installiert wird. Eventuell von Ihnen gebuchte weitere Festplatten werden nicht automatisch konfiguriert - dies muss mittels Konfigurationstools erfolgen:

### Installation RAID Verwaltungstool

Da wir Server von HPE einsetzen, ist zur Konfiguration des RAID ein proprietäres Tool von HPE erforderlich, welches wir auf unserem Mirror vorhalten.

```bash
wget https://mirror.plusserver.com/hp-mcp/debian/pool/non-free/ssacli-6.45-8.0_amd64.deb -O ssacli.deb
dpkg -i ssacli.deb
```

Bzw. für Ubuntu:

```bash
wget https://mirror.plusserver.com/hp-mcp/ubuntu/pool/non-free/ssacli-6.45-8.0_amd64.deb -O ssacli.deb
dpkg -i ssacli.deb
```

### Raid konfigurieren

Um das RAID zu konfigurieren, muss zunächst der Identifier der nicht zugewiesenen SSDs ermittelt werden. Dies geschieht mit dem Befehl `ssacli ctrl slot=0 pd all show`, die Ausgabe sieht dann beispielsweise so aus:

```bash
ssacli ctrl slot=0 pd all show

(...)

   Unassigned

      physicaldrive 1I:2:1 (port 1I:box 2:bay 1, SATA SSD, 480 GB, OK)
      physicaldrive 1I:2:2 (port 1I:box 2:bay 2, SATA SSD, 480 GB, OK)
```

Wir benötigen zum weiteren Vorgehen die ID, welche nach "physicaldrive" ausgegeben wird - hier also `1I:2:1` und `1I:2:2`. Mit diesen IDs kann man nun ein neues RAID1 erzeugen:

```bash
ssacli ctrl slot=0 create type=ld drives=1I:2:1,1I:2:2 raid=1
```

Sollten Sie 4 oder mehr zusätzliche Platten gebucht haben und ein RAID10 anlegen wollen, so sind entsprechend alle Drives anzugeben, der RAID Level nennt sich hier dann "1+0" statt umgangssprachlich "10" - also z.B. so:

```bash
ssacli ctrl slot=0 create type=ld drives=1I:2:1,1I:2:2,1I:2:3,1I:2:4 raid=1+0
```

{{% alert title="Achtung" color="warning" %}}
Wählen Sie immer ein RAID Level mit Redundanzen, da wir proaktiv defekte Festplatten tauschen.
{{% /alert %}}

Anschließend können Sie mittels `ssacli ctrl slot=0 ld all show detail` die Informationen zu den konfigurierten Logical Drives anschauen - dort wird auch der Pfad zum Blockdevice angezeigt, welcher dann wie gewohnt partitioniert und formatiert werden kann.

