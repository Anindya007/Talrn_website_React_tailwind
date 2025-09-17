# Repository Overview

- **Name**: talrn-landing
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **Language**: JavaScript (ESM)
- **Build/Dev**: Vite scripts (dev/build/preview)

## Key Paths
- Entry HTML: `index.html`
- App entry: `src/main.jsx`
- Root component: `src/App.jsx`
- Global styles: `src/index.css`
- UI components: `src/components/ui/*`
- Utils: `src/lib/*`

## Notable Config
- Vite config: `vite.config.js` with `@vitejs/plugin-react` and `@tailwindcss/vite`.
- Alias: `@` -> `./src`.

## Tailwind v4 Notes
- Uses `@import 'tailwindcss'` in `src/index.css`.
- Requires the Vite plugin for processing.
- No tailwind.config.js needed by default in v4 unless customizing deeply.

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run preview` — preview build

## How to Run Locally
1. `npm install`
2. `npm run dev`
3. Open the shown localhost URL

## Troubleshooting
- If Tailwind classes don’t apply: ensure `vite.config.js` includes `@tailwindcss/vite` and restart dev server.
- Clear Vite cache by deleting `node_modules/.vite` if HMR gets stuck.
