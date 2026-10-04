import { defineType, defineField } from 'sanity';

export const privacy = defineType({
  name: 'privacy',
  title: 'Privacy page',
  type: 'document',
  // Singleton — only one instance, enforced via structure.ts
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Privacy' }),
    defineField({
      name: 'updated',
      title: 'Last updated',
      type: 'date',
      description: 'Shown under the title. Change it whenever the text changes.',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Privacy page' }) },
});
