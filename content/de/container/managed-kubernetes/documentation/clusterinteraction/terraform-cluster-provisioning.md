---
title: "PSKE - Cluster-Provisionierung mit Terraform"
linkTitle: "Cluster-Provisionierung mit Terraform"
type: "docs"
weight: 10
date: 2023-10-20
---

# Kubectl-Provider

Der Terraform Kubectl Provider ermöglicht das Provisioning von Kubernetes-Clustern innerhalb der PSKE (Gardener) mit Terraform.

## Benötigte Komponenten und Zugänge

Folgendes wird benötigt:

- Zugriffstoken auf das PSKE (Gardener) Dashboard
- lokal installierter Terraform Client (https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- der kubectl Terraform Provider, der später von Terraform selbständig installiert wird (https://github.com/gavinbunney/terraform-provider-kubectl)

## Terraform-Vorbereitung und Provider-Einrichtung

Zunächst wird ein leeres Arbeitsverzeichnis für den Test erstellt oder das Repository geklont und in dessen Verzeichnis gewechselt.

Je nachdem, ob ein leeres Verzeichnis angelegt wurde oder das Repository verwendet wird, wird eine "versions.tf" erstellt, die Folgendes enthält:

```terraform
terraform {
  required_version = ">= 0.13"

  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
  }
}
```

Hier wird definiert, welcher Provider in welcher Version benötigt wird und vom Terraform-Tool beim folgenden "terraform init" automatisch bezogen werden soll.

Grundsätzlich ist der Name "versions.tf" völlig beliebig, man kann die Datei nennen wie man will, nur die Endung .tf ist wichtig, da Terraform beim Ausführen alle *.tf Dateien im aktuellen Verzeichnis sucht und ausführt. Es ist aber sinnvoll, die Datei nach einem geeigneten Schema zu benennen, damit Sie den Inhalt nachvollziehen können.

## Erstellen der PSKE-Gardener-Konfiguration

Im nächsten Schritt erstellen wir eine "gardener.tf" (wie gesagt, der Name selbst spielt keine Rolle, solange die Datei eine .tf-Endung hat), in der wir am Anfang den folgenden Block definieren:

```terraform
provider "kubectl" {
  config_path    = "PATH/KUBECONFIGFILENAME"
}
```

Hier wird festgelegt, dass wir den Terraform-Anbieter "kubectl" verwenden wollen, den wir zuvor in der versions.tf angegeben haben. Darüber hinaus müssen wir den Pfad zur kubeconfig für das PSKE/Gardener-Service-Konto angeben, das die Berechtigung zum Erstellen und Löschen von Clustern hat.

Dazu loggt man sich in das entsprechende PSKE-Dashboard ein, in diesem Fall https://dashboard.prod.gardener.get-cloud.io.

Dort klickt man links auf "Members" und sucht dann den Service-Account des Projekts, in meinem konkreten Fall wäre das MA-24, der auch die Rolle "Service Account Manager" hat, und lädt von dort die kubeconfig-Datei herunter.

Diese Datei muss dann in der zuvor erstellten versions.tf entsprechend referenziert werden. In diesem einfachen Beispiel würde das bei mir so aussehen:

```terraform
provider "kubectl" {
  config_path    = "~/Downloads/kubeconfig-2.yaml"
}
```

Dadurch wird sichergestellt, dass der kubectl-Provider über die notwendige Konfiguration verfügt, um sich mit der PSKE zu verbinden und die entsprechenden Aktionen auszuführen.

## Definition des Kubernetes-Clusters

Nachdem wir Terraform eingerichtet und den kubectl-Provider so konfiguriert haben, dass er mit der PSKE kommunizieren kann, kommen wir zum eigentlichen Punkt der Provisionierung eines Kubernetes-Clusters.

Zu diesem Zweck erstellen wir beispielsweise eine cluster.tf, die im Wesentlichen folgenden Inhalt haben muss:

```terraform
resource "kubectl_manifest" "NAMEOFRESOURCE" {
    yaml_body = <<YAML
<HERE WE PUT THE ACTUAL CONFIG>
YAML
}
```

NAMEOFRESOURCE ist nur für Terraform relevant und spiegelt nicht den Namen des eigentlichen Clusters wieder, aber es ist sinnvoll, sie zu benennen, damit sie später in einer wachsenden Konfiguration wieder zugewiesen werden können.

Dies dient dazu, die gewünschte Konfiguration im YAML-Format an die Gardener-API zu übergeben, was Sie natürlich komplett von Hand schreiben können, aber auch das Dashboard für Sie erledigen lassen können.

Dazu durchlaufen Sie im Wesentlichen den Prozess der Einrichtung eines Kubernetes-Clusters mit dem entsprechenden PSKE-Dashboard, konfigurieren den Cluster nach Ihren Wünschen mit allen erforderlichen Einstellungen, einschließlich der Anzahl und Größe der Worker Nodes, Wartungs- und Ruhephasenpläne usw. Starten Sie am Ende nicht die eigentliche Erstellung, sondern klicken Sie in der oberen Leiste neben "Übersicht" auf "YAML". Dort erhalten Sie dann die komplette Definition der gewünschten Konfiguration im YAML-Format.

Kopieren Sie nun diese Konfiguration und fügen Sie sie in die cluster.tf anstelle von `<HERE WE PUT THE ACTUAL CONFIG>` ein, d.h. zwischen die beiden Zeilen mit YAML.

In meinem Beispiel würde das so aussehen, aber wie Sie aus den Metadaten ersehen können, muss dies für die Umgebung, in der es laufen soll, entsprechend angepasst werden. Daher ist es besser, einen eigenen Auszug zu verwenden.

```terraform
resource "kubectl_manifest" "tf_test_shoot" {
    yaml_body = <<YAML
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  namespace: garden-ma-24
  name: terraform-test
spec:
  provider:
    type: openstack
    infrastructureConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/16
      floatingPoolName: ext01
    controlPlaneConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerProvider: amphora
    workers:
      - name: k8sworker
        minimum: 1
        maximum: 2
        maxSurge: 1
        machine:
          type: SCS-2V:4:100
          image:
            name: ubuntu
            version: 22.4.2
          architecture: amd64
        zones:
          - nova
        cri:
          name: containerd
        volume:
          size: 50Gi
  networking:
    nodes: 10.250.0.0/16
    type: cilium
  cloudProfileName: pluscloudopen-hire
  secretBindingName: my-openstack-secret
  region: RegionOne
  purpose: evaluation
  kubernetes:
    version: 1.27.5
    enableStaticTokenKubeconfig: false
  addons:
    kubernetesDashboard:
      enabled: false
    nginxIngress:
      enabled: false
  maintenance:
    timeWindow:
      begin: 010000+0200
      end: 020000+0200
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
  hibernation:
    schedules:
      - start: 00 17 * * 1,2,3,4,5
        location: Europe/Berlin
  controlPlane:
    highAvailability:
      failureTolerance:
        type: node
YAML
}
```

Hinweis: Wenn Sie den Cluster nur mit Terraform erstellen, aber nicht wieder mit Terraform löschen wollen, dann müssen Sie nichts weiter an der Definition anpassen. Soll Terraform jedoch später in der Lage sein, den erstellten Cluster mit einem "terraform destroy" zu löschen, dann ist hier folgende Anpassung notwendig:

```terraform
metadata:
  namespace: garden-ma-24
  name: terraform-test
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

Daher müssen Sie die folgende Anmerkung hinzufügen:

```terraform
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

Wichtig, achten Sie auf die Einrückung, es ist YAML!!!

## Erstellung des Kubernetes-Clusters

Wenn man alles oben entsprechend gemacht hat, kommen wir nun zur eigentlichen Erstellung des Clusters.

Wir wechseln mit unserer Shell in das Arbeitsverzeichnis, in dem wir die versions.tf, cluster.tf und gardener.tf erstellt haben und initialisieren zunächst Terraform und lassen es den kubectl Provider installieren:

```bash
terraform init
```

Die Ausgabe hier sollte in etwa so aussehen:

```bash
Initializing the backend...

Initializing provider plugins...
- Finding gavinbunney/kubectl versions matching ">= 1.7.0"...
- Installing gavinbunney/kubectl v1.14.0...
- Installed gavinbunney/kubectl v1.14.0 (self-signed, key ID AD64217B5ADD572F)

Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

Als Nächstes erstellen Sie einen "Terraform-Plan", der sich die zuvor erstellten .tf-Konfigurationen ansieht und prüft, ob sie in Ordnung sind, ob er alles weiß und ob Sie irgendwelche Syntaxfehler gemacht haben.

```bash
terraform plan
```

In meinem Beispielfall sollte die Ausgabe etwa so aussehen:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be created
  + resource "kubectl_manifest" "tf_test_shoot" {
      + api_version             = "core.gardener.cloud/v1beta1"
      + apply_only              = false
      + force_conflicts         = false
      + force_new               = false
      + id                      = (known after apply)
      + kind                    = "Shoot"
      + live_manifest_incluster = (sensitive value)
      + live_uid                = (known after apply)
      + name                    = "terraform-test"
      + namespace               = "garden-ma-24"
      + server_side_apply       = false
      + uid                     = (known after apply)
      + validate_schema         = true
      + wait_for_rollout        = true
      + yaml_body               = (sensitive value)
      + yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT
      + yaml_incluster          = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

Wenn alles soweit passt, dann sollte er sagen, dass er hier eine Ressource (den Kubernetes-Cluster) mit den vorher definierten Werten erstellen möchte.

Wenn Sie damit einverstanden sind, können Sie dies mit "terraform apply" tun. Es zeigt Ihnen dann alles an, was es tun würde, und verlangt von Ihnen, dass Sie "ja" sagen, damit es es tatsächlich tun kann. Sie können diese Abfrage vermeiden, indem Sie ein "-auto-approve" an den Befehl anhängen, aber Sie sollten sich wirklich sicher sein, dass Sie das auch wirklich wollen.

```bash
terraform apply
```

In meinem Fall würde das folgendermaßen aussehen:

```bash
Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be created
  + resource "kubectl_manifest" "tf_test_shoot" {
      + api_version             = "core.gardener.cloud/v1beta1"
      + apply_only              = false
      + force_conflicts         = false
      + force_new               = false
      + id                      = (known after apply)
      + kind                    = "Shoot"
      + live_manifest_incluster = (sensitive value)
      + live_uid                = (known after apply)
      + name                    = "terraform-test"
      + namespace               = "garden-ma-24"
      + server_side_apply       = false
      + uid                     = (known after apply)
      + validate_schema         = true
      + wait_for_rollout        = true
      + yaml_body               = (sensitive value)
      + yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT
      + yaml_incluster          = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

kubectl_manifest.tf_test_shoot: Creating...
kubectl_manifest.tf_test_shoot: Creation complete after 2s [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Wenn hier keine Fehler angezeigt werden, hat das System mit der Erstellung des Clusters begonnen. Sie können nun zum PSKE-Dashboard gehen und den Status verfolgen, bis die Erstellung stattgefunden hat.

## Änderungen am Kubernetes-Cluster

Wenn Sie Änderungen am Kubernetes-Cluster vornehmen möchten, müssen Sie die Definition, die wir zuvor in "cluster.tf" vorgenommen haben, anpassen.

Nehmen wir an, dass wir die Anzahl der Worker Nodes anpassen wollen, zum Beispiel von

```terrform
    workers:
      - name: k8sworker
        minimum: 2
        maximum: 3
        maxSurge: 1
```

zu

```terrform
    workers:
      - name: k8sworker
        minimum: 2
        maximum: 3
        maxSurge: 1
```

Nachdem Sie die obige Änderung vorgenommen haben, können Sie mit "terraform plan" prüfen, ob die Syntax korrekt ist, und mit "terraform apply" die oben definierte Änderung durchführen lassen.

Es ist wichtig, daran zu denken, dass nur weil die Syntax korrekt ist, dies nicht bedeutet, dass sie nicht während eines "apply" fehlschlagen kann. Dies kann mehrere Gründe haben, zum Beispiel:

1. Gewünschte Ressourcen übersteigen die im Cluster verfügbaren. Es wird also mehr CPU, RAM, etc. benötigt. Der Plan wird in diesem Fall ausgeführt, aber Gardener wird irgendwann während der Ausführung einen Fehler produzieren, weil die Ressourcen erschöpft sind.

2. Sie definieren etwas, das es nicht gibt, z.B. unter Maschine/Typ, wobei wir in unserem Beispiel den Typ "SCS-2V:4:100" gewählt haben. Wenn Sie hier einen Maschinentyp angeben, der in diesem Formular nicht vorgesehen ist, z.B. "SCS-1V:2:100", d.h. 1 VCPU-Kern und 2GB RAM, dann wird bei "plan" alles als OK angezeigt, aber ein "apply" liefert einen Fehler:

```bash
.workers[0].machine.type: Unsupported value: "SCS-1V:2:100": supported values: "SCS-16V:32:100", "SCS-16V:64:100", "SCS-2V:16:50", "SCS-2V:4:100", "SCS-2V:8:100", "SCS-4V:16:100", "SCS-4V:32:100", "SCS-4V:8:100", "SCS-8V:16:100", "SCS-8V:32:100", "SCS-8V:8:100"]
```

Es gibt viele weitere Gründe, warum ein Plan nicht ausgeführt werden kann, aber diese werden in der Regel durch eine relativ eindeutige Fehlermeldung erklärt.

## Löschung des Kubernetes-Clusters

Wenn Sie den Cluster über Terraform wieder löschen wollen, müssen Sie, wie oben erwähnt, vor der Erstellung der Konfiguration den folgenden Block hinzufügen:

```terraform
  annotations:
    confirmation.gardener.cloud/deletion: "true"
```

Wenn Sie dies getan haben, können Sie nun Terraform verwenden, um den zuvor erstellten Cluster mit einem "terraform destroy" zu löschen. Auch hier ist eine Bestätigung durch Eingabe von "yes" erforderlich, was natürlich durch Anhängen von "-auto-approve" vermieden werden kann. Aber wie immer sollten Sie sich vergewissern, dass es das ist, was Sie wollen und dass Sie es auf die richtige Umgebung anwenden.

```bash
terraform destroy
```

In meinem Fall sieht es so aus:
<>
```bash
kubectl_manifest.tf_test_shoot: Refreshing state... [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  # kubectl_manifest.tf_test_shoot will be destroyed
  - resource "kubectl_manifest" "tf_test_shoot" {
      - api_version             = "core.gardener.cloud/v1beta1" -> null
      - apply_only              = false -> null
      - force_conflicts         = false -> null
      - force_new               = false -> null
      - id                      = "/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test" -> null
      - kind                    = "Shoot" -> null
      - live_manifest_incluster = (sensitive value)
      - live_uid                = "42edffa5-dacd-4c23-a879-a8034b175f7c" -> null
      - name                    = "terraform-test" -> null
      - namespace               = "garden-ma-24" -> null
      - server_side_apply       = false -> null
      - uid                     = "42edffa5-dacd-4c23-a879-a8034b175f7c" -> null
      - validate_schema         = true -> null
      - wait_for_rollout        = true -> null
      - yaml_body               = (sensitive value)
      - yaml_body_parsed        = <<-EOT
            apiVersion: core.gardener.cloud/v1beta1
            kind: Shoot
            metadata:
              annotations:
                confirmation.gardener.cloud/deletion: "true"
              name: terraform-test
              namespace: garden-ma-24
            spec:
              addons:
                kubernetesDashboard:
                  enabled: false
                nginxIngress:
                  enabled: false
              cloudProfileName: pluscloudopen-hire
              controlPlane:
                highAvailability:
                  failureTolerance:
                    type: node
              hibernation:
                schedules:
                - location: Europe/Berlin
                  start: 00 17 * * 1,2,3,4,5
              kubernetes:
                enableStaticTokenKubeconfig: false
                version: 1.27.5
              maintenance:
                autoUpdate:
                  kubernetesVersion: true
                  machineImageVersion: true
                timeWindow:
                  begin: 010000+0200
                  end: 020000+0200
              networking:
                nodes: 10.250.0.0/16
                type: cilium
              provider:
                controlPlaneConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  kind: ControlPlaneConfig
                  loadBalancerProvider: amphora
                infrastructureConfig:
                  apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
                  floatingPoolName: ext01
                  kind: InfrastructureConfig
                  networks:
                    workers: 10.250.0.0/16
                type: openstack
                workers:
                - cri:
                    name: containerd
                  machine:
                    architecture: amd64
                    image:
                      name: ubuntu
                      version: 22.4.2
                    type: SCS-2V:4:100
                  maxSurge: 1
                  maximum: 2
                  minimum: 1
                  name: k8sworker
                  volume:
                    size: 50Gi
                  zones:
                  - nova
              purpose: evaluation
              region: RegionOne
              secretBindingName: my-openstack-secret
        EOT -> null
      - yaml_incluster          = (sensitive value)
    }

Plan: 0 to add, 0 to change, 1 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

kubectl_manifest.tf_test_shoot: Destroying... [id=/apis/core.gardener.cloud/v1beta1/namespaces/garden-ma-24/shoots/terraform-test]
kubectl_manifest.tf_test_shoot: Destruction complete after 1s

Destroy complete! Resources: 1 destroyed.
```

Wenn er auch hier keine Fehler meldet und am Ende sagt, dass er 1 Ressource zerstört hat, dann können Sie wieder zum PSKE-Dashboard wechseln und den Löschvorgang beobachten.
