---
Titel: "QoS für Speicher-E/A"
linkTitle: "IO-QOS"
type: "docs"
Datum: 2024-09-06
Gewicht: 9999
Beschreibung: >
  Hinweise zur Aktivierung von Quality of Service für Speicehr-E/A
---

## Steigerung der Speichereffizienz mit Quality of Service (QoS)

Um unser Serviceangebot kontinuierlich zu verbessern und sicherzustellen, dass alle Kunden von einer konsistenten und zuverlässigen Speicherleistung profitieren,
führen wir Quality of Service (QoS)-Funktionen für unser allgemeines Speichersystem ein.

Was das für Sie bedeutet:

- **Konsistente Leistung:** QoS trägt dazu bei, dass Ihre Speicherressourcen optimiert werden, um eine zuverlässige, auf Ihre spezifischen Anforderungen zugeschnittene Leistung zu liefern.
- **Gerechte Ressourcenzuweisung:** Durch die Implementierung von QoS verhindern wir Leistungsengpässe, die durch übermäßigen Ressourcenverbrauch durch andere Arbeitslasten verursacht werden, und stellen sicher, dass Ihr Betrieb auch bei Spitzenauslastung reibungslos funktioniert.
- **Optimierte Effizienz:** Unabhängig davon, ob Sie sich für unsere Standard- oder Premium-Storage-Tiers entscheiden, trägt QoS dazu bei, die bestmögliche Leistung zu erzielen, indem Ihre Arbeitslast auf der Grundlage der ausgewählten Speicherklasse priorisiert wird.

Diese Verbesserung ermöglicht es uns, Ihre Speicheranforderungen mit größerer Konsistenz und Zuverlässigkeit zu erfüllen und ebnet den Weg für ein effizienteres und ausgewogeneres System, von dem alle Nutzer profitieren.

## Migrationsphasen

Die Aktivierung wird in mehreren Phasen erfolgen. Sie brauchen nichts zu tun.

### Phase 1: Einführung der neuen Datenträgertypen

In der ersten Phase werden wir neue Volume-Typen hinzufügen, die mit aktivierter QoS ausgeliefert werden. Ihre bestehenden Systeme werden davon nicht betroffen sein.
Sie können die neuen Volume-Typen sofort verwenden.

### Phase 2: Aktivieren von I/O QoS für neue VMs

Als nächstes werden alle neu erstellten VMs mit aktiviertem QoS gestartet. Dies betrifft nur VMs, die ohne Cinder-Boot-Volume gebootet werden.
Neue VMs, die von einem Volume gebootet werden, sind nur betroffen, wenn sie mit einem der neuen Volume-Typen gestartet werden.
Ihre bestehenden Systeme werden davon nicht betroffen sein.

### Phase 3: Aktivieren von I/O QoS für neue Volumes

In der letzten Phase wird QoS standardmäßig auf alle neuen Volumes angewendet.
Ihre bestehenden Systeme werden davon nicht betroffen sein.

## Manuelle Migrationsoptionen

Wenn Sie QoS für Ihren bestehenden Workload aktivieren möchten, können Sie den Volume-Typ für Ihre Volumes ändern.
Dazu müssen Sie jedoch die folgenden Schritte durchführen:

- Aushängen des Volumes aus der VM
- Ändern Sie den Volume-Typ in einen der neuen Volume-Typen.
- Verbinden Sie das Volume erneut mit der VM

Übersetzt mit DeepL.com (kostenlose Version)
