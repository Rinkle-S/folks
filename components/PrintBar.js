'use client';
// "Print or save as PDF" for one guide, one app or one topic. The handout is drawn at the end of the page and only shown
// when printing, so the phone's own print dialog does the work (free, no server). Help: /help/print.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Icon from './Icons';
import { entriesFor } from '@/lib/printable';

export default function PrintBar({ ids = [], entries, heading, lang, t }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = entries || entriesFor(ids, lang);
  if (!items.length) return null;
  return (
    <div className="print-bar no-print">
      <button className="btn ghost" onClick={() => window.print()}>
        <Icon name="file" size={22} /> {t.printBtn}
      </button>
      <Link href="/help/print" className="link-btn">
        {t.printHelp}
      </Link>
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
