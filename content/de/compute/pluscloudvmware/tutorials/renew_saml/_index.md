---
title: "Erneuern abgelaufener SAML-Zertifikate"
linkTitle: "SAML-Zertifikate"
type: "docs"
weight: 20
date: 2025-07-10
description: >
    Erneuern abgelaufener SAML-Zertifikate über das Mandantenportal
---

{{% alert color=info %}}
**Hinweis:** Für diesen Vorgang benötigt Ihr Benutzer die Rolle `Organisationsadministrator`.
{{% /alert %}}

Jede Organisation verfügt immer über mindestens einen Satz SAML-Zertifikate, um die Anbindung an einen SSO-Identitätsanbieter Ihrer Wahl zu ermöglichen.
Die übliche Gültigkeitsdauer beträgt hier in der Regel ein ganzes Jahr.

Sollten Sie per E-Mail über das Auslaufen eines solchen Zertifikatsatzes benachrichtigt worden sein, können Sie diesen im Mandantenportal mit wenigen Schritten erneuern.

### Generieren neuer Zertifikate

Zunächst generieren Sie einen neuen Satz Zertifikate:

1. Navigieren Sie zu `Administration` -> `Identitätsanbieter` -> `SAML`
1. Klicken Sie auf `ZERTIFIKAT NEU GENERIEREN`

{{< img src="img/screen-renew.png" alt="Generieren neuer Zertifikate">}}

### Entfernen abgelaufener Zertifikate

Der Vollständigkeit halber empfiehlt es sich, die abgelaufenen Zertifikate zu entfernen:

1. Navigieren Sie zu `Administration` -> `Zertifikatsverwaltung` -> `Zertifikatbibliothek`
1. Wählen Sie die abgelaufenen Zertifikate aus und klicken Sie auf `LÖSCHEN`

{{< img src="img/screen-delete.png" alt="Entfernen der abgelaufenen Zertifikate">}}
