'use client';
// Settings sheet: language and sound. Labels are bilingual so anyone can find their language.
import { useState } from 'react';
import useInstall from './useInstall';
import { speak, unlockAudio } from '@/lib/client';
import { voiceStatus } from '@/lib/voice';
import { T } from '@/lib/i18n';

export default function Settings({ lang, setLang, muted, toggleMute, onClose, onApps, appsLabel }) {
  const [canInstall, install] = useInstall();
  const [tested, setTested] = useState(false);
  const t = T[lang] || T.en;
  return (
    <div className="settings-wrap" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className="settings-h">
          <b>Settings / सेटिंग</b>
        </div>
        <label className="settings-row">
          <span>Language / भाषा</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </label>
        <div className="settings-row">
          <span>Sound / आवाज़</span>
          <button className={`toggle ${muted ? '' : 'on'}`} onClick={toggleMute} aria-pressed={!muted}>
            {muted ? 'Off / बंद' : 'On / चालू'}
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
            <span>My apps / मेरे ऐप</span>
            <button className="toggle" onClick={onApps}>
              {appsLabel || 'Choose'}
            </button>
          </div>
        )}
        {canInstall && (
          <div className="settings-row">
            <span>{lang === 'hi' ? 'फ़ोन पर ऐप की तरह जोड़ें' : 'Add Folks to home screen'}</span>
            <button className="toggle on" onClick={install}>
              {lang === 'hi' ? 'जोड़ें' : 'Add'}
            </button>
          </div>
        )}
        <button className="btn primary" onClick={onClose}>
          {lang === 'hi' ? 'ठीक है' : 'Done'}
        </button>
      </div>
    </div>
  );
}
