---
title: "User Management"
linkTitle: "User Management"
type: "docs"
weight: 13
description: >
  Information about User Management in CloudHub
---

## Overview

## Where to find it?

![Select User Management in the sidebar](../img/user-management/u0.5.png)

The functionality can be found in the CloudHub sidebar, under the "User Management" section.

## Roles

### Role Overview

![Role Overview](../img/user-management/u1.png)

Here you can see an overview of all created roles and whether the specific role controls which pages someone can view ("Page Management"), which contracts the role has access to ("Contract Management"), or what actions the role can perform in the Product Dashboard.

Under "Actions," you can delete roles or open the edit dialog.

### Add Roles

Clicking "Add New Role" opens a menu. Here, settings for the corresponding role can be configured.

![Select Roles tab in User Management](../img/user-management/ue3.png)

![Select Create Role](../img/user-management/ue4.png)

Here you can add permissions.

![Select checkboxes and save](../img/user-management/ue5.png)

![Role overview is displayed](../img/user-management/ue6.png)

Three sections are important:

- Role Name: This label will also appear in the overview.
- The checkboxes for "Page Management", "Product Management", and "Product Dashboard Management"
- The respective configuration options for each section:
  - Page Management: Shows a sidebar-like structure with an overview of pages and subpages (expandable). Strikethrough categories indicate options that are not available.
  - Contract Management: Shows basic information about the existing contracts and lets you select which are visible to the role.
  - Product Dashboard Management: Shows basic product actions, and lets you select which are available to the role.

After clicking "Save Role", you'll return to the overview page, where the newly created role will be listed.

### Edit Roles

You can, of course, also edit existing roles.

![Select Edit button](../img/user-management/ue7.png)

Depending on the management area, you can reconfigure the respective options. The role name can also be changed.

You cannot change the management area a role applies to. If needed, you must create a new role with the desired name and area.

### Delete Roles

Clicking the trash icon on the overview page will open a confirmation dialog asking you to confirm that the role should be deleted.

![Select Delete button](../img/user-management/ue7.5.png)

## Users

### User Overview

![Select Users tab](../img/user-management/ue8.png)

Here you can see which users have been created. Alongside the unique identifier (email address), their assigned roles are also listed.

Just like in the Role Management section, you can "Edit", "Delete", and perform "Actions" here.

### Add Users

Clicking "Invite User" opens a dialog that asks for the user's email address and the desired roles (as defined in the previous step).

![Enter email and assign roles](../img/user-management/ue10.png)

### Edit Users

By clicking the edit icon from the user overview page, you'll reach a screen where assigned roles can be modified.

![Select user](../img/user-management/ue11.png)

![Select roles](../img/user-management/ue12.png)

To understand the full set of permissions granted by the selected roles, a second tab offers a read-only view showing which pages will be visible.

![View permission overview](../img/user-management/ue13.png)

### Delete Users

Just like with deleting roles, users can also be deleted. To prevent accidental deletion, you’ll be asked to type a confirmation word.

![Confirm deletion](../img/user-management/ue14.png)