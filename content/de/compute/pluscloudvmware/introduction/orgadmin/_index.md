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

Die Nutzerdaten werden in der Datenbank des {{< abbr "vCD" "vCloud Director" >}} gespeichert.
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
| Kontingent aller VMs        | Mögliches Limit für zu erstellende {{< abbr "VM" "Virtuelle Maschine" >}}s                                           |
| Kontingent ausgeführter VMs | Mögliches Limit für gleichzeitig eingeschaltete {{< abbr "VM" "Virtuelle Maschine" >}}s                              |

### Gruppen

Unter `Gruppen` wären generell Gruppierungen von Benutzern einzurichten.
Dies ist für Importierte Gruppen aus einem {{< abbr "IdP" "Identity Provider" >}} gedacht.

### Rollen

Unter `Rollen` befinden sich bereits vorgefertigte Rollen.
Eine Rolle beinhaltet immer eine Sammlung von Rechten für einen Benutzer oder eine Gruppe.

{{< screenshot src="img/roles-overview.png" title="Rollenübersicht" >}}
Über den Button `Neu` können Sie weitere benutzerdefinierte Rollen anlegen, die dann für neue Benutzer verwendet werden können.
{{< /screenshot >}}

{{< screenshot src="img/roles-create-dialog.png" title="Rolle anlegen" >}}
Die Rechte können pro Menüpunkt individuell zusammengestellt werden.
{{< /screenshot >}}

## Instanzen freigeben

Mit der Konfiguration von Usern auf der Rolle vApp User ist es möglich, auch den Zugang auf einzelne vApps oder VMs zu begrenzen.

{{< screenshot src="img/vmpermission-create-user.png" title="Nutzer anlegen" >}}
Erstellen Sie einen Nutzer, mit dem die {{< abbr "VM" "Virtuelle Maschine" >}} geteilt werden soll oder stellen Sie sicher, dass dieser Nutzer bereits existiert.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-select-orgvdc.png" title="OrgVDC auswählen" >}}
Wählen Sie das gewünschte {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} aus.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-select-vm.png" title="VM auswählen" >}}
Wählen Sie die gewünschte {{< abbr "VM" "Virtuelle Maschine" >}} aus.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-share-vm.png" title="OrgVDC auswählen" >}}
Navigieren Sie in der {{< abbr "VM" "Virtuelle Maschine" >}} Detailansicht über das seitliche Menü zur Seite `Gemeinsame Nutzung` und klicken Sie dort auf `Bearbeiten`.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-share-dialog.png" title="Freigabe konfigurieren" >}}
Wählen Sie das gewünschte {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}} aus.
{{< /screenshot >}}

Dieses Vorgehen funktioniert analog für das Teilen mit einer Gruppe und für das Teilen einer vApp.

## Gast-Anpassung

Unter dem Menüpunkt Administration und Gast-Anpassung lässt sich global für die Organisation ein Domänenbeitritt für Windows {{< abbr "VM" "Virtuelle Maschine" >}}s konfigurieren, sodass die Konfiguration nicht pro {{< abbr "VM" "Virtuelle Maschine" >}} erforderlich ist.

{{< screenshot src="img/guestcustomization-overview.png" title="Gast-Anpassung einsehen" >}}
Wählen Sie den Menüpunkt `Gast-Anpassung` im Administrationsbereich aus und klicken Sie auf `Bearbeiten`.
{{< /screenshot >}}

{{< screenshot src="img/guestcustomization-dialog.png" title="Gast-Anpassung bearbeiten" >}}
In dem sich öffnenden Dialog lassen sich die nötigen Zugangsdaten für einen Domänenbeitritt eintragen.
{{< /screenshot >}}

## Richtlinien

Als Organisationsadministrator können Sie einige Richtlinien und Vorgaben für die Organisation einstellen.
Diese haben Einfluss auf Verhalten und Kapazität Ihrer gesamten Organisation.

{{< screenshot src="img/policies.png" title="Richtlinien einsehen und konfigurieren" >}}
Unter dem Menüpunkt Richtlinien im Bereich Administration können Sie einige Voreinstellungen bzw. Limits für Ihre Organisation konfigurieren.
{{< /screenshot >}}

Die nachfolgenden Parameter können bearbeitet werden:

* vApp-Leases
  * Maximale Laufzeit-Leases: Voreinstellung, nach wie vielen Stunden oder Tagen eine vApp ausläuft und die Laufzeitablaufaktion ausgeführt wird. Die automatische Ausführung der Laufzeitablaufaktion bei Fristerreichnung bewirkt, dass die vApp (inkl. {{< abbr "VM" "Virtuelle Maschine" >}}s) nicht mehr erreichbar ist. Der Standard-Wert in der Voreinstellung ist `Läuft nie ab`
  * Laufzeitablaufaktion: Bestimmt, was nach Ablauf des Leases mit der vApp passiert. Anhalten oder Stoppen sind mögliche Parameter. Hinweis: Nur für laufende {{< abbr "VM" "Virtuelle Maschine" >}}s fallen Computekosten an.
  * Maximaler Speicher-Lease: Definiert die Frist, nach der der belegte vApp-Speicher (Festplatten) von ausgeschalteten vApps bereinigt wird. Dies kann durch Verschieben oder endgültiges Löschen passieren. Standard ist: Läuft nie ab
  * Speicher bereinigen: Mögliche Optionen sind: Speicher verschieben oder löschen
* vApp-Vorlage-Lease
  * Maximaler Speicher-Lease: Standard ist: Läuft nie ab. Es können aber auch Stunden oder Tage definiert werden, in denen eine vApp-Vorlage abläuft und die Laufzeitablaufaktion ausgeführt wird.
  * Speicher bereinigen: Mögliche Optionen sind: Speicher verschieben oder löschen
* Standardkontingente
  * Kontingent aller {{< abbr "VM" "Virtuelle Maschine" >}}s: Mögliches Limit für zu erstellende {{< abbr "VM" "Virtuelle Maschine" >}}s
  * Kontingent ausgeführter {{< abbr "VM" "Virtuelle Maschine" >}}s: Mögliches Limit für laufende {{< abbr "VM" "Virtuelle Maschine" >}}s
* Kennwortrichtlinien
  * Kontosperrung: Kontosperrung aktivieren oder deaktivieren zum Schutz des Kontos bei unzulässigen Zugriffen
  * Ungültige Anmeldungen vor der Sperrung: Definiert die Anzahl der fehlgeschlagenen Logins bevor der Benutzer gesperrt wird
  * Kontosperrungsintervall: Definiert, wie lange das Konto gesperrt bleibt, bis ein Login wieder möglich ist
