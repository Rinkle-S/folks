'use client';
// Learn by topic: short courses, grouped by level.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import { AppBar, BottomNav } from '@/components/AppShell';
import { T } from '@/lib/i18n';
import { useLang, getDone } from '@/lib/client';
import { LEVELS, THEMES } from '@/lib/themes';
import { LESSONS } from '@/lib/lessons';

export default function Themes() {
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  useEffect(() => setDone(getDone()), []);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="page-h">{t.themesTitle}</h1>
        <p className="muted">{t.themesSub}</p>
        {LEVELS.map((lv) => (
          <section key={lv.id}>
            <div className="section-h">
              <span>
                {lv.title[lang]} <small className="muted">{lv.sub[lang]}</small>
              </span>
            </div>
            <div className="lesson-list">
              {THEMES.filter((x) => x.level === lv.id).map((th) => {
                const ids = th.lessons.filter((id) => LESSONS[id]);
                const d = ids.filter((id) => done.includes(id)).length;
                return (
                  <Link key={th.id} href={`/theme/${th.id}`} className="lesson-card">
                    <span className="lesson-num theme-ic">{th.icon}</span>
                    <span className="lesson-main">
                      <b>{th.title[lang]}</b>
                      <small>
                        {t.lessonsN(ids.length)} · {t.learnedOf(d, ids.length)}
                      </small>
                    </span>
                    <span className="lesson-go">
                      <Icon name="chevron" size={22} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
        <Link href="/print" className="ask-more">
          <Icon name="file" size={20} /> {t.printTitle}
        </Link>
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
