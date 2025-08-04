---
title: "DNS-Verwaltung"
linkTitle: "DNS-Verwaltung"
type: "docs"
weight: 5
date: 2025-07-21
description: >
  Informationen zu DNS-Verwaltung im CloudHub
---

Die Seite **„DNS-Verwaltung“** bietet Ihnen eine zentrale Oberfläche zur Verwaltung Ihrer DNS-Einstellungen. Sie ist in zwei Tabs unterteilt: **Nameserver** und **Reverse DNS**. Beide Bereiche ermöglichen Ihnen die eigenständige Konfiguration Ihrer DNS-Zonen und PTR-Einträge.

### Nameserver

Im Tab **„Nameserver“** verwalten Sie die DNS-Zonen Ihrer Domains.\
![Nameserver-Tabelle](../img/dns-administration/nameserver-table.png)

#### Übersichtstabelle

- Alle vorhandenen Domains werden in einer Tabelle aufgelistet.
- Über ein Suchfeld oberhalb der Tabelle können Sie gezielt nach Domains suchen.
- Für jede Domain stehen folgende Aktionen zur Verfügung:
  - **Bearbeiten**: DNS-Einträge der Domain verwalten\
  ![Nameserver-Tabelle - Eintrag bearbeiten](../img/dns-administration/nameserver-table-edit.png)
  - **Löschen**: Domain aus der DNS-Verwaltung entfernen\
  ![Nameserver-Tabelle - Eintrag löschen](../img/dns-administration/nameserver-table-delete.png)
  - **Download als CSV**: Einstellungen im CSV-Format exportieren\
  ![Nameserver-Tabelle - Download CSV](../img/dns-administration/nameserver-table-download-csv.png)
  - **Download als Zonefile**: Export im klassischen Zonefile-Format\
  ![Nameserver-Tabelle - Download Zonefile](../img/dns-administration/nameserver-table-download-zonefile.png)

#### Domain hinzufügen

Über den Button „Domain hinzufügen“ gelangen Sie zur Seite **„DNS-Domain hinzufügen“**.\
![Nameserver-Tabelle - Domain hinzufügen](../img/dns-administration/nameserver-table-add-domain.png)

### DNS-Domain hinzufügen

Auf dieser Seite können Sie eine bestehende Domain in die DNS-Verwaltung übernehmen – vorausgesetzt, Sie verfügen bereits über einen entsprechenden Vertrag. Sollte die gewünschte Domain noch nicht existieren, kann diese über unseren Support per Ticket eingerichtet werden.\
![Hinzufügen einer DNS-Domain](../img/dns-administration/add-dns-domain.png)

#### DNS-Einträge verwalten (Bearbeiten einer Domain)

Beim Bearbeiten einer Domain sehen Sie eine Tabelle mit allen zugehörigen DNS-Einträgen.\
![Tabelle DNS-Einträge](../img/dns-administration/table-dns-entries.png)

##### Funktionen

- **Suchfeld** zum schnellen Auffinden einzelner Einträge
- Für jeden DNS-Eintrag:
  - **Bearbeiten** (bearbeitbar sind: Wert und TTL)\
  ![Tabelle DNS-Einträge - Eintrag bearbeiten 1](../img/dns-administration/table-dns-entries-edit-entry-1.png)\
  ![Tabelle DNS-Einträge - Eintrag bearbeiten 2](../img/dns-administration/table-dns-entries-edit-entry-2.png)
  - **Löschen** des Eintrags\
  ![Tabelle DNS-Einträge - Eintrag löschen](../img/dns-administration/table-dns-entries-delete-entry.png)

##### DNS-Eintrag hinzufügen

Über den Button **„DNS-Eintrag hinzufügen“** wird am oberen Tabellenrand eine neue Eingabezeile eingeblendet. Dort geben Sie folgende Werte ein:\
![Tabelle DNS-Einträge - Eintrag hinzufügen](../img/dns-administration/table-dns-entries-add-entry.png)

- **Name**
- **Typ** (z. B. A, AAAA, CNAME, MX, TXT etc.)
- **Wert**
- **TTL**

Rechts in der Zeile können Sie den neuen Eintrag speichern oder das Hinzufügen abbrechen.

### Reverse DNS

Im Tab **„Reverse DNS“** verwalten Sie PTR-Einträge für Ihre IP-Adressen.\
![Reverse DNS Tabelle](../img/dns-administration/reverse-dns-table.png)

#### Übersichtstabelle

- Alle vorhandenen Reverse DNS-Einträge werden in einer Tabelle angezeigt.
- Ein **Suchfeld** ermöglicht die gezielte Suche nach IP-Adressen oder Hostnamen.
- Für jeden Eintrag stehen folgende Aktionen zur Verfügung:
  - **Bearbeiten** (führt zur Seite „DNS-Reverse-Eintrag bearbeiten“)\
  ![Reverse DNS Tabelle - Eintrag bearbeiten](../img/dns-administration/reverse-dns-table-edit-entry.png)
  - **Löschen** des Eintrags\
  ![Reverse DNS Tabelle - Eintrag löschen](../img/dns-administration/reverse-dns-table-delete-entry.png)

Über den Button „Eintrag hinzufügen“ gelangen Sie zur Seite **„DNS-Reverse-Eintrag hinzufügen“**.\
![Reverse DNS Tabelle - Eintrag hinzufügen](../img/dns-administration/reverse-dns-table-add-entry.png)

##### DNS-Reverse-Eintrag bearbeiten

Auf dieser Seite können Sie die Einstellungen eines bestehenden PTR-Eintrags ändern. Bearbeitbar sind:

- **Hostname**
- **TTL**

Die zugehörige IP-Adresse ist nicht änderbar.

### Reverse DNS-Eintrag hinzufügen

![Reverse DNS Eintrag hinzufügen](../img/dns-administration/add-reverse-dns-entry.png)

#### Formularfelder

- **Netz**: Auswahl des zugehörigen Netzbereichs
- **IP-Adresse**: Die Adresse, für die der PTR-Eintrag erstellt werden soll
- **Hostname**: Zielname, auf den die IP-Adresse zeigen soll
- **TTL**: Gültigkeitsdauer des Eintrags (in Sekunden)
