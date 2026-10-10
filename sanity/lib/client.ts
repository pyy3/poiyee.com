import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

/* Server-only read client. The dataset is private (it holds visitors'
   enquiries), so reads need a token; without one a private dataset answers
   every query with an empty result and the site would quietly render blank.
   Missing on a production build is a build failure, elsewhere a warning.
   Never import this from a client component: the token would ship to the
   browser. The "published" perspective keeps drafts out even though the
   token could read them. */

const token = process.env.SANITY_API_TOKEN;

if (!token) {
  const msg = 'SANITY_API_TOKEN is not set: Sanity reads will come back empty once the dataset is private.';
  if (process.env.VERCEL_ENV === 'production') throw new Error(msg);
  console.warn(msg);
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  token,
});
