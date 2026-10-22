'use client';
// Reading lessons aloud.
// 1) Natural Indian voice from our server (Sarvam), for sentences that exist in the app.
// 2) If that's off or fails, the phone's own voice (speechSynthesis), with workarounds for Chrome's quirks.
import { textId } from './hash';
import { speechTexts } from './speechText';

let serverOn = null; // null = not checked yet
let probing = null;
let audio = null;
let runId = 0;

function muted() {
  try {
    return window.localStorage.getItem('folks_mute') === '1';
  } catch {
    return false;
  }
}

function checkServer() {
  if (serverOn !== null) return Promise.resolve(serverOn);
  if (!probing) {
    probing = fetch('/api/tts?probe=1')
      .then((r) => r.json())
      .then((j) => (serverOn = !!j.enabled))
      .catch(() => (serverOn = false));
  }
  return probing;
}

function urlFor(text, lang) {
  return `/api/tts?h=${textId(text)}&l=${lang}`;
}

function playServer(text, lang, myRun) {
  return new Promise((resolve, reject) => {
    if (myRun !== runId) return resolve();
    const a = new Audio(urlFor(text, lang));
    audio = a;
    a.onended = () => resolve();
    a.onerror = () => reject(new Error('audio failed'));
    const p = a.play();
    if (p && p.catch) p.catch(reject);
  });
}

// Chrome cuts off long utterances, so speak sentence by sentence.
function chunks(text) {
  const parts = text.match(/[^.!?।]+[.!?।]?/g) || [text];
  return parts.map((x) => x.trim()).filter(Boolean);
}

function pickVoice(lang) {
  const voices = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
  const norm = (v) => (v.lang || '').toLowerCase().replace('_', '-');
  if (lang === 'hi') return voices.find((v) => norm(v).startsWith('hi')) || null;
  return voices.find((v) => norm(v) === 'en-in') || voices.find((v) => norm(v).startsWith('en')) || null;
}

function playBrowser(text, lang, myRun) {
  return new Promise((resolve) => {
    const s = window.speechSynthesis;
    if (!s) return resolve();
    const parts = chunks(text);
    let i = 0;
    const next = () => {
      if (myRun !== runId || i >= parts.length) return resolve();
      const u = new SpeechSynthesisUtterance(parts[i++]);
      u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      const v = pickVoice(lang);
      if (v) u.voice = v;
      u.rate = 0.9;
      u.onend = next;
      u.onerror = next;
      try {
        s.resume();
        s.speak(u);
      } catch {
        resolve();
      }
    };
    next();
  });
}

export function stopSpeaking() {
  runId++;
  try {
    if (audio) {
      audio.pause();
      audio = null;
    }
  } catch {}
  try {
    window.speechSynthesis && window.speechSynthesis.cancel();
  } catch {}
}

// speak("text", lang) or speak(["sentence 1", "sentence 2"], lang): plays one after another.
export async function speak(text, lang) {
  if (typeof window === 'undefined' || muted()) return;
  stopSpeaking();
  const myRun = runId;
  const list = (Array.isArray(text) ? text : [text]).filter((x) => typeof x === 'string' && x.trim());
  if (!list.length) return;
  // Chrome sometimes drops speech that starts right after cancel(); wait a moment.
  await new Promise((r) => setTimeout(r, 120));
  const useServer = await checkServer();
  const known = speechTexts();
  const guard = (seg) => new Promise((r) => setTimeout(r, seg.length * 130 + 4000)); // never hang a lesson
  for (const seg of list) {
    if (myRun !== runId) return;
    if (useServer && known.has(textId(seg))) {
      try {
        await Promise.race([playServer(seg, lang, myRun), guard(seg)]);
        continue;
      } catch {
        // fall through to the phone's voice
      }
    }
    await Promise.race([playBrowser(seg, lang, myRun), guard(seg)]);
  }
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
