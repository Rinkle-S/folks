'use client';
// One lesson, three ways to learn:
//  practice: the parent taps through practice screens themselves (default)
//  watch:    plays by itself like a video, with voice and glowing taps
//  follow:   one step at a time, worded for the real app, so they can do it on their own phone
import { canOpenApp, openRealApp } from '@/lib/openApp';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Screen from './Screens';
import PracticeIntro from './PracticeIntro';
import { watchPersona } from '@/lib/persona';
import Settings from './Settings';
import FollowView from './FollowView';
import Icon from './Icons';
import { LESSONS } from '@/lib/lessons';
import { T } from '@/lib/i18n';
import { useLang, useMute, speak, stopSpeaking, prefetchSpeech, onSpeaking, track, getFrom, whatsappLink, markDone, vibrate, getLearnMode, addRecent, isPracticeSeen, setPracticeSeen } from '@/lib/client';

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
  const [realTry, setRealTry] = useState(false);
  const [from, setFrom] = useState('');
  const [bubble, setBubble] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [talking, setTalking] = useState(false);
  const screenRef = useRef(null);
  const coachRef = useRef(null);
  const startedRef = useRef(false);
  const lockRef = useRef(false);
  const timers = useRef([]);

  const step = lesson.steps[idx];
  const t = T[lang || 'en'];
  const total = lesson.steps.length;
  const watching = mode === 'watch';

  useEffect(() => setFrom(getFrom()), []);
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
      if (s.kind === 'info') {
        await wait(1200);
        if (!cancelled) advance();
        return;
      }
      await speak(s.say[lang], lang);
      if (cancelled) return;
      if (s.kind === 'tap') {
        await wait(400);
        if (cancelled) return;
        setTapFx(true);
        await wait(700);
        if (cancelled) return;
        setTapFx(false);
        advance();
      } else if (s.kind === 'input') {
        for (let k = 0; k < s.expected.length; k++) {
          await wait(550);
          if (cancelled) return;
          setTyped(s.expected.slice(0, k + 1));
        }
        await wait(700);
        if (cancelled) return;
        setValues((v) => ({ ...v, [s.field]: s.expected }));
        advance();
      } else if (s.kind === 'quiz') {
        const right = s.options.find((o) => o.correct);
        await wait(500);
        if (cancelled) return;
        setQuiz({ correct: true, why: right.why[lang] });
        await speak(right.why[lang], lang);
        await wait(800);
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

  function wrong(meta = {}) {
    track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, ...meta } });
    vibrate([40, 60, 40]);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setShowHint(true);
    if (step.hint) speak(step.hint[lang], lang);
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
    track('hint', { lesson: id, step: idx, meta: { id: step.id } });
    setShowHint(true);
    speak((step.hint || step.say)[lang], lang);
  }

  function pickOption(o) {
    if (quiz && quiz.correct) return;
    if (o.correct) track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    else track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, quiz: true } });
    setQuiz({ correct: o.correct, why: o.why[lang] });
    speak(o.why[lang], lang);
  }

  function restart(m = 'practice') {
    clearTimers();
    setValues({});
    setTyped('');
    setQuiz(null);
    setShowHint(false);
    setDone(false);
    setFeedback(null);
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
    const shareText = `${lesson.share[lang]}\n${typeof window !== 'undefined' ? window.location.origin : ''}`;
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

        {mode !== 'practice' && (
          <button className="btn primary" onClick={() => restart('practice')}>
            <Icon name="hand" size={22} /> {t.nowPractise}
          </button>
        )}
        {mode === 'practice' && (
          <button
            className="btn primary"
            onClick={() => {
              setRealTry(true);
              track('real_try', { lesson: id });
            }}
          >
            <Icon name="recharge" size={22} /> {t.tryReal}
          </button>
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

        <a
          className="btn wa-btn"
          href={whatsappLink(shareText)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('share', { lesson: id })}
        >
          <Icon name="share" size={22} /> {t.tellChild(from)}
        </a>

        <div className="feedback">
          <p>{t.howWasIt}</p>
          {feedback ? (
            <p className="thanks">{t.thanks}</p>
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
                    track('feedback', { lesson: id, meta: { v, mode } });
                  }}
                >
                  <span>{e}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="done-links">
          <button className="btn ghost" onClick={() => restart(mode || 'practice')}>
            {t.practiceAgain}
          </button>
          <Link className="btn ghost" href="/">
            {t.otherLessons}
          </Link>
        </div>
      </div>
    );
  }

  if (mode === 'follow') {
    return (
      <div className="player reading">
        <div className="ptop">
          <Link href="/" className="ptop-btn" onClick={() => stopSpeaking()} aria-label={t.exit}>
            <Icon name="close" size={24} />
          </Link>
          <div className="progress" />
          <button className="ptop-btn" onClick={() => setShowSettings(true)} aria-label="Settings">
            <Icon name="gear" size={24} />
          </button>
        </div>
        <FollowView lesson={lesson} lang={lang} t={t} onDone={finish} onPractice={() => restart('practice')} />
        {settings}
        {intro}
      </div>
    );
  }

  const coachText = showHint && step.hint ? step.hint[lang] : step.say[lang];
  const choosing = !mode && idx === 0;

  return (
    <div className="player stage">
      <div className="ptop">
        <Link href="/" className="ptop-btn" onClick={() => stopSpeaking()} aria-label={t.exit}>
          <Icon name="close" size={24} />
        </Link>
        <div className="progress">
          <div className="bar">
            <span style={{ width: `${(idx / total) * 100}%` }} />
          </div>
          <small>{watching ? `${t.watching}: ${t.step(idx + 1, total)}` : t.step(idx + 1, total)}</small>
        </div>
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
          <div className={`tap-bubble ${bubble.below ? 'below' : ''}`} style={{ left: bubble.x, top: bubble.y }}>
            👆 {bubble.label}
          </div>
        )}
      </div>
      </div>

      <div className={`coach ${showHint ? 'hinting' : ''}`} ref={coachRef}>
        <p className="coach-text">{coachText}</p>

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
                <button
                  key={i}
                  className={`opt ${quiz && quiz.correct && o.correct ? 'right' : ''}`}
                  onClick={() => !watching && pickOption(o)}
                >
                  {o.text[lang]}
                </button>
              ))}
            {quiz && <p className={`why ${quiz.correct ? 'good' : 'bad'}`}>{quiz.why}</p>}
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
    </div>
  );
}
