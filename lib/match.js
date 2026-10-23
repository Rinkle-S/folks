// Matches what a parent said to a lesson, using a fixed keyword list.
// Two scores: how much of the question is about the TASK (send money, check balance...), and whether it names an app.
// A question that only matches on the app name ("send money via yono") is NOT a match for that app's other lessons;
// it goes to the AI helper instead (see /api/ask).
import { KEYWORDS, LESSONS } from './lessons';

// Words that only name an app. They never count as "the task".
const APP_WORDS = [
  'gpay', 'google pay', 'googlepay', 'जीपे', 'गूगल पे', 'ഗൂഗിൾ പേ', 'phonepe', 'phone pe', 'फोनपे', 'paytm', 'पेटीएम', 'പേടിഎം',
  'whatsapp', 'व्हाट्सएप', 'व्हाट्सऐप', 'വാട്സ്ആപ്പ്', 'വാട്സാപ്പ്', 'youtube', 'यूट्यूब', 'യൂട്യൂബ്', 'uber', 'उबर', 'rapido', 'रैपिडो',
  'swiggy', 'स्विगी', 'ola', 'zomato', 'ज़ोमैटो', 'amazon', 'अमेज़न', 'flipkart', 'फ्लिपकार्ट', 'instagram', 'इंस्टाग्राम',
  'spotify', 'yono', 'sbi', 'योनो', 'icici', 'आईसीआईसीआई', 'blinkit', 'ब्लिंकिट', 'zepto', 'जेप्टो', 'irctc', 'आईआरसीटीसी',
  'maps', 'google maps', 'drive', 'google drive', 'ड्राइव',
];

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
      if (q.includes(w)) {
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
  const mentionsApp = APP_WORDS.some((w) => q.includes(w));
  // "yono" alone is fine (they want to learn the app). "send money via yono" with no task match is not.
  const wordCount = q.split(/\s+/).filter(Boolean).length;
  const taskless = bestTask < 2;
  const justAppName = mentionsApp && wordCount <= 3;
  if (taskless && !justAppName) return { id: best, kind: 'weak', score: bestScore };
  return { id: best, kind: LESSONS[best] ? 'lesson' : 'soon', score: bestScore };
}
