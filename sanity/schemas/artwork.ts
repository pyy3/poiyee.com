import { defineType, defineField, defineArrayMember } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fieldsets: [
    { name: 'meta', title: 'Catalogue', options: { columns: 2 } },
    { name: 'physical', title: 'Physical work', options: { columns: 3 } },
    { name: 'store', title: 'Acquisition', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'number',
      title: 'Catalogue №',
      type: 'number',
      fieldset: 'meta',
      description: 'Position in the index (1, 2, 3…). Used for sort and display.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      fieldset: 'meta',
      description: 'Override the natural sort. Lower numbers come first.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      fieldset: 'physical',
      validation: (r) => r.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      fieldset: 'physical',
      initialValue: 'Oil on canvas',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (cm)',
      type: 'object',
      fieldset: 'physical',
      fields: [
        defineField({ name: 'width', title: 'Width', type: 'number' }),
        defineField({ name: 'height', title: 'Height', type: 'number' }),
        defineField({ name: 'depth', title: 'Depth', type: 'number' }),
      ],
      options: { columns: 3 },
    }),
    defineField({
      name: 'description',
      title: 'Statement',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Short piece statement shown on the artwork detail page.',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      description: 'Photos and videos of this painting. The first item marked “Primary” is the gallery thumbnail.',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mediaItem',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional — e.g. "Full canvas", "Detail · lower edge", "Install view, gallery wall"',
            }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Full canvas', value: 'full' },
                  { title: 'Detail crop', value: 'detail' },
                  { title: 'Install / gallery view', value: 'install' },
                  { title: 'Studio view', value: 'studio' },
                ],
                layout: 'radio',
              },
              initialValue: 'full',
            }),
            defineField({
              name: 'isPrimary',
              title: 'Primary (use as gallery thumbnail)',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'caption', subtitle: 'kind', media: 'image' },
            prepare({ title, subtitle, media }) {
              return { title: title || 'Untitled photo', subtitle, media };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for acquisition',
      type: 'boolean',
      fieldset: 'store',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      fieldset: 'store',
      hidden: ({ document }) => !document?.isAvailable,
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Currency',
      type: 'string',
      fieldset: 'store',
      options: { list: ['INR', 'USD', 'EUR', 'GBP'], layout: 'radio' },
      initialValue: 'INR',
      hidden: ({ document }) => !document?.isAvailable,
    }),
    defineField({
      name: 'editionInfo',
      title: 'Edition info',
      type: 'string',
      fieldset: 'store',
      description: 'e.g. "Original, 1 of 1" or "Edition of 5"',
      hidden: ({ document }) => !document?.isAvailable,
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      fieldset: 'store',
      description: 'Paste the Stripe price_xxx id once created in Stripe dashboard.',
      hidden: ({ document }) => !document?.isAvailable,
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Year (newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Catalogue №', name: 'number', by: [{ field: 'number', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      number: 'number',
      year: 'year',
      media: 'media.0.image',
    },
    prepare({ title, number, year, media }) {
      const prefix = number ? `№ ${String(number).padStart(2, '0')} · ` : '';
      return { title: `${prefix}${title}`, subtitle: year ? `${year}` : undefined, media };
    },
  },
});
