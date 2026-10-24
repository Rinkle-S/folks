'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from './Icons';

// The real app icons, exactly as they appear on the Play Store (and so on the parent's phone).
// Loaded from Google's Play Store image server. If one can't load, the drawn badge below is shown.
const PLAY = 'https://play-lh.googleusercontent.com/';
const REAL = {
  gpay: 'Wbik2RoUSGgWEg8ybAhFaMJO2fE7x9gqCXfwbmW0YPjh6TKcjKzecth8GaYkbUBYtLZXhyfVMpqkIuJgTM8p',
  whatsapp: 'Gqxk4T0uZsDwFp07DE-508hkyvcNmgFuRwPiwTEfF7D7OzGv1FdHDzEyMxNsSBZLOJlGpe3ULvVM2RgrRAlBqA',
  uber: 'OXQnDlRtPa5ha6KCnKPqVmxHYBP7tjrAa7PXGNRqcwDC_J03HVeuEKcKrkcIqnfOqsF5uy3uwWxIXR067QHsNQ',
  rapido: '94XgU5OUmk5HIyv6gn9ZVJWudLxUjeAunu8QcORlmEx3sG_bw8NArUjvKx3lSAXsJAOYf7qfz1Fi7E-xEN4O',
  zomato: 'F3A40FhcqC9fAoPeYpC_olDg2Upkq1UsylJCvmZmB7a26R0S6L-2Zo35-exR8n-__0M-uFTHq3T_nbS9oxDQ15w',
  phonepe: 'ARGoCZk-5QCKPpyTsGhn1WahhPbVMa95T1U7clwnI8gjtW-YNY96rAANqFkuENbU35IbYF2Gjg2UjZXA495x0A',
  yono: 'S7fFzuIKI7cFtClNrKuCrwNTZ9WpJEPP3dx2CAn44_1qA4g88QL3_nnQvM82fqLfdvFKITVWvPisYFl-NeA5',
  irctc: 'zwiNMuB10nmp3HTXdM9gNoAZBAQOur4AvXr-JMr9PPmsYtqxPGGGp-RJnKC14WVcnPWjhMpmb876okDltLDD0g',
  maps: 'B8pdO_2K5nBsF0g1h6dKwV_jQFLP-XombGDEQGtJT-mw1EUKCKJpa9lBGCF4rP_MwCsozSXyvI3z19g9R3J4',
};

// App badges that match the real icons in colour and shape, so parents recognise them on their phone,
// without copying the real logos.
const STYLE = {
  gpay: { bg: '#ffffff', border: '#dadce0' },
  phonepe: { bg: '#5f259f', border: '#5f259f', fg: '#ffffff', icon: 'upi' },
  whatsapp: { bg: '#25d366', border: '#25d366' },
  uber: { bg: '#000000', border: '#000000' },
  rapido: { bg: '#f9d01b', border: '#f9d01b', fg: '#1c1c1c', icon: 'bike' },
  zomato: { bg: '#e23744', border: '#e23744', fg: '#ffffff', icon: 'bag' },
  yono: { bg: '#7b1e7a', border: '#7b1e7a', fg: '#ffffff', icon: 'bank' },
  irctc: { bg: '#1a3e8f', border: '#1a3e8f', fg: '#ffffff', icon: 'list' },
  maps: { bg: '#ffffff', border: '#dadce0', fg: '#ea4335', icon: 'pin' },
  playstore: { bg: '#ffffff', border: '#dadce0' },
  phone: { bg: '#3d6a8c', border: '#3d6a8c', fg: '#ffffff', icon: 'phone' },
  other: { bg: '#f5f5f4', border: '#d6d3d1', fg: '#57534e', icon: 'more' },
};

function Glyph({ app }) {
  switch (app) {
    case 'gpay':
      // A four-colour ring, like the colourful "G".
      return (
        <svg viewBox="0 0 24 24" width="62%" height="62%">
          <path d="M12 4a8 8 0 0 1 6.2 2.9" stroke="#ea4335" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M18.2 6.9A8 8 0 0 1 20 12h-8" stroke="#4285f4" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M20 12a8 8 0 0 1-11.3 7.3" stroke="#34a853" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M8.7 19.3A8 8 0 0 1 12 4" stroke="#fbbc04" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" width="64%" height="64%" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
          <path d="M9 8.2c.3-.4.8-.4 1 0l.8 1.6c.1.3 0 .6-.2.8l-.5.5c.5 1.2 1.6 2.3 2.8 2.8l.5-.5c.2-.2.5-.3.8-.2l1.6.8c.4.2.4.7 0 1-.9.9-2 1.2-3.2.6A9 9 0 0 1 8.4 11.4c-.6-1.2-.3-2.3.6-3.2z" fill="#fff" stroke="none" />
        </svg>
      );
    case 'playstore':
      return (
        <svg viewBox="0 0 24 24" width="58%" height="58%">
          <path d="M5 3.2v17.6l9.2-8.8z" fill="#00c4ff" />
          <path d="M5 3.2l12.4 7.1-3.2 1.7z" fill="#00e676" />
          <path d="M5 20.8l12.4-7.1-3.2-1.7z" fill="#ff3d57" />
          <path d="M17.4 10.3l3.2 1.7-3.2 1.7-3.2-1.7z" fill="#ffc400" />
        </svg>
      );
    case 'uber':
      return <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.3em', fontFamily: 'Roboto, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Uber</span>;
    default:
      return null;
  }
}

export default function AppIcon({ app, size = 34 }) {
  const [state, setState] = useState('loading'); // loading | loaded | failed
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setState('loaded'); // already cached before the page came alive
  }, []);
  const s = STYLE[app] || STYLE.other;
  const custom = !s.icon;
  const px = size <= 48 ? 96 : 192;
  return (
    <span
      className="app-icon"
      style={{ width: size, height: size, background: s.bg, borderColor: s.border, color: s.fg, fontSize: size, position: 'relative', overflow: 'hidden' }}
      aria-hidden="true"
    >
      {custom ? <Glyph app={app} /> : <Icon name={s.icon} size={size * 0.58} stroke={2.2} />}
      {REAL[app] && state !== 'failed' && (
        <img
          ref={ref}
          className="app-img"
          src={`${PLAY}${REAL[app]}=s${px}`}
          width={size}
          height={size}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{ opacity: state === 'loaded' ? 1 : 0 }}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
        />
      )}
    </span>
  );
}
