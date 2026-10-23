'use client';
// A topic as one written guide: every lesson's real-phone steps in order, so a parent can read the whole journey
// without opening each practice screen. Each part links to its practice lesson.
import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import { entriesFor } from '@/lib/printable';

export default function JourneyArticle({ ids, lang, t }) {
  const [open, setOpen] = useState(false);
  const parts = entriesFor(ids, lang);
  if (!parts.length) return null;
  return (
    <section className="journey">
      <button className="topics-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="topics-ic">
          <Icon name="list" size={24} />
        </span>
        <span className="topics-tx">
          <b>{t.journeyTitle}</b>
          <small>{t.journeySub}</small>
        </span>
        <Icon name={open ? 'up' : 'down'} size={22} />
      </button>
      {open &&
        parts.map((e, n) => (
          <article key={e.id} className="journey-part">
            <h3>
              {n + 1}. {e.title}
            </h3>
            <ol>
              {e.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            {e.caution && <p className="journey-tip">{e.caution}</p>}
            <Link href={LESSON_HREF(e.id)} className="link-btn">
              {t.journeyPractise}
            </Link>
          </article>
        ))}
    </section>
  );
}

const LESSON_HREF = (id) => `/lesson/${id}`;
