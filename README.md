# World of GA — Portfolio Website

Portfolio site for **Godwin Antiedu (GA)** — photographer & filmmaker, GA RA Art Productions.
Redesign of [capturedbyga.myportfolio.com](https://capturedbyga.myportfolio.com/).

**Stack:** Next.js (App Router) + Sanity CMS, deployed on Vercel.
Content is edited in the built-in admin at **`/studio`** — see [SETUP.md](SETUP.md) to connect it.

```bash
npm install
npm run dev          # http://localhost:3000
```

Until Sanity is configured the site renders from `lib/content-data.json` (a built-in
snapshot of all current content), so it works out of the box.

## Where things live

| What | Where |
|---|---|
| Pages | `app/(site)/…` |
| Admin (Sanity Studio) | `app/studio` + `sanity.config.ts` |
| Content models (what editors can edit) | `sanity/schemaTypes/` |
| Components (header, galleries, lightbox…) | `components/` |
| Design tokens & all styling | `app/globals.css` (`:root` block at the top) |
| Data fetching + fallback content | `lib/` |
| One-command content import | `seed/` + `npm run import-content` |
| The previous static version (archive) | `legacy-static/` |

## Editing content

Everything an editor needs — photos, captions, copy, socials, whole new gallery
collections — is done in `/studio` after the 15-minute [SETUP.md](SETUP.md) checklist.
Publishing updates the live site within a minute; no redeploys needed.

Old `.html` URLs from the static version redirect permanently to the new routes
(see `next.config.mjs`).
