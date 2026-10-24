'use client';
// The son, daughter or friend who helps a parent. Only the first name is needed: it replaces the demo name (Rahul) in practice
// chats and lesson text (lib/persona.js). Saved only on this phone (localStorage), never sent to a server.
// Older saves may also hold a WhatsApp number; it is ignored now that "Ask someone" is gone.
const KEY = 'folks_trusted';
export const MAX_TRUSTED = 3;

export function getTrusted() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((c) => c && c.name).slice(0, MAX_TRUSTED) : [];
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
