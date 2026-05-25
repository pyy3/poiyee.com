import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export const runtime = 'nodejs';

type Body = {
  name?: string;
  email?: string;
  kind?: 'acquisition' | 'commission' | 'studio-visit' | 'other';
  message?: string;
  workSlug?: string;
  // honeypot — bots fill it, humans don't
  website?: string;
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot tripped, fake-accept

  const name = (body.name ?? '').trim().slice(0, 200);
  const email = (body.email ?? '').trim().slice(0, 200);
  const kind = body.kind ?? 'other';
  const message = (body.message ?? '').trim().slice(0, 5000);
  const workSlug = (body.workSlug ?? '').trim().slice(0, 200);

  if (!email || !isEmail(email)) return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  if (!message) return NextResponse.json({ error: 'empty-message' }, { status: 400 });

  // Look up the artwork ref by slug, if provided
  let aboutArtworkRef: { _type: 'reference'; _ref: string } | undefined;
  if (workSlug) {
    try {
      const art = await writeClient.fetch<{ _id: string } | null>(
        `*[_type == "artwork" && slug.current == $slug][0]{ _id }`,
        { slug: workSlug },
      );
      if (art?._id) aboutArtworkRef = { _type: 'reference', _ref: art._id };
    } catch {
      /* swallow — store the inquiry without the ref */
    }
  }

  const doc = await writeClient.create({
    _type: 'inquiry',
    name: name || undefined,
    email,
    kind,
    message,
    aboutArtwork: aboutArtworkRef,
    status: 'new',
    submittedAt: new Date().toISOString(),
    sourceUrl: req.headers.get('referer') ?? undefined,
    userAgent: req.headers.get('user-agent') ?? undefined,
  });

  // Optional email notification — wires up when RESEND_API_KEY is set
  if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
    await sendEmailNotification({ name, email, kind, message, workSlug }).catch(() => {
      /* don't fail the request if email blows up */
    });
  }

  return NextResponse.json({ ok: true, id: doc._id });
}

async function sendEmailNotification(p: {
  name: string;
  email: string;
  kind: string;
  message: string;
  workSlug: string;
}) {
  const apiKey = process.env.RESEND_API_KEY!;
  const to = process.env.CONTACT_EMAIL!;
  const subject = `[poiyee] ${p.kind} from ${p.name || p.email}${p.workSlug ? ` · re: ${p.workSlug}` : ''}`;
  const html = `
    <h2>${p.kind}</h2>
    <p><strong>From:</strong> ${escape(p.name)} &lt;${escape(p.email)}&gt;</p>
    ${p.workSlug ? `<p><strong>About:</strong> ${escape(p.workSlug)}</p>` : ''}
    <p style="white-space:pre-wrap">${escape(p.message)}</p>
  `;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'poiyee inquiries <onboarding@resend.dev>',
      to,
      subject,
      html,
      reply_to: p.email,
    }),
  });
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
