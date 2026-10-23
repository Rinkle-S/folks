'use client';
// Print or save one lesson, with a picture of the screen beside each step. Pictures are on unless the parent switched them off
// ("Hide all pictures" in Read the steps). The handout is only built when asked, so lessons stay light.
// variant "bar" is a full-width button on a guide page, "icon" is the printer button in the lesson top bar, "card" is the question at the end of a lesson.
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icons';
import StepPicture from './StepPicture';
import { buildCards } from '@/lib/followCards';
import { track } from '@/lib/client';

const picsOn = () => {
  try {
    return localStorage.getItem('folks_pics') !== '0';
  } catch {
    return true;
  }
};

export default function LessonPrint({ lesson, lang, t, variant = 'icon' }) {
  const [job, setJob] = useState(null); // { pics } once asked
  const [msg, setMsg] = useState(false);

  const go = () => {
    const pics = picsOn();
    track('print', { lesson: lesson.id, meta: { pics, from: variant } });
    setJob({ pics });
    setMsg(true);
    setTimeout(() => window.print(), 1200);
    setTimeout(() => setMsg(false), 4500);
  };

  const cards = job ? buildCards(lesson, lang) : [];
  const steps = cards.filter((c) => !c.tip);
  const tips = cards.filter((c) => c.tip);

  return (
    <>
      {variant === 'bar' ? (
        <div className="print-bar no-print">
          <button className="btn ghost print-open" onClick={go}>
            <Icon name="printer" size={24} /> {t.printBtn}
          </button>
        </div>
      ) : variant === 'icon' ? (
        <button className="ptop-btn no-print" onClick={go} aria-label={t.printBtn}>
          <Icon name="printer" size={26} />
        </button>
      ) : variant === 'link' ? (
        <button className="link-btn no-print" onClick={go}>
          <Icon name="printer" size={20} /> {t.printBtn}
        </button>
      ) : null}
      {msg && (
        <div className="print-toast no-print" role="status">
          {t.printToast}
        </div>
      )}
      {job &&
        createPortal(
          <div className="print-root">
            <div className="print-head">Folks · {lesson.title[lang]}</div>
            <h2 className="print-title">{lesson.title[lang]}</h2>
            <small className="print-app">{lesson.appName}</small>
            {steps.map((c, i) => (
              <div key={c.step.id} className="print-step">
                <span className="print-n">{i + 1}</span>
                <p>{c.text}</p>
                {job.pics && (
                  <div className="print-pic">
                    <StepPicture card={c} lesson={lesson} lang={lang} t={t} />
                  </div>
                )}
              </div>
            ))}
            {tips.length > 0 && (
              <div className="print-caution">
                <b>{t.remember}</b>
                <ul>
                  {tips.map((c) => (
                    <li key={c.step.id}>{c.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}
