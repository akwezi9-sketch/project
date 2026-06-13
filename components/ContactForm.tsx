'use client'

import { useState } from 'react'

export default function ContactForm({ email, shootTypes }: { email: string; shootTypes: string[] }) {
  const [note, setNote] = useState('')

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Booking enquiry — ${f.get('type') || 'General'} — ${f.get('name')}`)
    const body = encodeURIComponent(`${f.get('msg')}\n\n— ${f.get('name')}\n${f.get('email')}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setNote(`Your email app should open now — if not, write to ${email}`)
  }

  return (
    <form id="contact-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-type">What are we shooting?</label>
        <select id="cf-type" name="type" defaultValue={shootTypes[0]}>
          {shootTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">The vision</label>
        <textarea id="cf-msg" name="msg" required placeholder="Date, place, what you're making…" />
      </div>
      <button className="btn btn-gold" type="submit">Send enquiry <span className="arr">→</span></button>
      <p className="form-note tiny" role="status" style={{ marginTop: '1rem' }}>{note}</p>
      <p className="tiny" style={{ marginTop: '.6rem' }}>
        The form opens your email app — or write directly to <a href={`mailto:${email}`} style={{ textDecoration: 'underline' }}>{email}</a>.
      </p>
    </form>
  )
}
