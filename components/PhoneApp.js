'use client';
// Desktop only: a QR code to open Folks on a phone and add it to the home screen,
// plus an install button when the browser offers one.
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Icon from './Icons';
import useInstall from './useInstall';

export default function PhoneApp({ t }) {
  const [qr, setQr] = useState('');
  const [host, setHost] = useState('');
  const [canInstall, install] = useInstall();

  useEffect(() => {
    setHost(window.location.host);
    QRCode.toString(window.location.origin + '/', {
      type: 'svg',
      margin: 0,
      color: { dark: '#142420', light: '#ffffff' },
    })
      .then(setQr)
      .catch(() => {});
  }, []);

  return (
    <div className="phone-app">
      <div className="phone-app-row">
        <div className="phone-qr" dangerouslySetInnerHTML={{ __html: qr }} />
        <div>
          <b>{t.phoneTitle}</b>
          <span>{t.phoneSub}</span>
          <small>{host}</small>
        </div>
      </div>
      {canInstall && (
        <button className="btn ghost" onClick={install}>
          <Icon name="download" size={22} /> {t.installHere}
        </button>
      )}
    </div>
  );
}
