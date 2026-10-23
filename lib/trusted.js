'use client';
// Trusted contacts: the son, daughter or friend a parent asks for help. Saved only on this phone
// (localStorage), never sent to a server. "Ask someone" opens WhatsApp straight to them.
const KEY = 'folks_trusted';
export const MAX_TRUSTED = 3;

export function getTrusted() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((c) => c && c.name && c.number).slice(0, MAX_TRUSTED) : [];
  } catch {
    return [];
  }
}

export function saveTrusted(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_TRUSTED)));
  } catch {}
}

// "98450 12345", "+91 98450 12345" or "09845012345" -> "919845012345". Anything else -> null.
export function cleanNumber(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? `91${d}` : null;
}
