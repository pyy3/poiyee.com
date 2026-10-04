import type { StructureResolver } from 'sanity/structure';

// These document types are singletons (only one instance).
const SINGLETONS = ['about', 'siteSettings', 'privacy'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('About page')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Privacy page')
        .id('privacy')
        .child(S.document().schemaType('privacy').documentId('privacy')),
      S.divider(),
      S.documentTypeListItem('artwork').title('Artworks'),
      S.documentTypeListItem('exhibition').title('Exhibitions'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.documentTypeListItem('inquiry').title('Inquiries'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !['artwork', 'exhibition', 'post', 'page', 'inquiry', ...SINGLETONS].includes(item.getId() ?? ''),
      ),
    ]);
