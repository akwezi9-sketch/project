export default function Marquee({ items, gold = false }: { items: string[]; gold?: boolean }) {
  const row = [...items, ...items]
  return (
    <div className={gold ? 'marquee gold' : 'marquee'} aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  )
}
