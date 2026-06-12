# World of GA — Portfolio Website

A complete redesign of [capturedbyga.myportfolio.com](https://capturedbyga.myportfolio.com/) for
**Godwin Antiedu (GA)** — photographer & filmmaker, GA RA Art Productions.

Pure static HTML/CSS/JS. No build step, no framework, no backend. Open `index.html` in a browser
or drop the folder on any static host.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Work (all collections, filterable) | `work.html` |
| About *(new)* | `about.html` |
| Contact + FAQ | `contact.html` |
| Studio Photography | `studio-photography.html` |
| Sports Photography | `sports-photography.html` |
| Everything Music | `everything-music.html` |
| Sports Videography | `sports-videography.html` |
| Corporate Events (photos) | `corporate-events-photos.html` |
| Corporate Event Videos | `corporate-event-videos.html` |
| Branding, Clothing & More | `branding-clothing-and-more.html` |
| Ads & Commercials | `ads-commercials.html` |

## What was improved vs. the old Adobe Portfolio site

- **Brand identity.** Custom "darkroom editorial" design — ink black, warm bone, gold accent,
  Big Shoulders Display + Archivo + Instrument Serif — instead of a default template.
- **No more empty pages.** The four categories that had no content (both video categories,
  branding, ads) now present a cinematic "watch the reel" panel linking to the YouTube channel
  (@ga_pov) and cross-link related photo collections.
- **New About page** with bio, process (brief → plan → shoot → deliver) and facts.
- **Real contact page.** Enquiry form (opens the visitor's email app — no server needed),
  direct email, socials, response-time note and an FAQ.
- **Filterable work index**, lightbox photo viewer with keyboard navigation, prev/next
  navigation between collections, scroll-reveal animations, film-grain texture.
- **Fixed details.** "Commericals" typo in the URL slug, consistent naming, SEO titles +
  meta descriptions on every page, descriptive alt text, lazy-loaded images,
  `prefers-reduced-motion` support, responsive mobile layout with a full-screen menu.
- **Self-contained images.** All 24 photos were pulled from the old site's CDN into
  `assets/img/` so nothing depends on Adobe.

## Editing

- **Copy/text:** edit the HTML files directly — content is plain markup.
- **Photos:** drop files into `assets/img/` and add a `<figure class="ph">` block inside any
  `.masonry` section (the lightbox picks it up automatically).
- **Colors/fonts:** all design tokens live at the top of `css/style.css` (`:root`).
- **Email destination:** the form's address is set in `js/main.js` (search for `mailto`).

## Deploying

Any static host works:

- **Netlify:** drag the folder into app.netlify.com → instant URL, free tier.
- **GitHub Pages:** push the folder to a repo → Settings → Pages → deploy from branch.
- **Vercel:** `vercel deploy` from this folder.

To connect a custom domain (e.g. `capturedbyga.com`), add it in the host's dashboard and
point the domain's DNS at it.
