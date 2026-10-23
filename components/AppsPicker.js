'use client';
// "Which apps are on your phone?" A website can't see installed apps, so the parent (or child) taps them once.
import { useState } from 'react';
import AppIcon from './AppIcon';
import { ALL_APPS } from '@/lib/apps';

const nameOf = (id) => (ALL_APPS.find((a) => a.id === id) || { name: id }).name;

export default function AppsPicker({ t, initial = [], onSave, onClose }) {
  const [sel, setSel] = useState(initial);
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= sel.length) return;
    const a = [...sel];
    [a[i], a[j]] = [a[j], a[i]];
    setSel(a);
  };
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
        {sel.length > 1 && (
          <>
            <div className="settings-h">
              <b>↕️ {t.orderTitle}</b>
            </div>
            <p className="muted small">{t.orderSub}</p>
            <div className="order-list">
              {sel.map((id, i) => (
                <div className="order-row" key={id}>
                  <AppIcon app={id} size={36} />
                  <b>{nameOf(id)}</b>
                  <button className="mv" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`${nameOf(id)} ${t.moveUp}`}>
                    ▲ {t.moveUp}
                  </button>
                  <button className="mv" onClick={() => move(i, 1)} disabled={i === sel.length - 1} aria-label={`${nameOf(id)} ${t.moveDown}`}>
                    ▼ {t.moveDown}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
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
