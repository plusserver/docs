---
title: "Pluscloud VMware 2FA with Keycloak + OpenID Connect"
linkTitle: "Pluscloud VMware 2FA with Keycloak + OpenID Connect"
type: "docs"
weight: 40
---
### Schritt 1: Preparation

* First you need to [book your Keycloak instance](/en/security/keycloak/tutorials/ordering/)
* and log in to the web interface with your [Admin user access data](/en/security/keycloak/tutorials/retrieve_login_credentials/).
* To do this, call up **https://*<DNS-Name_of_your_IAM-Keycloak_Server>*/** in the address field of your Internet browser, e.g: *<https://node-65e84464310368a571551616.ps-xaas.io>*

### Step 2: Keycloak

Using the access data previously received in CloudHub, log into the Keycloak under **"Administration Console"** and click on **"Create realm"** in the dropdown in the top left-hand corner.

![create realm 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_realm_1.png)

Under **"Realm name"** we enter e.g. **"vcd"** and confirm with **"Create"**.

![create realm 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_realm_2.png)

The realm (top left) is then automatically changed to the newly created realm, in this example with the name **"vcd"**.

![change realm](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_change_realm_3.png)

Go to **"Clients"** in the menu and click **"Create client"**.

![create client 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_4.png)

Select **"OpenID Connect"**, Client ID is in our example. **"de11gupor"**, which for the test is the name of the region plus the PCV tenant.

![create client 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_5.png)

Press **"Next"** and activate **"Client authentication"**.

![create client 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_6.png)

### Step 3: pluscloud vmware

Now we jump in a parallel tab or browser window to (our example) PCV de-11 -> Administration -> OIDC and copy the link to the **"Redirect URI for Client Configuration/Client Configuration Redirect URI"**.

![oidc connect 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_7.png)

### Step 4: Keycloak

Back in the Keycloak tab/window, we now press **"Next"** and fill **"Valid redirect URIs"** with the previously received **"Redirect URI for client configuration/Client Configuration Redirect URI"** for our test tenant, which we then confirm with **"Save"**.

![create client 4](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_client_8.png)

### Step 5: pluscloud vmware

Now switch back to the browser/tab of the PCV, in the test case the de-11 and click on **"Configure"** in the lower centre of the main window

![oidc connect 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_9.png)

The following entries are made there. Where this information can be obtained can be found below:

![oidc connect 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_10.png)

Client ID: **"de11gupor"** (or corresponding entry from the previous step)
Secret client key: (can be found in Keycloak > Clients > **"de11gupor"** > Credentials > Client Secret)

![oidc connect 4](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_11.png)

Known IDP configuration endpoint: (can be found in Keycloak > Realm settings > Endpoints > Copy link from **"OpenID Endpoint Configuration"**)

![openid endpoint configuration](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_endpoint_12.png)

Confirm with continue to **"4. Claims Mapping"** and change the subject to **"email"**!

![claims mapping](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_configure_13.png)

and confirm with **"Next"**.

Set automatic key configuration to 2 days with the strategy **"Add"** and finish with **"Save"**.

![key configuration](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_oidc_configure_14.png)

### Step 6: Keycloak

Switch back to Keycloak and create a user there:
To do this, go to **"Users"** and press the **"Add user"** button

![create user 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_add_user_15.png)

All fields must be filled in accordingly:

![create user 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_create_user_16.png)

Then press **"Create"**.

Select the **"Credentials"** tab and click on **"Set password"**.

Define a password:
![create user 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_set_password_17.png)

Confirm with **"Save"**.

Activate 2FA for the realm:
Also click on **"Authentication"** in the menu in Keycloak.

![activate 2fa 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_authentication_18.png)

There go to **"browser"**. This is conveniently the default flow for the clients. There, **"Browser - Conditional OTP"** should be set from Conditional to **"Required"**.

![activate 2fa 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_authentication_details_19.png)

### Step 7: pluscloud vmware

Switch to PCV (in this test case) de-11 under Administration > Users > Import users:

![import user 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_show_user_20.png)

Enter the e-mail address of the previously created user and assign a role. Once you have made your entries, close the dialogue with **"Save"**.

![import user 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_import_users_21.png)

* Source: OIDC
* Enter user: <user.name@domain.de>
* Assign role: Organisation Adminsitrator

### Step 8: Test login

Open a private tab in the browser (to avoid **"contamination"** by existing session cookies) and call up the vcd URL again, in this particular test case: <https://de-11.vcd.get-/tenant/gupor>

![test login 1](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_22.png)

Now click on the **"Login/Sign In..."** button and log in with the previously created and imported user.

![test login 2](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_23.png)

If you have done everything correctly beforehand, the browser will now ask you to set up a second factor. You can do this with your favourite Google Authenticator-compatible app.

![test login 3](/images/content/04-msl/en/iam_keycloak/pluscloud_vmware_2fa_tutorial/keycloak_login_test_24.png)

If you were now able to log in to the VCenter with the previously created user, the Keycloak setup was successful.
