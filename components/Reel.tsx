import { sized } from '@/lib/sanity.client'
import type { Img } from '@/lib/types'

export default function Reel({ cover, youtube }: { cover: Img; youtube: string }) {
  return (
    <a className="reel" href={youtube} target="_blank" rel="noopener noreferrer" data-reveal="">
      <img src={sized(cover?.src, 1920)} alt={cover?.alt ?? ''} />
      <div className="reel-inner">
        <span className="play-btn" aria-hidden="true">▶</span>
        <h3>Watch the reels on YouTube</h3>
        <span className="tiny">@ga_pov</span>
      </div>
    </a>
  )
}
