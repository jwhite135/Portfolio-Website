## My VS Code–Themed Portfolio

A modern, animated portfolio that looks and feels like Visual Studio Code. It showcases my work, skills, and experience in a developer-friendly interface with tabs, a file explorer, terminal-styled panels, and a status bar.

### What you'll find
- **VS Code interface**: Explorer, tabs, terminal-styled panels, and status bar
- **Shareable panels**: every section has its own URL (`#/projects/codecollab`), so links and the back button work
- **Smooth animations**: subtle motion that respects `prefers-reduced-motion`
- **Responsive design**: optimized for desktop, tablet, and mobile
- **Accessible**: keyboard-navigable tabs, visible focus, WCAG AA contrast

## Local development

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build into ./build
npm run typecheck
```

`.env` holds committed build defaults. `INLINE_RUNTIME_CHUNK=false` keeps the
webpack runtime in its own file rather than an inline `<script>`, which is what
lets the production Content-Security-Policy use a strict `script-src 'self'`.
Don't remove it. Local secrets belong in `.env.local`, which git ignores.

## Deployment (Vercel)

Vercel builds and publishes on every push to `main`; there is no manual deploy
step. Build settings and all response headers live in [`vercel.json`](vercel.json).

### First-time setup

1. **Import the repo.** At [vercel.com/new](https://vercel.com/new), pick this
   repository. Vercel reads `vercel.json`, so leave the framework, build command,
   and output directory as-is. Click **Deploy**.
2. **Point the domain at Vercel.** Project → **Settings → Domains** → add
   `josiahawhite.com` and `www.josiahawhite.com`. Vercel shows the exact DNS
   records to create at your registrar — typically an `A` record for the apex
   and a `CNAME` for `www`. Propagation is usually minutes; the TLS certificate
   is issued automatically once DNS resolves.
3. **Turn off GitHub Pages** in the repo's **Settings → Pages** (set source to
   *None*). Leaving it on serves a second, stale copy of the site and splits
   search ranking between two hostnames.

After that, `git push` to `main` deploys to production, and any other branch or
pull request gets its own preview URL.

### Notes

- **`public/CNAME` is gone.** It only ever existed to tell GitHub Pages about the
  custom domain. On Vercel the domain is configured in the dashboard.
- **The canonical URL is hardcoded** to `https://josiahawhite.com/` in
  `public/index.html` (the `<link rel="canonical">`, `og:url`, and JSON-LD
  blocks). If the site ends up living somewhere else, update those three.
- **Security headers are set in `vercel.json`, not in a `<meta>` tag.** Real
  response headers can carry `frame-ancestors`, `X-Content-Type-Options`,
  `Permissions-Policy`, and HSTS, none of which a `<meta http-equiv>` can
  express. If you ever serve this build from a host that can't set headers, put
  the `Content-Security-Policy` back into `public/index.html` as a
  `<meta http-equiv>` — the file has a comment marking the spot.
- **The CSP allowlist is narrow.** It permits the Google Fonts stylesheet and
  font files, plus `https://api.emailjs.com` for the contact form. Adding any
  third-party script, embed, analytics tag, or image host means adding it to the
  matching directive in `vercel.json`, or the browser will block it silently.
- **HSTS is on** with a two-year `max-age`. It is not submitted to the browser
  preload list, so it is reversible: drop the header and wait out the max-age.
  Only add `; preload` if you're certain the apex domain and every subdomain
  will serve HTTPS indefinitely.
