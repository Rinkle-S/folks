// Opens the real app on the parent's phone. Android: an intent link (Chrome opens the app, or the Play Store if it is missing).
// iPhone: the app's own link scheme where it has one. Desktop and unknown apps: no button.
const ANDROID = {
  gpay: 'com.google.android.apps.nbu.paisa.user', phonepe: 'com.phonepe.app', paytm: 'net.one97.paytm',
  whatsapp: 'com.whatsapp', drive: 'com.google.android.apps.docs', youtube: 'com.google.android.youtube',
  uber: 'com.ubercab', rapido: 'com.rapido.passenger', swiggy: 'in.swiggy.android', ola: 'com.olacabs.customer',
  zomato: 'com.application.zomato', amazon: 'in.amazon.mShop.android.shopping', flipkart: 'com.flipkart.android',
  instagram: 'com.instagram.android', spotify: 'com.spotify.music', yono: 'com.sbi.lotusintouch',
  icici: 'com.csam.icici.bank.imobile', blinkit: 'com.grofers.customerapp', zepto: 'com.zeptoconsumerapp',
  irctc: 'cris.org.in.prs.ima', maps: 'com.google.android.apps.maps',
};
const IOS = {
  whatsapp: 'whatsapp://', youtube: 'youtube://', instagram: 'instagram://', spotify: 'spotify://',
  maps: 'comgooglemaps://', gpay: 'gpay://', paytm: 'paytm://', phonepe: 'phonepe://', swiggy: 'swiggy://',
  zomato: 'zomato://', uber: 'uber://', flipkart: 'flipkart://', amazon: 'amazon://', drive: 'googledrive://',
};

function platform() {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  return 'other';
}

export function canOpenApp(app) {
  const p = platform();
  return (p === 'android' && !!ANDROID[app]) || (p === 'ios' && !!IOS[app]);
}

export function openRealApp(app) {
  const p = platform();
  if (p === 'android' && ANDROID[app]) {
    window.location.href = `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${ANDROID[app]};end`;
  } else if (p === 'ios' && IOS[app]) {
    window.location.href = IOS[app];
  }
}
