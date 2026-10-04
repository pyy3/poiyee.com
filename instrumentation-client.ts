/* PostHog, loaded before the app hydrates (Next.js instrumentation hook).

   Consent model (see components/ConsentBanner.tsx):
   - no choice yet / Reject: cookieless — no cookies or storage, visitors are
     counted by a hash on PostHog's servers; no session recordings.
   - Accept: normal tracking — every page, click, recording and heatmap.

   Events go through /ingest on our own domain (rewritten in next.config.ts)
   to PostHog's EU region. The Studio is never tracked. */

import posthog from 'posthog-js';

// Project API keys are public by design (they can only send events).
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_sgVErN5LsmYwWPFYZMyHFBkJdncFTybhZBKXFVLTq8De';

const TRACKED_HOSTS = ['poiyee.com', 'www.poiyee.com', 'localhost'];

if (TRACKED_HOSTS.includes(window.location.hostname) && !window.location.pathname.startsWith('/studio')) {
  posthog.init(token, {
    api_host: '/ingest',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-08-30',
    cookieless_mode: 'on_reject',
    opt_out_capturing_by_default: true,
    person_profiles: 'identified_only',
    autocapture: true,
    capture_dead_clicks: true,
    enable_heatmaps: true,
    session_recording: {
      // Contact-form fields never appear in recordings.
      maskAllInputs: true,
    },
    // A client-side link into the Studio keeps this instance alive; drop
    // everything (events and recordings) captured while on /studio.
    before_send: (event) => (window.location.pathname.startsWith('/studio') ? null : event),
  });
}
