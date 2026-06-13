export type Img = { src: string; alt?: string; caption?: string }
export type Service = { title: string; blurb: string; items: string[] }
export type NoteCard = {
  text: string
  primaryLabel?: string; primaryHref?: string
  secondaryLabel?: string; secondaryHref?: string
}
export type Collection = {
  slug: string; title: string; order: number
  kind: 'photo' | 'video'; tags: string[]
  cover: Img
  headlinePlain: string; headlineItalic: string
  discipline: string; year: string; status: string
  description: string
  photos: Img[]
  videoNote?: string
  noteCard?: NoteCard
}
export type HomeContent = {
  headlineTop: string; headlineBottom: string; lede: string
  hero: Img; heroCaption: string; bookingStatus: string
  services: Service[]; quote: string; quoteHighlight?: string
}
export type AboutContent = {
  portrait: Img; portraitCaption: string; paragraphs: string[]
  facts: { label: string; value: string; href?: string }[]
  steps: { title: string; text: string }[]
  quote: string
}
export type ContactContent = {
  lede: string; shootTypes: string[]; responseNote: string
  faqs: { q: string; a: string }[]
}
export type Settings = {
  brand: string; photographer: string; email: string
  instagram: string; youtube: string; linkedin: string; footerBlurb: string
}
