'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LangPicker from './LangPicker';
import { LESSONS, COMING_SOON, findLesson, findSoon } from '@/lib/lessons';
import { matchLesson } from '@/lib/match';
import { T } from '@/lib/i18n';
import { useLang, speak, track, whatsappLink } from '@/lib/client';

export default function Home() {
  const [lang, setLang] = useLang();
  const [state, setState] = useState('idle'); // idle | listening | result
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [typedQ, setTypedQ] = useState('');
  const [micOk, setMicOk] = useState(true);
  const [asked, setAsked] = useState(false);
  const recRef = useRef(null);

  useEffect(() => {
    const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    setMicOk(!!SR);
  }, []);

  if (lang === undefined) return <div className="page" />;
  if (lang === null) return <LangPicker onPick={setLang} />;
  const t = T[lang];

  function handleQuery(q, via) {
    const m = matchLesson(q);
    setQuery(q);
    setResult(m);
    setAsked(false);
    setState('result');
    track('voice_search', { meta: { q: q.slice(0, 200), via, match: m ? m.id : null, lang } });
    if (m && m.kind === 'lesson') speak(`${t.confirmQ} ${LESSONS[m.id].title[lang]}`, lang);
    else if (m) speak(t.soonMsg, lang);
    else speak(t.noMatch, lang);
  }

  function startMic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicOk(false);
      return;
    }
    try {
      const rec = new SR();
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => {
        const q = e.results[0][0].transcript;
        handleQuery(q, 'voice');
      };
      rec.onerror = (e) => {
        setState('idle');
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setMicOk(false);
      };
      rec.onend = () => setState((s) => (s === 'listening' ? 'idle' : s));
      recRef.current = rec;
      setState('listening');
      rec.start();
    } catch {
      setMicOk(false);
      setState('idle');
    }
  }

  function askChild(text) {
    setAsked(true);
    track('ask_child', { meta: { q: text.slice(0, 200), lang } });
    window.open(whatsappLink(t.askChildMsg(text)), '_blank', 'noopener');
  }

  function tapSoon(s) {
    track('tile_soon', { meta: { id: s.id, lang } });
    setQuery(s.title[lang]);
    setResult({ id: s.id, kind: 'soon' });
    setAsked(false);
    setState('result');
    speak(t.soonMsg, lang);
  }

  const matched = result && result.kind === 'lesson' ? findLesson(result.id) : null;
  const soon = result && result.kind === 'soon' ? findSoon(result.id) : null;

  return (
    <div className="page home">
      <header className="home-top">
        <div>
          <div className="brand">Folks</div>
          <div className="tagline">{t.appTagline}</div>
        </div>
        <button className="chip" onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}>
          {lang === 'hi' ? 'English' : 'हिंदी'}
        </button>
      </header>

      {state !== 'result' && (
        <section className="ask">
          <h1>{t.askTitle}</h1>
          <button
            className={`mic ${state === 'listening' ? 'on' : ''}`}
            onClick={startMic}
            aria-label={t.askTitle}
            disabled={state === 'listening'}
          >
            🎤
          </button>
          <p className="ask-sub">{state === 'listening' ? t.listening : micOk ? t.askSub : t.micUnsupported}</p>
          <form
            className="type-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (typedQ.trim()) handleQuery(typedQ.trim(), 'typed');
            }}
          >
            <input value={typedQ} onChange={(e) => setTypedQ(e.target.value)} placeholder={t.typePlaceholder} />
            <button className="btn small" type="submit">
              {t.search}
            </button>
          </form>
        </section>
      )}

      {state === 'result' && (
        <section className="result">
          <p className="said">
            {t.youSaid}: <b>"{query}"</b>
          </p>
          {matched && (
            <div className="card confirm">
              <p>{t.confirmQ}</p>
              <div className="confirm-lesson">
                <span>{matched.emoji}</span>
                {matched.title[lang]}
              </div>
              <Link className="btn primary" href={`/lesson/${matched.id}`}>
                {t.yesStart} →
              </Link>
              <button className="btn ghost" onClick={() => setState('idle')}>
                {t.noOther}
              </button>
            </div>
          )}
          {!matched && (
            <div className="card">
              <p>{soon ? `${soon.emoji} ${soon.title[lang]} — ${t.soonMsg}` : t.noMatch}</p>
              <button className="btn wa-btn" onClick={() => askChild(soon ? soon.title[lang] : query)}>
                💬 {t.askChild}
              </button>
              {asked && <p className="thanks">{t.thanks}</p>}
              <button className="btn ghost" onClick={() => setState('idle')}>
                🎤 {t.tryAgain}
              </button>
            </div>
          )}
        </section>
      )}

      <section className="tiles">
        <h2>{t.orPick}</h2>
        {Object.values(LESSONS).map((l) => (
          <Link key={l.id} href={`/lesson/${l.id}`} className="tile">
            <span className="tile-emoji">{l.emoji}</span>
            <span className="tile-title">{l.title[lang]}</span>
            <span className="tile-go">›</span>
          </Link>
        ))}
        {COMING_SOON.map((s) => (
          <button key={s.id} className="tile soon" onClick={() => tapSoon(s)}>
            <span className="tile-emoji">{s.emoji}</span>
            <span className="tile-title">{s.title[lang]}</span>
            <span className="tag">{t.soonTag}</span>
          </button>
        ))}
      </section>

      <footer className="home-foot">
        <Link href="/send">{t.childLink}</Link>
      </footer>
    </div>
  );
}
