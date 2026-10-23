'use client';
// Who is using Folks: a first name (typed once, no password) and the phone they have.
// Stored only on this phone. The phone brand/model also helps the AI and the phone-setting guides.

const KEY = 'folks_profile';

export const BRANDS = [
  ['samsung', 'Samsung'],
  ['xiaomi', 'Redmi / Xiaomi'],
  ['vivo', 'Vivo'],
  ['oppo', 'Oppo'],
  ['realme', 'Realme'],
  ['motorola', 'Motorola'],
  ['oneplus', 'OnePlus'],
  ['pixel', 'Google Pixel'],
  ['iphone', 'iPhone'],
  ['other', 'Other'],
];
export const brandName = (id) => (BRANDS.find((b) => b[0] === id) || [id, id])[1];

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null') || { name: '', brand: '', model: '' };
  } catch {
    return { name: '', brand: '', model: '' };
  }
}

export function saveProfile(p) {
  const clean = { name: (p.name || '').trim().slice(0, 30), brand: p.brand || '', model: (p.model || '').trim().slice(0, 40) };
  try {
    localStorage.setItem(KEY, JSON.stringify(clean));
    // the AI helper reads this short text
    localStorage.setItem('folks_phone', [brandName(clean.brand), clean.model].filter(Boolean).join(' ').slice(0, 40));
  } catch {}
  return clean;
}

function brandOf(model) {
  const m = (model || '').toLowerCase();
  if (!m) return '';
  if (/^sm-|samsung|galaxy/.test(m)) return 'samsung';
  if (/pixel/.test(m)) return 'pixel';
  if (/redmi|poco|xiaomi|^mi |^m\d{4}|^2\d{3}[a-z]{2,}/.test(m)) return 'xiaomi';
  if (/^cph|oppo/.test(m)) return 'oppo';
  if (/^rmx|realme/.test(m)) return 'realme';
  if (/vivo|^v\d{4}/.test(m)) return 'vivo';
  if (/moto|^xt\d{4}/.test(m)) return 'motorola';
  if (/oneplus|^(le|in|kb|hd|ne|gm)\d{4}/.test(m)) return 'oneplus';
  return '';
}

// Android Chrome can say the phone model. iPhones never do, so the parent picks.
export async function detectPhone() {
  try {
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad/.test(ua)) return { brand: 'iphone', model: '' };
    if (!/Android/i.test(ua)) return null;
    let model = '';
    try {
      const h = navigator.userAgentData && navigator.userAgentData.getHighEntropyValues ? await navigator.userAgentData.getHighEntropyValues(['model']) : null;
      model = (h && h.model) || '';
    } catch {}
    if (!model) {
      const m = ua.match(/Android [\d.]+; ([^;)]+?)(?: Build|\))/);
      model = m && m[1] !== 'K' ? m[1] : '';
    }
    return { brand: brandOf(model), model };
  } catch {
    return null;
  }
}
