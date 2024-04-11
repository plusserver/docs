---
#https://gohugo.io/content-management/page-bundles/
title: "Backend für Terraform Statefiles"
type: "docs"
weight: 2
date: 2023-03-14
description: >
  Verwalten Sie Ihre Infrastruktur "als Code" (IaC) mit Hashicorp Terraform und nutzen Sie OpenStack Object Storage als Backend für die Terraform Statefiles.
---

## Generelles zu den Terraform Backends

Ein Backend definiert, wo Terraform seine Zustandsdaten speichert.

Terraform verwendet persistente Zustandsdaten, um den Überblick über die verwalteten Ressourcen zu behalten. Die meisten nicht-trivialen Terraform-Konfigurationen sind entweder in die Terraform Cloud integriert oder verwenden ein Backend, um den Status dezentral zu speichern. Dadurch können mehrere Personen auf die Zustandsdaten zugreifen und gemeinsam an dieser Sammlung von Infrastrukturressourcen arbeiten.

[Ausführlich Dokumentation zu den Terraform Backends](https://developer.hashicorp.com/terraform/language/settings/backends/configuration)

In der pluscloud open bietet sich für diese Zustandasdateien der Integrierte Objekt Speicher an. In den folgenden Schritten wird erklärt wie dieser als Backend eingebunden werden kann.

## Vorraussetzungen

Um den Objekt Storage nutzen zu können brauchen wir einen container bzw. bucket in der s3 Sprache, den s3 Endpunkt und die Zugangsdaten.

### Zugangsdaten

Um Ihre S3-Zugangsdaten zu erhalten, müssen Sie Ihren [OpenStackClient korrekt konfigurieren](/de/compute/pluscloudopen/introduction/environments/#anmeldeinformationen-für-cli-tools). Wenn das erledigt ist, können Sie folgenden Befehl eingeben:

```bash
$ openstack ec2 credentials create
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| Field      | Value                                                                                                                                               |
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
| access     | 5aen4quuuQu8ci7aoceeyaek8oodohgh                                                                                                                    |
| links      | {'self': 'https://prod1.api.pco.get-cloud.io:5000/v3/users/poashohhe9eo8EeQuez3ochaeWaeBoiR/credentials/OS-EC2/5aen4quuuQu8ci7aoceeyaek8oodohgh'}   |
| project_id | Eine8Jai4hohzieShoo1iem0yai7fair                                                                                                                    |
| secret     | iek1aechaequa8pheitahNgeizai3eig                                                                                                                    |
| trust_id   | None                                                                                                                                                |
| user_id    | poashohhe9eo8EeQuez3ochaeWaeBoiR                                                                                                                    |
+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------+
```

Ihre Anmeldedaten sehen natürlich anders aus (die oben gezeigten sind verfremdet). Für den S3-Zugang sind nur die Werte "access" und "secret" relevant. 

### Erstellen eines Buckets

Wenn Sie Ihre S3-Zugangsdaten bereit haben, müssen Sie einen Speicherort für Ihre Daten erstellen. In der S3-Sprache wird dieser Ort als "Bucket" bezeichnet. Sie können einen Bucket entweder über die Web-UI (Horizon) oder über die Befehlszeile erstellen.

#### Horizon/UI

Wenn Sie in der Web-UI (Horizon) eingeloggt sind, können Sie im linken Menü zu "Object Store" navigieren und dann auf "Containers" (so werden die Buckets in Horizon genannt) klicken: ![Screenshot des Container Menüs in Horizon](./container2.png). 
Klicken Sie auf die Schaltfläche "+Container" und geben Sie einen Namen für Ihren neuen Container ein. Wählen Sie eine Speicherrichtlinie und legen Sie fest, ob Ihr neuer Bucket öffentlich oder nur privat zugänglich sein soll (in den meisten Fällen privat). Klicken Sie auf "Erstellen", um den neuen Bucket zu erstellen. 

![Screenshot des Container Erstellungsdialogs in Horizon](./container1.png)

Der Bucket sollte sofort in der Container-Liste erscheinen:

![Screenshot des Container-Detailbildschirms in Horizon](./container3.png)

#### Openstack CLI

```bash
$ openstack container create <bucketname>
```

#### AWS CLI

Um einen Bucket in Ihrem Object Storage von der Kommandozeile aus zu erstellen, können Sie das Tool AWS CLI verwenden, das in einer virtuellen Python-Umgebung installiert sein sollte:

```bash
$ → python3 -m venv awscli
$ → . ./awscli/bin/activate
$ → pip3 install awscli
Collecting awscli
  Using cached awscli-1.27.93-py3-none-any.whl (4.0 MB)
Collecting botocore==1.29.93
[...]
Installing collected packages: urllib3, jmespath, six, python-dateutil, botocore, colorama, docutils, s3transfer, pyasn1, rsa, PyYAML, awscli
Successfully installed PyYAML-5.4.1 awscli-1.27.93 botocore-1.29.93 colorama-0.4.4 docutils-0.16 jmespath-1.0.1 pyasn1-0.4.8 python-dateutil-2.8.2 rsa-4.7.2 s3transfer-0.6.0 six-1.16.0 urllib3-1.26.15 
````

Mit dieser Konfiguration können Sie nun Ihren Bucket über die CLI erstellen: 

```bash
(awscli) $ → aws configure --profile=prod1
AWS Access Key ID [None]: 5aen4quuuQu8ci7aoceeyaek8oodohgh
AWS Secret Access Key [Keine]: iek1aechaequa8pheitahNgeizai3eig
Default region name [None]: 
Default output format [None]: 
(awscli) → $
```

Mit dieser Konfiguration können Sie nun Ihren Bucket über cli erstellen:

```bash
(awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api create-bucket --bucket mytfstate
```

Hashicorp empfiehlt, die Versionierung für den Bucket zu aktivieren, um versionierte Kopien Ihrer terraform.tfstate-Datei zu erstellen. Sie können die Versionierung für Ihren Bucket wie folgt aktivieren:

```bash
(awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api put-bucket-versioning --bucket mytfstate --versioning-configuration 
(awscli) $ → aws --profile=prod1 --endpoint=https://prod1.api.pco.get-cloud.io:8080 s3api get-bucket-versioning --bucket mytfstate 
{
"Status": "Enabled",
"MFADelete": "Disabled"
}
```

## Einrichtung Terraform: Bucket als Backend für tfstate

Als erstes exportieren Sie nun Ihren Zugangsschlüssel und Ihren geheimen Schlüssel als Umgebungsvariablen (AWS_ACCESS_KEY_ID bzw. AWS_SECRET_ACCESS_KEY), um zu verhindern, dass diese auf Ihrer lokalen Festplatte gespeichert werden.

    export AWS_ACCESS_KEY_ID='5aen4quuuQu8ci7aoceeyaek8oodohgh'
    export AWS_SECRET_ACCESS_KEY='iek1aechaequa8pheitahNgeizai3eig'

Da sich nun ein Bucket im Object Storage befindet und die Zugangsdaten von Terraform genutzt werden können, kann Terraform so konfiguriert werden, dass es diesen als Backend für den Terraform-Status verwendet.
Bitte fügen Sie diesen Teil der Backend-Konfiguration in Ihren terraform-Code ein: 

```go
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
      version = ">= 1.54.1"
    }
  }
  required_version = ">= 0.13"
  
  backend "s3" {
      bucket = "mytfstate"
      key = "terraform.tfstate"
      region = "us-east-1" 
      endpoint = "prod1.api.pco.get-cloud.io:8080"
      skip_credentials_validation = true
      skip_region_validation = true
      skip_metadata_api_check     = true
      force_path_style = true
  }

}
```

Wenn sie zum Beispiel meherere Ugebungen haben (dev,stage,live) empfiehlt es sich für jede Umgebung ein eigenes state file zu verwalten. Das können sie in dem sie die Konfiguration des Statefiles auslagern um es dann beim initialisieren zu definieren.
Dazu leeren sie die Konfiguration des Backends:

```go
terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
      version = ">= 1.54.1"
    }
  }
  required_version = ">= 0.13"
  
  backend "s3" {}

}
```

In ihrem Arbeitsverzeichnis legen sie nun ein Unterverzeichnis an (hier ``env`` genannt) und speichern darin unterschiedliche Konfigurationen des Backends in unterschiedlichen Dateien.

    env
    ├── backend_s3_dev.tfbackend
    ├── backend_s3_stage.tfbackend
    └── backend_s3_prod.tfbackend

backend_s3_dev.tfbackend:
```go
key                         = "dev/terraform.tfstate"
bucket                      = "mytfstate"
region                      = "us-east-1"
endpoint                    = "https://prod3.api.pco.get-cloud.io:8080"
skip_region_validation      = true
skip_credentials_validation = true
skip_metadata_api_check     = true
force_path_style            = true
```
backend_s3_stage.tfbackend:
```go
key                         = "stage/terraform.tfstate"
bucket                      = "mytfstate"
region                      = "us-east-1"
endpoint                    = "https://prod3.api.pco.get-cloud.io:8080"
skip_region_validation      = true
skip_credentials_validation = true
skip_metadata_api_check     = true
force_path_style            = true
```

Mit den exportierten Anmeldeinformationen können Sie nun Terraform wie folgt initialisieren:

Beispiel für die integrierte Backend Konfiguration

```bash
$ tform → terraform init

Initializing the backend...

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.

...
$ tform → 
```

Beispiel für die externe Backend Konfiguration

```bash
$ tform → terraform init -backend-config="env/backend_s3_dev.tfbackend"

Initializing the backend...

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.

...
$ tform → 
```