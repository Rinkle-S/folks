// Practice screens never ask for a real PIN. Every PIN step (UPI PIN, MPIN, bank login PIN) accepts any
// digits, so a parent is never trained to type a real PIN into a look-alike screen, and nothing typed is kept.
// The digits in `expected` are only used to show the steps in Watch mode.
const words = (n) => ({
  say: {
    en: `Now type any ${n} numbers you like. This is just practice, so please do not type your real PIN.`,
    hi: `अब कोई भी ${n} नंबर डालिए। यह सिर्फ़ अभ्यास है, इसलिए अपना असली PIN मत डालिए।`,
    ml: `ഇനി ഇഷ്ടമുള്ള ഏതെങ്കിലും ${n} നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്, അതിനാൽ നിങ്ങളുടെ യഥാർത്ഥ PIN അടിക്കരുത്.`,
  },
  hint: {
    en: `Type any ${n} numbers. This is just practice.`,
    hi: `कोई भी ${n} नंबर डालिए। यह सिर्फ़ अभ्यास है।`,
    ml: `ഏതെങ്കിലും ${n} നമ്പർ അടിക്കൂ. ഇത് പരിശീലനം മാത്രമാണ്.`,
  },
});

export const isPinStep = (s) => s.kind === 'input' && (s.field === 'pin' || s.field === 'mpin');

export function applyAnyPin(lessons) {
  for (const lesson of Object.values(lessons)) {
    for (const s of lesson.steps || []) {
      if (!isPinStep(s)) continue;
      const w = words(s.expected.length);
      s.anyDigits = true;
      s.say = w.say;
      s.hint = w.hint;
    }
  }
}
