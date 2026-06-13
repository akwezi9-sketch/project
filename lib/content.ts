import { client, hasSanity } from './sanity.client'
import { settingsQ, homeQ, collectionsQ, aboutQ, contactQ } from './queries'
import fallback from './content-data.json'
import type { Settings, HomeContent, AboutContent, ContactContent, Collection } from './types'

// Editors see changes on the live site within a minute of publishing.
const opts = { next: { revalidate: 60 } }

async function fetchOr<T>(query: string, fb: T): Promise<T> {
  if (!hasSanity || !client) return fb
  try {
    const res = await client.fetch<T>(query, {}, opts)
    return res ?? fb
  } catch {
    return fb
  }
}

export const getSettings = () => fetchOr<Settings>(settingsQ, fallback.settings as Settings)
export const getHome = () => fetchOr<HomeContent>(homeQ, fallback.home as HomeContent)
export const getAbout = () => fetchOr<AboutContent>(aboutQ, fallback.about as AboutContent)
export const getContact = () => fetchOr<ContactContent>(contactQ, fallback.contact as ContactContent)

export async function getCollections(): Promise<Collection[]> {
  const res = await fetchOr<Collection[]>(collectionsQ, fallback.collections as Collection[])
  return (res && res.length ? res : (fallback.collections as Collection[]))
    .slice()
    .sort((a, b) => a.order - b.order)
}

export async function getCollection(slug: string): Promise<Collection | undefined> {
  return (await getCollections()).find((c) => c.slug === slug)
}
