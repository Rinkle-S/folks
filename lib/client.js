'use client';
// Small browser helpers: language, device id, event tracking, speech.
// Every storage access is wrapped in try/catch so the app still works in private mode.

import { useEffect, useState } from 'react';
import { isLang } from './langs';
import { ALL_APPS } from './apps';
import { REMOVED_LESSONS } from './hidden';

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
    return true;
  } catch {}
  return false;
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
let memoryOutbox = null;
const DURABLE = new Set(['safe_visual_open', 'safe_visual_answer', 'safe_visual_done', 'feedback', 'feedback_detail', 'ask_child', 'app_rating', 'app_feedback', 'lesson_request', 'lesson_completed', 'lesson_feedback', 'scam_help_opened', 'scam_help_step', 'scam_help_call_1930', 'lesson_end_action', 'lesson_send', 'onboarding_goal', 'onboarding_try_tapped']);
const outboxList = () => {
  if (memoryOutbox) return memoryOutbox;
  try {
    const list = JSON.parse(read(OUTBOX) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};
function saveOutbox(list) {
  memoryOutbox = write(OUTBOX, JSON.stringify(list)) ? null : list;
}
let flushing = false;
export async function flushOutbox() {
  if (flushing || typeof window === 'undefined') return;
  flushing = true;
  try {
    // Read the queue again after each acknowledgement, including events added during this flush.
    for (let sent = 0; sent < 300; sent++) {
      const ev = outboxList()[0];
      if (!ev) break;
      const r = await fetch('/api/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ev) });
      const j = await r.json().catch(() => ({}));
      if (!(r.ok && j.stored)) break;
      saveOutbox(outboxList().filter((x) => x.eid !== ev.eid));
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
      saveOutbox([...outboxList(), ev].slice(-300));
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
export { speak, stopSpeaking, prefetchSpeech, unlockAudio, onSpeaking, onSpeechProgress, getVoiceChoice, setVoiceChoice, diagnoseVoice } from './voice';

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
  if (v === null) return null; // an empty saved string means None of these
  // Drop apps Nook no longer has (Paytm, YouTube, Drive...), and save the cleaned list so they stay gone.
  const all = v.split(',').filter(Boolean);
  const list = all.filter((id) => ALL_APPS.some((a) => a.id === id));
  if (list.length !== all.length) write('folks_apps', list.join(','));
  return list;
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
// A lesson left halfway: Home offers one button to carry on. Cleared when the lesson is finished. Forgotten after a week.
export function getResume() {
  try {
    const r = JSON.parse(read('folks_resume') || 'null');
    if (r && REMOVED_LESSONS.has(r.id)) { write('folks_resume', ''); return null; }
    return r && r.id && (r.idx >= 2 || (r.goal && r.idx === 0)) && Date.now() - (r.at || 0) < 7 * 864e5 ? r : null;
  } catch {
    return null;
  }
}
export function saveResume(id, idx) {
  write('folks_resume', JSON.stringify({ id, idx, at: Date.now() }));
}
export function saveGoalResume(id) {
  write('folks_resume', JSON.stringify({id, idx:0, goal:true, at:Date.now()}));
}
export function clearResume(id) {
  const r = getResume();
  if (!id || (r && r.id === id)) write('folks_resume', '');
}

// Asking for a rating: after the second lesson finished, once. "Not now" asks again after two more lessons, at most twice.
export function getRate() {
  try {
    return JSON.parse(read('folks_rate') || '{}');
  } catch {
    return {};
  }
}
export function setRate(o) {
  write('folks_rate', JSON.stringify(o));
}
export function shouldAskRate() {
  const r = getRate();
  const n = getDone().length;
  return !r.stars && (r.snoozes || 0) < 2 && n >= Math.max(2, r.next || 2);
}
export function snoozeRate() {
  const r = getRate();
  setRate({ ...r, snoozes: (r.snoozes || 0) + 1, next: getDone().length + 2 });
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
