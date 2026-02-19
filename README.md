💰 MoneyLedger — Secure Banking Ledger Backend

MoneyLedger is a fintech-inspired backend system that simulates core banking operations such as user authentication, account management, ledger-based balance tracking, and secure money transfers with idempotency protection.

This project focuses on backend correctness, transactional integrity, and real-world payment system patterns.

🚀 Features
🔐 Authentication

User registration with hashed passwords

JWT-based login

Logout with token blacklisting (TTL auto-expiry)

Cookie + Bearer token support

System user role support

🏦 Account Management

Create bank accounts

Fetch user-owned accounts

Balance derived from immutable ledger (no direct balance storage)

Ownership validation on protected routes

📒 Ledger System

Immutable ledger entries (cannot update/delete)

CREDIT / DEBIT double-entry model

Balance computed as:
SUM(CREDIT) - SUM(DEBIT)

💸 Transactions

Secure money transfers between accounts

MongoDB ACID transactions (session-based)

Idempotency key protection

Account status validation

Insufficient balance protection

Self-transfer prevention (recommended)

📧 Email Notifications

Gmail OAuth2 via Nodemailer

Registration success email

Transaction success emails (DEBIT & CREDIT aware)

Transaction failure helper

🧱 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Nodemailer (Gmail OAuth2)

Cookie Parser

MongoDB Transactions


🛡️ Security Notes

Passwords hashed via Mongoose pre-save hook

JWT blacklist with TTL expiry

Ledger is immutable

Balance never stored directly

MongoDB transactions ensure consistency

Backend validates ownership and account status
