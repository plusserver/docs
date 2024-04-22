---
title: "Mehr Beispiele"
linkTitle: "Mehr Beispiele"
type: "docs"
weight: 3
date: 2023-02-21
description: >
   Beispiel Terraform Beschreibungen für einige Anwendungsfälle
---

## Einzelne Instanz ausrollen

In unserem Beispiel Terraform Repo finden sie eine Beispielbeschreibung für das deployen einer einzelnen Instanz.

[SOURCE](https://github.com/pluscloudopen/terraform-pco/tree/main/just-one-instance)

### Variablen

Bevor Sie Ihr "terraform apply" abfeuern, stellen Sie sicher, dass Sie die folgenden Variablen in variables.tf ändern oder ein *.tfvars anlegen und die Werte für sich setzen:

* keypair_name - ersetzen Sie diese durch den Namen Ihres Schlüsselpaares
* private_network_name - ersetzen Sie sie durch den Namen Ihres Projektnetzwerks

Optionale Änderungen:

* image (name) - der Name des Betriebssystem-Images, das Sie verwenden möchten
* flavor (name) - der Name des Flavors (Instanzgröße), den Sie verwenden möchten

## Einzelne Instanz mit *cloud-init*

In diesem Beispiel wird beschrieben wie eine Instanz mit der zuhilfenahme von cloud-init deployt werden kann.

[SOURCE](https://github.com/pluscloudopen/terraform-pco/tree/main/instance-using-cloud-init)

### Variablen

Bevor Sie Ihr "terraform apply" starten, stellen Sie sicher, dass Sie die folgenden Variablen in variables.tf ändern oder ein *.tfvars anlegen und die Werte für sich setzen:

* keypair_name - ersetzen Sie diese durch den Namen Ihres Schlüsselpaares
* private_network_name - ersetzen Sie diese durch den Namen Ihres Projektnetzwerks

Optionale Änderungen:

* image (name) - der Name des Betriebssystem-Images, das Sie verwenden möchten
* flavor (name) - der Name des Flavors (Instanzgröße), den Sie verwenden möchten

### cloud-init

Das Beispiel führt ein Update durch, installiert einen nginx-Webserver, ändert den Titel in der Standardseite und führt einen Neustart durch.

Weitere Informationen zur Verwendung von cloud-init finden Sie in den Beispielen in der offiziellen Dokumentation.

[cloud-init-Dokumentation: Beispiele für die Cloud-Konfiguration](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)

## Mehrere Instanzen hinter einem LB deployen

In diesem Beispiel deployen wir eine bestimmte Anzahl an Servern die mit ein Load Balancer Erreichbar gemacht werden.

[SOURCE](https://cloudinit.readthedocs.io/en/latest/reference/examples.html)

### Variablen

Bevor Sie Ihr "terraform apply" auslösen, stellen Sie sicher, dass Sie die folgenden Variablen in variables.tf ändern oder ein *.tfvars anlegen und die Werte für sich setzen:

* keypair_name - ersetzen Sie diese durch den Namen Ihres Schlüsselpaares
* private_network_name - ersetzen Sie diese durch den Namen Ihres Projektnetzwerks
* private_subnet_name - ersetzen Sie sie durch den Namen des Subnetzes in Ihrem Projektnetzwerk

Optionale Änderungen:

* image (name) - der Name des Betriebssystem-Images, das Sie verwenden möchten
* flavor (name) - der Name des Flavors (Instanzgröße), den Sie verwenden möchten
* server_count - die Anzahl der Webserver, die Sie erstellen möchten (Standard: 2)

Sie können die Variablen auch über cli ändern wie in:

terraform plan -var "server_count=5"

terraform apply -var "server_count=5"

### cloud-init

Das Beispiel führt ein Update durch, installiert einen nginx Webserver, ändert den Titel in der Standardseite und fügt den Hostnamen hinzu und führt einen Neustart durch. Es wird ein paar Augenblicke brauchen, bis es bereit ist, nachdem terraform eine erfolgreiche Installation gemeldet hat.
Weitere Lektüre

Weitere Informationen zur Verwendung von cloud-init finden Sie in den Beispielen in der offiziellen Dokumentation.

cloud-init-Dokumentation: Beispiele für die Cloud-Konfiguration
