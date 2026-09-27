# 🚀 Full-Stack MERN Portfolio & Blog Platform

A modern, production-ready full-stack web application combining a professional developer portfolio with an interactive, secure blogging system and dynamic contact dispatching.

---

## ✨ Features

- **Developer Portfolio:** Sleek, responsive showcase of skills, projects, and academic background (3rd-year CSE at Nandha Engineering College).
- **Role-Based Admin Authentication:** Secured via Firebase Admin Auth (`jaga@gmail.com`) to restrict blog creation, updates, and deletions to authorized administrators only.
- **Interactive Blog Management (CRUD):** Full Create, Read, Update, and Delete capabilities backed by MongoDB Atlas with real-time like synchronization.
- **Contact Form Dispatcher:** Integrated with Nodemailer (using Gmail App Passwords) for instant message delivery from visitors.
- **Custom UI Design:** Dark theme (`#09090b`), rose/tomato red accents, glowing navbar border shadow (`shadow-[0_4px_20px_rgba(255,99,71,0.35)]`), and interactive code snippet boxes with red corner glows on hover.
- **Network Resilience:** Configured with explicit DNS server overrides (`dns.setServers(['8.8.8.8', '1.1.1.1'])`) to seamlessly bypass local SRV DNS blocks (`ECONNREFUSED` / `ETIMEOUT`).

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide Icons, Firebase Auth SDK
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas (`Portblog` cluster database, `Blog` collection)
- **Email Service:** Nodemailer
- **Deployment:** Vercel & Firebase Hosting

---

## 📁 Folder Structure

```text
portfolio-blog/
├── backend/
│   ├── models/
│   │   └── Blog.js          # Mongoose schema for blog posts
│   ├── .env                 # Backend environment variables
│   └── server.js            # Express server, DNS config & database connection
│
├── frontend/
│   ├── public/              # Static assets and index.html
│   │   ├── index.js/        # Apply Dom
│   ├── src/
│   │   ├── components/      # Navbar, Footer,  etc.
│   │   ├── pages/           # LoginPage, HomePage, BlogPage,  etc.
│   │   ├── firebaseConfig.js# Firebase SDK configuration
│   │   ├── App.js           # Main application routing and structure
│   │   ├── index.css        # Apply styles in frontend
│   │   └── index.js         # Entry point
│   ├── .env                 # Frontend environment variables (Firebase & API URL)
│   └── package.json         # Frontend dependencies and scripts
│
└── README.md                # Project documentation
```
---
## 🌐 Deployment

# Frontend & Backend APIs: Deployed on Vercel with environment variables securely configured in the dashboard settings.

# Authentication: Managed seamlessly via Firebase Hosting.

---

## 👤 Author

GitHub: @jagadeeswaran-K007

---
