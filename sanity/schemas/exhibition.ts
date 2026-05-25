import { defineType, defineField } from 'sanity';

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'startDate', title: 'Opens', type: 'date' }),
    defineField({ name: 'endDate', title: 'Closes', type: 'date' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'works',
      title: 'Works in show',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    }),
  ],
  preview: {
    select: { title: 'title', venue: 'venue', city: 'city', startDate: 'startDate' },
    prepare({ title, venue, city, startDate }) {
      const where = [venue, city].filter(Boolean).join(', ');
      const when = startDate ? new Date(startDate).getFullYear() : '';
      return { title, subtitle: [where, when].filter(Boolean).join(' · ') };
    },
  },
});
