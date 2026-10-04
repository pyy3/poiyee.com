'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import posthog from 'posthog-js';

export const COOKIE_SETTINGS_EVENT = 'poiyee:cookie-settings';

/* Cookie banner. Shown until the visitor chooses; Accept and Reject are equal
   weight. The choice is stored by PostHog itself (get_explicit_consent_status),
   and the footer's "Cookie settings" reopens the banner. Text comes from Site
   settings in Sanity. */
export function ConsentBanner({ text }: { text?: string }) {
  // posthog is only initialised on tracked hosts (see instrumentation-client.ts).
  // Read on the client only; the server render never shows the banner.
  const pending = useSyncExternalStore(
    noSubscribe,
    () => !!posthog.__loaded && posthog.get_explicit_consent_status() === 'pending',
    () => false,
  );
  const [decided, setDecided] = useState(false);
  const [reopened, setReopened] = useState(false);
  const open = reopened || (pending && !decided);

  useEffect(() => {
    if (!posthog.__loaded) return;
    const reopen = () => setReopened(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const close = () => {
    setDecided(true);
    setReopened(false);
  };

  if (!open) return null;

  const accept = () => {
    posthog.opt_in_capturing();
    posthog.startSessionRecording();
    close();
  };
  const reject = () => {
    posthog.stopSessionRecording();
    posthog.opt_out_capturing();
    close();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie settings"
      className="fixed inset-x-3 bottom-3 z-[60] max-w-[460px] border border-line bg-paper p-5 text-ink shadow-[0_18px_40px_-20px_rgba(14,20,27,0.35)] sm:left-6 sm:right-auto sm:bottom-6"
    >
      <p className="m-0 text-[14px] leading-[1.55] text-ink/80">
        {text}{' '}
        <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent">
          Privacy
        </Link>
      </p>
      <div className="mt-4 flex gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
        <button
          type="button"
          onClick={accept}
          className="flex-1 border border-ink bg-ink px-4 py-2.5 text-white hover:bg-accent hover:border-accent"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={reject}
          className="flex-1 border border-ink px-4 py-2.5 text-ink hover:border-accent hover:text-accent"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

const noSubscribe = () => () => {};

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
