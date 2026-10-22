'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Screen from './Screens';
import Settings from './Settings';
import { LESSONS } from '@/lib/lessons';
import { T } from '@/lib/i18n';
import { useLang, useMute, speak, stopSpeaking, track, getFrom, whatsappLink } from '@/lib/client';

export default function Player({ id }) {
  const lesson = LESSONS[id];
  const [lang, setLang] = useLang();
  const [muted, toggleMute] = useMute();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [values, setValues] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [quiz, setQuiz] = useState(null); // { correct, why }
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [realTry, setRealTry] = useState(false);
  const [from, setFrom] = useState('');
  const [bubble, setBubble] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const screenRef = useRef(null);
  const coachRef = useRef(null);
  const startedRef = useRef(false);
  const lockRef = useRef(false);

  const step = lesson.steps[idx];
  const t = T[lang || 'en'];
  const total = lesson.steps.length;

  useEffect(() => setFrom(getFrom()), []);

  // Log the start once the language is known.
  useEffect(() => {
    if (lang && !startedRef.current) {
      startedRef.current = true;
      track('lesson_start', { lesson: id, meta: { lang } });
    }
  }, [lang, id]);

  // Speak each step when it appears.
  useEffect(() => {
    if (!lang || done) return;
    speak(step.say[lang], lang);
  }, [idx, lang, done]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => stopSpeaking(), []);

  // Keep the answer and the Next button in view on small phones.
  useEffect(() => {
    const c = coachRef.current;
    if (c && quiz) c.scrollTop = c.scrollHeight;
  }, [quiz]);

  // Always glow the element to tap, with a small "Tap here" label next to it.
  useEffect(() => {
    const root = screenRef.current;
    if (!root || !lang) return;
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
  }, [idx, typed, lang, done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lang) return <div className="page" />;

  function next() {
    lockRef.current = false;
    setShowHint(false);
    setQuiz(null);
    setTyped('');
    if (idx + 1 >= total) {
      setDone(true);
      stopSpeaking();
      track('lesson_complete', { lesson: id });
    } else {
      setIdx(idx + 1);
    }
  }

  function correct() {
    track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    lockRef.current = true;
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      next();
    }, 450);
  }

  function wrong(meta = {}) {
    track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, ...meta } });
    setShowHint(true);
    if (step.hint) speak(step.hint[lang], lang);
  }

  function onScreenClick(e) {
    if (lockRef.current) return;
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
    if (o.correct) {
      track('step_done', { lesson: id, step: idx, meta: { id: step.id } });
    } else {
      track('wrong_tap', { lesson: id, step: idx, meta: { id: step.id, quiz: true } });
    }
    setQuiz({ correct: o.correct, why: o.why[lang] });
    speak(o.why[lang], lang);
  }

  function restart() {
    setIdx(0);
    setValues({});
    setTyped('');
    setDone(false);
    setFeedback(null);
    setRealTry(false);
    track('lesson_start', { lesson: id, meta: { lang, again: true } });
  }

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

        <button
          className="btn primary"
          onClick={() => {
            setRealTry(true);
            track('real_try', { lesson: id });
          }}
        >
          📱 {t.tryReal}
        </button>
        {realTry && <p className="note">{lesson.realTry[lang]}</p>}

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
                    track('feedback', { lesson: id, meta: { v } });
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
          <button className="btn ghost" onClick={restart}>
            🔁 {t.practiceAgain}
          </button>
          <Link className="btn ghost" href="/">
            🏠 {t.otherLessons}
          </Link>
        </div>
      </div>
    );
  }

  const coachText = showHint && step.hint ? step.hint[lang] : step.say[lang];

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
          <small>{t.step(idx + 1, total)}</small>
        </div>
        <button className="gear" onClick={() => setShowSettings(true)} aria-label="Settings">
          ⚙️
        </button>
      </div>

      <div className={`screen ${flash ? 'flash' : ''}`} ref={screenRef} onClick={onScreenClick}>
        <Screen step={step} lesson={lesson} lang={lang} t={t} values={values} typed={typed} />
        {bubble && (
          <div className={`tap-bubble ${bubble.below ? 'below' : ''}`} style={{ left: bubble.x, top: bubble.y }}>
            👆 {bubble.label}
          </div>
        )}
      </div>

      <div className={`coach ${showHint ? 'hinting' : ''}`} ref={coachRef}>
        <p className="coach-text">{coachText}</p>

        {step.kind === 'quiz' && (
          <div className="options">
            {step.options
              .filter((o) => !(quiz && quiz.correct) || o.correct)
              .map((o, i) => (
              <button
                key={i}
                className={`opt ${quiz && quiz.correct && o.correct ? 'right' : ''}`}
                onClick={() => pickOption(o)}
              >
                {o.text[lang]}
              </button>
            ))}
            {quiz && <p className={`why ${quiz.correct ? 'good' : 'bad'}`}>{quiz.why}</p>}
            {quiz && quiz.correct && (
              <button className="btn primary" onClick={next}>
                {t.next} →
              </button>
            )}
          </div>
        )}

        {step.kind === 'info' && (
          <button className="btn primary" onClick={next}>
            {step.button[lang]} →
          </button>
        )}

        <div className="coach-actions">
          <button className="chip" onClick={() => speak(coachText, lang)}>
            🔊 {t.listen}
          </button>
          {(step.kind === 'tap' || step.kind === 'input') && (
            <button className="chip" onClick={askHelp}>
              💡 {t.help}
            </button>
          )}
        </div>
      </div>
      {showSettings && (
        <Settings
          lang={lang}
          setLang={setLang}
          muted={muted}
          toggleMute={toggleMute}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
