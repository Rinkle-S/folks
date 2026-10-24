import { K, I, menu, sheet, dialog } from './kitSpec';

const R = (t, title, sub, extra = {}) => ({ t, title, sub, ...extra });
const SOUND = (pick) => ({
  title: 'Sound & vibration',
  items: [
    R(undefined, 'Media volume', '70%', { icon: 'volume' }),
    R(undefined, 'Call volume', '60%', { icon: 'phone' }),
    R(undefined, 'Ring & notification volume', '80%', { icon: 'bell' }),
    R(undefined, 'Do Not Disturb', 'Off', { icon: 'dnd' }),
    R(pick ? 'ringtone' : undefined, 'Phone ringtone', 'Over the Horizon', { icon: 'phone' }),
    R(undefined, 'Default notification sound', 'Pixie Dust', { icon: 'bell' }),
  ],
});
const TONES = (sel) => ({
  title: 'Phone ringtone',
  items: ['None', 'Over the Horizon', 'Bubbles', 'Chimes', 'Dewdrops', 'Flutey Phone', 'Piano'].map((n) => R(n === 'Chimes' && !sel ? 'tone' : undefined, n, undefined, { radio: sel ? n === 'Chimes' : n === 'Over the Horizon' })),
});
const qs = (t, on, note) => K('and-qs', t, { on, note });
const pull = K('and-home', 'pull', { pull: true });

export const KIT_PHONE = {
  ringtone: [
    K('and-home', 'open-settings', { open: 'settings' }),
    K('and-settings', 'set-sound'),
    K('and-page', 'ringtone', SOUND(true)),
    K('and-page', 'tone', TONES(false)),
    K('and-page', 'back', { ...TONES(true), toast: 'Ringtone set to Chimes' }),
  ],
  alarm: [
    K('and-home', 'open-clock', { open: 'clock' }),
    K('and-clock', 'tab-alarm', { tab: 'clock' }),
    K('and-clock', 'fab', { tab: 'alarm', fab: true, alarms: [{ time: '7:00 AM', days: 'Sun', on: false }] }),
    I('and-clock', { tab: 'alarm', picker: 'view' }),
    K('and-clock', 'ok', { tab: 'alarm', picker: 'ok' }),
  ],
  'save-contact': [
    K('and-home', 'open-phone', { open: 'phone', apps: ['whatsapp', 'gpay', 'youtube'] }),
    [K('and-contacts', 'tab-contacts', { tab: 'recents' }), K('and-contacts', 'create', { tab: 'contacts', fab: true })],
    I('and-contact-form', { name: 'Ramesh', phone: '98765 43210' }),
    K('and-contact-form', 'save', { name: 'Ramesh', phone: '98765 43210' }),
  ],
  wallpaper: [
    K('and-home', 'hold-empty', { holdEmpty: true }),
    K('and-home', 'wallpaper', {
      menu: [
        { t: 'wallpaper', icon: 'palette2', label: 'Wallpaper & style' },
        { t: 'widgets', icon: 'grid', label: 'Widgets' },
        { t: 'home-settings', icon: 'gear', label: 'Home settings' },
      ],
    }),
    K('and-page', 'my-photos', {
      title: 'Wallpaper & style',
      items: [R('my-photos', 'My photos', 'Pick from your Gallery', { icon: 'image', color: '#e8710a' }), R(undefined, 'Wallpapers', 'Landscapes, art, colours', { icon: 'palette2', color: '#1a73e8' }), R(undefined, 'Colours', 'Wallpaper colours', { icon: 'sun', color: '#f9ab00' })],
    }),
    [
      K('and-gallery', 'photo'),
      K('and-wall', 'set'),
      K('and-wall', 'home', {}, sheet('Set wallpaper on', [['home', 'Home screen', 'smartphone'], ['lock', 'Lock screen', 'lock'], ['both', 'Home and lock screens', 'layers']])),
    ],
  ],
  'play-explore': [
    K('and-home', 'open-play', { open: 'play' }),
    I('and-play', { view: 'home' }),
    K('and-play', 'tab-charts', { view: 'home' }),
    I('and-play', { view: 'charts' }),
    K('and-play', 'search', { view: 'charts' }),
  ],
  'install-app': [
    K('and-home', 'open-play', { open: 'play' }),
    K('and-play', 'search', { view: 'home' }),
    I('and-play', { view: 'search', query: 'phonepe' }),
    K('and-play', 'result', { view: 'search', query: 'phonepe' }),
    I('and-play', { view: 'app' }),
    K('and-play', 'install', { view: 'app' }),
    I('and-play', { view: 'app', installing: true }),
    K('and-play', 'open', { view: 'app', installed: true }),
  ],
  'play-update-apps': [
    K('and-home', 'open-play', { open: 'play' }),
    K('and-play', 'profile', { view: 'home' }),
    K('and-play', 'manage', { view: 'home' }, sheet(undefined, [['manage', 'Manage apps & device', 'apps'], [undefined, 'Payments & subscriptions', 'card'], [undefined, 'Play Protect', 'shieldCheck'], [undefined, 'Settings', 'gear']])),
    K('and-play', 'update-all', { view: 'manage' }),
    I('and-play', { view: 'manage', updating: true }),
  ],
  'icon-meanings': [
    I('icon-board', {}),
    K('icon-board', 'search'),
    K('icon-board', 'back'),
    K('icon-board', 'home'),
    K('icon-board', 'share'),
    K('icon-board', 'settings'),
    K('icon-board', 'menu'),
    K('icon-board', 'more'),
    K('icon-board', 'camera'),
    K('icon-board', 'mic'),
    I('icon-same', { icon: 'search', what: 'Search' }),
  ],
  'uninstall-app': [
    K('and-home', 'hold', { hold: 'candy' }),
    K('and-home', 'uninstall', { hold: 'candy', menu: [{ t: 'info', icon: 'info', label: 'App info' }, { t: 'uninstall', icon: 'trash', label: 'Uninstall' }, { t: 'pause', icon: 'clock', label: 'Pause app' }] }),
    K('and-home', 'ok', { hold: 'candy' }, dialog('Candy Game', 'Do you want to uninstall this app?', [['cancel', 'Cancel'], ['ok', 'OK']])),
  ],
  bluetooth: [
    pull,
    [qs('qs-bluetooth', []), I('and-qs', { on: ['bluetooth'], note: 'Bluetooth is on' })],
    [K('and-page', 'device', { title: 'Bluetooth', items: [R(undefined, 'Use Bluetooth', undefined, { toggle: true }), R('device', 'My earphones', 'Tap to connect', { icon: 'bluetooth' })] }), I('and-page', { title: 'Bluetooth', toast: 'Connected to My earphones', items: [R(undefined, 'Use Bluetooth', undefined, { toggle: true }), R(undefined, 'My earphones', 'Connected', { icon: 'bluetooth' })] })],
  ],
  'airplane-mode': [
    pull,
    [qs('qs-airplane', []), I('and-qs', { on: ['airplane'], note: 'Airplane mode is on. Calls and internet stop.' })],
    [qs('qs-airplane', ['airplane']), I('and-qs', { on: [], note: 'Airplane mode is off' })],
  ],
  'free-space': [
    K('and-settings', 'set-storage'),
    K('and-page', 'free', { title: 'Storage', items: [R(undefined, 'Used', '58% · 54 GB free', { icon: 'storage' }), R('free', 'Free up space', 'Remove files you do not need', { icon: 'storage' })] }),
    I('and-page', { title: 'Free up space', items: [R(undefined, 'Videos', '4.1 GB', { icon: 'video' }), R(undefined, 'WhatsApp files', '2.6 GB', { icon: 'chats' }), R(undefined, 'Old photos', '1.8 GB', { icon: 'image' })] }),
    [K('and-page', 'delete', { title: 'Free up space', items: [R(undefined, 'Videos', '4.1 GB', { icon: 'video' }), R('delete', 'Delete selected', 'Only what you chose', { icon: 'trash' })] }), I('and-page', { title: 'Storage', toast: 'Freed up 4.1 GB', items: [R(undefined, 'Used', '47% · 58 GB free', { icon: 'storage' })] })],
  ],
  'battery-saver': [
    K('and-settings', 'set-battery'),
    [K('and-page', 'saver', { title: 'Battery', items: [R(undefined, 'Battery usage', '82%', { icon: 'battery' }), R('saver', 'Battery Saver', 'Off', { icon: 'battery', toggle: false })] }), I('and-page', { title: 'Battery', toast: 'Battery Saver is on', items: [R(undefined, 'Battery usage', '82%', { icon: 'battery' }), R(undefined, 'Battery Saver', 'On', { icon: 'battery', toggle: true })] })],
    [pull, K('and-qs', 'qs-bright', { bright: 90, brightTap: true }), I('and-qs', { bright: 30, note: 'Brightness is lower now' })],
  ],
  'screen-lock': [
    K('and-settings', 'set-security'),
    K('and-page', 'screen-lock', { title: 'Security & privacy', items: [R('screen-lock', 'Screen lock', 'None', { icon: 'lock' }), R(undefined, 'Find My Device', 'On', { icon: 'location' })] }),
    K('and-page', 'pin', { title: 'Screen lock', items: [R(undefined, 'None', undefined, { icon: 'close' }), R('pin', 'PIN', 'At least 4 digits', { icon: 'lock' }), R(undefined, 'Pattern', undefined, { icon: 'grid' })] }),
    I('and-page', { title: 'Choose your PIN', items: [R(undefined, 'Type a number you will remember', 'Not 1234 or your birth year', { icon: 'lock' })] }),
  ],
  'do-not-disturb': [
    pull,
    qs('qs-dnd', ['wifi', 'rotate']),
    K('and-page', 'people', { title: 'Do Not Disturb', items: [R(undefined, 'Use Do Not Disturb', undefined, { toggle: true }), R('people', 'People', 'Calls from starred contacts', { icon: 'contacts' }), R(undefined, 'Apps', 'Alarms are always allowed', { icon: 'apps' }), R(undefined, 'Schedules', 'Sleeping', { icon: 'clock' })] }),
  ],
  'emergency-sos': [
    K('and-contacts', 'call', { tab: 'keypad', number: '112' }),
    I('and-page', { title: 'Emergency SOS', items: [R(undefined, 'Use Emergency SOS', 'Press the power button 5 times or more', { toggle: true }), R(undefined, 'Emergency number', '112', { icon: 'phone' }), R(undefined, 'Share info with emergency contacts', 'Location and SOS alert', { toggle: true })] }),
    K('and-page', 'contacts', { title: 'Safety & emergency', items: [R(undefined, 'Medical information', 'Add blood group, allergies', { icon: 'info' }), R('contacts', 'Emergency contacts', 'Add a family member', { icon: 'contacts' }), R(undefined, 'Emergency SOS', 'On', { icon: 'sos' })] }),
  ],
  'gmail-send': [
    [K('and-home', 'open-gmail', { open: 'gmail' }), K('and-gmail', 'compose')],
    I('and-gmail', { view: 'compose', to: 'rahul.nair@gmail.com' }),
    I('and-gmail', { view: 'compose', to: 'rahul.nair@gmail.com', subject: 'Dinner on Sunday', body: 'Beta, please come for dinner on Sunday at 8.' }),
    K('and-gmail', 'send', { view: 'compose', to: 'rahul.nair@gmail.com', subject: 'Dinner on Sunday', body: 'Beta, please come for dinner on Sunday at 8.' }),
  ],
  'open-link-safe': [I('and-sms'), I('and-sms'), I('and-sms'), I('and-sms')],
};
