import type { StructureResolver } from 'sanity/structure'

// Singletons pinned at the top; collections listed in site order.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('World of GA')
    .items([
      S.listItem().title('Site Settings').id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('Home Page').id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('About Page').id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem().title('Contact Page').id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      S.documentTypeListItem('collection').title('Work Collections'),
    ])
