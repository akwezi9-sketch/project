import type { Metadata } from 'next'
import Link from 'next/link'
import Marquee from '@/components/Marquee'
import WorkGrid from '@/components/WorkGrid'
import { getCollections } from '@/lib/content'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Work — All Collections',
  description: 'Eight collections across photo and film — studio portraits, sports, music visuals, brand campaigns, ads and corporate events.',
}

export default async function WorkPage() {
  const collections = await getCollections()
  return (
    <>
      <section className="gal-hero shell">
        <p className="crumbs"><Link href="/">Home</Link> / <span>Work</span></p>
        <h1 className="display">The <em>work.</em></h1>
        <p className="gal-desc lede">
          Eight collections across photo and film — studio portraits, match-day sport, music visuals,
          brand campaigns, ads and the corporate events that matter. Filter by discipline or browse the lot.
        </p>
        <div style={{ paddingBottom: '1rem' }}>
          <WorkGrid collections={collections} />
        </div>
      </section>
      <Marquee gold items={['Let’s create memories', 'Bring your visions to life', 'Book for 2026']} />
    </>
  )
}
