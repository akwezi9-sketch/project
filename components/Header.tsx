'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Settings } from '@/lib/types'

export default function Header({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const cur = (p: string): 'page' | undefined =>
    (p === '/work' ? pathname.startsWith('/work') : pathname === p) ? 'page' : undefined

  return (
    <>
      <header className="site-head">
        <div className="head-inner">
          <Link className="brand" href="/">{settings.brand}<span className="reg">®</span></Link>
          <nav className="site-nav" aria-label="Primary">
            <Link className="nav-link" href="/work" aria-current={cur('/work')}>Work<sup>08</sup></Link>
            <Link className="nav-link" href="/about" aria-current={cur('/about')}>About</Link>
            <Link className="nav-link" href="/contact" aria-current={cur('/contact')}>Contact</Link>
            <Link className="btn btn-gold" href="/contact">Book a shoot <span className="arr">→</span></Link>
          </nav>
          <button className="menu-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div className="nav-overlay">
        <nav aria-label="Mobile">
          <Link className="big-link" href="/">Home <em>start here</em></Link>
          <Link className="big-link" href="/work">Work <em>8 collections</em></Link>
          <Link className="big-link" href="/about">About <em>the world of GA</em></Link>
          <Link className="big-link" href="/contact">Contact <em>book a shoot</em></Link>
        </nav>
        <div className="ov-foot">
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={settings.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href={settings.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  )
}
