// Small helpers for writing lessons as data. A lesson is a list of steps; each step names the
// practice screen (built from blocks, see components/screens/Gen.js) and the piece to tap.
// Text is tr(english, hindi, malayalam).
export const tr = (en, hi, ml) => ({ en, hi, ml });

const START = tr('Start', 'शुरू करें', 'തുടങ്ങാം');

export const intro = (say) => ({ id: 'intro', screen: 'intro', kind: 'info', say, button: START });

// A tap step. ui = { skin?, blocks: [...] }, target = the data-t of the piece to tap.
export const tap = (id, target, ui, say, hint) => ({ id, screen: 'gen', kind: 'tap', target, ui, say, hint });

// A step with only words and a button (nothing to tap).
export const note = (id, ui, say, button) => ({ id, screen: 'gen', kind: 'info', ui, say, button: button || tr('Next', 'आगे', 'അടുത്തത്') });

// Type digits on a keypad. The screen needs a { t: 'keypad' } block.
export const input = (id, field, expected, ui, say, hint) => ({ id, screen: 'gen', kind: 'input', field, expected, ui, say, hint });

export const opt = (text, correct, why) => ({ text, correct, why });
export const quiz = (id, ui, say, options) => ({ id, screen: 'gen', kind: 'quiz', ui, say, options });

// Skins
export const SKIN = {
  android: { brand: '#1a73e8', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f4' },
  settings: { brand: '#1a73e8', ink: '#ffffff', bg: '#f6f8fc', soft: '#e9eef6' },
  dark: { brand: '#8ab4f8', ink: '#202124', bg: '#1f1f23', soft: '#2b2b2e', text: '#e8eaed', dark: true },
};

// The phone's own home screen with a few system apps, for lessons that start from it.
export const homeScreen = (extra = []) => ({
  skin: { brand: '#1a73e8', bg: '#dfe9f5', soft: 'rgba(255,255,255,0.7)' },
  blocks: [
    { t: 'status' },
    ...extra,
    { t: 'gap', h: 18 },
    {
      t: 'grid',
      items: [
        { id: 'app-phone', e: '📞', label: 'Phone' },
        { id: 'app-messages', e: '💬', label: 'Messages' },
        { id: 'app-camera', e: '📷', label: 'Camera' },
        { id: 'app-gallery', e: '🖼️', label: 'Gallery' },
        { id: 'app-settings', e: '⚙️', label: 'Settings' },
        { id: 'app-clock', e: '⏰', label: 'Clock' },
        { id: 'app-gpay', app: 'gpay', label: 'Google Pay' },
        { id: 'app-whatsapp', app: 'whatsapp', label: 'WhatsApp' },
      ],
    },
  ],
});

// The top of the Settings app.
export const settingsRoot = () => ({
  skin: SKIN.settings,
  blocks: [
    { t: 'bar', title: 'Settings', right: [{ icon: 'search' }] },
    {
      t: 'rows',
      items: [
        { id: 'connections', e: '📶', title: 'Connections', sub: 'Wi-Fi, Bluetooth, Airplane mode' },
        { id: 'sounds', e: '🔔', title: 'Sounds and vibration', sub: 'Ringtone, volume' },
        { id: 'notifications', e: '🔕', title: 'Notifications', sub: 'Status bar, Do not disturb' },
        { id: 'display', e: '☀️', title: 'Display', sub: 'Brightness, text size' },
        { id: 'battery', e: '🔋', title: 'Battery', sub: 'Power saving' },
        { id: 'apps', e: '🧩', title: 'Apps', sub: 'Default apps, permissions' },
      ],
    },
  ],
});

export const quickPanel = ({ flash = false, sound = 'Sound', wifi = true, hotspot = false } = {}) => ({
  skin: SKIN.dark,
  blocks: [
    { t: 'status' },
    { t: 'text', text: 'Quick settings', tone: 'big' },
    {
      t: 'tiles',
      items: [
        { id: 'wifi', e: '📶', label: 'Wi-Fi', on: wifi },
        { id: 'bluetooth', e: '🔷', label: 'Bluetooth' },
        { id: 'flash', e: '🔦', label: 'Flashlight', on: flash },
        { id: 'sound', e: sound === 'Mute' ? '🔕' : sound === 'Vibrate' ? '📳' : '🔔', label: sound, on: sound !== 'Sound' },
        { id: 'airplane', e: '✈️', label: 'Airplane mode' },
        { id: 'hotspot', e: '📡', label: 'Mobile hotspot', on: hotspot },
        { id: 'rotate', e: '🔄', label: 'Auto rotate' },
        { id: 'saver', e: '🔋', label: 'Battery saver' },
        { id: 'location', e: '📍', label: 'Location', on: true },
      ],
    },
  ],
});
