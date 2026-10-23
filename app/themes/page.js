'use client';
// Learn by topic: short courses, grouped by level.
import { useEffect, useState } from 'react';
import ThemeList from '@/components/ThemeList';
import { AppBar, BottomNav } from '@/components/AppShell';
import { T } from '@/lib/i18n';
import { useLang, getDone } from '@/lib/client';

export default function Themes() {
  const [lang] = useLang();
  const [done, setDone] = useState([]);
  useEffect(() => setDone(getDone()), []);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="page-h">{t.themesTitle}</h1>
        <p className="muted">{t.themesSub}</p>
        <ThemeList lang={lang} t={t} done={done} />
      </main>
      <BottomNav active="learn" t={t} />
    </div>
  );
}
