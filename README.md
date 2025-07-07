# 📁 Storage Management System API

A powerful backend API for managing files, folders, and notes — similar to a cloud storage system (like Google Drive). Built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**, with secure authentication (Local + Google OAuth).

base url : https://storage-management.onrender.com

---

## 🔧 Tech Stack

* **Node.js**, **Express.js**
* **MongoDB**, **Mongoose**
* **TypeScript**
* **JWT Authentication**
* **Google OAuth 2.0**
* **MVC Architecture**

---

## 📂 Folder Structure

```
🗄 src
🔍🔎 app.ts
🔍🔎 server.ts
🔍🔎 config/
🔍🔎 routes/
🔍🔎 modules/
🔍🔎 ├── auth/
🔍🔎 ├── user/
🔍🔎 ├── folder/
🔍🔎 ├── file/
🔍🔎 middleware/
🔍🔎 utils/
🔍🔎 interfaces/
🔍 uploads/
🔍 .env
🔍 .gitignore
🔍 package.json
🔍 tsconfig.json
🔍 README.md
```

---

## ✅ Features

### 🔐 Authentication

* ✅ User Registration (Email + Password)
* ✅ User Login (Local)
* ✅ Google Sign-In
* ✅ JWT Token Protected Routes

### 📁 Folder Management

* ✅ Create Folder
* ✅ Nest Folders (Parent-Child)
* ✅ Fetch all folders under a parent

### 📄 File Management

* ✅ Upload Image, PDF, DOCX, etc.
* ✅ Store file metadata (name, type, size, extension)


---

## 💪 Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/storage-management-system.git
cd storage-management-system
```

### 2. Install dependencies

```bash
npm install
```

note : update .env.local file
```bash
npm run dev
```
