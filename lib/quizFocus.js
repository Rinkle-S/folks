// On "look at the screen and decide" quiz steps, the thing to check is marked with an outline and scrolled into view
// at full size. Text is matched against what the screen shows (the start of one piece of text). Other quizzes stay as they are.
const FOCUS = {
  'qr-pay': { 'check-name': 'Paying ' },
  'electricity-bill': { 'check-bill': 'Kamala Nair' },
  'icici-transactions': { unknown: 'UPI/Quick Win Casino' },
  'irctc-pnr': { result: 'CNF' },
};

export function applyQuizFocus(lessons) {
  for (const [lesson, steps] of Object.entries(FOCUS)) {
    for (const s of (lessons[lesson] || {}).steps || []) if (steps[s.id]) s.focusText = steps[s.id];
  }
}
