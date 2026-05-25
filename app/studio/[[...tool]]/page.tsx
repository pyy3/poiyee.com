/* The embedded Sanity Studio at /studio.
   Visit /studio after `npm run dev` to manage content. */

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
