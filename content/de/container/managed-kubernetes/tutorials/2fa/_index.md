---
title: "PSKE - Einrichten von OIDC/2FA auf PSKE"
linkTitle: "Einrichten von OIDC/2FA auf PSKE"
type: "docs"
weight: 40
date: 2024-08-01
---

* Zunächst benötigen sie eine [Keycloak Instanz](/en/security/keycloak/tutorials/ordering/)
* Loggen sie sich mit ihren [Admin user credentials](/en/security/keycloak/tutorials/retrieve_login_credentials/) in die Admin Oberfläche ein.
* Um dies zu tun, kopieren sie die entsprechend ergänzte URL **https://*<DNS-Name_of_your_IAM-Keycloak_Server>*/** in die Adresszeile von ihrem Browser, z.B.: *<https://node-65e84464310368a571551616.ps-xaas.io>*

# Schritt 1

Loggen Sie sich mit den Zugangsdaten, die Sie zuvor in CloudHub erhalten haben, in Keycloak unter "Administration Console" ein und klicken Sie auf "Create realm" im Dropdown-Menü oben links.

{{< img src="1.jpg" alt="Project" >}}

Geben Sie unter "Realm name" einen Namen ein und bestätigen mit "Create". Der Realm (oben links) wird dann automatisch auf den neu angelegten Realm geändert.

# Schritt 2
Wählen Sie im Menü "Clients" und dann "Create Client".

{{< img src="2.png" alt="create client 1" >}}

- Wählen Sie "OpenID Connect" und legen Sie eine Client-ID fest.
- Drücken Sie "Next" und aktivieren Sie "Client authentication".
- Drücken Sie erneut auf "Next" und füllen Sie "Valid redirect URIs" mit http://localhost:8000 und http://localhost:18000. Dies wird von kubelogin als Rückruf verwendet, wenn Sie sich mit kubectl anmelden, so dass ein Browserfenster geöffnet werden kann, um sich mit keycloak zu authentifizieren.


# Schritt 3
Gehen Sie zu "User" und klicken Sie auf die Schaltfläche "Add User". Alle Felder müssen entsprechend ausgefüllt werden. Drücken Sie dann auf "Create". Denken Sie daran, dass Sie die E-Mail verifizieren müssen oder sie in Keycloak einfach auf verifiziert setzen. Andernfalls wird der Authentifizierungs-Workflow nicht funktionieren.

{{< img src="3.png" alt="create user 1" >}}

Gehen Sie auf den “Credentials” Tab und klicken Sie auf “Set password” und erstellen Sie ein Passwort. Bestätigen Sie mit “Save”.

{{< img src="4.jpg" alt="create user 3" >}}

# Schritt 4
Aktivieren Sie 2FA für den Realm: Klicken Sie auch auf "Authentication" im Menü in Keycloak.

{{< img src="5.png" alt="activate 2fa" >}}

Gehen Sie dort auf "Browser". Dies ist praktischerweise der Standardablauf für die Clients. Dort sollte "Browser - Conditional OTP" von Conditional auf "Required" gesetzt werden.

{{< img src="6.png" alt="activate 2fa 2" >}}

# Schritt 5

Installieren Sie das kubectl plugin "oidc-login". Wir empfehlen das krew-Installationstool, das auch die Installation anderer Plugins leicht macht.
```
kubectl krew install oidc-login
```

Die Ausgabe sollte in etwa wie folgt aussehen:
```
Updated the local copy of plugin index.
Installing plugin: oidc-login
CAVEATS:
\
|  You need to setup the OIDC provider, Kubernetes API server, role binding and kubeconfig.
|  See https://github.com/int128/kubelogin for more.
/
Installed plugin: oidc-login
```

# Schritt 6

Bereiten sie dann die Kubeconfig für die spätere verwendung vor:
```
cp ~/path/to/kubeconfig ~/.kube/config-oidc
```

Bearbeiten sie die Config in ~/.kube/config-oidc wie folgt:
```
apiVersion: v1
kind: Config

...

contexts:
- context:
    cluster: shoot--project--mycluster
    user: my-oidc
  name: shoot--project--mycluster

...

users:
- name: my-oidc
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: kubectl
      args:
      - oidc-login
      - get-token
      - --oidc-issuer-url=https://<Issuer>/ 
      - --oidc-client-id=<Client ID>
      - --oidc-client-secret=<Client Secret>
      - --oidc-extra-scope=email,offline_access,profile
```

Um die OIDC-basierte Authentifizierung zu testen, wird in einem späteren Schritt der Kontext shoot--project--mycluster von ~/.kube/config-oidc verwendet. Für den Moment verwenden Sie weiterhin die Konfiguration ~/.kube/config mit Administrationsrechten für Ihren Cluster.

# Konfigurieren des Shoot Cluster

Passen Sie die YAML des Shootclusters wie folgt an und verwenden Sie die Client-ID und die Domäne (als Issuer) aus den Einstellungen der Client-Anwendung, die Sie in Keycloak erstellt haben:

```
kind: Shoot
apiVersion: garden.sapcloud.io/v1beta1
metadata:
  name: mycluster
  namespace: garden-project
...
spec:
  kubernetes:
    kubeAPIServer:
      oidcConfig:
        clientID: <Client ID>
        issuerURL: "https://<KeycloakURL>/auth/realms/master"
        usernameClaim: email
```

Diese Änderung des Shoot-Manifests löst einen Reconcile aus. Sobald der Reconcile abgeschlossen ist, wird Ihre OIDC-Konfiguration angewendet. Andere zertifikatsbasierte Authentifizierungsmethoden werden dadurch nicht ungültig. Warten Sie, bis Gardener die Änderungen reconciled hat.

In Keycloak haben Sie einen Benutzer mit einer verifizierten E-Mail-Adresse angelegt, in unserem Beispiel test@test.com. Der Einfachheit halber autorisieren wir einen einzelnen Benutzer, der durch diese E-Mail-Adresse identifiziert wird, mit der Cluster-Rolle "view":

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: viewer-test
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: view
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: User
  name: test@test.com
```

Wenden Sie als Administrator die ClusterRoleBinding in Ihrem Shoot Cluster an.

# Verifizieren der Authentifizierung

Um die Rolle Ihres Benutzers anzunehmen, verwenden Sie die vorbereitete kubeconfig-Datei ~/.kube/config-oidc und wechseln Sie in den Kontext, der oidc-login verwendet:

```
cd ~/.kube
export KUBECONFIG=$(pwd)/config-oidc
kubectl config use-context `shoot--project--mycluster`
```

kubectl delegiert die Authentifizierung an das Plugin oidc-login, wenn der Benutzer kubectl zum ersten Mal verwendet, um z.B. den API-Server zu kontaktieren:

```
kubectl get all
```

Das Plugin öffnet einen Browser für eine interaktive Authentifizierungssitzung mit Keycloak, und bedient parallel dazu einen lokalen Webserver für den konfigurierten Callback.

Geben Sie ihre Zugangsdaten ein:

{{< img src="7.jpg" alt="test login 2" >}}

Wenn Sie alles richtig gemacht haben, sollten Sie eine erfolgreiche Antwort vom API-Server erhalten:

{{< img src="8.jpg" alt="test login 3" >}}

```
Opening in existing browser session.
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   100.64.0.1   <none>        443/TCP   86m
```

> **Note:** Nach erfolgreicher Anmeldung verwendet kubectl ein Token zur Authentifizierung, so dass Sie nicht bei jedem neuen kubectl-Befehl Benutzer und Passwort angeben müssen. Wie lange der Token gültig ist, kann konfiguriert werden. Wenn Sie sich früher wieder anmelden wollen, setzen Sie das Plugin oidc-login zurück:

    Delete directory ~/.kube/cache/oidc-login.
    Delete the browser cache.


# Weitere Sicherheitsmaßnahmen für Ihren Cluster

Zusätzlich zur Verwendung von 2FA empfehlen wir Ihnen, Ihr Gardener-Token, das Sie für die Anmeldung im Dashboard verwenden, regelmäßig zu wechseln. Öffnen Sie dazu einfach Ihr Gardener-Dashboard und navigieren Sie zu "Member" in der linken Menüleiste. Wählen Sie dann unter "Serviceaccounts" das Konto aus, dessen token Sie zurücksetzen möchten. Um den Token zu rotieren, drücken Sie einfach auf "Reset Service Account" (das rotierende Pfeilsymbol) des entsprechenden Accounts.