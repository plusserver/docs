---
title: "Dedicated Server"
linkTitle: "Dedicated Server"
type: "docs"
weight: 8
description: >
    Schritt für Schritt Anleitung für Dedicated Server
---

## Einleitung

Willkommen zum Bestellformular der Dedicated Server. Hier wird beschrieben, welche Konfigurationsmöglichkeiten es gibt und wie einen neuen Dedicated Server bestellt werden kann.

Im Folgenden führen wir Sie Schritt für Schritt durch den Bestellprozess und erläutern die einzelnen Auswahlmöglichkeiten und Eingabefelder.

![Dedicated Server Überblick 1](../img/dedicated-server-overview1.png)
![Dedicated Server Überblick 2](../img/dedicated-server-overview2.png)
![Dedicated Server Überblick 3](../img/dedicated-server-overview3.png)

## Schritt 1: Servertyp

Im ersten Schritt stehen vier unterschiedliche Servertypen zur Auswahl:

1. Essential - 100
   - Intel 16C/32T (2,1 GHz)
   - 2× 960 GB SSD (HW RAID)
   - 64 GB RAM
   - 2× 10 GbE NIC
   - 198,89 €

2. Essential - 200
   - Intel 12C/24T (3,4 GHz)
   - 2× 960 GB SSD (HW RAID)
   - 64 GB RAM
   - 2× 10 GbE NIC
   - 310 €

3. Performance - 100 (aktuell nicht verfügbar)
   - AMD EPYC 9355P 32C/64T, 3.55-4.40GHz
   - 2× 1,92 TB NVMe (Soft RAID)
   - 128 GB RAM
   - 2× 10 GbE NIC
   - 554,44 €

4. Performance - 200 (aktuell nicht verfügbar)
   - AMD EPYC 9555P 64C/128T, 3.2-4.40GHz
   - 2× 1,92 TB NVMe (Soft RAID)
   - 128 GB RAM
   - 2× 10 GbE NIC
   - 665,56 €

![Dedicated Server Server Typ](../img/dedicated-server-servertype.png)

## Schritt 2: Größe des RAM-Speichers

In diesem Schritt wählen Sie die gewünschte Größe des Arbeitsspeichers (RAM) für Ihren Server aus.
Standardmäßig sind 64 GB RAM enthalten. Alternativ können Sie die Leistung Ihres Servers durch die Auswahl von 128 GB RAM erhöhen.

### Optionen:

- 64 GB: 0 € (im Grundpreis enthalten)
- 128 GB: 38,40 € zusätzlich

Die Auswahl des passenden RAM-Werts hängt von der geplanten Nutzung Ihres Servers ab – etwa bei speicherintensiven Anwendungen oder großen Datenbanken empfiehlt sich die höhere Variante.

![Dedicated Server RAM](../img/dedicated-server-ram.png)

## Schritt 3: System-Speicher (im Grundpreis enthalten)

Im dritten Schritt wird der System-Speicher definiert, auf dem das Betriebssystem und wichtige Systemkomponenten installiert werden.

Standardmäßig ist folgende Konfiguration im Preis enthalten und bereits vorausgewählt:

- 2× 960 GB SSD (im Hardware-RAID-Verbund)

![Dedicated Server System Speicher](../img/dedicated-server-storage.png)

## Schritt 4: Zusätzlicher Speicher

Falls Sie mehr Speicherplatz benötigen als die im Grundpreis enthaltenen 2× 960 GB, können Sie hier zusätzlichen Speicher hinzufügen.

- \+ 2× 960 GB: 31,29 €
- \+ 4× 960 GB: 62,58 €
- \+ 6× 960 GB: 93,87 €

#### Hinweis zur Bereitstellung

- Standard-Konfiguration: Bereitstellung innerhalb ca. 1 Stunde
- Individuelle Konfiguration: Bereitstellung innerhalb ca. 1 Arbeitstag

![Dedicated Server extra Speicher](../img/dedicated-server-extra-storage.png)

## Schritt 5: Vertrauenswürdige Quellen

Geben Sie die erlaubten Netzwerkadressen im CIDR-Format an.
Dies ist ein Pflichtfeld.

Beispiel:
`10.10.10.10/24`

![Dedicated Server vertrauenswürdige Quellen](../img/dedicated-server-sources.png)

## Schritt 6: Betriebssystem

Wählen Sie in diesem Schritt das gewünschte Betriebssystem für Ihren Server.
Zur Auswahl stehen zwei beliebte Linux-Distributionen, jeweils in der aktuellen stabilen Version:

- Ubuntu
  - Ubuntu 24.04 LTS: 0 €
- Debian
  - Debian 12: 0 €

![Dedicated Server Betriebssystem](../img/dedicated-server-os.png)

## Schritt 7: Zugriffsbeschränkungen

In diesem Schritt hinterlegen Sie einen öffentlichen SSH-Key, mit dem Sie auf den Server zugreifen können.
Ein Login ohne SSH-Key ist nicht möglich.

Der Key muss im OpenSSH-Format (z. B. `ssh-ed25519` oder `ssh-rsa`) vorliegen und wird über ein Eingabefeld eingefügt.

![Dedicated Server Zugriffsbeschränkungen](../img/dedicated-server-ssh.png)

## Schritt 8: Region auswählen

Wählen Sie die gewünschte Region für die Bereitstellung Ihrer Datenbank:

- DE-WEST-1 CGN3 (Köln)
- DE-NORTH-2 HAM6 (Hamburg)

![Dedicated Server Regionen](../img/dedicated-server-region.png)

## Schritt 9: Vertragslaufzeit

Wählen Sie die gewünschte Vertragslaufzeit für Ihren Server.

- Ohne Vertragslaufzeit – volle Flexibilität
- 12 Monate – 5 % Rabatt pro Monat
- 24 Monate – 10 % Rabatt pro Monat

Der Vertrag verlängert sich jeweils automatisch um einen weiteren Tag, wenn er nicht rechtzeitig gekündigt wird.

![Dedicated Server Vertragslaufzeit](../img/dedicated-server-contract-runtime.png)

## Schritt 10: Projektvertragskennung

Wählen Sie, ob bereits eine Projektvertragskennung besteht:

- Neue Projektvertragskennung
- Existierende Projektvertragskennung (Auswahl aus einer Liste)

![Dedicated Server Projektvertragskennung](../img/dedicated-server-existing-project.png)
