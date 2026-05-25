'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

type Kind = 'acquisition' | 'commission' | 'studio-visit' | 'other';

export function ContactForm() {
  const params = useSearchParams();
  const workSlug = params.get('work') ?? '';
  const initialKind = (params.get('kind') as Kind) || 'acquisition';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [kind, setKind] = useState<Kind>(initialKind);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (workSlug && !message) {
      setMessage(`Enquiry about “${workSlug.replace(/-/g, ' ')}”.\n\n`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSlug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, kind, message, workSlug, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Try again?');
        return;
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Try again?');
    }
  };

  if (status === 'sent') {
    return (
      <div className="border border-ink/15 p-10 max-w-2xl">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-pencil mb-3">
          — Sent
        </div>
        <p
          className="font-display italic text-[clamp(22px,2vw,28px)] leading-snug text-ink"
          style={{ fontVariationSettings: '"opsz" 96, "wght" 350' }}
        >
          Thank you. Your message is in. You&apos;ll hear back at{' '}
          <span className="text-accent">{email}</span> shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-2xl grid gap-7">
      {workSlug && (
        <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-pencil">
          About: <span className="text-ink">{workSlug.replace(/-/g, ' ')}</span>
        </div>
      )}

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] w-0 h-0 opacity-0"
        aria-hidden="true"
      />

      <Field label="Your name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete="name"
        />
      </Field>

      <Field label="Email" required>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          autoComplete="email"
        />
      </Field>

      <Field label="Reason">
        <div className="flex flex-wrap gap-2">
          {(['acquisition', 'commission', 'studio-visit', 'other'] as Kind[]).map((k) => (
            <button
              type="button"
              key={k}
              onClick={() => setKind(k)}
              className={`px-3 py-2 border font-mono text-[11px] tracking-[0.22em] uppercase transition-colors ${
                kind === k
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-transparent text-ink border-ink/30 hover:border-ink'
              }`}
            >
              {k.replace('-', ' ')}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Message" required>
        <textarea
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="flex items-center gap-6">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-ink text-paper hover:bg-accent disabled:opacity-50 px-6 py-3.5 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry →'}
        </button>
        {status === 'error' && (
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent">
            {errorMsg}
          </span>
        )}
      </div>
    </form>
  );
}

const inputClass =
  'w-full bg-transparent border-0 border-b border-ink/30 px-0 py-2.5 text-ink font-body text-[17px] focus:outline-none focus:border-accent transition-colors';

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-pencil">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
