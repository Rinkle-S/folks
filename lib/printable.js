// What goes on a printed handout or in a topic's written journey: the real-phone steps of a guide or lesson.
import { GUIDES, GUIDE_LIST } from './guides';
import { LESSONS } from './lessons';
import { buildCards } from './followCards';

// id is a quick guide ("gd-install-app") or a lesson id. Lessons without steps of their own print their key points.
export function entryFor(id, lang) {
  const g = GUIDES[id.replace(/^gd-/, '')];
  if (g) return { id, title: g.title[lang], app: g.appName, steps: g.steps.map((s) => s[lang]), caution: g.caution ? g.caution[lang] : '' };
  const l = LESSONS[id];
  if (!l) return null;
  const cards = buildCards(l, lang);
  return { id, title: l.title[lang], app: l.appName, steps: cards.filter((c) => !c.tip).map((c) => c.text), caution: cards.filter((c) => c.tip).map((c) => c.text).join(' ') };
}

export const entriesFor = (ids, lang) => [...new Set(ids)].map((id) => entryFor(id, lang)).filter((e) => e && e.steps.length);

// Every guide and lesson that belongs to an app.
export const idsForApp = (app) => [
  ...GUIDE_LIST.filter((g) => g.app === app).map((g) => 'gd-' + g.id),
  ...Object.values(LESSONS).filter((l) => l.app === app && !l.id.startsWith('gd-')).map((l) => l.id),
];
