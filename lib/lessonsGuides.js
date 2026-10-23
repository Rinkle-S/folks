// Practice lessons made from the quick guides (lib/guides). Every guide becomes a lesson with fake screens:
// a step that names a button ("Tap "Save"") becomes a tap step where that button sits among a few others;
// other steps show a short picture card. The words spoken and shown are the guide's own steps, so editing
// a guide edits its lesson too. Lesson id = "gd-" + guide id.
import { tr } from './guide';
import { GUIDE_LIST } from './guides/index';
import { SPEC_PHONE } from './guideScreensPhone';
import { SPEC_WA } from './guideScreensWa';
import { SPEC_MONEY } from './guideScreensMoney';
import { SPEC_APPS } from './guideScreensApps';

const SPEC = { ...SPEC_PHONE, ...SPEC_WA, ...SPEC_MONEY, ...SPEC_APPS };

const SKINS = {
  gpay: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  phonepe: { brand: '#5f259f', ink: '#ffffff', bg: '#ffffff', soft: '#f1eaf8' },
  paytm: { brand: '#00b9f1', ink: '#ffffff', bg: '#f5fbff', soft: '#e3f4fc', text: '#002e6e' },
  whatsapp: { brand: '#128c7e', ink: '#ffffff', bg: '#ffffff', soft: '#e7f5f2' },
  youtube: { brand: '#cc0000', ink: '#ffffff', bg: '#ffffff', soft: '#f3f3f3' },
  uber: { brand: '#111111', ink: '#ffffff', bg: '#ffffff', soft: '#f1f1f1' },
  rapido: { brand: '#f9c800', ink: '#222222', bg: '#ffffff', soft: '#fff8d6' },
  swiggy: { brand: '#fc8019', ink: '#ffffff', bg: '#ffffff', soft: '#fff1e5' },
  blinkit: { brand: '#f8cb46', ink: '#222222', bg: '#ffffff', soft: '#fff9e0' },
  flipkart: { brand: '#2874f0', ink: '#ffffff', bg: '#ffffff', soft: '#eaf1fe' },
  instagram: { brand: '#c13584', ink: '#ffffff', bg: '#ffffff', soft: '#f9e8f2' },
  spotify: { brand: '#1db954', ink: '#ffffff', bg: '#ffffff', soft: '#e6f8ec' },
  yono: { brand: '#2a5caa', ink: '#ffffff', bg: '#ffffff', soft: '#e8eef8' },
  icici: { brand: '#b02a30', ink: '#ffffff', bg: '#ffffff', soft: '#f8e8e9' },
  irctc: { brand: '#213d77', ink: '#ffffff', bg: '#ffffff', soft: '#eef1f8' },
  maps: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  phone: { brand: '#1a73e8', ink: '#ffffff', bg: '#f6f8fc', soft: '#e9eef6' },
};
const EMOJI = { gpay: '💸', phonepe: '💜', paytm: '💙', whatsapp: '💬', youtube: '▶️', uber: '🚕', rapido: '🛵', swiggy: '🍔', blinkit: '🛒', flipkart: '📦', instagram: '📸', spotify: '🎵', yono: '🏦', icici: '🏦', irctc: '🚆', maps: '🗺️', phone: '📱' };
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
    const spec = SPEC[guide.id] && SPEC[guide.id][i];
    if (spec) {
      const parts = Array.isArray(spec) ? spec : [spec];
      parts.forEach((sp, j) => {
        const id = parts.length > 1 ? `s${i}-${j}` : `s${i}`;
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
      screen: 'gen',
      kind: 'info',
      ui: { skin: SKINS[guide.app] || SKINS.phone, blocks: [{ t: 'hero', tone: 'bad', e: '⚠️', title: 'Be careful' }] },
      say: tr(guide.caution.en, guide.caution.hi, guide.caution.ml),
      button: NEXT,
    });
  }
  steps.push({
    id: 'done',
    screen: 'gen',
    kind: 'info',
    ui: { skin: SKINS[guide.app] || SKINS.phone, blocks: [{ t: 'hero', tone: 'good', e: '🎉', title: 'Well done' }] },
    say: tr('Well done! Now you can try it on your real phone. Go slowly, and ask family to sit next to you the first time.', 'शाबाश! अब इसे अपने असली फ़ोन पर आज़माइए। आराम से कीजिए, और पहली बार परिवार में किसी को पास बिठा लीजिए।', 'കൊള്ളാം! ഇനി നിങ്ങളുടെ യഥാർത്ഥ ഫോണിൽ ശ്രമിക്കൂ. സാവധാനം ചെയ്യൂ, ആദ്യ തവണ വീട്ടിൽ ആരെയെങ്കിലും അടുത്തിരുത്തൂ.'),
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
    share: tr(`I learned this with Folks: ${guide.title.en} ${EMOJI[guide.app] || '📱'}`, `मैंने Folks से यह सीखा: ${guide.title.hi} ${EMOJI[guide.app] || '📱'}`, `ഞാൻ Folks കൊണ്ട് ഇത് പഠിച്ചു: ${guide.title.ml} ${EMOJI[guide.app] || '📱'}`),
    realTry: tr('Try it once on your real phone. Go slowly, and ask family to sit next to you the first time.', 'इसे एक बार अपने असली फ़ोन पर आज़माइए। आराम से कीजिए, और पहली बार परिवार में किसी को पास बिठा लीजिए।', 'ഇത് ഒരു തവണ നിങ്ങളുടെ യഥാർത്ഥ ഫോണിൽ ശ്രമിക്കൂ. സാവധാനം ചെയ്യൂ, ആദ്യ തവണ വീട്ടിൽ ആരെയെങ്കിലും അടുത്തിരുത്തൂ.'),
    steps,
  };
}

export const GUIDE_LESSONS = Object.fromEntries(GUIDE_LIST.map((g) => [`gd-${g.id}`, build(g)]));
