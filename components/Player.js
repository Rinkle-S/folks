'use client';
// One lesson, three ways to learn:
//  practice: the parent taps through practice screens themselves (default)
//  watch:    plays by itself like a video, with voice and glowing taps
//  follow:   one step at a time, worded for the real app, so they can do it on their own phone
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Screen from './Screens';
import Settings from './Settings';
import FollowView from './FollowView';
import { LESSONS } from '@/lib/lessons';
import { T } from '@/lib/i18n';
import { useLang, useMute, speak, stopSpeaking, track, getFrom, whatsappLink } from '@/lib/client';

export default function Player({ id }) {
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
  const [tapFx, setTapFx] = useState(false);
  const [paused, setPaused] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [realTry, setRealTry] = useState(false);
  const [from, setFrom] = useState('');
  const [bubble, setBubble] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
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

  // Allow links that open straight into a mode (?mode=watch|follow|practice).
  useEffect(() => {
    try {
      const m = new URLSearchParams(window.location.search).get('mode');
      if (m === 'watch' || m === 'follow' || m === 'practice') chooseMode(m);
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lang && !startedRef.current) {
      startedRef.current = true;
      track('lesson_start', { lesson: id, meta: { lang } });
    }
  }, [lang, id]);

  // Speak each step when it appears (practice and watch).
  useEffect(() => {
    if (!lang || done || mode === 'follow') return;
    speak(step.say[lang], lang);
  }, [idx, lang, done, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);

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
    if (step.kind === 'input') {
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
      const x = Math.min(Math.max(r.left - R.left + r.width / 2, 64), R.width - 64);
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

  // Watch mode: play each step by itself.
  useEffect(() => {
    clearTimers();
    if (!watching || paused || done || !lang) return;
    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    const s = step;
    const text = s.say[lang] || '';
    const readMs = Math.min(Math.max(text.length * 62, 3200), 9500);
    if (s.kind === 'info') {
      later(() => advance(), 1500);
    } else if (s.kind === 'tap') {
      later(() => setTapFx(true), readMs);
      later(() => {
        setTapFx(false);
        advance();
      }, readMs + 700);
    } else if (s.kind === 'input') {
      const chars = s.expected.split('');
      chars.forEach((_, k) => later(() => setTyped(s.expected.slice(0, k + 1)), Math.min(readMs, 4500) + k * 550));
      later(() => {
        setValues((v) => ({ ...v, [s.field]: s.expected }));
        advance();
      }, Math.min(readMs, 4500) + chars.length * 550 + 700);
    } else if (s.kind === 'quiz') {
      const right = s.options.find((o) => o.correct);
      later(() => {
        setQuiz({ correct: true, why: right.why[lang] });
        speak(right.why[lang], lang);
      }, readMs);
      later(() => advance(), readMs + Math.min(Math.max(right.why[lang].length * 62, 3000), 8000));
    }
    return clearTimers;
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
  }

  function correct() {
    track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    lockRef.current = true;
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      advance();
    }, 450);
  }

  function wrong(meta = {}) {
    track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, ...meta } });
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
    <Settings lang={lang} setLang={setLang} muted={muted} toggleMute={toggleMute} onClose={() => setShowSettings(false)} />
  );

  if (done) {
    const shareText = `${lesson.share[lang]}\n${typeof window !== 'undefined' ? window.location.origin : ''}`;
    return (
      <div className="page done">
        <div className="done-burst">🎉</div>
        <h1 className="done-title">{t.doneTitle}</h1>
        <p className="done-sub">{t.doneSub}</p>
        <p className="done-lesson">{lesson.title[lang]}</p>
        <ul className="takeaways">
          {lesson.takeaways[lang].map((k, i) => (
            <li key={i}>✓ {k}</li>
          ))}
        </ul>

        {mode !== 'practice' && (
          <button className="btn primary" onClick={() => restart('practice')}>
            👆 {t.nowPractise}
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
            📱 {t.tryReal}
          </button>
        )}
        {realTry && (
          <>
            <p className="note">{lesson.realTry[lang]}</p>
            <button className="btn ghost" onClick={() => restart('follow')}>
              📋 {t.modeFollow}
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
          💬 {t.tellChild(from)}
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
            🔁 {t.practiceAgain}
          </button>
          <Link className="btn ghost" href="/">
            🏠 {t.otherLessons}
          </Link>
        </div>
      </div>
    );
  }

  if (mode === 'follow') {
    return (
      <div className="player">
        <div className="ptop">
          <Link href="/" className="ptop-btn" onClick={() => stopSpeaking()}>
            ✕ {t.exit}
          </Link>
          <div className="progress">
            <small>{lesson.title[lang]}</small>
          </div>
          <button className="gear" onClick={() => setShowSettings(true)} aria-label="Settings">
            ⚙️
          </button>
        </div>
        <FollowView lesson={lesson} lang={lang} t={t} onDone={finish} onPractice={() => restart('practice')} />
        {settings}
      </div>
    );
  }

  const coachText = showHint && step.hint ? step.hint[lang] : step.say[lang];
  const choosing = !mode && idx === 0;

  return (
    <div className="player">
      <div className="practice-banner">🛡️ {t.practiceBanner}</div>
      <div className="ptop">
        <Link href="/" className="ptop-btn" onClick={() => stopSpeaking()}>
          ✕ {t.exit}
        </Link>
        <div className="progress">
          <div className="bar">
            <span style={{ width: `${(idx / total) * 100}%` }} />
          </div>
          <small>
            {watching ? `▶️ ${t.watching} · ` : ''}
            {t.step(idx + 1, total)}
          </small>
        </div>
        <button className="gear" onClick={() => setShowSettings(true)} aria-label="Settings">
          ⚙️
        </button>
      </div>

      <div
        className={`screen ${flash ? 'flash' : ''} ${tapFx ? 'tapfx' : ''} ${watching ? 'watching' : ''}`}
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

      <div className={`coach ${showHint ? 'hinting' : ''}`} ref={coachRef}>
        <p className="coach-text">{coachText}</p>

        {choosing && (
          <div className="modes">
            <button className="btn primary" onClick={() => chooseMode('practice')}>
              👆 {t.modePractice}
            </button>
            <div className="mode-row">
              <button className="btn ghost" onClick={() => chooseMode('watch')}>
                ▶️ {t.modeWatch}
              </button>
              <button className="btn ghost" onClick={() => chooseMode('follow')}>
                📋 {t.modeFollow}
              </button>
            </div>
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
                {t.next} →
              </button>
            )}
          </div>
        )}

        {mode === 'practice' && step.kind === 'info' && idx > 0 && (
          <button className="btn primary" onClick={advance}>
            {(step.button && step.button[lang]) || t.next} →
          </button>
        )}

        {watching ? (
          <div className="coach-actions">
            <button className="chip" onClick={watchBack} aria-label={t.back}>
              ⏮
            </button>
            <button className="chip big" onClick={() => setPaused((p) => !p)}>
              {paused ? `▶️ ${t.play}` : `⏸ ${t.pause}`}
            </button>
            <button className="chip" onClick={watchNext} aria-label={t.next}>
              ⏭
            </button>
            <button className="chip" onClick={tryMyself}>
              👆 {t.tryMyself}
            </button>
          </div>
        ) : (
          <div className="coach-actions">
            <button className="chip" onClick={() => speak(coachText, lang)}>
              🔊 {t.listen}
            </button>
            {mode === 'practice' && (step.kind === 'tap' || step.kind === 'input') && (
              <button className="chip" onClick={askHelp}>
                💡 {t.help}
              </button>
            )}
          </div>
        )}
      </div>
      {settings}
    </div>
  );
}
