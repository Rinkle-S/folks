// Matches what a parent said to a lesson, using a fixed keyword list.
// Two scores: how much of the question is about the TASK (send money, check balance...), and whether it names an app.
// A question that only matches on the app name ("send money via yono") is NOT a match for that app's other lessons;
// it shows the no-match card (ask someone, or browse the topics).
import { KEYWORDS, LESSONS } from './lessons';

// Words that only name an app. They never count as "the task".
const APP_WORDS = [
  'gpay', 'google pay', 'googlepay', 'जीपे', 'गूगल पे', 'ഗൂഗിൾ പേ', 'phonepe', 'phone pe', 'फोनपे',
  'whatsapp', 'व्हाट्सएप', 'व्हाट्सऐप', 'വാട്സ്ആപ്പ്', 'വാട്സാപ്പ്', 'uber', 'उबर', 'rapido', 'रैपिडो',
  'zomato', 'ज़ोमैटो',
  'yono', 'sbi', 'योनो', 'irctc', 'आईआरसीटीसी',
  'maps', 'google maps',
];

// Keywords in Latin letters must start a word ("ola" must not match inside "cola"), but may carry a suffix ("bhej" in "bhejna").
// Hindi and Malayalam keywords match anywhere, as those scripts are written joined.
const LATIN = /^[a-z0-9 ]+$/;
const APP_ALIASES = {
  gpay: ['gpay', 'google pay', 'googlepay', 'जीपे', 'गूगल पे', 'ഗൂഗിൾ പേ'],
  phonepe: ['phonepe', 'phone pe', 'फोनपे'],
  whatsapp: ['whatsapp', 'व्हाट्सएप', 'व्हाट्सऐप', 'വാട്സ്ആപ്പ്', 'വാട്സാപ്പ്'],
  uber: ['uber', 'उबर'], rapido: ['rapido', 'रैपिडो'], zomato: ['zomato', 'ज़ोमैटो'],
  yono: ['yono', 'sbi', 'योनो'], irctc: ['irctc', 'आईआरसीटीसी'],
  maps: ['maps', 'google maps'],
};
function fitsApp(q, app) {
  const named = Object.entries(APP_ALIASES).filter(([, aliases]) => aliases.some((w) => has(q, w)));
  return !named.length || named.some(([id]) => id === app);
}
function has(q, w) {
  if (!LATIN.test(w)) return q.includes(w);
  let i = q.indexOf(w);
  while (i !== -1) {
    if (i === 0 || !/[a-z0-9]/.test(q[i - 1])) return true;
    i = q.indexOf(w, i + 1);
  }
  return false;
}

export function matchLesson(text) {
  const q = (text || '').toLowerCase().trim();
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  let bestTask = 0;
  for (const [id, words] of Object.entries(KEYWORDS)) {
    if (!LESSONS[id] || !fitsApp(q, LESSONS[id].app)) continue;
    let score = 0;
    let task = 0;
    for (const [w, weight] of words) {
      if (has(q, w)) {
        score += weight;
        if (!APP_WORDS.includes(w)) task += weight;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTask = task;
      best = id;
    }
  }
  if (!best) return null;
  const mentionsApp = APP_WORDS.some((w) => has(q, w));
  // "yono" alone is fine (they want to learn the app). "send money via yono" with no task match is not.
  const taskless = bestTask < 2;
  const justAppName = mentionsApp && Object.values(APP_ALIASES).flat().includes(q);
  if (taskless && !justAppName) return { id: best, kind: 'weak', score: bestScore, task: bestTask };
  return { id: best, kind: LESSONS[best] ? 'lesson' : 'soon', score: bestScore, task: bestTask };
}

// Quick guides (lib/guides): short step lists for the real app. Used when no practice lesson fits.
import { GUIDE_LIST } from './guides/index';
import { EXTRA_GUIDE_KW } from './keywordsMore';

export function matchGuide(text) {
  const q = (text || '').toLowerCase().trim();
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  for (const g of GUIDE_LIST) {
    if (!fitsApp(q, g.app)) continue;
    let score = 0;
    for (const w of [...g.kw, ...(EXTRA_GUIDE_KW[g.id] || [])]) {
      const k = w.toLowerCase();
      if (k.includes(' ')) {
        // several words: all must appear, in any order ("send money via yono" matches "yono send money")
        if (k.split(' ').filter((x) => x.length > 1).every((x) => has(q, x))) score += 5;
      } else if (has(q, k)) score += 3;
    }
    // Naming the app helps pick the right one among similar guides (cancel order: Swiggy or Flipkart).
    const ownApp = (APP_ALIASES[g.app] || [g.app, String(g.appName).toLowerCase()]).some((w) => has(q, w));
    if (score > 0 && ownApp) score += 2;
    // Naming a different app ("check balance yono") must not pick another app's guide.
    if (score > 0 && !ownApp && APP_WORDS.some((w) => has(q, w))) score = 0;
    if (score > bestScore) {
      bestScore = score;
      best = g.id;
    }
  }
  return best ? { id: best, score: bestScore } : null;
}

// "Did you mean": the closest lessons and quick guides when nothing matched clearly. It counts every keyword hit (even
// ones that only name an app or are a little vague), words that appear in a lesson's title, and one-letter typos.
const STOP = new Set(['how', 'to', 'do', 'i', 'my', 'me', 'the', 'a', 'an', 'on', 'in', 'of', 'for', 'and', 'want', 'please', 'can', 'you', 'show', 'teach', 'learn', 'need', 'phone', 'mobile', 'app', 'with', 'is', 'it', 'this', 'that', 'kaise', 'karna', 'karo', 'hai', 'ka', 'ki', 'ke', 'mein', 'se', 'ko']);

function tokens(q) {
  return q.split(/[^a-z0-9\u0900-\u097f\u0d00-\u0d7f]+/).filter((x) => x.length > 1 && !STOP.has(x));
}

// True when two words are a typo apart: one letter off for short words, two for long ones ("reachrge" for "recharge").
function near(a, b) {
  if (a === b) return true;
  const max = Math.min(a.length, b.length) >= 7 ? 2 : 1;
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length] <= max;
}

function fuzzyScore(q, toks, keywords, titles) {
  let score = 0;
  for (const [w, weight] of keywords) if (has(q, w)) score += weight;
  const hay = titles.join(' ').toLowerCase();
  for (const x of toks) {
    if (x.length >= 3 && has(hay, x)) score += 2;
    else if (x.length >= 5 && /^[a-z]+$/.test(x)) {
      const words = [...hay.split(/[^a-z]+/), ...keywords.map(([w]) => w).filter((w) => /^[a-z]+$/.test(w))];
      if (words.some((w) => w.length >= 5 && near(x, w))) score += 1;
    }
  }
  return score;
}

export function suggest(text, max = 3) {
  const q = (text || '').toLowerCase().trim();
  if (!q) return [];
  const toks = tokens(q);
  if (!toks.length) return [];
  const out = [];
  for (const [id, words] of Object.entries(KEYWORDS)) {
    const l = LESSONS[id];
    if (!l || !fitsApp(q, l.app)) continue;
    const sc = fuzzyScore(q, toks, words, [l.title.en, l.title.hi || '', l.title.ml || '']);
    if (sc > 0) out.push({ kind: 'lesson', id, score: sc });
  }
  for (const g of GUIDE_LIST) {
    if (!fitsApp(q, g.app)) continue;
    const kws = [...g.kw, ...(EXTRA_GUIDE_KW[g.id] || [])].map((w) => [w.toLowerCase(), 3]);
    const sc = fuzzyScore(q, toks, kws, [g.title.en, g.title.hi || '', g.title.ml || '']);
    if (sc > 0) out.push({ kind: 'guide', id: g.id, score: sc });
  }
  // A practice lesson comes before a quick guide when the scores are close.
  out.sort((a, b) => b.score - a.score || (a.kind === 'lesson' ? -1 : 1));
  return out.slice(0, max);
}

// True when one lesson or guide is clearly the best answer. When two score almost the same ("photo": selfie or
// WhatsApp file?), the parent is shown the choices instead of being sent to the wrong lesson.
export function isClear(text) {
  const s = suggest(text, 2);
  if (s.length < 2) return true;
  return s[0].score - s[1].score >= 2;
}
