/* /llms.txt — a plain markdown map of the site for AI assistants
   (https://llmstxt.org). Built from Sanity; an empty field drops its line. */

import { getPrivacy, getSiteSettings } from '@/lib/content';
import { dimensionsLabel, getAllWorks } from '@/lib/works';
import { SITE_URL, availabilityLabel, workUrl } from '@/lib/structuredData';

export const revalidate = 3600;

/* Keep link text from breaking the markdown link syntax. */
const linkText = (s: string) => s.replace(/[[\]]/g, '\\$&');

export async function GET() {
  const [settings, works, privacy] = await Promise.all([
    getSiteSettings(),
    getAllWorks(),
    getPrivacy(),
  ]);

  const lines: string[] = [];
  if (settings.title) lines.push(`# ${settings.title}`, '');
  if (settings.artistSummary) {
    lines.push(...settings.artistSummary.trim().split('\n').map((l) => `> ${l}`.trimEnd()), '');
  }

  if (works.length) {
    lines.push('## Paintings', '');
    for (const w of works) {
      const details = [w.medium, dimensionsLabel(w), w.year, availabilityLabel(w)]
        .filter(Boolean)
        .join(', ');
      lines.push(`- [${linkText(w.name)}](${workUrl(w)}): ${details}`);
    }
    lines.push('');
  }

  const contactText = settings.contactText?.replace(/\s+/g, ' ').trim();
  const contact = [`- [Contact](${SITE_URL}/contact)`, contactText].filter(Boolean).join(': ');
  lines.push('## Pages', '', contact);
  if (privacy) lines.push(`- [${linkText(privacy.title || 'Privacy')}](${SITE_URL}/privacy)`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
