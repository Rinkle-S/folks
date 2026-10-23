// Matches what a parent said to a lesson, using a fixed keyword list.
// No AI-generated instructions: we only ever pick from lessons we have checked.
import { KEYWORDS, LESSONS } from './lessons';

export function matchLesson(text) {
  const q = (text || '').toLowerCase().trim();
  if (!q) return null;
  let best = null;
  let bestScore = 0;
  for (const [id, words] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const [w, weight] of words) {
      if (q.includes(w)) score += weight;
    }
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  if (!best) return null;
  return { id: best, kind: LESSONS[best] ? 'lesson' : 'soon', score: bestScore };
}
