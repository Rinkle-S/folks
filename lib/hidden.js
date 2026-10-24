// Hidden, not deleted. Everything listed here is switched off in the app, but its code and screens stay in the repo,
// so each one can be checked against the real app and switched back on later (just remove its id from the list).
// Why hidden: it is hard to check every screen and every word against the real app. Building is quick, verification is essential.

// Whole apps: their lessons, quick guides, screens and keywords stay in the code but nobody sees them.
export const HIDDEN_APPS = new Set(['rapido', 'phonepe', 'irctc', 'zomato', 'playstore']);

// Single quick guides (ids without the "gd-" part) and hand-built lessons.
export const HIDDEN_GUIDES = new Set([
  'gpay-reset-pin', // reset a forgotten UPI PIN
  'upi-failed', // money was debited but not received
  'block-card', // block a lost debit card
  'play-update-apps', // keep your apps up to date
  'screen-lock', // set a screen lock
  'gmail-send', // send an email
  'free-space', // free up phone space
  'ringtone', // change your ringtone
  'wallpaper', // change your wallpaper
  // 24 Oct, second round: kept simple, cannot all be checked yet
  'irctc-running', // where is my train
  'irctc-show-ticket', // show your ticket on the train
  'wa-leave-group',
  'wa-block-contact',
  'wa-forward',
  'wa-voice-message',
  'wa-reply',
  'yono-add-beneficiary', // add a new payee
  'yono-statement', // download your bank statement
  'maps-voice', // change the voice or turn it up in Maps
  // Phone basics is cut to the 10 most sought-after lessons
  'bluetooth',
  'airplane-mode',
  'battery-saver',
  'do-not-disturb',
  'uninstall-app',
  'share-photo-whatsapp',
  // Third round: cut with the owner
  'wa-delete-message',
  'maps-save-home',
  'irctc-cancel',
  // Fourth round (24 Oct): trimming to a small core.
  'qr-gallery',
  'gpay-pay-number',
  'wa-send-photo',
  'wa-profile-photo',
  'yono-send',
  'maps-nearby',
  'play-explore',
  'alarm',
  // Fifth round (24 Oct): make a group, save a contact, past payments.
  'wa-create-group',
  'save-contact',
  // Sixth round: zomato, emergency SOS, report wrong-person payment.
  'zomato-order',
  'emergency-sos',
  'upi-report-fraud',
  // Seventh round: forwarded-message check, lost item.
  'wa-verify-forward',
  'ride-lost-item',
  // Eighth round: share a trip (taught in Book a cab), rate (now part of Pay for a ride).
  'ride-share-trip',
  'ride-rate',
  'gpay-history',
]);

// Hand-built lessons (by lesson id) that are switched off.
export const HIDDEN_LESSONS = new Set(['hotspot', 'selfie', 'screenshot', 'electricity-bill', 'irctc-pnr', 'irctc-ticket', 'wifi',
  'silent', 'speaker-call', 'block-number', 'maps-share-location']);

// Quick guides that are read in the Stay safe tab instead of practised as a lesson.
export const GUIDE_ONLY = new Set(['open-link-safe']);
