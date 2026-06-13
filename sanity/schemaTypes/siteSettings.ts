import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'brand', title: 'Brand name', type: 'string', initialValue: 'WORLD OF GA' }),
    defineField({ name: 'photographer', title: 'Photographer name', type: 'string', initialValue: 'Godwin Antiedu' }),
    defineField({ name: 'email', title: 'Booking email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({
      name: 'footerBlurb', title: 'Footer blurb', type: 'text', rows: 2,
      description: 'Short line under the brand name in the footer.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
