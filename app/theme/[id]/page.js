'use client';
import { useParams } from 'next/navigation';
// One topic: a short "good to know" intro, then its lessons in order.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import AppIcon from '@/components/AppIcon';
import { AppBar, BottomNav } from '@/components/AppShell';
import PrintBar from '@/components/PrintBar';
import JourneyArticle from '@/components/JourneyArticle';
import { T } from '@/lib/i18n';
import { useLang, getDone } from '@/lib/client';
import { THEMES } from '@/lib/themes';
import { LESSONS } from '@/lib/lessons';

export default function Theme() {
  const params = useParams();
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  useEffect(() => setDone(getDone()), []);
  const th = THEMES.find((x) => x.id === params.id);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  if (!th) return <div className="page">Not found</div>;
  const lessons = th.lessons.map((id) => LESSONS[id]).filter(Boolean);
  return (
    <div className="shell learn-page learn-topic">
      <AppBar back="/themes" learn t={t} />
      <main className="shell-main">
        <header className="app-head">
          <span className="theme-big">{th.icon}</span>
          <div>
            <h1>{th.title[lang]}</h1>
            <p className="muted">{th.lead[lang]}</p>
          </div>
        </header>

        <div className="section-h">
          <span>{t.goodToKnow}</span>
        </div>
        <div className="theme-cards">
          {th.cards.map(([title, text], i) => (
            <div key={i} className="theme-card">
              <b>{title[lang]}</b>
              <p>{text[lang]}</p>
            </div>
          ))}
        </div>

        <JourneyArticle ids={th.lessons} lang={lang} t={t} />

        <div className="section-h">
          <span>{t.lessonsInOrder}</span>
        </div>
        <div className="lesson-list">
          {lessons.map((l, i) => {
            const isDone = done.includes(l.id);
            return (
              <div key={l.id} className="lesson-row">
              <Link href={`/lesson/${l.id}`} className={`lesson-card ${isDone ? 'is-done' : ''}`}>
                <span className="lesson-num">{isDone ? <Icon name="check" size={20} stroke={3} /> : i + 1}</span>
                <span className="lesson-main">
                  <b>{l.title[lang]}</b>
                  <small>
                    <AppIcon app={l.app} size={16} /> {l.appName} · {t.minutesShort(l.minutes)}
                    {isDone && <em> · {t.learned}</em>}
                  </small>
                </span>
                <span className="lesson-go">
                  <Icon name="chevron" size={22} />
                </span>
              </Link>
              </div>
            );
          })}
          {(th.links || []).map((x) => (
            <Link key={x.href} href={x.href} className="lesson-card">
              <span className="lesson-num">
                <Icon name="shieldCheck" size={20} />
              </span>
              <span className="lesson-main">
                <b>{x.title[lang]}</b>
              </span>
              <span className="lesson-go">
                <Icon name="chevron" size={22} />
              </span>
            </Link>
          ))}
        </div>
        <section className="learn-helper" aria-labelledby="topic-helper-title">
          <h2 id="topic-helper-title">{t.appHelperTitle}</h2>
          <Link className="btn helper-send" href={`/send?topic=${encodeURIComponent(th.id)}&lang=${lang}`}><Icon name="share" size={22}/>{t.topicSendLesson}</Link>
          <PrintBar lang={lang} t={t} ids={th.lessons} heading={th.title[lang]}/>
        </section>
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
