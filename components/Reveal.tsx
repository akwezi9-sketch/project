'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Re-implements the legacy [data-reveal] IntersectionObserver on every route. */
export default function Reveal() {
  const pathname = usePathname()
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
  return null
}
