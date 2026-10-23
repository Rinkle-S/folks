'use client';
// Small browser helpers: language, device id, event tracking, speech.
// Every storage access is wrapped in try/catch so the app still works in private mode.

import { useEffect, useState } from 'react';
import { isLang } from './langs';

function read(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

// Reads ?lang= and ?from= from the link the child shared, and remembers them.
export function captureParams() {
  try {
    const p = new URLSearchParams(window.location.search);
    const lang = p.get('lang');
    const from = p.get('from');
    if (isLang(lang)) write('folks_lang', lang);
    if (from) write('folks_from', from.slice(0, 40));
    const apps = p.get('apps');
    if (apps) write('folks_apps', apps.slice(0, 120));
  } catch {}
}

export function useLang() {
  const [lang, setLangState] = useState(undefined); // undefined = not loaded yet, null = not chosen
  useEffect(() => {
    captureParams();
    const l = read('folks_lang');
    setLangState(isLang(l) ? l : 'en'); // English unless chosen otherwise
    // Other parts of the page (like the QR card beside the app) use this hook too, so they hear about a change.
    const onChange = (e) => setLangState(e.detail);
    window.addEventListener('folks-lang', onChange);
    return () => window.removeEventListener('folks-lang', onChange);
  }, []);
  const setLang = (l) => {
    write('folks_lang', l);
    setLangState(l);
    try {
      window.dispatchEvent(new CustomEvent('folks-lang', { detail: l }));
    } catch {}
  };
  return [lang, setLang];
}

export function getFrom() {
  return read('folks_from') || '';
}

export function deviceId() {
  let d = read('folks_device');
  if (!d) {
    d =
      (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
      Math.random().toString(36).slice(2) + Date.now().toString(36);
    write('folks_device', d);
  }
  return d;
}

// Feedback and requests are the most valuable events. They wait in an outbox on the phone until the server says
// they are stored (the database may not be connected yet), then are sent on a later visit.
const OUTBOX = 'folks_outbox';
const DURABLE = new Set(['feedback', 'feedback_detail', 'ask_child']);
const outboxList = () => {
  try {
    return JSON.parse(read(OUTBOX) || '[]');
  } catch {
    return [];
  }
};
let flushing = false;
export async function flushOutbox() {
  if (flushing || typeof window === 'undefined') return;
  flushing = true;
  try {
    for (const ev of outboxList().slice(0, 20)) {
      const r = await fetch('/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ev) });
      const j = await r.json().catch(() => ({}));
      if (!(r.ok && j.stored)) break;
      write(OUTBOX, JSON.stringify(outboxList().filter((x) => x.eid !== ev.eid)));
    }
  } catch {
  } finally {
    flushing = false;
  }
}

export function track(type, data = {}) {
  try {
    const ev = { type, device: deviceId(), from: getFrom(), at: new Date().toISOString(), ...data };
    if (DURABLE.has(type)) {
      ev.eid = newId();
      write(OUTBOX, JSON.stringify([...outboxList(), ev].slice(-300)));
      flushOutbox();
      return;
    }
    fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ev),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

import { stopSpeaking as stopVoice } from './voice';
export { speak, stopSpeaking, prefetchSpeech, unlockAudio, onSpeaking, onSpeechProgress } from './voice';

export function useMute() {
  const [muted, setMuted] = useState(false);
  useEffect(() => setMuted(read('folks_mute_v2') === '1'), []);
  const toggle = () => {
    const next = !muted;
    write('folks_mute_v2', next ? '1' : '0');
    if (next) stopVoice();
    setMuted(next);
  };
  return [muted, toggle];
}

export function whatsappLink(text, number) {
  return `https://wa.me/${number || ''}?text=${encodeURIComponent(text)}`;
}

export function getApps() {
  const v = read('folks_apps');
  return v ? v.split(',').filter(Boolean) : null; // null = never chosen
}
export function saveApps(list) {
  write('folks_apps', list.join(','));
}

// Questions this parent asked their child, so their family-made lessons show up on Home.
export function getRequests() {
  try {
    return JSON.parse(read('folks_requests') || '[]');
  } catch {
    return [];
  }
}
export function addRequest(r) {
  const list = getRequests().filter((x) => x.id !== r.id);
  list.unshift(r);
  write('folks_requests', JSON.stringify(list.slice(0, 20)));
}
export function newId() {
  const a = 'abcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < 10; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

// Lessons finished on this phone (for the progress ring and the ✓ on each lesson).
export function getDone() {
  try {
    return JSON.parse(read('folks_done') || '[]');
  } catch {
    return [];
  }
}
export function markDone(id) {
  const d = getDone();
  if (!d.includes(id)) write('folks_done', JSON.stringify([...d, id]));
}
export function isOnboarded() {
  return read('folks_onboarded') === '1';
}
export function isPracticeSeen() {
  return read('folks_practice_seen') === '1';
}
export function setPracticeSeen() {
  write('folks_practice_seen', '1');
}
export function setOnboarded() {
  write('folks_onboarded', '1');
}
export function vibrate(ms) {
  try {
    navigator.vibrate && navigator.vibrate(ms);
  } catch {}
}

// How the parent likes to learn: 'ask' (choose each time), 'practice', 'watch' or 'follow' (read the steps).
export function getLearnMode() {
  const m = read('folks_mode');
  return m === 'practice' || m === 'watch' || m === 'follow' ? m : 'ask';
}
export function setLearnMode(m) {
  try {
    window.localStorage.setItem('folks_mode', m);
  } catch {}
}
// The last few lessons opened, newest first.
export function getRecent() {
  try {
    return JSON.parse(read('folks_recent') || '[]');
  } catch {
    return [];
  }
}
export function addRecent(id) {
  try {
    const list = [id, ...getRecent().filter((x) => x !== id)].slice(0, 4);
    window.localStorage.setItem('folks_recent', JSON.stringify(list));
  } catch {}
}
