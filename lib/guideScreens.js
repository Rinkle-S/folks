// A small shorthand for drawing practice screens that look like the real apps.
// Text shorthand: '*Title|sub|emoji|state' where
//   * = this is the thing to tap (becomes data-t="t"); ^ = shown as selected
//   state: on / off (a switch), or =text (text on the right).
// A screen is T(skin, ...blocks) when the learner taps something, N(skin, ...blocks) when they just read.
export const SK = {
  set: { brand: '#1a73e8', ink: '#ffffff', bg: '#f6f8fc', soft: '#e9eef6' },
  plain: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  dark: { brand: '#8ab4f8', ink: '#202124', bg: '#1f1f23', soft: '#2b2b2e', text: '#e8eaed', dark: true },
  home: { brand: '#1a73e8', bg: '#dfe9f5', soft: 'rgba(255,255,255,0.7)' },
  wa: { brand: '#128c7e', ink: '#ffffff', bg: '#ffffff', soft: '#e7f5f2' },
  gpay: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  pe: { brand: '#5f259f', ink: '#ffffff', bg: '#ffffff', soft: '#f1eaf8' },
  paytm: { brand: '#00b9f1', ink: '#ffffff', bg: '#f5fbff', soft: '#e3f4fc', text: '#002e6e' },
  sbi: { brand: '#2a5caa', ink: '#ffffff', bg: '#ffffff', soft: '#e8eef8' },
  icici: { brand: '#b02a30', ink: '#ffffff', bg: '#ffffff', soft: '#f8e8e9' },
  yt: { brand: '#cc0000', ink: '#ffffff', bg: '#ffffff', soft: '#f3f3f3' },
  uber: { brand: '#111111', ink: '#ffffff', bg: '#ffffff', soft: '#f1f1f1' },
  rapido: { brand: '#f9c800', ink: '#222222', bg: '#ffffff', soft: '#fff8d6' },
  swiggy: { brand: '#fc8019', ink: '#ffffff', bg: '#ffffff', soft: '#fff1e5' },
  blinkit: { brand: '#f8cb46', ink: '#222222', bg: '#ffffff', soft: '#fff9e0' },
  flip: { brand: '#2874f0', ink: '#ffffff', bg: '#ffffff', soft: '#eaf1fe' },
  irctc: { brand: '#213d77', ink: '#ffffff', bg: '#ffffff', soft: '#eef1f8' },
  maps: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  insta: { brand: '#c13584', ink: '#ffffff', bg: '#ffffff', soft: '#f9e8f2' },
  spot: { brand: '#1db954', ink: '#ffffff', bg: '#121212', soft: '#282828', text: '#ffffff', dark: true },
  gmail: { brand: '#d93025', ink: '#ffffff', bg: '#ffffff', soft: '#f6f8fc' },
  play: { brand: '#01875f', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  chrome: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
};

const parse = (s) => {
  const o = { id: undefined, on: false };
  if (typeof s !== 'string') return s;
  let str = s;
  while (str[0] === '*' || str[0] === '^') {
    if (str[0] === '*') o.id = 't';
    else o.sel = true;
    str = str.slice(1);
  }
  const [title, sub, e, st] = str.split('|');
  const r = { title, label: title };
  if (sub) r.sub = sub;
  if (e) r.e = e.startsWith('@') ? undefined : e;
  if (e && e.startsWith('@')) r.app = e.slice(1);
  if (o.id) r.id = o.id;
  if (o.sel) r.on = true;
  if (st === 'on') r.on = true;
  else if (st === 'off') r.on = false;
  else if (st && st[0] === '=') r.right = st.slice(1);
  return r;
};
const rowItem = (s) => {
  const r = parse(s);
  // For rows, `on` means a switch state only when given as on/off; "^" marks selection with a tick.
  return r;
};

export const B = (title, o = {}) => ({
  t: 'bar',
  tone: o.tone || 'brand',
  title,
  back: o.back !== false,
  backId: o.backT ? 't' : undefined,
  right: (o.right || []).map((x) => {
    const tgt = x[0] === '*';
    const e = tgt ? x.slice(1) : x;
    return { e, id: tgt ? 't' : undefined };
  }),
});
export const R = (items, sec) => ({ t: 'rows', title: sec, items: items.map((s) => {
  if (typeof s !== 'string') return s;
  const r = parse(s);
  if (s.replace(/^[*^]+/, '').split('|')[3] === undefined) {
    // plain row: a tick on the right when selected
    if (r.on) { r.right = '✓'; delete r.on; }
    else delete r.on;
  } else if (r.on === undefined) delete r.on;
  return r;
}) });
export const TL = (items) => ({ t: 'tiles', items: items.map((s) => { const r = parse(s); return { id: r.id, e: r.e, label: r.label, on: r.on }; }) });
export const G = (items) => ({ t: 'grid', items: items.map((s) => { const r = parse(s); return { id: r.id, e: r.e, app: r.app, label: r.label }; }) });
export const BT = (items, row) => ({ t: 'buttons', row, items: items.map((s, i) => { const r = parse(s); const ghost = /^ghost:/.test(r.title); const dang = /^danger:/.test(r.title); const label = r.title.replace(/^(ghost|danger|soft):/, ''); const tone = ghost ? 'ghost' : dang ? 'danger' : /^soft:/.test(r.title) ? 'soft' : i === 0 ? 'primary' : 'ghost'; return { id: r.id, label, tone, e: r.e }; }) });
export const NV = (items) => ({ t: 'nav', items: items.map((s) => { const r = parse(s); return { id: r.id, e: r.e, label: r.label, on: r.on }; }) });
export const CH = (items) => ({ t: 'chips', items: items.map((s) => { const r = parse(s); return { id: r.id, label: r.label, on: r.on }; }) });
export const F = (label, value, ph) => { const r = parse(label); return { t: 'field', id: r.id, label: r.title, value, ph }; };
export const H = (e, title, sub, tone, tgt) => ({ t: 'hero', e, title, sub, tone, id: tgt ? 't' : undefined });
export const X = (text, tone) => ({ t: 'text', text, tone });
export const SR = (text, o = {}) => ({ t: 'search', text: o.typed ? text : undefined, ph: o.typed ? undefined : text, mic: o.mic, id: o.t ? 't' : undefined });
export const DG = (title, body, actions) => ({ t: 'dialog', title, body, actions: actions.map((s, i) => { const r = parse(s); return { id: r.id || `x${i}`, label: r.title, tone: i === 0 && !r.id ? '' : '' }; }) });
export const TO = (text) => ({ t: 'toast', text });
export const GAP = (grow) => ({ t: 'gap', grow, h: 10 });
export const HD = (label) => ({ t: 'handle', id: 't', label });
export const ST = () => ({ t: 'status' });
export const KP = () => ({ t: 'keypad' });
export const DOTS = (n) => ({ t: 'dots', total: n || 4 });
export const CARDS = (items, title) => ({ t: 'cards', title, items: items.map((s) => { const r = parse(s); return { id: r.id, e: r.e, title: r.title, sub: r.sub, price: r.right }; }) });
export const VIEW = (e, top, extra = {}) => ({ t: 'view', e, top: (top || []).map((x) => { const tgt = x[0] === '*'; return { e: tgt ? x.slice(1) : x, id: tgt ? 't' : undefined }; }), ...extra });

export const T = (skin, ...blocks) => ({ tap: true, ui: { skin, blocks } });
export const N = (skin, ...blocks) => ({ tap: false, ui: { skin, blocks } });
// The phone's home screen with the apps people use. The '*' one is the app to open.
const HOME_APPS = ['Phone|📞', 'Messages|💬', 'Camera|📷', 'Gallery|🖼️', 'Settings|⚙️', 'Clock|⏰', 'Play Store|▶️', 'Photos|🌄', 'Gmail|✉️', 'Chrome|🌐', 'Google Pay|@gpay', 'WhatsApp|@whatsapp'];
export const HOME = (target, extra = []) => {
  const items = HOME_APPS.map((s) => (s.split('|')[0] === target ? '*' + s : s));
  if (!items.some((s) => s[0] === '*')) items.push('*' + target + '|📱');
  return { ...T(SK.home, ST(), ...extra, GAP(), G(items)), home: true };
};
