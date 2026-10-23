'use client';
// Help: printing and saving, in question and answer form.
import { AppBar, BottomNav } from '@/components/AppShell';
import HelpList from '@/components/HelpList';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';
import Link from 'next/link';

export default function PrintHelp() {
  const [lang] = useLang();
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="page-h">{t.printFaqTitle}</h1>
        <HelpList lang={lang} only="print" />
        <Link href="/help" className="btn ghost">
          {t.helpTitle}
        </Link>
      </main>
      <BottomNav active="help" t={t} />
    </div>
  );
}
