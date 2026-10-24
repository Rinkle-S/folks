'use client';
// Settings row: the name of the son or daughter who helps. It appears in the practice chats. Saved on this phone only.
import { useEffect, useState } from 'react';
import { getTrusted, saveTrusted } from '@/lib/trusted';

export default function TrustedContacts({ t }) {
  const [name, setName] = useState('');
  useEffect(() => setName((getTrusted()[0] || {}).name || ''), []);
  function change(v) {
    setName(v);
    const n = v.trim().slice(0, 24);
    saveTrusted(n ? [{ name: n }] : []);
  }
  return (
    <label className="settings-row stack">
      <span>
        {t.helperTitle}
        <small className="muted" style={{ display: 'block', fontSize: 15, fontWeight: 500 }}>
          {t.helperLead}
        </small>
      </span>
      <input value={name} onChange={(e) => change(e.target.value)} placeholder={t.trustedName} maxLength={24} aria-label={t.helperTitle} />
    </label>
  );
}
