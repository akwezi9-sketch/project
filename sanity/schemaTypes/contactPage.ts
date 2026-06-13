import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'lede', title: 'Intro paragraph', type: 'text', rows: 2 }),
    defineField({
      name: 'shootTypes', title: 'Shoot types (form dropdown options)', type: 'array', of: [{ type: 'string' }],
    }),
    defineField({ name: 'responseNote', title: 'Response-time note', type: 'text', rows: 2 }),
    defineField({
      name: 'faqs', title: 'FAQ', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'q', title: 'Question', type: 'string' }),
          defineField({ name: 'a', title: 'Answer', type: 'text', rows: 3 }),
        ],
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
