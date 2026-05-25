import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Server-only client with write access. Never import from a client component.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
