---
title: "plusserver S3 Tenant API Documentation"
linkTitle: "Tenant API"
type: "docs"
weight: 150
date: "2024-02-07"
---
The plusserver S3 service's Tenant API provides a comprehensive interface for various functions to effectively control and manage tenant management. Here is an overview of the key aspects of the API and how you can use it.

### What is the Tenant API?

The Tenant API allows you to perform various operations related to tenant management. A tenant represents a user or a group of users and their associated resources in the S3 service. With the Tenant API, you can perform specific actions on tenant accounts, authentication, configurations, object management, and more.

### How to access the documentation?

You can access the complete API documentation at [https://s3-portal.psmanaged.com:9443/ui/apidocs.html#](https://s3-portal.psmanaged.com:9443/ui/apidocs.html#). There you will find detailed information on available endpoints, authentication schemas, supported versions, and the various operations you can perform.

### Available Functions

The Tenant API organizes the available functions into different sections:

- **Account:** Operations on the current tenant account, including storing usage information.

- **Auth:** Operations to authenticate the user session with support for the owner token authentication schema.

- **Config:** Operations related to the product version and versions of the Tenant Management API. You can list the product version and main versions supported by this version.

- **Container:** Operations on S3 buckets or Swift containers, including functions such as bucket creation, consistency control, CORS configuration, object updates, and more.

- **Disabled Functions:** Displaying functions that may have been disabled.

- **Endpoints:** Operations to manage endpoints, allowing an S3 bucket to use external services for replication, notifications, or search integration.

- **Groups:** Operations to manage local tenant groups and retrieve connected tenant groups from an external identity source.

- **Identity Source:** Operations to configure an external identity source and manually synchronize federated group and user information.

- **Regions:** Operations to determine which regions have been configured for the StorageGRID system.

- **s3:** Operations to manage S3 access keys for tenant users.

- **s3-Object-Lock:** Operations on global S3 Object Lock settings to support compliance with legal regulations.

- **Users:** Operations to view and manage tenant users.

Utilize the comprehensive features of the Tenant API to efficiently control and customize your tenant management.

## plusserver S3 Usage via API Query

In this section, you will learn how to retrieve usage information for your plusserver S3 service, gaining insights into the usage of your buckets via API queries.

### Step 1: Retrieve API Documentation

Before starting the S3 Usage query, you can access the API documentation through the following link: [API Documentation](https://s3-portal.psmanaged.com:9443/ui/apidocs.html#).

### Step 2: Obtain Authorization Token

To access S3 Usage data, you need an authorization token. You can obtain the token through a POST request to the following URL: [https://s3-portal.psmanaged.com:9443/api/v3/authorize](https://s3-portal.psmanaged.com:9443/api/v3/authorize)

Use the following JSON body in your request, replacing `<accountId>`, `<username>`, and `<password>` with your corresponding information:
```json
{
  "accountId": "Your_Account_ID",
  "username": "Your_Username",
  "password": "Your_Password",
  "cookie": true,
  "csrfToken": false
}
```

The response contains your authorization token, which you can use for the subsequent steps.

**Example Curl Request for Authorization:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "accountId": "Your_Account_ID",
  "username": "Your_Username",
  "password": "Your_Password",
  "cookie": true,
  "csrfToken": false
}' "https://s3-portal.psmanaged.com:9443/api/v3/authorize"
```

### Step 3: Retrieve S3 Usage

Use your authorization token to retrieve S3 Usage data. Use a GET request to the following URL: [https://s3-portal.psmanaged.com:9443/api/v3/org/usage](https://s3-portal.psmanaged.com:9443/api/v3/org/usage)

Add your authorization token to your request header:
**-H "Authorization: Bearer Your_Authorization_Token"**

The response contains comprehensive information about usage, including the number of objects, data volume, and details about your buckets.

### Step 4: Save Usage Data

To save the obtained usage data, you can for example use a simple Bash script. Here is an example of how to retrieve the data and save it as a JSON file:

```bash
#!/bin/bash

# Obtain authorization token
auth_token=$(curl -X POST -H "Content-Type: application/json" -d '{
  "accountId": "Your_Account_ID",
  "username": "Your_Username",
  "password": "Your_Password",
  "cookie": true,
  "csrfToken": false
}' "https://s3-portal.psmanaged.com:9443/api/v3/authorize" | jq -r '.data')

# Retrieve S3 Usage data
usage_data=$(curl -X GET "https://s3-portal.psmanaged.com:9443/api/v3/org/usage" -H "accept: application/json" -H "Authorization: Bearer $auth_token")

# Generate timestamp for file name
timestamp=$(date +"%Y%m%d%H%M%S")

# Save data as JSON
echo "$usage_data" > "usage_$timestamp.json"

echo "Usage data has been saved as usage_$timestamp.json."
```

Run this script to retrieve your S3 Usage data and save it as a JSON file.

{{% alert title="Info" %}}
Please note that you need to use your own login credentials and account IDs to make the API requests.
{{% /alert %}}


---
