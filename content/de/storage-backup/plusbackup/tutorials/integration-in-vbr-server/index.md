---
title: "Einbindung plusbackup in lokale VBR Server"
linkTitle: "Einbindung plusbackup in lokale VBR Server"
type: "docs"
description: ""
weight: 40
---

## Add Service Providers

-   Auf dem source System unter Backup Infrastructure → Service Providers → Add Service Provider auswählen.

    {{< img src="images/image-1.png" alt="Screenshot: Add Service Provider" >}}

## Service Provider Data

Ein Wizardfenster öffnet sich:

-   Tragen Sie in die erste Spalte den DNS-Namen von dem Cloud Connect Servers ein.

-   "Allow this Veeam ..." → ist nur anzuhaken, wenn der betroffene Veeam Server durch die SPC kontrolliert werden soll. Wenn dies nicht eintrifft, nicht anhaken.

    {{< img src="images/image-2.png" alt="Screenshot: Wizardwindow - Service Provider" >}}

## Credentials

-   Als nächstes findet eine Zertifikatsüberprüfung statt. Dies sollte durch öffentliche Zertifizierungsstellen automatisch akzeptiert werden.

    {{< img src="images/image-3.png" alt="Screenshot: Certificate" >}}

-   Danach müssen Sie unter dem Punkt "Add or select credentials issued to you by the service provider" Ihre Anmeldungsdaten angeben. Dafür klicken Sie auf -> "Add".

    {{< img src="images/image-4.png" alt="Screenshot: Credentials" >}}

-   In dem geöffneten Wizardfenster geben Sie nun Ihren Benutzernamen im folgenden Format an: kd(Ihre Kundennummer) sowie Ihr Passwort (Plusbackup Zugangsdaten).

-   Dann auf "Ok" klicken.

## Backup Storage

-   In diesem Punkt steht welche Funktionalitäten für Sie freigeschalten sind -> klicke auf "Apply".

    {{< img src="images/image-5.png" alt="Screenshot: Backup Storage" >}}

    {{< img src="images/image-7.png" alt="Screenshot: Backup Storage" >}}

## Summary

-   Hier werden Ihnen alle vorab angegebenen Informationen angezeigt. Sind diese korrekt -> klicken Sie "Finish".

    {{< img src="images/image-6.png" alt="Screenshot: Summary" >}}

## Service Provider check

-   Der hinzugefügte Service Provider sollte jetzt auf dem Service Provider Bereich auftauchen.

    {{< img src="images/image-8.png" alt="Screenshot: Service Provider check" >}}
