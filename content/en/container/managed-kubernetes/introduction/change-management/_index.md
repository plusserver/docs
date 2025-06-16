---
title: "Change-Management"
linkTitle: "Change-Management"
type: "docs"
weight: 60
date: 2025-06-16
---

## Fixing CVEs and updates in the PSKE environment?
Security vulnerabilities identified as Common Vulnerabilities and Exposures (CVEs) are fixed promptly. As soon as a corresponding fix is made available by the SAP Gardener project – i.e. from the upstream source – it is integrated into the system and rolled out.

- Major functional or version changes, such as major and minor upgrades or new features, are released as part of new PSKE versions (Plusserver Kubernetes Engine). These versions undergo extensive testing to ensure stability and compatibility before they are made available to customers.

- Customers are informed of upcoming major upgrades in good time via the [Plusserver status page](https://status.plusserver.com/). In addition, you can get an overview of upcoming updates and releases at any time in the official [release plan](https://docs.plusserver.com/de/container/managed-kubernetes/introduction/release-plan/).


## When can a security vulnerability (CVE) not be closed?
In certain cases, it is not possible to close a known security vulnerability, also known as a Common Vulnerability and Exposure (CVE),
in a timely manner or at all. This can be the case for several reasons:

- Reaching the end of life (EOL) of a Kubernetes version
When the affected Kubernetes version reaches the end of its official life cycle (end of life, EOL),
it will no longer receive security updates or bug fixes from the community or the upstream project.
In such cases, the vulnerability can only be closed by upgrading to a supported version.
This may not be possible immediately.

- No fix available from upstream (e.g. SAP Gardener):
A vulnerability cannot be closed if no official patch has yet been provided by the upstream project, in this case SAP Gardener.
Even if the problem is known, it may take some time before a stable and tested fix is available.

- A patch may cause a breaking change or potential instability.
It may happen that an available patch theoretically fixes the vulnerability but at the same time introduces serious changes to the system.
If this so-called ‘breaking change’ risks negatively affecting the stability or functionality of the platform, 
it may be decided not to release the patch at this time. Instead, a risk mitigation measure can be taken or 
the fix can be scheduled for a regular update. Once extensive testing has been completed, the fix can be scheduled for a regular update.