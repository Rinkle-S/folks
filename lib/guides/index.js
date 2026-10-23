import { PHONE_GUIDES } from './phone';
import { WHATSAPP_GUIDES } from './whatsapp';
import { MONEY_GUIDES } from './money';
import { APP_GUIDES } from './apps';

// Kept to 66 guides so there are 100 lessons in all. These were cut as least likely to be asked by parents
// (or covered by a hand-built lesson already).
const CUT = new Set(['find-phone', 'restart-phone', 'call-volume', 'fingerprint', 'phone-language', 'recover-photo', 'google-photos-backup', 'mute-notifications', 'dark-mode', 'update-app', 'wa-disappearing', 'wa-mute-chat', 'wa-send-document', 'wa-add-contact-chat', 'wa-backup', 'wa-share-location', 'gpay-add-bank', 'gpay-request-money', 'phonepe-history', 'paytm-balance', 'yono-change-mpin', 'yono-account-details', 'icici-statement', 'yt-speed', 'yt-fullscreen', 'ride-pay-upi', 'food-coupon', 'blinkit-cod', 'shop-search-filter', 'irctc-seats', 'spotify-search-voice']);
export const GUIDE_LIST = [...PHONE_GUIDES, ...WHATSAPP_GUIDES, ...MONEY_GUIDES, ...APP_GUIDES].filter((g) => !CUT.has(g.id));
export const GUIDES = Object.fromEntries(GUIDE_LIST.map((x) => [x.id, x]));
