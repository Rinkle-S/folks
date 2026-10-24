'use client';
// Five big stars. Asked after the second finished lesson (and always available on the Help page).
import { useState } from 'react';
import Icon from './Icons';
import FeedbackAsk from './FeedbackAsk';
import { track, getRate, setRate, snoozeRate, getDone } from '@/lib/client';

export default function RateApp({ t, lang, where, canSnooze }) {
  const [stars, setStars] = useState(getRate().stars || 0);
  const [gone, setGone] = useState(false);
  if (gone) return null;
  function pick(n) {
    setStars(n);
    setRate({ ...getRate(), stars: n });
    track('app_rating', { meta: { stars: n, lang, where, lessons: getDone().length } });
  }
  return (
    <section className="rate-card" aria-label={t.rateTitle}>
      <b>{t.rateTitle}</b>
      {!stars && <p className="muted">{t.rateSub}</p>}
      <div className="stars" role="group" aria-label={t.rateTitle}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" className={`star ${n <= stars ? 'on' : ''}`} onClick={() => pick(n)} aria-label={t.starsN(n)} aria-pressed={n === stars}>
            <Icon name="star" size={34} />
          </button>
        ))}
      </div>
      {stars > 0 && (
        <>
          <p className="thanks">{t.rateThanks}</p>
          <FeedbackAsk t={t} lang={lang} where={where} v={`stars_${stars}`} type="app_feedback" />
        </>
      )}
      {!stars && canSnooze && (
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            snoozeRate();
            setGone(true);
          }}
        >
          {t.rateLater}
        </button>
      )}
    </section>
  );
}
