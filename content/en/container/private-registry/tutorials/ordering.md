---
title: "Ordering Process"
linkTitle: "Ordering Process"
type: "docs"
weight: 20
date: 2023-03-14
---



### Customer portal

You always start in our [customer portal](https://customerservice.plusserver.com)

### Select Private Registry

First navigate to Cloud Services / Private Registry.

![Selection Cloud Service Private Registry](/images/content/04-mls/en/private_registry/ordering/1-cloud_service_priv_reg.png)

### Select the service type

Select Harbor here.

![Selection DBaaS](/images/content/04-mls/en/private_registry/ordering/2-cloud_service_priv_reg-type.png)

### Select the Nodesize

Now select the size or performance. You do not yet know what performance you need? Then select the smallest node and scale up later if necessary

![Selection Nodesize](/images/content/04-mls/en/private_registry/ordering/3-cloud_service_priv_reg-size.png)

### Select storage size

You always start with at least 50GB memory for your data.

![Select storage size](/images/content/04-mls/en/private_registry/ordering/4-cloud_service_priv_reg-storage.png)

### Determine your trusted sources

The service is accessible via a public IP. As this is freely available from the Internet and could potentially be "attacked" by anyone, we intially block all access to the service. The mere protection provided by an encrypted connection with a user name and password is not sufficient. It is therefore necessary to specify the trusted sources from which the DBaaS should be accessible
You must enable access from one or more external addresses or address ranges here. Ideally, only the one IP from which the service is used is enabled here. In this example IP 123.123.123.123/32 and subnet 222.222.222.128/28 will be added to the trusted sources.

![Setting up external access](/images/content/04-mls/en/private_registry/ordering/5-selection-trusted-sources.png)

### Select the region

Here you can select the [region](../../documentation/az/) where the harbor instance gets deployed.

![Selecting the region](/images/content/04-mls/en/private_registry/ordering/6-selection_region.png)

### Select billing profile

Are you a new Plusserver customer and do not yet receive an invoice? Then select *New billing profile*. If you are already a customer, you can choose from existing billing profiles on which you will receive future invoices for the service instance.

![Select invoice profile](/images/content/04-mls/en/private_registry/ordering/7-selection-invoice-profile.png)

### Place the order

Please check the data you have entered in the summary. Please read the terms and conditions and agreements and confirm them. Only then can you complete the order by clicking on ***order now***

![Order summary](/images/content/04-mls/en/private_registry/ordering/8-order-overview.png)

### Track order status

You will be redirected to [Order status](https://customerservice.plusserver.com/order-status) immediately after placing your order. You can view the status of current orders here at any time.

* new: Status directly after the order
* processing: Status as soon as automatic provision has started
* failed: Unfortunately something has gone wrong, please open a [ticket](https://customerservice.plusserver.com/support/ticket-create) here in the portal so that we can help you as quickly as possible.
* DONE: Congratulations, your DBaaS instance is available

![Order successfully completed](/images/content/04-mls/en/private_registry/ordering/10-order_status.png)
