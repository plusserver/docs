---
title: "Erstellen eines Custom Theme"
linkTitle: "Erstellen eines Custom Theme"
type: "docs"
---

Dieses Tutorial zeigt, wie eine lokale Entwicklungsumgebung zum anpassen von Keycloak-Themes eingerichtet und eine benutzerdefinierte Anmeldeseite erstellt wird.

## Voraussetzungen

Erforderlich:

1. Ein Terminal, das Bash-Skripte ausführt.

- Hinweis: Tutorial basiert auf Linux.
- Kann unter Windows (WSL2) oder macOS mit Anpassungen funktionieren.

2. Docker muss installiert und ausgeführt werden.

- Prüfung der Installation:

```bash
docker --version
docker-compose --version
```

- Wenn beide Befehle Versionsinformationen anzeigen, ist Docker korrekt eingerichtet

## 1. Lokale Entwicklungsumgebung einrichten

### Schritt 1: Erstellen der Projektstruktur

Ordner für Projekt und Themes anlegen.

```bash
mkdir kc_themes_dev
mkdir kc_themes_dev/custom_themes
cd kc_themes_dev
```

### Schritt 2: Docker-Compose-Datei erstellen

<details> <summary>Erstellen der docker-compose.yml (Click)</summary>

```bash
cat <<EOF > docker-compose.yml
version: „3“

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
image: quay.io/keycloak/keycloak:25.0 # Ändern Sie die Version bei Bedarf
command: [„start-dev“, „--import-realm“]
restart: unless-stopped
volumes:
- ./custom_themes:/opt/keycloak/themes
environment:
KC_DB: postgres
    KC_DB_USERNAME: keycloak
KC_DB_PASSWORD: password
KC_DB_URL: „jdbc:postgresql://postgres:5432/keycloak“
KC_METRICS_ENABLED: “true“
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

### Schritt 3: Docker-Compose Stack starten

```bash
docker-compose up -d
```

### Schritt 4: Keycloak-Verfügbarkeit prüfen

Im Browser zu <http://127.0.0.1:8080> navigieren. Anmeldedaten:

- Benutzername: admin
- Passwort: keycloak

### Schritt 5 (optional): Default-Keycloak-Themes extrahieren

Zum erkunden der Default Themes lassen sich Diese mit folgendem Script exportieren.

<details> <summary>Export-Skript erstellen (Click)</summary>

```bash
cat <<'EOF' > export_default_themes.sh
#!/bin/bash

# Zielverzeichnis für die Standardthemen festlegen
DEST_DIR=“./kc_default_themes“

# Verzeichnis für Standardthemen erstellen
mkdir -p $DEST_DIR

# Container-ID der laufenden Keycloak-Instanz abrufen
CONTAINER_ID=$(docker ps | grep quay.io/keycloak/keycloak | awk ‚{print $1}‘)

# Keycloak-Themes abrufen JAR-Dateiname
JAR_FILE=$(docker exec ${CONTAINER_ID} sh -c „ls /opt/keycloak/lib/lib/main/ | grep ‚keycloak-themes-.*.jar‘“)

# Fehlschlagen, wenn keine JAR-Datei mit Designs gefunden wird
if [ -z „$JAR_FILE“ ]; then
echo „Fehler: Keycloak-Design-JAR-Datei konnte nicht gefunden werden.“
exit 1
fi

# Kopieren Sie die JAR-Datei mit den Standardthemen aus dem Container
docker cp ${CONTAINER_ID}:/opt/keycloak/lib/lib/main/${JAR_FILE} $DEST_DIR

# Extrahieren Sie die JAR-Datei
echo „Extrahieren der JAR-Datei...“
unzip -q ‚${DEST_DIR}/${JAR_FILE}‘ -d “${DEST_DIR}“

# Entferne die JAR-Datei nach erfolgreicher Extraktion
if [ $? -eq 0 ]; then
echo „Extraktion erfolgreich!“
rm -f ‚${DEST_DIR}/${JAR_FILE}“
else
echo ‘Fehler: JAR-Datei konnte nicht extrahiert werden.“
exit 1
fi

echo “Standardthemen wurden erfolgreich nach ${DEST_DIR} extrahiert.“
EOF
```

</details>
</br>

Ausführung des Skripts:

```bash
chmod +x export_default_themes.sh
bash ./export_default_themes.sh
```

## 2. Erstellen einer benutzerdefinierten Anmeldeseite

### Schritt 1: Ordnerstruktur für Theme anlegen

```bash
custom_themes/mytheme/
└── login
    ├── messages
    │   └── messages_en.properties
    ├── resources
    │   ├── css
    │   │   └── styles.css
    │   └── img
    │       ├── banner.png
    │ └── bg.jpg
└── theme.properties
```

### Schritt 2: Dateien zum Theme hinzufügen

#### theme.properties

Diese Datei definiert die Theme-Eigenschaften. Es wird vom keycloak.v2 Standardtheme geerbt, und ein benutzerdefiniertes Stylesheet wird hinzugefügt.

```bash
parent=keycloak.v2
styles=css/styles.css
```

#### messages_en.properties

Textanpassung für die Anmeldeseite.

```css
loginAccountTitle=Anmelden
usernameOrEmail=Geben Sie Ihren Benutzernamen ein
password=Geben Sie Ihr Passwort ein
```

#### styles.css

Hintergrundbild und Firmenbanner setzen.

```css
.login-pf body {
    background-image: url("../img/bg.jpg");
    background-size: cover;
}

.kc-logo-text {
    display: none;
}

#kc-header-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../img/banner.png") no-repeat center;
    background-size: contain;
    height: 99px; /* Passen Sie die Höhe an Ihr Bild an */
}
```

#### Bilder

Hintergrundbild (bg.jpg) und Banner (banner.png) im Ordner „img“ ablegen.

### Schritt 3: Anmeldetheme aktivieren

Anmeldung in Keycloak. Navigiere zu:

- Realm-Einstellungen > Themen
- Anmeldethema auswählen (mytheme)
- Speichern klicken, Webpanel abmelden und Seite neu laden. Falls das Theme nicht geladen wird, den Container neu starten.

</br>

### Endergebnis

Das folgende Bild zeigt die vorgenommenen Anpassungen:

- Ersetztes Hintergrundbild.
- Firmenbanner oben auf der Seite.
- Angepasste Beschreibungen im Anmeldeformular.

![Benutzerdefinierte Anmeldeseite](/images/content/04-msl/en/iam_keycloak/themes/3-result.png)

</br>

Sie sollten nun in der Lage sein, Designs nach Ihren Bedürfnissen anzupassen und zu erstellen. Sobald Ihr benutzerdefiniertes Design für die Produktion bereit ist, können Sie es in Ihre Keycloak-as-a-Service-Instanz hochladen. Weitere Informationen zu diesem Vorgang finden Sie [hier](../documentation/themes/).
