'use client';
// One "Print or save" button near the top of a guide, lesson, app or topic. Tapping it shows a one-line message, then opens the
// phone's own print screen. The handout is drawn at the end of the page and only shows when printing (free, no server). Help: /help/print.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icons';
import { entriesFor } from '@/lib/printable';
import { track } from '@/lib/client';

export default function PrintBar({ ids = [], entries, heading, lang, t }) {
  const [mounted, setMounted] = useState(false);
  const [msg, setMsg] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = entries || entriesFor(ids, lang);
  if (!items.length) return null;

  const go = () => {
    track('print', { what: heading });
    setMsg(true);
    setTimeout(() => window.print(), 900);
    setTimeout(() => setMsg(false), 4000);
  };

  return (
    <div className="print-bar no-print">
      <button className="btn ghost print-open" onClick={go}>
        <Icon name="printer" size={24} /> {t.printBtn}
      </button>
      {msg && <div className="print-toast" role="status">{t.printToast}</div>}
      {mounted &&
        createPortal(
          <div className="print-root">
            <div className="print-head">Folks · {heading}</div>
            {items.map((e) => (
              <section key={e.id} className="print-guide">
                <h2>{e.title}</h2>
                <small>{e.app}</small>
                <ol>
                  {e.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                {e.caution && <p className="print-caution">{e.caution}</p>}
              </section>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
