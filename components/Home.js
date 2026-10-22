'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Settings from './Settings';
import AppIcon from './AppIcon';
import { LESSONS, APPS, findLesson } from '@/lib/lessons';
import { matchLesson } from '@/lib/match';
import { T } from '@/lib/i18n';
import { useLang, useMute, speak, track, whatsappLink } from '@/lib/client';

export default function Home() {
  const [lang, setLang] = useLang();
  const [muted, toggleMute] = useMute();
  const [state, setState] = useState('idle'); // idle | listening | processing | result
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [typedQ, setTypedQ] = useState('');
  const [micMsg, setMicMsg] = useState('');
  const [inApp, setInApp] = useState(false);
  const [asked, setAsked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [serverStt, setServerStt] = useState(false);
  const recRef = useRef(null);
  const gotResult = useRef(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    // WhatsApp, Instagram, Facebook etc. open links in their own browser, where the mic usually doesn't work.
    setInApp(/Android/i.test(ua) && (/; wv\)/.test(ua) || /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua)));
    // Is server speech-to-text switched on? (Only when the owner enables it, because it uses paid credits.)
    fetch('/api/stt')
      .then((r) => r.json())
      .then((j) => setServerStt(!!j.enabled))
      .catch(() => {});
  }, []);

  if (!lang) return <div className="page" />;
  const t = T[lang];

  function handleQuery(q, via) {
    const m = matchLesson(q);
    setQuery(q);
    setResult(m && m.kind === 'lesson' ? m : null);
    setAsked(false);
    setMicMsg('');
    setState('result');
    track('voice_search', { meta: { q: q.slice(0, 200), via, match: m ? m.id : null, lang } });
    if (m && m.kind === 'lesson') speak(`${t.confirmQ} ${LESSONS[m.id].title[lang]}`, lang);
    else speak(t.noMatch, lang);
  }

  // Record with the phone mic and send to the server for transcription (Sarvam), if enabled.
  async function recordOnServer() {
    if (state === 'listening' && mediaRef.current) {
      try {
        mediaRef.current.stop();
      } catch {}
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mime = (window.MediaRecorder && types.find((m) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m))) || '';
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks = [];
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((tr) => tr.stop());
        mediaRef.current = null;
        setState('processing');
        try {
          const type = rec.mimeType || mime || 'audio/webm';
          const blob = new Blob(chunks, { type });
          const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
          const fd = new FormData();
          fd.append('file', blob, `voice.${ext}`);
          fd.append('lang', lang);
          const r = await fetch('/api/stt', { method: 'POST', body: fd });
          const j = await r.json();
          if (r.ok && j.transcript && j.transcript.trim()) handleQuery(j.transcript.trim(), 'voice');
          else {
            setState('idle');
            setMicMsg(t.micNoSpeech);
          }
        } catch {
          setState('idle');
          setMicMsg(t.micNetwork);
        }
      };
      mediaRef.current = rec;
      setMicMsg('');
      setState('listening');
      rec.start();
      setTimeout(() => {
        if (rec.state === 'recording') rec.stop();
      }, 6000);
    } catch (e) {
      setState('idle');
      setMicMsg(inApp ? t.micInApp : t.micDenied);
      track('mic_error', { meta: { error: 'getUserMedia', inApp, lang } });
    }
  }

  // Free browser speech recognition (works well in Chrome on Android).
  function recordInBrowser() {
    if (state === 'listening' && recRef.current) {
      try {
        recRef.current.stop();
      } catch {}
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicMsg(inApp ? t.micInApp : t.micUnsupported);
      track('mic_error', { meta: { error: 'unsupported', inApp, lang } });
      return;
    }
    try {
      const rec = new SR();
      rec.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 1;
      gotResult.current = false;
      let errored = false;
      rec.onresult = (e) => {
        gotResult.current = true;
        handleQuery(e.results[0][0].transcript, 'voice');
      };
      rec.onerror = (e) => {
        errored = true;
        setState('idle');
        track('mic_error', { meta: { error: e.error, inApp, lang } });
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setMicMsg(inApp ? t.micInApp : t.micDenied);
        else if (e.error === 'no-speech') setMicMsg(t.micNoSpeech);
        else if (e.error === 'network') setMicMsg(t.micBrowser);
        else if (e.error !== 'aborted') setMicMsg(t.micUnsupported);
      };
      rec.onend = () => {
        setState((s) => (s === 'listening' ? 'idle' : s));
        if (!gotResult.current && !errored) setMicMsg(t.micNoSpeech);
      };
      recRef.current = rec;
      setMicMsg('');
      setState('listening');
      rec.start();
    } catch {
      setState('idle');
      setMicMsg(t.micUnsupported);
      track('mic_error', { meta: { error: 'start-failed', inApp, lang } });
    }
  }

  function startMic() {
    if (serverStt) recordOnServer();
    else recordInBrowser();
  }

  function openInChrome() {
    const { host, pathname, search } = window.location;
    window.location.href = `intent://${host}${pathname}${search}#Intent;scheme=https;package=com.android.chrome;end`;
  }

  function askChild(text) {
    setAsked(true);
    track('ask_child', { meta: { q: text.slice(0, 200), lang } });
    window.open(whatsappLink(t.askChildMsg(text)), '_blank', 'noopener');
  }

  const matched = result ? findLesson(result.id) : null;
  const lessons = Object.values(LESSONS);

  return (
    <div className="page home">
      <header className="home-top">
        <div>
          <div className="brand">Folks</div>
          <div className="tagline">{t.appTagline}</div>
        </div>
        <button className="gear" onClick={() => setShowSettings(true)} aria-label="Settings">
          ⚙️
        </button>
      </header>

      {state !== 'result' && (
        <section className="ask">
          <h1>{t.askTitle}</h1>
          <button
            className={`mic ${state === 'listening' ? 'on' : ''}`}
            onClick={startMic}
            aria-label={t.askTitle}
            disabled={state === 'processing'}
          >
            🎤
          </button>
          <p className="ask-sub">
            {state === 'listening' ? t.listening : state === 'processing' ? t.processing : micMsg || t.askSub}
          </p>
          {inApp && (
            <button className="btn ghost chrome-btn" onClick={openInChrome}>
              🌐 {t.openChrome}
            </button>
          )}
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
          {matched ? (
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
          ) : (
            <div className="card">
              <p>{t.noMatch}</p>
              <button className="btn wa-btn" onClick={() => askChild(query)}>
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
        {APPS.map((app) => {
          const list = lessons.filter((l) => l.app === app.id);
          if (!list.length) return null;
          return (
            <div key={app.id} className="app-group">
              <div className="app-group-h">
                <AppIcon app={app.id} />
                {app.name}
              </div>
              {list.map((l) => (
                <Link key={l.id} href={`/lesson/${l.id}`} className="tile">
                  <span className="tile-emoji">{l.emoji}</span>
                  <span className="tile-title">{l.title[lang]}</span>
                  <span className="tile-go">›</span>
                </Link>
              ))}
            </div>
          );
        })}
      </section>

      <footer className="home-foot">
        <Link href="/send">{t.childLink}</Link>
      </footer>

      {showSettings && (
        <Settings lang={lang} setLang={setLang} muted={muted} toggleMute={toggleMute} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
