# TOP APP GAMES — Landing Page

Marketing landing page for TOP APP GAMES — a European mobile game studio.

## Structure

```
index.html        — entry point
styles.css        — all styling (design system, sections, animations)
sections-a.jsx    — Nav, Hero, Featured Game (Ludus), About
sections-b.jsx    — Stats, Careers, News, Footer
app.jsx           — app composition + scroll reveal
image-slot.js     — drag-and-drop image placeholder web component
assets/           — logo + hero key art
```

The page is a static site. React + Babel are loaded from CDN and JSX is
transpiled in the browser — no build step required.

## Run locally

Any static server works, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed URL.

## Deploy

### Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project → Import Git Repository**.
3. Framework Preset: **Other** (static, no build command).
4. **Deploy**.

### GitHub Pages
1. Push to a repo.
2. Settings → Pages → deploy from branch (root).

### Netlify
Drag-and-drop this folder onto https://app.netlify.com/drop

## Custom domain

After deploy, add `topapp.games` in your host's domain settings and point the
DNS records as instructed.
