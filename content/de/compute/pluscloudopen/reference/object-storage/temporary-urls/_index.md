---
title: "Temporary URLs"
type: "docs"
weight: 60
date: 2024-05-17
description: >
  Verwendung von Temporary URLs aka TempURL
---


## Übersicht

Eine weitere Funktion des Object Storage ist die Erstellung temporärer URLs. Dies ist nützlich, wenn Sie Zugriff auf Objekte gewähren möchten, die in einem privaten Container gespeichert sind. Diese Funktion wird temporary URL oder manchmal auch TempURL genannt.

Um diese Funktion zu verwenden ist ein swift Kommandozeilen Client notwendig. Zum Zeitpunkt der Erstellung dieser Dokumentation sind noch nicht alle notwendigen Funktionen im regulären Openstack Client verfügbar.

{{% alert title="Note" color="warning" %}}
Da wir Ceph Rados GW als swift Implementation Verwenden sei an dieser Stelle darauf hingewiesen, dass das Erzeugen von TempURLs nur auf Kontolevel möglich ist, nicht aber auf Objekt oder Container level!
{{% /alert %}}


### Verwendung mit nativem Openstack Account

Es kann der normale Openstack Benutzer verwendet werden, um TempURLs zu erstellen, oder auch selbst angelegte application credentials. Die zweite Möglichkeit ist weiter unten auf dieser Seite beschrieben.

#### Setzen des TempURL Schlüssels

Zunächst muss ein Schlüssel definiert werden, beispielsweise mit einem Tool wie 'pwgen':
```bash
$ URL_KEY=`pwgen 32 1`
```

Nun muss der URL_KEY auf Bneutzer level gesetzt werden. Mit unserer swift Implementation ist es nicht möglich, diesen auf Container oder Objekt Lebvel zu setzen:
```bash
$ swift post -m Temp-Url-Key:${URL_KEY}
```

Um nachzuprüfen, ob der Schlüssel korrekt gesetzt wurden, kann man diesen Abrufen:
```bash
$ swift stat

[...]
Account: AUTH_mieshie0roo5euGh5Waecier1pheuTaf
Meta Temp-Url-Key: Ohphach4Phih3OhpieP7ohBajooth5va
[...]
```

#### Erzeugen der temporären URL

Die temporäre URL wird mit dem swift client erzeugt, weiterhin muss eine Zeit in Sekunden angegegen werden, welche dann die Gültigkeit der erzeugten URL definiert:
```bash
$ swift tempurl GET 3600 /v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt $URL_KEY --digest sha1

/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469
```

Die Ausgabe stellt den rechten Teil der temporären URL dar, der linke Teil muss dann noch hinzugefügt werden. Dieser stellt die Basis URL des swift Endpunktes der Region dar:
```bash
https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469
```

#### Zugriff auf das Objekt
Jetzt kann das Objekt abgerufen werden, beispielsweise mit 'curl':
```bash
$ curl 'https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469'

hello world
```

### Benutzung mit Application Credential

Es ist natürlich auch möglich, ein selber erstelltes Application Credential für die Erzeugung der TempURLs zu verweden. In diesem Fall muss das Application Credential zunächst Erzeugt werden, sofern noch keines vorhanden ist:
```bash
$ openstack application credential create my-app-credential

+--------------+----------------------------------------------------------------------------------------+
| Field        | Value                                                                                  |
+--------------+----------------------------------------------------------------------------------------+
| description  | None                                                                                   |
| expires_at   | None                                                                                   |
| id           | be171a346dd1461fa322adfa916e3410                                                       |
| name         | my-app-credential                                                                      |
| project_id   | mieshie0roo5euGh5Waecier1pheuTaf                                                       |
| roles        | member creator reader heat_stack_owner load-balancer_member                            |
| secret       | ezKSI0ArxwlV_tpjTwTnigyemRV6fBcLiySJffnndRbJBy4D65JADHUMh3og9ErhLw2q35xzP4h-nE83SdWijQ |
| system       | None                                                                                   |
| unrestricted | False                                                                                  |
| user_id      | 555b622c891d4af2ba84438afe1e74f7                                                       |
+--------------+----------------------------------------------------------------------------------------+
```

### Setzen des TempURL Schlüssels
Mit dem swift Kommandozeilen Client kann nun der Schlüssel gesetzt werden:
```bash
$ swift --os-auth-url https://prod1.api.pco.get-cloud.io:5000/v3 --os-auth-type v3applicationcredential --os-application-credential-id be171a346dd1461fa322adfa916e3410 --os-application-credential-secret ezKSI0ArxwlV_tpjTwTnigyemRV6fBcLiySJffnndRbJBy4D65JADHUMh3og9ErhLw2q35xzP4h-nE83SdWijQ post -m "Temp-Url-Key:${URL_KEY}"
```

### Erzeugen der temporären URL
```bash
$ swift --os-auth-url https://prod1.api.pco.get-cloud.io:5000/v3 --os-auth-type v3applicationcredential --os-application-credential-id be171a346dd1461fa322adfa916e3410 --os-application-credential-secret ezKSI0ArxwlV_tpjTwTnigyemRV6fBcLiySJffnndRbJBy4D65JADHUMh3og9ErhLw2q35xzP4h-nE83SdWijQ tempurl GET 600 /v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt $URL_KEY --digest sha1

/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=fbdc538b9f7bad904752399114ff6af70797f2c0&temp_url_expires=1715932839
```

### Zugriff auf das Objekt
Der Zugriff auf das Objekt geschieht dann genau wie bei der ersten Methode, beispielsweise per curl:
```bash
$ curl 'https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=fbdc538b9f7bad904752399114ff6af70797f2c0&temp_url_expires=1715932839'

hello world
```
