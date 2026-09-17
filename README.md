# ⚛️ React + Vite Boilerplate

A clean, highly optimized starting point for React applications. This template is powered by [Vite](https://vitejs.dev/) for lightning-fast HMR and comes pre-configured with a robust CSS architecture, sensible global resets, and local font management.

---

## ✨ Features

- **Vite + React:** Fast, modern build tool with instant Hot Module Replacement.
- **Modern CSS Architecture:** A highly organized `index.css` structured around custom properties (variables), global resets, and base typography.
- **Built-in Theme Support:** Pre-configured variables for Light and Dark modes.
- **Optimized Font Strategy:** Uses modern System Font Stacks by default, with a dedicated local font pipeline in `public/fonts` for zero-layout-shift custom fonts.
- **Accessibility First:** Includes `prefers-reduced-motion` queries and semantic HTML styling baselines.

---

## 🚀 Quick Start

1. **Clone the repository and navigate into the project:**
   ```bash
   git clone <repository-url> my-app
   cd my-app
   ```

# my-react-app

# react-starter

## GitHub Pages Deployment

1. Ensure the `base` value in [vite.config.js](vite.config.js) matches your repository name.
2. Run `npm run deploy` to publish the `dist` folder.
3. In GitHub, open Settings -> Pages.
4. Set Source to `Deploy from a branch`.
5. Select branch `gh-pages` and folder `/ (root)`.

Notes:

- This project uses `HashRouter` so direct page refreshes work on GitHub Pages.
- If your repo name changes, update `base` in [vite.config.js](vite.config.js).
# mydesignlibrary

## Components

### PullQuote

`PullQuote` displays a quote with an optional circular portrait and attribution.

```jsx
import PullQuote from "./components/pull-quote/PullQuote";

<PullQuote
  quote="Great design begins by listening carefully."
  imageSrc="/images/speaker.jpg"
  imageAlt="Jane Doe"
  attribution="Jane Doe, Product Designer"
/>
```

`quote` is required. Supply `imageSrc` and `imageAlt` to show the portrait, and
use `attribution` for the speaker's name or a short description.
