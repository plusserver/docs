---
title: "Löschen von S3 Objekten und Buckets mit s5cmd"
linkTitle: "Löschen von S3 Objekten und Buckets mit s5cmd"
type: "docs"
weight: 30
---

{{% alert title="Wichtig" color="warning" %}}
Voraussetzung für das Tutorial: die AWS Standard Credentials des Clients müssen hinterlegt sein (# vi .aws/credentials).

{{< img src="images/image-1.png" alt="Credentials" >}}
{{% /alert %}}

Bitte laden sie sich das aktuelle s5cmd release: https://github.com/peak/s5cmd/releases/latest

```
wget  https://github.com/peak/s5cmd/releases/download/v2.2.2/s5cmd_2.2.2_Linux-64bit.tar.gz
tar -xvzf s5cmd_2.2.2_Linux-64bit.tar.gz
```

bash:

```
#!/bin/bash

AWS_PROFILE="root"
ENDPOINT_URL="https://s3.de-west-1.psmanaged.com"

# List of all buckets with s5cmd
buckets=$(s5cmd --profile $AWS_PROFILE --endpoint-url $ENDPOINT_URL ls | awk '{print $3}')
# Iterate over each bucket and delete all versions and then the bucket
for bucket in $buckets; do
    echo "Clear and delete bucket: $bucket"

    # Delete all versions in the bucket
    s5cmd --profile $AWS_PROFILE --endpoint-url $ENDPOINT_URL rm --all-versions $bucket/*

    # Delete the bucket
    s5cmd --profile $AWS_PROFILE --endpoint-url $ENDPOINT_URL rb $bucket
done

echo "All buckets have been emptied and deleted."%
```

Powershell:

```
$ENDPOINT_URL="https://s3.de-west-1.psmanaged.com"
$CREDENTIALS_FILE=".\credentials"
$S3PROFILE="root"

$BUCKETS=(.\s5cmd.exe --credentials-file .\$CREDENTIALS_FILE --endpoint-url $ENDPOINT_URL --profile $S3PROFILE ls).split() | Select-String "s3://"
Write-Host "Existing Buckets: $BUCKETS"

foreach($BUCKET in $BUCKETS){
.\s5cmd.exe --credentials-file $CREDENTIALS_FILE --endpoint-url $ENDPOINT_URL --profile $S3PROFILE rm --all-versions $BUCKET/*
.\s5cmd.exe --credentials-file $CREDENTIALS_FILE --endpoint-url $ENDPOINT_URL --profile $S3PROFILE rb $BUCKET
Write-Host "deleted $BUCKET"
}
```
