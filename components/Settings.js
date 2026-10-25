'use client';
// Settings sheet: language and sound. Labels are bilingual so anyone can find their language.
import { useState } from 'react';
import useInstall from './useInstall';
import { speak, unlockAudio, getLearnMode, setLearnMode, getVoiceChoice, setVoiceChoice, diagnoseVoice } from '@/lib/client';
import { voiceStatus } from '@/lib/voice';
import { T } from '@/lib/i18n';
import { LANGS } from '@/lib/langs';

export default function Settings({ lang, setLang, muted, toggleMute, onClose, onApps, appsLabel, onMismatch }) {
  const [canInstall, install] = useInstall();
  const [tested, setTested] = useState(false);
  const [mode, setMode] = useState(getLearnMode());
  const [voice, setVoice] = useState(getVoiceChoice());
  const [diag, setDiag] = useState(null);
  const [told, setTold] = useState(false);
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
        <details className="more-sound">
          <summary>{t.moreSound}</summary>
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
        <label className="settings-row">
          <span>{t.voiceChoice}</span>
          <select
            value={voice}
            onChange={(e) => {
              setVoice(e.target.value);
              setVoiceChoice(e.target.value);
            }}
          >
            <option value="auto">{t.voiceAuto}</option>
            <option value="phone">{t.voicePhoneOwn}</option>
          </select>
        </label>
        <div className="settings-row">
          <span>{t.diagTitle}</span>
          <button className="toggle" onClick={async () => setDiag(await diagnoseVoice(lang))}>
            {t.diagBtn}
          </button>
        </div>
        {diag && (
          <ul className="diag">
            {[
              [!diag.muted, t.diagSound, t.diagSoundFix],
              [diag.speech, t.diagBrowser, t.diagBrowserFix],
              [diag.voices > 0 && !!diag.pick, `${t.diagVoice}${diag.pick ? ': ' + diag.pick : ''}`, t.diagVoiceFix],
              [diag.unlocked, t.diagUnlocked, t.diagUnlockedFix],
              [diag.server, t.diagServer, t.diagServerFix],
              [!diag.lastError, t.diagErrors, diag.lastError],
            ].map(([ok, label, fix], i) => (
              <li key={i} className={ok ? 'ok' : 'bad'}>
                <b>{ok ? '✓' : '✗'}</b> {label}
                {!ok && fix ? <small>{fix}</small> : null}
              </li>
            ))}
            <li>
              <small>{t.diagHint}</small>
            </li>
          </ul>
        )}
        {tested && (
          <p className="muted small" style={{ margin: '6px 0 0' }}>
            {voiceStatus.server ? t.voiceNatural : t.voicePhone}
            {voiceStatus.lastError ? ` (${voiceStatus.lastError})` : ''}
          </p>
        )}
        </details>
        {onApps && (
          <div className="settings-row">
            <span>{bi('My apps', 'मेरे ऐप', 'എന്റെ ആപ്പുകൾ')}</span>
            <button className="toggle" onClick={onApps}>
              {appsLabel || 'Choose'}
            </button>
          </div>
        )}
        {onMismatch && (
          <div className="settings-row">
            <span>{told ? t.mismatchThanks : t.mismatchQ}</span>
            {!told && (
              <button
                className="toggle"
                onClick={() => {
                  onMismatch();
                  setTold(true);
                }}
              >
                {t.mismatchBtn}
              </button>
            )}
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
