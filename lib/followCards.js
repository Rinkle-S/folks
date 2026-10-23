// The steps of a lesson written for the real phone, in order. Shared by "Read the steps" and printing.
import { REAL, FOLLOW_SKIP } from './lessons';

export function buildCards(lesson, lang) {
  const skip = FOLLOW_SKIP[lesson.id] || [];
  const real = REAL[lesson.id] || {};
  const list = [];
  const values = {};
  lesson.steps.forEach((s, idx) => {
    if (s.kind === 'info' && idx === 0) return;
    if (skip.includes(s.id)) return;
    let text = real[s.id] ? real[s.id][lang] : s.say[lang];
    let tip = false;
    if (s.kind === 'quiz') {
      const right = s.options.find((o) => o.correct);
      text = real[s.id] ? real[s.id][lang] : right.why[lang];
      tip = !real[s.id];
    }
    list.push({ step: s, text, tip, values: { ...values } });
    if (s.kind === 'input') values[s.field] = s.expected;
  });
  return list;
}
