# 📚 StudyNotion

**StudyNotion** is a full-stack EdTech platform built with the **MERN stack**. It allows users to sign up, log in, create and enroll in courses, and access personalized dashboards based on their role (Student, Instructor, Admin).

> ⚠️ **Note**: This project is under active development. Core features are implemented, but a few components are pending final integration and testing.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT, Cookies  
- **Cloud Services**:
  - **Cloudinary** – For image & video uploads  
  - **Render** – Hosting backend  
  - **Vercel** – Hosting frontend  
- **Testing**: Postman

---

## 🔐 Authentication Flow 

### ✨ Features Implemented

- 🔐 User Signup with OTP Verification  
- 🔑 Secure Login with JWT Tokens  
- 📧 OTP Emails sent on Signup using Gmail SMTP  
- 🛡️ Passwords hashed using `bcrypt`  
- 💾 MongoDB used to store OTPs and user details  

---

### 🔁 Signup Flow

1. User enters email  
2. Backend checks if user already exists  
3. If not, a 6-digit OTP is:
   - ✅ Generated securely  
   - ✅ Stored in MongoDB  
   - ✅ Sent to the user's email via **Nodemailer + Gmail SMTP**
4. User submits OTP with account details
5. OTP is verified and account is created

---

### ⚠️ Note on OTP Emails

- OTP emails **are successfully delivered** using Gmail SMTP  
- However, they might **land in the spam folder** due to:
  - Gmail domain limitations
  - Lack of SPF/DKIM verification
  - Email content being short or generic

✅ You can safely mark them as “Not Spam” .

---

## 🔧 Work In Progress

- 💳 Payment Integration (Razorpay)  
- ⭐ Ratings and Course Reviews  
- 📊 Progress Tracking and Analytics  
- 🎨 UI Enhancements & Responsiveness

---

## 📂 Folder Structure



```
StudyNotion/
├── client/ # React Frontend
│ ├── public/ # Static assets and index.html
│ ├── src/
│ │ ├── assets/ # Images, videos, icons
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Route-based pages
│ │ ├── services/ # API integration logic
│ │ ├── utils/ # Utility functions and helpers
│ │ ├── App.jsx
│ │ └── index.js
│ ├── .env
│ ├── package.json
│ └── tailwind.config.js

├── server/ # Node + Express Backend
│ ├── config/ # DB, Cloudinary, CORS config
│ ├── controllers/ # Request handling logic
│ ├── middleware/ # Middlewares like auth, etc.
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ ├── .env
│ └── index.js # Server entry point

├── README.md
└── .gitignore
```
