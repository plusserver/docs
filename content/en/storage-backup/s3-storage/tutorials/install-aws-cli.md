---
title: "Installing AWS S3 CLI"
linkTitle: "Installing AWS S3 CLI"
type: "docs"
weight: 10
date: "2024-02-07"
---

In this section, we will show you how to install the AWS Command Line Interface (CLI) to interact with your plusserver S3 account. Please note that the AWS CLI is used here as an example for getting started, and any alternative S3 client can also be used to access your S3 resources.

### Step 1: Checking System Requirements

Before starting the installation, ensure that your system meets the necessary requirements:

- Operating System: The AWS CLI is available on various operating systems such as Windows, macOS, and Linux.

### Step 2: Installing AWS CLI

Follow these steps to install the AWS CLI on your system:

#### Windows:

a. Visit the official AWS CLI Installation page: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

b. Click on the "Install AWS CLI" link.

c. Follow the instructions in the Windows installer.

d. After installation, open the command prompt and enter the command `aws --version` to ensure a successful installation.

#### macOS:

a. Open the Terminal.

b. Use the Homebrew package manager to install the AWS CLI by entering the command `brew install awscli`.

c. Verify the installation by running the command `aws --version`.

#### Linux:

a. Open the Terminal.

b. Use the package manager of your Linux distribution to install the AWS CLI. For Debian/Ubuntu, use `sudo apt-get install awscli`, for CentOS/RHEL, use `sudo yum install awscli`.

c. Confirm the installation by entering the command `aws --version`.

The exact commands and installation steps may vary depending on the operating system and version. Ensure you refer to the official documentation from AWS or your package manager.

For more information, visit: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

### Step 3: Configuration of AWS CLI

After installation, you need to configure the AWS CLI with your credentials to access your plusserver S3 account:

- Open the terminal or command prompt.
- Enter the command `aws configure`.
- Follow the instructions to enter your credentials, including Access Key, Secret Access Key, Region (e.g., de-west-1 for Cologne or de-north-2 for Hamburg), and output format (e.g., json).
- After successful configuration, you can use the AWS CLI to interact with your plusserver S3 account.

Congratulations! You have successfully installed and configured the AWS CLI to communicate with your plusserver S3 account. Remember that you can use any other S3-compatible tool to access your plusserver S3 resources. In the following sections, we will show you how to perform basic actions such as uploading objects.

{{% alert title="Endpoint Configuration" %}}

The AWS CLI uses "http://s3.amazonaws.com" as the default endpoint. You can change this by modifying the variable in the AWS CLI configuration file. Depending on the operating system, this file is located in a different location (e.g., Windows: %USERPROFILES%\.aws\config, as well as the credential file).

**Example Configuration**

File: config
```bash
[profile plusservers3]
region = de-west-1
endpoint_url = https://s3.de-west-1.psmanaged.com

File: credentials
```bash
[plusservers3]
aws_access_key_id = <accesskey>
aws_secret_access_key = <secretkey>
```
Other S3 CLIs also have configuration files that can be adjusted accordingly.
{{% /alert %}}
