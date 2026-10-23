'use client';
// Questions as big tap-to-open rows. `only` limits it to one section, e.g. "print".
import { HELP, HELP_TITLES } from '@/lib/help';

export default function HelpList({ lang, only }) {
  const keys = only ? [only] : Object.keys(HELP);
  return (
    <div>
      {keys.map((k) => (
        <section key={k}>
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
