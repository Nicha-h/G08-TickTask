# ✅ TickTask

> A beautifully customizable **To-Do List App** with built-in **Pomodoro Timer** to help you stay productive and focused.

---

## ✨ Features

### 📝 Create
- Create tasks with **icon** and **color customization**.
- Assign tasks to **custom categories** created by the user.
- Start **Pomodoro sessions** to focus on individual tasks.

### 📖 Read
- View a **daily summary** of tasks directly on the homepage.
- Navigate through a **weekly calendar** to check upcoming tasks.
- Access a comprehensive **overview page** showing progress by **day**, **month**, and **year**.

### 🔄 Update
- Edit and customize **tasks**, **categories**, and **user profile** (picture & username).

### 🔐 Account
- Sign up and log in with email and password.
- Forgot your password? Get a **6-digit code by email** and set a new one.

### 🗑️ Delete
- Delete tasks, categories, and profile.
- *Note:* Deleting a category won't delete the tasks within it.

---

## 💻 Tech Stack

- ⚛️ React + TailwindCSS (Frontend)
- 🔥 Hono + Prisma + PostgreSQL on Neon (Backend)
- 🔐 Neon Auth (email + password, password reset by email code)
- ☁️ Cloudinary for Profile Images
- 🔄 Neon Realtime for live task and Pomodoro sync

---

## 🚀 Getting Started

### 0️⃣ Get the environment variables

```bash
npm install
neon env pull   # writes .env.local in the repo root; both apps load it
```

### 1️⃣ Run the Backend

```bash
cd backend
npm install
npm run db:migrate
npm run dev
```

### 2️⃣ Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ❤️ Made with care by Team TickTask

![Made with love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)