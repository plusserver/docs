---
title: "Edge configuration for external Firewall"
linkTitle: "Edge configuration for external Firewall"
type: "docs"
weight: 50
date: 2024-08-07
description: >
    Konfigurieren eines VMware Edge Gateways zum Weiterleiten des gesamten Datenverkehrs an eine Firewall-VM
---

Eine Möglichkeit, den Datenverkehr in Ihrer privaten Cloud zu filtern, besteht darin, den gesamten Datenverkehr an eine Firewall weiterzuleiten, die dies übernimmt. Diese Firewall kann als VM bereitgestellt werden.

Um ein VMware Edge Gateway so zu konfigurieren, dass der gesamte Datenverkehr an eine Firewall in einer VM weitergeleitet wird (also das Edge Gateway im Prinzip "auf Durchzug" gestellt wird), müssen Sie einige spezifische Schritte befolgen. Dies umfasst die Konfiguration von Netzwerkregeln und eventuell das Deaktivieren der Edge Gateway Firewall-Funktionalität. Hier sind die allgemeinen Schritte, die Sie befolgen können:

## Schritt 1: Konfigurieren Sie die Edge Gateway-Firewall

1. Melden Sie sich bei vCloud Director an.
2. Navigieren Sie zu dem Edge Gateway, das Sie konfigurieren möchten.
3. Gehen Sie zu den Firewall-Einstellungen des Edge Gateways.
4. Erstellen Sie Regeln, um den gesamten Datenverkehr mit der Firewall an die VM weiterzuleiten. Normalerweise geschieht dies durch Erstellen einer „Alles zulassen“-Regel für eingehenden und ausgehenden Datenverkehr.

   - **Quelle:** Any
   - **Ziel:** Any
   - **Dienst:** Any
   - **Aktion:** Allow

## Schritt 2: NAT-Regeln konfigurieren (falls nötig)

1. Wenn Sie NAT verwenden, stellen Sie sicher, dass die NAT-Regeln richtig konfiguriert sind, um den Datenverkehr an die interne Firewall-VM weiterzuleiten.
2. Konfigurieren Sie die SNAT- und DNAT-Regeln entsprechend, um den Datenverkehr richtig weiterzuleiten.

## Schritt 3: Statische Routen konfigurieren

1. Gehen Sie zu den Routing-Einstellungen des Edge Gateways.
2. Fügen Sie eine statische Route hinzu, die den Datenverkehr an die interne Firewall-VM weiterleitet.
   - **Zielnetzwerk**
   - **Gateway:** IP-Adresse der internen Firewall-VM

## Schritt 4: Deaktivieren der Edge Gateway Firewall (optional)

1. Gehen Sie zu den Firewall-Einstellungen des Edge Gateways.
2. Löschen oder deaktivieren Sie alle Firewall-Regeln, falls dies nicht bereits durch eine "Allow all"-Regel erfolgt ist.

## Schritt 5: Konfiguration der internen Firewall-VM

1. Stellen Sie sicher, dass die Firewall-VM betriebsbereit ist und ordnungsgemäß konfiguriert wurde.
2. Konfigurieren Sie die Firewall-Regeln entsprechend Ihren Sicherheitsanforderungen.

Durch die oben genannten Schritte wird sichergestellt, dass der gesamte Datenverkehr über das Edge Gateway zur internen Firewall-VM geleitet wird, wo er weiter verarbeitet und gefiltert werden kann.
