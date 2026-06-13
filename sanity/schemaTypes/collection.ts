import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Work Collections',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Collection name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Web address (click Generate)', type: 'slug',
      options: { source: 'title' }, validation: (r) => r.required(),
    }),
    defineField({
      name: 'order', title: 'Order on the site (1 = first)', type: 'number',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'kind', title: 'Type of collection', type: 'string',
      options: { list: [
        { title: 'Photo gallery', value: 'photo' },
        { title: 'Video / reel (links to YouTube)', value: 'video' },
      ], layout: 'radio' },
      initialValue: 'photo', validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags', title: 'Filter tags (used by the Work page filters)', type: 'array',
      of: [{ type: 'string' }],
      options: { list: [
        { title: 'Photography', value: 'photo' }, { title: 'Film', value: 'film' },
        { title: 'Sports', value: 'sports' }, { title: 'Events', value: 'events' },
        { title: 'Commercial', value: 'commercial' }, { title: 'Music', value: 'music' },
        { title: 'Brand', value: 'brand' },
      ] },
    }),
    defineField({
      name: 'cover', title: 'Cover image (shown on Home and Work pages)', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Describe the image', type: 'string' })],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'headlinePlain', title: 'Page headline — plain part', type: 'string', description: 'e.g. "Match-day" (shown bold)' }),
    defineField({ name: 'headlineItalic', title: 'Page headline — gold italic part', type: 'string', description: 'e.g. "energy." (shown gold italic)' }),
    defineField({ name: 'discipline', title: 'Discipline label', type: 'string', description: 'e.g. "Sports photography"' }),
    defineField({ name: 'year', title: 'Year label', type: 'string', initialValue: '2026' }),
    defineField({ name: 'status', title: 'Status label', type: 'string', initialValue: 'Booking now' }),
    defineField({ name: 'description', title: 'Intro paragraph', type: 'text', rows: 3 }),
    defineField({
      name: 'photos', title: 'Photos', type: 'array',
      hidden: ({ document }) => document?.kind === 'video',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Describe the photo', type: 'string' }),
          defineField({ name: 'caption', title: 'Caption (shown on hover & in viewer)', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'videoNote', title: 'Video page note', type: 'text', rows: 3,
      hidden: ({ document }) => document?.kind !== 'video',
      description: 'Short paragraph shown next to the "Watch on YouTube" button.',
    }),
    defineField({
      name: 'noteCard', title: 'Note card (optional, for thin collections)', type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Note text', type: 'text', rows: 2 }),
        defineField({ name: 'primaryLabel', title: 'Gold button label', type: 'string' }),
        defineField({ name: 'primaryHref', title: 'Gold button link', type: 'string' }),
        defineField({ name: 'secondaryLabel', title: 'Outline button label', type: 'string' }),
        defineField({ name: 'secondaryHref', title: 'Outline button link', type: 'string' }),
      ],
    }),
  ],
  orderings: [{ title: 'Site order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'discipline', media: 'cover', order: 'order' },
    prepare: ({ title, subtitle, media, order }) => ({
      title: `${String(order ?? '?').padStart(2, '0')} — ${title}`, subtitle, media,
    }),
  },
})
