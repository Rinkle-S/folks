'use client';
// Small browser helpers: language, device id, event tracking, speech.
// Every storage access is wrapped in try/catch so the app still works in private mode.

import { useEffect, useState } from 'react';

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
    if (lang === 'hi' || lang === 'en') write('folks_lang', lang);
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
    setLangState(l === 'hi' ? 'hi' : 'en'); // English unless chosen otherwise
  }, []);
  const setLang = (l) => {
    write('folks_lang', l);
    setLangState(l);
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

export function track(type, data = {}) {
  try {
    const body = JSON.stringify({ type, device: deviceId(), from: getFrom(), ...data });
    fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

import { stopSpeaking as stopVoice } from './voice';
export { speak, stopSpeaking, prefetchSpeech, unlockAudio, onSpeaking } from './voice';

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

export function whatsappLink(text) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
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
export function setOnboarded() {
  write('folks_onboarded', '1');
}
export function vibrate(ms) {
  try {
    navigator.vibrate && navigator.vibrate(ms);
  } catch {}
}
