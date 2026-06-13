import { groq } from 'next-sanity'

const IMG = (field: string) => `{"src": ${field}.asset->url, "alt": ${field}.alt}`

export const settingsQ = groq`*[_type == "siteSettings"][0]{
  brand, photographer, email, instagram, youtube, linkedin, footerBlurb
}`

export const homeQ = groq`*[_type == "homePage"][0]{
  headlineTop, headlineBottom, lede,
  "hero": ${IMG('heroImage')},
  heroCaption, bookingStatus,
  services[]{title, blurb, items},
  quote, quoteHighlight
}`

export const collectionsQ = groq`*[_type == "collection"] | order(order asc){
  title, "slug": slug.current, order, kind, tags,
  "cover": ${IMG('cover')},
  headlinePlain, headlineItalic, discipline, year, status, description,
  "photos": photos[]{"src": asset->url, "alt": alt, "caption": caption},
  videoNote, noteCard
}`

export const aboutQ = groq`*[_type == "aboutPage"][0]{
  "portrait": ${IMG('portrait')},
  portraitCaption, paragraphs, facts, steps, quote
}`

export const contactQ = groq`*[_type == "contactPage"][0]{
  lede, shootTypes, responseNote, faqs
}`
