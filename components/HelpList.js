'use client';
// Questions as big tap-to-open rows. `only` limits it to one section, e.g. "print".
import { HELP, HELP_TITLES } from '@/lib/help';
import {useEffect} from 'react';

export default function HelpList({ lang, only }) {
  useEffect(()=>{if(window.location.hash==='#voice')document.getElementById('voice')?.scrollIntoView({block:'start'});},[lang]);
  const keys = only ? [only] : Object.keys(HELP);
  return (
    <div>
      {keys.map((k) => (
        <section key={k} id={k}>
          {!only && (
            <div className="section-h">
              <span>{HELP_TITLES[k][lang]}</span>
            </div>
          )}
          <div className="faq">
            {HELP[k].map(([q, a], i) => (
              <details key={i}>
                <summary>{q[lang]}</summary>
                <p>{a[lang]}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
