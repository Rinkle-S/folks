'use client';
// The prototype and the demo use one persona: Kamala Nair (63) and her son Rahul. A real user's own first name
// (Profile) and first trusted contact (Settings) replace them, on practice screens, lesson text and the voice.
// Nothing is stored here; with no name or contact saved, the demo persona is shown as written.
import { getProfile } from './profile';
import { getTrusted } from './trusted';

let memo = { key: '', rules: [] };

function rules() {
  let key = '';
  try {
    key = (localStorage.getItem('folks_profile') || '') + '|' + (localStorage.getItem('folks_trusted') || '');
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
