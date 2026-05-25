/* Sample artwork data — used when Sanity has no content yet.
   Once you add artworks at /studio, Phase 3.5 will swap this for a Sanity query.
   Schema mirrors the Sanity `artwork.media[]` shape so the components don't change. */

export type Media = {
  src: string;
  caption?: string;
  kind?: 'full' | 'detail' | 'install' | 'studio';
  isPrimary?: boolean;
};

export type Work = {
  id: string;          // folder number, e.g. "01"
  slug: string;
  name: string;
  meta: string;
  ratio: string;       // primary photo aspect, e.g. "4/3" or "3/4"
  orient: 'landscape' | 'portrait';
  media: Media[];
  isSold?: boolean;    // shows a "Sold" corner badge on the thumbnail + in lightbox
};

const r = (n: number) => `/inspiration/${String(n).padStart(2, '0')}`;

export const sampleWorks: Work[] = [
  // Landscape pair — top feature row
  { id: '01', slug: 'blue-void',          name: 'Untitled (Blue Void)',     meta: 'Acrylic on canvas · 2026 · 120 × 90 cm', ratio: '4/3', orient: 'landscape',
    media: [{ src: `${r(1)}/art-01.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '02', slug: 'morning-range',      name: 'Morning Range',            meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '4/3', orient: 'landscape',
    media: [{ src: `${r(2)}/art-02.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },

  // Portraits — 21 pieces in 7 rows of 3
  { id: '03', slug: 'reflections-golden-hour', name: 'Reflections, Golden Hour', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(3)}/art-03.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '04', slug: 'shoal', name: 'Shoal', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait', isSold: true,
    media: [{ src: `${r(4)}/art-04.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '05', slug: 'cloud-bay', name: 'Cloud, Bay', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(5)}/art-05.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '06', slug: 'across-the-water', name: 'Across the Water', meta: 'Acrylic on canvas · 2024 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(6)}/art-06.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(6)}/art-07.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '07', slug: 'coral', name: 'Coral', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(7)}/art-08.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '08', slug: 'pastel-stripes', name: 'Pastel Stripes', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(8)}/art-09.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(8)}/art-10.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '10', slug: 'distant-horizon', name: 'Distant Horizon', meta: 'Acrylic on canvas · 2024 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(10)}/art-12.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '12', slug: 'pastel-ii', name: 'Pastel II', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(12)}/art-14.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '13', slug: 'water-reflections', name: 'Water, Reflections', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(13)}/art-15.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(13)}/art-16.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '14', slug: 'lake-trees', name: 'Lake, Trees', meta: 'Acrylic on canvas · 2024 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(14)}/art-17.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '15', slug: 'white-blue', name: 'White / Blue', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(15)}/art-18.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(15)}/art-23.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '16', slug: 'pastel-landscape', name: 'Pastel Landscape', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(16)}/art-19.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '17', slug: 'cherry-blossom', name: 'Cherry Blossom', meta: 'Acrylic on canvas · 2024 · 120 × 90 cm', ratio: '3/4', orient: 'portrait', isSold: true,
    media: [
      { src: `${r(17)}/art-20.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(17)}/art-32.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '18', slug: 'green-field', name: 'Green Field', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(18)}/art-21.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '19', slug: 'yellow-teal', name: 'Yellow, Teal', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [{ src: `${r(19)}/art-22.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true }] },
  { id: '20', slug: 'blue-pool', name: 'Blue Pool', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(20)}/art-24.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(20)}/art-25.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '21', slug: 'pink-stripes', name: 'Pink Stripes', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(21)}/art-26.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(21)}/art-27.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '22', slug: 'blue-water', name: 'Blue Water', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(22)}/art-28.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(22)}/art-29.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
  { id: '23', slug: 'pastel-range-ii', name: 'Pastel Range II', meta: 'Acrylic on canvas · 2025 · 120 × 90 cm', ratio: '3/4', orient: 'portrait',
    media: [
      { src: `${r(23)}/art-30.jpeg`, caption: 'Full canvas', kind: 'full', isPrimary: true },
      { src: `${r(23)}/art-31.jpeg`, caption: 'Alternate angle', kind: 'install' },
    ] },
];

export function getAllWorks(): Work[] {
  // TODO Phase 3.5: replace with `client.fetch(allArtworksQuery)` once Sanity has content.
  return sampleWorks;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return sampleWorks.find((w) => w.slug === slug);
}
