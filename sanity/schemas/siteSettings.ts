import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'home', title: 'Home page' },
    { name: 'acquire', title: 'Acquire' },
    { name: 'contact', title: 'Contact' },
    { name: 'seo', title: 'Sharing & search' },
    { name: 'privacy', title: 'Cookies' },
  ],
  fields: [
    // General
    defineField({
      name: 'title',
      title: 'Artist name',
      type: 'string',
      group: 'general',
      description: 'Shown as the wordmark in the top bar and footer.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'studioLocation',
      title: 'Studio location',
      type: 'string',
      group: 'general',
      description: 'e.g. "Zürich, Switzerland". Shown on painting pages and the contact page.',
    }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string', group: 'general' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'general' }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter URL',
      type: 'url',
      group: 'general',
      description: 'Leave empty to hide the Newsletter link.',
    }),
    defineField({
      name: 'footerLine',
      title: 'Footer line',
      type: 'string',
      group: 'general',
      description: 'Small line at the bottom right of every page.',
    }),

    // Home page
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'headline',
      group: 'home',
      description: 'The large line over the first image. Bold words are set extra heavy.',
    }),
    defineField({
      name: 'heroTags',
      title: 'Hero tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'home',
      description: 'Short words under the headline, e.g. "Acrylic & water on canvas", "Zürich".',
    }),
    defineField({
      name: 'heroArtwork',
      title: 'Hero painting',
      type: 'reference',
      to: [{ type: 'artwork' }],
      group: 'home',
      description: 'Its first photo fills the top of the home page. Empty: the first painting in the index.',
    }),
    defineField({
      name: 'intro',
      title: 'Intro statement',
      type: 'headline',
      group: 'home',
      description: 'The large sentence under the hero. Bold words are set in the accent colour.',
    }),

    // Acquire
    defineField({
      name: 'acquireHeading',
      title: 'Acquire heading (home page)',
      type: 'headline',
      group: 'acquire',
      description: 'e.g. "Take **one** home."',
    }),
    defineField({
      name: 'acquireDetailHeading',
      title: 'Acquire heading (painting pages)',
      type: 'headline',
      group: 'acquire',
      description: 'e.g. "Take **this one** home."',
    }),
    defineField({
      name: 'acquireText',
      title: 'Acquire text',
      type: 'text',
      rows: 3,
      group: 'acquire',
      description: 'Shipping, editions, etc. Shown under both headings.',
    }),

    // Contact
    defineField({
      name: 'contactHeading',
      title: 'Contact page heading',
      type: 'headline',
      group: 'contact',
    }),
    defineField({
      name: 'contactText',
      title: 'Contact page text',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'Page title',
      type: 'string',
      group: 'seo',
      description: 'Browser tab and search results, e.g. "poiyee — paintings".',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Shown in search results and when the site is shared.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Share image',
      type: 'image',
      group: 'seo',
      description: 'Shown when the site is shared on social media or in messages. 1200 × 630 works best.',
    }),

    // Cookies
    defineField({
      name: 'consentText',
      title: 'Cookie banner text',
      type: 'text',
      rows: 3,
      group: 'privacy',
      description: 'Shown in the cookie banner next to Accept / Reject. A "Privacy" link is added after it.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
