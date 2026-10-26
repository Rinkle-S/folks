'use client';
// Reading lessons aloud.
// 1) Natural Indian voice from our server (Sarvam), for sentences that exist in the app.
// 2) If that's off or fails, the phone's own voice (speechSynthesis), with workarounds for Chrome's quirks.
import { textId } from './hash';
import { personalise } from './persona';
import { sentences } from './sentences';
import { langCode } from './langs';
import { speechTexts } from './speechText';
import { getVoiceRate } from './voiceSpeed';

let serverOn = null; // null = not checked yet
let probing = null;
let player = null; // one audio element, reused, so phones that need a tap to allow sound only need it once
let runId = 0;
let unlocked = false;
const SILENT = 'data:audio/wav;base64,UklGRrQBAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YZABAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA';

export const voiceStatus = { server: null, lastError: '', unlocked: false, issue:null };
function speechIssue(lang,reason){
  voiceStatus.issue=reason?{lang,reason}:null;
  try{window.dispatchEvent(new CustomEvent('folks-voice-issue',{detail:voiceStatus.issue}));}catch{}
}

function report(error, extra = {}) {
  voiceStatus.lastError = error;
  try {
    fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'voice_error', meta: { error, ...extra } }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

function getPlayer() {
  if (!player) {
    player = new Audio();
    player.preload = 'auto';
  }
  return player;
}

// Phones only allow sound after the person taps something. On the first tap anywhere, we play a
// silent clip and an empty sentence, which "unlocks" sound for the rest of the visit.
export function unlockAudio() {
  if (unlocked || typeof window === 'undefined') return;
  unlocked = true;
  voiceStatus.unlocked = true;
  try {
    const p = getPlayer();
    p.src = SILENT;
    const r = p.play();
    if (r && r.catch) r.catch(() => {});
  } catch {}
  try {
    const s = window.speechSynthesis;
    if (s) {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      s.speak(u);
    }
  } catch {}
}

if (typeof window !== 'undefined') {
  const once = () => unlockAudio();
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach((ev) =>
    window.addEventListener(ev, once, { capture: true, passive: true })
  );
}

function muted() {
  try {
    return window.localStorage.getItem('folks_mute_v2') === '1';
  } catch {
    return false;
  }
}

// Which voice to use: 'auto' (the natural Indian voice when it is on, else the phone's own) or 'phone' (always the phone's own voice,
// for example when the natural voice is off or its credits have run out).
export function getVoiceChoice() {
  try {
    return window.localStorage.getItem('folks_voice') === 'phone' ? 'phone' : 'auto';
  } catch {
    return 'auto';
  }
}
export function setVoiceChoice(v) {
  try {
    window.localStorage.setItem('folks_voice', v === 'phone' ? 'phone' : 'auto');
  } catch {}
}

// A plain report for the "Diagnose audio" screen. Nothing here makes a sound.
export async function diagnoseVoice(lang) {
  const out = { muted: muted(), unlocked, choice: getVoiceChoice(), lastError: voiceStatus.lastError, speech: false, voices: 0, pick: '', server: false, secure: true };
  try {
    out.secure = window.isSecureContext !== false;
    const s = window.speechSynthesis;
    out.speech = !!s;
    if (s) {
      await waitForVoice(lang);
      const all = s.getVoices() || [];
      out.voices = all.length;
      const v = pickVoice(lang);
      out.pick = v ? `${v.name} (${v.lang})` : '';
    }
  } catch {}
  try {
    const r = await fetch('/api/tts?probe=1');
    const j = await r.json();
    out.server = !!j.enabled;
  } catch {}
  return out;
}

function checkServer() {
  if (getVoiceChoice() === 'phone') return Promise.resolve(false);
  if (serverOn !== null) return Promise.resolve(serverOn);
  if (!probing) {
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),2500);
    probing = fetch('/api/tts?probe=1',{signal:controller.signal})
      .then((r) => r.json())
      .then((j) => (serverOn = voiceStatus.server = !!j.enabled))
      .catch(() => (serverOn = voiceStatus.server = false))
      .finally(()=>clearTimeout(timeout));
  }
  return probing;
}

function urlFor(text, lang) {
  return `/api/tts?h=${textId(text)}&l=${lang}&v=2`;
}

function playServer(text, lang, myRun, orig) {
  return new Promise((resolve, reject) => {
    if (myRun !== runId) return resolve();
    const a = getPlayer();
    // The audio is one file, so estimate the sentence from how far it has played (by share of letters).
    const parts = sentences(orig);
    const total = parts.reduce((s, x) => s + x.length, 0) || 1;
    a.ontimeupdate = () => {
      if (myRun !== runId || !a.duration || !isFinite(a.duration)) return;
      let acc = 0;
      let idx = parts.length - 1;
      for (let k = 0; k < parts.length; k++) {
        acc += parts[k].length;
        if (a.currentTime / a.duration <= acc / total) {
          idx = k;
          break;
        }
      }
      emitProgress(orig, idx);
    };
    emitProgress(orig, 0);
    a.onended = () => resolve();
    a.onplaying=()=>speechIssue(lang,null);
    a.onerror = () => {
      report('server-audio', { code: a.error && a.error.code });
      reject(new Error('audio failed'));
    };
    try {
      a.pause();
    } catch {}
    a.src = urlFor(text, lang);
    a.load();
    a.playbackRate = getVoiceRate() / 0.8;
    a.preservesPitch = true;
    const p = a.play();
    if (p && p.catch)
      p.catch((e) => {
        report('play-blocked', { name: e && e.name });
        reject(e);
      });
  });
}

// Chrome cuts off long utterances, so speak sentence by sentence.
const chunks = sentences;

function pickVoice(lang) {
  const voices = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
  const norm = (v) => (v.lang || '').toLowerCase().replace('_', '-');
  if (lang !== 'en') return voices.find((v) => norm(v).startsWith(lang)) || null;
  return voices.find((v) => norm(v) === 'en-in') || voices.find((v) => norm(v).startsWith('en')) || null;
}

// Chrome may populate voices after the first call. Wait for that event rather
// than silently asking an English default voice to read Malayalam or Hindi.
function waitForVoice(lang){
  const found=pickVoice(lang);
  if(found)return Promise.resolve(found);
  return new Promise(resolve=>{
    const s=window.speechSynthesis;
    if(!s)return resolve(null);
    let timer;
    const finish=voice=>{clearTimeout(timer);s.removeEventListener?.('voiceschanged',check);resolve(voice);};
    const check=()=>{const voice=pickVoice(lang);if(voice)finish(voice);};
    s.addEventListener?.('voiceschanged',check);
    timer=setTimeout(()=>finish(pickVoice(lang)),1200);
    check();
  });
}

async function playBrowser(text, lang, myRun, orig) {
  const selected=await waitForVoice(lang);
  if(myRun!==runId)return false;
  if(!selected){report('language-unavailable',{lang});speechIssue(lang,'missing');return false;}
  speechIssue(lang,null);
  return new Promise((resolve) => {
    const s = window.speechSynthesis;
    if (!s) return resolve(false);
    const parts = chunks(text);
    let i = 0;
    const next = () => {
      if (myRun !== runId || i >= parts.length) return resolve(true);
      emitProgress(orig, i);
      const u = new SpeechSynthesisUtterance(parts[i++]);
      u.lang = langCode(lang);
      u.voice = selected;
      u.rate = getVoiceRate();
      u.onend = next;
      u.onerror = (e) => {
        if(myRun!==runId)return resolve(false);
        report('phone-voice', { error: e && e.error, lang });
        if(myRun===runId)speechIssue(lang,e?.error==='language-unavailable'||e?.error==='voice-unavailable'?'missing':'failed');
        resolve(false);
      };
      try {
        s.resume();
        s.speak(u);
      } catch {
        if(myRun===runId)speechIssue(lang,'failed');
        resolve(false);
      }
    };
    next();
  });
}

export function stopSpeaking() {
  runId++;
  setSpeaking(false);
  try {
    if (player && !player.paused) player.pause();
  } catch {}
  try {
    window.speechSynthesis && window.speechSynthesis.cancel();
  } catch {}
}

// speak("text", lang) or speak(["sentence 1", "sentence 2"], lang): plays one after another.
const listeners = new Set();
export function onSpeaking(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function setSpeaking(v) {
  listeners.forEach((fn) => fn(v));
  if (!v) emitProgress(null, -1);
}

// Which sentence of which text is being spoken now, so the screen can highlight it.
const progressListeners = new Set();
export function onSpeechProgress(fn) {
  progressListeners.add(fn);
  return () => progressListeners.delete(fn);
}
function emitProgress(text, index) {
  progressListeners.forEach((fn) => fn({ text, index }));
}

// opts.force: the person asked to hear it (e.g. "Listen again"), so play even if sound was turned off.
export async function speak(text, lang, opts = {}) {
  if (typeof window === 'undefined' || (muted() && !opts.force)) return;
  stopSpeaking();
  const myRun = runId;
  const list = (Array.isArray(text) ? text : [text]).filter((x) => typeof x === 'string' && x.trim());
  if (!list.length) return;
  // Chrome sometimes drops speech that starts right after cancel(); wait a moment.
  await new Promise((r) => setTimeout(r, 120));
  if(myRun!==runId)return;
  const useServer = await checkServer();
  if(myRun!==runId)return;
  const known = speechTexts();
  const guard = (seg) => new Promise((r) => setTimeout(r, (seg.length * 130 + 4000) * 0.8 / getVoiceRate())); // never hang a lesson
  setSpeaking(true);
  for (let i = 0; i < list.length; i++) {
    const orig = list[i];
    const seg = personalise(orig); // the user's own name, if saved
    if (myRun !== runId) return;
    if (i > 0) await new Promise((r) => setTimeout(r, 450)); // a breath between sentences
    if (seg === orig && useServer && known.has(textId(seg))) {
      try {
        await Promise.race([playServer(seg, lang, myRun, orig), guard(seg)]);
        continue;
      } catch {
        // fall through to the phone's voice
      }
    }
    const played=await Promise.race([playBrowser(seg, lang, myRun, orig), guard(seg)]);
    if(myRun!==runId)return;
    if(played===undefined)speechIssue(lang,'failed');
    if(played!==true)break;
  }
  if (myRun === runId) setSpeaking(false);
}

// Warm up the next sentence so it plays without a pause.
export function prefetchSpeech(text, lang) {
  if (typeof window === 'undefined' || !text) return;
  checkServer().then((on) => {
    if (on && speechTexts().has(textId(text))) fetch(urlFor(text, lang)).catch(() => {});
  });
}

// Voices load late on Android; asking early makes the first sentence work.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  } catch {}
}

// One line in the console at app start: which voice (speaking) and which listening service will be used.
export async function logVoiceServices() {
  try {
    const choice = getVoiceChoice();
    const [tts, stt] = await Promise.all([
      fetch('/api/tts?probe=1').then((r) => r.json()).then((j) => !!j.enabled).catch(() => false),
      fetch('/api/stt').then((r) => r.json()).then((j) => !!j.enabled).catch(() => false),
    ]);
    const speaking = choice === 'phone' ? "Browser TTS (this phone's own voice, chosen in Settings)" : tts ? 'Sarvam TTS (server voice)' : "Browser TTS (speechSynthesis, Sarvam is off)";
    const listening = stt ? 'Sarvam STT (server)' : 'Browser speech recognition (Chrome SpeechRecognition, Sarvam is off)';
    console.info(`[Nook voice] Speaking: ${speaking}\n[Nook voice] Listening: ${listening}`);
  } catch (e) {
    console.warn('[Nook voice] Could not work out which voice service is in use:', e);
  }
}
