import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import { getContact, getSettings } from '@/lib/content'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Contact — Book a Shoot',
  description: 'Book a shoot with World of GA — studio, sports, music, brand and event photography & film.',
}

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()])
  return (
    <>
      <section className="gal-hero shell">
        <p className="crumbs"><Link href="/">Home</Link> / <span>Contact</span></p>
        <h1 className="display">Let&rsquo;s <em>create.</em></h1>
        <p className="gal-desc lede">{contact.lede}</p>
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="contact-grid">
          <div data-reveal="">
            <ContactForm email={settings.email} shootTypes={contact.shootTypes ?? []} />
          </div>
          <div>
            <div className="contact-card" data-reveal="">
              <p className="tiny">Email</p>
              <a className="big-mail" href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
            <div className="contact-card" data-reveal="" style={{ ['--d' as string]: '.1s' } as React.CSSProperties}>
              <p className="tiny">Follow the work</p>
              <div className="soc-list">
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer"><span>Instagram</span><span>↗</span></a>
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer"><span>YouTube</span><span>↗</span></a>
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><span>↗</span></a>
              </div>
            </div>
            <div className="contact-card" data-reveal="" style={{ ['--d' as string]: '.2s' } as React.CSSProperties}>
              <p className="tiny">Response time</p>
              <p style={{ color: 'var(--bone-dim)' }}>{contact.responseNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-line shell">
        <p className="eyebrow" data-reveal=""><span className="num">FAQ</span> Before you ask</p>
        <div className="faq" style={{ maxWidth: '50rem' }} data-reveal="">
          {contact.faqs?.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
