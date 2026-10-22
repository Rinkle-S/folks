'use client';
// A lesson made for this parent by someone close: their voice note, video, screenshots and written steps.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppIcon from '@/components/AppIcon';
import { T } from '@/lib/i18n';
import { ALL_APPS } from '@/lib/apps';
import { useLang, speak, stopSpeaking, track, addRequest, whatsappLink } from '@/lib/client';

export default function MyLesson({ params }) {
  const id = params.id;
  const [lang] = useLang();
  const [lesson, setLesson] = useState(undefined); // undefined loading, null missing
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch(`/api/custom?ids=${id}`)
      .then((r) => r.json())
      .then((j) => {
        const l = (j.lessons || [])[0] || null;
        setLesson(l);
        if (l) {
          addRequest({ id, q: l.question || '' });
          track('custom_view', { meta: { id, status: l.status } });
        }
      })
      .catch(() => setLesson(null));
    return () => stopSpeaking();
  }, [id]);

  if (!lang || lesson === undefined) return <div className="page" />;
  const t = T[lang];

  if (!lesson) {
    return (
      <div className="page">
        <Link href="/" className="brand">
          Folks
        </Link>
        <p className="card" style={{ marginTop: 20 }}>
          {t.noMatch}
        </p>
        <Link className="btn ghost" href="/">
          🏠 {t.home}
        </Link>
      </div>
    );
  }

  const steps = Array.isArray(lesson.steps) ? lesson.steps : [];
  const media = Array.isArray(lesson.media) ? lesson.media : [];
  const voiceLang = lesson.lang || lang;
  const appName = (ALL_APPS.find((a) => a.id === lesson.app) || {}).name;
  const ready = steps.length || media.length;

  return (
    <div className="page my">
      <div className="scams-top">
        <Link href="/" className="ptop-btn">
          ✕ {t.exit}
        </Link>
      </div>
      <div className="read-head">
        {appName && (
          <span className="follow-app">
            <AppIcon app={lesson.app} size={30} /> {appName}
          </span>
        )}
        <h1>{lesson.question}</h1>
        <p className="muted">💛 {t.customBy(lesson.author)}</p>
      </div>

      {!ready && (
        <div className="card">
          <p>{t.customWait}</p>
          <a
            className="btn wa-btn"
            href={whatsappLink(t.nudgeMsg(lesson.question, `${origin}/add/${id}`))}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 {t.nudge}
          </a>
        </div>
      )}

      {media
        .filter((m) => m.type === 'audio')
        .map((m, i) => (
          <div key={`a${i}`} className="media-card">
            <b>🎙️ {t.voiceFrom(lesson.author)}</b>
            <audio controls src={m.url} preload="metadata" />
          </div>
        ))}

      {media
        .filter((m) => m.type === 'video')
        .map((m, i) => (
          <div key={`v${i}`} className="media-card">
            <b>▶️ {t.videoFrom}</b>
            <video controls playsInline src={m.url} preload="metadata" />
          </div>
        ))}

      {media
        .filter((m) => m.type === 'image')
        .map((m, i) => (
          <div key={`i${i}`} className="media-card">
            <img src={m.url} alt="" />
          </div>
        ))}

      {steps.length > 0 && (
        <>
          <div className="read-head">
            <h2>{t.stepsTitle}</h2>
            <button className="chip" onClick={() => speak(steps.map((s, i) => `${i + 1}. ${s}`).join(' '), voiceLang)}>
              🔊 {t.readAll}
            </button>
          </div>
          <ol className="read-list">
            {steps.map((s, i) => (
              <li key={i} className="read-step">
                <span className="read-num">{i + 1}</span>
                <div className="read-body">
                  <p>{s}</p>
                  <div className="read-actions">
                    <button className="chip" onClick={() => speak(s, voiceLang)}>
                      🔊 {t.listen}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      <Link className="btn ghost" href="/">
        🏠 {t.home}
      </Link>
    </div>
  );
}
