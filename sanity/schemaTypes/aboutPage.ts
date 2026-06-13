import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'portrait', title: 'Portrait / image', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string' })],
    }),
    defineField({ name: 'portraitCaption', title: 'Image caption', type: 'string' }),
    defineField({ name: 'paragraphs', title: 'Bio paragraphs', type: 'array', of: [{ type: 'text', rows: 3 }] }),
    defineField({
      name: 'facts', title: 'Quick facts', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'href', title: 'Link (optional)', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'steps', title: 'How it works (the 4 steps)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Step name', type: 'string' }),
          defineField({ name: 'text', title: 'Step description', type: 'text', rows: 2 }),
        ],
      }],
    }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
