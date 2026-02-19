# 💰 MoneyLedger — Secure Banking Ledger Backend

MoneyLedger is a fintech-inspired backend system that simulates core banking operations such as user authentication, account management, ledger-based balance tracking, and secure money transfers with idempotency protection.

This project focuses on backend correctness, transactional integrity, and real-world payment system patterns.

---

## 🚀 Features

### 🔐 Authentication

1. User registration with hashed passwords
2. JWT-based login
3. Logout with token blacklisting (TTL auto-expiry)
4. Cookie + Bearer token support
5. System user role support

---

### 🏦 Account Management

1. Create bank accounts
2. Fetch user-owned accounts
3. Balance derived from immutable ledger (no direct balance storage)
4. Ownership validation on protected routes

---

### 📒 Ledger System

1. Immutable ledger entries (cannot update/delete)
2. CREDIT / DEBIT double-entry model
3. Balance computed as: **SUM(CREDIT) - SUM(DEBIT)**

---

### 💸 Transactions

1. Secure money transfers between accounts
2. MongoDB ACID transactions (session-based)
3. Idempotency key protection
4. Account status validation
5. Insufficient balance protection
6. Self-transfer prevention (recommended)

---

### 📧 Email Notifications

1. Gmail OAuth2 via Nodemailer
2. Registration success email
3. Transaction success emails (DEBIT & CREDIT aware)
4. Transaction failure helper

---

## 🧱 Tech Stack

1. Node.js
2. Express.js
3. MongoDB + Mongoose
4. JWT Authentication
5. Nodemailer (Gmail OAuth2)
6. Cookie Parser
7. MongoDB Transactions

---

## 🛡️ Security Notes

1. Passwords hashed via Mongoose pre-save hook
2. JWT blacklist with TTL expiry
3. Ledger is immutable
4. Balance never stored directly
5. MongoDB transactions ensure consistency
6. Backend validates ownership and account status
