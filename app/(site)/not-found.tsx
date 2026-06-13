import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="gal-hero shell" style={{ minHeight: '60vh' }}>
      <p className="crumbs"><Link href="/">Home</Link> / <span>404</span></p>
      <h1 className="display">Frame not <em>found.</em></h1>
      <p className="gal-desc lede">That page isn&rsquo;t in the contact sheet. Head back to the work instead.</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link className="btn btn-gold" href="/">Back home <span className="arr">→</span></Link>
        <Link className="btn btn-line" href="/work">View collections</Link>
      </div>
    </section>
  )
}
