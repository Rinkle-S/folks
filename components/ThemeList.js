'use client';
// The topics (short courses) as big, calm cards in one list, easiest first. Used on the home screen and on /themes.
import Link from 'next/link';
import Icon from './Icons';
import { THEMES } from '@/lib/themes';
import { LESSONS } from '@/lib/lessons';

export default function ThemeList({ lang, t, done, limit }) {
  const card = (th) => {
    const ids = th.lessons.filter((id) => LESSONS[id]);
    const d = ids.filter((id) => done.includes(id)).length;
    return (
      <Link key={th.id} href={`/theme/${th.id}`} className="lesson-card topic-card">
        <span className="lesson-num theme-ic">{limit ? <Icon name={th.id === 'rides' ? 'car' : 'grid'} size={26} /> : th.icon}</span>
        <span className="lesson-main">
          <b>{th.title[lang]}</b>
          <small>
            {limit ? (d === ids.length && d > 0 ? <>{t.lessonsN(ids.length)} · <em className="topic-learned">✓ {t.learned}</em></> : d > 0 ? `${t.lessonsN(ids.length)} · ${t.appDoneOf(d, ids.length)}` : t.appNewProgress(ids.length)) : <>{t.lessonsN(ids.length)} · {t.learnedOf(d, ids.length)}</>}
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
      <div className="lesson-list">{(limit ? THEMES.slice(0, limit) : THEMES).map(card)}</div>
    </div>
  );
}
