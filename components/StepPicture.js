'use client';
// A small picture of the practice screen for one step, with the button to tap circled. Used by "Read the steps" and by printing.
import { useEffect, useRef } from 'react';
import Screen from './Screens';

export default function Picture({ card, lesson, lang, t }) {
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
