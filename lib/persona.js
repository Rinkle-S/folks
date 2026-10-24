'use client';
// The prototype and the demo use one persona: Kamala Nair (63) and her son Rahul. A real user's own first name
// (Profile) and first trusted contact (Settings) replace them, on practice screens, lesson text and the voice.
// Nothing is stored here; with no name or contact saved, the demo persona is shown as written.
import { getProfile } from './profile';
import { getTrusted } from './trusted';

let memo = { key: '', rules: [] };

// Practice names that suit the chosen language, when the person has not saved their own. English keeps the general
// Indian names as written (Kamala, Rahul, Sunita Didi, Ramesh Bhaiya, Pinky). Hindi drops the Kerala surname. Malayalam
// uses names and titles heard in Kerala. First letters are kept so the round avatars still match the names.
const REGION = {
  hi: [
    [/Kamala Nair|कमला नायर/g, 'Kamla Sharma'],
    [/Kamala/g, 'Kamla'],
  ],
  ml: [
    [/SUNITA SHARMA/g, 'SREEJA NAIR'],
    [/Sunita Didi|Sunita Chechi/g, 'Sreeja Chechi'],
    [/Sunita/g, 'Sreeja'],
    [/Ramesh Bhaiya|Ramesh Chettan/g, 'Rajan Chettan'],
    [/Ramesh/g, 'Rajan'],
    [/Pinky/g, 'Parvathy'],
    [/\(Beta\)/g, '(Mon)'],
  ],
};

function rules() {
  let key = '';
  try {
    key = (localStorage.getItem('folks_profile') || '') + '|' + (localStorage.getItem('folks_trusted') || '') + '|' + (localStorage.getItem('folks_lang') || '');
  } catch {}
  if (key === memo.key) return memo.rules;
  const r = [];
  const name = (getProfile().name || '').trim();
  const kid = ((getTrusted()[0] || {}).name || '').trim();
  if (name) {
    const first = name.split(/\s+/)[0];
    r.push([/Kamala Nair|कमला नायर/g, name], [/Kamala/g, first]);
  }
  if (kid) {
    const slug = kid.toLowerCase().replace(/[^a-z]/g, '') || 'family';
    r.push(
      [/(?:[Yy]our|[Mm]y) son Rahul|(?:आपके|अपने) बेटे राहुल|മകൻ (?:Rahul|രാഹുൽ)/g, kid],
      [/Rahul|राहुल|രാഹുൽ/g, kid],
      [/rahul/g, slug]
    );
  }
  let lang = '';
  try {
    lang = localStorage.getItem('folks_lang') || '';
  } catch {}
  if (REGION[lang]) r.push(...REGION[lang]);
  memo = { key, rules: r };
  return r;
}

export function personalise(text) {
  if (typeof text !== 'string') return text;
  const r = rules();
  if (!r.length) return text;
  let s = text;
  for (const [re, to] of r) s = s.replace(re, to);
  return s;
}

// Keeps the visible text of a screen personalised, including text React draws later.
export function watchPersona(root) {
  const fix = () => {
    if (!rules().length) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      const v = n.nodeValue;
      const p = personalise(v);
      if (p !== v) n.nodeValue = p;
    }
  };
  fix();
  const mo = new MutationObserver(fix);
  mo.observe(root, { childList: true, subtree: true, characterData: true });
  return () => mo.disconnect();
}
