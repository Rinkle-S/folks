// Internal page: how Folks orders lessons, per app and per kind of person. Not linked from the app.
// Edit levels in lib/levels.js; the rules for moving someone up or down are in lib/adapt.js.
import { LESSONS, APPS } from '@/lib/lessons';
import { ALL_APPS } from '@/lib/apps';
import { orderForFluency, levelOf, TARGET, SKILL_LESSONS, KNOWN_PENALTY } from '@/lib/levels';

export const metadata = { title: 'Folks lesson order', robots: { index: false, follow: false } };

const LEVEL_NAME = { 1: 'Gentle first steps', 2: 'Everyday apps', 3: 'Money, bookings, careful tasks' };
const COLS = [
  ['Original', null, []],
  ['Just starting', 'new', []],
  ['Basics', 'basic', []],
  ['Comfortable', 'comfy', []],
  ['Comfortable, ticked every skill', 'comfy', Object.keys(SKILL_LESSONS)],
];

export default function Levels() {
  const all = Object.values(LESSONS);
  const appIds = [...new Set(all.map((l) => l.app))];
  const name = (id) => (APPS.find((a) => a.id === id) || ALL_APPS.find((a) => a.id === id) || { name: id }).name;
  return (
    <div className="stats">
      <h1>How lesson order works</h1>
      <p className="muted">Nobody sees a level. A level only decides the order lessons are offered in; every lesson stays available.</p>

      <h2>The levels</h2>
      <ul className="plain">
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <b>Level {n}</b>: {LEVEL_NAME[n]} ({all.filter((l) => levelOf(l) === n).length} lessons)
          </li>
        ))}
      </ul>

      <h2>Who sees what first</h2>
      <ul className="plain">
        <li>
          <b>Just starting</b> (ticked 0 or 1 of 4 to 6 skills): level 1 first, then 2, then 3.
        </li>
        <li>
          <b>Basics</b> (ticked about a third to two thirds): levels 1 and 2 together in the original order, level 3 last.
        </li>
        <li>
          <b>Comfortable</b> (ticked two thirds or more): level 3 first, then 2, then 1.
        </li>
        <li>
          Under the hood each person has a target level ({Object.entries(TARGET).map(([k, v]) => `${k} = ${v}`).join(', ')}). Lessons nearest the target come first; ties keep the original order.
        </li>
        <li>
          <b>Skills they say they already do</b> move that lesson later (a penalty of {KNOWN_PENALTY} levels): {Object.entries(SKILL_LESSONS).map(([k, v]) => `${k}: ${v.join(', ')}`).join(' | ')}.
        </li>
        <li>
          The order applies inside each app's lesson list, and to the "Try this" suggestion on home. Their chosen apps still come first. If they never answered, the original order is used.
        </li>
      </ul>

      <h2>Moving someone up or down as they learn</h2>
      <ul className="plain">
        <li>Each finished practice lesson records wrong taps and "Help" presses (on the phone only). Trouble per step = (wrong taps + 2 x Help presses) / steps.</li>
        <li>
          <b>Easier</b>: average above 0.35 over the last 2 or 3 lessons moves them one step down (comfortable to basics, basics to just starting).
        </li>
        <li>
          <b>Harder</b>: average below 0.08 over the last 3 lessons, with at least one level 2 or 3 lesson, moves them one step up.
        </li>
        <li>If they skipped the tick screen, "basics" is assumed after two finished lessons.</li>
      </ul>

      <h2>Order per app (number = position in that person's list)</h2>
      <p className="muted">Apps with one or two lessons, or lessons all at one level, cannot reorder much.</p>
      {appIds.map((app) => {
        const base = all.filter((l) => l.app === app);
        const rank = COLS.map(([, f, sk]) => Object.fromEntries(orderForFluency(base, f || '', sk).map((l, i) => [l.id, i + 1])));
        return (
          <div key={app} style={{ overflowX: 'auto', marginBottom: 18 }}>
            <h3>{name(app)}</h3>
            <table className="lv">
              <thead>
                <tr>
                  <th>Lesson</th>
                  <th>Level</th>
                  {COLS.map(([c]) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {base.map((l) => (
                  <tr key={l.id}>
                    <td>{l.title.en}</td>
                    <td>{levelOf(l)}</td>
                    {rank.map((r, i) => (
                      <td key={i} className={r[l.id] !== rank[0][l.id] ? 'moved' : ''}>
                        {r[l.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
