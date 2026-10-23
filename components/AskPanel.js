'use client';
// Ask for a lesson (to family, or to the Nook team) and see the lessons made for you.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import AskWho from './AskWho';
import { askSomeone, loadMade, isReady } from '@/lib/ask';
import { getRequests, track } from '@/lib/client';

export default function AskPanel({ lang, t }) {
  const [made, setMade] = useState([]);
  const [q, setQ] = useState('');
  const [sent, setSent] = useState('');

  useEffect(() => {
    const reqs = getRequests();
    setMade(reqs.map((r) => ({ id: r.id, question: r.q, status: 'asked' })));
    if (reqs.length) loadMade(reqs).then(setMade);
  }, []);

  function ask(e, contact) {
    if (e) e.preventDefault();
    const text = q.trim();
    if (!text) return;
    const id = askSomeone(text, lang, t, contact);
    setMade([{ id, question: text, status: 'asked' }, ...made]);
    setQ('');
    setSent('family');
  }
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
        <form className="card" onSubmit={ask} style={{ marginTop: 14 }}>
          <label className="field" style={{ marginTop: 0 }}>
            <span>{t.forYouAsk}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.typePlaceholder} maxLength={200} />
          </label>
          <AskWho t={t} label={t.forYouSend} type="submit" onAsk={(c) => ask(null, c)} />
          <button type="button" className="btn ghost" onClick={tellNook} disabled={!q.trim()}>
            {t.requestTell}
          </button>
          {sent === 'family' && <p className="thanks">{t.thanks}</p>}
          {sent === 'nook' && <p className="thanks">{t.requestThanks}</p>}
        </form>

        {made.length === 0 ? (
          <div className="empty">
            <span className="medal lg">
              <Icon name="heart" size={40} />
            </span>
            <p className="muted">{t.forYouEmpty}</p>
          </div>
        ) : (
          <div className="group" style={{ marginTop: 18 }}>
            {made.map((m) => {
              const ready = isReady(m);
              return (
                <Link key={m.id} href={`/my/${m.id}`} className="row">
                  <span className={`medal ${ready ? '' : 'wait'}`}>
                    <Icon name={ready ? 'heart' : 'history'} size={24} />
                  </span>
                  <span className="row-title">
                    {m.question}
                    <small>{ready ? t.customBy(m.author) : t.customWait}</small>
                  </span>
                  <span className="row-end">
                    <Icon name="chevron" size={22} />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
    </>
  );
}
