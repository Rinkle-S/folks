'use client';
// One lesson, three ways to learn:
//  practice: the parent taps through practice screens themselves (default)
//  watch:    plays by itself like a video, with voice and glowing taps
//  follow:   one step at a time, worded for the real app, so they can do it on their own phone
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Screen from './Screens';
import { handPosition } from '@/lib/handPosition';
import { BottomNav } from './AppShell';
import { watchPersona, personalise } from '@/lib/persona';
import { recordPerf } from '@/lib/adapt';
import { levelOf } from '@/lib/levels';
import { sentences } from '@/lib/sentences';
import { prepareRingtone, startRingtone } from '@/lib/ringtone';
import Settings from './Settings';
import LessonEnd from './LessonEnd';
import FollowView from './FollowView';
import LessonPrint from './LessonPrint';
import Icon from './Icons';
import AppIcon from './AppIcon';
import { LESSONS } from '@/lib/lessons';
import { T } from '@/lib/i18n';
import ShareLesson from './ShareLesson';
import { useLang, useMute, speak, stopSpeaking, prefetchSpeech, onSpeaking, track, getFrom, markDone, getResume, saveResume, clearResume, vibrate, getLearnMode, addRecent, onSpeechProgress } from '@/lib/client';

// Watch-first pacing (milliseconds). Slower than before: older viewers need time to see the screen, then the pointer,
// then the tap. Research on older listeners favours clear speech (about 140 words a minute or less) and pauses.
const WATCH = { settle: 900, beforeTap: 1400, tapHold: 1800, rest: 1500, perKey: 900 };

// Shows the user's own name and trusted contact instead of the demo persona (see lib/persona.js).
export default function Player({ id }) {
  const ref = useRef(null);
  useEffect(() => watchPersona(ref.current), []);
  return (
    <div ref={ref} style={{ display: 'contents' }}>
      <PlayerInner id={id} />
    </div>
  );
}

function PlayerInner({ id }) {
  const lesson = LESSONS[id];
  const [lang, setLang] = useLang();
  const [muted, toggleMute] = useMute();
  const [mode, setMode] = useState(null); // null until chosen on the first screen
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [values, setValues] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [quiz, setQuiz] = useState(null); // { correct, why }
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [tapFx, setTapFx] = useState(false);
  const [paused, setPaused] = useState(false);
  const [from, setFrom] = useState('');
  const [bubble, setBubble] = useState(null);
  const router = useRouter();
  const stepWrongRef = useRef(0);
  const [leaveOpen, setLeaveOpen] = useState(false);
  useEffect(() => {
    stepWrongRef.current = 0;
  }, [idx]);
  const [showSettings, setShowSettings] = useState(false);
  const [showScene, setShowScene] = useState(null); // null until direct links/default mode are resolved
  const [talking, setTalking] = useState(false);
  const screenRef = useRef(null);
  const coachRef = useRef(null);
  const startedRef = useRef(false);
  const lockRef = useRef(false);
  const lastStepRef = useRef(-1);
  const lastHelpRef = useRef(0);
  const [helpTick, setHelpTick] = useState(0); // goes up each time Help is used, so the screen scrolls back to the button
  const timers = useRef([]);
  const wrongRef = useRef(0); // wrong taps this run, for the quiet level estimate (lib/adapt.js)
  const helpRef = useRef(0); // Help presses this run
  const [spoken, setSpoken] = useState({ text: null, index: -1 }); // the sentence being spoken now

  const step = lesson.steps[idx];
  const t = T[lang || 'en'];
  const total = lesson.steps.length;
  const watching = mode === 'watch';
  const stepText = watching ? (step.watchSay?.[lang || 'en'] || step.say[lang || 'en']) : step.say[lang || 'en'];
  const safetyCheck = Boolean(step.safety) || (id === 'qr-pay' && ['scam-quiz', 'decline'].includes(step.id));
  const safetyQuestion = safetyCheck && step.kind === 'quiz';
  const safetySub = step.safety?.sub?.[lang || 'en'] || t.practiceSafetySub;
  const safetyPreface = `${t.safetyHeading} ${safetySub}`;
  const instruction = idx === 0 && !mode ? t.modeTitle : safetyQuestion ? `${safetyPreface} ${stepText}` : stepText;
  const watchNarration = safetyQuestion ? [safetyPreface, stepText] : stepText;

  useEffect(() => setFrom(getFrom()), []);
  useEffect(() => onSpeechProgress(setSpoken), []);
  // Quiz steps that compare something on the screen: outline it and scroll it into view, at full size.
  useEffect(() => {
    const root = screenRef.current;
    if (!root || !lang) return;
    root.querySelectorAll('.ev-mark').forEach((e) => e.classList.remove('ev-mark'));
    const need = lesson.steps[idx] && lesson.steps[idx].kind === 'quiz' && lesson.steps[idx].focusText;
    if (!need) return;
    const tm = setTimeout(() => {
      const key = personalise(need);
      const el = [...root.querySelectorAll('*')].find((e) => e.children.length === 0 && e.textContent.trim().startsWith(key));
      if (!el) return;
      el.classList.add('ev-mark');
      const app = el.closest('.app');
      if (app) app.scrollTop = Math.max(0, el.getBoundingClientRect().top - app.getBoundingClientRect().top + app.scrollTop - 24);
    }, 120);
    return () => clearTimeout(tm);
  }, [idx, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const w = document.querySelector('.options .why');
    if (w) w.scrollIntoView({ block: 'nearest' }); // the explanation under the tapped answer stays in view
  }, [quiz]);
  useEffect(() => {
    const el = document.querySelector('.coach-text .say-now, .scene-copy .say-now');
    if (el) el.scrollIntoView({ block: 'nearest' }); // keep the sentence being spoken in view
  }, [spoken]);
  // Allow links that open straight into a mode (?mode=watch|follow|practice).
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const m = q.get('mode');
      const onboarding = q.get('onboarding') === '1';
      const selected = onboarding ? 'ask' : ['watch', 'follow', 'practice'].includes(m) ? m : getLearnMode();
      const saved = q.get('resume') === '1' ? getResume() : null;
      setShowScene(Boolean(lesson.scene && !onboarding && !(saved && saved.id === id && saved.idx < lesson.steps.length && !saved.goal)));
      if (saved?.goal && saved.id === id) setShowScene(false);
      if (saved && !saved.goal && saved.id === id && saved.idx < lesson.steps.length) {
        // Carry on where the person left off: straight back to that step, in practice mode.
        setMode('practice');
        // Reconstruct practice values needed by later screens, without storing any entered PIN.
        const restored = {};
        for (const s of lesson.steps.slice(0, saved.idx)) if (s.kind === 'input') restored[s.field] = s.anyDigits ? '•'.repeat(s.expected.length) : s.expected;
        setValues(restored);
        setIdx(saved.idx);
        track('mode_pick', { lesson: id, meta: { mode: 'practice', resumed: saved.idx } });
      } else if (selected !== 'ask') chooseMode(selected);
    } catch { setShowScene(Boolean(lesson.scene)); }
    addRecent(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lang && !startedRef.current) {
      startedRef.current = true;
      track('lesson_start', { lesson: id, meta: { lang } });
    }
  }, [lang, id]);

  // Scene narration is the only voice allowed before Ready, including saved Read defaults.
  useEffect(() => {
    if (!showScene || !lang) return;
    speak(lesson.scene.say[lang], lang);
    return () => stopSpeaking();
  }, [showScene, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Practice: Ready releases this gate, including a previously saved default mode.
  const spokenRef = useRef('');
  useEffect(() => {
    if (!lang || done || mode === 'follow' || mode === 'watch') return;
    if (showScene !== false) return;
    const key = `${idx}:${mode}:${lang}`;
    if (spokenRef.current === key) return;
    spokenRef.current = key;
    speak(instruction, lang);
    const nxt = lesson.steps[idx + 1];
    if (nxt) prefetchSpeech(nxt.say[lang], lang);
  }, [idx, lang, done, mode, showScene]); // eslint-disable-line react-hooks/exhaustive-deps

  // Remember the step, so Home can offer "Continue where you left off" after leaving halfway.
  useEffect(() => {
    if (mode === 'practice' && !done && idx >= 2) saveResume(id, idx);
  }, [idx, mode, done]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);
  useEffect(() => onSpeaking(setTalking), []);

  useEffect(() => {
    const c = coachRef.current;
    if (c && quiz) c.scrollTop = c.scrollHeight;
  }, [quiz]);

  // Always glow the element to tap, with a small "Tap here" label next to it.
  useEffect(() => {
    const root = screenRef.current;
    if (!root || !lang || mode === 'follow' || showScene !== false) return;
    root.querySelectorAll('.hl').forEach((el) => el.classList.remove('hl'));
    setBubble(null);
    if (done) return;
    const tt = T[lang];
    let sel = null;
    let label = null;
    if (step.kind === 'tap') {
      sel = `[data-t="${step.target}"]`;
      label = watching ? tt.watchTarget : tt.tapHere;
    }
    if (step.kind === 'input' && step.anyDigits) {
      const left = step.expected.length - typed.length;
      if (left > 0) {
        sel = '[data-key]:not([data-key="back"])';
        label = watching ? tt.watchCount(left) : tt.pressAny(left);
      }
    } else if (step.kind === 'input') {
      const k = step.expected[typed.length];
      if (k) {
        sel = `[data-key="${k}"]`;
        label = watching ? tt.watchKey(k) : tt.press(k);
      }
    }
    if (!sel) return;
    const els = Array.from(root.querySelectorAll(sel));
    els.forEach((el) => el.classList.add('hl'));
    const el = els[0];
    if (!el) return;
    // The part of the screen that scrolls and holds this button (null when the whole screen is fixed).
    let sc = el.parentElement;
    while (sc && sc !== root) {
      if (sc.scrollHeight > sc.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(sc).overflowY)) break;
      sc = sc.parentElement;
    }
    if (sc === root) sc = null;
    // Bring the button into view ONCE when the step starts. After that the person may scroll freely.
    const freshStep = lastStepRef.current !== idx;
    lastStepRef.current = idx;
    const helped = lastHelpRef.current !== helpTick;
    lastHelpRef.current = helpTick;
    if (helped) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (sc && (freshStep || helped)) {
      const er = el.getBoundingClientRect();
      const sr = sc.getBoundingClientRect();
      if (er.top < sr.top + 8 || er.bottom > sr.bottom - 8) sc.scrollTop += er.top - sr.top - (sr.height - er.height) / 2;
    }
    // Keep refocusing keys on Help, but use the reserved PIN prompt instead of a floating bubble.
    if (step.anyDigits && (step.screen === 'gp-pin' || step.kit === 'gp-pin')) return;
    // Everything below is measured from the inside edge of the dashed border, which is where the overlays are drawn from.
    const place = () => {
      const rb = root.getBoundingClientRect();
      const ox = rb.left + root.clientLeft;
      const oy = rb.top + root.clientTop;
      const W = root.clientWidth;
      const H = root.clientHeight;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      // Only the visible part of the button counts: not the part scrolled away or hidden behind a bar.
      let vis = { left: Math.max(r.left, ox), top: Math.max(r.top, oy), right: Math.min(r.right, ox + W), bottom: Math.min(r.bottom, oy + H) };
      if (sc) {
        const c = sc.getBoundingClientRect();
        vis = { left: Math.max(vis.left, c.left), top: Math.max(vis.top, c.top), right: Math.min(vis.right, c.right), bottom: Math.min(vis.bottom, c.bottom) };
      }
      const visW = vis.right - vis.left;
      const visH = vis.bottom - vis.top;
      const showing = visW > 8 && visH > Math.min(r.height * 0.5, 24);
      let next;
      if (!showing) {
        // Scrolled out of sight: a hand at the edge points the way back to the button.
        const up = r.bottom <= oy + H / 2;
        next = { edge: up ? 'up' : 'down', x: Math.min(Math.max(r.left + r.width / 2 - ox, 34), W - 34), y: up ? 34 : H - 34, label };
      } else if (step.kind === 'tap') {
        // Keep the hand outside the target, falling back/flipping at screen edges.
        const hand = handPosition({ left: vis.left - ox, right: vis.right - ox, top: vis.top - oy, bottom: vis.bottom - oy }, W, H);
        next = {
          compact: true,
          box: { x: vis.left - ox, y: vis.top - oy, w: visW, h: visH },
          hand,
          label,
        };
      } else {
        const half = Math.min(W / 2 - 8, Math.max(64, String(label).length * 4.8));
        const x = Math.min(Math.max(r.left - ox + r.width / 2, half), W - half);
        const above = r.top - oy > 52;
        next = { x, y: above ? r.top - oy - 10 : r.bottom - oy + 10, below: !above, label };
      }
      setBubble((prev) => (prev && JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };
    const raf = requestAnimationFrame(place);
    const tm = setTimeout(place, 400);
    // Keep the pointer on the button whenever the layout changes: the help text opening, a font loading, a bar appearing.
    const poll = setInterval(place, 250);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    if (ro) {
      ro.observe(root);
      ro.observe(el);
    }
    window.addEventListener('resize', place);
    root.addEventListener('scroll', place, true);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tm);
      clearInterval(poll);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', place);
      root.removeEventListener('scroll', place, true);
    };
  }, [idx, typed, lang, done, mode, showHint, helpTick, showScene]); // eslint-disable-line react-hooks/exhaustive-deps

  // Watch mode: play each step by itself. Each step waits for its voice to finish before the next one.
  useEffect(() => {
    if (!step.autoAdvanceMs || done || leaveOpen || showScene !== false || mode === 'follow' || !mode || (watching && paused)) return;
    if (watching) speak(watchNarration, lang);
    const timer = setTimeout(() => advance(), step.autoAdvanceMs);
    return () => clearTimeout(timer);
  }, [idx, mode, paused, showScene, done, leaveOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!step.autoAdvanceMs || muted || done || leaveOpen || showScene !== false || mode === 'follow' || !mode || (watching && paused)) return;
    return startRingtone();
  }, [idx, mode, paused, showScene, done, muted, leaveOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    clearTimers();
    if (!watching || done || !lang) return;
    if (showScene !== false) return;
    if (paused) { stopSpeaking(); return; }
    if (step.autoAdvanceMs) return; // Ringing has one fixed timer, in both Practice and Watch.
    let cancelled = false;
    const wait = (ms) => new Promise((r) => timers.current.push(setTimeout(r, ms)));
    const s = step;
    const nxt = lesson.steps[idx + 1];
    if (nxt) prefetchSpeech(nxt.watchSay?.[lang] || nxt.say[lang], lang);
    (async () => {
      await wait(WATCH.settle); // a moment to see the new screen before anything is said
      if (cancelled) return;
      if (s.kind === 'info') {
        await speak(watchNarration, lang);
        await wait(WATCH.rest);
        if (!cancelled) advance();
        return;
      }
      await speak(watchNarration, lang);
      if (cancelled) return;
      if (s.kind === 'tap') {
        await wait(WATCH.beforeTap); // look at the glowing spot
        if (cancelled) return;
        setTapFx(true);
        await wait(WATCH.tapHold);
        if (cancelled) return;
        setTapFx(false);
        await wait(WATCH.rest);
        if (cancelled) return;
        advance();
      } else if (s.kind === 'input') {
        for (let k = 0; k < s.expected.length; k++) {
          await wait(WATCH.perKey);
          if (cancelled) return;
          setTyped(s.expected.slice(0, k + 1));
        }
        await wait(WATCH.rest);
        if (cancelled) return;
        setValues((v) => ({ ...v, [s.field]: s.expected }));
        advance();
      } else if (s.kind === 'quiz') {
        const right = s.options.find((o) => o.correct);
        await wait(WATCH.beforeTap);
        if (cancelled) return;
        const why = s.watchWhy?.[lang] || right.why[lang];
        setQuiz({ correct: true, why });
        await speak(why, lang);
        await wait(WATCH.rest);
        if (!cancelled) advance();
      }
    })();
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [watching, paused, idx, done, lang, showScene]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lang || showScene === null) return <div className="page" />;

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function chooseMode(m) {
    stopSpeaking();
    if (m === 'watch' && lesson.steps.some(s => s.autoAdvanceMs) && !muted) prepareRingtone();
    setMode(m);
    track('mode_pick', { lesson: id, meta: { mode: m } });
    if (m === 'practice') setIdx(1);
    if (m === 'watch') {
      setPaused(false);
      setIdx(1);
    }
  }

  function advance() {
    stopSpeaking();
    lockRef.current = false;
    setShowHint(false);
    setQuiz(null);
    setTyped('');
    if (idx + 1 >= total) finish();
    else setIdx(idx + 1);
  }

  function finish() {
    setDone(true);
    stopSpeaking();
    clearTimers();
    if (lesson.closing && mode !== 'follow') speak((watching ? lesson.watchClosing : lesson.closing)[lang], lang);
    track('lesson_complete', { lesson: id, meta: { mode } });
    track('lesson_completed', {lesson:id,meta:{lessonId:id,mode:mode === 'practice' ? 'try' : mode === 'follow' ? 'read' : 'watch'}});
    markDone(id);
    clearResume(id);
    if (mode === 'practice') recordPerf({ id, level: levelOf(lesson), wrong: wrongRef.current, hints: helpRef.current, steps: total });
  }

  function correct() {
    if (lesson.steps[idx + 1]?.autoAdvanceMs && !muted) prepareRingtone();
    track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    lockRef.current = true;
    vibrate(25);
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      advance();
    }, 450);
  }

  // Only a tap on the wrong button or key counts. A tap on blank space is free. The spoken hint starts with the second wrong tap.
  function wrong(meta = {}) {
    if (meta.tapped === null) return;
    wrongRef.current++;
    stepWrongRef.current++;
    track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, ...meta } });
    vibrate([40, 60, 40]);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    if (stepWrongRef.current >= 2) {
      setShowHint(true);
      setHelpTick((n) => n + 1);
      if (step.hint) speak(step.hint[lang], lang);
    }
  }

  function onScreenClick(e) {
    if (lockRef.current || mode !== 'practice') return;
    if (step.kind === 'tap') {
      const el = e.target.closest('[data-t]');
      if (el && el.dataset.t === step.target) correct();
      else wrong({ tapped: el ? el.dataset.t : null });
    } else if (step.kind === 'input') {
      const key = e.target.closest('[data-key]');
      if (!key) return;
      const k = key.dataset.key;
      if (k === 'back') {
        setTyped(typed.slice(0, -1));
        return;
      }
      if (step.anyDigits) {
        // Any digits are fine, and nothing typed is kept: only dots are drawn.
        if (!/^\d$/.test(k)) return;
        const nextTyped = typed + k;
        setTyped(nextTyped);
        if (nextTyped.length === step.expected.length) {
          setValues({ ...values, [step.field]: '•'.repeat(nextTyped.length) });
          correct();
        }
        return;
      }
      if (step.expected[typed.length] === k) {
        const nextTyped = typed + k;
        setTyped(nextTyped);
        if (nextTyped === step.expected) {
          setValues({ ...values, [step.field]: nextTyped });
          correct();
        }
      } else {
        wrong({ key: k });
      }
    }
  }

  function askHelp() {
    helpRef.current++;
    track('hint', { lesson: id, step: idx, meta: { id: step.id } });
    setShowHint(true);
    setHelpTick((n) => n + 1);
    speak((step.hint || step.say)[lang], lang);
  }

  function pickOption(o) {
    if (quiz) return;
    if (o.correct) track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    else {
      wrongRef.current++;
      track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, quiz: true } });
    }
    setQuiz({ correct: o.correct, why: o.why[lang], pick: o });
    speak(o.why[lang], lang);
  }

  function restart(m = 'practice') {
    clearTimers();
    wrongRef.current = 0;
    helpRef.current = 0;
    setValues({});
    setTyped('');
    setQuiz(null);
    setShowHint(false);
    setDone(false);
    setShowScene(Boolean(lesson.scene));
    spokenRef.current = '';
    setMode(m);
    setPaused(false);
    setIdx(m === 'follow' ? 0 : 1);
    track('lesson_start', { lesson: id, meta: { lang, again: true, mode: m } });
  }

  // Watch controls
  function watchBack() {
    clearTimers();
    setQuiz(null);
    setTyped('');
    setIdx((i) => Math.max(1, i - 1));
  }
  function watchNext() {
    clearTimers();
    if (step.kind === 'input') setValues((v) => ({ ...v, [step.field]: step.expected }));
    advance();
  }
  function tryMyself() {
    clearTimers();
    setQuiz(null);
    setTyped('');
    setMode('practice');
    track('mode_pick', { lesson: id, meta: { mode: 'practice', from: 'watch' } });
  }

  // Leaving with some progress asks first, so one slip of the thumb does not lose the lesson.
  const askLeave = () => {
    if (mode && mode !== 'follow' && idx > 1) setLeaveOpen(true);
    else {
      stopSpeaking();
      router.push('/');
    }
  };
  const leaveDialog = leaveOpen && (
    <div className="pi-wrap" role="dialog" aria-modal="true">
      <div className="pi-card">
        <h2>{t.leaveTitle}</h2>
        <p>{t.leaveSub}</p>
        <button className="btn primary" onClick={() => setLeaveOpen(false)}>
          {t.leaveStay}
        </button>
        <Link href="/" className="btn ghost" onClick={() => stopSpeaking()}>
          {t.leaveGo}
        </Link>
      </div>
    </div>
  );

  const settings = showSettings && (
    <Settings lang={lang} setLang={setLang} muted={muted} toggleMute={toggleMute} onClose={() => setShowSettings(false)} onMismatch={() => track('screen_mismatch', { lesson: id, step: idx, meta: { id: step.id, screen: step.screen, kit: step.kit || null, lang, mode } })} />
  );

  if (showScene) return (
    <div className="player scene-player">
      <div className="ptop">
        <button className="ptop-leave" onClick={askLeave}><Icon name="close" size={20} /> {t.leaveBtn}</button>
      </div>
      <main className="scene-body">
        <div className="practice-tag">{t.practiceTag}</div>
        <div className={`scene-art art-${lesson.scene.art || 0}`} aria-hidden="true" />
        <h1>{t.sceneHeading}</h1>
        <div className="scene-copy">{(() => { let offset = 0; return lesson.scene.say[lang].split(/\n\n/).map((p, i) => <p key={i}>{sentences(p).map((s, j) => { const at = offset++; return <span key={j} className={spoken.text === lesson.scene.say[lang] && spoken.index === at ? 'say-now' : undefined}>{s}{' '}</span>; })}</p>); })()}</div>
        <button className="btn primary" onClick={() => { stopSpeaking(); if (lesson.steps.some(s => s.autoAdvanceMs) && !muted) prepareRingtone(); setShowScene(false); }}>{t.sceneReady}</button>
        <button className="link-btn scene-listen" onClick={() => speak(lesson.scene.say[lang], lang, { force: true })}>{t.listen}</button>
      </main>
      {leaveDialog}
    </div>
  );

  if (!mode && !done) return (
    <div className="player scene-player mode-player learn-mode-v2">
      <div className="ptop"><button className="ptop-leave" onClick={askLeave}><Icon name="close" size={20} /> {t.leaveBtn}</button></div>
      <main className="scene-body modes">
        <div className="learn-lesson-context" data-app={lesson.app}><AppIcon app={lesson.app} size={52} /><div><p>{t.learnLessonMeta(lesson.minutes)}</p><b>{lesson.title[lang]}</b></div></div>
        <h1>{t.modeTitle}</h1>
        {[
          ['practice', 'hand', t.learnModePractice, t.learnModePracticeSub],
          ['watch', 'play', t.learnModeWatch, t.learnModeWatchSub],
          ['follow', 'list', t.modeFollow, t.learnModeReadSub],
        ].map(([m, ic, title, sub]) => <button key={m} className="mode-card" onClick={() => chooseMode(m)}><span className="mode-ic"><Icon name={ic} size={28} /></span><span className="mode-tx"><b>{title}</b><small>{sub}</small></span><Icon name="chevron" size={20} /></button>)}
        <div className="mode-sharing"><p>{t.modeHelper}</p><ShareLesson id={id} title={lesson.title[lang]} lang={lang} t={t} where="mode_picker" look="text" text={t.modeSend} native /></div>
      </main>
    </div>
  );

  if (done) return <LessonEnd lesson={lesson} lang={lang} t={t} mode={mode} onRestart={restart} />;

  if (mode === 'follow') {
    return (
      <div className="player reading has-nav">
        <div className="ptop">
          <button className="ptop-leave" onClick={askLeave}>
            <Icon name="close" size={20} /> {t.leaveBtn}
          </button>
          <div className="progress" />
          <LessonPrint lesson={lesson} lang={lang} t={t} variant="icon" />
          <button className="ptop-btn" onClick={() => setShowSettings(true)} aria-label="Settings">
            <Icon name="gear" size={24} />
          </button>
        </div>
        <FollowView lesson={lesson} lang={lang} t={t} onDone={finish} onPractice={() => restart('practice')} />
        <BottomNav active="learn" t={t} />
        {settings}
        {leaveDialog}
      </div>
    );
  }

  const coachText = showHint && step.hint ? step.hint[lang] : stepText;
  const choosing = !mode && idx === 0;

  return (
    <div className={`player stage ${watching ? 'is-watching' : ''} ${step.kind === 'quiz' ? 'is-quiz' : ''} ${safetyCheck ? 'safety-check' : ''} ${step.screen === 'gp-pin' || step.kit === 'gp-pin' ? 'pin-stage' : ''} ${['practice-sms', 'practice-call', 'practice-police', 'practice-bank', 'receipt-share'].includes(step.screen) ? 'extras-stage' : ''}`}>
      <div className="ptop">
        <button className="ptop-leave" onClick={askLeave}>
          <Icon name="close" size={20} /> {t.leaveBtn}
        </button>
        <div className="progress">
          <div className="bar">
            <span style={{ width: `${(idx / total) * 100}%` }} />
          </div>
          <small>{idx === 0 ? '' : watching ? `${t.watching}: ${t.step(idx, total - 1)}` : t.step(idx, total - 1)}</small>
        </div>
        <LessonPrint lesson={lesson} lang={lang} t={t} variant="icon" />
        <button className="ptop-btn" onClick={() => setShowSettings(true)} aria-label="Settings">
          <Icon name="gear" size={24} />
        </button>
      </div>

      <div className="screen-wrap">
      <div className="practice-tag">{safetyCheck ? (step.safety?.banner?.[lang] || t.practiceSafetyBanner) : t.practiceTag}</div>
      <div
        className={`screen ${flash ? 'flash' : ''} ${tapFx ? 'tapfx' : ''} ${shake ? 'shake' : ''} ${watching ? 'watching' : ''} ${id === 'qr-pay' && step.id === 'check-name' ? 'with-shop-board' : ''}`}
        ref={screenRef}
        onClick={onScreenClick}
      >
        {id === 'qr-pay' && step.id === 'check-name' && <div className="shop-board"><span aria-hidden="true">🏪</span> {t.shopBoard}</div>}
        <Screen step={step} lesson={lesson} lang={lang} t={t} values={values} typed={typed} watching={watching} />
        <div className="practice-mark" lang={lang} aria-hidden="true">
          <span>{t.practiceMark}</span>
        </div>
        {bubble && bubble.edge && (
          <div className="tap-hand edge" style={{ left: bubble.x, top: bubble.y }} aria-hidden="true">
            {bubble.edge === 'up' ? '👆' : '👇'}
          </div>
        )}
        {bubble && !bubble.edge && (
          bubble.compact ? (
            <>
              <div className="tap-tint" style={{ left: bubble.box.x, top: bubble.box.y, width: bubble.box.w, height: bubble.box.h }} aria-hidden="true" />
              {bubble.hand && <div className={`tap-hand target-hand hand-${bubble.hand.direction}`} style={{ left: bubble.hand.x, top: bubble.hand.y, width: bubble.hand.size, height: bubble.hand.size, marginLeft: -bubble.hand.size / 2, marginTop: -bubble.hand.size / 2 }} aria-hidden="true"><span>👆</span></div>}
            </>
          ) : (
            <div className={`tap-bubble ${bubble.below ? 'below' : ''}`} style={{ left: bubble.x, top: bubble.y }}>
              👆 {bubble.label}
            </div>
          )
        )}
      </div>
      </div>

      <div className={`coach ${showHint ? 'hinting' : ''}`} ref={coachRef}>
        {safetyQuestion && <div className="safety-heading"><Icon name="shieldCheck" size={30} /><div><h2>{t.safetyHeading}</h2><p>{safetySub}</p></div></div>}
        <p className="coach-text">
          {spoken.text === coachText && sentences(coachText).length > 1
            ? sentences(coachText).map((s, i) => (
                <span key={i} className={i === spoken.index ? 'say-now' : undefined}>
                  {s}{' '}
                </span>
              ))
            : coachText}
        </p>

        {choosing && (
          <div className="modes">
            <b className="modes-h">{t.modeTitle}</b>
            {[
              ['practice', 'hand', t.modePractice, t.modePracticeSub],
              ['watch', 'play', t.modeWatch, t.modeWatchSub],
              ['follow', 'list', t.modeFollow, t.modeFollowSub],
            ].map(([m, ic, title, sub]) => (
              <button key={m} className={`mode-card ${m === 'practice' ? 'main' : ''}`} onClick={() => chooseMode(m)}>
                <span className="mode-ic">
                  <Icon name={ic} size={24} />
                </span>
                <span className="mode-tx">
                  <b>{title}</b>
                  <small>{sub}</small>
                </span>
                <Icon name="chevron" size={20} />
              </button>
            ))}
          </div>
        )}

        {step.kind === 'quiz' && (
          <div className="options">
            {step.options
              .filter((o) => !(quiz && quiz.correct) || o.correct)
              .map((o, i) => (
                <div key={i} className="opt-wrap">
                  <button className={`opt ${quiz && o.correct ? 'right' : ''} ${quiz && quiz.pick === o && !o.correct ? 'wrong' : ''}`} disabled={Boolean(quiz) || watching} onClick={() => pickOption(o)}>
                    {quiz && (o.correct || quiz.pick === o) && <span aria-hidden="true">{o.correct ? '✓ ' : '✕ '}</span>}
                    {o.text[lang]}
                  </button>
                </div>
              ))}
            {quiz && <p className="why good">{quiz.why}</p>}
            {quiz && !watching && (
              <button className="btn primary" onClick={advance}>
                {t.next}
              </button>
            )}
          </div>
        )}

        {mode === 'practice' && step.kind === 'info' && idx > 0 && !step.autoAdvanceMs && (
          <button className="btn primary" onClick={advance}>
            {(step.button && step.button[lang]) || t.next}
          </button>
        )}

        {watching ? (
          <div className="coach-actions">
            <button className="chip" onClick={watchBack} aria-label={t.back}>
              <Icon name="prev" size={18} />
            </button>
            <button className="chip big" onClick={() => setPaused((p) => !p)}>
              <Icon name={paused ? 'play' : 'pause'} size={18} /> {paused ? t.play : t.pause}
            </button>
            <button className="chip" onClick={watchNext} aria-label={t.next}>
              <Icon name="next" size={18} />
            </button>
            <button className="chip" onClick={tryMyself}>
              <Icon name="hand" size={18} /> {t.tryMyself}
            </button>
          </div>
        ) : (
          <div className="coach-actions">
            <button className={`chip ${talking ? 'talking' : ''}`} onClick={() => { setShowHint(false); speak(instruction, lang, { force: true }); }}>
              <Icon name="volume" size={20} /> {talking ? t.speakingNow : t.listen}
            </button>
            {mode === 'practice' && idx > 1 && (
              <button
                className="chip"
                onClick={() => {
                  clearTimers();
                  setQuiz(null);
                  setTyped('');
                  setShowHint(false);
                  setIdx((i) => Math.max(1, i - 1));
                }}
              >
                <Icon name="prev" size={18} /> {t.prevStep}
              </button>
            )}
            {mode === 'practice' && (step.kind === 'tap' || step.kind === 'input') && (
              <button className="chip" onClick={askHelp}>
                <Icon name="bulb" size={20} /> {t.help}
              </button>
            )}
          </div>
        )}
      </div>
      {settings}
      {leaveDialog}
    </div>
  );
}
