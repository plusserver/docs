---
title: "Organisationsadministration"
linkTitle: "Administration"
type: "docs"
weight: 20
date: 2024-07-01
description: >
  Nutzer- und Rechteverwaltung, Administration und Einstellungen auf Organisationsebene
---



## Verwaltung von Zugängen

Unter dem Menüpunkt `Administration` gelangen Sie in die Übersicht für Benutzer, Gruppen und Account-Einstellungen.

Hier können Sie Ihrer Organisation weitere Benutzer hinzufügen und deren Rechte (Rollen) verwalten.

### Benutzer

{{< screenshot src="img/user-overview.png" title="Nutzerübersicht" >}}
Unter dem Menüpunkt Zugriffssteuerung befinden sich die Unterpunkte Benutzer, Gruppen und Rollen.

Über `Benutzer` und den Button `Neu` können Sie weitere Benutzer zum Login in den vCloud Director anlegen.
{{< /screenshot >}}

{{< screenshot src="img/user-create-dialog.png" title="Nutzer anlegen" >}}
Mit diesem Dialogfenster können Sie einen Nutzer anlegen.

Die Nutzerdaten werden in der Datenbank des vCloud Directors gespeichert.
Es handelt sich somit um einen so genannten `lokalen Nutzer`.
{{< /screenshot >}}

Die nachfolgenden Parameter können konfiguriert werden:

| Parameter                   | Beschreibung                                                                                                         |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------|
| Benutzername                | Benutzername für den Login                                                                                           |
| Kennwort                    | Passwort für den Login                                                                                               |
| Kennwort bestätigen         | Wiederholung des Passworts um Tippfehler auszuschließen                                                              |
| Aktivieren                  | Benutzeraccount nach dem Erstellen aktivieren oder deaktivieren. Nur aktive Nutzer können sich erfolgreich anmelden. |
| Verfügbare Rollen           | Benutzerrechte über eine vorgefertigte Rolle bestimmen                                                               |
| Vollständiger Name          | Name des Benutzers (optional)                                                                                        |
| E-Mail-Adresse              | E-Mail-Adresse des Benutzers (optional)                                                                              |
| Telefonnummer               | Telefonnummer des Benutzers (optional)                                                                               |
| IM                          | Informationen über einen Instant Messenger (optional)                                                                |
| Kontingent aller VMs        | Mögliches Limit für zu erstellende VMs                                                                               |
| Kontingent ausgeführter VMs | Mögliches Limit für gleichzeitig eingeschaltete VMs                                                                  |

### Gruppen

Unter `Gruppen` wären generell Gruppierungen von Benutzern einzurichten.
Dies ist für Importierte Gruppen aus einem Identity Provder gedacht.

### Rollen

Unter `Rollen` befinden sich bereits vorgefertigte Rollen.
Eine Rolle beinhaltet immer eine Sammlung von Rechten für einen Benutzer oder eine Gruppe.

{{< screenshot src="img/roles-overview.png" title="Rollenübersicht" >}}
Über den Button `Neu` können Sie weitere benutzerdefinierte Rollen anlegen, die dann für neue Benutzer verwendet werden können.
{{< /screenshot >}}

{{< screenshot src="img/roles-create-dialog.png" title="Rolle anlegen" >}}
Die Rechte können pro Menüpunkt individuell zusammengestellt werden.
{{< /screenshot >}}
