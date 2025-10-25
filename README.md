# React + Tailwind App (Vite)

Live Demo: https://YOUR_LIVE_URL_HERE

Local Dev URL: http://localhost:5173

This repository contains a responsive React application built with Vite and Tailwind CSS. It demonstrates component architecture, state management with hooks, theme switching (light/dark), and API integration with loading/error handling, pagination, and search.

## Highlights

- **Routing**: React Router with nested layout (`/`, `/about`, `/tasks`, `/posts`).
- **Reusable Components**: `Button`, `Card`, `Navbar`, `Footer`, `Layout`.
- **State & Hooks**: `TaskManager`, `useLocalStorage`, `useDebounce`.
- **Theme**: Light/Dark via `ThemeContext` and `ThemeToggle` with Tailwind `dark` variants.
- **API**: Fetch posts with pagination and search. Timeout + automatic fallback.
- **Responsive UI**: Mobile-first grids and spacing. Transitions and skeleton loaders.

## Project Structure

```
app/
├── index.html
├── postcss.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx                  # Router + ThemeProvider + global CSS
    ├── index.css                 # Tailwind v4 import (@import "tailwindcss")
    ├── utils/
    │   └── cn.js                 # className utility
    ├── hooks/
    │   ├── useLocalStorage.js    # persisted state (tasks/theme)
    │   └── useDebounce.js        # debounced search
    ├── context/
    │   └── ThemeContext.jsx      # theme + toggleTheme (adds/removes html.dark)
    ├── components/
    │   ├── Button.jsx            # variants: primary, secondary, danger, ghost
    │   ├── Card.jsx              # boxed layout
    │   ├── Footer.jsx            # footer links + copy
+    │   ├── Layout.jsx            # wraps pages with Navbar/Footer
    │   ├── Navbar.jsx            # navigation + ThemeToggle
    │   ├── TaskManager.jsx       # add/complete/delete/filter
    │   └── ThemeToggle.jsx       # sun/moon icon with transitions
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Tasks.jsx             # uses TaskManager
    │   ├── Posts.jsx             # API list with search + pagination
    │   └── NotFound.jsx
    └── services/
        └── api.js                # fetchPosts with timeout + fallback
```

## Setup

From the repository root:

```bash
npm --prefix app install      # install dependencies inside app/
npm --prefix app start        # start Vite dev server (http://localhost:5173)
npm --prefix app run build    # production build to app/dist/
```

Alternatively (inside `app/`):

```bash
cd app
npm install
npm run dev
npm run build
```

## Features by Task

- **Task 1: Project Setup**
  - Vite React app, Tailwind configured (`darkMode: 'class'`).
  - React Router configured in `src/main.jsx`.

- **Task 2: Component Architecture**
  - Reusable `Button`, `Card`, `Navbar`, `Footer`, `Layout` components.
  - Props for variants, sizes, and composition.

- **Task 3: State Management and Hooks**
  - `TaskManager` (add/complete/delete/filter) with `useState`/`useEffect`.
  - `useLocalStorage` custom hook for persistence.
  - `ThemeContext` provides `theme` and `toggleTheme`; `ThemeToggle` switches modes.

- **Task 4: API Integration**
  - `Posts.jsx` shows a grid of posts with search (debounced), pagination, loading skeletons, and error states.
  - `fetchPosts()` uses an 8s timeout to JSONPlaceholder and falls back to DummyJSON if unreachable.

- **Task 5: Styling with Tailwind CSS**
  - Mobile-first responsive design (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, container widths).
  - Theme-aware styles using `dark:` variants across layout and components.
  - Utility classes for spacing, typography, and colors.
  - Transitions and skeleton loaders for interactivity.

## Troubleshooting

- **Tailwind styles not loading**
  - Ensure `app/src/index.css` contains `@import "tailwindcss";`.
  - Confirm `tailwind.config.js` includes `content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}']`.
  - Restart the dev server and hard refresh the browser.

- **Theme toggle only changes the button**
  - The app toggles `document.documentElement.classList` with `dark` in `ThemeContext.jsx`.
  - `app/index.html` includes an inline script to set the initial theme before React mounts, preventing flashes and ensuring Tailwind `dark:` variants apply immediately.
  - Verify in DevTools Console while toggling:
    ```js
    document.documentElement.classList.contains('dark')
    ```
  - Ensure containers use `dark:` classes, e.g., `Layout.jsx` has `dark:bg-slate-950 dark:text-slate-100`.

## Deployment

1. Build the app:
   ```bash
   npm --prefix app run build
   ```
2. Deploy `app/dist/` to your hosting provider (Vercel, Netlify, GitHub Pages, etc.).
3. Update the Live Demo link at the top of this README with your deployed URL.

