'use client';
// Help: ask for a lesson, lessons made for you, and common questions in plain words.
import { AppBar, BottomNav } from '@/components/AppShell';
import AskPanel from '@/components/AskPanel';
import HelpList from '@/components/HelpList';
import FeedbackAsk from '@/components/FeedbackAsk';
import RateApp from '@/components/RateApp';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';

export default function Help() {
  const [lang] = useLang();
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar />
      <main className="shell-main">
        <h1 className="page-h">{t.helpPageTitle}</h1>
        <p className="muted">{t.helpPageLead}</p>
        <div className="section-h">
          <span>{t.helpAsk}</span>
        </div>
        <AskPanel lang={lang} t={t} />
        <div className="section-h" style={{ marginTop: 22 }}>
          <span>{t.helpFbTitle}</span>
        </div>
        <p className="muted">{t.helpFbLead}</p>
        <FeedbackAsk t={t} lang={lang} where="help" type="app_feedback" open />
        <RateApp t={t} lang={lang} where="help" />
        <div className="section-h" style={{ marginTop: 22 }}>
          <span>{t.helpTitle}</span>
        </div>
        <HelpList lang={lang} />
      </main>
      <BottomNav active="help" t={t} />
    </div>
  );
}
