'use client';
// A quick guide on its own page: either one we wrote (id = guide id) or the last AI-made guide (id = "ai").
// Steps are shown one at a time in big text, or all together. No voice yet: scripts are reviewed first.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppIcon from './AppIcon';
import Icon from './Icons';
import { T } from '@/lib/i18n';
import { useLang, track } from '@/lib/client';
import { GUIDES } from '@/lib/guides';
import { canOpenApp, openRealApp } from '@/lib/openApp';

function load(id, lang) {
  if (id === 'ai') {
    try {
      const a = JSON.parse(localStorage.getItem('folks_ai_guide') || 'null');
      if (!a || !a.steps) return null;
      return {
        ai: true,
        app: '',
        appName: a.app || '',
        title: a.title,
        steps: a.steps.map((s) => ({ text: s.say, look: s.look })),
        caution: a.caution || '',
      };
    } catch {
      return null;
    }
  }
  const g = GUIDES[id];
  if (!g) return null;
  return {
    ai: false,
    app: g.app,
    appName: g.appName,
    title: g.title[lang],
    steps: g.steps.map((s) => ({ text: s[lang], look: '' })),
    caution: g.caution ? g.caution[lang] : '',
  };
}

export default function GuideView({ id }) {
  const [lang] = useLang();
  const [guide, setGuide] = useState(undefined);
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);

  useEffect(() => {
    if (!lang) return;
    setGuide(load(id, lang));
    track('guide_open', { meta: { id, lang } });
  }, [id, lang]);

  if (!lang || guide === undefined) return <div className="page" />;
  const t = T[lang];
  if (!guide)
    return (
      <div className="page guide-page">
        <p>{t.guideGone}</p>
        <Link className="btn primary" href="/">
          {t.home}
        </Link>
      </div>
    );

  const n = guide.steps.length;
  const last = i === n - 1;
  const showOpen = guide.app && canOpenApp(guide.app);
  return (
    <div className="page guide-page">
      <div className="guide-top">
        <Link href="/" className="guide-back" aria-label={t.home}>
          <Icon name="back" size={26} />
        </Link>
        <span className="guide-tag">{guide.ai ? `✨ ${t.aiMade.split('.')[0]}` : t.quickGuide}</span>
      </div>
      <div className="guide-head">
        {guide.app && <AppIcon app={guide.app} size={52} />}
        <h1>{guide.title}</h1>
      </div>
      {guide.ai && <p className="ai-badge">{t.aiMade}</p>}

      {showOpen && (
        <button className="btn ghost" onClick={() => openRealApp(guide.app)}>
          <Icon name="play" size={20} /> {t.openRealApp(guide.appName || guide.app)}
        </button>
      )}

      <button className="link-btn" onClick={() => setAll(!all)}>
        {all ? t.oneByOne : t.allSteps}
      </button>

      {all ? (
        <ol className="guide-all">
          {guide.steps.map((s, k) => (
            <li key={k}>
              {s.text}
              {s.look && <small> ({s.look})</small>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="card guide-step">
          <div className="dots-step" aria-hidden="true">
            {guide.steps.map((_, k) => (
              <span key={k} className={k === i ? 'on' : ''} />
            ))}
          </div>
          <p className="ai-count">{t.aiStepOf(i + 1, n)}</p>
          <p className="ai-say">{guide.steps[i].text}</p>
          {guide.steps[i].look && (
            <p className="ai-look">
              <b>{t.aiLook}:</b> {guide.steps[i].look}
            </p>
          )}
          {last && guide.caution && <p className="ai-caution">⚠️ {guide.caution}</p>}
          <div className="ai-nav">
            {i > 0 && (
              <button className="btn ghost" onClick={() => setI(i - 1)}>
                {t.aiBack}
              </button>
            )}
            {!last ? (
              <button className="btn primary" onClick={() => setI(i + 1)}>
                {t.aiNext}
              </button>
            ) : (
              <Link className="btn primary" href="/">
                {t.aiDone}
              </Link>
            )}
          </div>
        </div>
      )}
      {all && guide.caution && <p className="ai-caution">⚠️ {guide.caution}</p>}
    </div>
  );
}
