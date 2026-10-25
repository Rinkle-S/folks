'use client';
// One app's lessons, like a course page: the app, how many are learned, and each lesson as a card.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import AppIcon from './AppIcon';
import { AppBar, BottomNav } from './AppShell';
import PrintBar from './PrintBar';
import { idsForApp } from '@/lib/printable';
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
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    setDone(getDone());
    setFluency(effectiveFluency(getProfile().fluency));
    setSkills(getProfile().skills || []);
  }, []);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  const info = APPS.find((a) => a.id === app) || ALL_APPS.find((a) => a.id === app);
  const list = orderForFluency(Object.values(LESSONS).filter((l) => l.app === app), fluency, skills);
  const d = list.filter((l) => done.includes(l.id)).length;
  const nextId = list.find((l) => !done.includes(l.id))?.id;

  return (
    <div className="shell learn-page learn-app">
      <AppBar back="/" learn t={t} />
      <main className="shell-main">
        <header className="app-head" data-app={app}>
          <AppIcon app={app} size={72} />
          <div>
            <h1>{info.name}</h1>
            <p className="muted">
              {t.lessonsN(list.length)} · {t.appDoneOf(d, list.length)}
            </p>
          </div>
        </header>

        <div className="lesson-list">
          {list.map((l, i) => {
            const isDone = done.includes(l.id);
            const upNext = l.id === nextId;
            return (
              <div key={l.id} className="lesson-row">
              <Link href={`/lesson/${l.id}`} className={`lesson-card ${isDone ? 'is-done' : ''} ${upNext ? 'up-next' : ''}`}>
                <span className="lesson-num">{isDone ? <Icon name="check" size={20} stroke={3} /> : i + 1}</span>
                <span className="lesson-main">
                  <b>{l.title[lang]}</b>
                  <small>
                    <Icon name="history" size={15} /> {t.minutesShort(l.minutes)}
                    {isDone && <em> · {t.learned}</em>}
                    {upNext && <> · {t.appUpNext}</>}
                  </small>
                </span>
                {upNext ? <span className="lesson-start">{t.startNow}</span> : <span className="lesson-go">
                  <Icon name="chevron" size={22} />
                </span>}
              </Link>
              </div>
            );
          })}
        </div>

        <Link href="/help#request-lesson" className="ask-more">
          <Icon name="plus" size={24} /><span>{t.appRequestLead} <b>{t.appRequestAction}</b></span><Icon name="chevron" size={20} />
        </Link>
        <section className="learn-helper" aria-labelledby="learn-helper-title">
          <h2 id="learn-helper-title">{t.appHelperTitle}</h2>
          <Link className="btn helper-send" href={`/send?app=${encodeURIComponent(app)}&lang=${lang}`}><Icon name="share" size={22} />{t.appSendLesson}</Link>
          <PrintBar lang={lang} t={t} ids={idsForApp(app)} heading={info.name} />
        </section>
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
