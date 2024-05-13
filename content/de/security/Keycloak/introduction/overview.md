---
title: "Allgemein"
linkTitle: "Allgemein"
type: "docs"
weight: 10
---

## Keycloak-as-a-Service

*Keycloak-as-a-Service* ist eine Open-Source-Lösung für "single sign-on" mit Identity und Access Management (IAM), die auf die Entwicklung moderner Anwendungen und Services ausgerichtet ist. Es ermöglicht die Verwaltung von Benutzern, Rollen und Berechtigungen sowie die sichere Authentifizierung und Autorisierung von Anwendungen. Keycloak unterstützt außerdem verschiedene Authentifizierungsmethoden wie OpenID Connect, OAuth 2.0 und SAML 2.0, bietet die Anbindung an LDAP und Active Directory, Integration mit Sozialen Netzwerken.

### Unterstützte Komponenten und Versionen

| Keycloak-as-a-Service Komponenten | Version |
|--------------------------|---------|
| Keycloak                 | 23      |
| PostgreSQL DB            | 15      |

## Key Features

**Automatisierter Rollout:**

- Vollständig automatisierte Softwareinstallation, -backup und -updates.

**Skalierbarkeit:**

- Vertikales Skalieren durch Anpassen der Instanzgrößen. (geplant)

**Multi-AZ-Bereitstellung:**

- Mehrere Standorte stehen für den Betrieb zur Verfügung.

**Admin Webinterface:**

Bietet eine benutzerfreundliche Weboberfläche für 

* Aktivierung und Deaktivierung verschiedener Funktionen
* Konfiguration von Identitätsbrokerdiensten und Benutzerföderationen
* Erstellung und Verwaltung von Anwendungen und Diensten
* Verwaltung von Benutzern, Gruppen und deren Berechtigungen
* Definition fein abgestufter Autorisierungsrichtlinien
* Monitoring von Sitzungen

**RESTful API:**

- Bietet eine umfassende RESTful-API, die eine Automatisierung und Integration mit anderen Tools und Systemen ermöglicht.
