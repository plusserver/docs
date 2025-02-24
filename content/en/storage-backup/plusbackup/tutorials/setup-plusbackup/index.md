---
title: "Setting up the Plusbackup"
linkTitle: "Setting up the Plusbackup"
type: "docs"
weight: 20
date: "2024-02-07"
---

## Step 1: Log into plusbackup

1. The plusbackup can be reached via the following HTTPs website: [Link](https://de-4-spc-backup.vcd.get-cloud.io:1280/ "https://de-4-spc-backup.vcd.get-cloud.io:1280/")

{{< img src="images/image-1.png" alt="Screenshot: Login screen" >}}

Log in here with username and password

2. Click on "Managed Computers" in the left-hand menu bar

{{< img src="images/image-2.png" alt="Screenshot: Managed Computers selected" >}}

Here you can see all the managed workloads that you manage and add another workload via "Download Management Agent"

3. Here you select the operating system of the computer (Windows / Linux / Mac)

{{< img src="images/image-3.png" alt="Screenshot: Select operating system" >}}

- a wizard opens

{{< img src="images/image-4.png" alt="Screenshot: Wizard window" >}}

Here you can define how long the download link can be used by the management agent (default 12 months). For security reasons, a short duration should be selected here (e.g. 1 day)
    
{{< img src="images/image-5.png" alt="Screenshot: Setting the time" >}}

Via Create Download Link you will then receive a link via which the future client can download the management software or you can download the agent directly via "Download"

{{< img src="images/image-6.png" alt="Screenshot: link to download" >}}

{{< img src="images/image-7.png" alt="Screenshot: Managment agent will now be downloaded to your computer" >}}
    
This is now installed on the system to be backed up in the future

{{% alert title="Warning" color="warning" %}}
Important plusbackup uses the following ports that must be enabled on the client and in the infrastructure (firewall, edge gateway, ...):

Veeam Agent (Windows) 9395+, 6183+ - see [Link](https://helpcenter.veeam.com/docs/agentforwindows/userguide/ports.html?ver=60)

Veeam Agent (Linux) 10002,100006, 2500-3300, 10808 - see [Link](https://helpcenter.veeam.com/docs/agentforlinux/userguide/used_ports.html?ver=60) 

Veeam Agent (Mac) 10006,10101, 2500-3300 - see [Link](https://helpcenter.veeam.com/docs/agentformac/userguide/used_ports.html?ver=20 "Optional link title")

Cloud Gateway 6180

TCP 443 (download information and updates)

TCP 80 (Certification Revocation Lists)

**Important regarding pluscloud open:**
If no MTU size has been specified in the instance to be backed up, the MTU is set to 9000. To enable a backup with plusbackup of this instance, the MTU size of the instance must be set to 1,500.
{{% /alert %}}

## Step 2: Setting up Plusbackup

We are using a Windows laptop as an example for setting up Plusbackup. 
The installation requires admin or root rights.
Proceed as follows (see screenshots): 
1. {{< img src="images/image-8.png" alt="Screenshot: Installation window" >}}

2. {{< img src="images/image-9.png" alt="Screenshot: License agreements" >}}

3. {{< img src="images/image-10.png" alt="Screenshot: ready to install" >}}

4. {{< img src="images/image-11.png" alt="Screenshot: Veeam Service Provider Console Management agent installing" >}}

5. After installation, the agent should be started and will then connect to the plusserver Cloud Gateway via port 6180 (this must of course be accessible or enabled on the firewall or similar). 
6. After a few minutes the connectivity should be established, the computer system can also be assigned a tag, which then appears in the HTML GUI.

{{< img src="images/image-12.png" alt="Screenshot: Veeam Management Agent Settings wizard window" >}}

{{< img src="images/image-13.png" alt="Screenshot: agent status is connected" >}}
- If the computer system is a Windows client, the possible connection can also be tested via Powershell (<powershell>: tnc port 6180 de-4-cc-gw01.vcd.get-cloud.io). If no connection is possible, port 6180 must be released (firewall or similar)

{{< img src="images/image-14.png" alt="Screenshot: Test connection via Powershell" >}}

7. Now you can see the new computer system with the "Tag" in the plusbackup HTML Console and mark it with a checkmark, via "Management Agent" you can restart the Management Agent, reboot the computer and also upgrade or delete it, as well as view the logs.

{{< img src="images/image-15.png" alt="Screenshot: Restart management agents" >}}

8. Use the "Install Backup Agent" button to install the backup agent on the selected computer system.

{{< img src="images/image-16.png" alt="Screenshot: Button Install Backup Agent" >}}

- When installing the backup agent, you can also add it to a **backup policy** or create a new backup policy. However, as this can also be done later, this is not necessary and you can also select "No Policy".

{{< img src="images/image-17.png" alt="Screenshot: Install Backup Agent wizard window" >}}

{{< img src="images/image-18.png" alt="Screenshot: select no policy" >}}

9. The backup agent is then installed, which takes several minutes

{{< img src="images/image-19.png" alt="Screenshot: Backup Agent is being installed" >}}


## Step 3: Create backup job/backup policy

1. After finalization, you can create a backup job or a **Backup Policy** or add the computer to an existing job or policy.

{{< img src="images/image-20.png" alt="Screenshot: Create new backup job" >}}

2. Here you can create a new job or select a template:

{{< img src="images/image-21.png" alt="Screenshot: New backup job wizard window" >}}

3. Here you enter the name of the job and if wished also add a description

{{< img src="images/image-22.png" alt="Screenshot: Name assignment for backup job" >}}

4. Here you select Server or Workstation. The differences between the editions are as follows: [Link](https://reimagined-space-potato-97qq664rvxx6fx5pp.github.dev/ "Optionaler Linktitel")

Server Features: Parallel disk processing, Retention based on Restore Points, Continuous, daily, weekly and monthly schedule, GFS Backups, Backup Window Adjustment, Managed jobs, Application Awareness für Oracle, MySQL, PostgreSQL, Pre-freeze und Post-Thaw Skripte, Applikation Item Recovery, Veeam Cloud Connect Repository, Multiple Backup Jobs

{{< img src="images/image-23.png" alt="Screenshot: Operation Mode - Server or Workstation" >}}

5. Select backup mode (entire computer | volume level backup | file level backup or folder paths)

{{< img src="images/image-24.png" alt="Screenshot: Backup mode selected" >}}

6. If File Level has been selected, you can define the files more precisely in this mask. 

{{< img src="images/image-25.png" alt="Screenshot: Files - Define file more precisely" >}}

7. As an example, we have chosen the folder C:\test2, which contains a file (backupfile.txt) with the sentence "I want to restore this"

{{< img src="images/image-26.png" alt="Screenshot: Folder with sample file" >}}

8. Enter Veeam Cloud Connect Repository as the "Destination":

{{< img src="images/image-27.png" alt="Screenshot: Destination Veeam Cloud Connect Repository" >}}

9. Now enter the credentials (username + password) from the plusbackup account (**IMPORTANT:** not those from the client!)

{{< img src="images/image-28.png" alt="Screenshot: Username and password input" >}}

Only use the back part of the plusbackup account (the whole user is only necessary in the WEB Gui)

So e.g. account is 123456\kd123456 
    
Then only enter kd123456 here 

{{< img src="images/image-29.png" alt="Screenshot: Enter example account + password" >}}

10. In the next step, the backup repository must be selected (it is important to click on it, otherwise the error message "Select any repository to store your backup data" will appear).

{{< img src="images/image-30.png" alt="Screenshot: Repository clicked" >}}

11. Now you can assign the retention policy (how many backups should be retained)

{{< img src="images/image-31.png" alt="Screenshot: Wizard window Retention policy" >}}

- If required, GFS (Grandfather, Father, Son) can be selected so that you can set weekly, monthly and annual backups

{{< img src="images/image-32.png" alt="Screenshot: Wizard window Configure GFS" >}}

12. Further detailed configurations can be set under "Advanced Settings"

{{< img src="images/image-33.png" alt="Screenshot: Wizard window Advanced Setting" >}}


{{% alert title="Notice" %}}
IMPORTANT - under Advanced Settings → Storage the optimization "Local target" (large blocks) should be selected.

{{< img src="images/image-34.png" alt="Screenshot: Storage optimization options" >}}

{{< img src="images/image-35.png" alt="Screenshot: Local target (large blocks) selected" >}}

Since the plusserver stores all backups as a redundant S3 copy in a georedundant manner. This option ensures the best storage in S3.
{{% /alert %}}

13. In the next menu, a backup cache can be set up on the client, which can temporarily store backup data in case the connectivity from the client to the plusserver backup service is temporarily disrupted

{{< img src="images/image-36.png" alt="Screenshot: Set Backup cache" >}}

The time of the backup job can be set and configured in the Schedule area

{{< img src="images/image-37.png" alt="Screenshot: Set schedule for Backup cache" >}}

The backup is either started with the wizard or the job must then be enabled and started:

{{< img src="images/image-38.png" alt="Screenshot: Start backup job manually" >}}



14. When starting the backup job, you can see that the backup job has started both in the Web GUI and locally via the agent:

{{< img src="images/image-39.png" alt="Screenshot: running and completed backup jobs" >}}

{{< img src="images/image-40.png" alt="Screenshot: Mouse pointer on Open" >}}

{{< img src="images/image-41.png" alt="Screenshot: Status and restore point details" >}}

After the backup is completed, you can see the last backup with timecode in both the client and the WEB GUI
    
{{< img src="images/image-42.png" alt="Screenshot: Backup status done" >}}

## Restore:

A restore can be initiated from the client (with the Veeam agent) or from the plusbackup portal.

**A - Agent recovery**
1. Call up File Level Restore (for individual files) or Volume Restore from the client:

{{< img src="images/image-43.png" alt="Screenshot: File Level Restore and Volume Restore" >}}

2. Select restore point in the wizard

{{< img src="images/image-44.png" alt="Screenshot: Wizard window File Level Restore" >}}

{{< img src="images/image-45.png" alt="Screenshot: Wizard window Please wait" >}}

{{< img src="images/image-46.png" alt="Screenshot: Test2 folder selected" >}}

{{< img src="images/image-47.png" alt="Screenshot:  Restore Button" >}}

Restore - Restore/overwrite to the same location with the same name
    
Copy To - Restore to a different name or location
    
{{< img src="images/image-48.png" alt="Screenshot: Restoring files to NB-61239" >}}

{{< img src="images/image-49.png" alt="Screenshot:  Downloaded backup document" >}}


**B - plusserver portal recovery**

1. Select the client under Protected Data and click on "File-Level Restore Portal":

{{< img src="images/image-50.png" alt="Screenshot: Protected Data Client selected" >}}

2. Select the relevant restore point by clicking on Select:

{{< img src="images/image-51.png" alt="Screenshot: Click on Restore Point Select" >}}

{{< img src="images/image-52.png" alt="Screenshot: Select Restore Point" >}}

{{< img src="images/image-53.png" alt="Screenshot: Test2 folder clicked" >}}

{{< img src="images/image-54.png" alt="Screenshot:  Backupfile.txt selected" >}}

3. Select all items you want to restore and click "Add to Restore List"

{{< img src="images/image-55.png" alt="Screenshot: Add to Restore List button" >}}

4. In the "Restore List" menu item, decide whether the elements should be downloaded, the existing ones overwritten or restored to a different location or under a different name.

{{< img src="images/image-56.png" alt="Screenshot: Backupfile.txt selected" >}}    

{{< img src="images/image-57.png" alt="Screenshot: Restore Button - Keep or Overwrit" >}}

Download - Download locally

Keep - Restore with a different name or location
    
Overwrite - Restore/overwrite to the same location with the same name
