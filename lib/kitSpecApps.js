import { K, I, menu, sheet, dialog } from './kitSpec';

const reasons = (title, items, btn) => ({ sheet: { title, items: items.map((l, i) => ({ label: l, radio: i === 0 })), button: { t: btn[0], label: btn[1] } } });
const fkSheet = (title, items, btn) => ({ sheet: { title, items: items.map((l, i) => ({ label: l, radio: i === 0 })), button: { t: btn[0], label: btn[1], color: '#fb641b' } } });

export const KIT_APPS = {
  'yt-subtitles': [K('yt-watch', 'video', { tapVideo: true }), K('yt-watch', 'cc', { controls: true, cc: true }), I('yt-watch', { controls: true, captions: true })],
  'yt-subscribe': [
    K('yt-results', 'video'),
    K('yt-watch', 'subscribe', { sub: 'btn' }),
    [K('yt-watch', 'bell', { subscribed: true, sub: 'bell' }), K('yt-watch', 'all', { subscribed: true }, sheet('Notifications', [['all', 'All', 'bell'], [undefined, 'Personalised', 'bell'], [undefined, 'None', 'mute'], [undefined, 'Unsubscribe', 'close']]))],
  ],
  'yt-save': [
    K('yt-watch', 'save', { save: true }),
    [
      K('yt-watch', 'wl', {}, { sheet: { title: 'Save video to…', items: [{ t: 'wl', label: 'Watch later', icon: 'clock' }, { label: 'Favourites', icon: 'heart' }, { label: 'New playlist', icon: 'plus' }] } }),
      K('yt-watch', 'done', {}, { sheet: { title: 'Save video to…', items: [{ label: '✓  Watch later', icon: 'clock', on: true }, { label: 'Favourites', icon: 'heart' }], button: { t: 'done', label: 'Done', color: '#0f0f0f' } } }),
    ],
    [K('yt-home', 'nav-you', { nav: 'you' }), K('yt-you', 'watch-later', { tap: true })],
  ],
  'yt-voice-search': [K('yt-home', 'search', { search: true }), K('yt-search', 'mic', { mic: true }), [I('yt-search', { listening: true }), K('yt-results', 'video')]],
  'uber-book': [K('ub-home', 'where'), K('ub-search', 'place'), I('ub-pickup'), [K('ub-rides', 'ride-go'), K('ub-rides', 'choose', { selected: true }), K('ub-pickup', 'confirm')], I('ub-driver')],
  'uber-cancel': [
    I('ub-driver', { cancel: false }),
    K('ub-driver', 'cancel', { cancel: true }),
    K('ub-driver', 'confirm', { cancel: false }, reasons('Why do you want to cancel?', ['Driver is taking too long', 'I changed my plans', 'Booked by mistake'], ['confirm', 'Cancel trip'])),
  ],
  'ride-driver-check': [I('ub-driver', { focus: 'plate' }), I('ub-driver', { focus: 'plate' }), I('ub-driver', { focus: 'dp' }), I('ub-driver', { focus: 'pin' })],
  'ride-pay-upi': [K('ub-rides', 'pay'), K('ub-pay', 'upi'), I('ub-rate')],
  'ride-rate': [K('ub-rate', 'stars'), I('ub-rate', { rated: 3 }), [K('ub-home', 'activity'), K('ub-activity', 'trip'), K('ub-trip', 'help')]],
  'ride-lost-item': [K('ub-home', 'activity'), [K('ub-activity', 'trip'), K('ub-trip', 'help'), K('ub-help', 'lost')], K('ub-lost', 'contact')],
  'rapido-cancel': [
    I('rp-captain', { cancel: false }),
    K('rp-captain', 'cancel', { cancel: true }),
    K('rp-captain', 'confirm', { cancel: false }, reasons('Why are you cancelling?', ['Captain is taking too long', 'I changed my plans', 'Booked by mistake'], ['confirm', 'Confirm cancel'])),
  ],
  'ride-share-trip': [I('ub-driver'), K('ub-driver', 'share'), K('ub-share', 'contact')],
  'rapido-book': [[K('rp-home', 'search'), K('rp-search', 'place')], K('rp-rides', 'auto'), K('rp-rides', 'book', { selected: true }), I('rp-captain')],
  'swiggy-track': [I('sw-home', { bar: true }), K('sw-home', 'order-bar', { bar: true }), I('sw-track'), K('sw-track', 'call', { call: true })],
  'swiggy-cancel': [
    K('sw-home', 'order-bar', { bar: true }),
    K('sw-track', 'cancel', { cooking: true, cancel: true }),
    K('sw-track', 'yes', { cooking: true }, dialog('Cancel this order?', 'The restaurant has started preparing your food. You may not get a full refund.', [['no', 'Don’t cancel'], ['yes', 'Yes, cancel', true]])),
  ],
  'swiggy-address': [
    K('sw-home', 'address', { address: true }),
    K('sw-page', 'add', { title: 'Select a location', tap: 'add', items: [['add', 'plus', 'Add new address'], ['home', 'home', 'Home', '12B, MG Road, Kochi'], ['work', 'box', 'Work', 'Infopark, Kakkanad']] }),
    I('sw-address-map'),
    K('sw-address-map', 'save', { save: true }),
  ],
  'food-refund': [
    I('done', { warn: true, title: 'Take a photo first', sub: 'Do not throw away the packet. A photo helps you get your money back.' }),
    [K('sw-home', 'nav-account', { nav: 'account' }), K('sw-page', 'orders', { title: 'My Account', tap: 'orders', items: [['orders', 'box', 'Orders', 'Past orders and reorders'], ['addresses', 'location', 'Addresses'], ['payments', 'card', 'Payments & refunds'], ['help', 'help', 'Help']] }), K('sw-page', 'o4521', { title: 'Past orders', tap: 'o4521', items: [['o4521', 'star', 'Biryani House', 'Delivered · 23 Oct · ₹320'], ['o4400', 'star', 'Sri Krishna Tiffins', 'Delivered · 18 Oct · ₹210']] })],
    [K('sw-page', 'help', { title: 'Order #4521', tap: 'help', items: [['items', 'list', 'Veg Biryani x1, Raita x1', '₹320'], ['help', 'help', 'Help with this order', 'Report a problem']] }), K('sw-page', 'missing', { title: 'Help', tap: 'missing', items: [['late', 'clock', 'Order arrived late'], ['missing', 'alert', 'Items missing or wrong'], ['quality', 'star', 'Food quality issue']] })],
    K('sw-issue', 'upload', { upload: true }),
  ],
  'blinkit-reorder': [[K('bl-home', 'profile', { nav: 'profile' }), K('bl-profile', 'orders', { tap: 'orders' })], K('bl-orders', 'again', { again: true }), I('bl-cart')],
  'flipkart-track': [I('fk-home'), [K('fk-home', 'nav-account', { nav: 'account' }), K('fk-account', 'orders', { tap: 'orders' })], [K('fk-orders', 'item', { status: 'Arriving by Sun, 26 Oct', tap: true }), I('fk-order', { stage: 'shipped' })]],
  'flipkart-return': [
    K('fk-orders', 'item', { tap: true }),
    K('fk-order', 'return', { stage: 'delivered', act: 'return' }),
    K('fk-order', 'continue', { stage: 'delivered' }, fkSheet('Why are you returning this?', ['Item is damaged', 'Wrong item was sent', 'Quality is not as expected'], ['continue', 'Continue'])),
    I('done', { warn: true, title: 'Keep it in its box', sub: 'Give it only to the person who comes to pick it up, and only on the day the app shows.' }),
  ],
  'flipkart-cancel': [
    K('fk-orders', 'item', { status: 'Order Confirmed · Not shipped yet', tap: true }),
    K('fk-order', 'cancel', { stage: 'ordered', act: 'cancel' }),
    K('fk-order', 'confirm', { stage: 'ordered' }, fkSheet('Reason for cancellation', ['I ordered by mistake', 'Price dropped elsewhere', 'Delivery is too late'], ['confirm', 'Confirm cancellation'])),
  ],
  'shop-address': [K('fk-account', 'addresses', { tap: 'addresses' }), K('fk-addresses', 'add', { add: true }), I('fk-address-form'), K('fk-address-form', 'save', { save: true })],
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
  'insta-follow': [K('ig-home', 'nav-search', { nav: 'search' }), K('ig-search', 'user', { typed: 'ramesh', tap: true }), K('ig-profile', 'follow', { follow: true })],
  'insta-private': [
    K('ig-home', 'nav-profile', { nav: 'profile' }),
    [K('ig-profile', 'menu', { me: true, menu: true }), K('ig-list', 'settings', { title: 'Settings and activity', tap: 'settings', items: [['settings', 'gear', 'Settings and privacy'], ['saved', 'bookmark', 'Saved'], ['archive', 'clock', 'Archive'], ['activity', 'list', 'Your activity']] })],
    [K('ig-list', 'privacy', { title: 'Settings and privacy', tap: 'privacy', items: [['notif', 'bell', 'Notifications'], ['privacy', 'lock', 'Account privacy', 'Public'], ['close', 'star', 'Close friends'], ['blocked', 'block', 'Blocked']] }), K('ig-list', 'private', { title: 'Account privacy', tap: 'private', items: [['private', 'lock', 'Private account', 'Only people you approve can see your posts', false]] })],
  ],
  'spotify-playlist': [
    K('sp-home', 'nav-library', { nav: 'library' }),
    [K('sp-library', 'plus', { plus: true }), K('sp-library', 'playlist', {}, { sheet: { items: [{ t: 'playlist', label: 'Playlist', sub: 'Build a playlist with songs', icon: 'music' }, { label: 'Blend', sub: 'Combine tastes with friends', icon: 'contacts' }] } }), K('sp-library', 'create', {}, dialog('Give your playlist a name', 'Morning bhajans', [['cancel', 'Cancel'], ['create', 'Create']]))],
    [K('sp-playlist', 'add-songs', { add: true }), K('sp-playlist', 'add-song', { search: true, plusTap: true })],
  ],
};
