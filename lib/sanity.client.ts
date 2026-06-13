import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Content editing works once the Sanity project is wired up (see SETUP.md).
// Until then the site renders from lib/content-data.json.
export const hasSanity = Boolean(projectId && projectId !== 'placeholder' && projectId !== 'your-project-id')

export const client = hasSanity
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
  : null

/** Append sizing params to Sanity CDN urls; local /img paths pass through. */
export function sized(src: string | undefined, w: number): string {
  if (!src) return ''
  return src.includes('cdn.sanity.io') ? `${src}?auto=format&w=${w}` : src
}
