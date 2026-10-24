// Hidden, not deleted. Everything listed here is switched off in the app, but its code and screens stay in the repo,
// so each one can be checked against the real app and switched back on later (just remove its id from the list).
// Why hidden: it is hard to check every screen and every word against the real app. Building is quick, verification is essential.

// Whole apps: their lessons, quick guides, screens and keywords stay in the code but nobody sees them.
export const HIDDEN_APPS = new Set(['rapido', 'phonepe']);

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
]);

// Quick guides that are read in the Stay safe tab instead of practised as a lesson.
export const GUIDE_ONLY = new Set(['open-link-safe']);
