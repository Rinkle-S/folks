'use client';
// The topics (short courses) as big, calm cards, grouped by level. Used on the home screen and on /themes.
import Link from 'next/link';
import Icon from './Icons';
import { LEVELS, THEMES } from '@/lib/themes';
import { LESSONS } from '@/lib/lessons';

export default function ThemeList({ lang, t, done, grouped = true }) {
  const card = (th) => {
    const ids = th.lessons.filter((id) => LESSONS[id]);
    const d = ids.filter((id) => done.includes(id)).length;
    return (
      <Link key={th.id} href={`/theme/${th.id}`} className="lesson-card topic-card">
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
  };
  return (
    <div className="theme-list">
      {grouped ? (
        LEVELS.map((lv) => (
          <section key={lv.id}>
            <div className="section-h">
              <span>
                {lv.title[lang]} <small className="muted">{lv.sub[lang]}</small>
              </span>
            </div>
            <div className="lesson-list">{THEMES.filter((x) => x.level === lv.id).map(card)}</div>
          </section>
        ))
      ) : (
        <div className="lesson-list">{THEMES.map(card)}</div>
      )}
      <div className="lesson-card topic-card is-soon" aria-disabled="true">
        <span className="lesson-num theme-ic">🎙️</span>
        <span className="lesson-main">
          <b>{t.voiceSoonTitle}</b>
          <small>{t.soonTag}</small>
        </span>
      </div>
    </div>
  );
}
