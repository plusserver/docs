---
title: "Einrichtung der Identity Federation in plusserver S3"
linkTitle: "Einrichtung von Identity Federation"
type: "docs"
weight: 20
date: "2024-02-07"
---

Sie haben die Möglichkeit, Identity Federation zu konfigurieren, wenn Sie Gruppen und Benutzer aus einem anderen System wie Active Directory, OpenLDAP oder Oracle Directory Server verwenden möchten. Dies ermöglicht eine nahtlose Integration Ihrer bestehenden Benutzer- und Gruppenverwaltung in das StorageGrid-System. Dadurch können Ihre Mitarbeiter ihre gewohnten Anmeldeinformationen verwenden, um auf plusserver S3 zuzugreifen, ohne separate Zugangsdaten verwalten zu müssen. Dies erleichtert nicht nur die Verwaltung, sondern erhöht auch die Sicherheit und Benutzerfreundlichkeit Ihrer plusserver-S3-Umgebung. Unsere Dokumentation führt Sie Schritt für Schritt durch den Prozess der Einrichtung der Identity Federation, sodass Sie schnell von den Vorteilen dieser Integration profitieren können.

### Schritt 1: Loggen Sie sich in das plusserver S3 Kundenportal ein

{{< img src="images/image-1.png" alt="LoginScreen" >}}

- Öffnen Sie Ihren Webbrowser und besuchen Sie die folgende Webseite: [https://s3-portal.psmanaged.com:9443/](https://s3-portal.psmanaged.com:9443/)
- Verwenden Sie die Ihnen bereitgestellten Benutzerdaten (diese können sie im plusserver Kundenportal: [https://customerservice.plusserver.com/](https://customerservice.plusserver.com/) unter “Verträge und Abrechnung” → "S3 Vertrag auswählen" → "Zugangsdaten" → “Anmeldeinformationen anzeigen” finden), um sich anzumelden. Der Benutzername lautet "root". Bitte verwenden Sie das Ihnen bekannte Passwort. Hier finden Sie zudem die Account ID.

### Schritt 2: Richten Sie die Identity Federation ein

Klicken Sie auf der linken Seite unter “ACCESS MANAGEMENT” auf "Identity Federation". Hier haben Sie die Auswahl zwischen "Active Directory", "Azure", "OpenLDAP" und "Other". Anschließend können Sie die Verbindung testen und danach speichern. Sie sind nun in der Lage, die Identity Federation zu verwenden.

{{< img src="images/image-2.png" alt="IdendtityFederation" >}}

### Schritt 3: Richten Sie eine Gruppe ein

Um Ihren Benutzern die angemessenen Berechtigungen zu erteilen, müssen Sie zunächst eine Gruppe erstellen. Befolgen Sie dazu die folgenden Schritte:

- Klicken Sie auf der linken Seite auf "Gruppen" (Groups).
- Wählen Sie dann "Neue Gruppe erstellen" (Create Group) aus.
- In der Gruppenerstellungsoberfläche wählen Sie den Reiter "Föderierte Gruppe" (Federated Group) aus.
- Vergeben Sie einen eindeutigen Namen (Unique Name) für die Gruppe. Dieser Name muss entsprechend der Identitätsquelle festgelegt werden. Verwenden Sie dabei bitte die folgenden Richtlinien:
    - Active Directory: Verwenden Sie das Attribut "sAMAccountName".
    - OpenLDAP: Verwenden Sie den "CN" (Common Name).
    - Andere LDAP-Server: Ermitteln Sie den geeigneten Wert für den eindeutigen Namen, der dem verwendeten LDAP-Server entspricht.

Indem Sie diese Schritte befolgen, legen Sie eine Identity Federation Gruppe fest, die von Ihrer Identity Federation abgeleitet ist. Diese Gruppe wird als zentraler Mechanismus dienen, um Benutzern die entsprechenden Zugriffsberechtigungen auf Ihre Ressourcen zuzuweisen.

{{< img src="images/image-2.png" alt="CreateGroup" >}}

{{% alert title="Info" %}}
Wenn Sie Benutzer und Gruppen über die Identity Federation anlegen und verwalten möchten, ist es wichtig, dies bei den Bucket- oder Gruppenrichtlinien zu berücksichtigen. Hier ist ein Beispiel, wie Sie eine Policy für einen Bucket erstellen könnten, um nur einem bestimmten Benutzer Zugriff zu gewähren:
{{% /alert %}}

**Beispiel:**

Sie möchten nur einen User für ein Bucket zulassen. Folgende Policy würde dafür beispielsweise funktionieren:

```json
{
  "Version": "2012-10-17",
  "Id": "UserBucketPolicy",
  "Statement": [
    {
      "Sid": "AllowUserAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "DenyOtherAccess",
      "Effect": "Deny",
      "NotPrincipal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:user/USERNAME"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    }
  ]
}
```

{{% alert title="Info" %}}
Bitte beachten Sie, dass der Präfix für Benutzer und Gruppen aus der Identity Federation "federated-user/" bzw. "federated-group/" ist, anstelle von "user/" oder "group/". Mit dieser Richtlinie wird der spezifische Benutzer "USERNAME" (aus der Identity Federation) Zugriff auf den angegebenen Bucket erhalten, während allen anderen der Zugriff verweigert wird. Es ist ratsam, diese Richtlinien sorgfältig zu überprüfen und gemäß den Anforderungen Ihrer Identity Federation und Ihrer Zugriffssteuerungsstrategie anzupassen.
{{% /alert %}}
