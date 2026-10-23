'use client';
// One lesson, three ways to learn:
//  practice: the parent taps through practice screens themselves (default)
//  watch:    plays by itself like a video, with voice and glowing taps
//  follow:   one step at a time, worded for the real app, so they can do it on their own phone
import { canOpenApp, openRealApp } from '@/lib/openApp';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Screen from './Screens';
import PracticeIntro from './PracticeIntro';
import { watchPersona, personalise } from '@/lib/persona';
import { recordPerf } from '@/lib/adapt';
import { levelOf } from '@/lib/levels';
import { sentences } from '@/lib/sentences';
import Settings from './Settings';
import FollowView from './FollowView';
import LessonPrint from './LessonPrint';
import Icon from './Icons';
import { LESSONS } from '@/lib/lessons';
import { T } from '@/lib/i18n';
import { useLang, useMute, speak, stopSpeaking, prefetchSpeech, onSpeaking, track, getFrom, whatsappLink, markDone, vibrate, getLearnMode, addRecent, isPracticeSeen, setPracticeSeen, onSpeechProgress } from '@/lib/client';

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
  const [feedback, setFeedback] = useState(null);
  const [fbReasons, setFbReasons] = useState([]);
  const [fbNote, setFbNote] = useState('');
  const [fbSent, setFbSent] = useState(false);
  const [realTry, setRealTry] = useState(false);
  const [from, setFrom] = useState('');
  const [bubble, setBubble] = useState(null);
  const router = useRouter();
  const stepWrongRef = useRef(0);
  const [leaveOpen, setLeaveOpen] = useState(false);
  useEffect(() => {
    stepWrongRef.current = 0;
  }, [idx]);
  const [showSettings, setShowSettings] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [talking, setTalking] = useState(false);
  const screenRef = useRef(null);
  const coachRef = useRef(null);
  const startedRef = useRef(false);
  const lockRef = useRef(false);
  const timers = useRef([]);
  const wrongRef = useRef(0); // wrong taps this run, for the quiet level estimate (lib/adapt.js)
  const helpRef = useRef(0); // Help presses this run
  const [spoken, setSpoken] = useState({ text: null, index: -1 }); // the sentence being spoken now

  const step = lesson.steps[idx];
  const t = T[lang || 'en'];
  const total = lesson.steps.length;
  const watching = mode === 'watch';

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
    const el = document.querySelector('.coach-text .say-now');
    if (el) el.scrollIntoView({ block: 'nearest' }); // keep the sentence being spoken in view
  }, [spoken]);
  useEffect(() => setShowIntro(!isPracticeSeen()), []);

  // Allow links that open straight into a mode (?mode=watch|follow|practice).
  useEffect(() => {
    try {
      const m = new URLSearchParams(window.location.search).get('mode');
      if (m === 'watch' || m === 'follow' || m === 'practice') chooseMode(m);
      else {
        const pref = getLearnMode();
        if (pref !== 'ask') chooseMode(pref);
      }
    } catch {}
    addRecent(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lang && !startedRef.current) {
      startedRef.current = true;
      track('lesson_start', { lesson: id, meta: { lang } });
    }
  }, [lang, id]);

  // Practice: read each step aloud when it appears, and get the next one ready.
  useEffect(() => {
    if (!lang || done || mode === 'follow' || mode === 'watch') return;
    speak(step.say[lang], lang);
    const nxt = lesson.steps[idx + 1];
    if (nxt) prefetchSpeech(nxt.say[lang], lang);
  }, [idx, lang, done, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);
  useEffect(() => onSpeaking(setTalking), []);

  useEffect(() => {
    const c = coachRef.current;
    if (c && quiz) c.scrollTop = c.scrollHeight;
  }, [quiz]);

  // Always glow the element to tap, with a small "Tap here" label next to it.
  useEffect(() => {
    const root = screenRef.current;
    if (!root || !lang || mode === 'follow') return;
    root.querySelectorAll('.hl').forEach((el) => el.classList.remove('hl'));
    setBubble(null);
    if (done) return;
    const tt = T[lang];
    let sel = null;
    let label = null;
    if (step.kind === 'tap') {
      sel = `[data-t="${step.target}"]`;
      label = tt.tapHere;
    }
    if (step.kind === 'input' && step.anyDigits) {
      const left = step.expected.length - typed.length;
      if (left > 0) {
        sel = '[data-key]:not([data-key="back"])';
        label = tt.pressAny(left);
      }
    } else if (step.kind === 'input') {
      const k = step.expected[typed.length];
      if (k) {
        sel = `[data-key="${k}"]`;
        label = tt.press(k);
      }
    }
    if (!sel) return;
    const els = Array.from(root.querySelectorAll(sel));
    els.forEach((el) => el.classList.add('hl'));
    const el = els[0];
    if (!el) return;
    try {
      el.scrollIntoView({ block: 'nearest' });
    } catch {}
    const place = () => {
      const r = el.getBoundingClientRect();
      const R = root.getBoundingClientRect();
      if (!r.width) return;
      const half = Math.min(R.width / 2 - 8, Math.max(64, String(label).length * 4.8));
      const x = Math.min(Math.max(r.left - R.left + r.width / 2, half), R.width - half);
      const above = r.top - R.top > 52;
      if (step.kind === 'tap') {
        // A small hand on the corner of the button: it never covers a neighbouring icon or its name.
        const off = r.bottom < R.top + 6 ? 'up' : r.top > R.bottom - 6 ? 'down' : null; // the target is scrolled out of view
        setBubble({ compact: true, off, x: Math.min(Math.max(r.right - R.left - 8, 22), R.width - 22), y: Math.min(Math.max(r.bottom - R.top - 6, 22), R.height - 22), label });
        return;
      }
      setBubble({ x, y: above ? r.top - R.top - 10 : r.bottom - R.top + 10, below: !above, label });
    };
    const raf = requestAnimationFrame(place);
    const tm = setTimeout(place, 400);
    window.addEventListener('resize', place);
    root.addEventListener('scroll', place, true);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tm);
      window.removeEventListener('resize', place);
      root.removeEventListener('scroll', place, true);
    };
  }, [idx, typed, lang, done, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Watch mode: play each step by itself. Each step waits for its voice to finish before the next one.
  useEffect(() => {
    clearTimers();
    if (!watching || done || !lang) return;
    if (paused) {
      stopSpeaking();
      return;
    }
    let cancelled = false;
    const wait = (ms) => new Promise((r) => timers.current.push(setTimeout(r, ms)));
    const s = step;
    const nxt = lesson.steps[idx + 1];
    if (nxt) prefetchSpeech(nxt.say[lang], lang);
    (async () => {
      await wait(WATCH.settle); // a moment to see the new screen before anything is said
      if (cancelled) return;
      if (s.kind === 'info') {
        await speak(s.say[lang], lang);
        await wait(WATCH.rest);
        if (!cancelled) advance();
        return;
      }
      await speak(s.say[lang], lang);
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
        setQuiz({ correct: true, why: right.why[lang] });
        await speak(right.why[lang], lang);
        await wait(WATCH.rest);
        if (!cancelled) advance();
      }
    })();
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [watching, paused, idx, done, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lang) return <div className="page" />;

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function chooseMode(m) {
    setMode(m);
    track('mode_pick', { lesson: id, meta: { mode: m } });
    if (m === 'practice') setIdx(1);
    if (m === 'watch') {
      setPaused(false);
      setIdx(1);
    }
  }

  function advance() {
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
    track('lesson_complete', { lesson: id, meta: { mode } });
    markDone(id);
    if (mode === 'practice') recordPerf({ id, level: levelOf(lesson), wrong: wrongRef.current, hints: helpRef.current, steps: total });
  }

  function correct() {
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
    speak((step.hint || step.say)[lang], lang);
  }

  function pickOption(o) {
    if (quiz && quiz.correct) return;
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
    setFeedback(null);
    setFbReasons([]);
    setFbNote('');
    setFbSent(false);
    setRealTry(false);
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
    <Settings lang={lang} setLang={setLang} muted={muted} toggleMute={toggleMute} onClose={() => setShowSettings(false)} onPracticeInfo={() => { setShowSettings(false); setShowIntro(true); }} />
  );

  const intro = showIntro && (
    <PracticeIntro
      t={t}
      onClose={() => {
        setPracticeSeen();
        setShowIntro(false);
      }}
    />
  );

  if (done) {
    return (
      <div className="page done">
        <div className="done-medal">
          <Icon name="check" size={56} stroke={3} />
        </div>
        <h1 className="done-title">{t.doneTitle}</h1>
        <p className="done-sub">{t.doneSub}</p>
        <p className="done-lesson">{lesson.title[lang]}</p>
        <ul className="takeaways">
          {lesson.takeaways[lang].map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ul>

        {mode !== 'practice' ? (
          <button className="btn primary" onClick={() => restart('practice')}>
            <Icon name="hand" size={22} /> {t.nowPractise}
          </button>
        ) : (
          !realTry && (
            <button
              className="btn primary"
              onClick={() => {
                setRealTry(true);
                track('real_try', { lesson: id });
              }}
            >
              <Icon name="recharge" size={22} /> {t.tryReal}
            </button>
          )
        )}
        {realTry && (
          <>
            <p className="note">{lesson.realTry[lang]}</p>
            {canOpenApp(lesson.app) && (
              <button
                className="btn primary"
                onClick={() => {
                  track('open_real_app', { lesson: id, meta: { app: lesson.app } });
                  openRealApp(lesson.app);
                }}
              >
                <Icon name="play" size={22} /> {t.openRealApp(lesson.appName || lesson.app)}
              </button>
            )}
            <button className="btn ghost" onClick={() => restart('follow')}>
              <Icon name="list" size={22} /> {t.modeFollow}
            </button>
          </>
        )}

        <div className="feedback">
          <p>{t.howWasIt}</p>
          {feedback && (feedback !== 'hard' || fbSent) ? (
            <p className="thanks">{t.thanks}</p>
          ) : feedback ? (
            <div className="fb-more">
              <p>{t.fbWhy}</p>
              <div className="fb-reasons">
                {['stuck', 'mismatch', 'words', 'other'].map((k) => (
                  <button
                    key={k}
                    className={`chip ${fbReasons.includes(k) ? 'talking' : ''}`}
                    aria-pressed={fbReasons.includes(k)}
                    onClick={() => setFbReasons(fbReasons.includes(k) ? fbReasons.filter((x) => x !== k) : [...fbReasons, k])}
                  >
                    {t['fbr_' + k]}
                  </button>
                ))}
              </div>
              <button
                className="btn primary"
                onClick={() => {
                  track('feedback_detail', { lesson: id, meta: { v: feedback, reasons: fbReasons, note: '', lang, mode, steps: total } });
                  setFbSent(true);
                }}
              >
                {t.fbSend}
              </button>
            </div>
          ) : (
            <div className="fb-row">
              {[
                ['easy', '😊', t.easy],
                ['okay', '😐', t.okay],
                ['hard', '😟', t.hard],
              ].map(([v, e, label]) => (
                <button
                  key={v}
                  className="fb"
                  onClick={() => {
                    setFeedback(v);
                    track('feedback', { lesson: id, meta: { v, mode, lang } });
                  }}
                >
                  <span>{e}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link className="btn ghost" href="/">
          {t.otherLessons}
        </Link>
        <div className="done-quiet">
          <LessonPrint lesson={lesson} lang={lang} t={t} variant="link" />
          <button className="link-btn" onClick={() => restart(mode || 'practice')}>
            {t.practiceAgain}
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'follow') {
    return (
      <div className="player reading">
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
        {settings}
        {intro}
        {leaveDialog}
      </div>
    );
  }

  const coachText = showHint && step.hint ? step.hint[lang] : step.say[lang];
  const choosing = !mode && idx === 0;

  return (
    <div className={`player stage ${step.kind === 'quiz' ? 'is-quiz' : ''}`}>
      <div className="ptop">
        <button className="ptop-leave" onClick={askLeave}>
          <Icon name="close" size={20} /> {t.leaveBtn}
        </button>
        <div className="progress">
          <div className="bar">
            <span style={{ width: `${(idx / total) * 100}%` }} />
          </div>
          <small>{watching ? `${t.watching}: ${t.step(idx + 1, total)}` : t.step(idx + 1, total)}</small>
        </div>
        <LessonPrint lesson={lesson} lang={lang} t={t} variant="icon" />
        <button className="ptop-btn" onClick={() => setShowSettings(true)} aria-label="Settings">
          <Icon name="gear" size={24} />
        </button>
      </div>

      <div className="screen-wrap">
      <div className="practice-tag">{t.practiceTag}</div>
      <div
        className={`screen ${flash ? 'flash' : ''} ${tapFx ? 'tapfx' : ''} ${shake ? 'shake' : ''} ${watching ? 'watching' : ''}`}
        ref={screenRef}
        onClick={onScreenClick}
      >
        <Screen step={step} lesson={lesson} lang={lang} t={t} values={values} typed={typed} />
        {bubble && (
          bubble.compact ? (
            bubble.off ? (
              <div className={`tap-off ${bubble.off}`} aria-hidden="true">
                {bubble.off === 'up' ? '⬆' : '⬇'} {bubble.label}
              </div>
            ) : (
              <div className="tap-hand" style={{ left: bubble.x, top: bubble.y }} aria-hidden="true">
                👆
              </div>
            )
          ) : (
            <div className={`tap-bubble ${bubble.below ? 'below' : ''}`} style={{ left: bubble.x, top: bubble.y }}>
              👆 {bubble.label}
            </div>
          )
        )}
      </div>
      </div>

      <div className={`coach ${showHint ? 'hinting' : ''}`} ref={coachRef}>
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
                  <button className={`opt ${quiz && quiz.correct && o.correct ? 'right' : ''}`} onClick={() => !watching && pickOption(o)}>
                    {o.text[lang]}
                  </button>
                  {quiz && quiz.pick === o && <p className={`why ${quiz.correct ? 'good' : 'bad'}`}>{quiz.why}</p>}
                </div>
              ))}
            {quiz && !quiz.pick && <p className={`why ${quiz.correct ? 'good' : 'bad'}`}>{quiz.why}</p>}
            {quiz && quiz.correct && !watching && (
              <button className="btn primary" onClick={advance}>
                {t.next}
              </button>
            )}
          </div>
        )}

        {mode === 'practice' && step.kind === 'info' && idx > 0 && (
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
            <button className={`chip ${talking ? 'talking' : ''}`} onClick={() => speak(coachText, lang, { force: true })}>
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
      {intro}
      {leaveDialog}
    </div>
  );
}
