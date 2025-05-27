---
title: "Create a Custom Theme"
linkTitle: "Create a Custom Theme"
type: "docs"
---

In this tutorial, you'll learn how to set up a local environment for developing Keycloak themes and create a customized login page.

## Prerequisites

Before you begin, make sure you have:

1. A terminal that can run bash scripts
   - Note: This tutorial is designed for Linux systems
   - It may work on Windows (using WSL2) or macOS with some adjustments

2. Docker installed and running
   - To check if Docker is working, run these commands in your terminal:

     ```bash
     docker --version
     docker-compose --version
     ```

   - If both commands display version information, Docker is set up correctly

## 1. Setting Up a Local Development Environment

Follow these steps to set up your local development environment to create a custom Keycloak theme.

### Step 1: Create the Project Structure

First, create a folder for your project and custom themes.

```bash
mkdir kc_themes_dev
mkdir kc_themes_dev/custom_themes
cd kc_themes_dev
```

### Step 2: Create a Docker Compose File

<details> <summary>Run this command to create the docker-compose file(Click)</summary>

```bash
cat <<EOF > docker-compose.yml
version: "3"

volumes:
postgres_data:
  driver: local

services:
postgres:
  image: postgres
  volumes:
    - postgres_data:/var/lib/postgresql/data
  environment:
    POSTGRES_DB: keycloak
    POSTGRES_USER: keycloak
    POSTGRES_PASSWORD: password

keycloak:
  image: quay.io/keycloak/keycloak:25.0 # Change the version if needed
  command: ["start-dev", "--import-realm"]
  restart: unless-stopped
  volumes:
    - ./custom_themes:/opt/keycloak/themes
  environment:
    KC_DB: postgres
    KC_DB_USERNAME: keycloak
    KC_DB_PASSWORD: password
    KC_DB_URL: "jdbc:postgresql://postgres:5432/keycloak"
    KC_METRICS_ENABLED: "true"
    KC_LOG_LEVEL: INFO
    KC_REALM_NAME: keycloak
    KEYCLOAK_ADMIN: admin
    KEYCLOAK_ADMIN_PASSWORD: keycloak
  ports:
    - 8443:8443
    - 8080:8080
  depends_on:
    - postgres
EOF
```

</details>

### Step 3: Start the Docker Compose Stack

```bash
docker-compose up -d
```

### Step 4: Verify Keycloak Is Working

Open your browser and go to http://127.0.0.1:8080. Log in with the following credentials:

- Username: admin
- Password: keycloak

### Step 5 (Optional): Extract the Default Keycloak Themes

If you want to explore the default themes, you can extract them using the following script.

<details> <summary>Create the Export Script(Click)</summary>

```bash
cat <<'EOF' > export_default_themes.sh
#!/bin/bash

# Set destination directory for the default themes
DEST_DIR="./kc_default_themes"

# Create directory for default themes
mkdir -p $DEST_DIR

# Get Container ID of the running Keycloak instance
CONTAINER_ID=$(docker ps | grep quay.io/keycloak/keycloak | awk '{print $1}')

# Get Keycloak themes JAR filename
JAR_FILE=$(docker exec ${CONTAINER_ID} sh -c "ls /opt/keycloak/lib/lib/main/ | grep 'keycloak-themes-.*.jar'")

# Fail if no themes JAR file is found
if [ -z "$JAR_FILE" ]; then
echo "Error: Couldn't find Keycloak themes JAR file."
exit 1
fi

# Copy the default themes JAR file from the container
docker cp ${CONTAINER_ID}:/opt/keycloak/lib/lib/main/${JAR_FILE} $DEST_DIR

# Extract the JAR file
echo "Extracting the JAR file..."
unzip -q "${DEST_DIR}/${JAR_FILE}" -d "${DEST_DIR}"

# Remove the JAR file after extraction if successful
if [ $? -eq 0 ]; then
echo "Extraction successful!"
rm -f "${DEST_DIR}/${JAR_FILE}"
else
echo "Error: Failed to extract the JAR file."
exit 1
fi

echo "Default themes have been successfully extracted to ${DEST_DIR}."
EOF
```

</details>
</br>
To run the script execute:

```bash
chmod +x export_default_themes.sh
bash ./export_default_themes.sh
```

## 2. Create a Customized Login Page

Now that your development environment is set up, let's create a custom login page for Keycloak.

### Step 1: Create Your Theme Folders

Create the following folder structure in your project:

```bash
custom_themes/mytheme/
└── login
    ├── messages
    │   └── messages_en.properties
    ├── resources
    │   ├── css
    │   │   └── styles.css
    │   └── img
    │       ├── banner.png
    │       └── bg.jpg
    └── theme.properties
```

### Step 2: Add Your Theme Files

#### theme.properties

This file defines the properties of your theme. Here, we inherit from the default keycloak.v2 theme and include our custom stylesheet.

```bash
parent=keycloak.v2
styles=css/styles.css
```

#### messages_en.properties

Customize the text for your login page by overwriting the default strings.

```css
loginAccountTitle=Login
usernameOrEmail=Type in your Username
password=Type in your Password
```

#### styles.css

In this file, we add a background image and replace the default logo text with a custom company banner.

```css
.login-pf body {
    background-image: url('../img/bg.jpg');
    background-size: cover;
}

.kc-logo-text {
    display: none;
}

#kc-header-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../img/banner.png') no-repeat center;
  background-size: contain;
  height: 99px; /* Adjust height to your image */
}
```

#### Images

Place your background image (bg.jpg) and banner image (banner.png) inside the img folder. 

### Step 3:  Apply the Custom Login Theme

To apply your custom theme, log in to the Keycloak Web Interface. Go to:

- Realm Settings > Themes
- In the Login Theme dropdown, select your custom theme (mytheme).
- Click on *Save*, logout from the webpanel and reload the site. You may need to restart the container if the theme doesn't load correctly.

</br>

### Final Result

The image below demonstrates the customizations we’ve made:

- The background image has been replaced.
- A company banner had been added to the center at the top of the page.
- The login form field descriptions have been updated with custom text.

![Custom Login Page](/images/content/04-msl/en/iam_keycloak/themes/3-result.png)

</br>

You should now be able to customize and create themes according to your needs. Once your custom theme is ready for production, you can upload it to your Keycloak as a Service instance. For more details on the process, click [here](../documentation/themes/).
