---
title: "Netzwerk"
type: "docs"
weight: 30
date: 2023-03-10
---

# Öffentliche IPs

pluscloud open bietet zwei Arten von öffentlichen IP-Adressen, die verwendet werden können, um von externen Standorten aus auf Ihre virtuellen Maschinen (VM) zuzugreifen oder um Internetdienste zu nutzen.

## Floating IP

{{% alert title="Hinweis" color="info" %}}
Es ist wichtig zu beachten, dass die Floating-IP-Adresse auf der VM selbst nicht sichtbar ist, da die Adressumsetzung auf der Netzwerkschicht erfolgt, bevor die Datenpakete die VM erreichen.
{{% /alert %}}

Dies sind öffentliche IPv4-Adressen, die Ihren VMs in pluscloud open zugewiesen werden können. Einmal zugewiesen, können Sie die Floating IP-Adresse nutzen, um Ihre VMs aus dem Internet zu erreichen. Die Floating IP ist an die VM gebunden. Über Network Address Translation (NAT) wird zwischen der privaten (lokalen) IP-Adresse der VM und der öffentlichen IP-Adresse übersetzt. Dadurch ist es möglich, auf Ihre VMs zuzugreifen, ohne eine öffentliche IP-Adresse auf der VM selbst konfigurieren zu müssen. Die Floating IP-Adresse kann bei Bedarf von einer VM gelöst und einer anderen VM zugewiesen werden.

## Router IP

pluscloud open stellt auch eine öffentliche IP-Adresse zur Verfügung, die von allen VMs verwendet werden kann, die an einen Router angeschlossen sind, um auf das Internet zuzugreifen. Dies ist nützlich für Fälle, in denen Sie keinen externen Zugriff auf Ihre VMs benötigen, diesen aber den Zugang zum Internet ermöglichen wollen. Der gesamte Datenverkehr der an den Router angeschlossenen VMs wird über Source Network Address Translation (SNAT) derselben öffentlichen IP-Adresse zugewiesen, sofern den VMs keine Floating IP zugewiesen wurde. Wenn einer VM eine Floating IP zugewiesen ist, verwendet sie die Floating IP-Adresse für den externen Zugriff anstelle der Router-IP-Adresse.

# Sicherheitsgruppen

pluscloud open bietet Sicherheitsgruppen an, um Kunden die Möglichkeit zu geben, Firewall-Regeln für ihre virtuellen Maschinen (VMs) zu definieren. Diese Regeln können für jede VM angepasst und auf der Grundlage verschiedener Protokolle, Ports und Kommunikationsrichtungen konfiguriert werden.

Die Standard-Sicherheitsgruppe erlaubt den gesamten ausgehenden Datenverkehr und ermöglicht den SSH-Zugriff auf die VM. Eingehender Datenverkehr ist jedoch standardmäßig verboten, mit Ausnahme des Datenverkehrs von Systemen in derselben Sicherheitsgruppe. Dadurch wird sichergestellt, dass jeder eingehende Datenverkehr explizit zugelassen werden muss, bevor er möglich ist, um unberechtigten Zugriff von außerhalb des Netzwerks zu verhindern.

Sicherheitsgruppen werden für den Datenverkehr, der das Software Defined Network (OVN/OVS) durchläuft, durchgesetzt, unabhängig von der tatsächlichen Quelle oder dem Ziel des Datenverkehrs. Außerdem können Sicherheitsgruppen für mehrere VMs verwendet werden.

{{% alert title="Hinweis" color="info" %}}
Beachten Sie, dass der SSH-Zugriff in der Standard-Sicherheitsgruppe aktiviert ist. Es ist daher wichtig, die Regeln der Sicherheitsgruppe zu überprüfen und anzupassen, um das gewünschte Sicherheitsniveau für Ihre VMs zu gewährleisten.
{{% /alert %}}