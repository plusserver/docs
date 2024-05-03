---
title: "Getting Started"
linkTitle: "Getting Started"
type: "docs"
weight: 30
---

### Log in to the web interface to use the IAM - Keycloak service

You can log in to the web interface of your *IAM - Keycloak* instance with [admin user credentials](/en/identity-access-management/keycloak/tutorials/retrieve_login_credentials/#login-details). The connection is SSL/TLS secured, just call **https://*<DNS-Name_of_IAM-Keycloak_Server>*/** in the address field of your Internet browser, e.g.: *https://node-65e84464310368a571551616.ps-xaas.io*

![WebUI](/images/content/04-msl/en/iam_keycloak/web_ui/01_connect_webui.png)

#### WebUI Login

Click on the *Administration Console* button and enter your login details in the login window.

![WebUI-Login](/images/content/04-msl/en/iam_keycloak/web_ui/02_webui_login01.png)

This takes you to the master realm, where you can create the other realms.

![WebUI-MasreRealm01](/images/content/04-msl/de/iam_keycloak/web_ui/03_master01.png)

{{% alert title="Important!" %}}
Master Realm is created automatically, you should **ONLY** create and manage the other Realms here.
{{% /alert %}}

#### Working with Realms

We have created a first realm for you that has the same name as your customer name, e.g. *"kd500986"*.
You can get to this realm if you click on the "master" button at the top left and select the appropriate realm (the function for creating new realms is also available under this button).

![WebUI-ChooseRealm01](/images/content/04-msl/en/iam_keycloak/web_ui/04_choose_realm01.png)

Here you can change the settings of the realm, create users and groups or configure external authentication providers and federations.

![WebUI-CustomerRealm01](/images/content/04-msl/en/iam_keycloak/web_ui/05_customer_realm01.png)

### Further documentation

You can find more information and up-to-date [documentation](https://www.keycloak.org/docs/latest/server_admin/index.html) on the project's official website [Keycloak Projekts](https://www.keycloak.org/).
