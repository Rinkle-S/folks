'use client';
// "Read the steps": the whole lesson as a written guide, worded for the real app.
// Every step can be read aloud, and can show a small picture of the screen.
import { useEffect, useMemo, useRef, useState } from 'react';
import Screen from './Screens';
import AppIcon from './AppIcon';
import { REAL, FOLLOW_SKIP } from '@/lib/lessons';
import { speak, track } from '@/lib/client';
import Icon from './Icons';

function Picture({ card, lesson, lang, t }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const s = card.step;
    let sel = null;
    if (s.kind === 'tap') sel = `[data-t="${s.target}"]`;
    if (s.kind === 'input') sel = `[data-key="${s.expected[0]}"]`;
    if (sel) root.querySelectorAll(sel).forEach((el) => el.classList.add('hl'));
  }, [card]);
  return (
    <div className="follow-preview" ref={ref} aria-hidden="true">
      <div className="pic-tag">{t.pictureTag}</div>
      <div className="follow-scale">
        <Screen step={card.step} lesson={lesson} lang={lang} t={t} values={card.values} typed="" />
      </div>
    </div>
  );
}

export default function FollowView({ lesson, lang, t, onDone, onPractice }) {
  const [open, setOpen] = useState({});

  const cards = useMemo(() => {
    const skip = FOLLOW_SKIP[lesson.id] || [];
    const real = REAL[lesson.id] || {};
    const list = [];
    const values = {};
    lesson.steps.forEach((s, idx) => {
      if (s.kind === 'info' && idx === 0) return;
      if (skip.includes(s.id)) return;
      let text = real[s.id] ? real[s.id][lang] : s.say[lang];
      let tip = false;
      if (s.kind === 'quiz') {
        const right = s.options.find((o) => o.correct);
        text = real[s.id] ? real[s.id][lang] : right.why[lang];
        tip = !real[s.id];
      }
      list.push({ step: s, text, tip, values: { ...values } });
      if (s.kind === 'input') values[s.field] = s.expected;
    });
    return list;
  }, [lesson, lang]);

  const steps = cards.filter((c) => !c.tip);
  const tips = cards.filter((c) => c.tip);

  function readAll() {
    speak([t.followOpen(lesson.appName), ...steps.map((c) => c.text)], lang, { force: true });
    track('read_all', { lesson: lesson.id });
  }

  return (
    <div className="read">
      <div className="read-head">
        <span className="follow-app">
          <AppIcon app={lesson.app} size={30} /> {lesson.appName}
        </span>
        <h1>{lesson.title[lang]}</h1>
        <p className="muted">{t.followOpen(lesson.appName)}</p>
        <button className="chip" onClick={readAll}>
          <Icon name="volume" size={20} /> {t.readAll}
        </button>
      </div>

      <ol className="read-list">
        {steps.map((c, i) => (
          <li key={c.step.id} className="read-step">
            <span className="read-num">{i + 1}</span>
            <div className="read-body">
              <p>{c.text}</p>
              <div className="read-actions">
                <button className="chip" onClick={() => speak(c.text, lang, { force: true })}>
                  <Icon name="volume" size={20} /> {t.listen}
                </button>
                <button className="chip" onClick={() => setOpen({ ...open, [i]: !open[i] })}>
                  <Icon name="image" size={20} /> {open[i] ? t.hidePicture : t.showPicture}
                </button>
              </div>
              {open[i] && <Picture card={c} lesson={lesson} lang={lang} t={t} />}
            </div>
          </li>
        ))}
      </ol>

      {tips.length > 0 && (
        <div className="read-tips">
          <div className="follow-tip">{t.remember}</div>
          <ul>
            {tips.map((c) => (
              <li key={c.step.id}>{c.text}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn primary" onClick={onDone}>
        <Icon name="check" size={22} stroke={3} /> {t.followFinish}
      </button>
      <button className="btn ghost" onClick={onPractice}>
        <Icon name="hand" size={22} /> {t.practiceInstead}
      </button>
    </div>
  );
}
