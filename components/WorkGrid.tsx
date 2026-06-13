'use client'

import { useState } from 'react'
import WorkCard from './WorkCard'
import type { Collection } from '@/lib/types'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Photography', value: 'photo' },
  { label: 'Film', value: 'film' },
  { label: 'Sports', value: 'sports' },
  { label: 'Events', value: 'events' },
  { label: 'Commercial', value: 'commercial' },
]

// span rhythm matching the editorial grid on the home page
const SPANS = ['span-7', 'span-5', 'span-5', 'span-7', 'span-4', 'span-4', 'span-4', 'span-8']

export default function WorkGrid({ collections }: { collections: Collection[] }) {
  const [filter, setFilter] = useState('all')
  return (
    <>
      <div className="filters" data-reveal="" style={{ marginTop: '2.2rem' }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`chip${filter === f.value ? ' is-on' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="work-grid" style={{ marginTop: '2.6rem' }}>
        {collections.map((c, i) => (
          <div
            key={c.slug}
            style={{ display: filter === 'all' || c.tags?.includes(filter) ? 'contents' : 'none' }}
          >
            <WorkCard c={c} span={SPANS[i % SPANS.length]} delay={i % 2 ? '.1s' : undefined} />
          </div>
        ))}
      </div>
    </>
  )
}
