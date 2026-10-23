'use client';
// "Read the steps": the whole lesson as a written guide, worded for the real app.
// Every step can be read aloud, and can show a small picture of the screen.
import { useEffect, useMemo, useState } from 'react';
import StepPicture from './StepPicture';
import AppIcon from './AppIcon';
import { buildCards } from '@/lib/followCards';
import { speak, track } from '@/lib/client';
import Icon from './Icons';

export default function FollowView({ lesson, lang, t, onDone, onPractice }) {
  const [open, setOpen] = useState({});
  const [pics, setPics] = useState(true); // pictures are shown by default; one switch hides them all
  useEffect(() => {
    try {
      if (localStorage.getItem('folks_pics') === '0') setPics(false);
    } catch {}
  }, []);
  const togglePics = () => {
    setPics(!pics);
    setOpen({});
    try {
      localStorage.setItem('folks_pics', pics ? '0' : '1');
    } catch {}
  };

  const cards = useMemo(() => buildCards(lesson, lang), [lesson, lang]);

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


      <button className="chip pics-toggle" onClick={togglePics} aria-pressed={pics}>
        <Icon name="image" size={20} /> {pics ? t.hideAllPics : t.showAllPics}
      </button>
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
                <button className="chip" onClick={() => setOpen({ ...open, [i]: !(open[i] ?? pics) })}>
                  <Icon name="image" size={20} /> {open[i] ?? pics ? t.hidePicture : t.showPicture}
                </button>
              </div>
              {(open[i] ?? pics) && <StepPicture card={c} lesson={lesson} lang={lang} t={t} />}
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
