import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site title', type: 'string', initialValue: 'poiyee' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'Paintings — Acrylic on canvas' }),
    defineField({
      name: 'lede',
      title: 'Hero lede',
      type: 'text',
      rows: 3,
      description: 'Italic serif line shown under the artist name on the landing page.',
    }),
    defineField({
      name: 'heroArtwork',
      title: 'Hero artwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
      description: 'The single piece featured floating in the hero. Pick a signature work.',
    }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
