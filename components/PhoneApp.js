'use client';
// Wide screens only: a small card beside the app with a QR code to open Nook on a phone.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import QRCode from 'qrcode';
import { T } from '@/lib/i18n';
import { useLang } from '@/lib/client';

export default function PhoneApp() {
  const [lang] = useLang();
  const path = usePathname() || '/';
  const [qr, setQr] = useState('');
  const [host, setHost] = useState('');

  useEffect(() => {
    setHost(window.location.host);
    QRCode.toString(window.location.origin + path, { type: 'svg', margin: 0, color: { dark: '#142420', light: '#ffffff' } })
      .then(setQr)
      .catch(() => {});
  }, [path]);

  if (!lang || path.startsWith('/stats')) return null;
  const t = T[lang];
  return (
    <aside className="phone-app" aria-label={t.scanPhone}>
      <div className="phone-qr" dangerouslySetInnerHTML={{ __html: qr }} />
      <b>{t.scanPhone}</b>
      <span>{t.scanPhoneSub}</span>
      <small>{host}</small>
    </aside>
  );
}
