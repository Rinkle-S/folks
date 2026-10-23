'use client';
// Settings sheet: language and sound. Labels are bilingual so anyone can find their language.
import { useState } from 'react';
import Link from 'next/link';
import useInstall from './useInstall';
import TrustedContacts from './TrustedContacts';
import { speak, unlockAudio, getLearnMode, setLearnMode } from '@/lib/client';
import { voiceStatus } from '@/lib/voice';
import { T } from '@/lib/i18n';
import { LANGS } from '@/lib/langs';

export default function Settings({ lang, setLang, muted, toggleMute, onClose, onApps, appsLabel, onPracticeInfo }) {
  const [canInstall, install] = useInstall();
  const [tested, setTested] = useState(false);
  const [mode, setMode] = useState(getLearnMode());
  const t = T[lang] || T.en;
  // English plus the chosen language, so a Malayalam parent never sees Hindi here.
  const bi = (en, hi, ml) => `${en} / ${lang === 'ml' ? ml : hi}`;
  return (
    <div className="settings-wrap" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className="settings-h">
          <b>{bi('Settings', 'सेटिंग', 'സെറ്റിംഗ്സ്')}</b>
        </div>
        <label className="settings-row">
          <span>{lang === 'ml' ? 'Language / ഭാഷ' : 'Language / भाषा / ഭാഷ'}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name ? `${l.label} (${l.name})` : l.label}
              </option>
            ))}
          </select>
        </label>
        <label className="settings-row">
          <span>{t.learnHow}</span>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              setLearnMode(e.target.value);
            }}
          >
            <option value="ask">{t.modeAsk}</option>
            <option value="practice">{t.modePractice}</option>
            <option value="watch">{t.modeWatch}</option>
            <option value="follow">{t.modeFollow}</option>
          </select>
        </label>
        <div className="settings-row">
          <span>{bi('Sound', 'आवाज़', 'ശബ്ദം')}</span>
          <button className={`toggle ${muted ? '' : 'on'}`} onClick={toggleMute} aria-pressed={!muted}>
            {muted ? bi('Off', 'बंद', 'ഓഫ്') : bi('On', 'चालू', 'ഓൺ')}
          </button>
        </div>
        <div className="settings-row">
          <span>{t.soundTest}</span>
          <button
            className="toggle"
            onClick={() => {
              unlockAudio();
              speak(t.soundCheck, lang, { force: true });
              setTested(true);
            }}
          >
            {t.soundTestBtn}
          </button>
        </div>
        {tested && (
          <p className="muted small" style={{ margin: '6px 0 0' }}>
            {voiceStatus.server ? t.voiceNatural : t.voicePhone}
            {voiceStatus.lastError ? ` (${voiceStatus.lastError})` : ''}
          </p>
        )}
        {onApps && (
          <div className="settings-row">
            <span>{bi('My apps', 'मेरे ऐप', 'എന്റെ ആപ്പുകൾ')}</span>
            <button className="toggle" onClick={onApps}>
              {appsLabel || 'Choose'}
            </button>
          </div>
        )}
        <TrustedContacts t={t} />
        <div className="settings-row">
          <span>{t.helpTitle}</span>
          <Link href="/help" className="toggle on" onClick={onClose}>
            {t.helpOpen}
          </Link>
        </div>
        {onPracticeInfo && (
          <div className="settings-row">
            <span>{t.practiceWhat}</span>
            <button className="toggle" onClick={onPracticeInfo}>
              {t.practiceShow}
            </button>
          </div>
        )}
        {canInstall && (
          <div className="settings-row">
            <span>{T[lang].installApp}</span>
            <button className="toggle on" onClick={install}>
              {T[lang].install}
            </button>
          </div>
        )}
        <button className="btn primary" onClick={onClose}>
          {T[lang].appsSave}
        </button>
      </div>
    </div>
  );
}
