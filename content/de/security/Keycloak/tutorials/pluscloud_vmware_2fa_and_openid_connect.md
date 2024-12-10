---
title: "Pluscloud VMware 2FA mit Keycloak + OpenID Connect"
linkTitle: "Pluscloud VMware 2FA mit Keycloak + OpenID Connect"
type: "docs"
weight: 40
---
### Schritt 1: Vorbereitung

* Zuerst müssen Sie Ihre [Keycloak-Instanz buchen](/de/security/keycloak/tutorials/ordering/)
* und sich mit mit Ihren [Admin-User-Zugangsdaten](/de/security/keycloak/tutorials/retrieve_login_credentials/) auf der Weboberfläche anmelden.
* Rufen Sie dafür im Adressfeld Ihres Internet-Browsers **<https://*<DNS-Name_Ihres_IAM-Keycloak_Servers>*/** auf, z.B.: **<https://node-65e84464310368a571551616.ps-xaas.io/>**

### Schritt 2: Keycloak

Mit den zuvor im CloudHub erhaltenen Zugangsdaten loggt man sich nun In den Keycloak ein unter **"Administration Console"**  und oben links im Dropdown auf **"Create realm"** klicken.

![create realm 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_realm_1.png)

Unter **"Realm name"** tragen wir z.B. **"vcd"** ein und bestätigen mit **"Create"**.

![create realm 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_realm_2.png)

Daraufhin wird automatisch der Realm (oben links) auf den neu angelegten Realm, in diesem Beispiel mit dem Namen **"vcd"** gewechselt.

![change realm](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_change_realm_3.png)

Im Menü auf **"Clients"** gehen und **"Create client"** klicken.

![create client 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_4.png)

**"OpenID Connect"** auswählen, Client ID ist in unserem Beispiel. **"de11gupor"**, was für den Test der Name der Region zuzüglich des PCV Tenants ist.

![create client 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_5.png)

**"Next"** drücken und **"Client authentication"** aktivieren.

![create client 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_6.png)

### Schritt 3: pluscloud vmware

Jetzt springen wir in einem parallelen Tab oder Browserfenster in (unserem Beispiel) die PCV de-11 -> Administration -> OIDC und kopieren dort den Link zur **"Umleitungs-URI für Client-Konfiguration/Client Configuration Redirect URI"**.

![oidc connect 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_7.png)

### Schritt 4: Keycloak

Wieder zurück in dem Keycloak Tab/Fenster, drücken wir nun auf **"Next"** und füllen **"Valid redirect URIs"** mit der zuvor erhaltenen **"Umleitungs-URI für Client-Konfiguration/Client Configuration Redirect URI"** für unseren Test-Tenant, was wir danach mit **"Save"** bestätigen.

![create client 4](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_8.png)

### Schritt 5: pluscloud vmware

Nun wechselt man wieder in den Browser/Tab der PCV, in dem Testfall die  de-11 und klickt dort auf **"Konfigurieren/Configure"** in der unteren Mitte des Hauptfenster

![oidc connect 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_9.png)

Dort werden die folgenden Eingaben gemacht. Woher diese Informationen jeweils bezogen werden können, sind darunter zu finden:

![oidc connect 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_10.png)

Client-ID: **"de11gupor"** (bzw. entsprechende Angabe vom vorherigen Schritt)
Geheimer Clientschlüssel: (zu finden im Keycloak > Clients > **"de11gupor"** > Credentials > Client Secret)

![oidc connect 4](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_11.png)

Bekannter IDP-Konfigurations-Endpoint: (zu finden im Keycloak > Realm settings > Endpoints > Link von **"OpenID Endpoint Configuration"** kopieren)

![openid endpoint configuration](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_endpoint_12.png)

Mit weiter bestätigen bis **"4. Beanspruchungszuordnung/Claims Mapping"** und dort Betreff/Subject auf **"email"** ändern!

![claims mapping](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_configure_13.png)

und mit **"Weiter/Next"** bestätigen.

Automatische Schlüsselkonfiguration auf 2 Tage mit der Strategie **"Hinzufügen/Add"** stellen und mit **"Speichern/Save"** beenden.

![key configuration](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_configure_14.png)

### Schritt 6: Keycloak

Zurück zu Keycloak wechseln und dort einen User anlegen:
Dazu auf **"Users"** gehen und den **"Add user"** Button drücken

![create user 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_add_user_15.png)

Dort müssen alle Felder entsprechend ausgefüllt werden:

![create user 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_user_16.png)

Dann **"Create"** drücken.

Reiter **"Credentials"** auswählen und auf **"Set password"** klicken.

Ein Password definieren:
![create user 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_set_password_17.png)

Mit **"Save"** bestätigen.

2FA aktivieren für den Realm:
Ebenfalls in Keycloak im Menü auf **"Authentication"** klicken.

![activate 2fa 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_authentication_18.png)

Dort auf **"browser"** gehen. Dieser ist praktischerweise der Standard Flow für die Clients. Dort müsste **"Browser - Conditional OTP"** von Conditional auf **"Required"** gestellt werden.

![activate 2fa 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_authentication_details_19.png)

### Schritt 7: pluscloud vmware

Zur PCV (in diesem Testfall) de-11 wechseln unter Administration > Benutzer > Benutzer importieren:

![import user 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_show_user_20.png)

Dort die E-Mail-Adresse des zuvor erstellten Benutzer angeben und eine Rolle zuweisen. Nach erfolgter Eingabe mit **"Speichern/Save"** den Dialog schließen.

![import user 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_import_users_21.png)

* Quelle: OIDC
* Benutzer eingeben: "<user.name@domain.de>"
* Rolle zuweisen: Organization Adminsitrator

### Schritt 8: Login testen

Im Browser einen privaten Tab öffnen (um entsprechende **"Verunreinigung"** durch vorhandene Session-Cookies zu vermeiden) und die vcd-URL neu aufrufen, in diesem speziellen Testfall.: <https://de-11.vcd.get-/tenant/gupor>

![test login 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_22.png)

Hier nun auf den **"Anmelden/Sign In..."** Knopf klicken und sich mit dem - zuvor erstellten und importierten Benutzer - anmelden.

![test login 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_23.png)

Hat man zuvor alles richtig gemacht, fordert einem nun der Browser auf, einen zweiten Faktor einzurichten. Dies kann man mit der bevorzugten Google Authenticator-kompatiblen App machen.

![test login 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_24.png)

Wenn Sie nun in der Lage waren, sich bei dem VCenter mit dem zuvor angelegten Benutzer anzumelden, war die Einrichtung von Keycloak erfolgreich.
