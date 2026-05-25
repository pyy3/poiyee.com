import { defineType, defineField } from 'sanity';

export const inquiry = defineType({
  name: 'inquiry',
  title: 'Inquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Acquisition', value: 'acquisition' },
          { title: 'Commission', value: 'commission' },
          { title: 'Studio visit', value: 'studio-visit' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      initialValue: 'acquisition',
    }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 6 }),
    defineField({
      name: 'aboutArtwork',
      title: 'About artwork',
      description: 'Pre-filled when the enquirer clicks Enquire on a specific piece.',
      type: 'reference',
      to: [{ type: 'artwork' }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Replied', value: 'replied' },
          { title: 'Closed', value: 'closed' },
          { title: 'Spam', value: 'spam' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({ name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true }),
    defineField({ name: 'sourceUrl', title: 'Source page', type: 'url', readOnly: true }),
    defineField({ name: 'userAgent', title: 'User agent', type: 'string', readOnly: true, hidden: true }),
  ],
  orderings: [
    { title: 'Newest', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'name', email: 'email', kind: 'kind', status: 'status', date: 'submittedAt' },
    prepare({ title, email, kind, status, date }) {
      const when = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: title || email || 'Anonymous',
        subtitle: [kind, status, when].filter(Boolean).join(' · '),
      };
    },
  },
});
