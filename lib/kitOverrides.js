// Realistic screens for the original hand-built lessons. Keyed by lesson id, then step id.
// Each entry swaps the step's drawn screen for a kit template (components/kit); the words stay the same.
import { K, I, dialog } from './kitSpec';

const R = (t, title, sub, extra = {}) => ({ t, title, sub, ...extra });
const SAMSUNG = (tap) => ({
  title: 'Settings',
  items: [
    R(tap, 'Connections', 'Wi-Fi · Bluetooth · Airplane mode', { icon: 'wifi', color: '#1a73e8' }),
    R(undefined, 'Connected devices', 'Quick Share · Android Auto', { icon: 'bluetooth', color: '#1e8e3e' }),
    R(undefined, 'Sounds and vibration', 'Sound mode · Ringtone', { icon: 'volume', color: '#7b1fa2' }),
    R(undefined, 'Notifications', 'Status bar · Do not disturb', { icon: 'bell', color: '#d93025' }),
    R(undefined, 'Display', 'Brightness · Dark mode', { icon: 'sun', color: '#188038' }),
    R(undefined, 'Battery', '82%', { icon: 'battery', color: '#188038' }),
  ],
});
const CONN = (tap, wifiSub = 'Off') => ({
  title: 'Connections',
  items: [
    R(tap === 'wifi-row' ? 'wifi-row' : undefined, 'Wi-Fi', wifiSub, { icon: 'wifi' }),
    R(undefined, 'Bluetooth', 'Off', { icon: 'bluetooth' }),
    R(undefined, 'Airplane mode', 'Off', { icon: 'plane' }),
    R(tap === 'hotspot-row' ? 'hotspot-row' : undefined, 'Mobile Hotspot and Tethering', 'Share your mobile data', { icon: 'wifi' }),
    R(undefined, 'Data usage', '4.2 GB used this month', { icon: 'gauge' }),
  ],
});
const HOTSPOT = (on) => ({
  title: 'Mobile Hotspot and Tethering',
  sections: [
    { items: [R(on ? undefined : 'hs-switch', 'Mobile Hotspot', on ? 'On · 1 device can connect' : 'Off', { toggle: !!on }), R(undefined, 'USB tethering', 'USB not connected', { toggle: false })] },
    ...(on ? [{ h: 'Share these with the person', items: [R(undefined, 'Network name', 'Kamala_Phone', { icon: 'wifi' }), R(undefined, 'Password', 'kamala4521', { icon: 'lock' })] }] : []),
  ],
});
const WIFI = (stage) => ({
  title: 'Wi-Fi',
  sections: [
    { items: [R(stage === 0 ? 'wifi-switch' : undefined, 'Wi-Fi', stage === 0 ? 'Off' : 'On', { toggle: stage > 0 })] },
    ...(stage > 0
      ? [
          {
            h: stage === 2 ? 'Current network' : 'Available networks',
            items:
              stage === 2
                ? [R(undefined, 'Sunrise_Home', 'Connected', { icon: 'wifi', color: '#0b57d0' })]
                : [R(stage === 1 ? 'net-home' : undefined, 'Sunrise_Home', 'Strong signal', { icon: 'wifi' }), R(undefined, 'Neighbour_5G', 'Secured', { icon: 'lock' }), R(undefined, 'JioFiber-2.4G', 'Secured', { icon: 'lock' })],
          },
        ]
      : []),
  ],
});
const home = (open) => K('and-home', `open-${open}`, { open });
const torchOn = ['wifi', 'rotate', 'torch'];
const MILK = [
  ['milk', '🥛', 'Amul Taaza Toned Milk', '500 ml', '₹29'],
  ['bread', '🍞', 'Harvest Gold Brown Bread', '400 g', '₹45'],
  ['curd', '🥣', 'Amul Masti Dahi', '400 g', '₹35'],
  ['paneer', '🧀', 'Fresh Paneer', '200 g', '₹90'],
];
const BAN = [
  ['banana', '🍌', 'Banana Robusta', '6 pcs', '₹60'],
  ['apple', '🍎', 'Shimla Apple', '4 pcs', '₹140'],
  ['papaya', '🥭', 'Papaya', '1 pc · 900 g', '₹55'],
  ['orange', '🍊', 'Nagpur Orange', '1 kg', '₹99'],
];
const BL_LINES = [
  ['🥛', 'Amul Taaza Toned Milk', '1', '₹29'],
  ['🍞', 'Harvest Gold Brown Bread', '1', '₹45'],
];
const BL_BILL = [
  ['Items total', '₹74'],
  ['Delivery charge', '₹25'],
  ['Handling charge', '₹4'],
  ['Grand total', '₹ ?'],
];
const BL_BILL2 = [...BL_BILL.slice(0, 3), ['Grand total', '₹103']];
const ZP_LINES = [['🍌', 'Banana Robusta (6 pcs)', '2', '₹120']];
const ZP_BILL = [
  ['Items total', '₹120'],
  ['Delivery fee', 'FREE'],
  ['Handling fee', '₹5'],
  ['Grand total', '₹ ?'],
];
const ZP_BILL2 = [...ZP_BILL.slice(0, 3), ['Grand total', '₹125']];
const SHARMA = { name: 'SUNRISE GENERAL STORE', initial: 'S', color: '#5f6368' };

export const KIT_OVERRIDES = {
  flashlight: {
    swipe: K('and-home', 'pull', { pull: true }),
    'flash-on': K('and-qs', 'qs-torch'),
    'flash-off': K('and-qs', 'qs-torch', { on: torchOn }),
    'switch-off': I('and-qs', { on: torchOn }),
  },
  hotspot: {
    'open-settings': home('settings'),
    connections: K('and-page', 'connections', SAMSUNG('connections')),
    'hotspot-row': K('and-page', 'hotspot-row', CONN('hotspot-row')),
    'hs-switch': K('and-page', 'hs-switch', HOTSPOT(false)),
    'hs-on': I('and-page', HOTSPOT(true)),
    password: I('and-page', HOTSPOT(true)),
  },
  selfie: {
    'open-camera': home('camera'),
    flip: K('and-camera', 'flip', { tap: 'flip' }),
    shutter: K('and-camera', 'shutter', { tap: 'shutter', front: true }),
    'see-photo': K('and-camera', 'thumb', { tap: 'thumb', front: true }),
    result: I('and-photo', { e: '🙂' }),
  },
  silent: {
    swipe: K('and-home', 'pull', { pull: true }),
    vibrate: K('and-qs', 'qs-sound', { sound: 'Sound' }),
    mute: K('and-qs', 'qs-sound', { sound: 'Vibrate' }),
    'sound-back': K('and-qs', 'qs-sound', { sound: 'Mute' }),
    back: I('and-qs', { sound: 'Sound' }),
  },
  'bigger-text': {
    'open-settings': home('settings'),
    display: K('and-settings', 'set-display'),
    font: K('and-page', 'font', { title: 'Display', items: [R(undefined, 'Brightness level', '60%', { icon: 'sun' }), R(undefined, 'Dark theme', 'Off', { toggle: false }), R('font', 'Font size and style', 'Small', { icon: 'text' }), R(undefined, 'Screen zoom', 'Default', { icon: 'search' })] }),
    biggest: K('and-font', 's4', { value: 0, tap: 3 }),
    result: I('and-font', { value: 3 }),
  },
  screenshot: {
    press: K('ir-ticket', 'both', {}, { side: 'both' }),
    'open-gallery': home('gallery'),
    shot: K('and-gallery', 'shot', { shot: true }),
    safety: I('and-photo', { e: '🎫', title: 'Screenshot · Just now' }),
  },
  wifi: {
    'open-settings': home('settings'),
    connections: K('and-page', 'connections', SAMSUNG('connections')),
    'wifi-row': K('and-page', 'wifi-row', CONN('wifi-row')),
    'wifi-on': K('and-page', 'wifi-switch', WIFI(0)),
    network: K('and-page', 'net-home', WIFI(1)),
    connect: K('and-page', 'connect', WIFI(1), dialog('Sunrise_Home', 'Password: ••••••••  (filled in for practice; in real life, type it from the back of your router)', [['cancel', 'Cancel'], ['connect', 'Connect']])),
    done: I('and-page', WIFI(2)),
  },
  'speaker-call': {
    speaker: K('and-call', 'speaker', { name: 'Sunita Didi', sub: 'Mobile', time: '00:12', tap: 'speaker' }),
    end: K('and-call', 'end', { name: 'Sunita Didi', sub: 'Mobile', time: '00:30', tap: 'end', speakerOn: true }),
    privacy: I('and-call', { name: 'SBI Bank', sub: 'Incoming call', time: '00:05' }),
  },
  'block-number': {
    'open-phone': home('phone'),
    number: K('and-recents', 'num-spam', { tap: true }),
    block: K('and-caller', 'block', { block: true }),
    confirm: K('and-caller', 'confirm', {}, dialog('Block +91 98xxx xx210?', 'Calls and messages from this number will be blocked.', [['cancel', 'Cancel'], ['confirm', 'Block', true]], { check: 'Report call as spam' })),
    done: I('and-caller', {}, { toast: '+91 98xxx xx210 is blocked' }),
  },
  'yono-balance': {
    mpin: I('bk-login-typed', { bank: 'sbi', n: 6 }),
    accounts: K('bk-home', 'tile-accounts', { bank: 'sbi', tap: 'accounts' }),
    balance: K('bk-account', 'balance', { bank: 'sbi', tap: 'balance' }),
    shown: I('bk-account', { bank: 'sbi', shown: true }),
    'mpin-call': I('bk-account', { bank: 'sbi', shown: true }),
  },
  'irctc-ticket': {
    login: K('ir-login-btn', 'login'),
    to: K('ir-search', 'to', { tap: 'to' }),
    station: K('ir-stations', 'mas'),
    search: K('ir-search', 'search', { to: 'CHENNAI CENTRAL - MAS', tap: 'search' }),
    train: K('ir-trains', 'train1'),
    book: K('ir-book', 'book'),
    berth: K('ir-passenger', 'lower'),
    pay: K('ir-pay', 'upi'),
    ticket: I('ir-ticket'),
    tatkal: I('ir-ticket'),
  },
  'irctc-pnr': {
    'pnr-tile': K('ir-home', 'pnr', { tap: 'pnr' }),
    check: K('ir-pnr', 'check'),
    result: I('ir-pnr', { result: true }),
  },
  'maps-directions': {
    search: K('mp-home', 'search', { search: true }),
    suggest: K('mp-search', 'sugg'),
    directions: K('mp-place-h', 'directions', { dir: true }),
    mode: K('mp-route', 'car', { car: true }),
    start: K('mp-route', 'start', { start: true }),
    nav: I('mp-navigate'),
    driving: I('mp-navigate'),
  },
  'maps-share-location': {
    dot: K('mp-share', 'dot', { dot: true }),
    share: K('mp-share', 'share', { share: true }),
    time: K('mp-share', 'hour', { hour: true }),
    person: K('mp-share', 'sunita', { person: true }),
    trust: I('mp-share', { person: true }),
  },
};

// Swap in the kit screens. Keeps the step's words, kind (tap / input / quiz / info) and other fields.
export function applyKitOverrides(LESSONS) {
  for (const [lid, steps] of Object.entries(KIT_OVERRIDES)) {
    const l = LESSONS[lid];
    if (!l) continue;
    l.steps = l.steps.map((s) => {
      const o = steps[s.id];
      if (!o) return s;
      const n = { ...s, screen: 'kit', kit: o.kit, p: o.p, ov: o.ov };
      delete n.ui;
      if (s.kind === 'tap' && o.target) n.target = o.target;
      return n;
    });
  }
}
