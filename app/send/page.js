'use client';
// For the son or daughter: pick a lesson and send it to a parent on WhatsApp.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS } from '@/lib/lessons';
import { track, whatsappLink } from '@/lib/client';

export default function Send() {
  const [name, setName] = useState('');
  const [lesson, setLesson] = useState('qr-pay');
  const [lang, setLang] = useState('en');
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const l = LESSONS[lesson];
  const params = new URLSearchParams({ lang });
  if (name.trim()) params.set('from', name.trim());
  const link = `${origin}/lesson/${lesson}?${params.toString()}`;
  const sign = name.trim() ? ` — ${name.trim()}` : '';
  const message =
    lang === 'hi'
      ? `🙏 आपके लिए एक छोटा सा अभ्यास: "${l.title.hi}"। यह सिर्फ़ प्रैक्टिस है, असली पैसे नहीं कटेंगे। आराम से सीखिए, यह लिंक दबाइए:\n${link}${sign}`
      : `🙏 A short practice lesson for you: "${l.title.en}". It's only practice — no real money. Take your time, just tap this link:\n${link}${sign}`;

  return (
    <div className="page send">
      <Link href="/" className="brand">
        Folks
      </Link>
      <h1>Send your parent a practice lesson</h1>
      <p className="muted">
        They practise the task safely, with voice guidance and fake money, then do it for real on their own. No app
        download, no login.
      </p>

      <label className="field">
        <span>Your name (shown to your parent)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rinkle" maxLength={40} />
      </label>

      <div className="field">
        <span>Which lesson?</span>
        {Object.values(LESSONS).map((x) => (
          <label key={x.id} className={`radio ${lesson === x.id ? 'on' : ''}`}>
            <input type="radio" name="lesson" checked={lesson === x.id} onChange={() => setLesson(x.id)} />
            {x.emoji} {x.title.en}
          </label>
        ))}
      </div>

      <div className="field">
        <span>Their language</span>
        <div className="seg">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
            English
          </button>
          <button className={lang === 'hi' ? 'on' : ''} onClick={() => setLang('hi')}>
            हिंदी
          </button>
        </div>
      </div>

      <div className="field">
        <span>Their payment app</span>
        <div className="seg">
          <button className="on">Google Pay</button>
          <button disabled title="Coming soon">
            PhonePe <small>soon</small>
          </button>
          <button disabled title="Coming soon">
            Paytm <small>soon</small>
          </button>
        </div>
        <p className="muted small">Lessons copy the layout of the app your parent uses. More apps are coming.</p>
      </div>

      <div className="preview">{message}</div>

      <a
        className="btn wa-btn"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('link_created', { lesson, meta: { lang, via: 'whatsapp' } })}
      >
        💬 Send on WhatsApp
      </a>
      <button
        className="btn ghost"
        onClick={() => {
          try {
            navigator.clipboard.writeText(link);
            setCopied(true);
            track('link_created', { lesson, meta: { lang, via: 'copy' } });
          } catch {}
        }}
      >
        {copied ? '✓ Link copied' : '🔗 Copy link'}
      </button>
    </div>
  );
}
