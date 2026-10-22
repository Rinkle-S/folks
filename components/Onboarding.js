'use client';
// First visit: what Folks is, pick a language, then pick the apps on this phone.
import { useState } from 'react';
import Icon from './Icons';
import AppIcon from './AppIcon';
import { ALL_APPS } from '@/lib/apps';
import { T } from '@/lib/i18n';

export default function Onboarding({ lang, setLang, onDone }) {
  const [step, setStep] = useState(0);
  const [apps, setApps] = useState([]);
  const t = T[lang];
  const toggle = (id) => setApps(apps.includes(id) ? apps.filter((x) => x !== id) : [...apps, id]);

  return (
    <div className="onboard">
      <div className="dots-step" aria-hidden="true">
        <span className={step === 0 ? 'on' : ''} />
        <span className={step === 1 ? 'on' : ''} />
      </div>

      {step === 0 ? (
        <>
          <div className="onboard-hero">
            <span className="brand big">
              <span className="brand-mark" style={{ width: 52, height: 52, borderRadius: 16, fontSize: 30 }}>
                F
              </span>
              Folks
            </span>
            <h1>{t.obWelcome}</h1>
            <p>{t.obLead}</p>
            <ul className="onboard-points">
              <li>
                <span className="medal">
                  <Icon name="rupee" size={22} />
                </span>
                {t.obP1}
              </li>
              <li>
                <span className="medal">
                  <Icon name="volume" size={22} />
                </span>
                {t.obP2}
              </li>
              <li>
                <span className="medal">
                  <Icon name="shieldCheck" size={22} />
                </span>
                {t.obP3}
              </li>
            </ul>
            <p style={{ marginTop: 22, fontWeight: 700, color: 'var(--ink)' }}>
              Choose your language / अपनी भाषा चुनिए
            </p>
            <div className="lang-pick">
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
                English
              </button>
              <button className={lang === 'hi' ? 'on' : ''} onClick={() => setLang('hi')} aria-pressed={lang === 'hi'}>
                हिंदी
              </button>
            </div>
          </div>
          <button className="btn primary" onClick={() => setStep(1)}>
            {t.obNext}
          </button>
        </>
      ) : (
        <>
          <div className="onboard-hero">
            <h1>{t.appsQ}</h1>
            <p>{t.appsSub}</p>
            <div className="apps-grid">
              {ALL_APPS.map((a) => (
                <button key={a.id} className={`app-pick ${apps.includes(a.id) ? 'on' : ''}`} onClick={() => toggle(a.id)} aria-pressed={apps.includes(a.id)}>
                  <AppIcon app={a.id} size={48} />
                  <span>{a.name}</span>
                  {apps.includes(a.id) && <i>✓</i>}
                </button>
              ))}
            </div>
          </div>
          <button className="btn primary" onClick={() => onDone(apps.length ? apps : null)}>
            {t.obStart}
          </button>
          <button className="btn ghost" onClick={() => onDone(null)}>
            {t.obSkip}
          </button>
        </>
      )}
    </div>
  );
}
