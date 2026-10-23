'use client';
// Settings section: who to ask for help. Saved on this phone only.
import { useEffect, useState } from 'react';
import { getTrusted, saveTrusted, cleanNumber, MAX_TRUSTED } from '@/lib/trusted';

export default function TrustedContacts({ t }) {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [bad, setBad] = useState(false);
  useEffect(() => setList(getTrusted()), []);

  function add() {
    const number = cleanNumber(num);
    if (!name.trim() || !number) return setBad(true);
    const next = [...list, { name: name.trim().slice(0, 24), number }];
    saveTrusted(next);
    setList(next);
    setName('');
    setNum('');
    setBad(false);
  }
  function remove(i) {
    const next = list.filter((_, k) => k !== i);
    saveTrusted(next);
    setList(next);
  }

  return (
    <>
      <div className="settings-row">
        <span>
          {t.trustedTitle}
          <small className="muted" style={{ display: 'block', fontSize: 15, fontWeight: 500 }}>
            {list.length ? list.map((c) => c.name).join(', ') : t.trustedNone}
          </small>
        </span>
        <button className="toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          {t.trustedEdit}
        </button>
      </div>
      {open && (
        <div className="trusted">
          <p className="muted small">{t.trustedLead}</p>
          {list.map((c, i) => (
            <div key={c.number} className="trusted-row">
              <b>{c.name}</b>
              <span className="muted">+{c.number.slice(0, 2)} {c.number.slice(2)}</span>
              <button className="chip" onClick={() => remove(i)}>
                {t.trustedRemove}
              </button>
            </div>
          ))}
          {list.length < MAX_TRUSTED && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.trustedName} maxLength={24} aria-label={t.trustedName} />
              <input value={num} onChange={(e) => setNum(e.target.value)} placeholder={t.trustedNumber} inputMode="numeric" maxLength={16} aria-label={t.trustedNumber} />
              {bad && <p className="warn">{t.trustedBad}</p>}
              <button className="btn primary" onClick={add}>
                {t.trustedAdd}
              </button>
            </>
          )}
          <p className="muted small">{t.trustedPrivate}</p>
        </div>
      )}
    </>
  );
}
