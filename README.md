
#  **SmartSnip** 

**SmartSnip** is a **modern, visually stunning** web application built with React for bookmarking URLs, tagging them, and viewing **AI-generated summaries**. The application features a sleek, **pitch-black interface** with glowing titles, smooth Framer Motion animations, and an interactive **particle background** powered by tsParticles. It includes 🔐 user authentication (login/register) and a 🧰 dashboard for managing bookmarks — all styled with ⚡ **Tailwind CSS** and elegant **glassmorphism** effects.

---

## 🔴 Live
👉 **Access the App**: [https://smart-snip.vercel.app/](https://smart-snip.vercel.app/)  


---
---

## 📚 Table of Contents

* 🚀 Features
* 🛠️ Tech Stack
* ✅ Prerequisites
* 🧩 Installation
* 🗂️ Project Structure
* 🧑‍💻 Usage
* 🎨 Styling and Design
* 🔌 Backend API
* 🐞 Troubleshooting
* 🤝 Contributing
* 📄 License

---

## 🚀 Features

* **🔐 User Authentication**:

  * ✅ Register with email and password
  * 🔁 Login to access the dashboard
  * 🔒 Secure token-based authentication via `localStorage`

* **📌 Bookmark Management**:

  * ➕ Add URLs with comma-separated tags
  * 📋 View list of bookmarks with titles, favicons, and tags
  * 🔍 Filter bookmarks by tag
  * ❌ Delete bookmarks
  * 🧠 View AI-generated summaries in a modal

* **🎨 Visual Design**:

  * 🖤 Pitch-black background (`#000000`) for a dramatic, modern look
  * 🌟 Glowing "SmartSnip" title with neon flicker effect
  * 🎬 Framer Motion animations for smooth transitions
  * 🪐 Interactive gold-colored particle background with `tsparticles-slim`
  * 🧊 Glassmorphism with translucent, blurred components
  * 👑 Gold-themed buttons and borders

* **📱 Responsive Design**:

  * 📲 Mobile-friendly layout with Tailwind responsive classes
  * 🧱 Dynamic grid (1, 2, or 3 columns based on screen size)

* **♿ Accessibility**:

  * ✅ ARIA attributes and keyboard navigation
  * 🔁 Auto-focus for forms

---

## 🛠️ Tech Stack

### ⚛️ Frontend:

* **React** – UI library
* **React Router** – Navigation
* **Framer Motion** – Animations
* **tsParticles** – Particle background
* **Tailwind CSS** – Styling
* **Axios** – HTTP client

### 🧾 Backend (assumed):

* REST API (Node.js/Express) at `http://localhost:5000`

### 🔤 Fonts:

* **Inter** (via Google Fonts)

### 🧰 Tools:

* Node.js + npm
* Vite or Create React App

---

## ✅ Prerequisites

* Node.js (v16+) and npm (v8+)
* Backend API with the following endpoints:

  * `POST /api/auth/register`
  * `POST /api/auth/login`
  * `GET /api/bookmarks`
  * `POST /api/bookmarks`
  * `DELETE /api/bookmarks/:id`
* Git (optional)
* Modern browser (Chrome, Firefox, Edge, etc.)

---

## 🧩 Installation

1. **📥 Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/smartsnip.git
   cd smartsnip
   ```

2. **📦 Install Dependencies**:

   ```bash
   npm install
   ```

   ```json
   {
     "dependencies": {
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-router-dom": "^6.14.0",
       "framer-motion": "^10.12.16",
       "axios": "^1.4.0",
       "tsparticles-slim": "^2.12.0"
     }
   }
   ```

3. **🎨 Tailwind CSS Setup**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   `tailwind.config.js`:

   ```js
   module.exports = {
     content: ['./src/**/*.{js,jsx}', './public/index.html'],
     theme: {
       extend: {
         colors: {
           'gold-400': '#FFD700',
           'gold-500': '#D4A017',
           'gold-600': '#C68E14',
           'gold-700': '#B87A12',
         },
         fontFamily: {
           inter: ['Inter', 'sans-serif'],
         },
       },
     },
     plugins: [],
   };
   ```

   `src/index.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **🧠 Create Main Entry File (`src/main.jsx`)**:

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import AuthForm from './AuthForm';
   import Dashboard from './Dashboard';
   import Login from './Login';
   import Register from './Register';
   import './index.css';
   import './auth.css';
   import './dashboard.css';

   const App = () => (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
     </BrowserRouter>
   );

   ReactDOM.createRoot(document.getElementById('root')).render(<App />);
   ```

5. **📂 Add Provided Files**:

   * Place `index.html` in `public/`
   * Copy component files and styles into `src/`

6. **🔌 Start Backend**: Make sure the backend runs at `http://localhost:5000`

7. **🧪 Run Dev Server**:

   ```bash
   npm run dev
   ```

   Open:

   * Vite: `http://localhost:5173`
   * CRA: `http://localhost:3000`

---

## 🗂️ Project Structure

```
smartsnip/
├── public/
│   └── index.html
├── src/
│   ├── AuthForm.js
│   ├── Dashboard.js
│   ├── Login.js
│   ├── Register.js
│   ├── auth.css
│   ├── dashboard.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🧑‍💻 Usage

1. **🛬 Access App**: Open your browser to `http://localhost:5173` or `3000`
2. **🆕 Register**: `/register` → email & password → success → redirected
3. **🔐 Login**: `/login` → get token → redirected to dashboard
4. **📌 Manage Bookmarks**:

   * Add URLs with optional tags
   * Click "Summary" for AI-generated preview
   * Filter and delete as needed
5. **🚪 Logout**: Click "Logout" on dashboard

---

## 🎨 Styling and Design

* 🖤 **Dark Mode**: pitch-black background (`#000000`)
* ✨ **Neon Glow**: Flickering logo/title
* 🪐 **Particles**: Gold-themed interactive background
* 🧊 **Glassmorphism**: Frosted-glass UI for cards/forms
* 🎬 **Animations**: Smooth Framer Motion transitions
* 👑 **Gold Aesthetic**: Premium color palette
* 📱 **Mobile-Friendly**: Responsive grid layout

### 🔑 Key CSS Classes:

* `.neon-glow`
* `.glow-effect`
* `.glow-button`
* `.animate-pulse-slow`
* `.rounded-md2`

---

## 🔌 Backend API

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/auth/register`  | Register user                  |
| POST   | `/api/auth/login`     | Login and get token            |
| GET    | `/api/bookmarks?tag=` | Fetch bookmarks (optional tag) |
| POST   | `/api/bookmarks`      | Add bookmark                   |
| DELETE | `/api/bookmarks/:id`  | Delete bookmark                |

**🔐 Headers:**
All protected routes require:

```http
Authorization: Bearer <token>
```

---

## 🐞 Troubleshooting

| Issue 🛑                      | Fix ✅                                                      |
| ----------------------------- | ---------------------------------------------------------- |
| `load` is undefined           | Install and import `tsparticles-slim`                      |
| Backend errors (404, 500)     | Ensure server is running on `localhost:5000`               |
| Tailwind or fonts not loading | Check `index.html` for proper CDN or install configuration |
| Routing not working           | Verify React Router setup in `main.jsx`                    |
| Summary not showing           | Check backend AI summary integration                       |

---

## 🤝 Contributing

1. 🍴 Fork this repo
2. 🌿 Create a feature branch: `git checkout -b feature/your-feature`
3. 💾 Commit your changes
4. 📤 Push to your fork: `git push origin feature/your-feature`
5. 🔁 Open a Pull Request

Please follow best practices, update this README if needed, and write clean, readable code.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

🌟 **SmartSnip** – Save, tag, and summarize your web content with style!

---

Let me know if you want this as a `.md` file or embedded in your repo automatically.
