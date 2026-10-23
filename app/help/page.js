'use client';
// Help: common questions in plain words.
import { AppBar, BottomNav } from '@/components/AppShell';
import HelpList from '@/components/HelpList';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';

export default function Help() {
  const [lang] = useLang();
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="page-h">{t.helpTitle}</h1>
        <HelpList lang={lang} />
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
