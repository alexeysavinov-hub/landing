# TOP APP GAMES — Landing Page

Marketing landing page for **TOP APP GAMES** — a European mobile game studio,
featuring its flagship title *LUDUS・Strategy Battle PvP Game*.

## Structure

```
index.html        — entry point
styles.css        — design system + section styling
animations.css    — motion layer (reveals, ambient orbs, hover, parallax)
sections-a.jsx    — Nav, Hero, Featured (LUDUS), Studio
sections-b.jsx    — Stats, News, Footer (+ contact form)
app.jsx           — app composition + scroll/motion orchestration
image-slot.js     — drag-and-drop image placeholder web component
assets/           — logo + hero key art
```

The page is a static site. React + Babel are loaded from CDN and JSX is
transpiled in the browser — **no build step required**.

> Note: the LUDUS trailer (Google Play CDN) and some imagery / screenshots load
> from remote CDNs, so an internet connection is required to see them.

## Run locally

Any static server works:

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
