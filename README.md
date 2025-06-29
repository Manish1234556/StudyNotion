
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

## ✅ Features Implemented

- 🔐 Email OTP-based Signup & Login  
- 👨‍🎓 Role-based Dashboards: Student, Instructor, Admin  
- 📝 Course Creation (with Sections and Subsections)  
- 📦 Cloudinary Media Upload Integration  
- 📧 Email Services & Password Reset  
- 🔗 Fully Connected MERN Stack Setup  

---

## 🔧 Work In Progress

- 💳 Payment Integration (Razorpay/Stripe)  
- ⭐ Ratings and Course Reviews  
- 📊 Progress Tracking and Analytics  
- 🎨 UI Enhancements & Responsiveness

---

## 🐞 Known Issues

- **Double Slash in URLs**: Some routes show URLs like `//auth/login` due to trailing slash in `REACT_APP_BASE_URL`. To fix, avoid trailing slash in `.env`.
- **Token Null in Deployment**: Occasionally, token appears `null` in production despite working locally. Investigation ongoing.

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
