import Link from 'next/link'
import type { Settings } from '@/lib/types'

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="site-foot">
      <div className="foot-cta">
        <p className="eyebrow"><span className="num">Next</span> your story</p>
        <h2 className="display">Let&rsquo;s create <em>memories.</em><br />
          <Link href="/contact">Start a project <span style={{ fontSize: '.5em', verticalAlign: 'middle' }}>↗</span></Link>
        </h2>
      </div>
      <div className="foot-grid">
        <div className="foot-brand">
          <Link className="brand" href="/">{settings.brand}<span className="reg">®</span></Link>
          <p>{settings.footerBlurb}</p>
        </div>
        <div>
          <h5>Explore</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Collections</h5>
          <ul>
            <li><Link href="/work/studio-photography">Studio</Link></li>
            <li><Link href="/work/sports-photography">Sports</Link></li>
            <li><Link href="/work/everything-music">Music</Link></li>
            <li><Link href="/work/corporate-events-photos">Events</Link></li>
          </ul>
        </div>
        <div>
          <h5>Connect</h5>
          <ul>
            <li><a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={settings.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
            <li><a href={settings.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={`mailto:${settings.email}`}>Email</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <div className="foot-base-inner">
          <span>© {new Date().getFullYear()} World of GA — GA RA Art Productions</span>
          <span>Photography & film by {settings.photographer}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
