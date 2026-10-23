'use client';
// Shows a guide the AI made, one step at a time, for the parent to follow on their real phone.
// No voice here on purpose: the audio is only made for lessons we wrote (it costs credits).
import { useState } from 'react';
import Icon from './Icons';

export default function AiGuide({ guide, t, onClose }) {
  const [i, setI] = useState(0);
  const n = guide.steps.length;
  const s = guide.steps[i];
  const last = i === n - 1;
  return (
    <div className="card ai-guide">
      <p className="ai-badge">✨ {t.aiMade}</p>
      <h2 className="ai-title">{guide.title}</h2>
      <div className="dots-step" aria-hidden="true">
        {guide.steps.map((_, k) => (
          <span key={k} className={k === i ? 'on' : ''} />
        ))}
      </div>
      <p className="ai-count">{t.aiStepOf(i + 1, n)}</p>
      <p className="ai-say">{s.say}</p>
      {s.look && (
        <p className="ai-look">
          <Icon name="search" size={18} /> <b>{t.aiLook}:</b> {s.look}
        </p>
      )}
      {last && guide.caution && <p className="ai-caution">⚠️ {guide.caution}</p>}
      <div className="ai-nav">
        {i > 0 && (
          <button className="btn ghost" onClick={() => setI(i - 1)}>
            {t.aiBack}
          </button>
        )}
        {!last ? (
          <button className="btn primary" onClick={() => setI(i + 1)}>
            {t.aiNext}
          </button>
        ) : (
          <button className="btn primary" onClick={onClose}>
            {t.aiDone}
          </button>
        )}
      </div>
    </div>
  );
}
