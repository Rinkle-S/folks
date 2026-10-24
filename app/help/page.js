'use client';
// Help: ask for a lesson, lessons made for you, and common questions in plain words.
import { AppBar, BottomNav } from '@/components/AppShell';
import AskPanel from '@/components/AskPanel';
import HelpList from '@/components/HelpList';
import FeedbackAsk from '@/components/FeedbackAsk';
import RateApp from '@/components/RateApp';
import { useState } from 'react';
import Icon from '@/components/Icons';
import { T } from '@/lib/i18n';
import { useLang, track } from '@/lib/client';

export default function Help() {
  const [lang] = useLang();
  const [soon, setSoon] = useState(false);
  if (!lang) return <div className="page" />;
  const t = T[lang];
  return (
    <div className="shell">
      <AppBar />
      <main className="shell-main">
        <h1 className="page-h">{t.helpPageTitle}</h1>
        <p className="muted">{t.helpPageLead}</p>
        <section className="help-now">
          <span className="help-now-ic">
            <Icon name="phone" size={28} />
          </span>
          <div>
            <b>{t.helpNowTitle}</b>
            <p>{t.helpNowSub}</p>
          </div>
          <button
            className="btn primary"
            type="button"
            onClick={() => {
              track('tile_soon', { meta: { tile: 'help_now', lang } });
              setSoon(true);
            }}
          >
            {t.helpNowBtn}
          </button>
          {soon && <p className="thanks">{t.helpNowSoon}</p>}
        </section>
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
