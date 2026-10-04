import type { MetadataRoute } from 'next';

/* Search and answer crawlers are welcome: they recommend the work with a
   link back to the site. Training crawlers are blocked so the paintings are
   not used to train models. robots.txt is a request, not a lock: it only
   stops crawlers that choose to honour it. */

const PRIVATE = ['/studio', '/api/'];

const SEARCH_AND_ANSWER_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'Googlebot',
  'Bingbot',
  'Applebot',
];

const TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'Amazonbot',
  'cohere-ai',
  'Diffbot',
  'omgili',
  'ImagesiftBot',
  'img2dataset',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: SEARCH_AND_ANSWER_BOTS, allow: '/', disallow: PRIVATE },
      { userAgent: TRAINING_BOTS, disallow: '/' },
    ],
    sitemap: 'https://poiyee.com/sitemap.xml',
    host: 'https://poiyee.com',
  };
}
