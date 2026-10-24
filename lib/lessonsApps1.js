// Flipkart, Instagram and Spotify lessons. Screens are drawn from blocks (see components/screens/Gen.js).
import { tr, intro, tap, note, quiz, opt } from './guide';

const FK = { brand: '#2874f0', ink: '#ffffff', bg: '#ffffff', soft: '#f1f3f6' };
const IG = { brand: '#0095f6', ink: '#ffffff', bg: '#ffffff', soft: '#efefef', text: '#111' };
const SP = { brand: '#1db954', ink: '#000000', bg: '#121212', soft: '#2a2a2a', text: '#ffffff', dark: true };

const fix = (en, hi, ml) => ({ en, hi, ml });
const practiceOf = (app, appName) => ({ app, appName });

// ---------------------------------------------------------------- Flipkart
const fkBar = (right = true) => ({ t: 'bar', tone: 'brand', title: 'Flipkart', right: right ? [{ id: 'cart-ic', icon: 'bag' }] : [] });
const fkHome = () => ({ skin: FK, blocks: [fkBar(), { t: 'search', id: 'search', ph: 'Search for products, brands' }, { t: 'chips', items: [{ label: 'Grocery' }, { label: 'Mobiles' }, { label: 'Fashion' }, { label: 'Home' }] }, { t: 'cards', title: 'Deals for you', items: [{ e: '👟', title: 'Sports shoes', sub: 'Up to 60% off' }, { e: '🛋️', title: 'Home needs', sub: 'From ₹199' }] }] });
const fkProduct = (extra = []) => ({ skin: FK, blocks: [fkBar(), { t: 'hero', e: '🍶', title: 'Steel Water Bottle, 1 litre', sub: '₹299  (was ₹499)  40% off' }, { t: 'text', text: '★ 4.3  ·  Free delivery  ·  Cash on Delivery available' }, ...extra] });

export const APP1_LESSONS = {

  // ---------------------------------------------------------------- Instagram


  // ---------------------------------------------------------------- Spotify
};

export const APP1_KEYWORDS = {
};
