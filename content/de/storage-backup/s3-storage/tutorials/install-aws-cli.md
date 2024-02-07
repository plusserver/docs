---
title: "Installation der AWS S3 CLI"
linkTitle: "Installation der AWS S3 CLI"
type: "docs"
weight: 10
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