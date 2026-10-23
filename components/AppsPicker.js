'use client';
// "Which apps are on your phone?" A website can't see installed apps, so the parent (or child) taps them once.
import { useState } from 'react';
import AppIcon from './AppIcon';
import { ALL_APPS } from '@/lib/apps';

export default function AppsPicker({ t, initial = [], onSave, onClose }) {
  const [sel, setSel] = useState(initial);
  const toggle = (id) => setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id]);
  return (
    <div className="settings-wrap" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t.myApps}>
        <div className="settings-h">
          <b>📱 {t.appsQ}</b>
        </div>
        <p className="muted small">{t.appsSub}</p>
        <div className="apps-grid">
          {ALL_APPS.map((a) => (
            <button key={a.id} className={`app-pick ${sel.includes(a.id) ? 'on' : ''}`} onClick={() => toggle(a.id)} aria-pressed={sel.includes(a.id)}>
              <AppIcon app={a.id} size={44} />
              <span>{a.name}</span>
              {sel.includes(a.id) && <i>✓</i>}
            </button>
          ))}
        </div>
        <button className="btn primary" onClick={() => onSave(sel)}>
          {t.appsSave}
        </button>
        <button className="btn ghost" onClick={onClose}>
          {t.appsLater}
        </button>
      </div>
    </div>
  );
}
