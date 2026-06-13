'use client'

import { useCallback, useEffect, useState } from 'react'
import { sized } from '@/lib/sanity.client'
import type { Img } from '@/lib/types'

export default function Gallery({ photos, single = false }: { photos: Img[]; single?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null)

  const show = useCallback(
    (i: number) => setIdx((i + photos.length) % photos.length),
    [photos.length]
  )

  useEffect(() => {
    if (idx === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null)
      if (e.key === 'ArrowLeft') show(idx - 1)
      if (e.key === 'ArrowRight') show(idx + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [idx, show])

  const cur = idx === null ? null : photos[idx]

  return (
    <>
      <div
        className={`masonry${photos.length >= 10 ? ' cols-2' : ''}`}
        style={single ? { columns: 1, maxWidth: 980 } : undefined}
      >
        {photos.map((p, i) => (
          <figure className="ph" data-reveal="" key={i} onClick={() => setIdx(i)}>
            <img src={sized(p.src, 1600)} alt={p.alt ?? ''} loading={i > 1 ? 'lazy' : undefined} />
            {p.caption ? <figcaption className="ph-cap">{p.caption} — World of GA</figcaption> : null}
          </figure>
        ))}
      </div>
      {cur && (
        <div className="lightbox is-open" role="dialog" aria-label="Image viewer"
          onClick={(e) => { if (e.target === e.currentTarget) setIdx(null) }}>
          <button className="lb-btn lb-close" aria-label="Close" onClick={() => setIdx(null)}>✕</button>
          <button className="lb-btn lb-prev" aria-label="Previous image" onClick={() => show(idx! - 1)}>←</button>
          <img src={sized(cur.src, 1920)} alt={cur.alt ?? ''} />
          <p className="lb-cap">{cur.caption ? `${cur.caption} — World of GA` : cur.alt}</p>
          <button className="lb-btn lb-next" aria-label="Next image" onClick={() => show(idx! + 1)}>→</button>
        </div>
      )}
    </>
  )
}
