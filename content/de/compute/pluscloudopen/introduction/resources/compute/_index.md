---
title: "Compute"
type: "docs"
weight: 30
date: 2023-03-10
description: >
  Compute Flavors und Betriessystem Images in der pluscloud open
---

# Compute Flavors

pluscloud open verwendet den [SCS-Standard] (https://github.com/SovereignCloudStack/standards) für die Benennung von Instanztypen (Flavors). Dieser Standard verwendet eine Kombination aus Buchstaben und Zahlen, um die Spezifikationen der einzelnen Flavors zu beschreiben. Der erste Teil des Namens gibt die Anzahl der im Flavor verfügbaren virtuellen CPUs (VCPUs) an, während der zweite Teil die Menge des verfügbaren Arbeitsspeichers (RAM) beschreibt. Der dritte Teil, falls vorhanden, gibt den für die Instanz zugewiesenen Festplattenspeicher an. Bei Flavors mit zusätzlichem Festplattenspeicher wird auch die Größe der Festplatte im Namen angegeben. Allen Flavors, die diesem Standard folgen, wird ein "SCS-" vorangestellt.

| Name           | VCPUs | RAM   | Festplatte |
|----------------|-------|-------|------------|
| SCS-1V:0.5     | 1     |   512 |          0 |
| SCS-1V:0,5:20  | 1     |   512 |         20 |
| SCS-1L:1       | 1     |  1024 |          0 |
| SCS-1V:1       | 1     |  1024 |          0 |
| SCS-1L:1:5     | 1     |  1024 |          5 |
| SCS-1V:1:10    | 1     |  1024 |         10 |
| SCS-1V:1:20    | 1     |  1024 |         20 |
| SCS-1V:2       | 1     |  2048 |          0 |
| SCS-1V:2:5     | 1     |  2048 |          5 |
| SCS-1V:4       | 1     |  4096 |          0 |
| SCS-1V:4:10    | 1     |  4096 |         10 |
| SCS-1V:8       | 1     |  8192 |          0 |
| SCS-1V:8:20    | 1     |  8192 |         20 |
| SCS-2V:2       | 2     |  2048 |          0 |
| SCS-2V:2:20    | 2     |  2048 |         20 |
| SCS-2V:4       | 2     |  4096 |          0 |
| SCS-2V:4:10    | 2     |  4096 |         10 |
| SCS-2V:4:20    | 2     |  4096 |         20 |
| SCS-2V:4:50    | 2     |  4096 |         50 |
| SCS-2V:4:100   | 2     |  4096 |        100 |
| SCS-2V:8       | 2     |  8192 |          0 |
| SCS-2V:8:20    | 2     |  8192 |         20 |
| SCS-2V:8:100   | 2     |  8192 |        100 |
| SCS-2V:16      | 2     | 16384 |          0 |
| SCS-2V:16:50   | 2     | 16384 |         50 |
| SCS-4V:8       | 4     |  8192 |          0 |
| SCS-4V:8:20    | 4     |  8192 |         20 |
| SCS-4V:8:50    | 4     |  8192 |         50 |
| SCS-4V:8:100   | 4     |  8192 |        100 |
| SCS-4V:16      | 4     | 16384 |          0 |
| SCS-4V:16:50   | 4     | 16384 |         50 |
| SCS-4V:16:100  | 4     | 16384 |        100 |
| SCS-4V:32      | 4     | 32768 |          0 |
| SCS-4V:32:50   | 4     | 32768 |         50 |
| SCS-4V:32:100  | 4     | 32768 |        100 |
| SCS-8V:8       | 8     |  8192 |          0 |
| SCS-8V:8:100   | 8     |  8192 |        100 |
| SCS-8V:16      | 8     | 16384 |          0 |
| SCS-8V:16:50   | 8     | 16384 |         50 |
| SCS-8V:16:100  | 8     | 16384 |        100 |
| SCS-8V:32      | 8     | 32768 |          0 |
| SCS-8V:32:50   | 8     | 32768 |         50 |
| SCS-8V:32:100  | 8     | 32768 |        100 |
| SCS-16V:32     | 16    | 32768 |          0 |
| SCS-16V:32:100 | 16    | 32768 |        100 |
| SCS-16V:64     | 16    | 65536 |          0 |
| SCS-16V:64:100 | 16    | 65536 |        100 |

# Images

{{% alert title="Hinweis" color="info" %}}
Die Betriebssystem-Images werden regelmäßig aktualisiert, um den neuesten Stand der Sicherheitspatches bereitzustellen. Ältere Images sind entsprechend den Metadaten (siehe SCS Image Metadata) weiterhin verfügbar.
{{% /alert %}}

pluscloud open bietet eine Vielzahl von unveränderten Upstream-Betriebssystem-Images, die zum Booten von VMs verwendet werden können. Zu den verfügbaren Images gehören:

| Name                 |
|----------------------|
| AlmaLinux 8          |
| AlmaLinux 9          |
| Debian 10            |
| Debian 11            |
| Ubuntu 18.04         |
| Ubuntu 20.04         |
| Ubuntu 22.04         |
| Ubuntu Minimal 20.04 |
| Ubuntu Minimal 22.04 |

Es ist wichtig zu beachten, dass pluscloud open den [SCS-Standard](https://github.com/SovereignCloudStack/standards) für Image-Metadaten verwendet, um Metadaten zu den bereitgestellten OS-Images hinzuzufügen. Dies ermöglicht eine bessere Integration mit der OpenStack-Plattform und liefert zusätzliche Informationen über die Images, wie z. B. die Betriebssystemversion und Architektur.

Um diese Images zu nutzen, können Nutzer einfach das gewünschte Image aus dem pluscloud Open Image Repository auswählen und damit eine virtuelle Instanz starten. Auf die mit dem Image verbundenen Metadaten kann ebenfalls zugegriffen werden, um Informationen über das Image zu sammeln und sicherzustellen, dass es den Anforderungen entspricht.

## Cloud-Init

In allen von pluscloud open angebotenen Betriebssystem-Images ist standardmäßig [cloud-init](https://cloudinit.readthedocs.io/en/latest/) aktiviert, was eine einfache und effiziente Anpassung von virtuellen Instanzen in einer OpenStack-Umgebung ermöglicht. Mit cloud-init können Benutzer verschiedene Aufgaben während des Boot-Prozesses automatisieren, wie z. B. die Konfiguration von Netzwerkeinstellungen, die Erstellung von Benutzerkonten und die Installation von Softwarepaketen. Dies kann dazu beitragen, die Bereitstellung virtueller Maschinen zu rationalisieren und sicherzustellen, dass sie korrekt und konsistent konfiguriert sind. Um cloud-init mit einem offenen pluscloud-Image zu verwenden, können Benutzer einfach eine cloud-config-Datei oder ein Benutzerdaten-Skript beim Starten der Instanz bereitstellen. Das cloud-init-Tool liest dann diese Daten und führt die angegebenen Aktionen während des Startvorgangs aus.
