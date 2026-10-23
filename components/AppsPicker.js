'use client';
// "Which apps are on your phone?" A website can't see installed apps, so the parent (or child) taps them once.
import { useEffect, useRef, useState } from 'react';
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
  const listRef = useRef(null);
  const [drag, setDrag] = useState(null); // index of the app being dragged
  // While a handle is held, follow the finger anywhere on the page. Listening on the window (not the handle) keeps the drag alive
  // when the row moves in the list, which can drop a touch that is tied to the handle itself.
  const selRef = useRef(sel);
  selRef.current = sel;
  const dragRef = useRef(null);
  dragRef.current = drag;
  useEffect(() => {
    if (drag === null) return;
    const onMove = (e) => {
      if (!listRef.current || dragRef.current === null) return;
      const rows = [...listRef.current.children];
      const j = rows.findIndex((r) => {
        const b = r.getBoundingClientRect();
        return e.clientY >= b.top && e.clientY <= b.bottom;
      });
      if (j < 0 || j === dragRef.current) return;
      const a = [...selRef.current];
      const [it] = a.splice(dragRef.current, 1);
      a.splice(j, 0, it);
      dragRef.current = j;
      setSel(a);
      setDrag(j);
    };
    const end = () => setDrag(null);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, [drag === null]); // eslint-disable-line react-hooks/exhaustive-deps
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
            <p className="muted small">{t.dragHint}</p>
            <div className="order-list" ref={listRef}>
              {sel.map((id, i) => (
                <div className={`order-row ${drag === i ? 'dragging' : ''}`} key={id}>
                  <span
                    className="drag-handle"
                    role="button"
                    aria-label={`${nameOf(id)} ${t.moveUp} / ${t.moveDown}`}
                    onPointerDown={() => setDrag(i)}
                  >
                    ⠿
                  </span>
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
