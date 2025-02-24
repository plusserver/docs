---
title: "Hochladen von Objekten auf S3 mit Object Lock"
linkTitle: "Object Lock in S3"
type: "docs"
weight: 50
date: "2024-02-07"
---

Das Hochladen von Objekten auf plusserver S3 mit aktiviertem Object Lock ermöglicht eine erweiterte Sicherheitskontrolle. Hier sind die Schritte, um Objekte mit Object Lock auf Ihre Buckets hochzuladen.

{{% alert title="Hinweis" %}}
Stellen Sie sicher, dass das entsprechende Bucket sowohl Versionierung als auch Object Lock aktiviert hat, um diese Funktion nutzen zu können.
{{% /alert %}}

{{% alert title="Unterschied zwischen Compliance und Governance Object Lock" color="warning" %}}

Der plusserver S3 Service bietet zwei Modi des Object Lock-Features: Compliance und Governance. Beide Modi dienen dazu, die Unveränderlichkeit von Objekten sicherzustellen, jedoch mit unterschiedlichen Ebenen der Durchsetzung und Möglichkeiten für Benutzeraktionen.

#### Compliance Object Lock

- Objekte im Compliance-Modus können nicht gelöscht oder verändert werden, solange die Retention aktiv ist.
- Einmal gesperrte Objekte können während der festgelegten Retention nicht gelöscht oder verändert werden.
- Benutzer können Compliance-gesperrte Objekte nicht selbstständig löschen, wodurch eine zusätzliche Schutzebene für kritische Daten gewährleistet wird.

#### Governance Object Lock

- Objekte im Governance-Modus können nicht gelöscht oder verändert werden, solange die Retention aktiv ist.
- Im Governance-Modus können bestimmte Benutzeraktionen durchgeführt werden, die normalerweise nicht im Compliance-Modus erlaubt sind.
- Benutzer mit den erforderlichen Berechtigungen können gesperrte Objekte im Governance-Modus löschen, aber es bleibt eine Audit-Trail von solchen Aktionen erhalten.

#### Folgende Rechte stehen im Zusammenhang mit dem Governance Object Lock

- `s3:BypassGovernanceRetention`: Um die Governance-Retention für ein gesperrtes Objekt zu umgehen.
- `s3:DeleteObjectVersion`: Um ein gesperrtes Objekt im Governance-Modus zu löschen.
- `s3:DeleteObjectVersionTagging`: Um Tagging-Informationen einer Version eines gesperrten Objekts zu löschen.
- `s3:PutObjectLegalHold`: Um ein Rechtsbewahrungsschloss auf eine bestimmte Version eines gesperrten Objekts anzuwenden.
- `s3:PutObjectRetention`: Um die Retention für eine bestimmte Version eines gesperrten Objekts festzulegen.

Bitte beachten Sie, dass diese Berechtigungen mächtige Aktionen ermöglichen, die die Integrität und Unveränderlichkeit von Daten beeinflussen können. Sie sollten diese Berechtigungen mit Vorsicht vergeben und sicherstellen, dass nur vertrauenswürdige Benutzer Zugriff darauf haben. Weiterhin sollten Sie mit Ihren Datenschutzbeauftragten sprechen und ggfl. weitere Sicherheiten wie "Multiadmin-Verification" verwenden, um zu vermeiden, dass eine einzelne Person Löschrechte erhält.

Es ist ratsam, Ihre Berechtigungsstruktur sorgfältig zu planen und sicherzustellen, dass Benutzer nur die Berechtigungen erhalten, die sie wirklich benötigen, um sicherheitsrelevante Aktionen auszuführen. Greifen Sie hier gerne auf die [Dokumentation von AWS S3](https://docs.aws.amazon.com/s3/) zurück.

### 1. Hinweis

Es ist wichtig zu beachten, dass sowohl Compliance- als auch Governance-Object Lock die Integrität und Unveränderlichkeit von Daten sicherstellen. Die Wahl zwischen den Modi hängt von den spezifischen Anforderungen und dem Grad der Durchsetzung ab, den Sie für Ihre Daten benötigen. Bevor Sie sich für einen Modus entscheiden, ist es ratsam, die Bedürfnisse Ihrer Organisation und die gewünschte Schutzebene zu berücksichtigen.

### 2. Hinweis

Solange mindestens ein gelocktes Objekt sich innerhalb eines Buckets befindet, kann das Bucket nicht gelöscht werden.

**Auch eine Kündigung des plusserver S3 Vertrages ist nicht möglich, solange sich noch gelockte Objekte in dem Kundenaccount befinden. Dieser muss solange weitergeführt werden, bis sämtliche Retention-Locks ausgelaufen sind und/oder die Objekte vom Kunden im Governance Mode gelöscht wurden.**
{{% /alert %}}

## Schritt 1: Hochladen eines Objekts mit Governance-Modus

Verwenden Sie den Befehl `aws s3api put-object`, um ein Objekt mit Object Lock im Governance-Modus hochzuladen:

```bash
aws s3api put-object --bucket <bucketname> --key <ziel-dateipfad> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url> --object-lock-mode GOVERNANCE --object-lock-retain-until-date <zeitstempel>
```

- Ersetzen Sie \<bucketname>: Geben Sie den Namen des Buckets ein, in den Sie das Objekt hochladen möchten.
- Ersetzen Sie \<ziel-dateipfad>: Geben Sie den Pfad und den Namen an, unter dem das hochgeladene Objekt im Bucket gespeichert werden soll.
- Ersetzen Sie \<lokaler-dateipfad>: Geben Sie den Pfad und den Namen der lokalen Datei an, die hochgeladen werden soll.
- Ersetzen Sie \<endpoint-url>: Geben Sie den entsprechenden Endpunkt für Ihren plusserver S3 an.
- Ersetzen Sie \<zeitstempel>: Geben Sie das Datum und die Uhrzeit an, bis zu der das Objekt im Governance-Modus gesperrt sein soll. Format YYYY-MM-DDTHH:MM:SSZ (Y = Jahr, M = Monat, D = Tag, H = Stunde, M = Minute, S = Sekunde)

**Beispiel:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /pfad/zu/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode GOVERNANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"
```

## Schritt 2: Hochladen eines Objekts mit Compliance-Modus

Verwenden Sie den gleichen Befehl mit "COMPLIANCE", um ein Objekt mit Compliance-Modus hochzuladen:

```bash
aws s3api put-object --bucket <bucketname> --key <ziel-dateipfad> --body <lokaler-dateipfad> --endpoint-url=https://<endpoint-url> --object-lock-mode COMPLIANCE --object-lock-retain-until-date <zeitstempel>
```

- Ersetzen Sie \<bucketname>: Geben Sie den Namen des Buckets ein, in den Sie das Objekt hochladen möchten.
- Ersetzen Sie \<ziel-dateipfad>: Geben Sie den Pfad und den Namen an, unter dem das hochgeladene Objekt im Bucket gespeichert werden soll.
- Ersetzen Sie \<lokaler-dateipfad>: Geben Sie den Pfad und den Namen der lokalen Datei an, die hochgeladen werden soll.
- Ersetzen Sie \<endpoint-url>: Geben Sie den entsprechenden Endpunkt für Ihren plusserver S3 an.
- Ersetzen Sie \<zeitstempel>: Geben Sie das Datum und die Uhrzeit an, bis zu der das Objekt im Governance-Modus gesperrt sein soll. Format YYYY-MM-DDTHH:MM:SSZ (Y = Jahr, M = Monat, D = Tag, H = Stunde, M = Minute, S = Sekunde)

**Beispiel:**

```bash
aws s3api put-object --bucket mylockedbucket --key folder/meinobjekt.pdf --body /pfad/zu/meinobjekt.pdf --endpoint-url=https://s3.de-west-1.psmanaged.com --object-lock-mode COMPLIANCE --object-lock-retain-until-date "2023-08-11T14:35:59Z"
```

## Schritt 3: Anzeigen und Überprüfen der gesperrten Objekte

Verwenden Sie den Befehl aws s3api get-object-retention, um Informationen zur Object Lock-Retention eines Objekts anzuzeigen:

```bash
aws s3api get-object-retention --bucket <bucketname> --key <ziel-dateipfad> --endpoint-url=https://<endpoint>
```

- Ersetzen Sie \<bucketname>: Geben Sie den Namen Ihres Buckets an.
- Ersetzen Sie \<ziel-dateipfad>: Geben Sie den Pfad und Namen des gesperrten Objekts an.
- Ersetzen Sie \<endpoint>: Geben Sie den Endpunkt für Ihren plusserver S3 Service an.

Beispiel-Ausgaben für Compliance- und Governance-Modus:

**Compliance-Modus:**

```json
{
    "Retention":
    {
        "Mode": "COMPLIANCE",
        "RetainUntilDate": "2023-08-11T15:45:59+00:00"
    }
}
```

**Governance-Modus:**

```json
{
    "Retention":
    {
        "Mode": "GOVERNANCE",
        "RetainUntilDate": "2023-08-11T15:45:59+00:00"
    }
}

```
