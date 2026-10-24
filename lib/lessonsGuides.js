// Practice lessons made from the quick guides (lib/guides). Every guide becomes a lesson with fake screens:
// a step that names a button ("Tap "Save"") becomes a tap step where that button sits among a few others;
// other steps show a short picture card. The words spoken and shown are the guide's own steps, so editing
// a guide edits its lesson too. Lesson id = "gd-" + guide id.
import { tr } from './guide';
import { closingFor } from './closing';
import { GUIDE_LIST } from './guides/index';
import { GUIDE_ONLY } from './hidden';

import { KIT_PHONE } from './kitSpecPhone';
import { KIT_WA } from './kitSpecWa';
import { KIT_MONEY } from './kitSpecMoney';
import { KIT_APPS } from './kitSpecApps';

const SPEC = {};
// Realistic screens (components/kit) win over the older drawn ones.
const KITS = { ...KIT_PHONE, ...KIT_WA, ...KIT_MONEY, ...KIT_APPS };

const SKINS = {
  gpay: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  phonepe: { brand: '#5f259f', ink: '#ffffff', bg: '#ffffff', soft: '#f1eaf8' },
  whatsapp: { brand: '#128c7e', ink: '#ffffff', bg: '#ffffff', soft: '#e7f5f2' },
  uber: { brand: '#111111', ink: '#ffffff', bg: '#ffffff', soft: '#f1f1f1' },
  rapido: { brand: '#f9c800', ink: '#222222', bg: '#ffffff', soft: '#fff8d6' },
  yono: { brand: '#2a5caa', ink: '#ffffff', bg: '#ffffff', soft: '#e8eef8' },
  irctc: { brand: '#213d77', ink: '#ffffff', bg: '#ffffff', soft: '#eef1f8' },
  maps: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  playstore: { brand: '#01875f', ink: '#ffffff', bg: '#ffffff', soft: '#e2f4ee' },
  phone: { brand: '#1a73e8', ink: '#ffffff', bg: '#f6f8fc', soft: '#e9eef6' },
};
const EMOJI = { gpay: '💸', phonepe: '💜', whatsapp: '💬', uber: '🚕', rapido: '🛵', yono: '🏦', irctc: '🚆', maps: '🗺️', playstore: '🛍️', phone: '📱' };
const FILLER = ['More options', 'Help', 'Settings', 'Back'];
const TAP_VERB = /^(open|tap|press|choose|select|turn on|switch on|touch|click|long.?press)/i;

const label = (s) => {
  const m = s.en.match(/"([^"]+)"/);
  return m ? m[1] : null;
};

function screenFor(guide, step, i, labels) {
  const skin = SKINS[guide.app] || SKINS.phone;
  const bar = { t: 'bar', tone: 'brand', title: guide.appName, back: true };
  const target = TAP_VERB.test(step.en) ? label(step) : null;
  if (!target) {
    const text = step.en.length > 80 ? step.en.slice(0, 77) + '...' : step.en;
    return { tap: false, ui: { skin, blocks: [bar, { t: 'hero', e: '📱', title: text }] } };
  }
  const decoys = [...labels.filter((l) => l !== target), ...FILLER].filter((l, k, a) => a.indexOf(l) === k && l !== target).slice(0, 2);
  if (/^open/i.test(step.en)) {
    const tiles = decoys.map((d) => ({ e: '🔲', label: d }));
    tiles.splice(i % 3, 0, guide.app !== 'phone' ? { id: 't', app: guide.app, label: target } : { id: 't', e: '📱', label: target });
    return { tap: true, ui: { skin, blocks: [{ t: 'status' }, { t: 'gap', h: 18 }, { t: 'grid', items: tiles }] } };
  }
  if (/button|"\+"/i.test(step.en) || target.length <= 2) {
    return { tap: true, ui: { skin, blocks: [bar, { t: 'gap', grow: true }, { t: 'buttons', items: [{ id: 't', label: target }, { label: decoys[0] }] }] } };
  }
  const rows = decoys.map((d) => ({ title: d }));
  rows.splice(i % 3, 0, { id: 't', title: target });
  return { tap: true, ui: { skin, blocks: [bar, { t: 'rows', items: rows }] } };
}

const NEXT = tr('Next', 'आगे', 'അടുത്തത്');

function build(guide) {
  const labels = guide.steps.map(label).filter(Boolean);
  const steps = [
    {
      id: 'intro',
      screen: 'intro',
      kind: 'info',
      say: tr(
        `Let's practise: ${guide.title.en}. This is only practice, nothing real happens.`,
        `चलिए अभ्यास करें: ${guide.title.hi}। यह सिर्फ़ अभ्यास है, कुछ असली नहीं होगा।`,
        `നമുക്ക് പരിശീലിക്കാം: ${guide.title.ml}. ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥത്തിൽ ഒന്നും നടക്കില്ല.`
      ),
      button: tr('Start', 'शुरू करें', 'തുടങ്ങാം'),
    },
  ];
  guide.steps.forEach((st, i) => {
    const say = tr(st.en, st.hi, st.ml);
    const l = label(st);
    const spec = (KITS[guide.id] && KITS[guide.id][i]) || (SPEC[guide.id] && SPEC[guide.id][i]);
    if (spec) {
      const parts = Array.isArray(spec) ? spec : [spec];
      parts.forEach((sp, j) => {
        const id = parts.length > 1 ? `s${i}-${j}` : `s${i}`;
        if (sp.kit) {
          const hint = l && j === 0 ? tr(`Tap "${l}".`, `"${l}" दबाइए।`, `"${l}" അമർത്തൂ.`) : say;
          if (sp.tap) steps.push({ id, screen: 'kit', kit: sp.kit, p: sp.p, ov: sp.ov, kind: 'tap', target: sp.target, say, hint });
          else steps.push({ id, screen: 'kit', kit: sp.kit, p: sp.p, ov: sp.ov, kind: 'info', say, button: NEXT });
          return;
        }
        if (sp.tap) {
          const hint = l && j === 0 ? tr(`Tap "${l}".`, `"${l}" दबाइए।`, `"${l}" അമർത്തൂ.`) : say;
          steps.push({ id, openApp: !!sp.home && i === 0 && j === 0 && guide.app !== 'phone', screen: 'gen', kind: 'tap', target: 't', ui: sp.ui, say, hint });
        } else {
          steps.push({ id, screen: 'gen', kind: 'info', ui: sp.ui, say, button: NEXT });
        }
      });
      return;
    }
    const sc = screenFor(guide, st, i, labels);
    if (sc.tap) {
      steps.push({ id: `s${i}`, openApp: i === 0 && /^open/i.test(st.en) && guide.app !== 'phone', screen: 'gen', kind: 'tap', target: 't', ui: sc.ui, say, hint: tr(`Tap "${l}".`, `"${l}" दबाइए।`, `"${l}" അമർത്തൂ.`) });
    } else {
      steps.push({ id: `s${i}`, screen: 'gen', kind: 'info', ui: sc.ui, say, button: NEXT });
    }
  });
  if (guide.caution) {
    steps.push({
      id: 'careful',
      kind: 'info',
      screen: 'kit',
      kit: 'done',
      p: { warn: true, title: 'Be careful', sub: 'Listen to the tip below.' },
      say: tr(guide.caution.en, guide.caution.hi, guide.caution.ml),
      button: NEXT,
    });
  }
  const closing = closingFor(guide);
  steps.push({
    id: 'done',
    kind: 'info',
    screen: 'kit',
    kit: 'done',
    p: { title: 'Well done', sub: 'Now try it once on your real phone.' },
    say: closing.done,
    button: tr('Finish', 'पूरा करें', 'തീർന്നു'),
  });
  const id = `gd-${guide.id}`;
  return {
    id,
    icon: 'list',
    emoji: EMOJI[guide.app] || '📱',
    app: guide.app,
    appName: guide.appName,
    minutes: Math.max(2, Math.ceil(guide.steps.length / 2)),
    title: guide.title,
    takeaways: {
      en: [guide.title.en, 'Go slowly, one step at a time', 'If you are unsure, ask family before you tap'],
      hi: [guide.title.hi, 'आराम से, एक-एक कदम', 'अगर पक्का नहीं हैं, तो दबाने से पहले परिवार से पूछिए'],
      ml: [guide.title.ml, 'സാവധാനം, ഓരോ ഘട്ടമായി', 'ഉറപ്പില്ലെങ്കിൽ അമർത്തുന്നതിന് മുമ്പ് വീട്ടിൽ ചോദിക്കൂ'],
    },
    share: tr(`I learned this with Nook: ${guide.title.en} ${EMOJI[guide.app] || '📱'}`, `मैंने Nook से यह सीखा: ${guide.title.hi} ${EMOJI[guide.app] || '📱'}`, `ഞാൻ Nook കൊണ്ട് ഇത് പഠിച്ചു: ${guide.title.ml} ${EMOJI[guide.app] || '📱'}`),
    realTry: closing.real,
    steps,
  };
}

export const GUIDE_LESSONS = Object.fromEntries(GUIDE_LIST.filter((g) => !GUIDE_ONLY.has(g.id)).map((g) => [`gd-${g.id}`, build(g)]));
