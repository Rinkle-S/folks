// Nook learns how a person is really doing. Wrong taps and "Help" presses in finished practice lessons nudge
// the lesson order one step easier or harder than what they ticked in setup. Kept on this phone only; never shown.
import { levelOf } from './levels';

const KEY = 'folks_perf';
const LADDER = ['new', 'basic', 'comfy'];

export function getPerf() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function recordPerf(e) {
  try {
    const list = [...getPerf(), { ...e, at: Date.now() }].slice(-12);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

// How much trouble per step: a wrong tap counts once, a "Help" press counts twice.
const struggle = (e) => (e.wrong + 2 * e.hints) / Math.max(1, e.steps);

// Lessons they struggled with the last time, at least 3 days ago and not done better since: worth practising again.
export function reviewDueIds(now = Date.now()) {
  const latest = {};
  for (const e of getPerf()) latest[e.id] = e;
  return Object.values(latest)
    .filter((e) => struggle(e) > 0.35 && now - e.at >= 3 * 86400000)
    .map((e) => e.id);
}

// -1 = easier lessons first, 0 = as ticked, +1 = harder lessons first. Looks at the last 3 finished lessons.
export function estimateOffset(perf) {
  const recent = perf.slice(-3);
  if (recent.length < 2) return 0;
  const avg = recent.reduce((s, e) => s + struggle(e), 0) / recent.length;
  if (avg > 0.35) return -1;
  // Moving up needs a clean run of three, at least one of them an everyday (level 2 or 3) lesson.
  if (recent.length === 3 && avg < 0.08 && recent.some((e) => e.level >= 2)) return 1;
  return 0;
}

// The comfort level used for ordering: what they ticked, nudged by how they are actually doing.
export function effectiveFluency(declared) {
  const perf = getPerf();
  const base = declared || (perf.length >= 2 ? 'basic' : '');
  if (!base) return '';
  const i = Math.min(2, Math.max(0, LADDER.indexOf(base) + estimateOffset(perf)));
  return LADDER[i];
}

export { levelOf };
