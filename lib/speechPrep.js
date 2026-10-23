// Tidies a sentence before it goes to Sarvam, so the voice pauses in the right places.
// Only the text sent to the voice changes. The text on screen stays as it is.
const DIGITS = {
  en: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
  hi: ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ'],
  ml: ['പൂജ്യം', 'ഒന്ന്', 'രണ്ട്', 'മൂന്ന്', 'നാല്', 'അഞ്ച്', 'ആറ്', 'ഏഴ്', 'എട്ട്', 'ഒമ്പത്'],
};
const RUPEES = { en: 'rupees', hi: 'रुपये', ml: 'രൂപ' };

export function prepareSpeech(raw, lang = 'en') {
  const d = DIGITS[lang] || DIGITS.en;
  let s = String(raw);

  // Pictures, ticks and arrows are not words.
  s = s.replace(/\p{Extended_Pictographic}/gu, '').replace(/[✓✔]/g, '').replace(/\s*[→>]\s*/g, ', ');
  s = s.replace(/\n+/g, '. ');

  // Money: "₹1,240" is said as "1240 rupees", with no pause inside the number.
  s = s.replace(/(\d),(?=\d{3}(?!\d))/g, '$1');
  s = s.replace(/₹\s?(\d+)/g, (_, n) => `${n} ${RUPEES[lang] || RUPEES.en}`);

  // PIN and number lists such as "1, 2, 3, 4": one clear word per digit, a small pause between.
  s = s.replace(/\b\d(?:,\s*\d)+\b/g, (m) => m.match(/\d/g).map((x) => d[+x]).join(', '));

  // Codes read one by one such as "D L 3 C A B 1 2 3 4" and "5 1 7 2": a small pause between each.
  s = s.replace(/(?<![\p{L}\p{N}])(?:[A-Z0-9] ){2,}[A-Z0-9](?![\p{L}\p{N}])/gu, (m) =>
    m.split(' ').map((x) => (/\d/.test(x) ? d[+x] : x)).join(', ')
  );

  // Quote marks around button names make the voice stumble. Keep the words.
  s = s.replace(/(^|[\s(])['"‘“]+/g, '$1').replace(/['"’”]+(?=[\s.,!?:;)।]|$)/g, '');

  // Brackets, colons, semicolons and dashes become a short, even pause.
  s = s.replace(/\s*\(([^)]*)\)/g, ', $1,').replace(/\s*[:;]\s+/g, ', ').replace(/\s+[-–—]\s+/g, ', ');

  // Tidy leftovers.
  s = s.replace(/,\s*,+/g, ',').replace(/,\s*([.!?।])/g, '$1').replace(/\s+([.!?,।])/g, '$1').replace(/\s{2,}/g, ' ');
  return s.trim();
}
