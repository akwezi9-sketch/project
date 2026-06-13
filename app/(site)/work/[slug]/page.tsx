import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Gallery from '@/components/Gallery'
import Reel from '@/components/Reel'
import NoteCard from '@/components/NoteCard'
import ProjNav from '@/components/ProjNav'
import { getCollection, getCollections, getSettings } from '@/lib/content'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = await getCollection(slug)
  if (!c) return {}
  return { title: c.title, description: c.description }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [c, all, settings] = await Promise.all([getCollection(slug), getCollections(), getSettings()])
  if (!c) notFound()

  const i = all.findIndex((x) => x.slug === c.slug)
  const prev = all[(i - 1 + all.length) % all.length]
  const next = all[(i + 1) % all.length]
  const framesLabel = c.kind === 'video' ? 'Reels & films' : String(c.photos?.length ?? 0).padStart(2, '0')

  return (
    <>
      <section className="gal-hero shell">
        <p className="crumbs">
          <Link href="/">Home</Link> / <Link href="/work">Work</Link> / <span>{c.title}</span>
        </p>
        <h1 className="display">{c.headlinePlain} <em>{c.headlineItalic}</em></h1>
        <div className="gal-meta">
          <div className="tiny">Discipline<b>{c.discipline}</b></div>
          <div className="tiny">Year<b>{c.year}</b></div>
          <div className="tiny">{c.kind === 'video' ? 'Format' : 'Frames'}<b>{framesLabel}</b></div>
          <div className="tiny">Status<b>{c.status}</b></div>
        </div>
        <p className="gal-desc lede">{c.description}</p>
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        {c.kind === 'video' ? (
          <>
            <Reel cover={c.cover} youtube={settings.youtube} />
            {c.videoNote && !c.noteCard && <div className="note-card" data-reveal=""><p>{c.videoNote}</p></div>}
          </>
        ) : (
          <Gallery photos={c.photos ?? []} single={(c.photos?.length ?? 0) === 1} />
        )}
        {c.noteCard?.text && <NoteCard note={c.noteCard} />}
      </section>

      <ProjNav prev={prev} next={next} />
    </>
  )
}
