'use client';
// Ask someone close to make a lesson: creates the request and opens WhatsApp with a link for them.
import { addRequest, newId, track, whatsappLink } from './client';

export function askSomeone(text, lang, t) {
  const id = newId();
  const link = `${window.location.origin}/add/${id}?q=${encodeURIComponent(text)}`;
  addRequest({ id, q: text });
  track('ask_child', { meta: { q: text.slice(0, 200), lang, id } });
  fetch('/api/custom', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, question: text, lang, status: 'asked' }),
  }).catch(() => {});
  window.open(whatsappLink(t.askChildMsgLink(text, link)), '_blank', 'noopener');
  return id;
}

// Loads the lessons this phone asked for, with their latest status.
export async function loadMade(reqs) {
  if (!reqs.length) return [];
  try {
    const r = await fetch(`/api/custom?ids=${reqs.map((x) => x.id).join(',')}`);
    const j = await r.json();
    const byId = Object.fromEntries((j.lessons || []).map((l) => [l.id, l]));
    return reqs.map((x) => byId[x.id] || { id: x.id, question: x.q, status: 'asked' });
  } catch {
    return reqs.map((x) => ({ id: x.id, question: x.q, status: 'asked' }));
  }
}

export function isReady(m) {
  return !!((m.steps && m.steps.length) || (m.media && m.media.length));
}
