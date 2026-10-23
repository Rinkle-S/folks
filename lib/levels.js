// Lesson levels. Never shown to anyone: a level only decides the ORDER lessons are offered in, so nobody feels graded.
// 1 = gentle first steps, 2 = everyday apps, 3 = money, bookings and other careful tasks.
// A lesson not listed gets the default for its app below.
const L1 = ['flashlight', 'selfie', 'silent', 'bigger-text', 'screenshot', 'speaker-call', 'block-number', 'video-call', 'whatsapp-status',
  'youtube-play', 'spotify-play', 'instagram-like', 'gd-ringtone', 'gd-alarm', 'gd-save-contact', 'gd-wallpaper', 'gd-airplane-mode',
  'gd-battery-saver', 'gd-do-not-disturb', 'gd-bluetooth', 'gd-emergency-sos', 'gd-wa-voice-message', 'gd-wa-reply', 'gd-wa-send-photo',
  'gd-wa-profile-photo', 'gd-share-photo-whatsapp', 'gd-yt-voice-search'];
const L3 = ['send-money', 'recharge', 'electricity-bill', 'paytm-pay', 'gd-block-card', 'gd-food-refund', 'gd-flipkart-return', 'gd-flipkart-cancel',
  'gd-swiggy-cancel', 'gd-uber-cancel', 'gd-upi-failed', 'gd-upi-report-fraud', 'gd-phonepe-send', 'gd-paytm-send'];
const BY_APP = { gpay: 3, yono: 3, icici: 3, irctc: 3, paytm: 3, phonepe: 3 };

const MAP = {};
L1.forEach((id) => (MAP[id] = 1));
L3.forEach((id) => (MAP[id] = 3));

export const levelOf = (lesson) => MAP[lesson.id] || BY_APP[lesson.app] || 2;

// How comfortable the person said they are: new, basic or comfy. Anything else keeps the original order.
const TARGET = { new: 1, basic: 1.5, comfy: 2.5 };

// Reorders lessons so the ones closest to the person's comfort come first. Stable: ties keep their original order.
export function orderForFluency(lessons, fluency) {
  const t = TARGET[fluency];
  if (!t) return lessons;
  return lessons
    .map((l, i) => ({ l, i, d: Math.abs(levelOf(l) - t) }))
    .sort((a, b) => a.d - b.d || a.i - b.i)
    .map((x) => x.l);
}
