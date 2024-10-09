---
title: "Benutzerdefinierte Themes"
linkTitle: "Benutzerdefinierte Themes"
type: "docs"
---

Keycloak as a Service ermöglicht es Ihnen, eigene benutzerdefinierte Themes hochzuladen und damit das Erscheinungsbild Ihres Login-, Konto-, Admin-Konsolen sowie der E-Mails anzupassen.

## Theme-Typen

Es gibt vier Arten von Themes, die Sie anpassen können:

- **Login**: Passt die Login-Seiten an, einschließlich der Startseite, OTP, Registrierung und "Passwort vergessen"-Seiten.
- **Konto**: Definiert das Erscheinungsbild der Kontoverwaltungskonsole.
- **Admin**: Passt das Erscheinungsbild der Admin-Konsole an.
- **E-Mail**: Ändert das Design der ausgehenden E-Mails, die an Benutzer gesendet werden.

## Standard-Themes

Keycloak enthält einige vorgefertigte Themes:

- **Base**: Ein minimales Theme mit HTML-Vorlagen und Sprachpaketen. Benutzerdefinierte Themes basieren in der Regel auf diesem.
- **Keycloak**: Das Standard-Theme mit Bildern und Stilen für Keycloak-Seiten. Dieses wird verwendet, wenn kein benutzerdefiniertes Theme ausgewählt ist.

## Theme-Struktur

Ein Theme umfasst in der Regel:

- HTML-Vorlagen (Freemarker Templates)
- Bilder
- Sprachpakete (Übersetzungen)
- Stylesheets (CSS)
- Skripte (JavaScript)
- Theme-Eigenschaften

### Vorhandene Themes erweitern

Wenn Sie ein benutzerdefiniertes Theme erstellen, können Sie von einem vorhandenes (wie das Base- oder Keycloak-Theme) erben. Damit können Sie spezifische Elemente (z.B. Vorlagen, Stylesheets) überschreiben, ohne alles neu erstellen zu müssen. Beachten Sie jedoch, dass benutzerdefinierte Vorlagen bei einem Keycloak-Upgrade möglicherweise angepasst werden müssen, um weiterhin kompatibel zu bleiben.

## Hochladen eines benutzerdefinierten Themes

Um Ihr benutzerdefiniertes Theme zu Keycloak hochzuladen:

1. Erstellen Sie ein Archiv Ihres Theme-Ordners mit einem der folgenden Befehle:

    ```bash
    zip -r mytheme.zip mytheme
    tar -czvf mytheme.tar.gz mytheme
    tar -cvf mytheme.tar mytheme
    ```

2. Öffnen Sie ein [Support-Ticket](https://customerservice.com/support/ticket-create) und fügen Sie das Archiv Ihres Themes als Anhang hinzu.

3. Sobald wir das Theme in Ihre Keycloak as a Service-Instanz hochgeladen haben, können Sie es in der Keycloak-Weboberfläche unter den Theme-Einstellungen auswählen.

### Archiv-Anforderungen

- Muss im zip-, tar- oder tar.gz-Format sein.
- Muss die Dateiendung `.zip`, `.tar` oder `.tar.gz` haben.
- Muss einen einzigen übergeordneten Ordner enthalten.

<br>

>*Wir arbeiten an einer Funktion, die es Ihnen ermöglicht, benutzerdefinierte Keycloak-Themes direkt über unser Kundenportal hochzuladen. Bis dahin danken wir Ihnen für Ihre Geduld, während wir unsere Dienste verbessern.*
