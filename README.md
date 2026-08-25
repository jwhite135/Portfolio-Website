# VS Code–Themed Portfolio

My personal portfolio, built to look and feel like Visual Studio Code — tabs, a
file explorer, terminal-styled panels, and a status bar. Live at
[josiahawhite.com](https://josiahawhite.com).

## Features

- **Editor interface** — explorer sidebar, tab strip, and status bar that track
  the open "file"
- **Shareable panels** — every section has its own URL (`#/projects/codecollab`),
  so links and the browser back button work
- **Accessible** — keyboard-navigable tabs, visible focus, WCAG AA contrast, and
  motion that respects `prefers-reduced-motion`
- **Responsive** — desktop, tablet, and mobile, with the explorer becoming a
  dismissible drawer on small screens

## Stack

React 18 · TypeScript · Tailwind CSS · Framer Motion · EmailJS

## Structure

```
src/
  App.tsx          editor shell — tabs, explorer, status bar
  lib/site.ts      single source of truth for tabs, files, and routes
  lib/motion.ts    shared animation presets
  hooks/           hash routing, media queries
  components/      one component per panel
```

## Development

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build into ./build
npm run typecheck
```

## Deployment

Hosted on Vercel, which builds and publishes on every push to `main`. Build
settings and security headers live in [`vercel.json`](vercel.json).
