# MLEA POS v6

A modern offline-first Point of Sale (POS) system designed for Philippine retail businesses, featuring inventory management, sales processing, BIR reporting, customer loyalty, branch management, and cloud synchronization.

## Features

### Sales & POS
- Fast cashier interface
- Receipt printing
- Cash and card payments
- Split payments
- Discounts and promotions
- Returns and refunds
- Void transactions with audit trail

### Inventory Management
- Product catalog
- Stock monitoring
- Stock adjustments
- Low-stock alerts
- Category management
- Supplier management

### Customer Management
- Customer database
- Loyalty points system
- Purchase history
- Rewards tracking

### User Management
- Admin
- Manager
- Cashier roles
- PIN-based authentication
- Activity logging

### Branch Management
- Multi-branch support
- Branch inventory tracking
- Consolidated reporting

### Philippine BIR Compliance
- Official Receipt (OR) numbering
- VAT computation
- VAT-exempt sales
- Zero-rated sales
- X Reading
- Z Reading
- Grand Accumulated Total (GAT)
- BIR Sales Book
- Form 2550M support

### Reports
- Daily Sales Reports
- Monthly Sales Reports
- Inventory Reports
- Profit Reports
- BIR Reports
- CSV Export

### Backup & Recovery
- Local backup
- Restore functionality
- Export data
- Import data

### Offline First
- Works without internet connection
- Local data storage
- Firebase cloud synchronization
- Automatic sync queue

---

# Screenshots

Add screenshots here.

## Dashboard

![Dashboard](screenshots/dashboard.png)

## POS Screen

![POS](screenshots/pos.png)

## Reports

![Reports](screenshots/reports.png)

---

# Technology Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Firebase
- Local Storage / Offline Cache
- Progressive Web App (PWA)

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/mlea-pos-v6.git
```

## Open Project

Simply open:

```text
mlea-pos-v6.html
```

in a modern browser.

Recommended:

- Google Chrome
- Microsoft Edge

---

# Firebase Setup

1. Create a Firebase project.
2. Enable:

- Authentication
- Firestore Database

3. Replace Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. Save and reload.

---

# Default Roles

| Role | Permissions |
|--------|-------------|
| Admin | Full system access |
| Manager | Store management |
| Cashier | Sales operations |

---

# Data Management

## Backup

Navigate to:

```text
Settings → Backup
```

Export all business data into a backup file.

## Restore

Navigate to:

```text
Settings → Restore
```

Import a previously exported backup.

---

# Security Notes

Current version includes:

- PIN authentication
- Session timeout
- Activity logging

Recommended future enhancements:

- PIN hashing
- Firebase Security Rules
- Role-based API restrictions
- Encrypted backups

---

# Roadmap

## Planned Features

- Barcode scanner integration
- QR payments
- E-wallet support
- Purchase order automation
- Supplier portal
- Inventory forecasting
- Multi-store analytics
- Mobile companion app

---

# Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit changes

```bash
git commit -m "Add my feature"
```

4. Push branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

---

# License

This project is proprietary software.

Unauthorized copying, modification, distribution, or commercial use without permission is prohibited.

© 2026 MLEA POS. All Rights Reserved.

---

# Disclaimer

This software is provided "as is" without warranty of any kind. Users are responsible for ensuring compliance with local tax regulations and BIR requirements.

---

# Author

**MLEA POS Development Team**

Philippines

For support, feature requests, or bug reports, please open a GitHub Issue.
