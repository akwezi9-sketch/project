import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'headlineTop', title: 'Headline — first line', type: 'string', initialValue: 'Captured' }),
    defineField({
      name: 'headlineBottom', title: 'Headline — second line (shown in gold italic after "by")',
      type: 'string', initialValue: 'GA.',
    }),
    defineField({ name: 'lede', title: 'Intro paragraph', type: 'text', rows: 3 }),
    defineField({
      name: 'heroImage', title: 'Hero image', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image (for accessibility)', type: 'string' })],
    }),
    defineField({ name: 'heroCaption', title: 'Hero image caption', type: 'string', initialValue: 'Portrait session' }),
    defineField({ name: 'bookingStatus', title: 'Booking status line', type: 'string', initialValue: 'Open — 2026' }),
    defineField({
      name: 'services', title: 'Services (the three columns)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Service name', type: 'string' }),
          defineField({ name: 'blurb', title: 'One-sentence description', type: 'text', rows: 2 }),
          defineField({ name: 'items', title: 'Bullet points', type: 'array', of: [{ type: 'string' }] }),
        ],
      }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'quote', title: 'Statement quote', type: 'text', rows: 3 }),
    defineField({ name: 'quoteHighlight', title: 'Words in the quote to highlight gold', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
