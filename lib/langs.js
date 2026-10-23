// Languages Nook speaks. Sarvam supports 11 Indian languages for voice and mic, so adding one
// means adding its words (see lib/ml.js for how Malayalam was added) and a line here.
export const LANGS = [
  { id: 'en', label: 'English', code: 'en-IN' },
  { id: 'hi', label: 'हिंदी', name: 'Hindi', code: 'hi-IN' },
  { id: 'ml', label: 'മലയാളം', name: 'Malayalam', code: 'ml-IN' },
];
export const LANG_IDS = LANGS.map((l) => l.id);
export const isLang = (l) => LANG_IDS.includes(l);
export const langCode = (l) => (LANGS.find((x) => x.id === l) || LANGS[0]).code;
