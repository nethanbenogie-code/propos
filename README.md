# MLEA POS v6

![Version](https://img.shields.io/badge/version-v6.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![Platform](https://img.shields.io/badge/platform-web-orange)
![Offline First](https://img.shields.io/badge/offline-first-green)
![PWA](https://img.shields.io/badge/PWA-enabled-purple)
![Firebase](https://img.shields.io/badge/firebase-integrated-yellow)
![BIR Ready](https://img.shields.io/badge/BIR-ready-red)

## Overview

MLEA POS is an offline-first retail management platform built for Philippine businesses.

Designed to operate reliably with or without internet connectivity, MLEA POS combines Point of Sale operations, inventory control, customer management, BIR compliance tools, cloud synchronization, and advanced recovery systems into a single platform.

The goal is simple:

> Keep the store running, even when everything else fails.

---

# Core Features

## Point of Sale

* Fast cashier interface
* Receipt printing
* Cash payments
* Card payments
* Split payments
* Discounts
* Returns and refunds
* Void transactions with audit logging
* Automatic OR generation

---

## Inventory Management

* Product catalog
* Categories
* Suppliers
* Stock adjustments
* Inventory receiving
* Purchase Orders
* Low stock monitoring
* Inventory history

---

## Customer & Loyalty

* Customer profiles
* Loyalty points
* Purchase history
* Rewards tracking
* Customer analytics

---

## User Management

### Roles

* Administrator
* Manager
* Cashier

### Security

* Salted SHA-256 PIN hashing
* Automatic plaintext PIN migration
* Session timeout
* Audit logging
* Emergency PIN reset tools
* Firebase Authentication support

---

# Philippine BIR Compliance

MLEA POS includes built-in Philippine retail reporting tools.

### Supported

* Official Receipt Numbering
* VAT Sales
* VAT Exempt Sales
* Zero-Rated Sales
* X Reading
* Z Reading
* Grand Accumulated Total (GAT)
* BIR Sales Book
* Monthly VAT Reporting
* CSV Export

---

# Offline First Architecture

MLEA POS is designed to continue operating even when internet connectivity is unavailable.

### Storage Layers

* IndexedDB
* Local Storage Fallback
* Firebase Cloud Sync

### Sync Features

* Offline transaction queue
* Automatic synchronization
* Queue monitoring
* Cloud recovery

---

# Reliability Features

## Crash Recovery

Automatically restores:

* Active cart
* Pending transactions
* Unsaved operations

after unexpected browser crashes.

---

## Data Integrity Checker

Scans the entire system for:

* Duplicate OR numbers
* GAT mismatches
* Negative stock
* Duplicate IDs
* Unhashed PINs
* Data inconsistencies

---

## Storage Resync

Repair tools for:

* Local Storage → IndexedDB
* IndexedDB → Local Storage

Useful after migrations or browser issues.

---

## OR Counter Repair

Automatically rebuilds receipt counters using:

Maximum OR Found + 1

to prevent numbering corruption.

---

## GAT Recalculation

Rebuilds Grand Accumulated Total directly from sales records.

Includes:

* Preview Mode
* Apply Mode
* Audit Logging

---

## Orphan Record Detection

Finds broken references between:

* Sales
* Products
* Customers
* Users
* Purchase Orders

Records are repaired safely without deleting historical data.

---

# Developer Maintenance Console

MLEA POS includes an internal developer support console.

### Tools

#### Data Integrity Check

Detects:

* Duplicate ORs
* Negative stock
* GAT inconsistencies
* Broken references

#### OR Counter Repair

Repairs OR sequence issues.

#### GAT Recalculation

Rebuilds accumulated sales totals.

#### Storage Resync

Repairs storage synchronization issues.

#### Orphan Cleanup

Repairs broken references safely.

#### Emergency PIN Reset

Administrative PIN recovery tool.

#### Raw Store Inspector

Read-only JSON inspection with PIN redaction.

#### System Information

Displays:

* Storage Mode
* IndexedDB Status
* Online Status
* Queue Depth
* Record Counts
* GAT Status

---

# Audit Logging

All critical operations are logged.

Examples:

* Login Success
* Login Failure
* Developer Console Access
* PIN Reset
* Inventory Changes
* OR Repairs
* GAT Repairs

Logs include:

* Timestamp
* User
* Action
* Result

---

# Technology Stack

* HTML5
* CSS3
* Vanilla JavaScript
* IndexedDB
* Firebase Authentication
* Firebase Firestore
* Firebase Functions
* Progressive Web App (PWA)

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/mlea-pos.git
```

Open:

```text
mlea-pos-v6.html
```

in a modern browser.

Recommended:

* Google Chrome
* Microsoft Edge

---

# Roadmap

## Planned Features

### Retail Operations

* Multi-Branch Analytics
* Inventory Transfers
* Purchase Forecasting
* Supplier Performance Tracking

### Security

* PBKDF2 PIN Storage
* Hardware Security Keys
* Enhanced Audit Trails

### Platform

* Modular Architecture
* Automated Health Monitoring
* Event Ledger System
* Real-Time Cloud Monitoring

### Payments

* QR Payments
* E-Wallet Integration
* Digital Receipts

---

# Project Status

Current Stage:

### Retail Platform Foundation

Implemented:

* POS Engine
* Inventory Engine
* Customer Engine
* Loyalty Engine
* BIR Compliance Engine
* Offline Sync Engine
* Recovery Engine
* Developer Maintenance Console

Future Goal:

Build a complete retail operations platform capable of supporting single-store and multi-branch businesses with enterprise-grade reliability.

---

# License

Copyright © 2026 MLEA POS

All Rights Reserved.

This software is proprietary and may not be copied, modified, distributed, or resold without written permission from the author.

---

# Author

MLEA POS Development

Philippines

Built for reliability, recoverability, and real-world retail operations.
