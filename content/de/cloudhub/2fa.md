---
title: "2-Faktor-Authentifizierung im CloudHub"
linkTitle: "2FA im CloudHub"
type: "docs"
weight: 1
description: >
    Informationen zu Dedicated Servern
---


## Motivation

### Kundenbedürfnis

Als Kunde brauche ich eine 2FA im Kundenportal, um die Sicherheit meiner Daten und Produkte zu verbessern.

### Zielsetzung

Da Keycloak von sich aus mit 2FA kommt, wäre unsere Aufgabe hier, dem Kunden eine bequemere Schnittstelle direkt im Portal zu bieten, wo er die Funktionalitäten nutzen kann.

### Die Umsetzung

Wir nutzen die 2FA-Funktion von Keycloak via OTP und erstellen in den Einstellungen einen Link vom SSP auf die entsprechende Keycloak-Seite.

In der Welcome-Tour wird auf die Funktion direkt für neu registrierte Nutzer sichtbar hingewiesen.

Wir werden die Einrichtung nicht verpflichtend machen, aber wir werden den Kunden über eine Nachricht auf der Statuspage, ein Mailing und einem Hinweis in der Welcome Mail benachrichtigen, dass wir diese Sicherheitseinstellung empfehlen.

## 2-Faktor-Authentifizierung Schritt für Schritt

### Schritt 1: Einstellungen

![2-Faktor-Authentifizierung in den Einstellungen](../2fa-settings-1.png)
Unter den Einstellungen findet der Kunde ab sofort die Funktion sich seine 2-Faktor-Authentifizierung einzurichten.

### Schritt 2: Über den Link zu Keycloak

![Link zu Keycloak](../2fa-settings-2.png)
Über den Link "2-FA einrichten" gelangt der Kunde dann zur [Keycloak-Seite](https://idm.psmanaged.com/realms/plusIDM/account/#/security/signingin)
![Bild der Keycloak-Seite](../2fa-keycloak-page.png)
Auf der [Keycloak-Seite](https://idm.psmanaged.com/realms/plusIDM/account/#/security/signingin) findet sich die 2-Faktor-Authentifizierung als zweiter Abschnitt unter "Standardauthentifizierung" im Bereich "Anmeldung".

Rechts befindet sich der Link zu "Authenticator Anwendung einrichten", dort geht es zur weiteren Schritt für Schritt Anleitung sowie der eigentlichen Einrichtung der 2FA.

### Schritt 3: Erneut einloggen

![CloudHub Anmeldung](../2fa-cloudhub-login-1.png)
Nach dem Klick auf "Authentificator Anwendung einrichten" wird der Kunde gebeten sich noch einmal erneut einzuloggen.

### Schritt 4: 2-FA einrichten

![Schritt-für-Schritt Anleitung zur Konfiguration der Mehrfachauthentifizierung](../2fa-instruction-1.png)
Nach dem erfolgreichen Einloggen gelangt der Kunde auf eine Schritt-für-Schritt Anleitung von Keycloak zur Einrichtung der 2-FA.

**Folgende drei Schritte muss der Kunde durchführen:**

1. Installieren Sie eine der folgenden Applikationen auf Ihrem Smartphone:
    - Microsoft Authenticator
    - Google Authenticator
    - FreeOTP
2. Öffnen Sie die Applikation und scannen Sie den QR-Code.
3. Geben Sie den von der Applikation generierten One-time Code ein und klicken Sie auf Absenden.

Geben Sie einen Gerätenamen an, um die Verwaltung Ihrer OTP-Geräte zu erleichtern.
