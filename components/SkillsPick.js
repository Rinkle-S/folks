'use client';
// "Tick what you already do": 4 to 6 pointed questions, shown only for the apps the person chose.
// Behaviour is a fairer guide than asking people to rate themselves. The answers only reorder lessons.
import { T } from '@/lib/i18n';

const SKILLS = [
  ['call', ['whatsapp']],
  ['photo', ['whatsapp']],
  ['pay', ['gpay']],
  ['install', null],
  ['wifi', null],
];

// Which skills to ask about, given the apps picked (none picked: ask about all).
export function skillsFor(apps) {
  const picked = apps && apps.length ? apps : null;
  return SKILLS.filter(([, need]) => !need || !picked || need.some((a) => picked.includes(a))).map(([k]) => k);
}

// Share of ticked skills -> new, basic or comfy. Nothing ticked means "just starting".
export function fluencyFrom(ticked, shown) {
  if (!shown.length) return '';
  const share = shown.filter((k) => ticked.includes(k)).length / shown.length;
  const e = 1e-9; // so exactly two thirds (4 of 6) counts as comfy and one third (2 of 6) as basic
  return share >= 2 / 3 - e ? 'comfy' : share >= 1 / 3 - e ? 'basic' : 'new';
}

export default function SkillsPick({ lang, apps, value, onChange }) {
  const t = T[lang];
  const shown = skillsFor(apps);
  const toggle = (k) => onChange(value.includes(k) ? value.filter((x) => x !== k) : [...value, k]);
  return (
    <div className="fluency">
      {shown.map((k) => (
        <button key={k} className={`fl-opt tick ${value.includes(k) ? 'on' : ''}`} onClick={() => toggle(k)} aria-pressed={value.includes(k)}>
          <span className="tick-box">{value.includes(k) ? '✓' : ''}</span>
          <b>{t['sk_' + k]}</b>
        </button>
      ))}
    </div>
  );
}
