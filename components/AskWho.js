'use client';
// The "ask someone" button. With trusted contacts saved, one button per person opens WhatsApp straight to them.
import { useEffect, useState } from 'react';
import Icon from './Icons';
import { getTrusted } from '@/lib/trusted';

export default function AskWho({ t, label, onAsk, type = 'button' }) {
  const [trusted, setTrusted] = useState([]);
  useEffect(() => setTrusted(getTrusted()), []);
  if (!trusted.length)
    return (
      <button className="btn wa-btn" type={type} onClick={type === 'button' ? () => onAsk(null) : undefined}>
        <Icon name="share" size={22} /> {label}
      </button>
    );
  return trusted.map((c) => (
    <button key={c.number} className="btn wa-btn" type="button" onClick={() => onAsk(c)}>
      <Icon name="share" size={22} /> {t.askName(c.name)}
    </button>
  ));
}
