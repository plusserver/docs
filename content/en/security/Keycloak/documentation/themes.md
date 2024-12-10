---
title: "Custom Themes"
linkTitle: "Custom Themes"
type: "docs"
---

Keycloak as a Service allows you to upload and use your own custom themes to modify the appearance of your login, account, admin consoles, and emails.

## Theme Types

There are four types of themes you can customize:

- **Login**: Customizes the login pages, including the landing page, OTP, registration, and forgot password pages.
- **Account**: Defines the look and feel of the account management console.
- **Admin**: Customizes the appearance of the admin console.
- **Email**: Alters the design of outgoing emails sent to users.

## Default Themes

Keycloak includes a few pre-built themes:

- **Base**: A minimal theme containing HTML templates and message bundles. Custom themes usually extend from this.
- **Keycloak**: The default theme with images and styles for Keycloak pages. This is used unless a custom theme is applied.

## Theme Structure

A theme typically includes:

- HTML templates (Freemarker templates)
- Images
- Message bundles (translations)
- Stylesheets (CSS)
- Scripts (JavaScript)
- Theme properties

### Extending Existing Themes

If you're creating a custom theme, you can extend an existing one (like the Base or Keycloak theme) instead of starting from scratch. This lets you override specific elements (e.g., templates, stylesheets) without recreating everything. However, keep in mind that when you upgrade Keycloak, custom templates may require updates to remain compatible.

## Uploading a Custom Theme

To upload your custom theme to Keycloak:

1. Create an archive of your theme folder using one of the following commands:

    ```bash
    zip -r mytheme.zip mytheme
    tar -czvf mytheme.tar.gz mytheme
    tar -cvf mytheme.tar mytheme
    ```

2. Open a [support ticket](https://customerservice.com/support/ticket-create) and attach the archive of your theme.

3. Once we upload the theme to your Keycloak as a Service instance, you can select it in the Keycloak web interface under the theme settings.

### Archive Requirements

- Must be in zip, tar, or tar.gz format.
- Must have the file extension `.zip`, `.tar`, or `.tar.gz`.
- Must contain a single parent folder.

<br>

>*We're working on a feature to let you directly upload custom keycloak themes in our customer portal. Until then we thank you for your patience as we improve our services.*
