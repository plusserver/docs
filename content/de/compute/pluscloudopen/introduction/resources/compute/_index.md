---
title: "Compute"
type: "docs"
weight: 30
date: 2023-09-05
description: >
  Compute Flavors und Betriebssystem-Images in der pluscloud open
---

Um eine VM zu erstellen, müssen Sie ihre Größe und das Betriebssystem angeben, das sie ausführen soll. Ersteres wird durch ein [Compute Flavor](../../../reference/instances-and-images/flavors/) und letzteres durch das [Boot Image](#images) angegeben.

## Compute Flavors

[Compute Flavor](../../../reference/instances-and-images/flavors/) sind vordefinierte Konfigurationen, die die Menge an CPU-, RAM- und Speicherressourcen bestimmen, die einer virtuellen Maschine zugewiesen werden. Jeder Flavor bietet eine andere Kombination dieser Ressourcen, so dass der Benutzer die passende Konfiguration je nach den Leistungsanforderungen seiner Anwendung auswählen kann.

pluscloud open verwendet den [SCS-Standard](https://github.com/SovereignCloudStack/standards) für die Benennung von Flavors. Dieser Standard verwendet eine Kombination aus Buchstaben und Zahlen, um die Spezifikationen der einzelnen Flavors zu beschreiben. Der erste Teil des Namens gibt die Anzahl der im Flavor verfügbaren virtuellen CPUs (vCPUs) an, während der zweite Teil die Menge des verfügbaren Arbeitsspeichers (RAM) beschreibt. Der dritte Teil, falls vorhanden, gibt die Menge an Festplattenspeicher an, die der Instanz zugewiesen wurde. Bei Flavors mit zusätzlichem Festplattenspeicher wird auch die Größe der Festplatte im Namen angegeben. Allen Flavors, die diesem Standard folgen, wird ein „SCS-“ vorangestellt.

## Images

{{% alert title="Hinweis" color="info" %}}
Die Betriebssystem-Images werden regelmäßig aktualisiert, um den neuesten Stand der Sicherheitspatches bereitzustellen. Ältere Images sind entsprechend den Metadaten (siehe SCS Image Metadata) weiterhin verfügbar.
{{% /alert %}}

Die pluscloud open bietet eine Vielzahl von unveränderten Upstream-Betriebssystem-Images, die zum Booten von VMs verwendet werden können. Zu den verfügbaren Images gehören:

| Name                 |
|----------------------|
| AlmaLinux 8          |
| AlmaLinux 9          |
| CirrOS 0.6.1         |
| Debian 11            |
| Debian 12            |
| Flatcar Container Linux 3815.2.0 |
| Flatcar Container Linux 3815.2.5 |
| Ubuntu 20.04         |
| Ubuntu 22.04         |
| Ubuntu 24.04         |
| Ubuntu Minimal 20.04 |
| Ubuntu Minimal 22.04 |
| Ubuntu Minimal 24.04 |

Es ist wichtig zu beachten, dass die pluscloud open den [SCS-Standard](https://github.com/SovereignCloudStack/standards) für Image-Metadaten verwendet, um Metadaten zu den bereitgestellten OS-Images hinzuzufügen. Dies ermöglicht eine bessere Integration mit der OpenStack-Plattform und liefert zusätzliche Informationen über die Images, wie z. B. die Betriebssystemversion und Architektur.

Um diese Images zu nutzen, können User einfach das gewünschte Image aus dem Image Repositiry der pluscloud open auswählen und damit eine virtuelle Instanz starten. Auf die mit dem Image verbundenen Metadaten kann ebenfalls zugegriffen werden, um Informationen über das Image zu sammeln und sicherzustellen, dass es den Anforderungen entspricht.

### Cloud-init

Bei allen in der pluscloud open angebotenen Betriebssystem-Images ist standardmäßig [cloud-init](https://cloudinit.readthedocs.io/en/latest/) aktiviert, was eine einfache und effiziente Anpassung von virtuellen Instanzen in einer OpenStack-Umgebung ermöglicht. Mit cloud-init können User verschiedene Aufgaben während des Boot-Prozesses automatisieren, wie z. B. die Konfiguration von Netzwerkeinstellungen, die Erstellung von Benutzerkonten und die Installation von Softwarepaketen. Dies kann dazu beitragen, die Bereitstellung virtueller Maschinen zu rationalisieren und sicherzustellen, dass sie korrekt und konsistent konfiguriert sind. Um cloud-init mit einem Image zu verwenden, können User einfach eine cloud-config-Datei oder ein Benutzerdaten-Skript beim Starten der Instanz bereitstellen. Das cloud-init-Tool liest dann diese Daten und führt die angegebenen Aktionen während des Startvorgangs aus.
