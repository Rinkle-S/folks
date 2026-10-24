'use client';
// First visit: what Nook is, pick a language, then pick the apps on this phone.
import { useState } from 'react';
import Icon from './Icons';
import { NookLogo } from './Logo';
import AppIcon from './AppIcon';
import { ALL_APPS } from '@/lib/apps';
import { T } from '@/lib/i18n';
import { LANGS } from '@/lib/langs';
import SkillsPick, { skillsFor, fluencyFrom } from './SkillsPick';
import { saveProfile } from '@/lib/profile';

export default function Onboarding({ lang, setLang, onDone }) {
  const [step, setStep] = useState(0);
  const [apps, setApps] = useState([]);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState([]);
  const t = T[lang];
  const toggle = (id) => setApps(apps.includes(id) ? apps.filter((x) => x !== id) : [...apps, id]);

  return (
    <div className="onboard">
      <div className="dots-step" aria-hidden="true">
        <span className={step === 0 ? 'on' : ''} />
        <span className={step === 1 ? 'on' : ''} />
        <span className={step === 2 ? 'on' : ''} />
        <span className={step === 3 ? 'on' : ''} />
      </div>

      {step === 0 ? (
        <>
          <div className="onboard-hero">
            <span className="brand big">
              <NookLogo height={76} />
            </span>
            <p className="ob-tag">{t.tagline}</p>
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
              Choose your language / अपनी भाषा चुनिए / ഭാഷ തിരഞ്ഞെടുക്കൂ
            </p>
            <div className="lang-pick">
              {LANGS.map((l) => (
                <button key={l.id} className={lang === l.id ? 'on' : ''} onClick={() => setLang(l.id)} aria-pressed={lang === l.id}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <button className="btn primary" onClick={() => setStep(1)}>
            {t.obNext}
          </button>
        </>
      ) : step === 1 ? (
        <>
          <div className="onboard-hero">
            <h1>{t.obNameQ}</h1>
            <p>{t.obNameSub}</p>
            <input className="name-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.obNamePh} maxLength={30} aria-label={t.obNamePh} autoComplete="given-name" />
          </div>
          <button
            className="btn primary"
            onClick={() => {
              saveProfile({ name });
              setStep(2);
            }}
          >
            {t.obNext}
          </button>
          <button
            className="btn ghost"
            onClick={() => {
              saveProfile({ name });
              setStep(2);
            }}
          >
            {t.obSkip}
          </button>
        </>
      ) : step === 2 ? (
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
          <button className="btn primary" onClick={() => setStep(3)}>
            {t.obNext}
          </button>
          <button
            className="btn ghost"
            onClick={() => {
              setApps([]);
              setStep(3);
            }}
          >
            {t.obSkip}
          </button>
        </>
      ) : (
        <>
          <div className="onboard-hero">
            <h1>{t.skillsQ}</h1>
            <p>{t.skillsSub}</p>
            <SkillsPick lang={lang} apps={apps} value={skills} onChange={setSkills} />
          </div>
          <button
            className="btn primary"
            onClick={() => {
              saveProfile({ fluency: fluencyFrom(skills, skillsFor(apps)), skills });
              onDone(apps.length ? apps : null);
            }}
          >
            {t.obStart}
          </button>
          <button className="btn ghost" onClick={() => onDone(apps.length ? apps : null)}>
            {t.obSkip}
          </button>
        </>
      )}
    </div>
  );
}
