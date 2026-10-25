'use client';
// Stay safe home: three short reading lessons, the real-or-fake test, and the 1930 helpline.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { AppBar, BottomNav } from '@/components/AppShell';
import { SAFE_LESSONS, SAFE_UI, readDone } from '@/lib/safeLessons';
import { T } from '@/lib/i18n';
import { useLang, track } from '@/lib/client';

export default function StaySafe() {
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  useEffect(() => setDone(readDone()), []);

  if (!lang) return <div className="page" />;
  const t = T[lang];
  const u = SAFE_UI[lang];
  const doneCount = SAFE_LESSONS.filter((l) => done.includes(l.id)).length;
  const nowId = (SAFE_LESSONS.find((l) => !done.includes(l.id)) || {}).id;

  return (
    <div className="shell">
      <AppBar />
      <main className="shell-main ss ss-home" data-l={lang}>
        <h1>{u.title}</h1>
        <p className="ss-lead">{u.lead}</p>

        <div className="ss-prog">
          <b>{u.progress}</b>
          <span>{u.doneOf(doneCount)}</span>
        </div>
        <div className="ss-bars">
          {SAFE_LESSONS.map((l) => (
            <i key={l.id} className={done.includes(l.id) ? 'on' : ''} />
          ))}
        </div>

        <div className="ss-h">{u.lessons}</div>
        {SAFE_LESSONS.map((l) => {
          const isDone = done.includes(l.id);
          return (
            <Link key={l.id} href={`/scams/learn/${l.id}`} className={`ss-tile${l.id === nowId ? ' now' : ''}`} onClick={() => track('safe_lesson_open', { meta: { id: l.id } })}>
              <div className="ic" aria-hidden="true">{l.icon}</div>
              <div className="tx">
                <b>{l.title[lang]}</b>
                {isDone ? <span className="ok">✓ {u.done}</span> : <span>{u.pages}</span>}
              </div>
              {l.id === nowId ? <span className="ss-pill">{u.start}</span> : <Icon name="chevron" size={22} />}
            </Link>
          );
        })}

        <Link href="/scams/test" className="ss-tile ss-testtile" onClick={() => track('safe_test_open')}>
          <div className="ic" aria-hidden="true">❓</div>
          <div className="tx">
            <b>{u.testTitle}</b>
            <span>{u.testSub}</span>
          </div>
          <span className="ss-pill dark">{u.start}</span>
        </Link>

        <a href="tel:1930" className="ss-sos" onClick={() => track('cheated_call')}>
          <span className="ic"><Icon name="phone" size={22} /></span>
          <span style={{ flex: 1 }}>
            <small>{u.lost}</small>
            <b>{u.call}</b>
          </span>
          <Icon name="chevron" size={22} />
        </a>
      </main>
      <BottomNav active="safe" t={t} />
    </div>
  );
}
