'use client';
// "How comfortable are you with your phone?" Three friendly answers, no score. Used in setup and in Profile.
// The answer only changes the order lessons are offered in (lib/levels.js).
import { T } from '@/lib/i18n';

const OPTIONS = ['new', 'basic', 'comfy'];

export default function FluencyPick({ lang, value, onChange }) {
  const t = T[lang];
  return (
    <div className="fluency">
      {OPTIONS.map((k) => (
        <button key={k} className={`fl-opt ${value === k ? 'on' : ''}`} onClick={() => onChange(k)} aria-pressed={value === k}>
          <b>{t['fl_' + k]}</b>
          <small>{t['fl_' + k + '_sub']}</small>
        </button>
      ))}
    </div>
  );
}
