# Personal site — antonioppereira.github.io

Modern, bold, single-page personal site built with **Astro + Tailwind CSS**.

## Local development

```bash
npm install        # one-time install
npm run dev        # http://localhost:4321
npm run build      # builds to ./dist
npm run preview    # serves the production build locally
```

## Deploy to GitHub Pages

The site uses GitHub Actions to build and publish on every push to `main`.

### One-time setup

1. **Create the repo on GitHub**

   The repo MUST be named exactly `antonioppereira.github.io` (because this is a *user site*, not a project site, and it deploys to the root URL).

   ```bash
   # From this directory:
   git init
   git add .
   git commit -m "Initial commit: personal site"
   git branch -M main
   git remote add origin git@github.com:antonioppereira/antonioppereira.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**

   - Go to **Settings → Pages** on the repo
   - Under **Build and deployment → Source**, select **GitHub Actions**
   - That's it — no other config

3. **First deploy**

   The workflow in `.github/workflows/deploy.yml` runs automatically on push to `main`. Watch it under the **Actions** tab. First successful run will publish the site at:

   **https://antonioppereira.github.io**

### 4. (Optional) Enable Cloudflare Web Analytics

Privacy-first, free, no cookie banner needed. Loads only in production builds.

1. Go to **[Cloudflare → Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics)**
2. Click **Add a site** and enter `antonioppereira.github.io`
3. Copy the token from the snippet shown (the value of `"token": "..."` inside `data-cf-beacon`)
4. **On GitHub**: Settings → Secrets and variables → Actions → **New repository secret**
   - Name: `PUBLIC_CF_BEACON_TOKEN`
   - Value: paste the token
5. Re-run the workflow (push any commit or trigger from the Actions tab)

Without the secret, the beacon script is simply not emitted — the build still succeeds.

For local dev: copy `.env.example` to `.env` and paste your token there. The Analytics component is **production-only**, so `npm run dev` will never pollute your stats.

### Subsequent updates

Just edit, commit, push. GitHub Actions takes care of the rest.

```bash
git add -p
git commit -m "Update: <what changed>"
git push
```

## Editing content

Almost all the site copy lives in **one file**:

```
src/data/profile.ts
```

Open it and edit the strings. The build is fully static — no CMS, no API. Update copy → rebuild → push.

Sections (in order):

- `profile` — name, headline, location, contact, metrics, quote
- `about` — about paragraphs
- `experience` — work history (newest first)
- `skillGroups` — capability buckets
- `certifications` — credential list
- `honors` — featured awards (OutSystems Champion)
- `publications` — articles
- `education` — degrees
- `languages` — language proficiencies
- `principles` — the three “how I think” cards

## Customizing the look

- **Colors** — `tailwind.config.mjs` → `theme.extend.colors.brand` and `accent`
- **Fonts** — Inter + Space Grotesk loaded via `src/layouts/Layout.astro`
- **Dark mode** — class-based, toggled in the header (`src/components/ThemeToggle.astro`)

## Adding a custom domain (later)

1. Buy the domain (e.g. `antoniopereira.dev`)
2. Add a `CNAME` file in `public/` containing just `antoniopereira.dev`
3. In the repo **Settings → Pages**, set the custom domain
4. Add an `ALIAS`/`ANAME` (or CNAME) DNS record pointing to `antonioppereira.github.io`
5. Update `astro.config.mjs` — change `site:` to `https://antoniopereira.dev`

## File map

```
.github/workflows/deploy.yml   # GitHub Pages deploy
astro.config.mjs               # Astro + integrations
tailwind.config.mjs            # design tokens
public/                        # static assets (favicon, robots.txt)
src/
  data/profile.ts              # ALL site content — edit here
  layouts/Layout.astro         # base layout, SEO meta, font loading
  components/                  # Nav, Hero, About, Experience, Skills, Credentials, Writing, Contact, Footer, ThemeToggle
  pages/index.astro            # single-page composition
  styles/global.css            # Tailwind layer + utility classes
```

## A note on the SEO/branding choices

- **Title + meta description** lead with "OutSystems Architect & Champion" — recruiters search for those exact terms.
- **Schema.org Person markup** is rendered in `<head>` so search engines and AI assistants get structured data.
- The hero has **three signal pills** (Champion, availability, location) above the fold — these are the three things a recruiter wants to know in 2 seconds.
- The contact card uses the dedicated Outlook address, not the Babel work email.
