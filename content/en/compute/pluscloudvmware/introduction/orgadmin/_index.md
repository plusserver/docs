---
title: "Organization Administration"
linkTitle: "Administration"
type: "docs"
weight: 20
date: 2024-11-25
description: >
  User and permission management, administration, and settings at the organizational level
---

## Managing Access

In the `Administration` menu, you can access an overview of users, groups, and account settings.

Here, you can add users to your organization and manage their permissions (roles).

### Users

{{< screenshot src="img/user-overview.png" title="User Overview" >}}
In the Access Control section, you will find the subsections Users, Groups, and Roles.

Through the `Users` tab and the `New` button, you can add additional users for logging into vCloud Director.
{{< /screenshot >}}

{{< screenshot src="img/user-create-dialog.png" title="Create User" >}}
This dialog allows you to create a new user.

User data is stored in the {{< abbr "vCD" "vCloud Director" >}} database, making it a `local user`.
{{< /screenshot >}}

The following parameters can be configured:

| Parameter                   | Description                                                                                                         |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------|
| Username                    | Login username                                                                                                      |
| Password                    | Login password                                                                                                      |
| Confirm Password            | Repeat the password to avoid typos                                                                                  |
| Enable                      | Activate or deactivate the user account upon creation. Only active users can log in successfully.                   |
| Available Roles             | Assign user permissions using a predefined role                                                                     |
| Full Name                   | Full name of the user (optional)                                                                                    |
| Email Address               | Email address of the user (optional)                                                                                |
| Phone Number                | Phone number of the user (optional)                                                                                 |

### Groups

In `Groups`, you can define groupings for users. This is intended for imported groups from an {{< abbr "IdP" "Identity Provider" >}}.

### Roles

Predefined roles are available under the `Roles` section. A role always includes a set of permissions for a user or group.

{{< screenshot src="img/roles-overview.png" title="Roles Overview" >}}
Using the `New` button, you can create additional custom roles that can be assigned to new users.
{{< /screenshot >}}

{{< screenshot src="img/role-create-dialog" title="New Role" >}}
Permissions can be customized individually for each menu item.
{{< /screenshot >}}

## Sharing Instances

With users configured as `vApp Users`, access to individual vApps or VMs can be restricted.

Create a user to share the {{< abbr "VM" "Virtual Machine" >}} with, or ensure that the user already exists.

{{< screenshot src="img/vmpermission-select-orgvdc.png" title="Select OrgVDC" >}}
Select the desired {{< abbr "OrgVDC" "Organization Virtual Datacenter" >}}.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-select-vm.png" title="Select VM" >}}
Choose the desired {{< abbr "VM" "Virtual Machine" >}}.
{{< /screenshot >}}

{{< screenshot src="img/vmpermission-share-dialog.png" title="Configure Sharing" >}}
Navigate to the `Sharing` page in the {{< abbr "VM" "Virtual Machine" >}} details view and click on `Edit`.
{{< /screenshot >}}

This procedure works similarly for sharing with a group or sharing a vApp.

## Guest Customization

In the Administration section under Guest Customization, you can configure a global domain join for Windows {{< abbr "VM" "Virtual Machine" >}}s for the entire organization, removing the need to configure this individually for each {{< abbr "VM" "Virtual Machine" >}}.

{{< screenshot src="img/guestcustomization-overview.png" title="View Guest Customization" >}}
Select the `Guest Customization` option in the administration area and click `Edit`.
{{< /screenshot >}}

{{< screenshot src="img/guestcustomization-dialog.png" title="Edit Guest Customization" >}}
In the dialog that opens, you can enter the necessary credentials for a domain join.
{{< /screenshot >}}

## Policies

As an organization administrator, you can configure policies and settings for the organization. These influence the behavior and capacity of the entire organization.

{{< screenshot src="img/policies.png" title="View and Configure Policies" >}}
In the `Policies` section of the Administration area, you can configure defaults and limits for your organization.
{{< /screenshot >}}

The following parameters can be adjusted:

* vApp Leases
  * Maximum Runtime Lease: Set the default expiration time (in hours or days) for a vApp before the expiration action is executed. By default, the setting is `Never Expires`.
  * Runtime Expiration Action: Define the action to take upon expiration, such as `Suspend` or `Power Off`. Note: Only running {{< abbr "VM" "Virtual Machine" >}}s incur compute costs.
  * Maximum Storage Lease: Set the expiration time for storage used by powered-off vApps (disks). Actions can include moving or permanently deleting storage. Default: `Never Expires`.
  * Clean Up Storage: Options include `Move Storage` or `Delete`.
* vApp Template Lease
  * Maximum Storage Lease: Default is `Never Expires`. You can define hours or days before the expiration action is executed.
  * Clean Up Storage: Options include `Move Storage` or `Delete`.
* Default Quotas
  * Quota for all {{< abbr "VM" "Virtual Machine" >}}s: Limit the number of {{< abbr "VM" "Virtual Machine" >}}s that can be created.
  * Quota for running {{< abbr "VM" "Virtual Machine" >}}s: Limit the number of running {{< abbr "VM" "Virtual Machine" >}}s.
* Password Policies
  * Account Lockout: Enable or disable account lockout to protect against unauthorized access attempts.
  * Invalid Login Attempts Before Lockout: Set the number of failed login attempts allowed before the user is locked out.
  * Lockout Interval: Define the duration of the lockout before the account is automatically unlocked.
