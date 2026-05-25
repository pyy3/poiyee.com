/* These three are NOT secrets — projectId and dataset are public,
   API version is just a date string. Hardcoded as fallbacks so the Studio
   works standalone (via `sanity deploy`) as well as inside Next.js (which
   reads from .env.local). The write token stays env-only (server-side). */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ni6m06cn';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';
