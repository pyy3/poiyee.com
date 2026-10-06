import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  // Singleton — only one instance, enforced via structure.ts
  fields: [
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'headline',
      description: 'The large sentence on the left. Bold words are set in the accent colour.',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The paragraphs on the right.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait photo',
      type: 'image',
      description: 'Shown whole (uncropped) under the statement. A photo of you in the studio works well.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Description',
          type: 'string',
          description: 'What the photo shows, for search engines and screen readers, e.g. "Poi Yee in her studio holding A day in Kyoto".',
        }),
        defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'Optional small line under the photo.' }),
      ],
    }),
    defineField({
      name: 'facts',
      title: 'Facts column',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'text',
              rows: 2,
              description: 'Press Enter for a second line.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Optional: makes the value a link, e.g. /contact',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      description: 'Lives & works, Medium, Enquiries, etc.',
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
