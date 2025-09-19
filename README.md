# React + Vite Project  
_A clone of Talrn.com with registration & email OTP integration_

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)  
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)  
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)  
[![Resend](https://img.shields.io/badge/Email-Resend-red)](https://resend.com/)  

---

## 📌 Project Overview

This project is a **clone of Talrn.com** with a complete **registration process**.  
It is built with **React + Vite** for the frontend and includes a backend within the same codebase, deployed as a **Vercel serverless function**.

✅ Features:  
- Minimal setup with **Vite + React + HMR**  
- **Email OTP integration** using **Resend**  
- Full **registration flow** up to the success page  
- **Backend** integrated in the same repository  
- Backend deployed as **Vercel serverless function**  

---

## 🛠️ Technologies Used

- **React**
- **React Router DOM**
- **Vite**
- **Resend (Email API)**
- **Vercel Serverless Functions**

---

## 📂 Project Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo


npm install

npm run dev

-The backend is located in the /api directory.
-Deployed automatically when pushing to Vercel.
-Handles email OTP requests via Resend API.

Ensure you have a  RESEND_API_KEY in your .env file
