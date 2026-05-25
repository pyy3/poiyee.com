import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  // Singleton — only one instance, enforced via structure.ts
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio (long form)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Shown in the About section. Use italics for emphasis.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait photo',
      type: 'image',
      options: { hotspot: true },
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
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      description: 'Lives & works, Medium, Representation, etc.',
    }),
  ],
  preview: { prepare: () => ({ title: 'About page' }) },
});
