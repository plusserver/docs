---
title: "PSKE - How to setup OIDC/2FA on PSKE"
linkTitle: "How to setup 2FA"
type: "docs"
weight: 40
date: 2024-08-01
---

* First you need to [book your Keycloak instance](/en/security/keycloak/tutorials/ordering/)
* and log in to the web interface with your [Admin user access data](/en/security/keycloak/tutorials/retrieve_login_credentials/).
* To do this, call up **https://*<DNS-Name_of_your_IAM-Keycloak_Server>*/** in the address field of your Internet browser, e.g: *<https://node-65e84464310368a571551616.ps-xaas.io>*

# Step 1

Using the access data previously received in CloudHub, log into the Keycloak under "Administration Console" and click on "Create realm" in the dropdown in the top left-hand corner.

{{< img src="1.jpg" alt="Project" >}}

Under “Realm name” we enter a name and confirm with “Create”. The realm (top left) is then automatically changed to the newly created realm.

# Step 2
Go to “Clients” in the menu and click “Create client”.

{{< img src="2.png" alt="create client 1" >}}

- Select “OpenID Connect” and set a Client ID.
- Press “Next” and activate “Client authentication”.
- Press “Next” again and fill “Valid redirect URIs” with http://localhost:8000 and http://localhost:18000. This is used by kubelogin as a callback when we login with kubectl so a browser window can be opened for us to authenticate with keycloak.

# Step 3
Go to “Users” and press the “Add user” button. All fields must be filled in accordingly. Then press “Create”. Keep in mind that you may have to verify the email or just set it to verified in Keycloak. Otherwise the authentication workflow will not work.

{{< img src="3.png" alt="create user 1" >}}

Select the “Credentials” tab and click on “Set password” and define a password. Then confirm with “Save”.

{{< img src="4.jpg" alt="create user 3" >}}

# Step 4
Activate 2FA for the realm: Also click on “Authentication” in the menu in Keycloak.

{{< img src="5.png" alt="activate 2fa" >}}

There go to “browser”. This is conveniently the default flow for the clients. There, “Browser - Conditional OTP” should be set from Conditional to “Required”.

{{< img src="6.png" alt="activate 2fa 2" >}}

# Step 5

Install the kubectl plugin oidc-login. We highly recommend the krew installation tool, which also makes other plugins easily available.
```
kubectl krew install oidc-login
```

The response should look something like this:
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

# Step 6

Then prepare a kubeconfig for later use:
```
cp ~/path/to/kubeconfig ~/.kube/config-oidc
```

Modify the configuration of ~/.kube/config-oidc as follows:
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

To test our OIDC-based authentication, the context shoot--project--mycluster of ~/.kube/config-oidc is used in a later step. For now, continue to use the configuration ~/.kube/config with administration rights for your cluster.

# Configure the Shoot Cluster

Modify the shoot cluster YAML as follows, using the client ID and the domain (as issuer) from the settings of the client application you created in Keycloak:

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

This change of the Shoot manifest triggers a reconciliation. Once the reconciliation is finished, your OIDC configuration is applied. It doesn’t invalidate other certificate-based authentication methods. Wait for Gardener to reconcile the change.

In Keycloak, you created a user with a verified email address, test@test.com in our example. For simplicity, we authorize a single user identified by this email address with the cluster role view:

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

As administrator, apply the cluster role binding in your shoot cluster.

# Verify the Result

To step into the shoes of your user, use the prepared kubeconfig file ~/.kube/config-oidc, and switch to the context that uses oidc-login:
```
cd ~/.kube
export KUBECONFIG=$(pwd)/config-oidc
kubectl config use-context `shoot--project--mycluster`
```

kubectl delegates the authentication to plugin oidc-login the first time the user uses kubectl to contact the API server, for example:
```
kubectl get all
```

The plugin opens a browser for an interactive authentication session with Keycloak, and in parallel serves a local webserver for the configured callback.

Enter your login credentials.

{{< img src="7.jpg" alt="test login 2" >}}

If you've done everything correctly, you should get a successful response from the API server:

{{< img src="8.jpg" alt="test login 3" >}}

```
Opening in existing browser session.
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   100.64.0.1   <none>        443/TCP   86m
```

> **Note:** After a successful login, kubectl uses a token for authentication so that you don’t have to provide user and password for every new kubectl command. How long the token is valid can be configured. If you want to log in again earlier, reset plugin oidc-login:

    Delete directory ~/.kube/cache/oidc-login.
    Delete the browser cache.


# Further security measures for your cluster

In addition to using 2FA we recommend you regularly rotate your Gardener token you use in order log in to the dashboard. To do so just open your Gardener dashboard and navigate to "Members" on the left hand side menu bar. Then under "Service Accounts" identify the account you want to reset the roles of. To rotate the token simply press "Reset Service Account" (the rotating arrow symbol) of the according account.
