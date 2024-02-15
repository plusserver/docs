---
title: "Installation der AWS S3 CLI"
linkTitle: "Installation der AWS S3 CLI"
type: "docs"
weight: 10
date: "2024-02-07"
---
In diesem Abschnitt werden wir Ihnen zeigen, wie Sie das AWS Command Line Interface (CLI) installieren können, um mit Ihrem plusserver S3-Konto zu interagieren. Beachten Sie bitte, dass die AWS CLI hier lediglich als Beispiel für den Einstieg dient. Jeder alternative S3-Client kann ebenfalls verwendet werden, um auf Ihre S3-Ressourcen zuzugreifen.

### Schritt 1: Überprüfen der Systemanforderungen

Bevor Sie mit der Installation beginnen, stellen Sie sicher, dass Ihr System die erforderlichen Voraussetzungen erfüllt:

- Betriebssystem: Der AWS CLI ist auf verschiedenen Betriebssystemen wie Windows, macOS und Linux verfügbar.

### Schritt 2: Installation des AWS CLI

Folgen Sie diesen Schritten, um das AWS CLI auf Ihrem System zu installieren:

#### Windows:

a. Besuchen Sie die offizielle AWS CLI Installationsseite: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

b. Klicken Sie auf den Link "AWS CLI installieren".

c. Befolgen Sie die Anweisungen im Installationsprogramm für Windows.

d. Öffnen Sie nach der Installation die Eingabeaufforderung und geben Sie den Befehl `aws --version` ein, um sicherzustellen, dass die Installation erfolgreich war.

#### macOS:

a. Öffnen Sie das Terminal.

b. Verwenden Sie den Paketmanager "Homebrew", um das AWS CLI zu installieren, indem Sie den Befehl `brew install awscli` eingeben.

c. Überprüfen Sie die Installation, indem Sie den Befehl `aws --version` ausführen.

#### Linux:

a. Öffnen Sie das Terminal.

b. Verwenden Sie den Paketmanager Ihrer Linux-Distribution, um das AWS CLI zu installieren. Für Debian/Ubuntu verwenden Sie `sudo apt-get install awscli`, für CentOS/RHEL verwenden Sie `sudo yum install awscli`.

c. Bestätigen Sie die Installation, indem Sie den Befehl `aws --version` eingeben.

{{% alert title="Info" %}}
Die genauen Befehle und Installationsschritte können sich je nach Betriebssystem und Version ändern. Stellen Sie sicher, dass Sie die offizielle Dokumentation von AWS oder des Paketmanagers verwenden.

Mehr Informationen finden Sie unter: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)
{{% /alert %}}

### Schritt 3: Konfiguration des AWS CLI

Nach der Installation müssen Sie die AWS CLI mit Ihren Zugangsdaten konfigurieren, um auf Ihr plusserver S3-Konto zuzugreifen:

- Öffnen Sie das Terminal oder die Eingabeaufforderung.
- Geben Sie den Befehl `aws configure` ein.
- Folgen Sie den Anweisungen, um Ihre Zugangsdaten einzugeben, einschließlich Access Key, Secret Access Key, Region (z.B. de-west-1 für Köln oder de-north-2 für Hamburg) und Ausgabeformat (z.B. json).
- Nach erfolgreicher Konfiguration können Sie das AWS CLI verwenden, um mit Ihrem plusserver S3-Konto zu interagieren.

Herzlichen Glückwunsch! Sie haben erfolgreich die AWS CLI installiert und konfiguriert, um mit Ihrem plusserver S3-Konto zu kommunizieren. Denken Sie daran, dass Sie jedes andere S3-kompatible Tool verwenden können, um auf Ihre plusserver-s3-Ressourcen zuzugreifen. In den folgenden Abschnitten werden wir Ihnen zeigen, wie Sie grundlegende Aktionen wie das Hochladen von Objekten ausführen können.


{{% alert title="Endpunkt Konfiguration" %}}

Die AWS CLI verwendet als Standard den Endpunkt "http://s3.amazonaws.com". Diesen können Sie ändern, indem Sie die Variable im Konfigurationsfile der AWS CLI anpassen. Je nach Betriebssystem befindet sich diese an einem anderen Ort (z.B. Windows: %USERPROFILES%\.aws\config sowie das credential File).

**Beispielkonfiguration**

Datei: config
```bash
[profile plusservers3]
region = de-west-1
endpoint_url = https://s3.de-west-1.psmanaged.com
```
Datei: credentials
```bash
[plusservers3]
aws_access_key_id = <accesskey>
aws_secret_access_key = <secretkey>
```
Andere S3 CLIs haben ebenfalls Konfigurationsdateien, die entsprechend angepasst werden können.
{{% /alert %}}
