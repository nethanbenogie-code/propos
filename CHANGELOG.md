# Changelog

All notable changes to MLEA POS are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

---

## [6.0.0] — 2026-06

The flagship release. A full rebuild into a single-file Progressive Web App with cloud sync, hardened security, and complete BIR receipting features.

### Added — BIR Compliance
- Sequential OR/SI numbering with server-atomic generation (Cloud Functions) when online
- **Offline OR reservation** — each terminal reserves a block of serial numbers so numbering stays gapless and duplicate-free even without internet
- Per-item VAT classification (VATable / VAT-exempt / zero-rated) at 12%
- Automatic Senior Citizen / PWD 20% discount and VAT exemption
- Grand Accumulated Total (GAT) with controlled, double-confirmed, logged reset
- X-Reading (shift snapshot) and Z-Reading (end-of-day)
- **Sales Book** and **Purchases Book** in RR 9-2009 columnar format (export + print)
- **BIR Form 2550M** monthly VAT summary
- **Audit trail export** for BIR inspection
- **Receipt integrity** — SHA-256 hash + QR code on every receipt for tamper detection

### Added — Cloud & Sync
- Firebase Firestore storage with offline write queue
- Firebase Authentication (per-device gate)
- Cloud Functions for atomic OR numbering and sales aggregates
- Automated daily cloud backup
- Firestore security rules (role-based, append-only audit logs, no sale deletion)

### Added — Security
- **PIN hashing** with SHA-256 + unique per-user salt (PINs never stored in plaintext)
- Automatic upgrade of legacy plaintext PINs on next login
- Session timeout with warning and PIN lockout after failed attempts
- Hidden, password-protected **developer console** for database repair — every access logged
- Storage safety polyfill so the app loads even when browser storage is blocked

### Added — Reliability
- IndexedDB primary storage with localStorage fallback
- Storage quota monitor (warns at 70%, alerts at 90%)
- Global error boundary with crash-cart recovery
- Manual full-backup export and restore

### Added — Point of Sale
- Touch POS terminal with product search and category tabs
- Hold/park sale, split payment (cash + card), quick-cash buttons
- Item-level and order-level discounts
- Customer database with loyalty points
- Multi-branch support with per-branch data scoping

### Added — Receipts
- Thermal (80mm) and A4 layouts
- Business logo upload
- Code 128 barcode and verification QR
- Email receipt via EmailJS

### Added — User Management
- Full add / edit / delete users
- Change PIN with live confirmation
- Role assignment (Admin / Manager / Cashier) and branch assignment
- Activate / deactivate accounts

### Added — Progressive Web App
- Installable on Windows, Android, and iOS
- Service worker for full offline operation
- Add-to-home-screen support

### Added — Distribution
- Single-file build (`mlea-pos-v6.html`)
- Modular build (19 JS modules + CSS) for maintainability — byte-for-byte equivalent behavior

### Fixed
- License gate button unresponsive when opened from `file://` (browser storage blocked) — added storage safety polyfill and hardened all storage calls
- Demo license key mangled by the input formatter and truncated by `maxlength` — formatter now allows the full key and the demo key activates instantly offline
- ID generation returning invalid values on the first record in empty stores
- VAT not splitting correctly across mixed VAT-exempt / zero-rated carts
- Card payments incorrectly recording cash tendered and change
- Branch filtering missing on activity logs, returns, voided sales, and BIR export
- Purchase Order stock-in matching by name only (now matches by product ID)
- Duplicate quick-cash amounts
- Split-payment card field locked as read-only
- Firebase crash on empty or malformed configuration
- Receipt logo, barcode, customer name, and QR not appearing on printouts
- Session expiry warning timer not cleared on logout

### Security Notes
- The included license check is a lightweight client-side gate (Google Apps Script), not strong DRM. It can be bypassed and should be treated accordingly.

---

## [5.0.0] — 2026-05 (internal)

Full rebuild introducing custom dialog system and the foundation for the v6 feature set.

### Added
- Custom dialog/toast system replacing all native browser prompts
- Storage adapter pattern (local ↔ cloud) groundwork
- BIR receipt fields: PTU, accreditation number, VAT breakdown
- Thermal and A4 receipt templates

---

## [4.0.0] — 2026 (internal)

First Firebase integration groundwork (not released standalone).

---

## [3.0.0] — 2026 (internal)

Initial BIR-oriented single-file POS (`mlea-pos-bir.html`).

### Added
- Basic POS terminal and product management
- Initial BIR receipt format
- localStorage-based data persistence

---

*Versions 3.x–5.x were internal development milestones. Version 6.0 is the first commercial release.*
