---
title: "OpenTofu Tutorial"
linkTitle: "OpenTofu Tutorial"
type: "docs"
weight: 4
date: 2023-02-21
description: >
   Tutorial zur Nutzung von OpenTofu mit der pluscloud open
---

## Generelles

OpenTofu ist derzeit noch "hundertprozentig" kompatible zu Terraform es genügt also einfach terraform durch tofu zu ersetzen.

zum Beispiel:

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

Es können also bis auf die commands die [Terraform Tutorials](../terraform/) genutzt werden.
