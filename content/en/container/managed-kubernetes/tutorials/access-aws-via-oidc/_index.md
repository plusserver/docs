---
title: "Access AWS via OIDC"
linkTitle: "Access AWS via OIDC"
type: "docs"
weight: 20
date: 2025-06-16
---

## Introduction

This tutorial shows you how setup your Shoot Kubernetes Cluster to access AWS resources
in a secure manner by configuring your API-Server to act as an OIDC-Provider for AWS.
Having that, you can create a ServiceAccount with automatically rotated tokens to access
AWS resources. Here you will find an example to get data from the AWS parameter store.


## Configurarion


In the following steps we will refer to the following two resources. You may want to set them up
as variables in your code.

```bash
export API_SERVER="api.shoot.project.internal.prod.gardener.get-cloud.io"
export AWS_ACCOUNT_ID="nnnnnnnnnnnnnn"
```

### Shoot Configuration

Your Shoot's API server already acts as an OIDC-Provider. However, only for internal resources. Every Shoot is
configured with an own private Root-CA that is only known to the cluster itself. The following steps will
allow access to OpenID Connect specific URLs so that they can be used by AWS.

In your Shoot's spec you need to activate anonymous authentication:

```bash
  #   enableAnonymousAuthentication: false
  ```

Having that, you need to create cluster role and a cluster role binding to allow access:

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

Apply this manifest. Then you should be able to access the following links via Curl:

* https://$API_SERVER/.well-known/openid-configuration
* https://$API_SERVER/openid/v1/jwks


### AWS Configuration

First, we need to get the thumb to the Shoot's API-Servers certificate, because it is signed by an Gardener internal CA. AWS will trust that certificate if we use the certificate's thumb.

```bash
THUMBPRINT=$(openssl s_client -servername ${API_SERVER} -showcerts -connect ${API_SERVER}:443 < /dev/null 2>/dev/null | openssl x509 -fingerprint -noout -sha1 | cut -d'=' -f2 | sed -e "s/://g")
```

Then we need to create an OIDC provider resource in AWS that points to our Shoot:

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

Create an AWS policy:

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

Create an AWS role:

```bash
aws iam create-role --role-name KubernetesParameterStoreRole \
  --assume-role-policy-document file://trust-policy.json
```

And attach the policy:

```bash
aws iam attach-role-policy --role-name KubernetesParameterStoreRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess
```

## Example: Access AWS Parameter Store

First, we need a Kubernetes ServiceAccount that is linked to the role above:

```bash
apiVersion: v1
kind: ServiceAccount
metadata:
  name: aws-parameter-reader
  namespace: default
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::$AWS_ACCOUNT_ID$:role/KubernetesParameterStoreRole
```

Create a Pod that uses this ServiceAccount. Also, we use projected volume feature to use this ServiceAccount via an automatically rotated token:

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

After some seconds you should have running container withe the name aws-test.

Go into the container:

```bash
kubectl exec -ti aws-test -- bash
```

And get temporary access credentials for AWS:

```bash

aws sts assume-role-with-web-identity --role-arn arn:aws:iam::$AWS_ACOUNT_ID$:role/KubernetesParameterStoreRole  --role-session-name test-session --web-identity-token "$(cat /var/run/secrets/eks.amazonaws.com/serviceaccount/token)"
```

If everything works correctly you should get a JSON answer that contains the fields **AccessKeyId**, **SecretAccessKey** and **SessionToken**.

With those credentials you are now able to access the AWS Parameter store like this:

```bash
export AWS_ACCESS_KEY_ID="<AccessKeyId>"
export AWS_SECRET_ACCESS_KEY="<SecretAccessKey>"
export AWS_SESSION_TOKEN="SessionToken"

aws sts get-caller-identity
{
    "UserId": "ARONNNNTJ4IJAYEHS6KGR:test-session",
    "Account": "AWS_ACCOUNT_ID$",
    "Arn": "arn:aws:sts::AWS_ACCOUNT_ID$:assumed-role/KubernetesParameterStoreRole/test-session"
}

aws ssm get-parameter --name /amachowiak/cronjobserver/image-id
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

## References

* [Shoot spec](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml#L230)
* [Enable IAM Roles for Service Accounts (IRSA) on the EKS cluster](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-enable-IAM-service-accounts.html)
* [Create an OpenID Connect (OIDC) identity provider in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
