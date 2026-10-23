'use client';
import { useEffect, useRef, useState } from 'react';
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
  flipkart: 'mlWjVjxflQoYJHBBgDQ08FqT8i3KnDG__2RH8P-GWOKlEPAIo8TllTZo3HDQ3J5zlO6oAhc1FAv0Bf2on0wL8w',
  instagram: 'yHi59jmO_lVamcyJ1i3rM1_E8bAiAspShnGjjURq05ipQQSUksO3QVEsXTegRSqul038-4YNA7O644XAcx251Q',
  spotify: 'IzQgYCcnCFCD08GR-3bdtcT8xzOvrNkC84avGT5CwTX2VIqmTmKKJcP_Cd4JoBOdmCMlTndlOzV6hrthg2fOWA',
  yono: 'S7fFzuIKI7cFtClNrKuCrwNTZ9WpJEPP3dx2CAn44_1qA4g88QL3_nnQvM82fqLfdvFKITVWvPisYFl-NeA5',
  icici: 'dmco3u7SKC9ldQVrGknBkeNeaMUVYAcWzo1hNtb4AbxIcR_EP-0drTWvDhi3C_wC7ul5oynYpKJBVZhKr4GCAA',
  blinkit: 'dY1ryTjOaVsnslxvNamNvSBulmDUkvW5f5FJ_HDApMfecSOIxjCafpNAv4LTG8TJVyp0XR9tAAaRI4K77Eiqfg',
  zepto: 'jrtmMFv4qjtgMPQeaQzUFZ3EYBkHd_8OFYl6O1Ngt5Pey52RJAR4u8K4IoPILkJz76a7s5U3DNaY3r3xnl7t8X4',
  irctc: 'zwiNMuB10nmp3HTXdM9gNoAZBAQOur4AvXr-JMr9PPmsYtqxPGGGp-RJnKC14WVcnPWjhMpmb876okDltLDD0g',
  maps: 'B8pdO_2K5nBsF0g1h6dKwV_jQFLP-XombGDEQGtJT-mw1EUKCKJpa9lBGCF4rP_MwCsozSXyvI3z19g9R3J4',
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
  flipkart: { bg: '#fddb00', border: '#fddb00', fg: '#2874f0', icon: 'bag' },
  instagram: { bg: '#d6249f', border: '#d6249f', fg: '#ffffff', icon: 'camera' },
  spotify: { bg: '#000000', border: '#000000', fg: '#1db954', icon: 'volume' },
  yono: { bg: '#7b1e7a', border: '#7b1e7a', fg: '#ffffff', icon: 'bank' },
  icici: { bg: '#ffffff', border: '#dadce0', fg: '#b02a30', icon: 'bank' },
  blinkit: { bg: '#f8d34a', border: '#f8d34a', fg: '#1c1c1c', icon: 'bag' },
  zepto: { bg: '#6a1fb5', border: '#6a1fb5', fg: '#ffffff', icon: 'bag' },
  irctc: { bg: '#1a3e8f', border: '#1a3e8f', fg: '#ffffff', icon: 'list' },
  maps: { bg: '#ffffff', border: '#dadce0', fg: '#ea4335', icon: 'pin' },
  phone: { bg: '#1e8e3e', border: '#1e8e3e', fg: '#ffffff', icon: 'phone' },
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
