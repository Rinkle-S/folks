'use client';
// For the son or daughter. No app and no login: it is a normal web page.
// 1) Send a practice lesson or a quick guide to a parent on WhatsApp.
// 2) Set up Folks for a parent: language and apps are filled in from the link, so the parent just opens it.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LESSONS } from '@/lib/lessons';
import { GUIDE_LIST } from '@/lib/guides';
import { ALL_APPS } from '@/lib/apps';
import { track, whatsappLink } from '@/lib/client';
import { getProfile } from '@/lib/profile';
import { LANGS } from '@/lib/langs';

const MSG = {
  en: {
    lesson: (title, link, sign) => `🙏 A short practice lesson for you: "${title}". It's only practice, no real money is used. Take your time, just tap this link:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 Here are the steps for: "${title}". Take your time, one step at a time. Tap this link:\n${link}${sign}`,
    setup: (link, sign) => `🙏 I set up Folks for you. It teaches phone things step by step, in your language, with practice screens. Just tap this link and it is ready:\n${link}${sign}`,
  },
  hi: {
    lesson: (title, link, sign) => `🙏 आपके लिए एक छोटा सा अभ्यास: "${title}"। यह सिर्फ़ प्रैक्टिस है, असली पैसे नहीं कटेंगे। आराम से सीखिए, यह लिंक दबाइए:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 यह रहे इसके कदम: "${title}"। आराम से, एक-एक कदम। यह लिंक दबाइए:\n${link}${sign}`,
    setup: (link, sign) => `🙏 मैंने आपके लिए Folks तैयार कर दिया है। यह फ़ोन की बातें कदम-कदम सिखाता है, आपकी भाषा में, अभ्यास स्क्रीन के साथ। बस यह लिंक दबाइए:\n${link}${sign}`,
  },
  ml: {
    lesson: (title, link, sign) => `🙏 നിങ്ങൾക്കായി ഒരു ചെറിയ പരിശീലന പാഠം: "${title}". ഇത് പരിശീലനം മാത്രമാണ്, യഥാർത്ഥ പണം പോകില്ല. സാവധാനം പഠിക്കൂ, ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
    guide: (title, link, sign) => `🙏 ഇതിന്റെ ഘട്ടങ്ങൾ ഇതാ: "${title}". സാവധാനം, ഓരോ ഘട്ടമായി. ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
    setup: (link, sign) => `🙏 ഞാൻ നിങ്ങൾക്കായി Folks സെറ്റ് ചെയ്തിട്ടുണ്ട്. ഫോണിലെ കാര്യങ്ങൾ നിങ്ങളുടെ ഭാഷയിൽ ഘട്ടം ഘട്ടമായി പഠിപ്പിക്കും. ഈ ലിങ്ക് അമർത്തൂ:\n${link}${sign}`,
  },
};

export default function Send() {
  const [mode, setMode] = useState('item'); // item | setup
  const [name, setName] = useState('');
  const [item, setItem] = useState('l:qr-pay');
  const [lang, setLang] = useState('en');
  const [apps, setApps] = useState([]);
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    setName(getProfile().name || '');
  }, []);

  const [kind, id] = item.split(':');
  const params = new URLSearchParams({ lang });
  if (name.trim()) params.set('from', name.trim());
  let link;
  let title = '';
  if (mode === 'setup') {
    if (apps.length) params.set('apps', apps.join(','));
    link = `${origin}/?${params.toString()}`;
  } else if (kind === 'g') {
    const g = GUIDE_LIST.find((x) => x.id === id);
    title = g ? g.title[lang] : '';
    link = `${origin}/guide/${id}?${params.toString()}`;
  } else {
    const l = LESSONS[id];
    title = l ? l.title[lang] : '';
    link = `${origin}/lesson/${id}?${params.toString()}`;
  }
  const sign = name.trim() ? `\n${name.trim()}` : '';
  const m = MSG[lang] || MSG.en;
  const message = mode === 'setup' ? m.setup(link, sign) : kind === 'g' ? m.guide(title, link, sign) : m.lesson(title, link, sign);
  const toggleApp = (a) => setApps(apps.includes(a) ? apps.filter((x) => x !== a) : [...apps, a]);
  const via = (v) => track('link_created', { lesson: mode === 'item' ? id : undefined, meta: { lang, via: v, mode, kind } });

  return (
    <div className="page send">
      <Link href="/" className="brand">
        <span className="brand-mark">F</span>
        Folks
      </Link>
      <h1>Help your parent with Folks</h1>
      <p className="muted">
        Your parent does not need to install anything. They tap the link you send on WhatsApp and it opens in their phone. You do not
        need the app either. This page works in any browser.
      </p>

      <div className="seg">
        <button className={mode === 'item' ? 'on' : ''} onClick={() => setMode('item')}>
          Send a lesson or guide
        </button>
        <button className={mode === 'setup' ? 'on' : ''} onClick={() => setMode('setup')}>
          Set up Folks for them
        </button>
      </div>

      <label className="field">
        <span>Your name (shown to your parent)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rinkle" maxLength={40} />
      </label>

      <div className="field">
        <span>Their language</span>
        <div className="seg">
          {LANGS.map((x) => (
            <button key={x.id} className={lang === x.id ? 'on' : ''} onClick={() => setLang(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      </div>

      {mode === 'item' ? (
        <label className="field">
          <span>What should they learn?</span>
          <select value={item} onChange={(e) => setItem(e.target.value)}>
            <optgroup label="Practice lessons (fake screens)">
              {Object.values(LESSONS).filter((x) => !x.id.startsWith('gd-')).map((x) => (
                <option key={x.id} value={`l:${x.id}`}>
                  {x.title.en}
                </option>
              ))}
            </optgroup>
            <optgroup label="More practice lessons">
              {GUIDE_LIST.map((x) => (
                <option key={x.id} value={`l:gd-${x.id}`}>
                  {x.appName}: {x.title.en}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      ) : (
        <div className="field">
          <span>Which apps are on their phone?</span>
          <div className="apps-grid">
            {ALL_APPS.map((a) => (
              <button key={a.id} className={`app-pick ${apps.includes(a.id) ? 'on' : ''}`} onClick={() => toggleApp(a.id)} aria-pressed={apps.includes(a.id)}>
                <span>{a.name}</span>
                {apps.includes(a.id) && <i>✓</i>}
              </button>
            ))}
          </div>
          <p className="muted small">Their apps will show first, and the language is already chosen when they open the link.</p>
        </div>
      )}

      <div className="preview">{message}</div>

      <a className="btn wa-btn" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" onClick={() => via('whatsapp')}>
        Send on WhatsApp
      </a>
      <button
        className="btn ghost"
        onClick={() => {
          try {
            navigator.clipboard.writeText(link);
            setCopied(true);
            via('copy');
          } catch {}
        }}
      >
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
