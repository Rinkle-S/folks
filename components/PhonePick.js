'use client';
// "We think this is a Samsung phone. Right?" with a No option that opens the brand list.
import { useEffect, useState } from 'react';
import { T } from '@/lib/i18n';
import { BRANDS, brandName, detectPhone } from '@/lib/profile';

export default function PhonePick({ lang, value, onChange }) {
  const t = T[lang];
  const [guess, setGuess] = useState(undefined); // undefined = looking, null = could not tell
  const [choosing, setChoosing] = useState(false);

  useEffect(() => {
    let live = true;
    detectPhone().then((g) => {
      if (!live) return;
      setGuess(g && g.brand ? g : null);
      if (g && g.brand && !value.brand) onChange({ brand: g.brand, model: g.model });
    });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showList = choosing || guess === null || !value.brand;
  return (
    <div className="phone-pick">
      {!showList && value.brand && (
        <div className="card">
          <p>
            <b>{t.phoneDetected(brandName(value.brand))}</b>
          </p>
          {value.model && <p className="muted small">{value.model}</p>}
          <button className="btn primary" onClick={() => setChoosing(false)} aria-pressed="true">
            {t.phoneYes}
          </button>
          <button className="btn ghost" onClick={() => setChoosing(true)}>
            {t.phoneNo}
          </button>
        </div>
      )}
      {showList && (
        <>
          <p className="muted">{guess === undefined ? '…' : t.phoneChoose}</p>
          <div className="brand-grid">
            {BRANDS.map(([id, name]) => (
              <button key={id} className={value.brand === id ? 'on' : ''} onClick={() => onChange({ brand: id, model: value.brand === id ? value.model : '' })} aria-pressed={value.brand === id}>
                {name}
              </button>
            ))}
          </div>
          {value.brand && (
            <label className="field">
              <span>{t.phoneModelPh}</span>
              <input value={value.model} onChange={(e) => onChange({ brand: value.brand, model: e.target.value })} maxLength={40} placeholder={value.brand === 'iphone' ? 'iPhone 13' : ''} />
            </label>
          )}
          <p className="muted small">{t.phoneWhy}</p>
        </>
      )}
    </div>
  );
}
