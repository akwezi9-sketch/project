import type { Metadata } from 'next'
import Link from 'next/link'
import { getAbout, getSettings } from '@/lib/content'
import { sized } from '@/lib/sanity.client'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About',
  description: 'Godwin Antiedu — the photographer and filmmaker behind World of GA and GA RA Art Productions.',
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()])
  return (
    <>
      <section className="gal-hero shell">
        <p className="crumbs"><Link href="/">Home</Link> / <span>About</span></p>
        <h1 className="display">The world <em>of GA.</em></h1>
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="split">
          <figure className="sticky-fig" data-reveal="">
            <img src={sized(about.portrait?.src, 1600)} alt={about.portrait?.alt ?? ''} />
            <figcaption className="tiny" style={{ marginTop: '.8rem' }}>{about.portraitCaption}</figcaption>
          </figure>
          <div>
            {about.paragraphs?.map((p, i) => (
              <p key={i} className={i === 0 ? 'lede' : undefined} data-reveal=""
                style={{ marginBottom: '1.4rem', ...(i > 0 ? { color: 'var(--bone-dim)' } : {}) }}>
                {p}
              </p>
            ))}
            <div style={{ marginTop: '2.5rem' }} data-reveal="">
              {about.facts?.map((f) => (
                <div className="fact-row" key={f.label}>
                  <span className="k">{f.label}</span>
                  {f.href ? <a href={f.href} style={{ color: 'var(--bone)' }}>{f.value}</a> : <span>{f.value}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-line shell">
        <p className="eyebrow" data-reveal=""><span className="num">02</span> How it works</p>
        <h2 className="display" data-reveal="" style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)', marginBottom: '2rem' }}>
          Brief to <em>delivery.</em>
        </h2>
        <div className="steps" style={{ maxWidth: '52rem' }}>
          {about.steps?.map((s) => (
            <div className="step" data-reveal="" key={s.title}>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-line">
        <div className="shell statement" data-reveal="">
          <p>&ldquo;{about.quote}&rdquo;</p>
          <p className="tiny who">— {settings.photographer}</p>
        </div>
      </section>

      <section className="section section-line shell" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link className="btn btn-gold" href="/contact">Book a shoot <span className="arr">→</span></Link>
        <Link className="btn btn-line" href="/work">See the work</Link>
      </section>
    </>
  )
}
