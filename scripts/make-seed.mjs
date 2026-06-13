// Generates seed/seed.ndjson from lib/content-data.json for `sanity dataset import`.
// Image fields use _sanityAsset file references resolved relative to the ndjson file.
import { readFileSync, writeFileSync } from 'node:fs'

const data = JSON.parse(readFileSync(new URL('../lib/content-data.json', import.meta.url), 'utf8'))
const lines = []
const key = (p, i) => `${p}${i}`
const fileRef = (src) => `image@file://./images/${src.replace('/img/', '')}`
const img = (im, extra = {}) => ({ _type: 'image', _sanityAsset: fileRef(im.src), alt: im.alt ?? '', ...extra })

lines.push({ _id: 'siteSettings', _type: 'siteSettings', ...data.settings })

const h = data.home
lines.push({
  _id: 'homePage', _type: 'homePage',
  headlineTop: h.headlineTop, headlineBottom: h.headlineBottom, lede: h.lede,
  heroImage: img(h.hero), heroCaption: h.heroCaption, bookingStatus: h.bookingStatus,
  services: h.services.map((s, i) => ({ _type: 'object', _key: key('svc', i), ...s })),
  quote: h.quote, quoteHighlight: h.quoteHighlight,
})

const a = data.about
lines.push({
  _id: 'aboutPage', _type: 'aboutPage',
  portrait: img(a.portrait), portraitCaption: a.portraitCaption,
  paragraphs: a.paragraphs,
  facts: a.facts.map((f, i) => ({ _type: 'object', _key: key('fact', i), ...f })),
  steps: a.steps.map((s, i) => ({ _type: 'object', _key: key('step', i), ...s })),
  quote: a.quote,
})

lines.push({ _id: 'contactPage', _type: 'contactPage', ...data.contact,
  faqs: data.contact.faqs.map((f, i) => ({ _type: 'object', _key: key('faq', i), ...f })) })

for (const c of data.collections) {
  lines.push({
    _id: `collection-${c.slug}`, _type: 'collection',
    title: c.title, slug: { _type: 'slug', current: c.slug }, order: c.order,
    kind: c.kind, tags: c.tags,
    cover: img(c.cover),
    headlinePlain: c.headlinePlain, headlineItalic: c.headlineItalic,
    discipline: c.discipline, year: c.year, status: c.status, description: c.description,
    photos: (c.photos ?? []).map((p, i) => img(p, { _key: key('ph', i), caption: p.caption ?? '' })),
    ...(c.videoNote ? { videoNote: c.videoNote } : {}),
    ...(c.noteCard ? { noteCard: c.noteCard } : {}),
  })
}

writeFileSync(new URL('../seed/seed.ndjson', import.meta.url), lines.map((l) => JSON.stringify(l)).join('\n') + '\n')
console.log(`seed.ndjson written: ${lines.length} documents`)
