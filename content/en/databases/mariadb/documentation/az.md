---
title: "Regions and AZ's"
linkTitle: "Regions and AZ's"
type: "docs"
---


### Regions and availability zones (AZ)

PlusServer offers multiple regions and availability zones (AZs) to provide customers with high availability and disaster recovery options. Each AZ consists of one or more data centers designed to be independent of each other and provide redundancy in the event of outages or disasters. AZs within a region offer the advantage of low network latency between them. Customers can choose to deploy their resources in one or more AZs for high availability and disaster recovery.

#### Region

A region is a geographical area consisting of several isolated and spatially separated, i.e. redundant, AZs.

##### Requirements

* Consists of several isolated and spatially separated AZs within a geographical area.
* The distance between the regions is >=300 km.

##### Example

* DE-WEST

#### Availability zone (AZ)?

An Availability Zone (AZ) is a site within a region that consists of one or more data centers designed to be independent of each other and provide redundancy in the event of outages or disasters. AZs within a region offer the advantage of low network latency between them. Customers can deploy their resources in one or more AZs for high availability and disaster recovery.

##### Requirements

* Located within a region and consists of one or more data centers with at least one common power, network and cooling supply.
* One data center is always independent of another (especially in the areas of power [feed, distribution, UPS, emergency power], network [feed, routers, switches], cooling and building).
* The latency time between the AZs within the same region is <=2ms.

##### Example

* DE-NORTH-1
* DE-WEST-2

#### Plus server regions and AZ list {#Regionlist}

The following table lists the regions and AZs offered by PlusServer:

| Region | Availability Zone | Location |
|----------|-------------------|------------------------|
| DE-NORTH | DE-NORTH-1 | Hamburg, Germany |
| | DE-NORTH-2 | Hamburg, Germany |
| DE-WEST | DE-WEST-1 | Cologne, Germany |
| | DE-WEST-2 | Düsseldorf, Germany