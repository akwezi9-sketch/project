'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

const configured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder' &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id'
)

export default function StudioPage() {
  if (!configured) {
    return (
      <div style={{
        minHeight: '100dvh', display: 'grid', placeItems: 'center',
        background: '#0d0c0a', color: '#f0e9dc', fontFamily: 'sans-serif', padding: '2rem',
      }}>
        <div style={{ maxWidth: 560, lineHeight: 1.6 }}>
          <h1 style={{ color: '#e0a32e', marginBottom: '1rem' }}>Admin not connected yet</h1>
          <p>The studio needs a (free) Sanity project before it can open.</p>
          <ol style={{ margin: '1rem 0 1rem 1.2rem' }}>
            <li>Create a project at <strong>sanity.io</strong></li>
            <li>Put its ID in <code>.env.local</code> (and in Vercel&rsquo;s environment variables)</li>
            <li>Run <code>npm run import-content</code> once to load the current site content</li>
          </ol>
          <p>The exact steps are in <strong>SETUP.md</strong> in the project folder.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="studio-shell">
      <NextStudio config={config} />
    </div>
  )
}
