---
title: "Backup und Restore"
linkTitle: "Backup und Restore"
type: "docs"
---

Unsere Caching-as-a-Service (CaaS) beinhalten Backup- und Restore Funktionen.

## Backup

Backups werden automatisch jede Nacht durchgeführt. Wir verwenden Dateisystem-Snapshots für die Backups. Standardmäßig werden die Backups 7 Tage lang aufbewahrt. Alle Backups werden verschlüsselt, um die Sicherheit zu erhöhen und Ihre Daten zu schützen.

>*Sie können die von *plusserver* erstellten Backups nicht direkt herunterladen.

## Restore

Im Falle einer Wiederherstellung muss eine neue CaaS-Instanz mit der gleichen [Node- und Speichergröße](../../documentation/nodesize/) wie das Original erstellt werden. Die Daten können nur auf dieser neuen Instanz wiederhergestellt werden. Dies erfordert die Umkonfigurierung aller Anwendungen, welche die aus dem Backup erstellte Datenbankinstanz verwenden sollen.

<br>

**Um einen Restore zu beantragen öffnen Sie bitte ein [Ticket](<https://customerservice.plusserver.com/support/ticket-create>) bei unserem Support-Team.**

<br>

>*Wir arbeiten an einer Funktion, mit der Sie Backups direkt in unserem Kundenportal wiederherstellen können. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
