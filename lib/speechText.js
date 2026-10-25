// Every sentence the app may read aloud, so the server only ever voices known text (no free-for-all TTS).
import { LESSONS, REAL, APPS } from './lessons';
import { SCAMS } from './scams';
import { T } from './i18n';
import { textId } from './hash';

let cache = null;

export function speechTexts() {
  if (cache) return cache;
  const map = new Map();
  const add = (s) => {
    if (typeof s === 'string' && s.trim()) map.set(textId(s), s);
  };
  const both = (o) => o && (add(o.en), add(o.hi), add(o.ml));
  for (const l of Object.values(LESSONS)) {
    both(l.title);
    both(l.scene?.say);
    both(l.closing);
    for (const s of l.steps) {
      both(s.say);
      if (l.id === 'qr-pay' && s.id === 'scam-quiz') for (const lang of ['en', 'hi', 'ml']) add(`${T[lang].safetyHeading} ${T[lang].safetySub} ${s.say[lang]}`);
      both(s.hint);
      (s.options || []).forEach((o) => both(o.why));
    }
  }
  for (const r of Object.values(REAL)) Object.values(r).forEach(both);
  for (const s of SCAMS) {
    both(s.msg);
    both(s.why);
    both(s.todo);
    both(s.context);
  }
  for (const lang of ['en', 'hi', 'ml']) {
    const t = T[lang];
    for (const v of Object.values(t)) {
      if (typeof v === 'string') add(v);
      if (Array.isArray(v)) v.forEach(add);
    }
    for (const a of APPS) add(t.followOpen(a.name));
    for (let s = 0; s <= SCAMS.length; s++) add(t.scamScore(s, SCAMS.length));
  }
  cache = map;
  return map;
}
