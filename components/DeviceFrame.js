'use client';
// On a laptop or desktop, show Folks inside a phone frame with a short explainer and a QR code to
// open it on a phone. On phones this wrapper adds nothing.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import QRCode from 'qrcode';

export default function DeviceFrame({ children }) {
  const path = usePathname() || '/';
  const [qr, setQr] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const u = window.location.origin + path;
    setUrl(window.location.host + path);
    QRCode.toString(u, { type: 'svg', margin: 0, color: { dark: '#142420', light: '#ffffff' } })
      .then(setQr)
      .catch(() => {});
  }, [path]);

  if (path.startsWith('/stats')) return children;

  return (
    <div className="desk">
      <aside className="desk-panel" aria-label="About Folks">
        <div className="brand big">
          <span className="brand-mark" style={{ width: 52, height: 52, borderRadius: 16, fontSize: 30 }}>
            F
          </span>
          Folks
        </div>
        <h1 className="desk-h">Phone help for your folks</h1>
        <p className="desk-p">
          Parents aged 55+ practise everyday phone tasks with fake money, a voice guide and a glowing pointer, in English
          or Hindi. Then they do it for real, on their own.
        </p>
        <ul className="desk-list">
          <li>8 lessons across Google Pay, WhatsApp and Google Drive</li>
          <li>Practise, watch, or read each lesson</li>
          <li>Spot-the-scam practice with real-looking messages</li>
          <li>Ask anyone to make a lesson for something new</li>
        </ul>
        <div className="desk-qr">
          {qr ? <div className="desk-qr-img" dangerouslySetInnerHTML={{ __html: qr }} /> : <div className="desk-qr-img" />}
          <div>
            <b>Best on a phone</b>
            <span>Scan to open this page on your phone, or try it here on the right.</span>
            <small>{url}</small>
          </div>
        </div>
      </aside>
      <div className="device">
        <div className="device-screen">
          <div className="device-scroll">{children}</div>
        </div>
      </div>
    </div>
  );
}
