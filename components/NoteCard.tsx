import Link from 'next/link'
import type { NoteCard as NoteCardT } from '@/lib/types'

function Btn({ href, label, gold }: { href: string; label: string; gold?: boolean }) {
  const cls = gold ? 'btn btn-gold' : 'btn btn-line'
  if (href.startsWith('/')) return <Link className={cls} href={href}>{label} <span className="arr">→</span></Link>
  return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{label} <span className="arr">→</span></a>
}

export default function NoteCard({ note }: { note: NoteCardT }) {
  return (
    <div className="note-card" data-reveal="">
      <p>{note.text}</p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {note.primaryHref && note.primaryLabel && <Btn href={note.primaryHref} label={note.primaryLabel} gold />}
        {note.secondaryHref && note.secondaryLabel && <Btn href={note.secondaryHref} label={note.secondaryLabel} />}
      </div>
    </div>
  )
}
