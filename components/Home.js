'use client';
// Home: ask by voice or typing, see progress, practise scam-spotting, and pick a lesson by app.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Settings from './Settings';
import AppIcon from './AppIcon';
import AppsPicker from './AppsPicker';
import Icon from './Icons';
import Onboarding from './Onboarding';
import { AppBar, BottomNav } from './AppShell';
import { LESSONS, APPS, findLesson } from '@/lib/lessons';
import { matchLesson, matchGuide, suggest, isClear } from '@/lib/match';
import { getProfile } from '@/lib/profile';
import { GUIDES, GUIDE_LIST } from '@/lib/guides';
import { T } from '@/lib/i18n';
import { langCode } from '@/lib/langs';
import VoiceNotice from './VoiceNotice';
import {VOICE_MESSAGES} from '@/lib/voiceMessages';
import ThemeList from './ThemeList';
import ShareLesson from './ShareLesson';
import { orderForFluency } from '@/lib/levels';
import { effectiveFluency, reviewDueIds } from '@/lib/adapt';
import {
  useLang,
  useMute,
  speak,
  track,
  getApps,
  saveApps,
  saveGoalResume,
  getDone,
  getResume,
  isOnboarded,
  setOnboarded,
} from '@/lib/client';

export default function Home() {
  const router = useRouter();
  const [lang, setLang] = useLang();
  const [muted, toggleMute] = useMute();
  const [onboarded, setOb] = useState(undefined);
  const [state, setState] = useState('idle'); // idle | listening | processing | result
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [typedQ, setTypedQ] = useState('');
  const [micMsg, setMicMsg] = useState('');
  const [inApp, setInApp] = useState(false);
  const [voiceWarn, setVoiceWarn] = useState(false); // this browser cannot listen or speak (Brave, in-app browsers, some others)
  const [asked, setAsked] = useState(false);
  const [fluency, setFluency] = useState('');
  const [skills, setSkills] = useState([]);
  const [guideId, setGuideId] = useState(null); // a quick guide we wrote that fits
  const [sugg, setSugg] = useState([]); // closest lessons and guides, when nothing fits clearly
  const [showSettings, setShowSettings] = useState(false);
  const [serverStt, setServerStt] = useState(false);
  const [myApps, setMyApps] = useState(undefined);
  const [showApps, setShowApps] = useState(false);
  const [reviewIds, setReviewIds] = useState([]);
  const [done, setDone] = useState([]);
  const [resume, setResumeState] = useState(null); // a lesson left halfway
  const [greet, setGreet] = useState('greetDay');
  const [profileName, setProfileName] = useState('');
  const recRef = useRef(null);
  const gotResult = useRef(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    // WhatsApp, Instagram, Facebook etc. open links in their own browser, where the mic usually doesn't work.
    setInApp(/Android/i.test(ua) && (/; wv\)/.test(ua) || /WhatsApp|Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua)));
    // Voice needs the browser's speech services. Brave switches them off, and some browsers never had them.
    const noListen = !(window.SpeechRecognition || window.webkitSpeechRecognition);
    const noSpeak = !('speechSynthesis' in window);
    setVoiceWarn(noListen || noSpeak);
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      navigator.brave.isBrave().then((yes) => yes && setVoiceWarn(true)).catch(() => {});
    }
    setOb(isOnboarded());
    setMyApps(getApps());
    setProfileName(getProfile().name);
    setFluency(effectiveFluency(getProfile().fluency));
    setSkills(getProfile().skills || []);
    setReviewIds(reviewDueIds());
    setDone(getDone());
    setResumeState(getResume());
    const h = new Date().getHours();
    setGreet(h < 12 ? 'greetMorning' : h < 17 ? 'greetDay' : 'greetEvening');
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
        onDone={(apps, goal, lookAround = false) => {
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
          if (goal) {
            saveGoalResume(goal);
            setResumeState(getResume());
            if (!lookAround) router.push(goal === 'safe' ? '/scams' : `/lesson/${goal}?onboarding=1`);
          }
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
    // A practice lesson wins unless a quick guide fits the question clearly better ("cancel order" vs the order lesson).
    // If two lessons score almost the same, the parent chooses between them instead of landing in the wrong one.
    const g0 = matchGuide(q);
    const lessonWins = m && m.kind === 'lesson' && !(g0 && g0.score > m.task) && isClear(q);
    const gm = lessonWins || !isClear(q) ? null : g0;
    const close = lessonWins || gm ? [] : suggest(q);
    track('voice_search', {
      meta: { q: q.slice(0, 200), via, match: lessonWins ? m.id : gm?.id || null, lang },
    });
    setGuideId(gm ? gm.id : null);
    setResult(lessonWins ? m : null);
    setSugg(close);
    if (lessonWins) {
      speak([t.confirmQ, LESSONS[m.id].title[lang]], lang);
    } else if (close.length) {
      speak(t.didYouMean, lang);
    } else if (!gm) {
      speak(t.noMatch, lang); // nothing fits: tell the Nook team, or browse the topics
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
        else if (e.error === 'language-not-supported') setMicMsg(VOICE_MESSAGES.mic[lang]);
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

  // Nothing fits: tell the Nook team, so the lessons that are missing get written first.
  function tellNook(text) {
    track('lesson_request', { meta: { q: text.slice(0, 200), lang, from: 'home' } });
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
  const mine = myApps || [];
  const orderedApps = [...mine.map((id) => APPS.find((a) => a.id === id)).filter(Boolean), ...APPS.filter((a) => !mine.includes(a.id))];
  // Keep the saved order, with other available apps afterwards. Progress never moves a tile.
  const shownApps = orderedApps;
  const orderedLessons = orderedApps.flatMap((a) => orderForFluency(lessons.filter((l) => l.app === a.id), fluency, skills));
  // Never suggest something already learned, except a lesson they struggled with a few days ago.
  const review = orderedLessons.find((l) => reviewIds.includes(l.id));
  const next = review || orderedLessons.find((l) => !done.includes(l.id) && !l.id.startsWith('gd-')) || orderedLessons.find((l) => !done.includes(l.id));
  const resumeLesson = resume?.id === 'safe' ? {id:'safe', app:'safe', title:{[lang]:t.obGoals[3]}} : resume && LESSONS[resume.id] && resume.idx < LESSONS[resume.id].steps.length ? LESSONS[resume.id] : null;
  const pct = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="shell learn-page learn-home">
      <AppBar learn t={t} onSettings={() => setShowSettings(true)} />
      <main className="shell-main">
        <VoiceNotice lang={lang}/>
        <p className="greet">{t[greet].replace(/\s*🙏/g, '')}{profileName ? `, ${profileName}` : ''}</p>
        <h1 className="home-h">{t.learnHomeTitle}</h1>

        <div className="mic-hero">
          <button
            type="button"
            className={`mic-big ${state === 'listening' ? 'on' : ''}`}
            onClick={startMic}
            aria-label={state === 'listening' ? t.listening : t.tapToSpeak}
            aria-labelledby="home-mic-caption"
            disabled={state === 'processing'}
          >
            <Icon name="mic" size={64} stroke={2.2} />
          </button>
          <p id="home-mic-caption" className={`mic-cap ${micMsg ? 'warn-text' : ''}`} aria-live="polite">
            {state === 'listening' ? t.listening : state === 'processing' ? t.processing : micMsg || t.tapToSpeak}
          </p>
          {state === 'idle' && !micMsg && <p className="mic-eg">{t.micExample}</p>}
        </div>
        {voiceWarn && !serverStt && (
          <p className="voice-warn" role="note">
            <Icon name="alert" size={26} />
            <span>{t.voiceWarn}</span>
          </p>
        )}
        <form
          className="askbar typed"
          onSubmit={(e) => {
            e.preventDefault();
            if (typedQ.trim()) handleQuery(typedQ.trim(), 'typed');
          }}
        >
          <Icon name="search" size={22} />
          <input value={typedQ} onChange={(e) => setTypedQ(e.target.value)} placeholder={t.learnTypePlaceholder} aria-label={t.learnHomeTitle} enterKeyHint="search" />
          <button type="submit" className="ask-go">
            {t.search}
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
                <ShareLesson text id={matched.id} title={matched.title[lang]} lang={lang} t={t} where="search_result" />
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
                <ShareLesson text id={LESSONS['gd-' + guideId] ? 'gd-' + guideId : guideId} kind={LESSONS['gd-' + guideId] ? 'lesson' : 'guide'} title={GUIDES[guideId].title[lang]} lang={lang} t={t} where="search_result" />
                <button className="btn ghost" onClick={() => setState('idle')}>
                  {t.noOther}
                </button>
              </div>
            ) : sugg.length ? (
              <div className="card did-you-mean">
                <p>{t.didYouMean}</p>
                {sugg.map((x) => {
                  const item = x.kind === 'lesson' ? LESSONS[x.id] : GUIDES[x.id];
                  if (!item) return null;
                  const href = x.kind === 'lesson' ? `/lesson/${x.id}` : LESSONS['gd-' + x.id] ? `/lesson/gd-${x.id}` : `/guide/${x.id}`;
                  return (
                    <Link key={x.kind + x.id} className="dym-row" href={href}>
                      <AppIcon app={item.app} size={48} />
                      <span className="dym-txt">{item.title[lang]}</span>
                      <Icon name="chevron" size={22} />
                    </Link>
                  );
                })}
                <p className="muted dym-none">{t.noneOfThese}</p>
                <button className="btn ghost" onClick={() => tellNook(query)} disabled={asked}>
                  {t.requestTell}
                </button>
                {asked && <p className="thanks">{t.requestThanks}</p>}
                <Link className="btn ghost" href="/themes">
                  {t.themesTitle}
                </Link>
                <button className="btn ghost" onClick={() => setState('idle')}>
                  {t.tryAgain}
                </button>
              </div>
            ) : (
              <div className="card">
                <p>{t.noMatch}</p>
                <button className="btn primary" onClick={() => tellNook(query)} disabled={asked}>
                  {t.requestTell}
                </button>
                {asked && <p className="thanks">{t.requestThanks}</p>}
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

        {resumeLesson ? (
          <Link className="resume-card" href={resumeLesson.id === 'safe' ? '/scams' : `/lesson/${resumeLesson.id}?${resume.goal ? 'onboarding=1' : 'resume=1'}`}>
            {resumeLesson.id === 'safe' ? <Icon name="shieldCheck" size={48}/> : <AppIcon app={resumeLesson.app} size={60} />}
            <span className="resume-tx">
              <small>{t.resumeTitle}</small>
              <b>{resumeLesson.title[lang]}</b>
              <small>{resume.goal ? t.obContinueGoal : t.resumeStep(resume.idx, resumeLesson.steps.length - 1)}</small>
            </span>
            <span className="resume-go">
              <Icon name="play" size={26} />
            </span>
          </Link>
        ) : next ? (
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

        <header className="learn-section-h"><h2>{t.pickApp}</h2><p>{t.appSectionSub}</p></header>
        <div className="app-grid">
          {shownApps.map((app) => {
            const list = lessons.filter((l) => l.app === app.id);
            const gn = GUIDE_LIST.filter((x) => x.app === app.id).length;
            if (!list.length && !gn) return null;
            const d = list.filter((l) => done.includes(l.id)).length;
            return (
              <Link key={app.id} href={`/app/${app.id}`} className="app-tile" data-app={app.id}>
                <span className="tile-icon"><AppIcon app={app.id} size={56} />{list.length > 0 && d === list.length && <span className="progress-check"><Icon name="check" size={18} stroke={3}/></span>}</span>
                <b>{app.name}</b>
                <span className="tile-progress" role="progressbar" aria-label={app.name} aria-valuenow={d} aria-valuemin={0} aria-valuemax={list.length || gn}><span style={{width:`${d / (list.length || gn) * 100}%`}}/></span>
                <small>{d === list.length && list.length ? t.progressAllDone : d > 0 ? t.appDoneOf(d,list.length) : t.lessonsN(list.length || gn)}</small>
              </Link>
            );
          })}
        </div>

        <button className="choose-learning-apps link-btn" onClick={()=>setShowApps(true)}>{t.chooseApps}<Icon name="chevron" size={22}/></button>

        <section className="home-topics">
          <header className="learn-section-h"><h2>{t.pickTopic}</h2><p>{t.topicSectionSub}</p></header>
          <ThemeList lang={lang} t={t} done={done} limit={3} />
          <Link href="/themes" className="btn ghost see-topics">{t.seeAllTopics}</Link>
        </section>

      </main>

      <BottomNav active="learn" t={t} />

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
