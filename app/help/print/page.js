'use client';
// Help: how to print a guide or save it as a PDF, in question and answer form.
import Link from 'next/link';
import { AppBar, BottomNav } from '@/components/AppShell';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';

export default function PrintHelp() {
  const [lang] = useLang();
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="page-h">{t.printFaqTitle}</h1>
        <p className="muted">{t.printFaqLead}</p>
        <div className="faq">
          {t.printFaq.map(([q, a], i) => (
            <details key={i} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <Link href="/themes" className="btn primary">
          {t.themesTitle}
        </Link>
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
