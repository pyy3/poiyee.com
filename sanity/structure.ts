import type { StructureResolver } from 'sanity/structure';

// Two of our document types are singletons (only one instance).
const SINGLETONS = ['about', 'siteSettings'];

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
      S.divider(),
      S.documentTypeListItem('artwork').title('Artworks'),
      S.documentTypeListItem('exhibition').title('Exhibitions'),
      S.documentTypeListItem('post').title('Posts'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['artwork', 'exhibition', 'post', ...SINGLETONS].includes(item.getId() ?? ''),
      ),
    ]);
