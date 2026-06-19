# MLEA POS — BIR-Ready Point of Sale System

A multi-branch, BIR-compliant Point of Sale system for Philippine retail businesses. Built as a single-file Progressive Web App with optional Firebase cloud sync, full offline support, and tamper-evident receipts.

> **Status:** v6.0 · Single-file HTML/CSS/JS · No build step required

---

## Features

### Point of Sale
- Touch-friendly POS terminal with product search and category tabs
- Quantity editor, hold/park sale, split payment (cash + card)
- Item-level and order-level discounts
- Quick-cash buttons and change computation
- Session timeout with warning, PIN lockout after failed attempts

### BIR Compliance
- Sequential OR/SI numbering (server-atomic when online, reserved blocks when offline)
- Per-item VAT classification (VATable / VAT-exempt / zero-rated) at 12%
- Senior Citizen / PWD automatic 20% discount and VAT exemption
- Grand Accumulated Total (GAT) with controlled, logged reset
- X-Reading (shift snapshot) and Z-Reading (end-of-day)
- Sales Book and Purchases Book (RR 9-2009 columnar format)
- BIR Form 2550M monthly VAT summary
- Audit trail export for inspection
- **Receipt integrity:** SHA-256 hash + QR code on every receipt for tamper detection

### Receipts
- Thermal (80mm) and A4 formats
- Business logo upload
- Barcode (Code 128) and verification QR
- Email receipt via EmailJS

### Cloud & Sync (optional)
- Firebase Firestore storage with offline queue
- Firebase Authentication (per-device gate)
- Cloud Functions for atomic OR numbering and aggregates
- Automated daily cloud backup
- Firestore security rules (role-based, append-only audit logs)

### Reliability
- IndexedDB primary storage with localStorage fallback
- **Storage safety polyfill** — runs even when browser storage is blocked
- Storage quota monitor (warns at 70%, alerts at 90%)
- Global error boundary with crash-cart recovery

### Management
- Role-based users (Admin / Manager / Cashier)
- Full user management: add, edit, delete, change PIN, assign branch
- **PIN security:** SHA-256 hashing with per-user salt (never plaintext)
- Customer database with loyalty points
- Multi-branch support with per-branch data scoping
- Hidden developer console for database repair (password-protected, fully logged)

### Progressive Web App
- Installable on Windows, Android, iOS
- Full offline operation via service worker
- Add-to-home-screen support

---

## Quick Start

### Option 1 — Single File (simplest)

Download `mlea-pos-v6.html` and open it.

> ⚠️ **Important:** For full functionality (data persistence, service worker, IndexedDB), serve it over HTTP rather than opening directly from the file system. Opening via `file://` works but won't save data between sessions in most browsers.

```bash
# From the folder containing the file:
python3 -m http.server 8080
# Then open http://localhost:8080/mlea-pos-v6.html
```

### Option 2 — Modular Build

Use `mlea-pos-v6-modular.zip` if you want to edit individual features. Extract it and serve `index.html`:

```bash
unzip mlea-pos-v6-modular.zip -d mlea-pos
cd mlea-pos
python3 -m http.server 8080
# Then open http://localhost:8080
```

### Demo Access

On the license screen, use the demo key:

```
MLEA-DEMO-UNLOCK-KEY1
```

It's shown on screen — click it to auto-fill, then press **Activate License**. The demo key works fully offline.

---

## Repository Structure

```
mlea-pos-v6.html              Single-file application (recommended)
mlea-pos-v6-modular.zip        Modular build (19 JS modules + CSS)
sw.js                          Service worker (PWA offline cache)
manifest.json                  PWA manifest
firestore.rules                Firebase security rules
functions-index.js             Firebase Cloud Functions

docs/
  MLEA_POS_System_Description.docx        BIR accreditation: technical description
  MLEA_POS_Application_Sworn_Statement.docx  BIR accreditation: application + sworn statement
  MLEA_POS_Sample_Receipts_Readings.docx  BIR accreditation: sample receipts & readings
```

---

## Firebase Setup (optional)

The app runs fully standalone using browser storage. To enable cloud sync across devices:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore**, **Authentication** (Email/Password), and **Cloud Functions**
3. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
4. Deploy the Cloud Functions:
   ```bash
   firebase deploy --only functions
   ```
5. In the app, go to **Settings → Firebase Setup** and paste your Firebase config

---

## Tech Stack

- **Frontend:** Vanilla HTML / CSS / JavaScript (no framework, no build step)
- **Storage:** IndexedDB + localStorage, optional Firebase Firestore
- **Crypto:** Web Crypto API (SHA-256) for PIN hashing and receipt integrity
- **Backend (optional):** Firebase Auth, Firestore, Cloud Functions
- **Libraries (CDN, loaded on demand):** bwip-js (barcodes), qrcode.js (QR), EmailJS (email receipts)

---

## BIR Compliance Notes

This software implements the technical features required for BIR compliance — receipt content, VAT computation, serial numbering, X/Z readings, GAT, audit trail, Sales/Purchases books, and receipt integrity verification.

**However, software features alone do not make a deployment legally compliant.** Before using this in a live business, the following administrative steps are required and are *not* handled by the code:

1. **BIR Accreditation** of the POS software as a product (RR 11-2004). Draft application documents are provided in `docs/`.
2. **Permit to Use (PTU)** — each business must register its installation with its Revenue District Office (RDO).
3. **CAS Registration** — if used as books of account, register as a Computerized Accounting System with the RDO.

> ⚠️ The BIR accreditation documents in `docs/` are **starting templates only**. Revenue Regulations change. Verify current requirements directly with the BIR and consult a Philippine tax professional before filing. These documents are not legal or tax advice.

---

## Security

- PINs are stored as SHA-256 hashes with a unique per-user salt — never in plaintext
- Legacy plaintext PINs are automatically upgraded on next login
- Completed sales cannot be deleted; voids are logged and preserve the original record
- Audit logs are append-only when using the Firebase backend
- The developer console is hidden, password-protected, and logs every access

> **Note on the license server:** the included license check calls a Google Apps Script endpoint and is intended as a lightweight gate, not strong DRM. It is client-side and can be bypassed. Treat it accordingly.

---

## Browser Support

Works on any modern browser (Chrome, Edge, Firefox, Safari) on desktop or mobile. Best experience on Chrome/Edge for full PWA install support.

---

## License

**MLEA POS is proprietary commercial software.** It is not open-source and may not be copied, redistributed, resold, or modified without a valid license. See the [LICENSE](LICENSE) file for the full terms and [EULA.md](EULA.md) for a plain-language summary.

To purchase a license, contact Gieo Software Solutions (payment via GCash or PayPal).

Copyright © 2026 Gieo Software Solutions. All rights reserved.

> ⚠️ **Selling commercial software via GitHub — read this:** Because this is a single-file HTML app, all source is fully visible to anyone who can view the repository. A proprietary license makes copying *illegal*, but it does not make it *impossible*. If you're selling licenses, **use a PRIVATE GitHub repository** and distribute the file only to paying customers — do not make the code public. A public repo with a proprietary license tells the world "you may not use this," which mainly serves as legal protection, not access control.

---

## Disclaimer

This software is provided "as is" without warranty of any kind. BIR compliance requires proper accreditation and registration as described above. The author is not responsible for any tax or legal consequences arising from the use of this software. Always consult the BIR and a qualified tax professional.
