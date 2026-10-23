'use client';
import { useState } from 'react';
import Icon from './Icons';

// The real app icons, exactly as they appear on the Play Store (and so on the parent's phone).
// Loaded from Google's Play Store image server. If one can't load, the drawn badge below is shown.
const PLAY = 'https://play-lh.googleusercontent.com/';
const REAL = {
  gpay: 'Wbik2RoUSGgWEg8ybAhFaMJO2fE7x9gqCXfwbmW0YPjh6TKcjKzecth8GaYkbUBYtLZXhyfVMpqkIuJgTM8p',
  whatsapp: 'Gqxk4T0uZsDwFp07DE-508hkyvcNmgFuRwPiwTEfF7D7OzGv1FdHDzEyMxNsSBZLOJlGpe3ULvVM2RgrRAlBqA',
  youtube: 'QNmuZQc9I6Zbe3mWnSr0hycnENqGFCI5p3yE29Hkxtf22T0IWS6zTrpxULLyyjWpB7ONAXDsDQXnXcVWokl3eg',
  uber: 'OXQnDlRtPa5ha6KCnKPqVmxHYBP7tjrAa7PXGNRqcwDC_J03HVeuEKcKrkcIqnfOqsF5uy3uwWxIXR067QHsNQ',
  rapido: '94XgU5OUmk5HIyv6gn9ZVJWudLxUjeAunu8QcORlmEx3sG_bw8NArUjvKx3lSAXsJAOYf7qfz1Fi7E-xEN4O',
  swiggy: 'FJ5W5ygiN-DYfpd2-3LqyN5F-OxDtQ7z_9v5nAeD4vOrN8kQitoOwULactKgKvktXowVEM491wE-unmGmnt8OWM',
  drive: 'chc-Fx3Qi3BisTZw1aOteYK_XkMHUiXKRbX2Hc8shyFI8pYt7DcyUPzVwLGJKIeKCKDD6nFVhEtUrIaEyzcnmA',
  ola: 'X2EES6J1Q6cf18gTsBX-yWvsLrDm31TjwjwbSGE8t8w-v1uEIpHDNExfTF3tw_bbOqeRuYZhPg5mOu-kLWKhJ64',
  zomato: 'F3A40FhcqC9fAoPeYpC_olDg2Upkq1UsylJCvmZmB7a26R0S6L-2Zo35-exR8n-__0M-uFTHq3T_nbS9oxDQ15w',
  amazon: 'E2Nyw1kSrYFvi5DFOznWOR2iXY9mwxwfYHXV37aLHmuKtEW3gs7StIvVptoV2x8_ykiHQQmliwpfDsFm0Quuwbk',
  phonepe: 'ARGoCZk-5QCKPpyTsGhn1WahhPbVMa95T1U7clwnI8gjtW-YNY96rAANqFkuENbU35IbYF2Gjg2UjZXA495x0A',
  paytm: 'WDGsMRuVENnZPEpV4DEaXw12qtMY3em85xpmZqcXzeh0iT_eXFtAU9VUj-Z7xNQQd5DMqrkKSs9D0qbI1rlt',
};

// App badges that match the real icons in colour and shape, so parents recognise them on their phone,
// without copying the real logos.
const STYLE = {
  gpay: { bg: '#ffffff', border: '#dadce0' },
  phonepe: { bg: '#5f259f', border: '#5f259f', fg: '#ffffff', icon: 'upi' },
  paytm: { bg: '#00b9f1', border: '#00b9f1', fg: '#ffffff', icon: 'upi' },
  whatsapp: { bg: '#25d366', border: '#25d366' },
  drive: { bg: '#ffffff', border: '#dadce0' },
  youtube: { bg: '#ff0033', border: '#ff0033' },
  uber: { bg: '#000000', border: '#000000' },
  rapido: { bg: '#f9d01b', border: '#f9d01b', fg: '#1c1c1c', icon: 'bike' },
  swiggy: { bg: '#fc8019', border: '#fc8019' },
  ola: { bg: '#cddc39', border: '#cddc39', fg: '#1c1c1c', icon: 'car' },
  zomato: { bg: '#e23744', border: '#e23744', fg: '#ffffff', icon: 'bag' },
  amazon: { bg: '#232f3e', border: '#232f3e', fg: '#ff9900', icon: 'bag' },
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
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" width="52%" height="52%">
          <path d="M8 5.5l11 6.5-11 6.5z" fill="#fff" />
        </svg>
      );
    case 'uber':
      return <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.3em', fontFamily: 'Roboto, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Uber</span>;
    case 'swiggy':
      return (
        <svg viewBox="0 0 24 24" width="60%" height="60%">
          <path d="M12 2.5a7 7 0 0 0-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 0 0-7-7z" fill="#fff" />
          <path d="M14.6 7.6c-.6-.8-1.6-1.2-2.6-1.1-1.4.1-2.4 1-2.4 2.1 0 2.4 4.9 1.7 4.9 4.1 0 1.1-1 2-2.5 2-1 0-1.9-.4-2.5-1.1" stroke="#fc8019" strokeWidth="1.7" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'drive':
      return (
        <svg viewBox="0 0 24 24" width="66%" height="66%">
          <path d="M8.5 3.5h7l6 10.5h-7z" fill="#fbbc04" />
          <path d="M8.5 3.5L2.5 14l3.5 6 6-10.5z" fill="#34a853" />
          <path d="M6 20h12l3.5-6h-12z" fill="#4285f4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AppIcon({ app, size = 34 }) {
  const [failed, setFailed] = useState(false);
  if (REAL[app] && !failed) {
    const px = size <= 48 ? 96 : 192;
    return (
      <img
        className="app-icon real"
        src={`${PLAY}${REAL[app]}=s${px}`}
        width={size}
        height={size}
        alt=""
        aria-hidden="true"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    );
  }
  const s = STYLE[app] || STYLE.other;
  const custom = !s.icon;
  return (
    <span
      className="app-icon"
      style={{ width: size, height: size, background: s.bg, borderColor: s.border, color: s.fg, fontSize: size }}
      aria-hidden="true"
    >
      {custom ? <Glyph app={app} /> : <Icon name={s.icon} size={size * 0.58} stroke={2.2} />}
    </span>
  );
}
