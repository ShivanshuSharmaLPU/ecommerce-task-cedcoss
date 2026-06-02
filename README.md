# 🛍️ MyStore - User Authentication System

A full-stack MERN (MongoDB, Express, React, Node.js) authentication system with login and registration functionality. Features a modern, responsive UI with robust validation and secure JWT-based authentication.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)
![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)

## 🔗 Live Demo

| Service  | URL |
|----------|-----|
| 🌐 Frontend | [https://ecommerce-task-cedcoss.vercel.app](https://ecommerce-task-cedcoss.vercel.app) |
| ⚙️ Backend API | [https://ecommerce-task-cedcoss.onrender.com](https://ecommerce-task-cedcoss.onrender.com) |

---

## 📋 Table of Contents

- [What This Project Does](#-what-this-project-does)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Tools Used](#-tools-used)
- [Project Structure](#-project-structure)
- [How to Run Locally](#-how-to-run-locally)
- [API Endpoints](#-api-endpoints)
- [Testing with Postman](#-testing-with-postman)
- [Deployment](#-deployment)
- [Validation Rules](#-validation-rules)
- [How It Works](#-how-it-works)

---

## 📖 What This Project Does

MyStore is a user authentication system that allows users to:

- **Register** a new account with name, email, and password
- **Log in** securely using their credentials
- **Access a personalized dashboard** after successful login
- **Stay logged in** using JWT tokens stored in localStorage

It demonstrates a complete MERN stack authentication flow — from frontend form validation all the way to hashed password storage and JWT-protected API routes.

---

## ✨ Features

- **User Registration** — Sign up with name, email, and password
- **User Login** — Secure login with email and password
- **Welcome Dashboard** — Personalized greeting after login
- **Form Validation** — Client-side and server-side validation
- **Security** — Password hashing with bcrypt, JWT token authentication
- **Responsive Design** — Works on all screen sizes
- **Error Handling** — Clear, descriptive error messages
- **Persistent Login** — Users remain logged in via localStorage

---

## 🚀 Tech Stack

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **MongoDB Atlas** — Cloud NoSQL database
- **Mongoose** — MongoDB object modeling
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT generation and verification
- **express-validator** — Server-side request validation

### Frontend
- **React** — UI library
- **Axios** — HTTP client for API requests
- **CSS3** — Styling with animations

---

## 🛠️ Tools Used

| Tool | Purpose |
|------|---------|
| **Postman** | API testing — sending requests to backend endpoints and verifying responses |
| **Vercel** | Frontend deployment — hosts the React app with automatic CI/CD from GitHub |
| **Render** | Backend deployment — hosts the Node.js/Express server as a web service |
| **MongoDB Atlas** | Cloud database — free-tier cluster for storing user data |
| **Git & GitHub** | Version control and source code hosting |
| **npm** | Package management for both frontend and backend |

---

## 📁 Project Structure

```
mystore/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   └── User.js            # User schema
│   ├── routes/
│   │   └── auth.js            # Auth routes (register, login, profile)
│   ├── server.js              # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Login form component
│   │   │   ├── Register.js    # Registration form component
│   │   │   └── Welcome.js     # Dashboard after login
│   │   ├── services/
│   │   │   └── authService.js # Axios API calls
│   │   ├── utils/
│   │   │   └── validation.js  # Client-side validation helpers
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── .env                       # Environment variables (not committed)
├── .env.example               # Example env file
├── .gitignore
└── README.md
```

---

## 🏃 How to Run Locally

### Prerequisites

- Node.js v14 or higher
- MongoDB Atlas account (free tier)
- npm

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-task-cedcoss.git
cd ecommerce-task-cedcoss
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mystore?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
```

> **How to get your MongoDB URI:**
> 1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
> 2. Create a free cluster (M0 tier)
> 3. Click **Connect → Connect your application**
> 4. Copy the connection string and replace `<username>` and `<password>`

### Step 3: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Start the Servers

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# Opens automatically on http://localhost:3000
```

---

## 🔌 API Endpoints

**Base URL (Production):** `https://ecommerce-task-cedcoss.onrender.com/api`  
**Base URL (Local):** `http://localhost:5000/api`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login an existing user | No |
| GET | `/auth/profile` | Get the logged-in user's profile | Yes (JWT) |

### Request & Response Examples

**Register — `POST /api/auth/register`**
```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (201)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Login — `POST /api/auth/login`**
```json
// Request Body
{
  "email": "john@example.com",
  "password": "password123"
}

// Success Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Profile — `GET /api/auth/profile`**
```
// Header
Authorization: Bearer <your_jwt_token>

// Success Response (200)
{
  "id": "64abc123...",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 🧪 Testing with Postman

[Postman](https://www.postman.com/) was used to test all API endpoints during development.

### How to Test

1. Download and open [Postman](https://www.postman.com/downloads/)
2. Create a new request and set the method (POST/GET)
3. Use the production base URL: `https://ecommerce-task-cedcoss.onrender.com/api`

**Test Registration:**
- Method: `POST`
- URL: `https://ecommerce-task-cedcoss.onrender.com/api/auth/register`
- Body → raw → JSON → paste the register request body above

**Test Login:**
- Method: `POST`
- URL: `https://ecommerce-task-cedcoss.onrender.com/api/auth/login`
- Body → raw → JSON → paste the login request body above

**Test Protected Route:**
- Method: `GET`
- URL: `https://ecommerce-task-cedcoss.onrender.com/api/auth/profile`
- Headers → `Authorization: Bearer <token from login response>`

> **Tip:** Save the token from your login response and use it as a Postman environment variable for easier testing of protected routes.

---

## 🚢 Deployment

### Frontend — Vercel

The React frontend is deployed on [Vercel](https://vercel.com).

**Steps to deploy:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the **Root Directory** to `frontend`
4. Add environment variable: `REACT_APP_API_URL=https://ecommerce-task-cedcoss.onrender.com`
5. Click **Deploy**

Vercel automatically redeploys on every push to the main branch.

**Live URL:** [https://ecommerce-task-cedcoss.vercel.app](https://ecommerce-task-cedcoss.vercel.app)

---

### Backend — Render

The Node.js/Express backend is deployed on [Render](https://render.com).

**Steps to deploy:**
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create a **New Web Service**
3. Connect your GitHub repository
4. Set the **Root Directory** to `backend`
5. Set **Build Command** to `npm install`
6. Set **Start Command** to `npm start`
7. Add environment variables:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — a strong random secret key
   - `PORT` — `5000`
8. Click **Deploy**

> **Note:** Render free-tier services spin down after inactivity. The first request after a period of sleep may take 30–60 seconds to respond.

**Live URL:** [https://ecommerce-task-cedcoss.onrender.com](https://ecommerce-task-cedcoss.onrender.com)

---

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Required, minimum 2 characters, whitespace trimmed |
| **Email** | Required, must contain `@`, valid format, converted to lowercase, must be unique |
| **Password** | Required, minimum 6 characters, stored as bcrypt hash |

---

## 🗺️ Workflow Diagram

### Registration Flow

```mermaid
flowchart TD
    A([User fills form\nname · email · password]) --> B[Client-side validation]
    B -- Fail --> E1([Show error message])
    B -- Pass --> C[POST /api/auth/register]
    C --> D[Server validation\nexpress-validator]
    D --> F{Email already\nexists?}
    F -- Yes --> E2([400 Bad Request])
    F -- No --> G[Hash password\nbcrypt · 10 salt rounds]
    G --> H[(Save user\nMongoDB Atlas)]
    H --> I[Generate JWT\nexpires in 7 days]
    I --> J([Store token in localStorage\nRedirect → Dashboard])

    style A fill:#1D9E75,color:#fff
    style B fill:#1D9E75,color:#fff
    style J fill:#1D9E75,color:#fff
    style C fill:#7F77DD,color:#fff
    style D fill:#7F77DD,color:#fff
    style F fill:#D85A30,color:#fff
    style G fill:#D85A30,color:#fff
    style H fill:#888780,color:#fff
    style I fill:#888780,color:#fff
```

---

### Login Flow

```mermaid
flowchart TD
    A([User enters email + password]) --> B[Client-side validation]
    B --> C[POST /api/auth/login]
    C --> D[(Find user by email\nMongoDB Atlas)]
    D --> E{User found?}
    E -- No --> E1([401 Unauthorized])
    E -- Yes --> F[bcrypt.compare\nverify password hash]
    F -- No match --> E2([401 Invalid credentials])
    F -- Match --> G[Issue JWT\nsigned with JWT_SECRET]
    G --> H([Store token in localStorage\nRedirect → Dashboard])

    style A fill:#1D9E75,color:#fff
    style B fill:#1D9E75,color:#fff
    style H fill:#1D9E75,color:#fff
    style C fill:#7F77DD,color:#fff
    style D fill:#888780,color:#fff
    style E fill:#D85A30,color:#fff
    style F fill:#D85A30,color:#fff
    style G fill:#888780,color:#fff
```

---

### Protected Route Flow

```mermaid
flowchart LR
    A([Client attaches token\nAuthorization: Bearer]) --> B[auth middleware\njwt.verify]
    B -- Invalid / expired --> E([401 Unauthorized])
    B -- Valid --> C[Route handler runs]
    C --> D([Return protected data\nname · email · id])

    style A fill:#7F77DD,color:#fff
    style B fill:#7F77DD,color:#fff
    style C fill:#888780,color:#fff
    style D fill:#1D9E75,color:#fff
```

---

## 🔍 How It Works

### Registration Flow
1. User fills in name, email, password on the frontend
2. Client-side validation runs before sending the request
3. `POST /api/auth/register` is called via Axios
4. Backend re-validates using `express-validator`
5. Checks if email already exists in MongoDB
6. Password is hashed using bcrypt (10 salt rounds)
7. User document is saved to MongoDB
8. JWT token (expires in 7 days) is generated and returned
9. Token is stored in `localStorage`
10. User is redirected to the welcome dashboard

### Login Flow
1. User enters email and password
2. Client-side validation runs
3. `POST /api/auth/login` is called
4. Backend finds the user by email
5. `bcrypt.compare()` verifies the password against the hash
6. On success, a new JWT token is issued
7. Token stored in `localStorage`, user redirected to dashboard

### Authentication
- JWT is sent in the `Authorization: Bearer <token>` header
- The auth middleware verifies the token on protected routes
- Token expiry is set to **7 days**

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
