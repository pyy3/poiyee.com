/* One-off: move the copy and sample catalogue that used to live in code into
   Sanity. Only creates documents (createIfNotExists with fixed ids), so a
   second run changes nothing and never overwrites an edit made in the Studio.

   Site settings already existed (edited in the Studio on 2026-10-04), so it
   only gets fields that are still empty, on the published document and on
   any open draft.

   npx sanity exec scripts/seed-sanity.mjs --with-user-token [-- --dry-run] */

import { getCliClient } from 'sanity/cli';
import { createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { randomUUID } from 'node:crypto';

const dry = process.argv.includes('--dry-run');
const client = getCliClient({ apiVersion: '2025-01-01' });

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

/* Headline: parts are strings, or [text] for an emphasised (bold) run. */
const headline = (...parts) => [
  {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: parts.map((p) => ({
      _type: 'span',
      _key: key(),
      text: Array.isArray(p) ? p[0] : p,
      marks: Array.isArray(p) ? ['strong'] : [],
    })),
  },
];
const paragraphs = (...texts) => texts.map((t) => headline(t)[0]);

const uploaded = new Map();
async function upload(path) {
  if (uploaded.has(path)) return uploaded.get(path);
  if (dry) return 'image-dry-run';
  let asset;
  for (let attempt = 1; !asset; attempt++) {
    try {
      asset = await client.assets.upload('image', createReadStream(path), { filename: basename(path) });
    } catch (err) {
      if (attempt >= 4) throw err;
      console.warn(`upload failed (${err.code ?? err.message}), retry ${attempt}: ${path}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  uploaded.set(path, asset._id);
  return asset._id;
}
const image = (assetId) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } });

async function create(doc) {
  if (dry) return console.log('would create', doc._id);
  const existing = await client.getDocument(doc._id);
  if (existing) return console.log('exists, left alone:', doc._id);
  await client.createIfNotExists(doc);
  console.log('created', doc._id);
}

/* Fill empty fields only; existing values (and an open draft) are kept. */
async function fillMissing(id, type, fields) {
  for (const docId of [id, `drafts.${id}`]) {
    const existing = await client.getDocument(docId);
    if (!existing && docId !== id) continue;
    const missing = Object.keys(fields).filter((k) => existing?.[k] === undefined);
    if (dry) {
      console.log(`would ${existing ? 'fill' : 'create'} ${docId}:`, missing.join(', '));
      continue;
    }
    if (!existing) await client.createIfNotExists({ _id: docId, _type: type, ...fields });
    else if (missing.length) await client.patch(docId).setIfMissing(fields).commit();
    console.log(`${existing ? 'filled' : 'created'} ${docId}:`, missing.join(', ') || 'nothing missing');
  }
}

// ---- Site settings (was in Nav, MonumentHome, Acquire, Footer, contact page, layout) ----
await fillMissing('siteSettings', 'siteSettings', {
  title: 'poiyee',
  studioLocation: 'Zürich, Switzerland',
  contactEmail: 'hello@poiyee.com',
  footerLine: 'Zürich — and from there, by post',
  heroHeadline: headline('Paintings the\nsize of ', ['weather'], '.'),
  heroTags: ['Acrylic & water on canvas', 'Zürich'],
  intro: headline(
    'A practice in ',
    ['pigment, weight and water'],
    ' — surfaces built up in palette-knife layers until the canvas itself begins to remember the sea.',
  ),
  acquireHeading: headline('Take ', ['one'], ' home.'),
  acquireDetailHeading: headline('Take ', ['this one'], ' home.'),
  acquireText:
    'Selected works are available as originals and as small archival editions. Shipping worldwide, crated and packed by hand from the Zürich studio.',
  contactHeading: headline('Write to ', ['the studio'], '.'),
  contactText:
    'Acquisitions, commissions, exhibitions, studio visits — every enquiry is read in person and answered within a few days.',
  seoTitle: 'poiyee — paintings',
  seoDescription:
    'A practice in pigment, weight and water. Acrylic on canvas. Studio in Zurich, Switzerland.',
  ogImage: image(await upload('public/icons/og.png')),
});
const { contactEmail } = await client.fetch('*[_id == "siteSettings"][0]{ contactEmail }');

// ---- About (was in components/About.tsx) ----
await create({
  _id: 'about',
  _type: 'about',
  statement: headline('The work is not landscape, exactly. It is what the body ', ['remembers after looking'], '.'),
  bio: paragraphs(
    'poiyee paints in acrylic, building each canvas through palette-knife layers that hold the breath of a single morning and the weight of every one that came before.',
    'Her subjects return — water surfaces, distant horizons, the colour of light just before it changes. She lives and works in Zürich. Commissions and acquisitions are open by enquiry.',
  ),
  facts: [
    { _key: key(), label: 'Lives & works', value: 'Zürich, Switzerland' },
    { _key: key(), label: 'Medium', value: 'Acrylic on canvas\nPalette knife' },
    { _key: key(), label: 'Enquiries', value: contactEmail || 'hello@poiyee.com' },
  ],
});

// ---- Artworks (was sampleWorks in lib/works.ts; photos in public/inspiration) ----
// Dimensions were a 120 × 90 placeholder on every work, so they are left empty
// for Poiyee to fill in rather than published as fact.
const r = (n, file) => `public/inspiration/${String(n).padStart(2, '0')}/${file}`;
const works = [
  ['blue-void', 'Untitled (Blue Void)', 2026, [[r(1, 'art-01.jpeg')]]],
  ['morning-range', 'Morning Range', 2025, [[r(2, 'art-02.jpeg')]]],
  ['reflections-golden-hour', 'Reflections, Golden Hour', 2025, [[r(3, 'art-03.jpeg')]]],
  ['shoal', 'Shoal', 2025, [[r(4, 'art-04.jpeg')]], true],
  ['cloud-bay', 'Cloud, Bay', 2025, [[r(5, 'art-05.jpeg')]]],
  ['across-the-water', 'Across the Water', 2024, [[r(6, 'art-06.jpeg')], [r(6, 'art-07.jpeg'), true]]],
  ['coral', 'Coral', 2025, [[r(7, 'art-08.jpeg')]]],
  ['pastel-stripes', 'Pastel Stripes', 2025, [[r(8, 'art-09.jpeg')], [r(8, 'art-10.jpeg'), true]]],
  ['distant-horizon', 'Distant Horizon', 2024, [[r(10, 'art-12.jpeg')]]],
  ['pastel-ii', 'Pastel II', 2025, [[r(12, 'art-14.jpeg')]]],
  ['water-reflections', 'Water, Reflections', 2025, [[r(13, 'art-15.jpeg')], [r(13, 'art-16.jpeg'), true]]],
  ['lake-trees', 'Lake, Trees', 2024, [[r(14, 'art-17.jpeg')]]],
  ['white-blue', 'White / Blue', 2025, [[r(15, 'art-18.jpeg')], [r(15, 'art-23.jpeg'), true]]],
  ['pastel-landscape', 'Pastel Landscape', 2025, [[r(16, 'art-19.jpeg')]]],
  ['cherry-blossom', 'Cherry Blossom', 2024, [[r(17, 'art-20.jpeg')], [r(17, 'art-32.jpeg'), true]], true],
  ['green-field', 'Green Field', 2025, [[r(18, 'art-21.jpeg')]]],
  ['yellow-teal', 'Yellow, Teal', 2025, [[r(19, 'art-22.jpeg')]]],
  ['blue-pool', 'Blue Pool', 2025, [[r(20, 'art-24.jpeg')], [r(20, 'art-25.jpeg'), true]]],
  ['pink-stripes', 'Pink Stripes', 2025, [[r(21, 'art-26.jpeg')], [r(21, 'art-27.jpeg'), true]]],
  ['blue-water', 'Blue Water', 2025, [[r(22, 'art-28.jpeg')], [r(22, 'art-29.jpeg'), true]]],
  ['pastel-range-ii', 'Pastel Range II', 2025, [[r(23, 'art-30.jpeg')], [r(23, 'art-31.jpeg'), true]]],
];

// "Blue Ozone" already holds catalogue № 1 / display order 1; these follow it.
for (const [i, [slug, title, year, photos, isSold]] of works.entries()) {
  const media = [];
  for (const [path, alternate] of photos) {
    media.push({
      _type: 'mediaItem',
      _key: key(),
      image: image(await upload(path)),
      caption: alternate ? 'Alternate angle' : 'Full canvas',
      kind: alternate ? 'install' : 'full',
      isPrimary: !alternate,
    });
  }
  await create({
    _id: `artwork-${slug}`,
    _type: 'artwork',
    title,
    slug: { _type: 'slug', current: slug },
    number: i + 2,
    displayOrder: i + 2,
    year,
    medium: 'Acrylic on canvas',
    editionInfo: 'Original · 1 of 1',
    framing: 'Unframed, ready to hang',
    isSold: !!isSold,
    media,
  });
}

console.log(dry ? 'dry run done' : `done; ${uploaded.size} images uploaded`);
