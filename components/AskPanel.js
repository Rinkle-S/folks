'use client';
// Ask the Nook team for a lesson that is missing. Each request is recorded, so the missing lessons get written first.
import { useState } from 'react';
import { track } from '@/lib/client';

export default function AskPanel({ lang, t }) {
  const [q, setQ] = useState('');
  const [sent, setSent] = useState('');

  // A plain request to the Nook team. It is recorded, so the lessons that are missing get written first.
  function tellNook() {
    const text = q.trim();
    if (!text) return;
    track('lesson_request', { meta: { q: text.slice(0, 200), lang } });
    setQ('');
    setSent('nook');
  }

  return (
    <>
        <form className="card" onSubmit={(e) => { e.preventDefault(); tellNook(); }} style={{ marginTop: 14 }}>
          <label className="field" style={{ marginTop: 0 }}>
            <span>{t.forYouAsk}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.typePlaceholder} maxLength={200} />
          </label>
          <button type="submit" className="btn primary" disabled={!q.trim()}>
            {t.requestTell}
          </button>
          {sent === 'nook' && <p className="thanks">{t.requestThanks}</p>}
        </form>

    </>
  );
}
