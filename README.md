<<<<<<< HEAD
# 🛍️ MyStore - User Authentication System

A full-stack MERN (MongoDB, Express, React, Node.js) authentication system with login and registration functionality. This project features a modern, responsive UI with robust validation and secure JWT-based authentication.

![MyStore Banner](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Validation Rules](#validation-rules)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)

## ✨ Features

- **User Registration**: New users can sign up with name, email, and password
- **User Login**: Existing users can log in securely
- **Welcome Dashboard**: Personalized greeting after successful login
- **Form Validation**: 
  - Email must contain @ symbol and be in valid format
  - Password must be at least 6 characters long
  - Name must be at least 2 characters long
- **Security**: Password hashing with bcrypt, JWT token authentication
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Error Handling**: Comprehensive error messages for better UX
- **Persistent Login**: Users stay logged in using localStorage

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation and verification
- **express-validator** - Request validation middleware

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with animations

## 📁 Project Structure

```
mystore/
├── backend/                # Backend server
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js        # JWT authentication middleware
│   ├── models/
│   │   └── User.js        # User model schema
│   ├── routes/
│   │   └── auth.js        # Authentication routes
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
│
├── frontend/              # React frontend
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js   # Login component
│   │   │   ├── Register.js # Register component
│   │   │   └── Welcome.js # Welcome dashboard
│   │   ├── services/
│   │   │   └── authService.js # API service functions
│   │   ├── utils/
│   │   │   └── validation.js  # Validation functions
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # App styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
│
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier works)
- npm or yarn package manager

### Step 1: Clone or Extract the Project
```bash
cd mystore
```

### Step 2: Set Up Environment Variables

1. Open the `.env` file in the root directory
2. Replace the MongoDB connection string with your own:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mystore?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
```

**How to get MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or log in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string and replace `<username>` and `<password>`

### Step 3: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 4: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🏃 How to Run

### Method 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Backend will run on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
# Frontend will open automatically on http://localhost:3000
```

### Method 2: Using npm start

**Terminal 1:**
```bash
cd backend
npm start
```

**Terminal 2:**
```bash
cd frontend
npm start
```

### Access the Application
Open your browser and go to: **http://localhost:3000**

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login existing user | No |
| GET | `/auth/profile` | Get user profile | Yes (JWT) |

### Request Examples:

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## ✅ Validation Rules

### Email Validation:
- ✓ Must not be empty
- ✓ Must contain @ symbol
- ✓ Must be in valid email format (e.g., user@domain.com)
- ✓ Automatically converted to lowercase
- ✓ Must be unique (no duplicate emails)

### Password Validation:
- ✓ Must not be empty
- ✓ Must be at least 6 characters long
- ✓ Stored as hashed value (bcrypt)

### Name Validation:
- ✓ Must not be empty
- ✓ Must be at least 2 characters long
- ✓ Whitespace is trimmed

## 🔍 How It Works

### Registration Flow:
1. User enters name, email, and password
2. Frontend validates input (email format, password length)
3. Data sent to backend `/api/auth/register`
4. Backend validates again using express-validator
5. Check if email already exists in database
6. Password is hashed using bcrypt (10 salt rounds)
7. User saved to MongoDB
8. JWT token generated and returned
9. Token stored in localStorage
10. User redirected to welcome page

### Login Flow:
1. User enters email and password
2. Frontend validates input
3. Data sent to backend `/api/auth/login`
4. Backend finds user by email
5. Password compared with hashed password using bcrypt
6. If valid, JWT token generated
7. Token stored in localStorage
8. User redirected to welcome page

### Authentication:
- JWT (JSON Web Token) used for authentication
- Token expires in 7 days
- Token sent in Authorization header: `Bearer <token>`
- Middleware verifies token before accessing protected routes

## 📸 Screenshots

### Login Page
- Clean, modern design with gradient background
- Real-time validation feedback
- Smooth animations

### Register Page
- User-friendly form
- Comprehensive validation
- Error messages for each field

### Welcome Dashboard
- Personalized greeting with user's name
- Display user information
- Logout functionality

## 🛠️ Additional Features You Can Add

- Password reset functionality
- Email verification
- OAuth (Google, Facebook login)
- User profile editing
- Password strength indicator
- Remember me functionality
- Two-factor authentication
- Rate limiting for API requests

## 📝 License

This project is open source and available under the MIT License.

# ecommerce-task-cedcoss
>>>>>>> eb259f1f921afd9a34bc6cd9fd97b8c74723ac34
