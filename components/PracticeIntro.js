'use client';
// First-run card: this is a practice screen, not the real phone. Shown once; Settings can show it again.
import Icon from './Icons';

export default function PracticeIntro({ t, onClose, onNever }) {
  return (
    <div className="pi-wrap" role="dialog" aria-modal="true" aria-label={t.practiceIntroTitle}>
      <div className="pi-card">
        <span className="pi-ic">
          <Icon name="hand" size={40} />
        </span>
        <h2>{t.practiceIntroTitle}</h2>
        <p>{t.practiceIntroBody}</p>
        <button className="btn primary" onClick={onClose}>
          {t.practiceIntroBtn}
        </button>
        {onNever && (
          <button className="btn ghost" onClick={onNever}>
            {t.practiceIntroNever}
          </button>
        )}
      </div>
    </div>
  );
}
