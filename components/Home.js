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
import { matchLesson, matchGuide } from '@/lib/match';
import { getProfile } from '@/lib/profile';
import { GUIDES, GUIDE_LIST } from '@/lib/guides';
import { T } from '@/lib/i18n';
import { langCode } from '@/lib/langs';
import { askSomeone, loadMade, isReady } from '@/lib/ask';
import AskWho from './AskWho';
import ThemeList from './ThemeList';
import { orderForFluency } from '@/lib/levels';
import { effectiveFluency, reviewDueIds } from '@/lib/adapt';
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
  const [fluency, setFluency] = useState('');
  const [skills, setSkills] = useState([]);
  const [guideId, setGuideId] = useState(null); // a quick guide we wrote that fits
  const [showSettings, setShowSettings] = useState(false);
  const [serverStt, setServerStt] = useState(false);
  const [myApps, setMyApps] = useState(undefined);
  const [showApps, setShowApps] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [moreApps, setMoreApps] = useState(false);
  const [reviewIds, setReviewIds] = useState([]);
  const [made, setMade] = useState([]);
  const [done, setDone] = useState([]);
  const [greet, setGreet] = useState('greetDay');
  const [profileName, setProfileName] = useState('');
  const recRef = useRef(null);
  const gotResult = useRef(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    // WhatsApp, Instagram, Facebook etc. open links in their own browser, where the mic usually doesn't work.
    setInApp(/Android/i.test(ua) && (/; wv\)/.test(ua) || /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua)));
    setOb(isOnboarded());
    setMyApps(getApps());
    setProfileName(getProfile().name);
    setFluency(effectiveFluency(getProfile().fluency));
    setSkills(getProfile().skills || []);
    setReviewIds(reviewDueIds());
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
          setFluency(effectiveFluency(getProfile().fluency));
    setSkills(getProfile().skills || []);
          setProfileName(getProfile().name);
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
    // A practice lesson wins unless a quick guide fits the question clearly better ("cancel order" vs the order lesson).
    const g0 = matchGuide(q);
    const lessonWins = m && m.kind === 'lesson' && !(g0 && g0.score > m.task);
    const gm = lessonWins ? null : g0;
    setGuideId(gm ? gm.id : null);
    setResult(lessonWins ? m : null);
    if (lessonWins) {
      speak([t.confirmQ, LESSONS[m.id].title[lang]], lang);
    } else if (!gm) {
      speak(t.noMatch, lang); // nothing fits: offer to ask someone, or browse the topics
    }
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
      console.error('[Nook mic] getUserMedia failed:', e && e.name, e && e.message);
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
            console.error('[Nook mic] /api/stt failed:', r.status, j);
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
    const ua = navigator.userAgent;
    const brave = !!(navigator.brave && navigator.brave.isBrave);
    console.info('[Nook mic] start', { hasSpeechRecognition: !!SR, lang: langCode(lang), online: navigator.onLine, secure: window.isSecureContext, inApp, brave, ua });
    if (!SR) {
      console.warn('[Nook mic] This browser has no SpeechRecognition. Try Chrome on Android or desktop Chrome.');
      setMicMsg(inApp ? t.micInApp : t.micUnsupported);
      track('mic_error', { meta: { error: 'unsupported', inApp, lang } });
      return;
    }
    try {
      const rec = new SR();
      rec.lang = langCode(lang);
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 1;
      gotResult.current = false;
      let errored = false;
      rec.onresult = (e) => {
        gotResult.current = true;
        handleQuery(e.results[0][0].transcript, 'voice');
      };
      rec.onstart = () => console.info('[Nook mic] listening');
      rec.onaudiostart = () => console.info('[Nook mic] microphone is receiving audio');
      rec.onspeechstart = () => console.info('[Nook mic] speech detected');
      rec.onerror = (e) => {
        errored = true;
        const why = {
          network: 'The browser could not reach its speech service (Google servers). Common in Brave, Chromium builds, VPN or firewall, or when offline. Try regular Chrome.',
          'not-allowed': 'Microphone permission was blocked for this site.',
          'service-not-allowed': 'The browser refuses speech recognition for this page or profile.',
          'no-speech': 'The mic opened but heard nothing.',
          'audio-capture': 'No working microphone was found.',
          'language-not-supported': 'This browser does not support speech recognition for ' + langCode(lang) + '.',
        }[e.error];
        console.error('[Nook mic] error:', e.error, e.message || '', why ? '\n' + why : '', { lang: langCode(lang), online: navigator.onLine, brave, ua });
        setState('idle');
        track('mic_error', { meta: { error: e.error, inApp, lang } });
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setMicMsg(inApp ? t.micInApp : t.micDenied);
        else if (e.error === 'no-speech') setMicMsg(t.micNoSpeech);
        else if (e.error === 'network') setMicMsg(t.micBrowser);
        else if (e.error !== 'aborted') setMicMsg(t.micUnsupported);
      };
      rec.onend = () => {
        console.info('[Nook mic] ended', { gotResult: gotResult.current, errored });
        setState((s) => (s === 'listening' ? 'idle' : s));
        if (!gotResult.current && !errored) setMicMsg(t.micNoSpeech);
      };
      recRef.current = rec;
      setMicMsg('');
      setState('listening');
      rec.start();
    } catch (err) {
      console.error('[Nook mic] could not start speech recognition:', err);
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

  function askChild(text, contact) {
    askSomeone(text, lang, t, contact);
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
  const orderedApps = [...mine.map((id) => APPS.find((a) => a.id === id)).filter(Boolean), ...APPS.filter((a) => !mine.includes(a.id))];
  // Apps they picked come first; the rest stay one tap away so they can still be discovered.
  const shownApps = mine.length && !moreApps ? orderedApps.filter((a) => mine.includes(a.id)) : orderedApps;
  const hiddenCount = orderedApps.length - shownApps.length;
  const orderedLessons = orderedApps.flatMap((a) => orderForFluency(lessons.filter((l) => l.app === a.id), fluency, skills));
  // Never suggest something already learned, except a lesson they struggled with a few days ago.
  const review = orderedLessons.find((l) => reviewIds.includes(l.id));
  const next = review || orderedLessons.find((l) => !done.includes(l.id) && !l.id.startsWith('gd-')) || orderedLessons.find((l) => !done.includes(l.id));
  const pct = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="shell">
      <AppBar onSettings={() => setShowSettings(true)} />
      <main className="shell-main">
        <p className="greet">{profileName ? `${t[greet]}, ${profileName}` : t[greet]}</p>
        <h1 className="home-h">{t.askCardTitle}</h1>

        <div className="mic-hero">
          <button
            type="button"
            className={`mic-big ${state === 'listening' ? 'on' : ''}`}
            onClick={startMic}
            aria-label={state === 'listening' ? t.listening : t.tapToSpeak}
            disabled={state === 'processing'}
          >
            <Icon name="mic" size={64} stroke={2.2} />
          </button>
          <p className={`mic-cap ${micMsg ? 'warn-text' : ''}`} aria-live="polite">
            {state === 'listening' ? t.listening : state === 'processing' ? t.processing : micMsg || t.tapToSpeak}
          </p>
        </div>
        <form
          className="askbar typed"
          onSubmit={(e) => {
            e.preventDefault();
            if (typedQ.trim()) handleQuery(typedQ.trim(), 'typed');
          }}
        >
          <Icon name="search" size={22} />
          <input value={typedQ} onChange={(e) => setTypedQ(e.target.value)} placeholder={t.typePlaceholder} aria-label={t.typePlaceholder} enterKeyHint="search" />
          <button type="submit" className="ask-go" aria-label={t.yesStart}>
            <Icon name="arrow" size={22} stroke={2.4} />
          </button>
        </form>
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
            ) : guideId && GUIDES[guideId] ? (
              <div className="card guide-found">
                <p>{t.guideFound}</p>
                <div className="confirm-lesson">
                  <AppIcon app={GUIDES[guideId].app} size={52} />
                  {GUIDES[guideId].title[lang]}
                </div>
                <Link className="btn primary" href={LESSONS['gd-' + guideId] ? `/lesson/gd-${guideId}` : `/guide/${guideId}`}>
                  {t.showGuide}
                </Link>
                <button className="btn ghost" onClick={() => setState('idle')}>
                  {t.noOther}
                </button>
              </div>
            ) : (
              <div className="card">
                <p>{t.noMatch}</p>
                <AskWho t={t} label={t.askChild} onAsk={(c) => askChild(query, c)} />
                {asked && <p className="thanks">{t.thanks}</p>}
                <Link className="btn ghost" href="/themes">
                  {t.themesTitle}
                </Link>
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
              <span className="eyebrow">{review ? t.practiceAgainTitle : t.tryThis}</span>
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
        ) : null}

        <div className="section-h">
          <span>{t.pickApp}</span>
          <button className="link-btn" onClick={() => setShowApps(true)}>
            {myApps && myApps.length ? t.myApps : t.appsFirst}
          </button>
        </div>
        <div className="app-grid">
          {shownApps.map((app) => {
            const list = lessons.filter((l) => l.app === app.id);
            const gn = GUIDE_LIST.filter((x) => x.app === app.id).length;
            if (!list.length && !gn) return null;
            const d = list.filter((l) => done.includes(l.id)).length;
            return (
              <Link key={app.id} href={`/app/${app.id}`} className="app-tile">
                <AppIcon app={app.id} size={56} />
                <b>{app.name}</b>
                <small>{!list.length ? `${gn} ${t.quickGuide}` : d === list.length ? `✓ ${t.learned}` : t.lessonsN(list.length)}</small>
              </Link>
            );
          })}
        </div>

        {mine.length > 0 && (hiddenCount > 0 || moreApps) && (
          <button className="btn ghost" onClick={() => setMoreApps(!moreApps)} aria-expanded={moreApps}>
            {moreApps ? t.fewerApps : t.moreApps(hiddenCount)}
          </button>
        )}

        <section className="home-topics">
          <button className="topics-toggle" onClick={() => setShowTopics(!showTopics)} aria-expanded={showTopics}>
            <span className="topics-ic">
              <Icon name="library" size={24} />
            </span>
            <span className="topics-tx">
              <b>{t.themesTitle}</b>
              <small>{t.homeThemesSub}</small>
            </span>
            <Icon name={showTopics ? 'up' : 'down'} size={22} />
          </button>
          {showTopics && <ThemeList lang={lang} t={t} done={done} />}
        </section>

        {readyMade.length > 0 && (
          <Link href="/help" className="feature-card">
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
          <Link href="/help">{t.helpLink}</Link>
          <Link href="/send">{t.childLink}</Link>
        </footer>
      </main>

      <BottomNav active="learn" t={t} dot={readyMade.length ? 'help' : null} />

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
