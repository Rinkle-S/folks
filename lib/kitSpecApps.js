import { K, I, menu, sheet, dialog } from './kitSpec';

const reasons = (title, items, btn) => ({ sheet: { title, items: items.map((l, i) => ({ label: l, radio: i === 0 })), button: { t: btn[0], label: btn[1] } } });
const fkSheet = (title, items, btn) => ({ sheet: { title, items: items.map((l, i) => ({ label: l, radio: i === 0 })), button: { t: btn[0], label: btn[1], color: '#fb641b' } } });

export const KIT_APPS = {
  'uber-book': [K('ub-home', 'where'), K('ub-search', 'place'), I('ub-pickup'), [K('ub-rides', 'ride-go'), K('ub-rides', 'choose', { selected: true }), K('ub-pickup', 'confirm')], I('ub-driver')],
  'uber-cancel': [[I('ub-driver'), K('ub-driver', 'cancel', { details: true, cancel: true })], K('ub-cancel', 'yes'), K('ub-why', 'reason')],
  'ride-driver-check': [I('ub-driver', { focus: 'plate' }), I('ub-driver', { focus: 'plate' }), I('ub-driver', { focus: 'dp' }), I('ub-driver', { focus: 'pin' })],
  'ride-pay-upi': [K('ub-rides', 'pay'), [K('ub-pay', 'upi'), I('ub-rides', { upi: true })], K('ub-rate', 'stars', { end: true }), K('ub-rate', 'submit', { end: true, rated: 3 })],
  'ride-rate': [K('ub-home', 'activity'), K('ub-activity', 'trip'), K('ub-trip', 'rate'), [K('ub-rate', 'stars'), I('ub-rate', { rated: 3 })]],
  'ride-lost-item': [K('ub-home', 'activity'), [K('ub-activity', 'trip'), K('ub-trip', 'help'), K('ub-help', 'lost')], K('ub-lost', 'contact')],
  'rapido-cancel': [
    I('rp-captain', { cancel: false }),
    K('rp-captain', 'cancel', { cancel: true }),
    K('rp-captain', 'confirm', { cancel: false }, reasons('Why are you cancelling?', ['Captain is taking too long', 'I changed my plans', 'Booked by mistake'], ['confirm', 'Confirm cancel'])),
  ],
  'ride-share-trip': [I('ub-driver', { details: true }), K('ub-driver', 'share', { details: true }), K('ub-share', 'contact')],
  'rapido-book': [[K('rp-home', 'search'), K('rp-search', 'place')], K('rp-rides', 'auto'), K('rp-rides', 'book', { selected: true }), I('rp-captain')],
  'irctc-cancel': [I('ir-login'), K('ir-home', 'bookings', { tap: 'bookings' }), [K('ir-bookings', 'ticket', { tap: true }), K('ir-ticket', 'cancel', { cancel: true })], [K('ir-cancel', 'confirm', { confirm: true }), I('ir-otp')]],
  'irctc-running': [K('ir-home', 'running', { tap: 'running' }), I('ir-running'), I('ir-running', { result: true })],
  'irctc-show-ticket': [I('ir-login'), [K('ir-home', 'bookings', { tap: 'bookings' }), K('ir-bookings', 'ticket', { tap: true })], I('ir-ticket')],
  'maps-nearby': [I('mp-home'), K('mp-home', 'chip-hospitals', { chip: 'hospitals' }), K('mp-list', 'place', { tap: true }), K('mp-place', 'directions', { dir: true })],
  'maps-save-home': [K('mp-home', 'nav-you', { nav: 'you' }), K('mp-saved', 'home', { home: true }), I('mp-saved', { typed: true })],
  'maps-offline': [
    I('mp-home'),
    [K('mp-home', 'me', { me: true }), K('mp-home', 'offline', {}, menu([['profile', 'Your profile', 'user'], ['timeline', 'Your Timeline', 'clock'], ['offline', 'Offline maps', 'download'], ['settings', 'Settings', 'gear']], 'tr'))],
    [K('mp-offline', 'select', { select: true }), K('mp-offline', 'download', { download: true })],
  ],
  'maps-voice': [
    K('mp-navigate', 'sound', { sound: true }),
    K('mp-navigate', 'unmute', {}, sheet('Voice guidance', [[undefined, 'Mute', 'mute'], [undefined, 'Alerts only', 'bell'], ['unmute', 'Unmute', 'volume']])),
    I('mp-navigate', {}, { toast: 'Press the volume + button on the side of your phone' }),
  ],
};
