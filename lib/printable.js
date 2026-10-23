// What goes on a printed handout. One guide, every guide of an app, or a topic's lessons.
import { GUIDES, GUIDE_LIST } from './guides';
import { LESSONS } from './lessons';

// id is a quick guide ("gd-install-app") or a lesson id. Lessons without steps of their own print their key points.
export function entryFor(id, lang) {
  const g = GUIDES[id.replace(/^gd-/, '')];
  if (g) return { id, title: g.title[lang], app: g.appName, steps: g.steps.map((s) => s[lang]), caution: g.caution ? g.caution[lang] : '' };
  const l = LESSONS[id];
  if (!l) return null;
  return { id, title: l.title[lang], app: l.appName, steps: (l.takeaways && l.takeaways[lang]) || [], caution: '' };
}

export const entriesFor = (ids, lang) => [...new Set(ids)].map((id) => entryFor(id, lang)).filter((e) => e && e.steps.length);

// Every guide and lesson that belongs to an app.
export const idsForApp = (app) => [
  ...GUIDE_LIST.filter((g) => g.app === app).map((g) => 'gd-' + g.id),
  ...Object.values(LESSONS).filter((l) => l.app === app && !l.id.startsWith('gd-')).map((l) => l.id),
];
