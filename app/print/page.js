'use client';
// Printed handouts: every quick guide (or one topic) laid out for paper. "Print" lets the person print it or save a PDF.
// Free, no server: the phone or computer's own print dialog does the work.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppBar } from '@/components/AppShell';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';
import { GUIDES, GUIDE_LIST } from '@/lib/guides';
import { LESSONS } from '@/lib/lessons';
import { THEMES } from '@/lib/themes';

function entry(id, lang) {
  const g = GUIDES[id.replace(/^gd-/, '')];
  if (g) return { id, title: g.title[lang], app: g.appName, steps: g.steps.map((s) => s[lang]), caution: g.caution ? g.caution[lang] : '' };
  const l = LESSONS[id];
  if (!l) return null;
  return { id, title: l.title[lang], app: l.appName, steps: (l.takeaways && l.takeaways[lang]) || [], caution: '' };
}

export default function Print() {
  const [lang] = useLang();
  const [theme, setTheme] = useState('');
  useEffect(() => setTheme(new URLSearchParams(window.location.search).get('theme') || ''), []);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  const th = THEMES.find((x) => x.id === theme);
  const ids = th ? th.lessons : GUIDE_LIST.map((g) => 'gd-' + g.id);
  const items = ids.map((id) => entry(id, lang)).filter((e) => e && e.steps.length);
  return (
    <div className="shell print-page">
      <div className="no-print">
        <AppBar back="/themes" />
      </div>
      <main className="shell-main">
        <div className="no-print">
          <h1 className="page-h">{t.printTitle}</h1>
          <p className="muted">{t.printLead}</p>
          <label className="field">
            <span>{t.printScope}</span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="">{t.printAll}</option>
              {THEMES.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.title[lang]}
                </option>
              ))}
            </select>
          </label>
          <button className="btn primary" onClick={() => window.print()}>
            {t.printBtn}
          </button>
          <div className="card" style={{ marginTop: 14 }}>
            <b>{t.printHowTitle}</b>
            <ol className="print-how">
              {t.printHow.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <p className="muted small">{items.length} {t.printCount}</p>
        </div>

        <div className="print-head">Folks · {th ? th.title[lang] : t.printAll}</div>
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
      </main>
    </div>
  );
}
