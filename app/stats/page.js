// Live usage numbers from Supabase. Proves the data is real, and gives numbers for the deck.
import { LESSONS, COMING_SOON } from '@/lib/lessons';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Folks live stats' };

async function loadEvents() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { connected: false, events: [] };
  try {
    const r = await fetch(`${url}/rest/v1/events?select=*&order=created_at.desc&limit=10000`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
    });
    if (!r.ok) return { connected: true, error: true, events: [] };
    return { connected: true, events: await r.json() };
  } catch {
    return { connected: true, error: true, events: [] };
  }
}

const uniq = (arr) => new Set(arr).size;
const fmt = (d) =>
  new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export default async function Stats() {
  const { connected, error, events } = await loadEvents();
  const of = (type) => events.filter((e) => e.type === type);

  const starts = of('lesson_start');
  const completes = of('lesson_complete');
  const parents = uniq(starts.map((e) => e.device));

  const perLesson = Object.values(LESSONS).map((l) => {
    const s = uniq(starts.filter((e) => e.lesson === l.id).map((e) => e.device));
    const c = uniq(completes.filter((e) => e.lesson === l.id).map((e) => e.device));
    const wrong = of('wrong_tap').filter((e) => e.lesson === l.id);
    const hints = of('hint').filter((e) => e.lesson === l.id);
    const steps = l.steps.map((st, i) => ({
      i,
      id: st.id,
      label: st.say.en,
      wrong: wrong.filter((e) => e.step === i).length,
      hints: hints.filter((e) => e.step === i).length,
    }));
    const maxStuck = Math.max(1, ...steps.map((x) => x.wrong + x.hints));
    return { l, s, c, steps, maxStuck };
  });

  const searches = of('voice_search').slice(0, 25);
  const requests = [...of('ask_child'), ...of('tile_soon')];
  const reqCounts = {};
  for (const r of requests) {
    const k = r.meta?.id ? COMING_SOON.find((s) => s.id === r.meta.id)?.title.en || r.meta.id : r.meta?.q || '?';
    reqCounts[k] = (reqCounts[k] || 0) + 1;
  }
  const fb = { easy: 0, okay: 0, hard: 0 };
  for (const f of of('feedback')) if (f.meta?.v in fb) fb[f.meta.v]++;

  const cards = [
    ['Parents who started', parents],
    ['Lessons finished', uniq(completes.map((e) => `${e.device}|${e.lesson}`))],
    ['"Try on real app" taps', of('real_try').length],
    ['Shared with child', of('share').length],
    ['Voice / typed searches', of('voice_search').length],
    ['Lesson requests', requests.length],
  ];

  return (
    <div className="stats">
      <h1>Folks live stats</h1>
      {!connected && (
        <p className="warn">Database not connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.</p>
      )}
      {error && <p className="warn">Could not read from the database. Check the keys and that the events table exists.</p>}

      <div className="stat-cards">
        {cards.map(([k, v]) => (
          <div key={k} className="stat-card">
            <b>{v}</b>
            <span>{k}</span>
          </div>
        ))}
      </div>

      <h2>Lessons</h2>
      <table>
        <thead>
          <tr>
            <th>Lesson</th>
            <th>Started</th>
            <th>Finished</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {perLesson.map(({ l, s, c }) => (
            <tr key={l.id}>
              <td>{l.title.en}</td>
              <td>{s}</td>
              <td>{c}</td>
              <td>{s ? `${Math.round((c / s) * 100)}%` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Where people get stuck</h2>
      <p className="muted">Wrong taps and help requests, per step.</p>
      {perLesson.map(({ l, steps, maxStuck }) => (
        <div key={l.id} className="stuck">
          <h3>{l.title.en}</h3>
          {steps.map((st) => (
            <div key={st.i} className="stuck-row">
              <span className="stuck-label">
                {st.i + 1}. {st.id}
              </span>
              <span className="stuck-bar">
                <i style={{ width: `${((st.wrong + st.hints) / maxStuck) * 100}%` }} />
              </span>
              <span className="stuck-n">
                {st.wrong} wrong · {st.hints} help
              </span>
            </div>
          ))}
        </div>
      ))}

      <h2>What parents asked for</h2>
      {Object.keys(reqCounts).length === 0 ? (
        <p className="muted">No requests yet.</p>
      ) : (
        <ul className="plain">
          {Object.entries(reqCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => (
              <li key={k}>
                {k}: <b>{v}</b>
              </li>
            ))}
        </ul>
      )}

      <h2>Recent searches</h2>
      {searches.length === 0 ? (
        <p className="muted">No searches yet.</p>
      ) : (
        <ul className="plain">
          {searches.map((s) => (
            <li key={s.id}>
              "{s.meta?.q}" → {s.meta?.match || 'no match'} <span className="muted">({s.meta?.via}, {fmt(s.created_at)})</span>
            </li>
          ))}
        </ul>
      )}

      <h2>Feedback</h2>
      <p>
        😊 Easy {fb.easy} · 😐 Okay {fb.okay} · 😟 Hard {fb.hard}
      </p>

      <p className="muted small">Showing up to the latest 10,000 events. No names or phone numbers are stored.</p>
    </div>
  );
}
