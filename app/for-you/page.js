'use client';
// "For you": lessons made for this parent by someone close, and a box to ask for a new one.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { AppBar, BottomNav } from '@/components/AppShell';
import { T } from '@/lib/i18n';
import { askSomeone, loadMade, isReady } from '@/lib/ask';
import AskWho from '@/components/AskWho';
import { useLang, getRequests } from '@/lib/client';

export default function ForYou() {
  const [lang] = useLang();
  const [made, setMade] = useState([]);
  const [q, setQ] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const reqs = getRequests();
    setMade(reqs.map((r) => ({ id: r.id, question: r.q, status: 'asked' })));
    if (reqs.length) loadMade(reqs).then(setMade);
  }, []);

  if (!lang) return <div className="page" />;
  const t = T[lang];

  function ask(e, contact) {
    if (e) e.preventDefault();
    const text = q.trim();
    if (!text) return;
    const id = askSomeone(text, lang, t, contact);
    setMade([{ id, question: text, status: 'asked' }, ...made]);
    setQ('');
    setSent(true);
  }

  return (
    <div className="shell">
      <AppBar />
      <main className="shell-main">
        <h1 className="page-h">{t.forYouTitle}</h1>
        <p className="muted">{t.forYouLead}</p>

        <form className="card" onSubmit={ask} style={{ marginTop: 14 }}>
          <label className="field" style={{ marginTop: 0 }}>
            <span>{t.forYouAsk}</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.typePlaceholder} maxLength={200} />
          </label>
          <AskWho t={t} label={t.forYouSend} type="submit" onAsk={(c) => ask(null, c)} />
          {sent && <p className="thanks">{t.thanks}</p>}
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
      </main>
      <BottomNav active="foryou" t={t} />
    </div>
  );
}
