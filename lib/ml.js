// Malayalam for all lesson and scam text. Translations are keyed by the English sentence, so lesson
// files stay en/hi and Malayalam is filled in here. Anything without a translation falls back to English.
import { ML1 } from './mlContent1';
import { ML2 } from './mlContent2';

export const ML = { ...ML1, ...ML2 };
export const ML_MISSING = new Set();

function tr(s) {
  if (ML[s] !== undefined) return ML[s];
  ML_MISSING.add(s);
  return s;
}

// Walks lesson data and adds .ml next to every { en, hi } pair.
export function fillMl(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(fillMl);
  if ('en' in node && 'hi' in node && (typeof node.en === 'string' || Array.isArray(node.en))) {
    if (node.ml === undefined) node.ml = Array.isArray(node.en) ? node.en.map(tr) : tr(node.en);
    return;
  }
  Object.values(node).forEach(fillMl);
}

// In Malayalam, family names read Chettan and Chechi, not the Hindi Bhaiya and Didi. Names stay as written
// everywhere else (screen data, tap targets, English and Hindi); only the Malayalam text and display change.
export const mlNames = (s) => s.replace(/Bhaiya/g, 'Chettan').replace(/Didi/g, 'Chechi');
export function localiseMlNames(node) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach(localiseMlNames);
  if ('en' in node && node.ml !== undefined) {
    node.ml = Array.isArray(node.ml) ? node.ml.map(mlNames) : mlNames(node.ml);
    return;
  }
  Object.values(node).forEach(localiseMlNames);
}

// Words a parent may say in Malayalam, per lesson.
export const ML_KEYWORDS = {
  'qr-pay': [['ക്യുആർ', 3], ['ക്യൂആർ', 3], ['സ്കാൻ', 2], ['കട', 2], ['പേയ്മെന്റ്', 1], ['പണം അടയ്ക്ക', 2]],
  'send-money': [['പണം അയക്ക', 4], ['പൈസ അയക്ക', 4], ['അയക്കാൻ', 2], ['ട്രാൻസ്ഫർ', 3]],
  recharge: [['റീചാർജ്', 4], ['റീച്ചാർജ്', 4], ['പ്ലാൻ', 2]],
  'whatsapp-docs': [['വാട്സ്ആപ്പ്', 1], ['വാട്ട്സാപ്പ്', 1], ['പഴയ', 2], ['ഫോട്ടോ', 2], ['ഫയൽ', 2], ['കണ്ടെത്ത', 2], ['പിഡിഎഫ്', 2]],
  'whatsapp-status': [['സ്റ്റാറ്റസ്', 4]],
  'scan-doc': [['കടലാസ്', 4], ['പേപ്പർ', 3], ['ഡ്രൈവ്', 3], ['പിഡിഎഫ് ആക്ക', 5]],
  'video-call': [['വീഡിയോ കോൾ', 5], ['വീഡിയോ', 3], ['കോൾ', 1]],
  'electricity-bill': [['കറന്റ് ബിൽ', 5], ['കറണ്ട് ബിൽ', 5], ['വൈദ്യുതി', 5], ['ബിൽ', 2]],
  'uber-cab': [['ഊബർ', 5], ['യൂബർ', 5], ['ടാക്സി', 3], ['കാബ്', 3], ['കാർ', 2]],
  'rapido-auto': [['റാപ്പിഡോ', 5], ['റാപിഡോ', 5], ['ഓട്ടോ', 4], ['ബൈക്ക്', 2]],
  'youtube-play': [['യൂട്യൂബ്', 5], ['ഭജൻ', 4], ['പാട്ട്', 3], ['കീർത്തനം', 3], ['സിനിമ', 2]],
  'swiggy-food': [['സ്വിഗ്ഗി', 5], ['സൊമാറ്റോ', 4], ['ഭക്ഷണം', 3], ['ഫുഡ്', 3], ['ഓർഡർ', 2]],
};
