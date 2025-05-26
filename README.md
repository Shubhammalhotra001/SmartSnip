# SmartSnip

SmartSnip is a modern, visually stunning web application built with React for bookmarking URLs, tagging them, and viewing AI-generated summaries. The application features a sleek, pitch-black interface with glowing titles, smooth Framer Motion animations, and an interactive particle background powered by tsParticles. It includes user authentication (login/register) and a dashboard for managing bookmarks, all styled with Tailwind CSS and custom glassmorphism effects.

## Table of Contents

- Features
- Tech Stack
- Prerequisites
- Installation
- Project Structure
- Usage
- Styling and Design
- Backend API
- Troubleshooting
- Contributing
- License

## Features

- **User Authentication**:
  - Register with email and password.
  - Login to access the dashboard.
  - Secure token-based authentication stored in `localStorage`.
- **Bookmark Management**:
  - Add URLs with comma-separated tags.
  - View a list of bookmarks with titles, favicons, and tags.
  - Filter bookmarks by tag.
  - Delete bookmarks.
  - View AI-generated summaries for each bookmark in a modal.
- **Visual Design**:
  - Pitch-black background (`#000000`) for a dramatic, modern look.
  - Glowing "SmartSnip" title with neon flicker effect.
  - Smooth Framer Motion animations for form inputs, buttons, bookmark cards, and modals.
  - Interactive gold-colored particle background using `tsparticles-slim`.
  - Glassmorphism styling with translucent, blurred elements.
  - Gold-themed buttons and borders for a premium aesthetic.
- **Responsive Design**:
  - Mobile-friendly layout with Tailwind CSS responsive classes.
  - Bookmark grid adjusts to 1, 2, or 3 columns based on screen size.
- **Accessibility**:
  - ARIA attributes for form inputs, buttons, and modals.
  - Keyboard navigation support with auto-focus on form inputs.

## Tech Stack

- **Frontend**:
  - **React**: Component-based UI library.
  - **React Router**: Client-side routing for navigation.
  - **Framer Motion**: Smooth animations and transitions.
  - **tsParticles**: Interactive particle background.
  - **Tailwind CSS**: Utility-first CSS framework (via CDN or installed).
  - **Axios**: HTTP client for API requests.
- **Backend** (assumed, not provided):
  - RESTful API (e.g., Node.js/Express) running at `http://localhost:5000`.
  - Endpoints for authentication and bookmark management.
- **Fonts**:
  - Inter (via Google Fonts).
- **Development Tools**:
  - Node.js and npm for dependency management.
  - Vite or Create React App for bundling and development server.

## Prerequisites

- **Node.js** (v16 or higher) and npm (v8 or higher).
- **Backend API** running at `http://localhost:5000` with the following endpoints:
  - `POST /api/auth/register`: Register a user.
  - `POST /api/auth/login`: Login a user.
  - `GET /api/bookmarks`: Fetch bookmarks (optional `?tag=` query).
  - `POST /api/bookmarks`: Add a bookmark.
  - `DELETE /api/bookmarks/:id`: Delete a bookmark.
- A modern web browser (Chrome, Firefox, Edge, etc.).
- Git (optional, for cloning the repository).

## Installation

1. **Clone the Repository** (if applicable):

   ```bash
   git clone https://github.com/your-username/smartsnip.git
   cd smartsnip
   ```

   Alternatively, create a new directory and copy the provided files.

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   Install the following dependencies:

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

3. **Set Up Tailwind CSS** (if not using CDN): Follow the Tailwind CSS installation guide or keep the CDN in `index.html`. If installing:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   Update `tailwind.config.js`:

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

   Create `src/index.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Create Main Entry File**: Create `src/main.jsx`:

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

5. **Place Provided Files**:

   - Copy `index.html` to `public/` (Vite) or root (Create React App).
   - Copy `AuthForm.js`, `Dashboard.js`, `Login.js`, `Register.js`, `auth.css`, and `dashboard.css` to `src/`.

6. **Start the Backend**: Ensure the backend API is running at `http://localhost:5000`. Refer to your backend documentation for setup.

7. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   For Vite, open `http://localhost:5173`. For Create React App, open `http://localhost:3000`.

## Project Structure

```
smartsnip/
├── public/
│   └── index.html          # Main HTML file with Tailwind CDN and Google Fonts
├── src/
│   ├── AuthForm.js         # Reusable auth form component for login/register
│   ├── Dashboard.js        # Dashboard component for bookmark management
│   ├── Login.js           # Login page component
│   ├── Register.js        # Register page component
│   ├── auth.css           # Styles for login/register pages
│   ├── dashboard.css      # Styles for dashboard page
│   ├── index.css          # Tailwind base styles (if not using CDN)
│   └── main.jsx           # React entry point with routing
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

- `index.html`: Defines the app structure, loads Tailwind, and imports Inter font.
- `AuthForm.js`: Reusable component for login/register forms with particle background and animations.
- `Dashboard.js`: Displays bookmark management UI with particle background, glowing title, and modal for summaries.
- `Login.js`**/**`Register.js`: Wrap `AuthForm` with specific props for login/register functionality.
- `auth.css`: Custom styles for neon glow, glassmorphism, and animations on login/register pages.
- `dashboard.css`: Custom styles for dashboard, including glow effects and particle canvas.
- `main.jsx`: Sets up React Router and renders the app.

## Usage

1. **Access the App**:

   - Open `http://localhost:5173` (or `http://localhost:3000`) in your browser.
   - You’ll land on the login page by default.

2. **Register**:

   - Navigate to `/register`.
   - Enter an email and password.
   - Submit to create an account (backend must validate and store credentials).
   - Redirects to login page on success.

3. **Login**:

   - Navigate to `/login`.
   - Enter credentials.
   - Submit to authenticate (backend returns a JWT stored in `localStorage`).
   - Redirects to `/dashboard` on success.

4. **Manage Bookmarks**:

   - On the dashboard, enter a URL and optional comma-separated tags (e.g., `news, tech`).
   - Click "Save" to add the bookmark (backend generates a summary).
   - View bookmarks in a grid with favicons, titles, and tags.
   - Click "Summary" to view the AI-generated summary in a modal.
   - Click "Delete" to remove a bookmark.
   - Filter bookmarks by entering a tag in the filter input.

5. **Logout**:

   - Click the "Logout" button on the dashboard to clear the token and redirect to `/login`.

## Styling and Design

The app features a premium, futuristic design:

- **Pitch-Black Background**: Solid `#000000` background for a dramatic effect.
- **Glowing Title**: "SmartSnip" title uses `neon-glow` with a flickering text shadow.
- **Particle Background**: Gold-colored particles (`#FFD700`, `#D4A017`) with hover (grab) and click (push) interactions.
- **Glassmorphism**: Forms and bookmark cards use `bg-black/30 backdrop-blur-2xl` for a frosted glass effect.
- **Animations**:
  - Framer Motion for staggered entrances (form, inputs, buttons, cards).
  - Hover effects (scale, glowing shadows) on buttons and cards.
  - Modal transitions with scale and opacity animations.
- **Gold Theme**: Buttons and borders use `gold-400` to `gold-700` for a cohesive look.
- **Responsive Layout**: Tailwind classes ensure mobile-friendly design (e.g., single-column grid on small screens).

### Key CSS Classes

- `.neon-glow`: Flickering text shadow for titles.
- `.glow-effect`: Pulsing box shadow for cards and forms.
- `.glow-button`: Glowing shadow for buttons.
- `.animate-pulse-slow`: Subtle opacity animation for the background overlay.
- `.rounded-md2`: Custom border radius (`0.375rem`).

## Backend API

The frontend assumes a backend API at `http://localhost:5000` with the following endpoints:

- **POST** `/api/auth/register`:
  - Body: `{ email: string, password: string }`
  - Response: `{ message: string }`
- **POST** `/api/auth/login`:
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string }`
- **GET** `/api/bookmarks`:
  - Query: `?tag=string` (optional)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ bookmarks: [{ _id: string, url: string, title: string, favicon: string, tags: string[], summary: string }] }`
- **POST** `/api/bookmarks`:
  - Body: `{ url: string, tags: string[] }`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ message: string }`
- **DELETE** `/api/bookmarks/:id`:
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ message: string }`

Ensure the backend handles JWT authentication, URL validation, and summary generation (e.g., via an AI service).

## Troubleshooting

- **Error:** `Cannot read properties of undefined (reading 'load')`:
  - **Cause**: `tsParticles` is not loaded.
  - **Fix**: Ensure `tsparticles-slim` is installed (`npm install tsparticles-slim`) and imported in `AuthForm.js` and `Dashboard.js`. Verify `index.html` or bundler setup is correct.
- **Backend API Errors**:
  - **Cause**: Backend not running or incorrect URL.
  - **Fix**: Start the backend at `http://localhost:5000` and verify endpoints.
- **Styling Issues**:
  - **Cause**: Tailwind or fonts not loading.
  - **Fix**: Check `index.html` for Tailwind CDN or install Tailwind. Ensure Inter font is loaded via Google Fonts.
- **Routing Issues**:
  - **Cause**: React Router misconfigured.
  - **Fix**: Verify `main.jsx` has correct routes and `BrowserRouter` is used.
- **Bookmark Summaries Not Showing**:
  - **Cause**: Backend not generating summaries.
  - **Fix**: Check backend logic for summary generation and ensure `summary` field is returned in `GET /api/bookmarks`.

For additional issues, check the browser console or run `npm run dev` with `-- --open` to debug.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please follow coding standards, add tests if applicable, and update this README for new features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**SmartSnip** - Save, tag, and summarize your web content with style!
