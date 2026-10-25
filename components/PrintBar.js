'use client';
// One "Print or save" button near the top of a guide, lesson, app or topic. Tapping it shows a one-line message, then opens the
// phone's own print screen. The handout is drawn at the end of the page and only shows when printing (free, no server). Help: /help/print.
import { useEffect, useState, useRef } from 'react';
import { createPortal, flushSync } from 'react-dom';
import Link from 'next/link';
import { printHandout } from '@/lib/printHandout';
import Icon from './Icons';
import { entriesFor } from '@/lib/printable';
import { track } from '@/lib/client';

export default function PrintBar({ ids = [], entries, heading, lang, t, label, variant, onPrint }) {
  const [mounted, setMounted] = useState(false);
  const [msg, setMsg] = useState(false);
  const handout = useRef(null);
  useEffect(() => setMounted(true), []);
  const items = entries || entriesFor(ids, lang);
  if (!items.length) return null;

  const go = () => {
    track('print', { what: heading });
    onPrint?.();
    flushSync(() => { setMounted(true); setMsg(true); });
    printHandout(handout.current);
    setTimeout(() => setMsg(false), 4000);
  };

  return (
    <div className={`print-bar no-print ${variant === 'tips' ? 'tips-print' : ''}`}>
      <button className={variant === 'tips' ? 'link-btn print-open' : 'btn ghost print-open'} onClick={go}>
        <Icon name="printer" size={24} /> {label || t.printBtn}
      </button>
      {msg && <div className="print-toast" role="status">{t.printToast} <Link href="/help/print">{t.printHelp}</Link></div>}
      {mounted &&
        createPortal(
          <div className={`print-root ${variant === 'tips' ? 'tip-sheet' : ''}`} ref={handout}>
            <div className="print-head">Nook · {heading}</div>
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
