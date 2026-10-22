'use client';
// For the helper (son, daughter, neighbour…): make a lesson for something a parent asked.
// Type the steps, record a voice note, and/or add a screen recording or screenshots.
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppIcon from '@/components/AppIcon';
import { ALL_APPS } from '@/lib/apps';
import { track, whatsappLink } from '@/lib/client';

async function uploadFile(id, blob, name) {
  const r = await fetch('/api/custom/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || 'upload link failed');
  const fd = new FormData();
  fd.append('cacheControl', '3600');
  fd.append('', blob, name);
  const up = await fetch(j.uploadUrl, { method: 'PUT', body: fd, headers: { 'x-upsert': 'true' } });
  if (!up.ok) throw new Error('upload failed');
  return j.path;
}

export default function AddLesson({ params }) {
  const id = params.id;
  const [question, setQuestion] = useState('');
  const [steps, setSteps] = useState(['', '', '']);
  const [app, setApp] = useState('');
  const [name, setName] = useState('');
  const [lang, setLang] = useState('en');
  const [files, setFiles] = useState([]);
  const [voice, setVoice] = useState(null); // { blob, url }
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState('edit'); // edit | saving | saved | error
  const [error, setError] = useState('');
  const recRef = useRef(null);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuestion(q);
    fetch(`/api/custom?ids=${id}`)
      .then((r) => r.json())
      .then((j) => {
        const l = (j.lessons || [])[0];
        if (l && l.question && !q) setQuestion(l.question);
        if (l && l.lang) setLang(l.lang);
      })
      .catch(() => {});
  }, [id]);

  async function startVoice() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const mime = types.find((m) => window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || '';
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks = [];
      rec.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        const blob = new Blob(chunks, { type: rec.mimeType || mime || 'audio/webm' });
        setVoice({ blob, url: URL.createObjectURL(blob) });
        setRecording(false);
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
      setTimeout(() => rec.state === 'recording' && rec.stop(), 3 * 60 * 1000);
    } catch {
      setError('Could not use the microphone. Allow microphone access in your browser, or type the steps instead.');
    }
  }

  function stopVoice() {
    try {
      recRef.current && recRef.current.stop();
    } catch {}
  }

  async function save() {
    const cleanSteps = steps.map((s) => s.trim()).filter(Boolean);
    if (!cleanSteps.length && !voice && !files.length) {
      setError('Add at least one: typed steps, a voice note, or a video/screenshot.');
      return;
    }
    setError('');
    setStatus('saving');
    try {
      const media = [];
      if (voice) {
        const ext = voice.blob.type.includes('mp4') ? 'm4a' : voice.blob.type.includes('ogg') ? 'ogg' : 'webm';
        media.push({ path: await uploadFile(id, voice.blob, `voice.${ext}`), type: 'audio' });
      }
      for (const f of files) {
        const type = f.type.startsWith('image/') ? 'image' : f.type.startsWith('audio/') ? 'audio' : 'video';
        media.push({ path: await uploadFile(id, f, f.name || 'file'), type });
      }
      const r = await fetch('/api/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, question, app, author: name, lang, steps: cleanSteps, media, status: 'ready' }),
      });
      if (!r.ok) throw new Error('save failed');
      track('custom_created', { meta: { id, steps: cleanSteps.length, voice: !!voice, files: files.length, app } });
      setStatus('saved');
    } catch (e) {
      setStatus('edit');
      setError("Couldn't save right now. Check your internet and try again.");
    }
  }

  const parentLink = `${origin}/my/${id}`;
  const notify =
    lang === 'hi'
      ? `मैंने आपके लिए पाठ बना दिया: "${question}" 🙏\nयहाँ खोलिए:\n${parentLink}`
      : `I've made your lesson: "${question}" 🙏\nOpen it here:\n${parentLink}`;

  if (status === 'saved') {
    return (
      <div className="page send">
        <Link href="/" className="brand">
          Folks
        </Link>
        <div className="done-burst">🎉</div>
        <h1>Lesson ready!</h1>
        <p className="muted">It now shows on their Folks home screen under "Made for you". Let them know:</p>
        <a className="btn wa-btn" href={whatsappLink(notify)} target="_blank" rel="noopener noreferrer">
          💬 Send them the link
        </a>
      </div>
    );
  }

  return (
    <div className="page send">
      <Link href="/" className="brand">
        Folks
      </Link>
      <h1>Make a lesson for them</h1>
      <div className="ask-q">
        <small>They want to learn</small>
        <b>"{question || '…'}"</b>
      </div>
      <p className="muted">Use any one way below, or mix them. Keep it short and simple.</p>

      <div className="field">
        <span>Which app is it in?</span>
        <div className="apps-grid small">
          {[...ALL_APPS, { id: 'other', name: 'Other' }].map((a) => (
            <button key={a.id} className={`app-pick ${app === a.id ? 'on' : ''}`} onClick={() => setApp(a.id)}>
              <AppIcon app={a.id} size={34} />
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span>✍️ Type the steps</span>
        {steps.map((s, i) => (
          <div key={i} className="step-input">
            <b>{i + 1}</b>
            <input
              value={s}
              onChange={(e) => setSteps(steps.map((x, k) => (k === i ? e.target.value : x)))}
              placeholder={i === 0 ? 'e.g. Open YouTube and tap the search icon at the top' : 'Next step'}
              maxLength={300}
            />
          </div>
        ))}
        <button className="chip" onClick={() => setSteps([...steps, ''])} disabled={steps.length >= 15}>
          + Add a step
        </button>
      </div>

      <div className="field">
        <span>🎙️ Or record a voice note</span>
        <p className="muted small">Explain it like you would on a phone call. They can replay it as many times as they like.</p>
        {!recording && !voice && (
          <button className="btn ghost" onClick={startVoice}>
            🎙️ Start recording
          </button>
        )}
        {recording && (
          <button className="btn danger" onClick={stopVoice}>
            ⏹ Stop recording
          </button>
        )}
        {voice && (
          <div className="voice-row">
            <audio controls src={voice.url} />
            <button className="chip" onClick={() => setVoice(null)}>
              Redo
            </button>
          </div>
        )}
      </div>

      <div className="field">
        <span>📎 Or add a screen recording or screenshots</span>
        <p className="muted small">Record your own phone doing the task, then pick the video here.</p>
        <input type="file" accept="video/*,image/*,audio/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 8))} />
        {files.length > 0 && <p className="small">{files.length} file(s) added</p>}
      </div>

      <label className="field">
        <span>Your name (shown to them)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rinkle" maxLength={40} />
      </label>

      <div className="field">
        <span>Language of your steps</span>
        <div className="seg">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
            English
          </button>
          <button className={lang === 'hi' ? 'on' : ''} onClick={() => setLang('hi')}>
            हिंदी
          </button>
        </div>
      </div>

      {error && <p className="warn">{error}</p>}
      <button className="btn primary" onClick={save} disabled={status === 'saving'}>
        {status === 'saving' ? 'Saving…' : 'Save lesson'}
      </button>
    </div>
  );
}
