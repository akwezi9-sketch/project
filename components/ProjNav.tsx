import Link from 'next/link'
import type { Collection } from '@/lib/types'

export default function ProjNav({ prev, next }: { prev: Collection; next: Collection }) {
  return (
    <nav className="proj-nav" aria-label="More collections">
      <Link href={`/work/${prev.slug}`}>
        <span className="tiny">← Previous</span>
        <span className="pn-title">{prev.title}</span>
      </Link>
      <Link href={`/work/${next.slug}`}>
        <span className="tiny">Next →</span>
        <span className="pn-title">{next.title}</span>
      </Link>
    </nav>
  )
}
