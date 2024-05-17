---
title: "Temporary URLs"
type: "docs"
weight: 60
date: 2024-05-17
description: >
  Using Temporary URLs aka TempURL
---


## Overview

An other object storage feature is the creation of temporary URLs. This is useful if you want to grant access to objects which are stored in a private container. This feature is called temporary URL or sometimes TempURL.

For getting this to work you need a swift command-line client. At the time of writing this is not possible with the regular openstack client.

{{% alert title="Note" color="warning" %}}
As we are using Ceph Rados GW as swift implementation please note that we only support setting temporary URL keys at the account level and not at the container level!
{{% /alert %}}


### using your native Openstack Account

you can use your normal Openstack user to create temporary URLs or use an self created application credential. The second option is described later on this page.

#### Setting a shared secret

First you need to define a shared secret (URL_KEY) with some tool, eg. with pwgen:
```bash
$ URL_KEY=`pwgen 32 1`
```

Now set the URL_KEY on account level. With our swift implementation it is not possible to connected the URL_KEY to a certain container or object!:
```bash
$ swift post -m Temp-Url-Key:${URL_KEY}
```

You can check if the URL_KEY has been set correctly with:
```bash
$ swift stat

[...]
Account: AUTH_mieshie0roo5euGh5Waecier1pheuTaf
Meta Temp-Url-Key: Ohphach4Phih3OhpieP7ohBajooth5va
[...]
```

#### Creating the temporary URL:

you need to request the temporary URL and define a time, the URL should be valid:
```bash
$ swift tempurl GET 3600 /v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt $URL_KEY --digest sha1

/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469
```

The respond is the right part of the temporary URL. The left part has to be added to get the complete temporary URL. The left part is the base URL of the region's endpoint:
```bash
#LEFT_PART plus RIGHT_PART:
https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469
```

#### accessing the object
now you can access the object with that URL for example via curl:
```bash
$ curl 'https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=a6379958b77a31a729ec50d52b51b661e4637d4c&temp_url_expires=1715935469'

hello world
```

### using an application credential

It is of course also possible to use an application credential for creating the temporary URLs. In that case first create a credential:
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

### setting the URL_KEY
with the swift command line client you can set the credential like this:
```bash
$ swift --os-auth-url https://prod1.api.pco.get-cloud.io:5000/v3 --os-auth-type v3applicationcredential --os-application-credential-id be171a346dd1461fa322adfa916e3410 --os-application-credential-secret ezKSI0ArxwlV_tpjTwTnigyemRV6fBcLiySJffnndRbJBy4D65JADHUMh3og9ErhLw2q35xzP4h-nE83SdWijQ post -m "Temp-Url-Key:${URL_KEY}"
```

### creating the temporary URL with application credential:
```bash
$ swift --os-auth-url https://prod1.api.pco.get-cloud.io:5000/v3 --os-auth-type v3applicationcredential --os-application-credential-id be171a346dd1461fa322adfa916e3410 --os-application-credential-secret ezKSI0ArxwlV_tpjTwTnigyemRV6fBcLiySJffnndRbJBy4D65JADHUMh3og9ErhLw2q35xzP4h-nE83SdWijQ tempurl GET 600 /v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt $URL_KEY --digest sha1

/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=fbdc538b9f7bad904752399114ff6af70797f2c0&temp_url_expires=1715932839
```

### Access an object which's URL was created with application credential
The access of the object eg with curl can be done in the same way as when you do not use an application credential, just combine the base path with the url from the last command:
```bash
$ curl 'https://prod1.api.pco.get-cloud.io:8080/swift/v1/AUTH_mieshie0roo5euGh5Waecier1pheuTaf/tmpurltest/hello.txt?temp_url_sig=fbdc538b9f7bad904752399114ff6af70797f2c0&temp_url_expires=1715932839'

hello world
```
