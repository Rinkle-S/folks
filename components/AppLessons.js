'use client';
// One app's lessons, like a course page: the app, how many are learned, and each lesson as a card.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import AppIcon from './AppIcon';
import { AppBar, BottomNav } from './AppShell';
import { LESSONS, APPS } from '@/lib/lessons';
import { ALL_APPS } from '@/lib/apps';
import { T } from '@/lib/i18n';
import { useLang, getDone } from '@/lib/client';
import { getProfile } from '@/lib/profile';
import { orderForFluency } from '@/lib/levels';
import { effectiveFluency } from '@/lib/adapt';

export default function AppLessons({ app }) {
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  const [fluency, setFluency] = useState('');
  useEffect(() => {
    setDone(getDone());
    setFluency(effectiveFluency(getProfile().fluency));
  }, []);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  const info = APPS.find((a) => a.id === app) || ALL_APPS.find((a) => a.id === app);
  const list = orderForFluency(Object.values(LESSONS).filter((l) => l.app === app), fluency);
  const d = list.filter((l) => done.includes(l.id)).length;

  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <header className="app-head">
          <AppIcon app={app} size={72} />
          <div>
            <h1>{info.name}</h1>
            <p className="muted">
              {t.lessonsN(list.length)} · {t.learnedOf(d, list.length)}
            </p>
          </div>
        </header>

        <div className="lesson-list">
          {list.map((l, i) => {
            const isDone = done.includes(l.id);
            return (
              <Link key={l.id} href={`/lesson/${l.id}`} className={`lesson-card ${isDone ? 'is-done' : ''}`}>
                <span className="lesson-num">{isDone ? <Icon name="check" size={20} stroke={3} /> : i + 1}</span>
                <span className="lesson-main">
                  <b>{l.title[lang]}</b>
                  <small>
                    <Icon name="history" size={15} /> {t.minutesShort(l.minutes)}
                    {isDone && <em> · {t.learned}</em>}
                  </small>
                </span>
                <span className="lesson-go">
                  <Icon name="chevron" size={22} />
                </span>
              </Link>
            );
          })}
        </div>

        <Link href="/for-you" className="ask-more">
          <Icon name="heart" size={20} /> {t.askMore}
        </Link>
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
