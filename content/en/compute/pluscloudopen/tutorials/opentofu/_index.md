---
title: "OpenTofu Tutorial"
linkTitle: "OpenTofu Tutorial"
type: "docs"
weight: 4
date: 2023-02-21
description: >
   Tutorial on using OpenTofu with the pluscloud open
---

## Generelles

OpenTofu is currently still "one hundred percent" compatible with Terraform, so all you need to do is replace terraform with tofu.

in example:

```bash
terraform init
terraform apply
terraform destroy
...
```

vs.

```bash
tofu init
tofu apply
tofu destroy
...
```

This means that, apart from the commands the [Terraform Tutorials](../terraform/) can be used.
