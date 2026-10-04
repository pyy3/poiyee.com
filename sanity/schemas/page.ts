import { defineType, defineField, defineArrayMember } from 'sanity';

/* A free-standing content page, e.g. "Commissions", served at /<slug>.
   Every visible word comes from these fields; an empty field hides its part
   of the page. */

const bodyText = (description: string) =>
  defineField({
    name: 'body',
    title: 'Text',
    type: 'array',
    description,
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [
          { title: 'Bullets', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Bold', value: 'strong' },
            { title: 'Italic', value: 'em' },
          ],
          annotations: [
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'href',
                  title: 'Address',
                  type: 'url',
                  description: 'A full address (https://…), an email (mailto:…) or a page on this site (/contact).',
                  validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                }),
              ],
            },
          ],
        },
      }),
    ],
  });

const heading = (description: string) =>
  defineField({ name: 'heading', title: 'Heading', type: 'string', description });

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'Sharing & search' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The large title at the top of the page, e.g. "Commissions".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description:
        'The page lives at poiyee.com/<this>. Click "Generate" to make it from the title. Use lowercase letters and hyphens only, and avoid "contact", "privacy", "work" and "studio", which are taken.',
      validation: (r) =>
        r.required().custom((slug) =>
          slug?.current && ['contact', 'privacy', 'work', 'studio', 'api'].includes(slug.current)
            ? 'This address is already used by another part of the site.'
            : true,
        ),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Deutsch', value: 'de' },
          { title: 'English', value: 'en' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'The language this page is written in. Search engines use it to show the right version.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'translation',
      title: 'Same page in the other language',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'content',
      description:
        'Pick the German or English version of this page, if there is one. Set it on both pages so each points to the other; search engines then show visitors the version in their language.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Top image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Optional. A wide photo shown above the title. Leave empty for a text-only top.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Description of the image',
          type: 'string',
          description: 'One sentence for visitors who cannot see the image, e.g. "The studio wall with three blue canvases".',
        }),
      ],
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'headline',
      group: 'content',
      description: 'One or two sentences under the title. Bold words are set in the accent colour.',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      description: 'The blocks that make up the page, top to bottom. Drag to reorder; use "Add item" for a new one.',
      of: [
        defineArrayMember({
          name: 'textSection',
          title: 'Text',
          type: 'object',
          fields: [
            heading('Optional heading above the text.'),
            bodyText('Paragraphs, lists and links. Use a numbered list for steps.'),
          ],
          preview: {
            select: { title: 'heading' },
            prepare: ({ title }) => ({ title: title || 'Text', subtitle: 'Text' }),
          },
        }),
        defineArrayMember({
          name: 'worksSection',
          title: 'Paintings',
          type: 'object',
          fields: [
            heading('Optional heading above the paintings, e.g. "Recent works".'),
            defineField({
              name: 'works',
              title: 'Paintings',
              type: 'array',
              of: [defineArrayMember({ type: 'reference', to: [{ type: 'artwork' }] })],
              description:
                'Pick the paintings to show. Each appears with its main photo, uncropped, and links to its own page.',
              validation: (r) => r.unique(),
            }),
          ],
          preview: {
            select: { title: 'heading', works: 'works' },
            prepare: ({ title, works }) => ({
              title: title || 'Paintings',
              subtitle: `Paintings · ${works?.length ?? 0}`,
            }),
          },
        }),
        defineArrayMember({
          name: 'faqSection',
          title: 'Questions & answers',
          type: 'object',
          fields: [
            heading('Optional heading, e.g. "Frequently asked questions".'),
            defineField({
              name: 'items',
              title: 'Questions',
              type: 'array',
              description: 'Each question opens to show its answer. Search engines may show them in results.',
              of: [
                defineArrayMember({
                  name: 'faqItem',
                  title: 'Question',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      description: 'As a visitor would ask it, e.g. "How long does a commission take?"',
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      ...bodyText('The answer. Keep it short and specific.'),
                      name: 'answer',
                      title: 'Answer',
                    }),
                  ],
                  preview: { select: { title: 'question' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'heading', items: 'items' },
            prepare: ({ title, items }) => ({
              title: title || 'Questions & answers',
              subtitle: `Questions · ${items?.length ?? 0}`,
            }),
          },
        }),
        defineArrayMember({
          name: 'ctaSection',
          title: 'Enquiry button',
          type: 'object',
          fields: [
            heading('The large line in the dark band, e.g. "Start a commission".'),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 3,
              description: 'Optional short sentence under the heading.',
            }),
            defineField({
              name: 'buttonLabel',
              title: 'Button label',
              type: 'string',
              description: 'The words on the button, e.g. "Enquire". Leave empty to hide the button.',
            }),
            defineField({
              name: 'enquiryKind',
              title: 'Enquiry type',
              type: 'string',
              options: {
                list: [
                  { title: 'Acquire a work', value: 'acquisition' },
                  { title: 'Commission', value: 'commission' },
                  { title: 'Studio visit', value: 'studio-visit' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'radio',
              },
              initialValue: 'commission',
              description: 'The button opens the contact form with this type already selected.',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'heading', kind: 'enquiryKind' },
            prepare: ({ title, kind }) => ({ title: title || 'Enquiry button', subtitle: `Enquiry · ${kind ?? ''}` }),
          },
        }),
      ],
    }),

    // Sharing & search
    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      group: 'seo',
      description: 'Browser tab and search results. Empty: the page title is used.',
      validation: (r) => r.max(70).warning('Search engines cut titles after about 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'One or two sentences shown in search results and when the page is shared.',
      validation: (r) => r.max(170).warning('Search engines cut descriptions after about 155 characters.'),
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', language: 'language' },
    prepare: ({ title, slug, language }) => ({
      title,
      subtitle: [language?.toUpperCase(), slug && `/${slug}`].filter(Boolean).join(' · '),
    }),
  },
});
