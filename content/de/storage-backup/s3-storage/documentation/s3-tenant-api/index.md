---
title: "plusserver S3 Tenant-API-Dokumentation"
linkTitle: "S3 Tenant-API"
type: "docs"
weight: 30
date: "2024-02-07"
---

Die Tenant-API des plusserver S3-Dienstes bietet eine umfassende Schnittstelle für verschiedene Funktionen, um das Mandantenmanagement effektiv zu steuern und zu verwalten. Hier finden Sie eine Übersicht über die wichtigsten Aspekte der API und wie Sie sie verwenden können.

### Was ist die Tenant-API?

Die Tenant-API ermöglicht es Ihnen, verschiedene Operationen im Zusammenhang mit dem Mandantenmanagement durchzuführen. Ein Mandant repräsentiert dabei einen Benutzer oder eine Gruppe von Benutzern und deren zugehörige Ressourcen im S3-Dienst. Mit der Tenant-API können Sie spezifische Aktionen auf Mandantenkonten, Authentifizierung, Konfigurationen, Objektverwaltung und mehr durchführen.

### Wie ruft man die Dokumentation auf?

Sie können die vollständige API-Dokumentation unter [https://s3-portal.psmanaged.com:9443/ui/apidocs.html#](https://s3-portal.psmanaged.com:9443/ui/apidocs.html#) aufrufen. Dort finden Sie detaillierte Informationen zu den verfügbaren Endpunkten, Authentifizierungsschemas, unterstützten Versionen und den verschiedenen Operationen, die Sie durchführen können.

### Verfügbare Funktionen

Die Mandantenmanagement-API organisiert die verfügbaren Funktionen in verschiedene Abschnitte:

- **Account:** Betrieb auf dem aktuellen Mandantenkonto, einschließlich der Speicherung von Informationen zur Nutzung.

- **Auth:** Operationen zur Authentifizierung der Benutzersitzung, mit Unterstützung des Authentifizierungsschemas für das Inhabertoken.

- **Config:** Operationen bezogen auf die Produktversion und Versionen der Mandantenmanagement-API. Sie können die Produktversion und die Hauptversionen der von dieser Version unterstützten API auflisten.

- **Container:** Betrieb auf S3-Buckets oder Swift-Containern, einschließlich Funktionen wie Bucket-Erstellung, Konsistenzsteuerung, CORS-Konfiguration, Objektupdates und mehr.

- **Disabled Functions:** Anzeigen von Funktionen, die möglicherweise deaktiviert wurden.

- **Endpoints:** Operationen zur Verwaltung von Endpunkten, die einem S3-Bucket ermöglichen, externe Services für Replikation, Benachrichtigungen oder Suchintegration zu verwenden.

- **Groups:** Operationen zur Verwaltung lokaler Mandantengruppen und zum Abrufen von verbundenen Mandantengruppen aus einer externen Identitätsquelle.

- **Identity Source:** Operationen zum Konfigurieren einer externen Identitätsquelle und manuellen Synchronisieren von föderierten Gruppen- und Benutzerinformationen.

- **Regions:** Operationen zur Bestimmung, welche Regionen für das StorageGRID-System konfiguriert wurden.

- **S3:** Betrieb zum Verwalten von S3-Zugriffsschlüsseln für Mandantenbenutzer.

- **S3-Object-Lock:** Operationen auf globalen S3 Object Lock Einstellungen zur Unterstützung der Einhaltung gesetzlicher Vorschriften.

- **Users:** Operationen zum Anzeigen und Verwalten von Mandantenbenutzern.

Nutzen Sie die umfassenden Funktionen der Tenant-API, um Ihr Mandantenmanagement effizient zu steuern und anzupassen.

## plusserver S3 Usage via API Query

In diesem Abschnitt erfahren Sie, wie Sie die Nutzungsinformationen für Ihren plusserver S3-Service abrufen können. Damit erhalten Sie Einblicke in die Verwendung Ihrer Buckets via API Abfrage.

### Schritt 1: API-Dokumentation abrufen

Bevor Sie mit der Abfrage von S3 Usage beginnen, können Sie die API-Dokumentation über den folgenden Link abrufen: [API-Dokumentation](https://s3-portal.psmanaged.com:9443/ui/apidocs.html#).

### Schritt 2: Autorisierungstoken erhalten

Um auf die S3 Usage-Daten zuzugreifen, benötigen Sie ein Autorisierungstoken. Sie können das Token über eine POST-Anfrage an die folgende URL erhalten:
[https://s3-portal.psmanaged.com:9443/api/v3/authorize](https://s3-portal.psmanaged.com:9443/api/v3/authorize)

Verwenden Sie den folgenden JSON-Body in Ihrer Anfrage und ersetzen Sie `<accountId>`, `<username>` und `<password>` durch Ihre entsprechenden Informationen:

```json
{
  "accountId": "Ihre_Account_ID",
  "username": "Ihr_Benutzername",
  "password": "Ihr_Passwort",
  "cookie": true,
  "csrfToken": false
}
```

Die Antwort enthält Ihr Autorisierungstoken, die Sie für die weiteren Schritte verwenden können.

**Beispiel Curl-Anfrage für die Autorisierung:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "accountId": "Ihre_Account_ID",
  "username": "Ihr_Benutzername",
  "password": "Ihr_Passwort",
  "cookie": true,
  "csrfToken": false
}' "https://s3-portal.psmanaged.com:9443/api/v3/authorize"
```

### Schritt 3: S3 Usage abrufen

Verwenden Sie Ihr Autorisierungstoken, um die S3 Usage-Daten abzurufen. Nutzen Sie dazu eine GET-Anfrage an die folgende URL:
[https://s3-portal.psmanaged.com:9443/api/v3/org/usage](https://s3-portal.psmanaged.com:9443/api/v3/org/usage)

Fügen Sie Ihrem Anfrageheader das Autorisierungstoken hinzu:
**-H "Authorization: Bearer Ihr_Autorisierungstoken"**

Die Antwort enthält umfassende Informationen zur Nutzung, einschließlich der Anzahl der Objekte, der Datenmenge und der Informationen zu Ihren Buckets.

### Schritt 4: Speichern der Usage-Daten

Um die erhaltenen Usage-Daten zu speichern, können Sie **beispielsweise** ein einfaches Bash-Skript verwenden. Hier ist ein **Beispiel**, wie Sie die Daten abrufen und als JSON-Datei speichern können:

```bash
#!/bin/bash

# Autorisierungstoken abrufen
auth_token=$(curl -X POST -H "Content-Type: application/json" -d '{
  "accountId": "Ihre_Account_ID",
  "username": "Ihr_Benutzername",
  "password": "Ihr_Passwort",
  "cookie": true,
  "csrfToken": false
}' "https://s3-portal.psmanaged.com:9443/api/v3/authorize" | jq -r '.data')

# S3 Usage-Daten abrufen
usage_data=$(curl -X GET "https://s3-portal.psmanaged.com:9443/api/v3/org/usage" -H "accept: application/json" -H "Authorization: Bearer $auth_token")

# Datum für Dateinamen generieren
timestamp=$(date +"%Y%m%d%H%M%S")

# Daten als JSON speichern
echo "$usage_data" > "usage_$timestamp.json"

echo "Usage-Daten wurden als usage_$timestamp.json gespeichert."
```

Führen Sie dieses Skript aus, um Ihre S3 Usage-Daten abzurufen und als JSON-Datei zu speichern.

{{% alert title="Info" %}}
Bitte beachten Sie, dass Sie Ihre eigenen Anmeldeinformationen und Account-IDs verwenden müssen, um die API-Anfragen durchzuführen.
{{% /alert %}}

---
