# Go-live checklist — World of GA (Next.js + Sanity admin)

The site now runs as a Next.js app with a built-in admin at **`/studio`**.
Until Sanity is connected it still shows all current content (built-in fallback),
so nothing breaks — but editing only works after these steps. ~15 minutes total.

## 1. Create the (free) Sanity project — 3 min

1. Go to [sanity.io](https://www.sanity.io/) → **Get started** → sign up (Google login is easiest).
2. Create a new project — name it `World of GA`, dataset `production`, free plan.
3. Copy the **Project ID** (shown in the project dashboard at sanity.io/manage — looks like `ab12cd34`).

## 2. Connect it locally — 2 min

In the project folder:

```bash
cp .env.local.example .env.local
# open .env.local and replace your-project-id with the real Project ID
```

## 3. Allow the site to talk to Sanity (CORS) — 2 min

At [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → CORS origins** → Add:

- `http://localhost:3000` (allow credentials ✓)
- `https://YOUR-SITE.vercel.app` — your live Vercel URL (allow credentials ✓)
- your custom domain too, if you add one later

## 4. Load all the current content into the admin — 3 min

One command imports every photo, caption and paragraph the site has today:

```bash
npx sanity login          # log in with the account from step 1
npm run import-content    # imports seed/seed.ndjson + all 24 images
```

## 5. Put the keys on Vercel — 3 min

Vercel dashboard → your project → **Settings → Environment Variables** → add both:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your Project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

## 6. Push the new code — 2 min

```bash
git add -A
git commit -m "Rebuild as Next.js + Sanity admin"
git push
```

Vercel auto-deploys. Done — the admin lives at `https://YOUR-SITE.vercel.app/studio`.

## 7. Give Godwin access

[sanity.io/manage](https://www.sanity.io/manage) → project → **Members → Invite** → his email, role **Editor**
(or Administrator if he should manage members too).

---

# Using the admin (for Godwin)

Open **`/studio`** on the live site and log in. Left menu:

- **Site Settings** — email, socials, footer text.
- **Home Page** — headline, intro, hero image, the three services, the quote.
- **About / Contact Page** — bio, facts, steps, FAQ, form options.
- **Work Collections** — the 8 galleries. Open one to:
  - **add photos**: click *Photos → Add item*, upload, write a one-line description and caption;
  - change the cover image, description, status;
  - or hit the **＋** button on the collections list to create a whole new collection
    (set its *Order* number to slot it anywhere — every page, link and prev/next chain updates by itself).

Hit **Publish** after editing — the live site updates within about a minute. No code, no redeploys.

Drafts are saved automatically, so nothing goes live until Publish is pressed,
and every change has version history (Restore from the document menu).
