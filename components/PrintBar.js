'use client';
// One "Print or save" button near the top of a guide, lesson, app or topic. It opens a short sheet with three choices:
// print on paper, save as a PDF, or send the steps to family on WhatsApp. The handout itself is drawn at the end of the page
// and only shows when printing (free, no server). Help: /help/print.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Icon from './Icons';
import { entriesFor } from '@/lib/printable';
import { track } from '@/lib/client';

export default function PrintBar({ ids = [], entries, heading, lang, t }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const items = entries || entriesFor(ids, lang);
  if (!items.length) return null;

  const doPrint = (how) => {
    track('print', { how, what: heading });
    setOpen(false);
    setTimeout(() => window.print(), 150);
  };
  const send = () => {
    track('print', { how: 'whatsapp', what: heading });
    const text = [heading, ...items.flatMap((e) => [e.title, ...e.steps.map((s, i) => `${i + 1}. ${s}`)])].join('\n');
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  };

  return (
    <div className="print-bar no-print">
      <button className="btn ghost print-open" onClick={() => setOpen(true)}>
        <Icon name="file" size={24} /> {t.printBtn}
      </button>
      {open && (
        <div className="sheet-back" onClick={() => setOpen(false)}>
          <div className="sheet print-sheet" role="dialog" aria-label={t.printSheetTitle} onClick={(e) => e.stopPropagation()}>
            <h2>{t.printSheetTitle}</h2>
            <button className="print-choice" onClick={() => doPrint('paper')}>
              <b>{t.printPaper}</b>
              <small>{t.printPaperHint}</small>
            </button>
            <button className="print-choice" onClick={() => doPrint('pdf')}>
              <b>{t.printPdf}</b>
              <small>{t.printPdfHint}</small>
            </button>
            <button className="print-choice" onClick={send}>
              <b>{t.printSend}</b>
              <small>{t.printSendHint}</small>
            </button>
            <Link href="/help/print" className="link-btn">
              {t.printHelp}
            </Link>
            <button className="btn ghost" onClick={() => setOpen(false)}>
              {t.printClose}
            </button>
          </div>
        </div>
      )}
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
