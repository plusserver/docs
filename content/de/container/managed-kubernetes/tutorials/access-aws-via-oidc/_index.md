---
title: "Zugriff auf AWS mit OIDC"
linkTitle: "Zugriff auf AWS mit OIDC"
type: "docs"
weight: 20
date: 2025-06-16
---

## Einführung

Dieses Tutorial beschreibt, wie Sie Ihren Shoot Kubernetes Cluster für den sicheren Zugriff auf AWS-Ressourcen
einrichten, indem Sie Ihren API-Server so konfigurieren, dass er als OIDC-Provider für AWS fungiert.
Danach können Sie einen ServiceAccount mit automatisch rotierenden Token erstellen, um auf
AWS-Ressourcen zuzugreifen. Am Ende des Tutorials wird exemplarisch der Zugriff auf den AWS Parameter Store demonstriert.

## Konfiguration

In den folgenden Schritten werden der Kubernetes API-Server und die AWS Account ID häufig referenziert. Es wird empfohlen, sie als Variablen zu setzen.

```bash
export API_SERVER="api.shoot.project.internal.prod.gardener.get-cloud.io"
export AWS_ACCOUNT_ID="nnnnnnnnnnnnnn"
```

### Shoot Konfiguration

Der API-Server Ihres Shoots dient bereits als OIDC-Provider. Allerdings nur für interne Ressourcen. Jeder Shoot ist mit einer eigenen privaten Root-CA ausgestattet, die nur dem Cluster selbst bekannt ist. Die folgenden Schritte
erlauben den Zugriff auf OpenID Connect spezifische URLs, so dass diese von AWS genutzt werden können.

In der Spezifikation Ihres Shoot muss anonyme Authentifizierung aktiviert werden:

```bash
  enableAnonymousAuthentication: true
```

Danach brauchen wir noch eine Clusterrolle und eine Clusterrollenbindung, um den Zugriff zu ermöglichen:

```bash
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: allow-anon-openid
rules:
- nonResourceURLs:
  - "/.well-known/openid-configuration"
  - "/openid/v1/jwks"
  verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: allow-anon-openid
subjects:
- kind: User
  name: system:anonymous
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: allow-anon-openid
  apiGroup: rbac.authorization.k8s.io
```

Jetzt spielen wir das Manifest ein. Danach sollten über Curl die folgenden Links erreichbar sein:

* https://$API_SERVER/.well-known/openid-configuration
* https://$API_SERVER/openid/v1/jwks

{{% alert title="Note" color="info" %}}
Das Feature Anonymous Requests ist bereits deprecated, wird aber noch eine Weile funktionieren. Ab Kubernetes 1.32 wird das Feature
[Anonymous Authenticator Configuration](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#anonymous-authenticator-configuration) zur Verfügung stehen, welches künftig benutzt werden sollte.
{{% /alert %}}

### AWS Konfiguration

Zunächst müssen wir den Daumenabdruck des API-Server-Zertifikats vom Shoot abrufen, da es von einer Gardener-internen Zertifizierungsstelle signiert ist. Damit AWS diesem Zertifikat vertraut, müssen wir den Daumenabdruck des Zertifikats angeben.

```bash
THUMBPRINT=$(openssl s_client -servername ${API_SERVER} -showcerts -connect ${API_SERVER}:443 < /dev/null 2>/dev/null | openssl x509 -fingerprint -noout -sha1 | cut -d'=' -f2 | sed -e "s/://g")
```

Dann müssen wir eine OIDC Provider Ressource in AWS erstellen, die auf unseren Shoot verweist:

```bash
aws iam create-open-id-connect-provider \
  --url https://${API_SERVER} \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list ${THUMBPRINT}
```

```bash
aws iam list-open-id-connect-providers
{
    "OpenIDConnectProviderList": [
        {
            "Arn": "arn:aws:iam::AWS_ACCOUND_ID:oidc-provider/API_SERVER"
        }
    ]
}
```

Nun brauchen wir noch eine Policy:

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${API_SERVER}"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "${API_SERVER}:sub": "system:serviceaccount:default:aws-parameter-reader"
                }
            }
        }
    ]
}
```

Und eine AWS Rolle:

```bash
aws iam create-role --role-name KubernetesParameterStoreRole \
  --assume-role-policy-document file://trust-policy.json
```

Jetzt verbinden wir die Rolle mit der Policy:

```bash
aws iam attach-role-policy --role-name KubernetesParameterStoreRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess
```

Das war's für die AWS Seite.

## Beispiel: Zugriff auf den AWS Parameter Store

Zunächst brauchen wir einen ServiceAccount, der mit der AWS-Rolle verbunden ist:

```bash
apiVersion: v1
kind: ServiceAccount
metadata:
  name: aws-parameter-reader
  namespace: default
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::$AWS_ACCOUNT_ID:role/KubernetesParameterStoreRole
```

Nun erstellen wir einen Pod, der diesen ServiceAccount verwendet. Außerdem verwenden wir die Funktion „Projected Volume“, um diesen ServiceAccount über ein automatisch rotierendes Token zu nutzen:

```bash
apiVersion: v1
kind: Pod
metadata:
  name: aws-test
spec:
  serviceAccountName: aws-parameter-reader
  containers:
  - name: aws-cli
    image: amazon/aws-cli
    command:
    - "sleep"
    - "1800"
    env:
      - name: AWS_REGION
        value: "eu-central-1"
    volumeMounts:
    - name: aws-token
      mountPath: /var/run/secrets/eks.amazonaws.com/serviceaccount
      readOnly: true
  volumes:
  - name: aws-token
    projected:
      sources:
      - serviceAccountToken:
          audience: sts.amazonaws.com
          expirationSeconds: 3600
          path: token
```

Nach ein paar Sekunden sollte der Container mit dem Namen aws-test laufen.

Gehen Sie in den Container:

```bash
kubectl exec -ti aws-test -- bash
```

Nun temporäre Zugriffscredentials anfordern:

```bash

aws sts assume-role-with-web-identity --role-arn arn:aws:iam::$AWS_ACOUNT_ID:role/KubernetesParameterStoreRole  --role-session-name test-session --web-identity-token "$(cat /var/run/secrets/eks.amazonaws.com/serviceaccount/token)"
```

Wenn alles geklappt hat, dann gibt es eine JSON Antwort mit **AccessKeyId**, **SecretAccessKey** und **SessionToken**.

Damit können wir nun auf den AWS Parameter Store zugreifen:

```bash
export AWS_ACCESS_KEY_ID="<AccessKeyId>"
export AWS_SECRET_ACCESS_KEY="<SecretAccessKey>"
export AWS_SESSION_TOKEN="SessionToken"

aws sts get-caller-identity
{
    "UserId": "ARONNNNTJ4IJAYEHS6KGR:test-session",
    "Account": "AWS_ACCOUNT_ID",
    "Arn": "arn:aws:sts::AWS_ACCOUNT_ID:assumed-role/KubernetesParameterStoreRole/test-session"
}

aws ssm get-parameter --name /demo/demo/image-id
{
    "Parameter": {
        "Name": "/demo/demo/image-id",
        "Type": "String",
        "Value": "ami-05684a9a654fccef1",
        "Version": 1,
        "LastModifiedDate": "2025-03-12T10:37:52.878000+00:00",
        "ARN": "arn:aws:ssm:eu-central-1:AWS_ACCOUNT_ID:parameter/demo/demo/image-id"
    }
}
```

## Referenzen

* [Shoot spec](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml#L230)
* [Enable IAM Roles for Service Accounts (IRSA) on the EKS cluster](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM-service-accounts.html)
* [Create an OpenID Connect (OIDC) identity provider in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
