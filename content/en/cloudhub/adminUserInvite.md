---
title: "Admin user can invite further users by e-mail"
linkTitle: "Admin user can invite further users by e-mail"
type: "docs"
weight: 2
description: >
    Information on inviting additional users by e-mail
---

## Where to find it?
The function for inviting additional users by email can be found in the CloudHub sidebar under User management. There, an admin user can add new users by email using the Invite user button.

![User Management location](../img/admin-user-invite/usr-mngmt-location.png)

## Invitation from the admin's perspective

### Invitation process

1. Admin goes to the "User Management" page
2. Admin clicks on the button "Invite User"\
![User Management button "Create new user"](../img/admin-user-invite/usr-mngmt-new-user.png)
3. Admin sees a pop-up screen where he can enter the e-mail address of the user he wants to invite. (Email Address = mandatory field).
4. The roles can now also be assigned directly in this pop-up screen (one and several).
    1. However, the rolls must be created beforehand.
    2. We have also added notes to "Delete role" and "Edit role" that this can have an effect on open invitations.
5. The admin confirms the sending of the e-mail invitation via the "Send invitation" button (a loading screen appears)
![Pop-up window Invite new user - Send invitation](../img/admin-user-invite/pop-up-invite-new-user-3.png)
6. Once the invitation has been successfully sent, the user can either invite another user directly from here, go to the list of all invitations or simply close the window.
![Pop-up window Invite new user - Invitation sent successfully](../img/admin-user-invite/pop-up-invite-new-user-4.png)

Safety precautions:

- The invitations are limited to 50 invitations per admin per day
- The link in the invitation email is only valid for 1 day

As soon as the invitation has been successfully accepted, the added user appears in the User Management table.

### Further functions for the admin in the invitation context

1. In the "Invitations" table within the "User Management" area, the admin receives an overview of all sent invitations and their status ("Pending"/"Expired") and can manage them there.
![User Management - "Invitations" table](../img/admin-user-invite/usr-mngmt-table-invitations-1.png)
2. Admin can resend invitations via the invitation table (circle-arrow icon)\
![User Management - Resend invitations ](../img/admin-user-invite/usr-mngmt-resend-invitation.png)
3. Admin can delete invitations via the invitation table (rubbish bin icon). The deletion must always be confirmed.
![User Management - Delete invitation](../img/admin-user-invite/usr-mngmt-delete-invitation.png)
![User Management - Confirmation cancellation of an invitation](../img/admin-user-invite/usr-mngmt-confirm-delete-user.png)

## Invitation from the perspective of the invited user

### Invitation process

1. User receives an email invitation (via Hubspot) and receives an invitation link and further information in this email. The sender (customer ID, company name) and the purpose of the invitation (access to CloudHub) are clearly recognisable in the email.
2. The user clicks on a button with the invitation link in the email and is then forwarded accordingly.
    1. Users who already have a CloudHub account can continue to log in with their usual login details.
    2. Users who do not yet have a CloudHub account will be asked to enter their password during the process to create the account.\
![CloudHub Account creation](../img/admin-user-invite/cloudhub-register-new-account.png)
3. After successfully entering the data / successfully logging in, the users can access the CloudHub.
4. If the respective user has not yet received any rights from the admin, the users have restricted access to the CloudHub for security reasons
    1. In this case, the user only has access to the following functions / pages Home page, FAQs, settings, "Change customer" if applicable (if they are assigned to several customer numbers), feedback and the links on the home page that lead to the website or receive PDFs for the products
    2. The user is shown an info banner for this status until the rights have been assigned. Then the banner disappears automatically
    ![CloudHub view with restricted access](../img/admin-user-invite/cloudhub-restricted-access.png)
    3. As soon as the user receives their rights, the next time they log in to CloudHub they will be shown the steps in the welcome tour for the areas where the user then has access.
    ![CloudHub Welcome-Tour](../img/admin-user-invite/cloudhub-welcome-tour.png)
5. However, like all newly registered users, the user receives a welcome e-mail with an overview of all the important information about CloudHub.

### Further functions for the user

1. Via "Settings", the user can now access the function to independently cancel access to a customer number if they are no longer active in CloudHub for this number. Since the cancellation of a customer number is a critical step, we have decided to present the user with two windows to confirm this cancellation so that they have the secure option of checking the step for themselves and cancelling it in good time if necessary.
![CloudHub Einstellungen - Cancel customer number](../img/admin-user-invite/cloudhub-settings-cancel-access-to-customer-number.png)
![Selection of the customer number to which access is to be cancelled](../img/admin-user-invite/select-customer-number-to-cancel-access.png)
![Confirmation of cancellation of access to the customer number](../img/admin-user-invite/confirm-cancel-access-to-customer-number.png)

Consequences for the user for cancelling access to a customer number:

1. This CloudHub access for the cancelled customer number is then automatically blocked
2. If a user is still assigned to several customer numbers, he will be redirected to the screen where he can choose between the still active customer numbers again.
3. If a user is then only assigned to one customer number, they will be redirected to the start page in CloudHub, within the remaining customer number.
4. If a user is then no longer assigned to any customer number at all, access is completely restricted. The user will then only see a screen in the CloudHub and we will inform them to contact the admin or support if they wish to delete their account. (We are not yet able to offer automated deletion). The user can only set the language here and log out.

The admin user receives an e-mail informing them when a user has logged out of a customer number.
