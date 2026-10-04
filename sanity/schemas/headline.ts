import { defineType, defineArrayMember } from 'sanity';

/* A short display line. Bold marks the emphasised words, which the site sets
   heavier or in the accent colour. Shift+Enter makes a line break. */
export const headline = defineType({
  name: 'headline',
  title: 'Headline',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [{ title: 'Emphasis', value: 'strong' }],
        annotations: [],
      },
    }),
  ],
});
