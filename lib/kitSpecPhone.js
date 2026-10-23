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
  'install-app': [
    K('and-home', 'open-play', { open: 'play' }),
    K('and-play', 'search', { view: 'home' }),
    K('and-play', 'result', { view: 'search', query: 'phonepe' }),
    K('and-play', 'install', { view: 'app' }),
    [I('and-play', { view: 'app', installing: true }), K('and-play', 'open', { view: 'app', installed: true })],
  ],
  bluetooth: [
    pull,
    [qs('qs-bluetooth', ['wifi', 'rotate']), K('and-page', 'device', { title: 'Bluetooth', sections: [{ items: [R(undefined, 'Use Bluetooth', undefined, { toggle: true })] }, { h: 'Available devices', items: [R('device', 'boAt Rockerz 255', 'Ready to pair', { icon: 'volume' }), R(undefined, 'JBL Go 3', 'Ready to pair', { icon: 'volume' })] }] })],
    I('and-page', { title: 'Bluetooth', sections: [{ items: [R(undefined, 'Use Bluetooth', undefined, { toggle: true })] }, { h: 'Connected', items: [R(undefined, 'boAt Rockerz 255', 'Connected · 80% battery', { icon: 'volume', color: '#0b57d0' })] }] }),
  ],
  'airplane-mode': [pull, qs('qs-airplane', ['wifi', 'rotate']), qs('qs-airplane', ['airplane', 'rotate'], 'Airplane mode is on. No calls or internet.')],
  'free-space': [
    [K('and-home', 'open-settings', { open: 'settings' }), K('and-settings', 'set-storage')],
    K('and-page', 'free', {
      title: 'Storage',
      items: [R(undefined, '74 GB used of 128 GB', '58% full', { icon: 'storage', color: '#7b1fa2' })],
      button: { t: 'free', label: 'Free up space' },
    }),
    I('and-page', { title: 'Free up space', items: [R(undefined, 'Videos', '2.1 GB', { icon: 'video', color: '#d93025' }), R(undefined, 'WhatsApp files', '1.4 GB', { icon: 'chats', color: '#1e8e3e' }), R(undefined, 'Photos', '3.0 GB', { icon: 'image', color: '#e8710a' }), R(undefined, 'Downloads', '0.6 GB', { icon: 'download', color: '#1a73e8' })] }),
    K('and-page', 'delete', { title: 'Downloads', items: [R(undefined, 'old-movie.mp4', '480 MB · 1 year ago', { icon: 'video' }), R(undefined, 'setup-file.apk', '120 MB · 8 months ago', { icon: 'file' })], button: { t: 'delete', label: 'Delete 600 MB' } }),
  ],
  'battery-saver': [
    [K('and-home', 'open-settings', { open: 'settings' }), K('and-settings', 'set-battery')],
    K('and-page', 'saver', { title: 'Battery', items: [R(undefined, '82%', 'About 1 day, 6 hours left', { icon: 'battery', color: '#188038' }), R('saver', 'Battery Saver', 'Off', { toggle: false }), R(undefined, 'Adaptive battery', 'On', { toggle: true }), R(undefined, 'Battery usage', 'Last 24 hours')] }),
    I('and-qs', { on: ['wifi', 'battery', 'rotate'], note: 'Slide the bright bar at the top to the left to make the screen dimmer.' }),
  ],
  'screen-lock': [
    [K('and-home', 'open-settings', { open: 'settings' }), K('and-settings', 'set-security')],
    K('and-page', 'lock', { title: 'Security & privacy', items: [R(undefined, 'Find My Device', 'On', { icon: 'location' }), R('lock', 'Screen lock', 'Swipe', { icon: 'lock' }), R(undefined, 'Fingerprint Unlock', 'Not set up', { icon: 'touch' })] }),
    [K('and-page', 'pin', { title: 'Choose a screen lock', items: [R(undefined, 'None', undefined, { radio: false }), R(undefined, 'Swipe', undefined, { radio: true }), R(undefined, 'Pattern', undefined, { radio: false }), R('pin', 'PIN', '4 or more numbers', { radio: false }), R(undefined, 'Password', undefined, { radio: false })] }), I('and-pin', { filled: 2 }), I('and-pin', { title: 'Re-enter your PIN', sub: 'Type the same PIN again', filled: 4 })],
    I('and-page', { title: 'Security & privacy', items: [R(undefined, 'Screen lock', 'PIN', { icon: 'lock', color: '#188038' })], toast: 'Do not use 1234 or your birth year' }),
  ],
  'uninstall-app': [
    K('and-home', 'hold', { hold: 'candy' }),
    K('and-home', 'uninstall', { hold: 'candy', menu: [{ t: 'info', icon: 'info', label: 'App info' }, { t: 'uninstall', icon: 'trash', label: 'Uninstall' }, { t: 'pause', icon: 'clock', label: 'Pause app' }] }),
    K('and-home', 'ok', { hold: 'candy' }, dialog('Candy Game', 'Do you want to uninstall this app?', [['cancel', 'Cancel'], ['ok', 'OK']])),
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
    I('and-gmail', { view: 'compose', to: 'rahul.sharma@gmail.com' }),
    I('and-gmail', { view: 'compose', to: 'rahul.sharma@gmail.com', subject: 'Dinner on Sunday', body: 'Beta, please come for dinner on Sunday at 8.' }),
    K('and-gmail', 'send', { view: 'compose', to: 'rahul.sharma@gmail.com', subject: 'Dinner on Sunday', body: 'Beta, please come for dinner on Sunday at 8.' }),
  ],
  'open-link-safe': [I('and-sms'), I('and-sms'), I('and-sms'), I('and-sms')],
};
