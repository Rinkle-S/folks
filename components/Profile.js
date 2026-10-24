'use client';
// My profile: name, language, apps, and a way to bring family in. Everything is stored on this phone.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppBar, BottomNav } from './AppShell';
import AppsPicker from './AppsPicker';
import FluencyPick from './FluencyPick';
import { T } from '@/lib/i18n';
import { LANGS } from '@/lib/langs';
import { useLang, getApps, saveApps, track } from '@/lib/client';
import { getProfile, saveProfile } from '@/lib/profile';

export default function Profile() {
  const [lang, setLang] = useLang();
  const [p, setP] = useState(null);
  const [apps, setApps] = useState([]);
  const [showApps, setShowApps] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setP(getProfile());
    setApps(getApps() || []);
  }, []);

  if (!lang || !p) return <div className="page" />;
  const t = T[lang];
  const save = (next) => {
    const clean = saveProfile(next);
    setP(clean);
    setSaved(true);
    track('profile_set', { meta: { hasName: !!clean.name } });
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="shell">
      <AppBar back="/" />
      <main className="shell-main">
        <h1 className="home-h">{t.profileTitle}</h1>

        <label className="field">
          <span>{t.yourName}</span>
          <input className="name-input" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} onBlur={() => save(p)} maxLength={30} placeholder={t.obNamePh} />
        </label>

        <div className="field">
          <span>{t.obFluencyQ}</span>
          <FluencyPick lang={lang} value={p.fluency || ''} onChange={(v) => save({ ...p, fluency: v })} />
        </div>

        <label className="field">
          <span>{lang === 'ml' ? 'Language / ഭാഷ' : 'Language / भाषा / ഭാഷ'}</span>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name ? `${l.label} (${l.name})` : l.label}
              </option>
            ))}
          </select>
        </label>

        <div className="settings-row">
          <span>{t.myApps}</span>
          <button className="toggle" onClick={() => setShowApps(true)}>
            {apps.length ? `${apps.length} ✓` : t.appsFirst}
          </button>
        </div>

        <Link href="/send" className="feature-card">
          <div>
            <b>{t.familyHelper}</b>
            <span>{t.familyHelperSub}</span>
          </div>
        </Link>

        {saved && <p className="thanks">{t.saved}</p>}
      </main>
      <BottomNav active="" t={t} />
      {showApps && (
        <AppsPicker
          t={t}
          initial={apps}
          onSave={(list) => {
            saveApps(list);
            setApps(list);
            setShowApps(false);
          }}
          onClose={() => setShowApps(false)}
        />
      )}
    </div>
  );
}
