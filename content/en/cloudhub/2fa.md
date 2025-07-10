---
title: "2-factor authentication in CloudHub"
linkTitle: "2FA in CloudHub"
type: "docs"
weight: 1
description: >
    Information about 2-factor authentication in CloudHub
---

## Where to find it?
Two-factor authentication (2FA) is available in CloudHub under Settings. This can be accessed by clicking on your email address in the top right-hand corner of the top bar and then selecting the Settings menu item. The two-factor authentication (2FA) option can be found under the Password & Security section.

![2FA location](../img/2fa/2fa-location.png)

## 2-factor authentication step by step

### Step 1: Settings

![2-factor authentication in the cloudhub settings](../img/2fa/2fa-settings-1.png)\
You can now set up your 2-factor authentication in the settings.

### Step 2: Via the link to Keycloak

![Link to Keycloak](../img/2fa/2fa-settings-2.png)\
The ‘Set up 2FA’ link takes you to the [Keycloak page](https://idm.psmanaged.com/realms/plusIDM/account/#/security/signingin)

![Image of the Keycloak page](../img/2fa/2fa-keycloak-page.png)\

On the [Keycloak page](https://idm.psmanaged.com/realms/plusIDM/account/#/security/signingin), 2-factor authentication can be found as the second section under Basic authentication’ in the 'Signing in' area.

On the right is the link to ‘Set up Authenticator application’, where you will find further step-by-step instructions and the actual setup of 2FA.

### Step 3: Erneut einloggen

![CloudHub Login](../img/2fa/2fa-cloudhub-login-1.png)\
After clicking on ‘Set up Authentificator application’, you must log in again.

### Step 4: 2-FA einrichten

![Step-by-step guide to configuring multiple authentication](../img/2fa/2fa-instruction-1.png)\
After successfully logging in, you will be taken to a step-by-step guide from Keycloak on how to set up the 2-FA.

**The following three steps must be carried out:**

1. Install one of the following applications on your mobile:
    - Microsoft Authenticator
    - FreeOTP
    - Google Authenticator
2. Open the application and scan the barcode.
3. Enter the one-time code provided by the application and click Submit to finish the setup. Provide a Device Name to help you manage your OTP devices.
