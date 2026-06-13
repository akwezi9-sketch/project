import Link from 'next/link'
import Marquee from '@/components/Marquee'
import WorkCard from '@/components/WorkCard'
import { getHome, getCollections, getSettings } from '@/lib/content'
import { sized } from '@/lib/sanity.client'

export const revalidate = 60

const SPANS = ['span-7', 'span-5', 'span-5', 'span-7', 'span-4', 'span-4', 'span-4', 'span-8']

export default async function HomePage() {
  const [home, collections, settings] = await Promise.all([getHome(), getCollections(), getSettings()])

  function highlight(quote: string, hl?: string) {
    if (!hl || !quote.includes(hl)) return <>{quote}</>
    const [a, b] = quote.split(hl)
    return <>{a}<span className="hl">{hl}</span>{b}</>
  }

  return (
    <>
      <section className="hero shell">
        <span className="hero-bg-word" aria-hidden="true">WORLD&nbsp;OF&nbsp;GA</span>
        <div className="hero-copy">
          <p className="eyebrow"><span className="num">{settings.photographer}</span> — photographer &amp; filmmaker</p>
          <h1 className="display">
            <span className="row"><span>{home.headlineTop}</span></span>
            <span className="row"><span>by <em>{home.headlineBottom}</em></span></span>
          </h1>
          <p className="lede">{home.lede}</p>
          <div className="hero-cta">
            <Link className="btn btn-gold" href="/work">View the work <span className="arr">→</span></Link>
            <Link className="btn btn-line" href="/contact">Book a shoot</Link>
          </div>
          <div className="hero-meta">
            <div>Focus<b>Photo &amp; film</b></div>
            <div>Collections<b>{String(collections.length).padStart(2, '0')} bodies of work</b></div>
            <div>Bookings<b>{home.bookingStatus}</b></div>
          </div>
        </div>
        <figure className="hero-fig">
          <div className="frame">
            <img src={sized(home.hero?.src, 1600)} alt={home.hero?.alt ?? ''} fetchPriority="high" />
          </div>
          <figcaption><span>{home.heroCaption}</span><span>2026</span></figcaption>
        </figure>
        <p className="scroll-hint">Scroll</p>
      </section>

      <Marquee items={['Studio', 'Sports', 'Music', 'Brands', 'Events', 'Film']} />

      <section className="section shell" id="work">
        <div className="work-head">
          <div data-reveal="">
            <p className="eyebrow"><span className="num">01</span> Selected work</p>
            <h2 className="display">Eight worlds, <em>one eye.</em></h2>
          </div>
          <Link className="btn btn-line" href="/work" data-reveal="" style={{ ['--d' as string]: '.15s' } as React.CSSProperties}>
            All collections <span className="arr">→</span>
          </Link>
        </div>
        <div className="work-grid">
          {collections.map((c, i) => (
            <WorkCard key={c.slug} c={c} span={SPANS[i % SPANS.length]} delay={i % 2 ? '.1s' : undefined} eager={i === 0} />
          ))}
          <Link className="work-card span-4" href="/work" data-reveal=""
            style={{ ['--d' as string]: '.1s', background: 'var(--ink-2)' } as React.CSSProperties}>
            <div className="wc-bar" style={{ position: 'static', background: 'none', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ textAlign: 'center' }}>See every<br />collection <span style={{ color: 'var(--gold)' }}>↗</span></h3>
            </div>
          </Link>
        </div>
      </section>

      <section className="section section-line shell">
        <p className="eyebrow" data-reveal=""><span className="num">02</span> What GA does</p>
        <h2 className="display" data-reveal="" style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', marginBottom: '3rem' }}>
          Built around <em>your vision.</em>
        </h2>
        <div className="svc-grid">
          {home.services?.map((s, i) => (
            <article className="svc" data-reveal="" key={s.title}
              style={i ? ({ ['--d' as string]: `${i * 0.12}s` } as React.CSSProperties) : undefined}>
              <span className="svc-num">No. {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
              <ul>{s.items?.map((it) => <li key={it}>{it}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-line">
        <div className="shell statement" data-reveal="">
          <p>&ldquo;{highlight(home.quote, home.quoteHighlight)}&rdquo;</p>
          <p className="tiny who">— {settings.photographer}, World of GA</p>
        </div>
      </section>

      <Marquee gold items={['Let’s create memories', 'Bring your visions to life', 'Book for 2026']} />
    </>
  )
}
