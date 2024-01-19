---
title: Installing the AWS CLI
description: >
  Install the AWS CLI tool to interact with your plusstorage S3.
---

In this section, we will show you how to install the AWS Command Line Interface (CLI) to interact with your plusserver S3 account. Please note that the AWS CLI is only used here as an example to get you started. Any alternative S3 client can also be used to access your S3 resources.

### Review the system requirements

Before you begin the installation, make sure your system meets the necessary requirements:

Operating System: the AWS CLI is available on various operating systems such as Windows, macOS, and Linux.

### Install the AWS CLI

Follow these steps to install the AWS CLI on your system:

- Windows:

  1. visit the official AWS CLI installation page: <https://aws.amazon.com/cli/>.

  1. click the "Install AWS CLI" link.

  1. follow the instructions in the installer for Windows.

  1. after installation, open the command prompt and enter the aws --version command to ensure that the installation was successful.

- macOS:

  1. open the terminal.

  1. use the Homebrew package manager to install the AWS CLI by entering the brew install awscli command.

  1. verify the installation by running the aws --version command.

- Linux:

  1. open the terminal.

  1. Use the package manager of your Linux distribution to install the AWS CLI. For Debian/Ubuntu, use sudo apt-get install awscli; for CentOS/RHEL, use sudo yum install awscli.

  1. confirm the installation by entering the command aws --version.

{{% alert %}}

The exact commands and installation steps may change depending on your operating system and version. Make sure to use the official documentation from AWS or the package manager.
More information can be found at: <https://aws.amazon.com/cli/>

{{% /alert %}}

### Configuring the AWS CLI

After installation, you need to configure the AWS CLI with your credentials to access your plusserver S3 account:

1. open the terminal or command prompt.

1. enter the aws configure command.

1. Follow the instructions to enter your access data, including access key, secret access key, region (e.g. de-west-1 for Cologne or de-north-2 for Hamburg and output format (e.g. json).

1. after successful configuration, you can use the AWS CLI to interact with your plusserver S3 account.

Congratulations! You have successfully installed and configured the AWS CLI to communicate with your plusserver S3 account. Remember that you can use any other S3-compatible tool to access your plusserver S3 resources. In the following sections, we will show you how to perform basic actions such as uploading objects.
