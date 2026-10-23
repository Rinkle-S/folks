// Matches what a parent said to a lesson, using a fixed keyword list.
// Two scores: how much of the question is about the TASK (send money, check balance...), and whether it names an app.
// A question that only matches on the app name ("send money via yono") is NOT a match for that app's other lessons;
// it shows the no-match card (ask someone, or browse the topics).
import { KEYWORDS, LESSONS } from './lessons';

// Words that only name an app. They never count as "the task".
const APP_WORDS = [
  'gpay', 'google pay', 'googlepay', 'जीपे', 'गूगल पे', 'ഗൂഗിൾ പേ', 'phonepe', 'phone pe', 'फोनपे', 'paytm', 'पेटीएम', 'പേടിഎം',
  'whatsapp', 'व्हाट्सएप', 'व्हाट्सऐप', 'വാട്സ്ആപ്പ്', 'വാട്സാപ്പ്', 'youtube', 'यूट्यूब', 'യൂട്യൂബ്', 'uber', 'उबर', 'rapido', 'रैपिडो',
  'swiggy', 'स्विगी', 'ola', 'zomato', 'ज़ोमैटो', 'amazon', 'अमेज़न', 'flipkart', 'फ्लिपकार्ट', 'instagram', 'इंस्टाग्राम',
  'spotify', 'yono', 'sbi', 'योनो', 'icici', 'आईसीआईसीआई', 'blinkit', 'ब्लिंकिट', 'zepto', 'जेप्टो', 'irctc', 'आईआरसीटीसी',
  'maps', 'google maps', 'drive', 'google drive', 'ड्राइव',
];

// Keywords in Latin letters must start a word ("ola" must not match inside "cola"), but may carry a suffix ("bhej" in "bhejna").
// Hindi and Malayalam keywords match anywhere, as those scripts are written joined.
const LATIN = /^[a-z0-9 ]+$/;
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
  const wordCount = q.split(/\s+/).filter(Boolean).length;
  const taskless = bestTask < 2;
  const justAppName = mentionsApp && wordCount <= 3;
  if (taskless && !justAppName) return { id: best, kind: 'weak', score: bestScore, task: bestTask };
  return { id: best, kind: LESSONS[best] ? 'lesson' : 'soon', score: bestScore, task: bestTask };
}

// Quick guides (lib/guides): short step lists for the real app. Used when no practice lesson fits.
import { GUIDE_LIST } from './guides/index';

export function matchGuide(text) {
  const q = (text || '').toLowerCase().trim();
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  for (const g of GUIDE_LIST) {
    let score = 0;
    for (const w of g.kw) {
      const k = w.toLowerCase();
      if (k.includes(' ')) {
        // several words: all must appear, in any order ("send money via yono" matches "yono send money")
        if (k.split(' ').filter((x) => x.length > 1).every((x) => has(q, x))) score += 5;
      } else if (has(q, k)) score += 3;
    }
    // Naming the app helps pick the right one among similar guides (cancel order: Swiggy or Flipkart).
    const ownApp = q.includes(g.app) || q.includes(String(g.appName).toLowerCase());
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
