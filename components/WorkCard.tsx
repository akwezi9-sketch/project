import Link from 'next/link'
import { sized } from '@/lib/sanity.client'
import type { Collection } from '@/lib/types'

const TAG_LABEL: Record<string, string> = {
  photo: 'Photography', film: 'Film', sports: 'Sports', events: 'Events',
  commercial: 'Commercial', music: 'Music', brand: 'Brand',
}

export default function WorkCard({
  c, span, delay, eager = false,
}: { c: Collection; span: string; delay?: string; eager?: boolean }) {
  return (
    <Link
      className={`work-card ${span}`}
      href={`/work/${c.slug}`}
      data-tags={c.tags?.join(' ')}
      data-reveal=""
      style={delay ? ({ ['--d' as string]: delay } as React.CSSProperties) : undefined}
    >
      <span className="wc-tag">{TAG_LABEL[c.tags?.[0]] ?? c.discipline}</span>
      <span className="wc-arrow" aria-hidden="true">↗</span>
      <div className="wc-img">
        <img src={sized(c.cover?.src, 1280)} alt={c.cover?.alt ?? c.title} loading={eager ? undefined : 'lazy'} />
      </div>
      <div className="wc-bar">
        <h3>{c.title}</h3>
        <span className="idx">{String(c.order).padStart(2, '0')}</span>
      </div>
    </Link>
  )
}
