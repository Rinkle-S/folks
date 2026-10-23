'use client';
// Home: ask by voice or typing, see progress, practise scam-spotting, and pick a lesson by app.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Settings from './Settings';
import AppIcon from './AppIcon';
import AppsPicker from './AppsPicker';
import Icon from './Icons';
import Onboarding from './Onboarding';
import { AppBar, BottomNav } from './AppShell';
import { LESSONS, APPS, findLesson } from '@/lib/lessons';
import { matchLesson } from '@/lib/match';
import { T } from '@/lib/i18n';
import { askSomeone, loadMade, isReady } from '@/lib/ask';
import {
  useLang,
  useMute,
  speak,
  track,
  getApps,
  saveApps,
  getRequests,
  getDone,
  isOnboarded,
  setOnboarded,
} from '@/lib/client';

export default function Home() {
  const [lang, setLang] = useLang();
  const [muted, toggleMute] = useMute();
  const [onboarded, setOb] = useState(undefined);
  const [state, setState] = useState('idle'); // idle | listening | processing | result
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [typedQ, setTypedQ] = useState('');
  const [micMsg, setMicMsg] = useState('');
  const [inApp, setInApp] = useState(false);
  const [asked, setAsked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [serverStt, setServerStt] = useState(false);
  const [myApps, setMyApps] = useState(undefined);
  const [showApps, setShowApps] = useState(false);
  const [made, setMade] = useState([]);
  const [done, setDone] = useState([]);
  const [greet, setGreet] = useState('greetDay');
  const recRef = useRef(null);
  const gotResult = useRef(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    // WhatsApp, Instagram, Facebook etc. open links in their own browser, where the mic usually doesn't work.
    setInApp(/Android/i.test(ua) && (/; wv\)/.test(ua) || /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua)));
    setOb(isOnboarded());
    setMyApps(getApps());
    setDone(getDone());
    const h = new Date().getHours();
    setGreet(h < 12 ? 'greetMorning' : h < 17 ? 'greetDay' : 'greetEvening');
    const reqs = getRequests();
    if (reqs.length) loadMade(reqs).then(setMade);
    // Is server speech-to-text switched on? (Only when the owner enables it, because it uses paid credits.)
    fetch('/api/stt')
      .then((r) => r.json())
      .then((j) => setServerStt(!!j.enabled))
      .catch(() => {});
  }, []);

  if (!lang || onboarded === undefined) return <div className="page" />;
  const t = T[lang];

  if (!onboarded) {
    return (
      <Onboarding
        lang={lang}
        setLang={setLang}
        onDone={(apps) => {
          if (apps) {
            saveApps(apps);
            setMyApps(apps);
            track('apps_set', {
              meta: { apps: apps.join(','), from: 'onboarding' },
            });
          }
          setOnboarded();
          setOb(true);
        }}
      />
    );
  }

  function handleQuery(q, via) {
    const m = matchLesson(q);
    setQuery(q);
    setResult(m && m.kind === 'lesson' ? m : null);
    setAsked(false);
    setMicMsg('');
    setState('result');
    track('voice_search', {
      meta: { q: q.slice(0, 200), via, match: m ? m.id : null, lang },
    });
    if (m && m.kind === 'lesson') speak([t.confirmQ, LESSONS[m.id].title[lang]], lang);
    else speak(t.noMatch, lang);
  }

  // Record with the phone mic and send to the server for transcription (Sarvam). Works in any browser
  // that allows the microphone, including WhatsApp's own browser on most phones.
  async function recordOnServer() {
    if (state === 'listening' && mediaRef.current) {
      try {
        mediaRef.current.stop();
      } catch {}
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      recordInBrowser();
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
    } catch (e) {
      setState('idle');
      setMicMsg(inApp ? t.micInApp : t.micDenied);
      track('mic_error', {
        meta: { error: 'getUserMedia', name: e && e.name, inApp, lang },
      });
      return;
    }
    try {
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mime = types.find((m) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || '';
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks = [];
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach((tr) => tr.stop());
        mediaRef.current = null;
        const type = rec.mimeType || mime || 'audio/webm';
        const blob = new Blob(chunks, { type });
        if (blob.size < 1500) {
          setState('idle');
          setMicMsg(t.micNoSpeech);
          return;
        }
        setState('processing');
        try {
          const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
          const fd = new FormData();
          fd.append('file', blob, `voice.${ext}`);
          fd.append('lang', lang);
          const r = await fetch('/api/stt', { method: 'POST', body: fd });
          const j = await r.json().catch(() => ({}));
          if (r.ok && j.transcript && j.transcript.trim()) {
            handleQuery(j.transcript.trim(), 'voice');
          } else if (r.ok) {
            setState('idle');
            setMicMsg(t.micNoSpeech);
          } else {
            setState('idle');
            setMicMsg(t.micServer);
            track('mic_error', {
              meta: {
                error: 'server',
                status: j.status || r.status,
                detail: j.detail || j.error,
                lang,
              },
            });
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
      stream && stream.getTracks().forEach((tr) => tr.stop());
      setState('idle');
      recordInBrowser();
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
    askSomeone(text, lang, t);
    setAsked(true);
  }

  function saveMyApps(list) {
    saveApps(list);
    setMyApps(list);
    setShowApps(false);
    track('apps_set', { meta: { apps: list.join(',') } });
  }

  const matched = result ? findLesson(result.id) : null;
  const lessons = Object.values(LESSONS);
  const doneCount = lessons.filter((l) => done.includes(l.id)).length;
  const readyMade = made.filter(isReady);
  const mine = myApps || [];
  const orderedApps = [...APPS.filter((a) => mine.includes(a.id)), ...APPS.filter((a) => !mine.includes(a.id))];
  const orderedLessons = orderedApps.flatMap((a) => lessons.filter((l) => l.app === a.id));
  const next = orderedLessons.find((l) => !done.includes(l.id));
  const pct = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="shell">
      <AppBar onSettings={() => setShowSettings(true)} />
      <main className="shell-main">
        <p className="greet">{t[greet]}</p>
        <h1 className="home-h">{t.askCardTitle}</h1>

        <form
          className={`askbar ${state === 'listening' ? 'listening' : ''}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (typedQ.trim()) handleQuery(typedQ.trim(), 'typed');
          }}
        >
          <Icon name="search" size={24} />
          <input value={typedQ} onChange={(e) => setTypedQ(e.target.value)} placeholder={t.typePlaceholder} aria-label={t.typePlaceholder} enterKeyHint="search" />
          <button
            type="button"
            className={`mic ${state === 'listening' ? 'on' : ''}`}
            onClick={startMic}
            aria-label={state === 'listening' ? t.listening : t.askCardTitle}
            disabled={state === 'processing'}
          >
            <Icon name="mic" size={28} stroke={2.2} />
          </button>
        </form>
        <p className={`ask-sub ${micMsg ? 'warn-text' : ''}`} aria-live="polite">
          {state === 'listening' ? t.listening : state === 'processing' ? t.processing : micMsg || t.askCardSub}
        </p>
        {inApp && (
          <button className="btn ghost" onClick={openInChrome}>
            {t.openChrome}
          </button>
        )}

        {state === 'result' && (
          <section aria-live="polite" className="result">
            <p className="said">
              {t.youSaid}: <b>"{query}"</b>
            </p>
            {matched ? (
              <div className="card">
                <p>{t.confirmQ}</p>
                <div className="confirm-lesson">
                  <AppIcon app={matched.app} size={52} />
                  {matched.title[lang]}
                </div>
                <Link className="btn primary" href={`/lesson/${matched.id}`}>
                  {t.yesStart}
                </Link>
                <button className="btn ghost" onClick={() => setState('idle')}>
                  {t.noOther}
                </button>
              </div>
            ) : (
              <div className="card">
                <p>{t.noMatch}</p>
                <button className="btn wa-btn" onClick={() => askChild(query)}>
                  <Icon name="share" size={22} /> {t.askChild}
                </button>
                {asked && <p className="thanks">{t.thanks}</p>}
                <button className="btn ghost" onClick={() => setState('idle')}>
                  {t.tryAgain}
                </button>
              </div>
            )}
          </section>
        )}

        {next ? (
          <section className="next-card">
            <div className="next-top">
              <span className="eyebrow">{doneCount ? t.upNextMore : t.upNext}</span>
              <span className="next-progress">{t.learnedOf(doneCount, lessons.length)}</span>
            </div>
            <div className="meter" aria-hidden="true">
              <span style={{ width: `${Math.max(pct, 2)}%` }} />
            </div>
            <div className="next-body">
              <AppIcon app={next.app} size={60} />
              <div>
                <b>{next.title[lang]}</b>
                <small>
                  {next.appName} · {t.minutesShort(next.minutes)}
                </small>
              </div>
            </div>
            <Link className="btn primary" href={`/lesson/${next.id}`}>
              <Icon name="play" size={18} /> {t.startNow}
            </Link>
          </section>
        ) : (
          <section className="next-card">
            <b className="all-done">{t.allDoneTitle}</b>
            <small className="muted">{t.allDoneSub}</small>
          </section>
        )}

        <div className="section-h">
          <span>{t.pickApp}</span>
          <button className="link-btn" onClick={() => setShowApps(true)}>
            {myApps && myApps.length ? t.myApps : t.appsFirst}
          </button>
        </div>
        <div className="app-grid">
          {orderedApps.map((app) => {
            const list = lessons.filter((l) => l.app === app.id);
            if (!list.length) return null;
            const d = list.filter((l) => done.includes(l.id)).length;
            return (
              <Link key={app.id} href={`/app/${app.id}`} className="app-tile">
                {mine.includes(app.id) && <span className="mine-dot" aria-label={t.yourApps} />}
                <AppIcon app={app.id} size={56} />
                <b>{app.name}</b>
                <small>{d === list.length ? `✓ ${t.learned}` : t.lessonsN(list.length)}</small>
              </Link>
            );
          })}
        </div>

        <Link href="/scams" className="feature-card dark">
          <span className="feature-ic">
            <Icon name="shieldCheck" size={28} />
          </span>
          <div>
            <b>{t.scamCardTitle}</b>
            <span>{t.safetySub}</span>
          </div>
          <Icon name="chevron" size={24} />
        </Link>

        {readyMade.length > 0 && (
          <Link href="/for-you" className="feature-card">
            <span className="feature-ic soft">
              <Icon name="heart" size={26} />
            </span>
            <div>
              <b>{t.forYouTitle}</b>
              <span>{readyMade.map((m) => m.question).join(', ')}</span>
            </div>
            <Icon name="chevron" size={24} />
          </Link>
        )}

        <footer className="home-foot">
          <Link href="/send">{t.childLink}</Link>
        </footer>
      </main>

      <BottomNav active="learn" t={t} dot={readyMade.length ? 'foryou' : null} />

      {showSettings && (
        <Settings
          lang={lang}
          setLang={setLang}
          muted={muted}
          toggleMute={toggleMute}
          onClose={() => setShowSettings(false)}
          onApps={() => {
            setShowSettings(false);
            setShowApps(true);
          }}
          appsLabel={myApps && myApps.length ? `${myApps.length} ✓` : t.myApps}
        />
      )}
      {showApps && <AppsPicker t={t} initial={myApps || []} onSave={saveMyApps} onClose={() => setShowApps(false)} />}
    </div>
  );
}
