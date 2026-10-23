// Lesson levels. Never shown to anyone: a level only decides the ORDER lessons are offered in, so nobody feels graded.
// 1 = gentle first steps, 2 = everyday apps, 3 = money, bookings and other careful tasks.
// A lesson not listed gets the default for its app below.
const L1 = ['flashlight', 'selfie', 'silent', 'bigger-text', 'screenshot', 'speaker-call', 'block-number', 'video-call', 'whatsapp-status',
  'youtube-play', 'spotify-play', 'instagram-like', 'gd-ringtone', 'gd-alarm', 'gd-save-contact', 'gd-wallpaper', 'gd-airplane-mode',
  'gd-battery-saver', 'gd-do-not-disturb', 'gd-bluetooth', 'gd-emergency-sos', 'gd-wa-voice-message', 'gd-wa-reply', 'gd-wa-send-photo',
  'gd-wa-profile-photo', 'gd-share-photo-whatsapp', 'gd-yt-voice-search', 'gd-play-explore', 'gd-icon-meanings', 'gd-maps-nearby', 'gd-maps-voice', 'gd-rapido-book', 'gd-blinkit-reorder'];
const L3 = ['send-money', 'recharge', 'electricity-bill', 'gd-block-card', 'gd-food-refund', 'gd-flipkart-return', 'gd-flipkart-cancel',
  'gd-swiggy-cancel', 'gd-uber-cancel', 'gd-upi-failed', 'gd-upi-report-fraud', 'gd-phonepe-send', 'gd-paytm-send', 'gd-maps-offline'];
// Gentler lessons inside the money and travel apps: checking things, as opposed to moving money or booking.
const L2 = ['qr-pay', 'gd-qr-gallery', 'gd-gpay-balance', 'gd-gpay-history', 'yono-balance', 'gd-yono-statement', 'icici-transactions',
  'irctc-pnr', 'gd-irctc-running', 'gd-irctc-show-ticket', 'paytm-pay'];
const BY_APP = { gpay: 3, yono: 3, icici: 3, irctc: 3, paytm: 3, phonepe: 3 };

const MAP = {};
L1.forEach((id) => (MAP[id] = 1));
L2.forEach((id) => (MAP[id] = 2));
L3.forEach((id) => (MAP[id] = 3));

export const levelOf = (lesson) => MAP[lesson.id] || BY_APP[lesson.app] || 2;

// How comfortable the person said they are: new, basic or comfy. Anything else keeps the original order.
export const TARGET = { new: 1, basic: 1.5, comfy: 3 };

// Lessons that teach a skill from the setup tick screen. If the person says they already do it, the lesson moves later.
export const SKILL_LESSONS = {
  call: ['video-call'],
  photo: ['gd-wa-send-photo', 'gd-share-photo-whatsapp'],
  pay: ['qr-pay'],
  voice: ['gd-yt-voice-search'],
  install: ['gd-install-app'],
  wifi: ['wifi'],
};
export const KNOWN_PENALTY = 1.5;

// Reorders lessons so the ones closest to the person's comfort come first. Stable: ties keep their original order.
export function orderForFluency(lessons, fluency, skills = []) {
  const known = new Set(skills.flatMap((k) => SKILL_LESSONS[k] || []));
  const t = TARGET[fluency];
  if (!t && !known.size) return lessons;
  return lessons
    .map((l, i) => ({ l, i, d: (t ? Math.abs(levelOf(l) - t) : 0) + (known.has(l.id) ? KNOWN_PENALTY : 0) }))
    .sort((a, b) => a.d - b.d || a.i - b.i)
    .map((x) => x.l);
}
