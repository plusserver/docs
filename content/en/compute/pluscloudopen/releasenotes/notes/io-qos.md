---
title: "QoS for Storage I/O"
linkTitle: "IO-QOS"
type: "docs"
date: 2024-09-06
weight: 9999
description: >
  Notes on Quality of Service enablement for storage I/O
---

## Enhancing Storage Efficiency with Quality of Service (QoS)

To continuously improve our service offerings and ensure that all customers enjoy consistent and reliable storage performance,
we are introducing Quality of Service (QoS) features for our general purpose storage solutions.

What this means for you:

- **Consistent Performance:** QoS helps ensure that your storage resources are optimized to deliver reliable performance tailored to your specific needs.
- **Fair Resource Allocation:** By implementing QoS, we prevent performance bottlenecks caused by excessive resource consumption from other workloads, ensuring that your operations run smoothly even during peak usage.
- **Optimized Efficiency:** Whether you choose our standard or premium storage tiers, QoS will help deliver the best possible experience by prioritizing your workload based on the storage class selected.

This enhancement allows us to better serve your storage needs with greater consistency and reliability, paving the way for a more efficient and balanced system that benefits all users.

## Migration phases

Activation will take place in several phases. You don't need to do anything.

### Phase 1: Rollout of new volume types

In the first phase, we will add new volume types that ship with QoS enabled. Your existing workload will be unaffected.
You can start using the new Volume Types immediately.

### Phase 2: Enable I/O QoS for new VMs

Next, all newly created VMs will start with QoS enabled. This will only affect VMs that are booted without a without a Cinder boot volume.
New VMs booted from a volume will only be affected if they are started with one of the new volume types.
Your existing workload will remain unaffected.

### Phase 3: Enable I/O QoS for new volumes

In the final phase, QoS is applied to all new volumes by default.
Your existing workload remains unaffected.

## Manual migration options

If you wish to enable QoS for your existing workload, you can change the Volume Type for your Volumes.
However, you will need to perform the following steps:

* Unmount the volume from the VM
* Change the volume type to one of the new volume types
* Reconnect the Volume to the VM
