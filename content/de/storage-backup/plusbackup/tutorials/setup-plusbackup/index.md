---
title: "Einrichtung des Plusbackups"
linkTitle: "Einrichtung des Plusbackups"
type: "docs"
weight: 20
date: "2024-02-07"
---

## Schritt 1: Loggen Sie sich bei plusbackup ein

1. Das plusbackup ist über folgende HTTPs Webseite erreichbar: [Link](https://de-4-spc-backup.vcd.get-cloud.io:1280/ "https://de-4-spc-backup.vcd.get-cloud.io:1280/")

{{< img src="images/image-1.png" alt="Screenshot: Anmeldemaske" >}}

Hier mit Usernamen und Password anmelden

2. In der linken Menü-Leiste auf "Managed Computers" klicken

{{< img src="images/image-2.png" alt="Screenshot: Managed Computers ausgewählt" >}}
Hier kann man alle Managed Workloads sehen, die man verwaltet und über  "Download Management Agent" eine weitere Workload hinzufügen

3. Hierbei wählt man das Betriebssystem des Computers an (Windows / Linux / Mac)    
{{< img src="images/image-3.png" alt="Screenshot: Betriebssystem auswählen" >}}

- ein Wizard öffnet sich

{{< img src="images/image-4.png" alt="Screenshot: Wizardfenster" >}}

Hier kann man die Zeit definieren, wie lange der Downloadlink vom Management Agenten verwendet werden kann (Default 12 Monate). Aus Sicherheitsgründen sollte hier eine Kurze dauer gewählt werden (z.B. 1 Tag)
{{< img src="images/image-5.png" alt="Screenshot: Zeitangabe einstellen" >}}

Über Create Download Link erhält man dann einen Link, über den der zukünftige Client die Management Software herunterladen kann oder man lädt den Agenten direkt über "Download" herunter

{{< img src="images/image-6.png" alt="Screenshot: link runtergeladen" >}}

{{< img src="images/image-7.png" alt="Screenshot: Managment agent will now be downloaded to your computer" >}}

Auf dem zukünftig zu sichernden System wird dieser nun installiert

{{% alert title="Warning" color="warning" %}}
Wichtig plusbackup verwendet folgende Ports die auf dem Client und in der Infrastruktur freigeschaltet werden müssen (Firewall, Edge Gateway, ...):

Veeam Agent (Windows) 9395+, 6183+  - siehe [Link](https://helpcenter.veeam.com/docs/agentforwindows/userguide/ports.html?ver=60)

Veeam Agent (Linux) 10002,100006, 2500-3300, 10808 - siehe [Link](https://helpcenter.veeam.com/docs/agentforlinux/userguide/used_ports.html?ver=60) 

Veeam Agent (Mac) 10006,10101, 2500-3300 - siehe [Link](https://helpcenter.veeam.com/docs/agentformac/userguide/used_ports.html?ver=20 "Optionaler Linktitel")

Cloud Gateway 6180

TCP 443 (Download Information und Updates)

TCP 80 (Certification Revocation Lists)

**Wichtig bezüglich pluscloud open:**
Sollte in der zu backupenden Instanz keine MTU Size angegeben worden sein, ist die MTU auf 9000 eingestellt. Um ein Backup mit plusbackup von dieser Instanz zu ermöglichen muss die MTU Size der Instanz auf 1.500 gesetzt werden.
{{% /alert %}}

## Schritt 2: Einrichten von Plusbackup

Als Beispiel für das Einrichten von Plusbackup verwenden wir hier einen Windows Laptop. 
Die Installtion benötigt Admin bzw. Root Rechte auf dem System.
Gehen Sie wie folgt vor (siehe Screenshots): 

1. {{< img src="images/image-8.png" alt="Screenshot: Installationsfenster" >}}

2. {{< img src="images/image-9.png" alt="Screenshot: Lizenzvereinbarungen" >}}

3. {{< img src="images/image-10.png" alt="Screenshot: Fertig zum Installieren" >}}

4. {{< img src="images/image-11.png" alt="Screenshot: Veeam Service Provider Console Management agent installiert" >}}

5. Nach der Installation sollte der Agent gestartet werden und wird dann sich mit dem plusserver Cloud Gateway über Port 6180 verbunden (dieser muss natürlich erreichbar sein, bzw. auf der Firewall oder ähnlichem Freigeschaltet sein). 
6. Nach einigen Minuten sollte die Connectivität hergestellt sein, dem Computer System kann man hierbei auch noch ein Tag vergeben, welches dann in der HTML GUI auftaucht.

{{< img src="images/image-12.png" alt="Screenshot: Veeam Management Agent Settings Wizardfenster" >}}

{{< img src="images/image-13.png" alt="Screenshot: Agent Status verbunden" >}}

- Sollte es sich bei dem Computer System um einen Windows Client handeln kann auch die mögliche Verbindung per Powershell getestet werden (<powershell>: tnc port 6180 de-4-cc-gw01.vcd.get-cloud.io). Sollte hierbei keine Verbindung möglich sein muss der Port 6180 freigegeben werden (Firewall oder ähnliches)

{{< img src="images/image-14.png" alt="Screenshot: Verbindung per Powershell testen" >}}

7. Nun kann man das neue Computersystem mit dem "Tag" in der plusbackup HTML Console sehen und mit einem Häckchen markieren, über "Management Agent" kann man den Management Agenten Restarten, den Computer Rebooten und ihn auch Upgraden oder löschen, sowie die logs einsehen.

{{< img src="images/image-15.png" alt="Screenshot: Management Agenten Restarten" >}}

8. Über den Button "Install Backup Agent" kann man auf dem Ausgewählten Computer System den Backup Agenten installieren.

{{< img src="images/image-16.png" alt="Screenshot: Button Install Backup Agent" >}}
- Bei der Installation des Backup Agenten kann man diesen auch schon einer **Backuppolicy** hinzufügen oder eine neue Backuppolicy erstellen. Da dies aber auch später geht ist dies nicht von Nöten und man kann auch "No Policy" auswählen.

{{< img src="images/image-17.png" alt="Screenshot: Install Backup Agent Wizardfenster" >}}

{{< img src="images/image-18.png" alt="Screenshot: no policy ausgewählt" >}}

9. Danach wird der Backup Agent installiert, dies dauert mehrere Minuten

{{< img src="images/image-19.png" alt="Screenshot: Backup Agent wird installiert" >}}


## Schritt 3: Backup Job/Backup Policy erstellen

1. Nach der Finalisierung kann man einen Backup Job bzw. eine **Backup Policy** erstellen oder den Computer in einen schon vorhandenen Job oder Policy aufnehmen.

{{< img src="images/image-20.png" alt="Screenshot: neue Backup Policy erstellen" >}}

2. Hier kann man einen Job neu erstellen oder ein Template auswählen:

{{< img src="images/image-21.png" alt="Screenshot: Neuen Backup Job Wizardfenster" >}}

3. Hier vergibt man den Namen des Jobs und kann auch eine Beschreibung dazu schreiben

{{< img src="images/image-22.png" alt="Screenshot: Namenvergabe für Backup Job" >}}

4. Hier wählt man Server oder Workstation aus. Die Unterschiede zwischen den Edtition sind wie folgt: [Link](https://reimagined-space-potato-97qq664rvxx6fx5pp-1313.app.github.dev/de/storage-backup/plusbackup/tutorials/workstation-vs-server-lizenz-features/ "Optionaler Linktitel")

Server Features: Parallel disk processing, Retention based on Restore Points, Continuous, daily, weekly and monthly schedule, GFS Backups, Backup Window Adjustment, Managed jobs, Application Awareness für Oracle, MySQL, PostgreSQL, Pre-freeze und Post-Thaw Skripte, Applikation Item Recovery, Veeam Cloud Connect Repository, Multiple Backup Jobs

{{< img src="images/image-23.png" alt="Screenshot: Operation Mode - Server oder Workstation" >}}

5. Backup Modus auswählen (ganzer Computer | nur einzelne Partitionen oder Disks | Einzelne Dateien oder Ordnerpfade)

{{< img src="images/image-24.png" alt="Screenshot: Backup Mode ausgewählt" >}}

6. Wenn File Level ausgewählt wurde, kann man in dieser Maske die Files genauer definieren.

{{< img src="images/image-25.png" alt="Screenshot: Files - Datei genauer definieren" >}}

7. Als Beispiel haben wir hier den Ordner C:\test2 gewählt, indem sich eine Datei (backupfile.txt) befindet mit dem Satz "das will ich wiederherstellen"

{{< img src="images/image-26.png" alt="Screenshot: Ordner mit Beispieldatei" >}}

8. Als Ziel "Destination" Veeam Cloud Connect Repository angeben:

{{< img src="images/image-27.png" alt="Screenshot: Destination Veeam Cloud Connect Repository" >}}

9. Jetzt die Credentials (Username + Passwort) vom plusbackup Account eingeben (**WICHTIG:** nicht die vom Client!)

{{< img src="images/image-28.png" alt="Screenshot: Username und Passwort Eingabe" >}}

Nur den hinteren Teil des plusbackup Accounts verwenden (der ganze User ist nur in der WEB Gui nötig)

Also z.B. Account ist 
123456\kd123456
Hier dann nur kd123456 eingeben

{{< img src="images/image-29.png" alt="Screenshot: Eingabe Beispiel Account + Passwort" >}}

10. Im nächsten Schritt muss das Backup Repository ausgewählt werden (Wichtig es muss angeklickt werden, ansonsten folgt die Fehlermeldung "Select any repository to store your backup data.")

{{< img src="images/image-30.png" alt="Screenshot: Repository angeklickt" >}}

11. Nun kann man die Retention policy vergeben (wieviel Backups sollen vorgehalten werden)

{{< img src="images/image-31.png" alt="Screenshot: Wizardfenster Retention policy" >}}

- Bei Bedarf kann GFS (Grandfather, Father, Son) ausgewählt werden, so dass man Wöchentliche, Monatliche und Jährliche Backups einstellen kann

{{< img src="images/image-32.png" alt="Screenshot: Wizardfenster Configure GFS" >}}

12. Unter "Advanced Settings" können weitere Detailkonfigurationen eingestellt werden

{{< img src="images/image-33.png" alt="Screenshot: Wizardfenster Advanced Setting" >}}


{{% alert title="Hinweis" %}}
WICHTIG - unter Advanced Settings → Storage soll die Optimierung "Local target" (large blocks) ausgewählt sein.

{{< img src="images/image-34.png" alt="Screenshot: Storage optimization Optionen" >}}

{{< img src="images/image-35.png" alt="Screenshot: Local target (large blocks) ausgewählt" >}}

Da die plusserver alle Backups als redundante S3 Kopie georedundant aufhebt. Diese Option sorgt für die beste Ablage im S3.
{{% /alert %}}

13. Im nächsten Menü kann ein Backup Cache auf dem Client eingerichtet werden, der Backupdaten temporär vorhalten kann, falls die Konnectivität vom Client zum plusserver Backup Service kurzfristig gestöhrt sein sollte

{{< img src="images/image-36.png" alt="Screenshot: Backup cache einstellen" >}}

Im Schedule Bereich kann der Zeitpunkt des Backupjob eingestellt und Konfiguriert werden

{{< img src="images/image-37.png" alt="Screenshot: Zeitplan für Backup cache einstellen" >}}
    
Das Backup wird entweder mit dem Wizard gestartet oder der Job muss danach enabled und gestartet werden:

{{< img src="images/image-38.png" alt="Screenshot: Backupjob manuell starten" >}}

14. Beim Start das Backupjobs kann man dies sowohl in der Web-GUI als auch lokal über den Agenten sehen, dass der Backup Job gestartet ist:

{{< img src="images/image-39.png" alt="Screenshot: laufende und fertige Backupjobs" >}}

{{< img src="images/image-40.png" alt="Screenshot: Mauszeiger auf Open" >}}

{{< img src="images/image-41.png" alt="Screenshot: Status und Restore point details" >}}

Nachdem der Backup abgeschlossen ist kann man das letzte Backup mit Timecode sowohl im Client als auch der WEB GUI sehen

{{< img src="images/image-42.png" alt="Screenshot: Backup status fertig" >}}

## Wiederherstellung:

Eine Wiederherstellung kann vom Client (mit dem Veeam Agenten) oder vom plusbackup Portal iniitiiert werden.

**A - Agenten Wiederherstellung**
1. File Level Restore (Für einzelne Dateien) oder Volume Restore aus dem Client aufrufen:

{{< img src="images/image-43.png" alt="Screenshot: File Level Restore und Volume Restore" >}}

2. Restore Punkt im Wizard auswählen

{{< img src="images/image-44.png" alt="Screenshot: Wizardfenster File Level Restore" >}}

{{< img src="images/image-45.png" alt="Screenshot: Wizardfenster Please wait" >}}


{{< img src="images/image-46.png" alt="Screenshot: Test2 Ordner ausgewählt" >}}

{{< img src="images/image-47.png" alt="Screenshot: Restore Button" >}}


Restore - Am selben Ort mit selben Namen Wiederherstellen/Überschreiben
Copy To - Mit anderem Namen Wiederherstellten oder anderen Ort

{{< img src="images/image-48.png" alt="Screenshot: Restoring files to NB-61239" >}}

{{< img src="images/image-49.png" alt="Screenshot: Heruntergeladenes Backupdokument" >}}

**B - plusserver Portal Wiederherstellung**

1. Unter Protected Data den Client auswählen und auf "File-Level Restore Portal" klicken:

{{< img src="images/image-50.png" alt="Screenshot: Protected Data Client ausgewählt" >}}

2. Den passenden Restore Point mit klick auf Select auswählen:

{{< img src="images/image-51.png" alt="Screenshot: Restore Point Select anklicken" >}}

{{< img src="images/image-52.png" alt="Screenshot: Restore Point Select auswählen" >}}

{{< img src="images/image-53.png" alt="Screenshot: Test2 Ordner angeklickt" >}}

{{< img src="images/image-54.png" alt="Screenshot: Backupfile.txt ausgewählt" >}}

3. Alle Elemente auswählen die man Wiederherstellen will und "Add to Restore List" klicken

{{< img src="images/image-55.png" alt="Screenshot: Add to Restore List Button" >}}

4. Im Menüpunkt "Restore List" entscheiden ob die Elemente heruntergeladen werden sollen, die vorhandenen Überscherschrieben werden sollen oder sie an einen anderen Ort bzw. unter anderem Namen Wiederhergestellt werden sollen.

{{< img src="images/image-56.png" alt="Screenshot: Backupfile.txt ausgewählt" >}}

{{< img src="images/image-57.png" alt="Screenshot: Restore Button - Keep oder Overwrite" >}}

Download - Lokal Herunterladen

Keep - Mit anderem Namen Wiederherstellten oder anderen Ort
    
Overwrite - Am selben Ort mit selben Namen Wiederherstellen/Überschreiben
    