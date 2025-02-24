---
title: "Einrichtung S3 Portal"
linkTitle: "Einrichtung S3 Portal"
type: "docs"
weight: 10
date: "2024-02-06"
---
In diesem Abschnitt zeigen wir Ihnen, wie Sie eine Standardgruppe erstellen und Berechtigungen für die plusserver S3-Weboberfläche zuweisen können. Dies ermöglicht es den Benutzern in dieser Gruppe, auf alle Buckets zuzugreifen. 

Beachten Sie, dass die Sicherheitsempfehlung ist, dass Sie einen neuen Benutzer anlegen, der den Root-Benutzer ersetzt. Der Root-User sollte nur im Notfall benutzt werden.

### Schritt 1: Anmeldung auf der plusserver S3-Weboberfläche
{{< img src="images/image-1.png" alt="LoginScreen" >}}
1. Öffnen Sie Ihren Webbrowser und besuchen Sie die folgende Webseite: [https://s3-portal.psmanaged.com:9443/](https://s3-portal.psmanaged.com:9443/)
   
2. Verwenden Sie die Ihnen bereitgestellten Benutzerdaten (diese können sie im plusserver Kundenportal: [https://customerservice.plusserver.com/](https://customerservice.plusserver.com/) unter “Verträge und Abrechnung” → "S3 Vertrag auswählen" → "Zugangsdaten" → “Anmeldeinformationen anzeigen” finden), um sich anzumelden. Der Benutzername lautet "root". Bitte verwenden Sie das Ihnen bekannte Passwort. Hier finden Sie zudem die Account ID.

### Schritt 2: Erstellen einer Standardgruppe

1. Nach erfolgreicher Anmeldung klicken Sie auf der linken Seite unter "Access Management" auf "Groups".
   
2. Wählen Sie die Option "Create Group", um eine neue Gruppe zu erstellen.
   
3. Geben Sie einen Anzeigenamen und einen eindeutigen Namen für die Gruppe ein.
{{< img src="images/image-2.png" alt="GroupCreation" >}}

### Schritt 3: Festlegen von Rechten für die Gruppe

1. In den Gruppeneinstellungen können Sie die Berechtigungen für die Benutzer in dieser Gruppe festlegen. Bitte beachten Sie, dass diese Berechtigungen speziell für die plusserver S3-Weboberfläche gelten.
   
2. Weisen Sie der Gruppe die erforderlichen Berechtigungen zu, um auf die gewünschten Aktionen und Ressourcen zugreifen zu können. Hier können Sie die Berechtigungen auf Basis Ihrer Anforderungen anpassen.

{{% alert title="Warnung" color="warning"%}}
Bitte seien Sie vorsichtig beim Festlegen von Berechtigungen und stellen Sie sicher, dass Benutzer nur die erforderlichen Rechte erhalten, um die Sicherheit Ihrer Daten zu gewährleisten.
{{% /alert %}}

{{< img src="images/image-3.png" alt="TenantRights" >}}

### Schritt 4: Anwenden der Gruppenberechtigungen für die S3 Schnittstelle

- In diesem Beispiel verwenden wir den Punkt "Ransomware Mitigation". Dies ist eine Beispiel-Policy mit gewissen Rechten, welche als Grundlage dienen kann. Es ist wichtig zu betonen, dass diese Policy lediglich als Beispiel dient und Benutzern weitreichende Berechtigungen gewährt, welche ggf. nicht erwünscht sind.
- Im nächsten Schritt können Sie User dieser Gruppe hinzufügen. Da wir den User allerdings erst in Schritt 5 anlegen, klicken Sie hier auf "Create group".

Weitere Informationen zu den einzelnen AWS-Berechtigungen finden Sie in der offiziellen AWS-Dokumentation: [AWS User and role policy examples](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html).

{{% alert title="Warnung" color="warning"%}}
Die Beispiel-Policy gibt Benutzern umfassende Zugriffsrechte auf S3-Ressourcen. Bevor Sie diese Policy anwenden, stellen Sie bitte sicher, dass Sie die Rechte Ihrer Benutzer auf das Nötigste beschränken, um die Sicherheit und den Schutz Ihrer Daten zu gewährleisten.
{{% /alert %}}

Die Beispiel-Policy für Ransomware-Abwehr kann als Startpunkt dienen. Denken Sie daran, Berechtigungen gezielt zu vergeben und regelmäßig zu überprüfen, um die Integrität Ihrer Daten zu gewährleisten.

{{< img src="images/image-4.png" alt="GroupPolicy" >}}

### Schritt 5: Erstellen eines weiteren Users

1. Wählen Sie auf der linken Seite unter "Access Management" die Option "Users". Klicken Sie hier auf "Create user".
   
2. Geben Sie den vollen Namen des Benutzers in das entsprechende Feld ein.
   
3. Vergeben Sie einen gewünschten Benutzernamen, der später zur Anmeldung verwendet wird.
   
4. Setzen Sie ein sicheres Passwort für den Benutzer.
   
5. Lassen Sie die Option "Deny access" auf "No" eingestellt. (Diese Option ermöglicht es, den Zugriff eines Benutzers später zu verweigern, falls nötig.)
   
6. Klicken Sie auf "Continue", um fortzufahren.
{{< img src="images/image-5.png" alt="CreateUser" >}}
   
7. Auf der nächsten Eingabe-Maske können Sie die Gruppe auswählen, die Sie zuvor erstellt haben.
   
8. Durch die Zuweisung dieser Gruppe erhält der Benutzer automatisch die zuvor definierten Berechtigungen, die Sie für diese Gruppe festgelegt haben. Klicken Sie zum Abschließen auf "Create user".

{{< img src="images/image-6.png" alt="AddAnotherUser" >}}

### Schritt 6: Anmeldung des Benutzers

- Melden Sie sich entweder mit den Anmeldedaten des neu erstellten Benutzers an oder verwenden Sie den root-Benutzer, um den Benutzer zu bearbeiten.

### Schritt 7: Erzeugung eines Access Keys

- Nach erfolgreicher Anmeldung haben Sie die Möglichkeit, einen Access Key zu erzeugen.
- Ein Access Key ist eine Kombination aus einer Access Key ID und einem Secret Access Key. Diese Zugangsdaten benötigen Sie, um mit der AWS S3 Command Line Interface (CLI) oder anderen kompatiblen Tools auf Ihre Ressourcen zuzugreifen.
- Wählen Sie auf der linken Seite unter "Storage (S3)" die Option "My access keys".
- Klicken Sie nun auf den Button "Create Key", um einen neuen Access Key zu erstellen.
- Auf der ersten Maske haben Sie die Möglichkeit, einen Endpunkt (Ablaufzeitpunkt) für den Access Key festzulegen. Dies bedeutet, dass der Access Key nach Ablauf dieser Zeit ungültig wird. Alternativ können Sie ihn auf "unlimited" setzen, um die Gültigkeit nicht zu beschränken.
- Nach der Konfiguration werden Ihnen der Access Key und der Secret Access Key angezeigt. Der Secret Access Key wird nur einmalig angezeigt. Wir empfehlen dringend, den Secret Key sorgfältig abzuspeichern und vor unbefugtem Zugriff zu schützen.
- Alternativ können Sie auch die Möglichkeit nutzen, die Zugangsdaten als Download im CSV-Format herunterzuladen. Dadurch können Sie die Zugangsdaten speichern und verwalten.

{{% alert title="Achtung" color="warning" %}}
Bitte seien Sie äußerst vorsichtig im Umgang mit den Zugangsdaten, insbesondere dem Secret Access Key. Diese Schlüssel sind entscheidend für den Zugriff auf Ihre Ressourcen und sollten mit größter Sorgfalt behandelt werden. Mit diesem neuen Access Key können Sie nun reibungslos auf Ihre S3-Ressourcen zugreifen.
{{% /alert %}}