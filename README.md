# 💰 MoneyLedger — Full-Stack Banking Ledger System

MoneyLedger is a fintech-inspired full-stack application that simulates core banking operations such as user authentication, account management, ledger-based balance tracking, and secure money transfers with idempotency protection.

The project focuses on **backend correctness, transactional integrity, and real-world payment system patterns**, along with a production-ready frontend experience.

---

## 🚀 Live Deployment

**🌐 Live Demo:** https://money-ledger-fe.vercel.app/
**Frontend:** Vercel
**Backend API:** Render
**Database:** MongoDB Atlas
**Email Service:** Resend (custom domain verified)

---

## 🧾 Current Features

### 🔐 Authentication System

1. User registration with hashed password
2. Secure login with credential validation
3. JWT-based authentication
4. Token support via cookies and Authorization header
5. Logout with token blacklisting (TTL expiry)
6. Protected route middleware
7. Cross-origin authentication working (Frontend ↔ Render)

---

### 📧 Email Integration (Production Ready)

1. Transactional emails powered by Resend
2. Verified custom email domain
3. Welcome email on registration
4. Debit and credit transaction alerts
5. Proper SPF, DKIM, MX configuration
6. Cloud-ready email delivery pipeline
7. Non-blocking email sending

---

### 👤 User & Identity Management

1. Secure user model with password hashing
2. JWT-based user identification
3. Persistent login support
4. System user role support
5. Middleware-based access control

---

### 💳 Account Module

1. Create financial accounts
2. Fetch user-owned accounts
3. Ownership validation on protected routes
4. Account status enforcement (ACTIVE checks)
5. Currency support (default INR)
6. Balance derived from immutable ledger (not stored directly)

---

### 📒 Ledger Engine (Fintech Core)

1. Immutable ledger entries
2. Double-entry model (DEBIT / CREDIT)
3. Balance computed as:

```
SUM(CREDIT) - SUM(DEBIT)
```

4. Audit-friendly transaction trail
5. Prevents balance tampering

---

### 💸 Transaction System

1. Secure money transfer between accounts
2. MongoDB ACID transactions (session-based)
3. Idempotency key protection
4. Sender ownership validation (BOLA protection)
5. Insufficient balance protection
6. Self-transfer prevention
7. Account status validation
8. Atomic debit + credit flow
9. Transaction status lifecycle
10. Email notifications to sender and receiver

---

### 🧪 System / Admin Capability

1. System user initial funds injection
2. Protected system routes
3. Controlled money minting flow

---

## 🌐 Production Architecture

### Frontend

1. React + Vite application
2. Axios API layer
3. AuthContext state management
4. Protected routes
5. Environment-based API configuration
6. Deployed on Vercel
7. Production build optimized

### Backend

1. Node.js + Express REST API
2. Modular MVC-style structure
3. Middleware layering
4. Hosted on Render
5. Production email service
6. Structured error handling

### Database

1. MongoDB Atlas integration
2. Mongoose ODM modeling
3. Indexed idempotency keys
4. Persistent cloud storage

---

## 🛡️ Security Highlights

1. Password hashing via Mongoose pre-save hook
2. JWT blacklist with TTL expiry
3. Ledger immutability enforced
4. Balance never stored directly
5. Authorization checks on financial actions
6. Protection against unauthorized transfers
7. Proper CORS configuration
8. Secure environment variable handling
9. Cookie security configured

---

## 🧱 Tech Stack

**Frontend**

1. React
2. Vite
3. Axios
4. React Router

**Backend**

1. Node.js
2. Express.js
3. MongoDB + Mongoose
4. JWT Authentication
5. Resend Email API

**Infrastructure**

1. Render
2. Vercel
3. MongoDB Atlas
4. DNS + Email Authentication

---

## 🧪 API Overview

**Auth**

1. `POST /api/auth/register`
2. `POST /api/auth/login`
3. `POST /api/auth/logout`

**Accounts**

1. `POST /api/accounts`
2. `GET /api/accounts`
3. `GET /api/accounts/balance/:accountId`

**Transactions**

1. `POST /api/transactions`
2. `POST /api/transactions/system/initial-funds`

---

## 🧭 Future Enhancements

1. Transaction history UI
2. Dashboard analytics
3. Rate limiting
4. Refresh token flow
5. Email queue system
6. Pagination for accounts and transactions
7. Audit logging
8. Webhooks for email events

---

## 👨‍💻 Author

**Neelabhra De**

---

## ⭐ Project Status

Actively developed and production deployed.
Focused on full-stack depth, security, and real-world fintech patterns.
