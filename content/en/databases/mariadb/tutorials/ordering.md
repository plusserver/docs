---
title: "Ordering Process"
linkTitle: "Ordering Process"
type: "docs"
weight: 20
date: 2023-03-14
---

> Note: Below, MariaDB is exemplified. However, the process applies equally to the other DBaaS types.

### Customer portal

You always start in our [customer portal](https://customerservice.plusserver.com)

### Selection Databases

First navigate to Cloud Services / Databases.

![Selection Cloud Service DBaaS](/images/content/04-msl/en/databases/ordering/1-cloud_service_databases.png)

### Selection Database Type

Select your desired DBaaS.

![Selection DBaaS](/images/content/04-msl/en/databases/ordering/2-selection-database-type.png)

### Selection Nodesize

Now select the size or performance. You do not yet know what performance you need? Then select the smallest node and scale up later if necessary

![Selection Nodesize](/images/content/04-msl/en/databases/ordering/3-selection-node-size.png)

### Selection of the storage size

You always start with at least 50GB memory for your data. 

![Select storage size](/images/content/04-msl/en/databases/ordering/4-select-storage-size.png)

### Enabling access

The service is accessible via a public IP. As this is freely available from the Internet and could potentially be "attacked" by anyone, we intially block all access to the service. The mere protection provided by an encrypted connection with a user name and password is not sufficient. It is therefore necessary to specify the trusted sources from which the DBaaS should be accessible
You must enable access from one or more external addresses or address ranges here. Ideally, only the one IP from which the service is used is enabled here. In this example IP 123.123.123.123/32 and subnet 222.222.222.128/28 will be added to the trusted sources.

![Setting up external access](/images/content/04-msl/en/databases/ordering/5-selection-trusted-sources.png)

### Selecting the region

Here you can select the [region](https://docs.xaas.get-cloud.io/docs/01-dbaas/02-faq/#Regions) in which the service is to be provided. 

![Selecting the region](/images/content/04-msl/en/databases/ordering/6-selection_region.png)

### Selection of the billing profile

Are you a new Plusserver customer and do not yet receive an invoice? Then select *New billing profile*. If you are already a customer, you can choose from existing billing profiles and will receive the new DBaaS on an existing invoice, which you must then select.

![Select invoice profile](/images/content/04-msl/en/databases/ordering/7-selection-invoice-profile.png)

### Place the order

Please check the data you have entered in the summary. Please read the terms and conditions and agreements and confirm them. Only then can you complete the order by clicking on ***order now***

![Order summary](/images/content/04-msl/en/databases/ordering/8-order-overview.png)

### Track order status

You will be redirected to [Order status](https://customerservice.plusserver.com/order-status) immediately after placing your order. You can view the status of current orders here at any time.

* new: Status directly after the order
* processing: Status as soon as automatic provision has started
* failed: Unfortunately something has gone wrong, please open a [ticket](https://customerservice.plusserver.com/support/ticket-create) here in the portal so that we can help you as quickly as possible.
* DONE: Congratulations, your DBaaS instance is available

![Order successfully completed](/images/content/04-msl/en/databases/ordering/10-order_status.png)
